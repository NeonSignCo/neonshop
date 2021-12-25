import { useState } from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { useAdminContext } from '../../../../pages/admin'
import Axios from '../../../../utils/Axios';
import LoadingBtn from '../../../LoadingBtn';
import { ERROR, SUCCESS, useGlobalContext } from '../../../../context/GlobalContext';
import uid from 'uniqid';

const AddNewProductSection = ({product, className, edit= false, close}) => {
  const [, setGlobalState] = useGlobalContext()
  const [adminState, setAdminState] = useAdminContext();
  const [loading, setLoading] = useState(false);
    const [state, setState] = useState({
      name: product?.name || "",
      image: "",
      previewImage: product?.image?.url || '',
      description: product?.description || "",
      category: product?.category || "", 
      sizes: product?.sizes || [],
      size: {
        info: "",
        price: "",
        errors: {
          info: false,
          price: false, 
        },
      },  
      errors: {
        size: ''
      }
    });

    const addOrUpdateProduct = async (e) => {
        try {
          e.preventDefault();
               if (state.sizes.length === 0)
                 return setState((state) => ({
                   ...state,
                   errors: {
                     ...state.errors,
                     size: "atleaset one size is required",
                   },
                 })); 

          setLoading(true)
          const sizes = JSON.parse(JSON.stringify(state.sizes)); 
          for (let key in sizes) delete sizes[key]._id; 
          const data = {
            name: state.name,
            description: state.description,
            category: state.category,
            sizes: JSON.stringify(sizes),
            image: state.image, 

          };
          const formData = new FormData();
          for (let key in data) formData.append(key, data[key]);

          let res;
          if (edit) {
            res =  await Axios.patch(`products/${product._id}`, formData)
          } else {
            res = await Axios.post("products", formData); 
          }


            setLoading(false);
            setAdminState((state) => ({
              ...state,
              products: edit
                ? adminState.products.map((item) =>
                    item._id === product._id ? res.data.product : item
                  )
                : [res.data.product, ...adminState.products],
            }));
          
          setGlobalState(state => ({ ...state, alert: { ...state.alert, show: true, text: res.data.message, type: SUCCESS, timeout: 3000 } })); 
         
          // clear form
          setState((state) => ({
            ...state,
            name: '', 
            image: '', 
            previewImage: "", 
            description: '', 
            category: '',
            sizes: [],
            
            
          }));
         
          // close this component after task completed when in edit mode
          if (edit) close();
        } catch (error) {  
          setLoading(false);
            setGlobalState((state) => ({
              ...state,
              alert: {
                ...state.alert,
                show: true, 
                text: error.response?.data?.message || error.message || 'Network Error',
                type: ERROR,
                timeout: 3000,
              },
            }));
        }
    }

  
  const inputChange = (e) => setState(state => ({ ...state, [e.target.name]: e.target.value }));
  
  const addSize = () => {
      
    if (!state.size.info || !state.size.price) {
      return setState((state) => ({
        ...state,
        size: {
          ...state.size,
          errors: { info: !state.size.info, price: !state.size.price },
        },
       
      }));
    } 
    
    setState((state) => ({
      ...state,
      size: { ...state.size, info: "", price: "" },
      errors: { ...state.errors, size: "" },
      sizes: [
        ...state.sizes,
        {
          _id: uid(),
          info: state.size.info,
          price: state.size.price,
        },
      ],
    })); 
    document.getElementById("size-info").focus();
  }



    return (
      <div className={`py-5 pr-2 md:p-10 w-full ${className}`}>
        <form
          onSubmit={addOrUpdateProduct}
          className="grid gap-5 p-2 border bg-white w-full"
        >
          <div className="grid gap-2">
            <label htmlFor="name" className="capitalize font-semibold">
              product name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={state.name}
              onChange={inputChange}
              className="p-2 bg-gray-200"
              placeholder="name"
              required
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="description" className="capitalize font-semibold">
              description
            </label>
            <textarea
              rows="3"
              id="description"
              name="description"
              placeholder="description"
              value={state.description}
              onChange={inputChange}
              className="p-2 bg-gray-200"
              required
            ></textarea>
          </div>
          {edit && product?.image?.url ? (
            <div className="grid gap-2">
              <p className="capitalize font-semibold">image</p>
              <div className="flex gap-2 items-end">
                <img
                  src={state.previewImage}
                  alt={product?.name}
                  className="h-20"
                />
                <label htmlFor='image' className="bg-gray-800 text-white p-2 capitalize">
                  change
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*" 
                  className='h-0 w-0' 
                  onChange={(e) =>
                    setState((state) => ({
                      ...state,
                      image: e.target.files[0], 
                      previewImage: URL.createObjectURL(e.target.files[0]), 

                    }))
                  }
                />
              </div>
            </div>
          ) : (
            <div className="grid gap-2">
              <label htmlFor="image" className="capitalize font-semibold">
                image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={(e) =>
                  setState((state) => ({ ...state, image: e.target.files[0] }))
                }
                required
              />
            </div>
          )}
          <div className="grid gap-2">
            <label htmlFor="name" className="capitalize font-semibold">
              category
            </label>
            <select
              name="category"
              id="category"
              value={state.category}
              onChange={inputChange}
              className="p-2 bg-gray-200"
              required
            >
              <option value="" className="p-2 bg-gray-200">
                Product Category
              </option>
              {adminState.categories &&
                adminState.categories.map((item) => (
                  <option value={item._id} key={item._id} className="">
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="grid gap-2">
            <p className="capitalize font-semibold">add size</p>
            <div className="flex flex-col  gap-3 p-4 border border-gray-300">
              <div className="flex-1 flex flex-col gap-2">
                <label
                  htmlFor="size-info"
                  className={`capitalize font-semibold ${
                    state.size.errors.info ? "text-red-500" : ""
                  }`}
                >
                  size info
                </label>
                <textarea
                  name="sizeInfo"
                  id="size-info"
                  rows="2"
                  value={state.size.info}
                  onChange={(e) =>
                    setState((state) => ({
                      ...state,
                      size: {
                        ...state.size,
                        info: e.target.value,
                        errors: { ...state.size.errors, info: false },
                      },
                    }))
                  }
                  placeholder="Size Info"
                  className="p-2 bg-gray-200"
                ></textarea>
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="price"
                  className={`capitalize font-semibold ${
                    state.size.errors.price ? "text-red-500" : ""
                  }`}
                >
                  price (USD)
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={state.size.price}
                  onChange={(e) =>
                    setState((state) => ({
                      ...state,
                      size: {
                        ...state.size,
                        price: e.target.value,
                        errors: { ...state.size.errors, price: false },
                      },
                    }))
                  }
                  className="p-2 bg-gray-200 w-20"
                  placeholder="Price"
                />
              </div>
              <button
                type="button"
                className="capitalize bg-gray-800 text-white mt-auto py-2 px-4 max-w-max "
                onClick={addSize}
              >
                add
              </button>
            </div>
          </div>
          <div className="grid gap-2">
            <div className="capitalize font-semibold">
              sizes{" "}
              {state.errors.size && (
                <span className="text-red-500">({state.errors.size})</span>
              )}
            </div>
            {state.sizes.length > 0 && (
              <div className="grid gap-2 border p-2 border-gray-300">
                {state.sizes.map((size) => (
                  <SizeItem key={size._id} size={size} setState={setState} />
                ))}
              </div>
            )}
          </div>
          <div className="flex gap-3">
            <LoadingBtn
              loading={loading}
              className="py-2 px-5 bg-gray-800 text-white max-w-max capitalize"
            >
              {edit ? "update product" : "add product"}
            </LoadingBtn>
            {edit && (
              <button
                className="py-2 px-5 border border-gray-800 transition hover:bg-gray-800 hover:text-white max-w-max capitalize"
                onClick={close}
              >
                cancel
              </button>
            )}
          </div>
        </form>
      </div>
    );
}

export default AddNewProductSection



const SizeItem = ({size, setState}) => {

  const [expand, setExpand] = useState(false);
  const [data, setData] = useState({
    newInfo: size.info, 
    newPrice: size.price, 
    errors: {
      newInfo: false, 
      newPrice: false
    }
  })

  const update = () => {
    if(data.newInfo && data.newPrice) setExpand(bool => !bool); 
    
    // check if both fields have value 
    if (!data.newInfo || !data.newPrice) return setData(data => ({ ...data, errors: { newInfo: !data.newInfo, newPrice: !data.newPrice } }));

    // only update if data is changed
    if (data.newInfo !== size.info || data.newPrice !== size.price) {
      setState((state) => ({
        ...state, 
        sizes: state.sizes.map((item) =>
          item._id === size._id
            ? { ...size, info: data.newInfo, price: data.newPrice }
            : item
        ),
      }));
    }
  }

  return (
    <div className="grid gap-2 p-2 border border-gray-300">
      <div className="flex gap-2 ">
        <div
          className={`font-semibold ${
            data.errors.newInfo ? "text-red-500" : ""
          }`}
        >
          Info:
        </div>
        {expand ? (
          <textarea
            rows="1"
            className="p-2 bg-gray-200 w-full"
            value={data.newInfo}
            onChange={(e) =>
              setData((data) => ({ ...data, newInfo: e.target.value, errors: {...data.errors, newInfo: false} }))
            }
            placeholder="Size Info"
          />
        ) : (
          <div>{size.info}</div>
        )}
      </div>
      <div className="flex gap-2">
        <div
          className={`font-semibold ${
            data.errors.newPrice ? "text-red-500" : ""
          }`}
        >
          Price:
        </div>
        {expand ? (
          <input
            type="number"
            className="p-2 bg-gray-200"
            value={data.newPrice}
            onChange={(e) =>
              setData((data) => ({ ...data, newPrice: e.target.value, errors: {...data.errors, newPrice: false} }))
            }
            placeholder="Price"
          />
        ) : (
          <div>{size.price}</div>
        )}
      </div>
      <div className="flex gap-2 items-center">
        <button
          type="button"
          className="bg-gray-300 p-2 transition hover:bg-gray-400"
          onClick={update}
          title="Edit"
        >
          <FaPencilAlt />
        </button>
        <button
          type="button"
          className="bg-gray-300 p-2 transition hover:bg-gray-400"
          onClick={() =>
            setState((state) => ({
              ...state,
              sizes: state.sizes.filter((item) => item._id !== size._id),
            }))
          }
          title="Delete"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
} 