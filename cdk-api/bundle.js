const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs');

const lambdaDir = path.resolve(__dirname, 'lambda'); 
const entryPoint = path.join(lambdaDir, 'getAllHomeDocs.js');
const outDir = path.join(__dirname, 'lambda-dist');

if (!fs.existsSync(entryPoint)) {
  console.error(`Error: Entry point does not exist at ${entryPoint}`);
  process.exit(1);
}

console.log('Entry point:', entryPoint);
console.log('Output dir:', outDir);

esbuild.build({
  entryPoints: [entryPoint],
  bundle: true,
  platform: 'node',
  target: 'node20',
  outfile: path.join(outDir, 'index.js'),
  external: [], 
  logLevel: 'info', 
}).then(() => {
  console.log('Bundling completed successfully!');
}).catch((error) => {
  console.error('Bundling failed:', error);
  process.exit(1);
});