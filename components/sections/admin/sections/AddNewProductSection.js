import { useState } from 'react';


const AddNewProductSection = () => {

    const [state, setState] = useState({
        name: '',
        photo: '', 
        description: '', 
        

    })


    const addProduct = (e) => {
        try {
            e.preventDefault();
        } catch (error) {
            console.log(error)
        }
    }

    return (
      <div className="py-5 pr-2 md:p-10 w-full">
        <form
          onSubmit={addProduct}
          className="grid gap-5 p-2 border bg-white w-full mx-auto md:w-[500px]"
        >
          <div className="grid gap-2">
            <label htmlFor="name" className="capitalize font-semibold">
              product name
            </label>
            <input
              type="text"
              id="name"
              name="name"
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
              className="p-2 bg-gray-200"
              required
            ></textarea>
          </div>
          <div className="grid gap-2">
            <label htmlFor="price" className="capitalize font-semibold">
              price (USD)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="price"
              className="p-2 bg-gray-200"
              required
            />
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
          <button className="py-2 px-5 bg-gray-200 max-w-max capitalize">
            add product
          </button>
        </form>
      </div>
    );
}

export default AddNewProductSection
