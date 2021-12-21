import CustomLink from "../../../CustomLink";

const ChangePasswordSection = () => {

     
    const updatePassword = (e) => {
      try {
        e.preventDefault();
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <div className="bg-white w-full">
        <h2 className="text-xl font-semibold capitalize">change password</h2>
        <form className="mt-5 grid gap-5" onSubmit={updatePassword}>
          <div className="grid gap-2 max-w-max">
            <label
              htmlFor="currentPassword"
              className="capitalize font-semibold"
            >
              current password *
            </label>
            <input
              type="password"
              name="currentPassword"
              id="currentPassword"
              placeholder="Current Password"
              className="p-2 bg-gray-200"
              required
            />
          </div>
          <div className="grid gap-2 max-w-max">
            <label htmlFor="newPassword" className="capitalize font-semibold">
              new password *
            </label>
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              placeholder="new Password"
              className="p-2 bg-gray-200"
              required
            />
          </div>
          <div className="grid gap-2 max-w-max">
            <label
              htmlFor="confirmPassword"
              className="capitalize font-semibold"
            >
              confirm password *
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm Password"
              className="p-2 bg-gray-200"
              required
            />
          </div>
          <button className="py-2 px-4 bg-gray-800 text-white font-semibold max-w-max capitalize">
           save changes
          </button>
        </form> 
        <p className="mt-5">Forgot password ? <CustomLink className="capitalize font-semibold" href="/forgot-password" text="reset password"/> </p>
      </div>
    );
}

export default ChangePasswordSection
