import { MeshProvider } from "@meshsdk/react";
import "@meshsdk/react/styles.css";
import { RouterProvider } from "@tanstack/react-router";
import "./App.css";
import { router } from "./config/router/routes";
import { QueryClientProviderWrapper } from "./providers/query-client-provider";

function App() {
  return (
    <>
      <main>
        <QueryClientProviderWrapper>
          <MeshProvider>
            <RouterProvider router={router} />
          </MeshProvider>
        </QueryClientProviderWrapper>
      </main>
    </>
  );
}

export default App;
