import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useNeonBuilderContext } from "../../../../context/NeonBuilderContext";

const Visuals = () => {
  const [state] = useNeonBuilderContext();
  const divRef = useRef();
  const textRef = useRef();

  // adjust text size to fit one line
  useEffect(() => {
    if (!divRef.current || !textRef.current) return;
    const divWidth = divRef.current.offsetWidth;
    const textWidth = textRef.current.offsetWidth;
    let scale = divWidth / textWidth;
    if (scale > 1) {
      scale = 1;
    } else {
      if (state.data.icon.name) scale = scale - scale * 0.28;
    }
    textRef.current.style.transform = `scale(${scale})`;
  }, [state.data.text, state.data.icon.name, state.data.font]);

  return (
    <div
      className="col-span-3 lg:col-span-2 row-span-2 lg:row-span-6 flex text-white  relative overflow-hidden p-4"
      style={{
        background: `linear-gradient(rgba(0, 0, 0,0.9), rgba(0, 0, 0,0.9)), url('/img/neon-banner${
          state.data.text ? "-5" : state.data.icon.name ? "-5" : ""
        }.jpg')`,
      }}
    >
      {state.data.text || state.data.icon.name ? (
        <>
          <AnimatePresence>
            {!state.controls.typing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="ml-auto text-2xl md:text-5xl absolute top-3 right-3 "
              >
                $
                <span className="italic">
                  {Number(state.data.price).toFixed(2)}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
          <div
            className="flex w-full justify-center items-center overflow-hidden"
            ref={divRef}
          >
            <div className="relative">
              <div
                ref={textRef}
                className="text-5xl md:text-7xl lg:text-9xl transition-all relative flex items-center justify-center"
                style={{
                  textShadow: `0 0 10px rgba(${state.data.color.r},${
                    state.data.color.g
                  },${state.data.color.b},1),0 0 20px rgba(${
                    state.data.color.r + 10
                  },${state.data.color.g + 10},${
                    state.data.color.b + 10
                  },0.5),0 0 40px rgba(${state.data.color.r + 10},${
                    state.data.color.g + 10
                  },${state.data.color.b + 10},0.33)`,
                  color: `rgb(${state.data.color.r}, ${state.data.color.g}, ${state.data.color.b})`,
                  fontFamily: state.data.font,
                  transformStyle: "preserve-3d",
                }}
              >
                {state.data.icon.name && (
                  <img
                    src={`/img/neon-logos/${state.data.icon.link}`}
                    alt={state.data.icon.name}
                    className="h-24 md:h-44 "
                  />
                )}
                <span className="whitespace-nowrap">{state.data.text}</span>
              </div>
              <AnimatePresence>
                {!state.controls.typing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 absolute -bottom-8 w-full"
                  >
                    <div className="h-[1px] bg-white flex-1 relative">
                      <div className="absolute -top-[6px] h-[13px] w-[2px] bg-gray-500"></div>
                    </div>
                    {state.data.width}"
                    <div className="h-[1px] bg-white flex-1 relative">
                      <div className="absolute -top-[6px] right-0 h-[13px] w-[2px] bg-gray-500"></div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
};

export default Visuals;
