import NeonBuilderContext from "../../context/NeonBuilderContext";
import Controls from "./Controls/Controls";



const CustomNeonBuilder = () => {
  

  return (
    <NeonBuilderContext>
      <div className="bg-black h-[calc(100vh-66px)] relative flex  flex-col lg:flex-row ">
        <div className="flex-1 flex justify-center items-center text-white">
          neondddd
        </div>
        <Controls />
      </div>
    </NeonBuilderContext>
  );
};

export default CustomNeonBuilder;
