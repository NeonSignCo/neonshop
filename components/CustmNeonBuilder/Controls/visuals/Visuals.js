import {  motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useGlobalContext } from '../../../../context/GlobalContext';
import { useNeonBuilderContext } from '../../../../context/NeonBuilderContext'

const Visuals = () => {
  const [state] = useNeonBuilderContext();
  const [globalState] = useGlobalContext();
  const divRef = useRef();
  const textRef = useRef();
  
  // adjust text size to fit one line
  useEffect(() => {
    if (!divRef.current || !textRef.current) return;
    const divWidth = divRef.current.offsetWidth;
    const textWidth = textRef.current.offsetWidth;
    let scale = divWidth / textWidth; 
    if (scale > 1) {
      scale = 1
    } else {
      if (state.data.icon.name) scale = scale - scale*.28;
    }
    textRef.current.style.transform = `scale(${scale})`;
  }, [state.data.text, state.data.icon.name, state.data.font]);


  return (
    <div
      className="col-span-3 lg:col-span-2 row-span-2 lg:row-span-6 flex text-white  relative overflow-hidden p-4"
      style={{
        background: `linear-gradient(rgba(0, 0, 0,0.9), rgba(0, 0, 0,0.9)), url('/img/neon-banner${
          state.data.text ? "-5" : state.data.icon.name? "-5": ""
        }.jpg')`,
      }}
    >
      {state.data.text || state.data.icon.name ? (
        <>
          <div className="ml-auto text-2xl md:text-5xl absolute top-5 right-5 ">
            {globalState.currencySign}
            <span className="italic">
              {Number(
                Object.values(state.data.price).reduce((a, b) => a + b)
              ).toFixed(2)}
            </span>
          </div>
          <div
            className="flex w-full justify-center items-center overflow-hidden"
            ref={divRef}
          >
            <div
              ref={textRef}
              className="text-5xl md:text-7xl lg:text-9xl transition-all filter brightness-[1.2] relative flex items-center justify-center "
              style={{
                textShadow: `0 0 10px ${state.data.color}FF, 0 0 20px ${state.data.color}80,  0 0 40px ${state.data.color}54`,
                color: state.data.color,
                fontFamily: state.data.font, 
                transformStyle: 'preserve-3d'
              }}
            >
              {state.data.icon.name && (
                <img
                  src={`/img/neon-logos/${state.data.icon.link}`}
                  alt={state.data.icon.name}
                  className="h-44 "
                />
              )}
              <span className='whitespace-nowrap'>{state.data.text}</span>
            </div>
          </div>
        </>
      ) : (
        <div className="h-full w-full flex flex-col gap-5 justify-center">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-3xl lg:text-5xl capitalize text-center"
          >
            neon sign builder
          </motion.h2>
          <p className="text-4xl capitalize text-center z-10">start typing! </p>
        </div>
      )}
    </div>
  );
}

export default Visuals

