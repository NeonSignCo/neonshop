import { createContext, useContext, useEffect, useState } from "react";
import { sizes } from "../utils/CustomNeonAssets";

const Context = createContext();
export const useNeonBuilderContext = () => useContext(Context);
export const CLEARACRYLIC = "clear acrylic";
export const BLACKACRYLIC = "black acrylic";
export const MIRRORACRYLIC = 'mirror acrylic';
export const GOLDACRYLIC = 'gold acrylic';
export const SQUARE = 'square'; 
export const ROUND = 'round'; 
export const CUT_TO_SHAPE = 'cut to shape'; 
export const MEDIUM = 'medium'; 
export const LARGE = 'large';

const NeonBuilderContext = ({ children }) => {
  const [state, setState] = useState({
    data: {
      text: "",
      font: "MontserratRegular",
      color: "#F7F7F7",
      width: '', 
      size: sizes[0],
      backing: {
        color: CLEARACRYLIC, 
        type: SQUARE
      },
      price: 0,
      installLocation: "indoor",
      mountType: "wall",
      icon: '', 
      note: ''
    },
    controls: { showNavigation: false, showPreview: false, typing: false }, 
    error: {text: ''}
  });

  useEffect(() => {
    const handler = () => {
      if (state.controls.typing) {
        setState(state => ({...state, controls: {...state.controls, typing: false}})); 
      }
    }
    
    const debounce = setTimeout(handler, 1500);
    return () => clearTimeout(debounce);

  }, [state.data.text])

  return (
    <Context.Provider value={[state, setState]}>{children}</Context.Provider>
  );
};

export default NeonBuilderContext;
