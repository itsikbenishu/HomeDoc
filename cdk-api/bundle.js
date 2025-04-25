const esbuild = require("esbuild");
const path = require("path");
const fs = require("fs");
const wrapWithCorsPlugin = require("./plagins/wrapWithCors");

const lambdaDir = path.resolve(__dirname, "lambda/handlers");
const outDir = path.join(__dirname, "lambda-dist");

const entryFiles = fs
  .readdirSync(lambdaDir)
  .filter((file) => file.endsWith(".js"));

const entryPoints = entryFiles.map((entrygFile) =>
  path.join(lambdaDir, entrygFile)
);

for (const entryPoint of entryPoints) {
  if (!fs.existsSync(entryPoint)) {
    console.error(`Error: Entry point does not exist at ${entryPoint}`);
    process.exit(1);
  }
}

esbuild
  .build({
    entryPoints: entryPoints,
    bundle: true,
    platform: "node",
    target: "node20",
    outdir: outDir,
    external: [],
    plugins: [wrapWithCorsPlugin],
    logLevel: "info",
  })
  .then(() => {
    console.log("Bundling completed successfully!");
  })
  .catch((error) => {
    console.error("Bundling failed:", error);
    process.exit(1);
  });
