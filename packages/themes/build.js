import esbuild from "esbuild";
import pkg from "./package.json" assert { type: "json" };

esbuild.build({
  entryPoints: ["./src/index.js"],
  bundle: true,
  minify: true,
  sourcemap: true,
  outfile: "dist",
  format: "esm",
});
