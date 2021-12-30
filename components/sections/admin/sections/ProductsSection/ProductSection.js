import { useState } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { SUCCESS, useGlobalContext } from "../../../../../context/GlobalContext";
import { useAdminContext } from "../../../../../pages/admin";
import Axios from "../../../../../utils/Axios";
import catchASync from "../../../../../utils/catchASync";
import LoadingBtn from "../../../../LoadingBtn";
import ProductNavigation from "../../../../ProductNavigation";
import AddNewProductSection from "../AddNewProductSection";
import SearchBar from "./SearchBar";


const ProductSection = () => {
  const [, setGlobalState] = useGlobalContext();  
  const [adminState, setAdminState] = useAdminContext();

    const [state, setState] = useState({
      category: '',
      page: 1,
      productsPerPage: 30,
      selectedProductIds: [],   
      activeProduct: '', 
      searchText: '',
      loading: false
    });

  const deleteProducts = () => catchASync(
    async () => {
      const yes = confirm("Delete these products ?");
      if (!yes) return;
      setState((state) => ({ ...state, loading: true }));
      await Axios.put("products/specific", { ids: state.selectedProductIds });
      setAdminState((adminState) => ({
        ...adminState,
        products: adminState.products.filter(
          (item) => !state.selectedProductIds.includes(item._id)
        ),
      }));
      setState((state) => ({
        ...state,
        loading: false,
      }));
      setGlobalState(state => ({ ...state, alert: { ...state.alert, show: true, type: SUCCESS, text: 'products deleted', timeout: 3000 } }));

    },
    setGlobalState,
    () => setState((state) => ({ ...state, loading: false }))
  );
    


    return (
      <div className="py-5 md:p-10 w-full">
        {!state.activeProduct && (
          <SearchBar state={state} setState={setState} />
        )}
        {!state.activeProduct ? (
          <div className="">
            {" "}
            <div className="hidden md:block mt-5">
              {state.selectedProductIds.length > 0 && (
                <div className="p-2 pr-12 bg-white border flex justify-between">
                  <p>delete these products?</p>
                  <LoadingBtn
                    loading={state.loading}
                    className="bg-red-500 text-white py-1 px-2"
                    onClick={deleteProducts}
                  >
                    delete
                  </LoadingBtn>
                </div>
              )}
              <table className="w-full bg-white">
                <thead className="h-12 border-b border-gray-200">
                  <tr className="border border-gray-200">
                    <th className="text-left pl-2">
                      <input
                        type="checkbox"
                        checked={
                          state.selectedProductIds.length > 0 &&
                          state.selectedProductIds.length ===
                            adminState.products?.length
                        }
                        onChange={(e) =>
                          setState((state) => ({
                            ...state,
                            selectedProductIds: !e.target.checked
                              ? []
                              : adminState.products.map(
                                  (product) => product._id
                                ),
                          }))
                        }
                      />
                    </th>
                    <th className="text-left">Image</th>
                    <th className="text-left">Name</th>
                    <th className="text-left">Description</th>
                    <th className="text-left">Price(lowest)</th>
                  </tr>
                </thead>
                <tbody>
                  {adminState.products?.map((product) => (
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
              fdddd
              {adminState.products?.map((product) => (
                <Item
                  key={product._id}
                  product={product}
                  state={state}
                  setState={setState}
                />
              ))}
            </div>
            <div className="flex p-2 items-center">
              <ProductNavigation
                productsCount={state.numOfProducts}
                state={state}
                setState={setState}
              />
            </div>
          </div>
        ) : (
          <AddNewProductSection
            product={state.activeProduct}
            setOrdersSection={setState}
            edit={true}
            className="mt-5 md:p-0 "
          />
        )}
      </div>
    );
}

export default ProductSection

const TableItem = ({ product, state, setState }) => { 
  const [, setGlobalState] = useGlobalContext();
  const [adminState, setAdminState] = useAdminContext();
  const checked = state.selectedProductIds.includes(product._id);

  const [loading, setLoading] = useState(false); 


  const deleteProduct = () => catchASync(async () => {
    const yes = confirm('delete this product ?'); 
    if (!yes) return;
    setLoading(true);
    await Axios.delete(`products/${product._id}`);
    setLoading(false);
    setAdminState((state) => ({
      ...state,
      products: adminState.products.filter((item) => item._id !== product._id),
    })); 
    setState((state) => ({
      ...state,
      products: adminState.products.filter((item) => item._id !== product._id),
    })); 
  }, setGlobalState, setLoading(false))

  const toggleCheck = () => {
    setState((state) => ({
      ...state,
      selectedProductIds: checked
        ? state.selectedProductIds?.filter((id) => id !== product._id)
        : [...state.selectedProductIds, product._id],
    }));
  }

  return (
    <tr className="border border-gray-300">
      <td className="pl-2 p-2">
        <input type="checkbox" checked={checked} onChange={toggleCheck} />
      </td>
      <td>
        <img
          src={product.image.url}
          alt={product.name}
          className="h-20 w-32 w-full object-cover"
        />
      </td>
      <td>{product.name}</td>
      <td>{product.description}</td>
      <td className="font-semibold">${product.sizes[0].price}</td>
      <td>
        <button
          className=" rounded-full h-10 w-10 flex items-center justify-center transition active:bg-gray-200 text-purple-600"
          onClick={() =>
            setState((state) => ({ ...state, activeProduct: product }))
          }
        >
          <FaPencilAlt />
        </button>
      </td>
      <td>
        <LoadingBtn
          loading={loading}
          className=" rounded-full h-10 w-10 flex items-center justify-center transition active:bg-gray-200 text-red-500 " 
          borderColor="border-red-500"
          onClick={deleteProduct}
        >
          {!loading && <FaTrash />}
        </LoadingBtn>
      </td>
    </tr>
  );
};

const Item = ({ product, state, setState }) => {
  return (
    <div className="p-2 bg-white border border-gray-300 shadow flex gap-2">
      <img
        src={product.image.url}
        alt={product.name}
        className="object-cover w-32"
      />
      <div className="grid gap-2 w-full">
        <p>
          <span className="font-semibold capitalize">name:</span> {product.name}
        </p>
        <p>
          <span className="font-semibold capitalize">description:</span>{" "}
          {product.description}
        </p>
        <p>
          <span className="font-semibold capitalize">price:</span>{" "}
          {product.sizes[0].price}
        </p>
        <button
          className="h-10 w-10 flex justify-center items-center rounded-full active:bg-gray-200 transition ml-auto  text-purple-700"
          onClick={() =>
            setState((state) => ({ ...state, activeProduct: product }))
          }
        >
          <FaPencilAlt />
        </button>
      </div>
    </div>
  );
};






