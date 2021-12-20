import { useState } from "react";
import { useGlobalContext } from "../../../../context/GlobalContext";

const AccountDetailsSection = () => {
  const [globalState] = useGlobalContext();
  const user = globalState.auth.user;

  const [state, setState] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    userName: user?.userName || "",
    email: user?.email || "",
    photo: user?.photo || "",
  });


    const updateDetails = (e) => {
        try {
            e.preventDefault();
        } catch (error) {
            console.log(error)
        }
    }
    
  const inputChange = (e) =>
    setData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }));
  
    return (
      <div className="bg-white w-full">
        <h2 className="text-xl font-semibold capitalize">account details</h2>
        <form className="mt-5 grid gap-5" onSubmit={updateDetails}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="grid gap-2">
              <label htmlFor="firstName" className="capitalize font-semibold">
                first name *
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={state.firstName}
                onChange={inputChange}
                placeholder="First Name"
                className="p-2 bg-gray-200"
                required
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="lastName" className="capitalize font-semibold">
                last name *
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={state.lastName}
                onChange={inputChange}
                placeholder="Last Name"
                className="p-2 bg-gray-200"
                required
              />
            </div>
          </div>
          <div className="grid gap-2">
            <label htmlFor="userName" className="capitalize font-semibold">
              user name *
            </label>
            <input
              type="text"
              name="userName"
              id="userName"
              value={state.userName}
              onChange={inputChange}
              placeholder="User Name"
              className="p-2 bg-gray-200"
              required
            />
            <p className="text-gray-500 italic">
              This is how your name will show up in the account section and in
              reviews
            </p>
          </div>
          <div className="grid gap-2">
            <label htmlFor="email" className="capitalize font-semibold">
              email address *
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={state.email}
              onChange={inputChange}
              placeholder="Email Address"
              className="p-2 bg-gray-200"
              required
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="photo" className="capitalize font-semibold">
              profile pic
            </label>
            <input type="file" accept="image/*" name="photo" id="photo" /> 
          </div>
          <button className="py-2 px-4 bg-gray-800 text-white font-semibold max-w-max capitalize">
            update{" "}
          </button>
        </form>
      </div>
    );
}

export default AccountDetailsSection
