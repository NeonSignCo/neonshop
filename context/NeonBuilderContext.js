import { createContext, useContext, useState } from "react";

const Context = createContext();
export const useNeonBuilderContext = () => useContext(Context);
export const CLEARACRYLIC = "clear acrylic";
export const BLACKACRYLIC = "black acrylic";
export const MIRRORACRYLIC = 'mirror acrylic';
export const GOLDACRYLIC = 'gold acrylic';

const NeonBuilderContext = ({ children }) => {
  const [state, setState] = useState({
    data: {
      text: "",
      font: "MontserratRegular",
      color: "#F7F7F7",
      height: '', 
      width: '',
      backing: CLEARACRYLIC,
      price: {basic: 50, backing: 0},
      installLocation: "indoor",
      mountType: "wall",
      deliveryTime: "4-6 Weeks", 
      icon: {link: '', name: ''}
    },
    controls: { showNavigation: false, showPreview: false }, 
    error: {size: '', text: ''}
  });

  return (
    <Context.Provider value={[state, setState]}>{children}</Context.Provider>
  );
};

export default NeonBuilderContext;
