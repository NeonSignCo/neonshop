import NeonBuilderContext from "../../context/NeonBuilderContext";
import Controls from "./Controls/Controls";
import Visuals from "./Controls/visuals/Visuals";
import { useEffect } from "react";
import { useGlobalContext } from "../../context/GlobalContext";

const CustomNeonBuilder = () => {
  const [globalState, setGlobalState] = useGlobalContext();
  useEffect(() => {
    if (!globalState.showBanner) return; 
    setGlobalState(state => ({...state, showBanner: false}))
  }, [])
  return (
    <NeonBuilderContext>
      <div className="bg-black fixed top-[0px] h-[calc(100vh-58px)] md:h-[calc(100vh-62px)] relative grid lg:grid-cols-3 grid-rows-6">
        <Visuals />
        <Controls />
      </div>
    </NeonBuilderContext>
  );
};

export default CustomNeonBuilder;
