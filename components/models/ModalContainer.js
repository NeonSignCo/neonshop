import { BsX } from "react-icons/bs";
import { useGlobalContext } from "../../context/GlobalContext";
import CustomNeonSignModal from "./CustomNeonSignModal";


// types of model 
export const CUSTOMNEONMODEL = "CUSTOMNEONMODEL";


const ModalContainer = () => {
    
    const [state] = useGlobalContext();
    
    return (
      <div className="fixed inset-1/2 flex items-center justify-center z-20">
        <div className="min-w-max">
          

          {state.modal.type === CUSTOMNEONMODEL && <CustomNeonSignModal />}
        </div>
      </div>
    );
}

export default ModalContainer
 