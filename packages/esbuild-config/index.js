const { build } = require('esbuild');

const run = ({ entryPoints = ['src/index.ts'], packageJson, config = {} }) => {
  const dev = process.argv.includes('--dev');
  const minify = !dev;
  const watch = process.argv.includes('--watch');

  const external = Object.keys({
    ...packageJson.dependencies,
    ...packageJson.peerDependencies,
  });

  const baseConfig = {
    entryPoints,
    bundle: true,
    minify,
    sourcemap: true,
    target: 'es2019',
    watch,
    external,
    ...config,
  };

  Promise.all([
    build({
      ...baseConfig,
      outfile: 'dist/index.js',
      format: 'esm',
    }),
    build({
      ...baseConfig,
      outfile: 'dist/index.cjs',
      format: 'cjs',
      outExtension: { '.js': '.mjs' },
    }),
  ]).catch(() => {
    console.error('Build failed');
    process.exit(1);
  });
};

module.exports = run;
