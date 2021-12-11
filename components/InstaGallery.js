import { FaInstagram } from "react-icons/fa";
import CustomLink from "./CustomLink";

const InstaGallery = ({}) => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-[1px]">
      {items.map((item, i) => (
        <CustomLink className="relative group" href={item.link || "/"} key={i}>
          <img
            src={item.img || `/img/product-images/product-${i + 1}.jpg`}
            alt={item.alt || `product ${i + 1}`}
            className="object-cover h-60"
          />
          <div className="absolute inset-0  bg-black transition-all bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center">
            <FaInstagram className="text-white text-4xl transition group-hover:scale-125" />
          </div>
        </CustomLink>
      ))}
    </div>
  );
};

export default InstaGallery;