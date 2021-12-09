
import Footer from "./Footer";
import Nav from "./nav/Nav";
import { useRouter } from "next/router";

const Container = ({ children }) => {
    const route = useRouter().route;

    return (
      <div className="min-h-screen flex flex-col justify-between">
        <Nav />
        <div>
          <div className="max-w-screen-2xl mx-auto pt-[66px]">{children}</div>
        </div>
        {route !== "/custom-neon-sign" && <Footer />}
      </div>
    );
}

export default Container
