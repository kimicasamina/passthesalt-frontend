import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ProvideAuth } from "./context/auth.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProvideAuth>
      <Toaster position="bottom-center" reverseOrder={false} />
      <App />
    </ProvideAuth>
  </StrictMode>
);
