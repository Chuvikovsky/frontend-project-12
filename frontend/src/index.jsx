import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import init from "./init.jsx";

const app = async () => {
  createRoot(document.getElementById("chat")).render(await init());
};

app();
