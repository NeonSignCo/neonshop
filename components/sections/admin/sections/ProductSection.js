import { useState } from "react";
import { FaPencilAlt, FaSearch } from "react-icons/fa";
import { useAdminContext } from "../../../../pages/admin";

const ProductSection = () => {
    const [adminState, setAdminState] = useAdminContext();

    const [state, setState] = useState({
        products: adminState.products, 
        selectedProdcutIds : []      
    });

    return (
      <div className="py-5 md:p-10 w-full">
            <SearchBar />
        <div className="hidden md:block mt-5">
          <table className="w-full bg-white">
            <thead className="h-12 border-b border-gray-200">
              <tr className="border border-gray-200">
                <th className="text-left pl-2">
                  <input
                    type="checkbox"
                    checked={state.products?.every((product) =>
                        state.selectedProdcutIds.includes(product._id)
                      )}
                    onChange={(e) =>
                      setState((state) => ({
                        ...state,
                        selectedProdcutIds: !e.target.checked
                          ? []
                          : state.products.map((product) => product._id),
                      }))
                    }
                  />
                </th>
                <th className="text-left">Image</th>
                <th className="text-left">Name</th>
                <th className="text-left">Description</th>
                <th className="text-left">Price(SM)</th>
              </tr>
            </thead>
            <tbody>
              {state.products
                ?.map((product) => (
                  <TableItem
                    key={product._id}
                    product={product}
                    state={state}
                    setState={setState}
                  />
                ))}
            </tbody>
          </table>
        </div>
        <div className="md:hidden grid gap-3 text-black mt-5">
          {state.products
            ?.map((product) => (
              <Item
                key={product._id}
                product={product}
                state={state}
                setState={setState}
              />
            ))}
        </div>
      </div>
    );
}

export default ProductSection

const TableItem = ({ product, state, setState }) => {
  const checked = state.selectedProdcutIds.includes(product._id);
  const toggleCheck = () =>
    setState((state) => ({
      ...state,
      selectedProdcutIds: checked
        ? state.selectedProdcutIds?.filter((id) => id !== product._id)
        : [...state.selectedProdcutIds, product._id],
    }));

  return (
    <tr className="border border-gray-300">
      <td className="pl-2 p-2">
        <input type="checkbox" checked={checked} onChange={toggleCheck} />
      </td>
      <td>
        <img src={product.photo} alt={product.name} className="h-20" />
      </td>
          <td>{product.name}</td> 
          <td>{product.description}</td> 
          <td className="font-semibold">${product.price}</td>
      <td>
        <button className=" rounded-full h-7 w-7 flex items-center justify-center transition active:bg-gray-200 text-purple-600">
          <FaPencilAlt />
        </button>
      </td>
    </tr>
  );
};

const Item = ({ product, state, setState }) => {
  return (
    <div className="p-2 bg-white border flex gap-2">
      <img src={product.photo} alt={product.name} className="object-cover w-32"/> 
      <div className="grid gap-2">
          <p><span className="font-semibold capitalize">name:</span> {product.name}</p>
          <p><span className="font-semibold capitalize">description:</span> {product.description}</p>
          <p><span className="font-semibold capitalize">price:</span> {product.price}</p> 
          <button className="h-10 w-10 flex justify-center items-center rounded-full active:bg-gray-200 transition ml-auto text-purple-700"><FaPencilAlt/></button>
      </div>
    </div>
  );
};





const SearchBar = ({ setState }) => {
  const PRODUCT_ID = "PRODUCT_ID";
  const PRODUCT_NAME = "PRODUCT_NAME";
  const [filter, setFilter] = useState({
      searchBy: PRODUCT_NAME, 
      category: ''
  });

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
           <select className="bg-gray-100 p-2 bg-white border">
             <option>category 1</option>
             <option>category 2</option>
             <option>category 3</option>
             <option>category 4</option>
             <option>category 5</option>
           </select>
         </div>
       </div>
     </div>
   );
};