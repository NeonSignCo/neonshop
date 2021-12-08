import InstaGallery from "../InstaGallery";
import CustomLink from '../CustomLink'
import { FaFacebook, FaInstagram } from "react-icons/fa";

const FollowSection = () => {
    return (
      <div>
        <h1 className="text-4xl sm:text-5xl text-center uppercase font-semibold mt-20 mb-6">
          follow us on
        </h1>
        <div className="px-5 lg:px-20 flex items-center justify-center gap-5 text-5xl">
          <CustomLink>
            <FaFacebook />
          </CustomLink>
          <CustomLink className="relative">
            <FaInstagram />{" "}
            <span className="text-sm absolute left-1 font-semibold">100k</span>
          </CustomLink>
        </div>
        <div className="mt-20">
          <InstaGallery />
        </div>
      </div>
    );
}

export default FollowSection
