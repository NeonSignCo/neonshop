import { motion } from "framer-motion";
import CustomLink from "../CustomLink"
import MobileDropDown from "./MobileDropDown"

const MobileMenu = ({closeMenu}) => {
    return (
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0, transition: { duration: 0.2 } }}
        exit={{ x: "100%", transition: { duration: 0.2 } }}
        className="bg-gray-900 lg:hidden text-lg absolute w-full h-screen uppercase"
      >
        <div className="py-5 px-5 flex flex-col gap-3 overflow-auto h-[calc(100vh-60px)]">
          <CustomLink
            href="/custom-neon-sign"
            text="design your neon"
            onClick={closeMenu}
          />
          <MobileDropDown
            closeMenu={closeMenu}
            title="shop neons"
          />
          <CustomLink href="/about" text="about" onClick={closeMenu} />
          <CustomLink href="/contact" text="contact" onClick={closeMenu} />
        </div>
      </motion.div>
    );
}

export default MobileMenu
