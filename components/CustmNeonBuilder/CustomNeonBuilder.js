import NeonBuilderContext from "../../context/NeonBuilderContext";
import Controls from "./Controls/Controls";
import Visuals from "./Controls/visuals/Visuals";



const CustomNeonBuilder = () => {
  

  return (
    <NeonBuilderContext>
      <div className="bg-black h-[calc(100vh-66px)] relative grid lg:grid-cols-3 grid-rows-6">
        <Visuals/>
        <Controls />
      </div>
    </NeonBuilderContext>
  );
};

export default CustomNeonBuilder;
