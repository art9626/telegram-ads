import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./mockEnv.ts";
import "./styles.css";
import '@radix-ui/themes/styles.css';

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
