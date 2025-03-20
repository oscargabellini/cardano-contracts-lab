import { MeshProvider } from "@meshsdk/react";
import "@meshsdk/react/styles.css";
import { RouterProvider } from "@tanstack/react-router";
import "./App.css";
import { router } from "./config/router/routes";

function App() {
  return (
    <>
      <main>
        <MeshProvider>
          <RouterProvider router={router} />
        </MeshProvider>
      </main>
    </>
  );
}

export default App;
