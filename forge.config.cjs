// @ts-check

const fs = require("node:fs");
const path = require("node:path");

/** @type {import('@electron-forge/shared-types').ForgeConfig} */
module.exports = {
  packagerConfig: {
    afterComplete: [
      (buildPath, _electronVersion, _platform, _arch, callback) => {
        sanitizePackageJson(buildPath);
        callback();
      },
    ],
    ignore: (path) => !shouldCopyPath(path),
  },
  makers: [
    { name: "@electron-forge/maker-zip" },
    { name: "@electron-forge/maker-deb", platforms: ["linux"] },
    { name: "@electron-forge/maker-rpm", platforms: ["linux"] },
  ],
};

const includedPaths = new Set(["", "/package.json", "/LICENSE", "/dist"]);

function shouldCopyPath(path) {
  return includedPaths.has(path) || path.startsWith("/dist/");
}

function sanitizePackageJson(buildPath) {
  const keysToKeep = [
    "name",
    "version",
    "description",
    "main",
    "type",
    "author",
    "license",
  ];

  const outPackageJson = path.join(buildPath, "resources/app/package.json");
  const originalValue = JSON.parse(fs.readFileSync(outPackageJson, "utf-8"));
  const sanitizedValue = {};
  for (const key of keysToKeep) {
    sanitizedValue[key] = originalValue[key];
  }
  fs.writeFileSync(
    outPackageJson,
    JSON.stringify(sanitizedValue, null, 2) + "\n"
  );
}
