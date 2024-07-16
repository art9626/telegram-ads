import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./mockEnv.ts";
import "./styles.css";
import { initViewport } from "@telegram-apps/sdk";

if (import.meta.env.DEV) {
  ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
} else {
  const [viewport] = initViewport();
  viewport.then((data) => {
    data.expand();
    ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
  });
}
