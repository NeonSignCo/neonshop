import { useState } from "react";
import { useAdminContext } from "../../../../../pages/admin";
import { FaSearch } from "react-icons/fa";

// variables 
const PRODUCT_NAME = 'PRODUCT_NAME'; 
const PRODUCT_ID = 'PRODUCT_ID';


const SearchBar = () => {

  const [adminState, setAdminState] = useAdminContext();
  const [filter, setFilter] = useState({
    searchBy: PRODUCT_NAME,
    category: "", 
  });

    const filterProducts = e => {
      
  }
    
    
  return (
    <div className="flex flex-col gap-3">
      <div className="flex rounded border max-w-max overflow-hidden">
        <input type="text" placeholder="Search Product" className="p-2" />

        <button className="py-2 px-3 bg-gray-200">
          <FaSearch />
        </button>
      </div>
      <div className="flex gap-3 items-center flex-wrap">
        <div className="flex flex-col gap-1">
          <p className="capitalize">search by</p>
          <select className="bg-gray-100 p-2 bg-white border">
            <option value={PRODUCT_NAME}>Product Name</option>
            <option value={PRODUCT_ID}>Product Id</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <p className="capitalize">category</p>
          <select
            className="bg-gray-100 p-2 bg-white border"
            defaultValue={filter.category} 
            onChange={filterProducts}
          >
           {adminState.categories.map(item => <option value={item._id} key={item._id}>{item.name}</option> )}
          </select>
        </div>
      </div>
    </div>
  );
};


export default SearchBar;