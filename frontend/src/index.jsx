import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
// import init from "./init.jsx";
import init from "rollbar";

const app = async () => {
  createRoot(document.getElementById("chat")).render(await init());
};

app();
