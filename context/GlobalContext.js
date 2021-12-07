import { createContext, useContext, useState } from "react"

const Context = createContext();
export const useGlobalContext = () => useContext(Context);

const GlobalContext = ({ children }) => {
    
    const [state, setState] = useState({
        showBanner: true
    }) 


    return (
        <Context.Provider value={[state, setState]}>
            {children}
        </Context.Provider>
    )
}

export default GlobalContext
