import { useState } from "react";
import LoadingBtn from "../components/LoadingBtn";

const ForgotPassword = () => {
  
    const [state, setState] = useState({
        loading: false, 
        email: ''
    })
  
    const resetPassword = (e) => {
    try {
        e.preventDefault(); 
        
        setState(state => ({...state, loading: true}))
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-5 lg:px-20 py-20">
      <h2 className="text-4xl sm:text-5xl font-semibold uppercase  text-center">forgot password?</h2>
      <form className="mt-5 grid gap-5 p-2 border sm:w-[500px] mx-auto" onSubmit={resetPassword}>
        <div className="grid gap-2 ">
          <label htmlFor="currentPassword" className="font-semibold">
            Enter your email address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email" 
            autoComplete="current-email" 
            value={state.email} 
            onChange={e => setState(state => ({...state, email: e.target.value}))}
            className="p-2 bg-gray-200"
            required
          />
        </div>
       
        <LoadingBtn loading={state.loading} className="py-2 px-4 bg-gray-800 text-white font-semibold max-w-max capitalize">
         reset password
        </LoadingBtn>
      </form>
    </div>
  );
};

export default ForgotPassword;
