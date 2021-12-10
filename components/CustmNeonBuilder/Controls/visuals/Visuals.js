import {  motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useGlobalContext } from '../../../../context/GlobalContext';
import { useNeonBuilderContext } from '../../../../context/NeonBuilderContext'
import { EURO, POUND, USD } from '../../../CurrencyConverter';

const Visuals = () => {
    
  const [state] = useNeonBuilderContext();
  const [globalState] = useGlobalContext();
  const currencySign = globalState.currency === USD ? '$' : globalState.currency === EURO ? '€' : globalState.currency
    === POUND ? '£' : '$'; 
  
  const divRef = useRef(); 
  const textRef = useRef(); 


  // adjust text size to fit in one line
  useEffect(() => {
    if (!divRef.current || !textRef.current) return; 
    const divWidth = divRef.current.offsetWidth;
    const textWidth = textRef.current.offsetWidth; 
    const scale = Number(divWidth / textWidth).toFixed(4); 
    if (scale < 1) {
      textRef.current.style.transform = `scale(${scale})`
    }
  }, [state.data.text])


  // adjust text depending on user changing the heightScale
  useEffect(() => {
    if (!textRef.current) return;
    textRef.current.style.transform = `scaleY(${state.data.size.heightScale.value})`
  }, [state.data.size.heightScale.value])

    return (
      <div className="col-span-3 lg:col-span-2 row-span-2 lg:row-span-6 flex text-white  relative overflow-hidden p-4">
        {state.data.text ? (
          <>
            <div className="ml-auto text-2xl md:text-5xl absolute top-5 right-5 ">
              {currencySign}
              <span className="italic">
                {Number(Object.values(state.data.price).reduce((a, b) => a+ b)).toFixed(2)}
              </span>
            </div>
            <div
              className="flex w-full justify-center items-center overflow-hidden"
              ref={divRef}
            >
              <p
                ref={textRef}
                className="text-5xl md:text-7xl lg:text-9xl transition-all filter blur-[.5px] brightness-[1.2] whitespace-nowrap relative grid gap-2"
                style={{
                  textShadow: `0 0 20px ${state.data.color}`,
                  color: state.data.color,
                  fontSmooth: "always",
                  fontFamily: state.data.font,
                }}
              >
                <div className="flex items-center gap-2">
                 
                  <span>{state.data.text}</span>
                </div>
               
              </p>
            </div>
          </>
        ) : (
          <div
            className="h-full w-full flex flex-col gap-5 justify-center"
            style={{
              background:
                "linear-gradient(rgba(0, 0, 0,0.9), rgba(0, 0, 0,0.9)), url('/img/neon-banner.jpg')",
            }}
          >
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-3xl lg:text-5xl capitalize text-center"
            >
              neon sign builder
            </motion.h2>
            <p className="text-4xl capitalize text-center z-10">
              start typing!{" "}
            </p>
          </div>
        )}
      </div>
    );
}

export default Visuals




const Indicator = ({ type }) => { 
    const [state] = useNeonBuilderContext();
  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: 1 }}
      exit={{ opacity: 0, scaleY: 0 }}
    >
      <div
        className={`flex items-center ${type === "height" ? " flex-col " : ""}`}
      >
        <div
          className={`bg-white h-[1px] w-4 `}
        ></div>
        <div className={`h-10 w-[1px] bg-white `}></div>
        <div className="text-xs">
          {Number(
            type === "height"
              ? state.data.size.width.value * state.data.size.heightScale.value
              : state.data.size.width.value
          ).toFixed(2)}
        </div>
        <div className="h-10 w-[1px] bg-white"></div>
        <div className="bg-white h-[1px] w-4"></div>
      </div>
    </motion.div>
  );
};