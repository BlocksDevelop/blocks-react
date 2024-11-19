import esbuild from "esbuild";

Promise.all([
  esbuild.build({
    entryPoints: ["./src/index.js"],
    bundle: true,
    minify: true,
    sourcemap: true,
    outfile: "dist/index.js",
    format: "esm",
  }),
  esbuild.build({
    entryPoints: ["./src/index.js"],
    bundle: true,
    minify: true,
    sourcemap: true,
    outfile: "dist/index.cjs",
    format: "cjs",
    outExtension: { ".js": ".mjs" },
  }),
]).catch(() => {
  console.error("Build failed");
  process.exit(1);
});
