import { Navbar } from "../components/navbar";
import { Lock } from "./lock";
import { Unlock } from "./unlock";

export const Home = () => {
  return (
    <>
      <div>
        <Navbar />
        <div className="grid grid-cols-2 gap-4 justify-center w-full mt-10">
          <Lock />
          <Unlock />
        </div>
      </div>
    </>
  );
};
