import NeonBuilderContext from "../../context/NeonBuilderContext";
import Controls from "./Controls/Controls";
import Visuals from "./Controls/visuals/Visuals";
import { useEffect } from "react";
import { useGlobalContext } from "../../context/GlobalContext";
import Nav from "../nav/Nav";

const CustomNeonBuilder = () => {
  const [globalState, setGlobalState] = useGlobalContext();
  useEffect(() => {
    if (!globalState.showBanner) return; 
    setGlobalState(state => ({...state, showBanner: false}))
  }, [])
  return (
    <NeonBuilderContext>
      <div className="flex flex-col h-screen overflow-hidden">
        <Nav className="h-full static w-full" />
        <div className="h-full bg-black  relative grid lg:grid-cols-3 grid-rows-6">
          <Visuals />
          <Controls />
        </div>
      </div>
    </NeonBuilderContext>
  );
};

export default CustomNeonBuilder;
