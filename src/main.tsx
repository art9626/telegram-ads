import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./mockEnv.ts";
import "./styles.css";
import { initViewport } from "@telegram-apps/sdk";

if (import.meta.env.PROD) {
  const [viewport] = initViewport();
  viewport.then(({ expand }) => {
    expand();
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
