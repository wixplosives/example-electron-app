import { BrowserWindow, MessageEvent, app, ipcMain } from "electron/main";
import { fileURLToPath } from "node:url";
import { Worker } from "node:worker_threads";

const worker = new Worker(new URL("worker.js", import.meta.url));

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
  await win.show();
}

app.whenReady().then(async () => {
  await createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on("port", (event) => {
  const [port] = event.ports;
  relayPortToWorker(port, worker);
  port.start();
});

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
