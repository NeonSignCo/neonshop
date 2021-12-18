import { useState } from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';


const AddNewProductSection = () => {

    const [state, setState] = useState({
        name: '',
        photo: '', 
        description: '',  
      sizes: [], 
        size: {
          info: '', 
          price: '', 
          errors: {
            info: false, 
            price: false
          }
        }

    })


    const addProduct = (e) => {
        try {
            e.preventDefault();
        } catch (error) {
            console.log(error)
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
      size: {...state.size, info: '', price: ''},
      sizes: [
        ...state.sizes,
        {
          key:
            state.sizes.length === 0
              ? 0
              : state.sizes[state.sizes.length - 1].key + 1,
          info: state.size.info,
          price: state.size.price,
        },
      ],
    })); 
    document.getElementById("size-info").focus();
  }

    return (
      <div className="py-5 pr-2 md:p-10 w-full">
        <form
          onSubmit={addProduct}
          className="grid gap-5 p-2 border bg-white w-full mx-auto md:w-[700px]"
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
          <div className="grid gap-2">
            <label htmlFor="photo" className="capitalize font-semibold">
              photo
            </label>
            <input
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              required
            />
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
                  required
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
                  required
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
            <div className="capitalize font-semibold">sizes</div>
            {state.sizes.length > 0 && (
              <div className="grid gap-2 border p-2 border-gray-300">
                {state.sizes.map((size) => (
                  <SizeItem key={size.key} size={size} setState={setState} />
                ))}
              </div>
            )}
          </div>
          <button className="py-2 px-5 bg-gray-800 text-white max-w-max capitalize">
            add product
          </button>
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
          item.key === size.key
            ? { key: size.key, info: data.newInfo, price: data.newPrice }
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
              sizes: state.sizes.filter((item) => item.key !== size.key),
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