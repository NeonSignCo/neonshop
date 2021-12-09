import { createContext, useContext, useState } from "react";


const Context = createContext();
export const useNeonBuilderContext = () => useContext(Context);

const NeonBuilderContext = ({ children }) => {
    

    const [state, setState] = useState({
      data: {
        text: "",
        font: "",
        color: "",
        size: "",
        customSize: 130,
        backboard: ""
      },
      settings: { heightWidthRatio: 7.93, maxSize: 200, minSize: 43 },
      controls: { showNavigation: false },
    });

    return (
        <Context.Provider value={[state, setState]}>
            {children}
        </Context.Provider>
    )
}

export default NeonBuilderContext
