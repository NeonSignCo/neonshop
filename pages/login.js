import Head from "next/head"
import { useRouter } from "next/router";
import { useState } from "react";
import CustomLink from "../components/CustomLink"
import LoadingBtn from "../components/LoadingBtn";
import { useGlobalContext } from "../context/GlobalContext";
import Axios from "../utils/Axios";

const Login = () => {
    const Router = useRouter();
    const [loading, setLoading] = useState(false); 
    const [, setGlobalState] = useGlobalContext();
    const [state, setState] = useState({
        email: '', 
        password: '', 
        error: ''
    })

    const inputChange = e => setState(state => ({ ...state, [e.target.name]: e.target.value }));

    const login = async (e) => {
        try {
            e.preventDefault(); 
            setLoading(true);
            const res = await Axios.post('/users/login', { email: state.email, password: state.password });
            
             setGlobalState((state) => ({
               ...state,
               auth: {...state.auth, user: res.data.user},
               alert: { ...state.alert, show: true, text: res.data.message },
             }));
            setLoading(false);
            Router.push('/account');
        } catch (error) {
            console.log(error.response)
            setLoading(false)
            setState((state) => ({
              ...state,
              error:
                error.response?.status === 429
                  ? error.response.data
                  : error.response.data?.errorMessage ||
                    error.message ||
                    "Network Error",
            }));
        }
    }

    return (
      <div className="px-5 lg:px-20 py-20">
        <Head>
          <title>Login | NeonShop</title>
        </Head>
        <h1 className="text-3xl lg:text-5xl text-center capitalize">login</h1>
        <div className="max-w-max mx-auto flex flex-col items-center">
          <form
            className="mt-10 p-4 rounded border border-gray-300 sm:w-[300px] mx-auto grid gap-5 transition"
            onSubmit={login}
          >
            <div className="grid gap-2">
              <label htmlFor="email" className="capitalize font-semibold">
                email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={state.email}
                onChange={inputChange}
                className="p-1 rounded-sm border border-gray-300"
                required
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="email" className="capitalize font-semibold">
                password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={state.password}
                onChange={inputChange}
                className="p-1 rounded-sm border border-gray-300"
                required
              />
            </div>
            {state.error && <p className="text-red-500 text-center">{state.error}</p>}
            <LoadingBtn
              loading={loading}
              className="p-1 bg-gray-800 text-white max-w-max px-3 capitalize"
            >
              login
            </LoadingBtn>
          </form>
          <p className="mt-5">
            Don't have an account ?{" "}
            <CustomLink
              href="/sign-up"
              text="Sign up"
              className="font-semibold"
            />{" "}
          </p>
          <CustomLink
            href="/forgot-password"
            text="Forgot Password?"
            className="font-semibold"
          />
        </div>
      </div>
    );
}

export default Login
