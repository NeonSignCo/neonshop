import { useGlobalContext } from "../../context/GlobalContext";


// types of model 
export const CUSTOMNEONMODEL = "CUSTOMNEONMODEL";


const ModalContainer = () => {
    
    const [state] = useGlobalContext();
    
    return (
        <div className="fixed inset-1/2 flex items-center justify-center z-20">
            <div className="min-w-max">{state.modal.type === CUSTOMNEONMODEL && <CustomNeonSignModel/> }</div>
        </div>
    )
}

export default ModalContainer
 