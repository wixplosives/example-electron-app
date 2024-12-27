import { createRoot } from "react-dom/client";
import { Dashboard } from "./components/dashboard";
import "./global.css";

const appContainer = document.getElementById("APP_ROOT")!;
const reactRoot = createRoot(appContainer);
reactRoot.render(<Dashboard />);

window.addEventListener("message", (event) => {
  if (event.data === "port") {
    const [port] = event.ports;

    if (port) {
      port.addEventListener("message", (event) => {
        console.log(`renderer got message: "${event.data}"`);
      });
      port.postMessage("hello from renderer");
      port.start();
    }
  }
});
