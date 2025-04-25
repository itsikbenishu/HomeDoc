const fs = require("fs").promises;
const acorn = require("acorn");
const walk = require("acorn-walk");

const wrapWithCorsPlugin = {
  name: "wrap-with-cors",
  setup(build) {
    build.onLoad({ filter: /\.js$/ }, async (args) => {
      const source = await fs.readFile(args.path, "utf8");
      const ast = acorn.parse(source, {
        ecmaVersion: "latest",
        sourceType: "module",
        locations: true,
      });

      let handlerExportNode = null;

      walk.simple(ast, {
        AssignmentExpression(node) {
          if (
            node.left.type === "MemberExpression" &&
            node.left.object.name === "exports" &&
            node.left.property.name === "handler" &&
            node.right.type === "ArrowFunctionExpression"
          ) {
            handlerExportNode = node;
          }
        },
      });

      if (handlerExportNode) {
        const { start, end } = handlerExportNode;
        const before = source.slice(0, start);
        const after = source.slice(end);
        const handlerCode = source.slice(start, end);

        const wrapped = `
const withCors = require("../middlewares/withCors");

${before}exports.handler = withCors(${
          handlerExportNode.right.raw ||
          source.slice(
            handlerExportNode.right.start,
            handlerExportNode.right.end
          )
        });${after}
        `;

        return {
          contents: wrapped,
          loader: "js",
        };
      }

      return { contents: source, loader: "js" };
    });
  },
};

module.exports = wrapWithCorsPlugin;
