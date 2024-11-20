import esbuild from "esbuild";
import packageJson from "./package.json" assert { type: "json" };

const dev = process.argv.includes("--dev");
const minify = !dev;
const watch = process.argv.includes("--watch");

const external = Object.keys({
  ...packageJson.dependencies,
  ...packageJson.peerDependencies,
});

const baseConfig = {
  entryPoints: ["./src/index.ts"],
  bundle: true,
  minify,
  sourcemap: true,
  target: "es2019",
  watch,
  external,
};

Promise.all([
  esbuild.build({
    ...baseConfig,
    outfile: "dist/index.js",
    format: "esm",
  }),
  esbuild.build({
    ...baseConfig,
    outfile: "dist/index.cjs",
    format: "cjs",
    outExtension: { ".js": ".mjs" },
  }),
]).catch(() => {
  console.error("Build failed");
  process.exit(1);
});
