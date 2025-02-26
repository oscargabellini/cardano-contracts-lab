import { Buffer } from "buffer";

declare global {
  interface Window {
    Buffer: typeof Buffer;
    global: any;
  }
}

window.global = window;
window.Buffer = Buffer;
globalThis.Buffer = Buffer;
