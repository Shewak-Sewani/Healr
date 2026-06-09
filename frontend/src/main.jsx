import { createRoot } from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { CartProvider } from "./components/CartContext";
import App from "./App.jsx";
import { React, StrictMode } from "react";

// Clear localStorage on app startup
localStorage.clear();

createRoot(document.getElementById("root")).render(
  <CartProvider>
    <App />
  </CartProvider>
);
