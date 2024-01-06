import { parentPort } from "node:worker_threads";

parentPort!.on("message", (message) => {
  console.log("worker got message", message);
  parentPort!.postMessage("hello from worker");
});
