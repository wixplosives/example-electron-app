import { ipcRenderer } from "electron/renderer";

const { port1, port2 } = new MessageChannel();

ipcRenderer.postMessage("port", null, [port2]);

window.addEventListener("DOMContentLoaded", () => {
  window.postMessage("port", "*", [port1]);
});
