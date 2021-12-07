import { useGlobalContext } from "../context/GlobalContext"
import Banner from "./Banner";
import Nav from "./nav/Nav";

const Container = ({ children }) => {
    
    const [state] = useGlobalContext();

    return (
        <div className="">
            {state.showBanner && <Banner />}
            <Nav/>
            <div className="max-w-screen-2xl mx-auto mt-[66px]">{children}</div>
        </div>
    )
}

export default Container
