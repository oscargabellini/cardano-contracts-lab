import { Outlet } from "@tanstack/react-router";
import { Navbar } from "../components/navbar";

export const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};
