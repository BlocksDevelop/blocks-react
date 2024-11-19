import esbuild from "esbuild";

esbuild.build({
  entryPoints: ["./src/index.js"],
  bundle: true,
  minify: true,
  sourcemap: true,
  outfile: "dist/index.js",
  format: "esm",
});

esbuild.build({
  entryPoints: ["./src/index.js"],
  bundle: true,
  minify: true,
  sourcemap: true,
  outfile: "dist/index.cjs",
  format: "cjs",
  outExtension: { ".js": ".mjs" },
});
