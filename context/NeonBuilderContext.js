import { createContext, useContext, useState } from "react";

const Context = createContext();
export const useNeonBuilderContext = () => useContext(Context);
export const CUTTOLETTER = 'CUTTOLETTER';
export const RECTANGLE = 'RECTANGLE';
export const STAND = 'STAND';
export const BOXED = 'BOXED';

const NeonBuilderContext = ({ children }) => {
  const [state, setState] = useState({
    data: {
      text: "fff",
      font: "MontserratRegular",
      color: "#F7F7F7",
      size: {
        heightScale: { min: 0.5, max: 2, value: 1 },
        width: { min: 10, max: 200, value: 50 },
      },
      backing: CUTTOLETTER,
      price: 50.0,
      installLocation: "indoor",
      mountType: "wall",
      deliveryTime: "4-6 Weeks",
    },
    controls: { showNavigation: false },
  });

  return (
    <Context.Provider value={[state, setState]}>{children}</Context.Provider>
  );
};

export default NeonBuilderContext;
