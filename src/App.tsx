import { MeshProvider } from "@meshsdk/react";
import "@meshsdk/react/styles.css";
import "./App.css";
import { Home } from "./modules/home";

function App() {
  return (
    <>
      <main>
        <MeshProvider>
          <Home />
        </MeshProvider>
      </main>
    </>
  );
}

export default App;
