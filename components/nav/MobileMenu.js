import { motion } from "framer-motion";
import CustomLink from "../CustomLink"
import MobileDropDown from "./MobileDropDown"

const MobileMenu = () => {
    return (
      <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="bg-gray-800 py-2 px-5 grid lg:hidden gap-3 text-lg absolute w-full uppercase">
        <CustomLink text="design your neon" />
        <MobileDropDown
          title="shop neons"
          items={[
            {
              title: "explore",
              links: [
                { text: "build your own" },
                { text: "inspiration" },
                { text: "shop all" },
              ],
            },
            {
              title: "decoration",
              links: [
                { text: "aesthetic" },
                { text: "inspirational" },
                { text: "neon art" },
                { text: "neon letters" },
                { text: "neon lights" },
                { text: "quotes" },
                { text: "marvel comics" },
                { text: "retro" },
              ],
            },
            {
              title: "occasion",
              links: [
                { text: "christmas" },
                { text: "halloween" },
                { text: "faith" },
                { text: "party" },
                { text: "wedding" },
              ],
            },
            {
              title: "location",
              links: [
                { text: "bar signs" },
                { text: "gaming" },
                { text: "home" },
                { text: "kids home" },
                { text: "man cave" },
              ],
            },
          ]}
        />
        <CustomLink text="blog" />
        <CustomLink text="about" />
        <CustomLink text="contact" />
      </motion.div>
    );
}

export default MobileMenu
