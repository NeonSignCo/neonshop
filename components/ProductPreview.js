import { FaDollarSign } from "react-icons/fa";
import CustomLink from "./CustomLink";

const ProductPreview = ({name="yeet neon sign", img = "/img/product-1.jpg", price = 500, text = "buy now", link= "/", hot= false}) => {
    return (
      <div className="flex-1 flex flex-col items-center gap-5 text-black relative">
        <CustomLink hre={link} className="relative h-60">
          <img src={img} alt={name} className="object-cover h-full"/>
        </CustomLink>
        <p className="uppercase">{name}</p>
        <p className="flex items-center tracking-[3px]">
          <FaDollarSign /> {Number(price).toFixed(2)}
        </p>
        <CustomLink
          href={link}
          text={text}
          className="px-5 py-2 sm:px-10 sm:py-4 md:px-16 flex items-center justify-center bg-black text-white"
        />
        {hot && (
          <div className="absolute bg-gray-800 py-[2px] px-3 text-white -top-3 -right-2 uppercase">
            hot
          </div>
        )}
      </div>
    );
}

export default ProductPreview
