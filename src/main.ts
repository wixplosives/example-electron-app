import { BrowserWindow, MessageEvent, app, ipcMain } from "electron/main";
import { fileURLToPath } from "node:url";
import { Worker } from "node:worker_threads";

if (process.platform === "linux" && process.env.NODE_ENV === "development") {
  // to not see: "ERROR:gl_surface_presentation_helper.cc(260)] GetVSyncParametersIfAvailable() failed for <x> times"
  app.disableHardwareAcceleration();
}

if (app.requestSingleInstanceLock()) {
  const worker = new Worker(new URL("worker.js", import.meta.url));

  app.whenReady().then(async () => {
    await createWindow();

    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });

    app.on("second-instance", () => {
      createWindow();
    });
  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  ipcMain.on("port", ({ ports: [port] }) => {
    relayPortToWorker(port, worker);
    port.start();
  });
} else {
  app.quit();
}

async function createWindow() {
  const win = new BrowserWindow({
    show: false,
    webPreferences: {
      preload: fileURLToPath(new URL("preload.cjs", import.meta.url)),
    },
    width: 1024,
    height: 768,
  });
  await win.loadFile(fileURLToPath(new URL("index.html", import.meta.url)));
  win.show();
}

function relayPortToWorker(port: Electron.MessagePortMain, worker: Worker) {
  const portToWorker = (event: MessageEvent) => worker.postMessage(event.data);
  port.on("message", portToWorker);
  const workerToPort = (message: unknown) => port.postMessage(message);
  worker.on("message", workerToPort);
  const onPortClose = () => {
    worker.off("message", workerToPort);
    port.off("message", portToWorker);
    port.off("close", onPortClose);
  };
  port.on("close", onPortClose);
}
