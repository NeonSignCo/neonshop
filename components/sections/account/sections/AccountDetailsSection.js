const AccountDetailsSection = () => {
    
    
    const updateDetails = (e) => {
        try {
            e.preventDefault();
        } catch (error) {
            console.log(error)
        }
    }
    
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
                placeholder="Last Name"
                className="p-2 bg-gray-200"
                required
              />
            </div>
          </div>
          <div className="grid gap-2">
            <label htmlFor="displayName" className="capitalize font-semibold">
              display name *
            </label>
            <input
              type="text"
              name="displayName"
              id="displayName"
              placeholder="Display Name"
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
              placeholder="Email Address"
              className="p-2 bg-gray-200"
              required
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="photo" className="capitalize font-semibold">
              profile pic
            </label>
            <input
              type="file" 
              accept="image/*"
              name="photo"
              id="photo"
            />
          </div> 
          <button className="py-2 px-4 bg-gray-800 text-white font-semibold max-w-max capitalize">update </button>
        </form>
      </div>
    );
}

export default AccountDetailsSection
