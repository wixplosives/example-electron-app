// @ts-check

import { build, context } from "esbuild";
import fs from "node:fs/promises";

const isWatch = process.argv.includes("--watch") || process.argv.includes("-w");
const outPath = new URL("../dist/", import.meta.url);
const publicPath = new URL("../public/", import.meta.url);

/** @type {import('esbuild').BuildOptions} */
const commonBuildOptions = {
  logLevel: "info",
  color: true,
  outdir: "dist",
  legalComments: "none",
  bundle: true,
  target: "es2022",
  entryNames: "[name]",
  loader: {
    ".json": "json",
    ".png": "file",
    ".jpeg": "file",
    ".jpg": "file",
    ".svg": "file",
  },
  assetNames: "assets/[name]-[hash]",
  minify: !isWatch,
  sourcemap: isWatch,
  jsx: "automatic",
  jsxDev: isWatch,
  define: {
    // avoid "Download the React DevTools" message, we're in electron and do not intend to use the browser extension
    __REACT_DEVTOOLS_GLOBAL_HOOK__: `{ "isDisabled": true }`,
  },
};

/** @type {import('esbuild').BuildOptions} */
const nodeEsmBundles = {
  ...commonBuildOptions,
  format: "esm",
  entryPoints: ["src/main.ts", "src/worker.ts"],
  packages: "external",
};

/** @type {import('esbuild').BuildOptions} */
const browserEsmBundle = {
  ...commonBuildOptions,
  format: "esm",
  entryPoints: ["src/renderer.tsx"],
};

/** @type {import('esbuild').BuildOptions} */
const browserCjsPreloadBundle = {
  ...commonBuildOptions,
  format: "cjs",
  entryPoints: ["src/preload.ts"],
  outExtension: { ".js": ".cjs" },
  packages: "external",
};

await fs.rm(outPath, { recursive: true, force: true });
await fs.mkdir(outPath, { recursive: true });
await fs.cp(publicPath, outPath, { recursive: true });

const bundles = [nodeEsmBundles, browserEsmBundle, browserCjsPreloadBundle];

if (isWatch) {
  const buildContexts = await Promise.all(
    bundles.map((bundle) => context(bundle)),
  );
  await Promise.all(buildContexts.map((context) => context.watch()));
} else {
  await Promise.all(bundles.map((bundle) => build(bundle)));
}
