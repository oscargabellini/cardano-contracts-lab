import { Buffer } from "buffer";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Toaster } from "./components/ui/toast/toaster.tsx";
import "./index.css";
import { ThemeProvider } from "./providers/theme-provider";
window.global = window;
globalThis.Buffer = Buffer;

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <ThemeProvider defaultTheme="system" enableSystem attribute="class">
    <App />
    <Toaster />
  </ThemeProvider>
  // </StrictMode>
);
