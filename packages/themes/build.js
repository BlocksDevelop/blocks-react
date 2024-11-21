import run from '@blocks/esbuild-config';
import packageJson from './package.json' assert { type: 'json' };

run({
  packageJson,
});
