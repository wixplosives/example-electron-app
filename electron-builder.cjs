/// @ts-check

/** @type {import('app-builder-lib').Configuration} */
module.exports = {
  appId: "com.example.app",
  asar: false,
  files: ["dist/**/*"],
  directories: {
    output: "out",
  },
  linux: {
    target: ["AppImage", "deb", "rpm", "snap", "zip", "tar.xz"],
  },
  win: {
    target: ["nsis", "zip"],
  },
  nsis: {
    oneClick: false,
    allowToChangeInstallationDirectory: true,
  },
};
