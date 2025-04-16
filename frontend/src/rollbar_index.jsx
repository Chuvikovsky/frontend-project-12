import { createRoot } from "react-dom/client";
import App from "./rollbar";

const app = () => {
  createRoot(document.getElementById("chat")).render(<App />);
};

app();
