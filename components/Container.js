
import Footer from "./Footer";
import Nav from "./nav/Nav";

const Container = ({ children }) => {


    return (
        <div className="">
            <Nav/>
            <div className="max-w-screen-2xl mx-auto mt-[66px]">{children}</div>
            <Footer/>
        </div>
    )
}

export default Container
