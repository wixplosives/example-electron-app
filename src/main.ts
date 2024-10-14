import { BrowserWindow, Menu, app, ipcMain } from "electron/main";
import { fileURLToPath } from "node:url";
import { setApplicationMenu } from "./app-menu";

const multipleWindowsAllowed = true;

Menu.setApplicationMenu(null); // https://www.electronjs.org/docs/latest/tutorial/performance

if (process.platform === "linux" && process.env.NODE_ENV === "development") {
  // to not see: "ERROR:gl_surface_presentation_helper.cc(260)] GetVSyncParametersIfAvailable() failed for <x> times"
  app.disableHardwareAcceleration();
}

if (app.requestSingleInstanceLock()) {
  initializeApp();
} else {
  console.log("Opening in existing app session.");
  app.quit();
}

function initializeApp() {
  app
    .whenReady()
    .then(setApplicationMenu)
    .then(createWindow)
    .catch((e) => {
      console.error(e);
      app.exit(1);
    });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow().catch(console.error);
    }
  });

  app.on("second-instance", () => {
    if (multipleWindowsAllowed || BrowserWindow.getAllWindows().length === 0) {
      createWindow().catch(console.error);
    } else {
      focusOnFirstWindow();
    }
  });

  ipcMain.on("port", ({ ports: [port] }) => {
    if (port) {
      handlePort(port);
    }
  });
}

async function createWindow() {
  const win = new BrowserWindow({
    webPreferences: {
      preload: fileURLToPath(new URL("preload.cjs", import.meta.url)),
    },
    width: 1024,
    height: 768,
  });
  await win.loadFile(fileURLToPath(new URL("index.html", import.meta.url)));
}

function focusOnFirstWindow() {
  const [firstWindow] = BrowserWindow.getAllWindows();
  if (firstWindow) {
    if (firstWindow.isMinimized()) {
      firstWindow.restore();
    }
    firstWindow.focus();
  }
}

function handlePort(port: Electron.MessagePortMain) {
  port.on("message", ({ data }) => {
    console.log(`main got message: "${data}"`);
  });
  port.on("close", () => {
    port.removeAllListeners();
  });
  port.postMessage("hello from main");
  port.start();
}
