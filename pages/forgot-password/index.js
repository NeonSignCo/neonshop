import { useState } from "react";
import LoadingBtn from "../../components/LoadingBtn";
import { ERROR, SUCCESS, useGlobalContext } from "../../context/GlobalContext";
import Axios from "../../utils/Axios";

const ForgotPassword = () => {
  const [, setGlobalState] = useGlobalContext();
  const [state, setState] = useState({
    loading: false,
    email: "",
  });

  const resetPassword = async (e) => {
    try {
      e.preventDefault();
      
      setState((state) => ({ ...state, loading: true }));

      const res = await Axios.post("mail/forgot-password", {email: state.email});

      setState((state) => ({ ...state, loading: false, email: ''}));
      setGlobalState((state) => ({
        ...state,
        alert: {
          ...state.alert,
          show: true,
          text: res.data.message,
          type: SUCCESS,
          timeout: 5000,
        },
      }));
    } catch (error) { 
      console.log(error)
      const text =
        error.response?.status === 429
          ? error.response.data
          : error.response.data?.message || error.message || "Network Error";
      setState(state => ({...state, loading: false}))
      setGlobalState((state) => ({
        ...state,
        alert: { ...state.alert, show: true, text, type: ERROR, timeout: 5000 },
      }));
    }
  };

  return (
    <div className="p-5 lg:px-20 py-20">
      <h2 className="text-3xl lg:text-5xl capitalize  text-center">
        forgot password?
      </h2>
      <form
        className="mt-5 grid gap-5 p-2 border border-gray-300 sm:w-[500px] mx-auto"
        onSubmit={resetPassword}
      >
        <div className="grid gap-2 ">
          <label htmlFor="email" className="font-semibold">
            Enter your email address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            autoComplete="current-email"
            value={state.email}
            onChange={(e) =>
              setState((state) => ({ ...state, email: e.target.value }))
            }
            className="p-2 bg-gray-200"
            required
          />
        </div>

        <LoadingBtn
          loading={state.loading}
          className="py-2 px-4 bg-gray-800 text-white font-semibold max-w-max capitalize"
        >
          reset password
        </LoadingBtn>
      </form>
    </div>
  );
};

export default ForgotPassword;
