import run from '@blocks/esbuild-config';
import packageJson from './package.json' assert { type: 'json' };
import { vanillaExtractPlugin } from '@vanilla-extract/esbuild-plugin';

const config = {
  plugins: [vanillaExtractPlugin()],
};

run({
  packageJson,
  config,
});
