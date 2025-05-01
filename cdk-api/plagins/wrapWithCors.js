const path = require("path");
const fs = require("fs").promises;
const acorn = require("acorn");
const walk = require("acorn-walk");

const wrapWithCorsPlugin = (excludedFiles = new Set()) => ({
  name: "wrap-with-cors",
  setup(build) {
    build.onLoad({ filter: /\.js$/ }, async (args) => {
      const filename = path.basename(args.path);

      if (excludedFiles.has(filename)) {
        const source = await fs.readFile(args.path, "utf8");
        return { contents: source, loader: "js" };
      }

      const source = await fs.readFile(args.path, "utf8");
      const ast = acorn.parse(source, {
        ecmaVersion: "latest",
        sourceType: "module",
        locations: true,
      });

      let handlerAssignmentNode = null;

      walk.simple(ast, {
        AssignmentExpression(node) {
          if (
            node.left.type === "MemberExpression" &&
            node.left.object.name === "exports" &&
            node.left.property.name === "handler" &&
            node.right.type === "ArrowFunctionExpression"
          ) {
            handlerAssignmentNode = node;
          }
        },
      });

      if (handlerAssignmentNode) {
        const { start, end } = handlerAssignmentNode;
        const beforeHandlerAssignment = source.slice(0, start);
        const afterHandlerAssignment = source.slice(end);

        const wrapped = `
const withCors = require("../middlewares/withCors");

${beforeHandlerAssignment}exports.handler = withCors(${
          handlerAssignmentNode.right.raw ||
          source.slice(
            handlerAssignmentNode.right.start,
            handlerAssignmentNode.right.end
          )
        });${afterHandlerAssignment}
        `;

        return {
          contents: wrapped,
          loader: "js",
        };
      }

      return { contents: source, loader: "js" };
    });
  },
});

module.exports = wrapWithCorsPlugin;
