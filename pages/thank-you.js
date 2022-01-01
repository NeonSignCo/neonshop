import CustomLink from "../components/CustomLink";
import connectDb from "../server/utils/connectDb";
import getUpdatedCart from "../server/utils/getUpdatedCart";
import getLoggedInUser from "../utils/getLoggedInUser";

const ThankYou = () => {
    return (
      <div className="px-5 lg:px-20 py-20">
        <div className="flex flex-col gap-10 items-center text-center">
          <h1 className="text-3xl text-green-500">
            thank you for you order!
          </h1>
          <p>
            Check your email for confirmation message or check you order status
            in your{" "}
            <CustomLink
              href="/account"
              className="font-semibold"
              text="account page"
            />
          </p>
          <div className="flex gap-2 items-center gap-3">
            <CustomLink
              href="/shop"
              className="py-2 px-8 bg-gray-900 text-white capitalize"
              text="Shop"
            />
            <CustomLink
              href="/custom-neon-sign"
              className="py-2 px-8 bg-gray-900 text-white capitalize"
              text="custom neon"
            />
          </div>
        </div>
      </div>
    );
}

export default ThankYou



export const getServerSideProps = async ({ query, req }) => {
    
    try {
      const ordered = query.ordered; 

        if (!ordered)
          return {
            redirect: {
              destination: "/",
              permanent: false,
            },
            };
        
        
       await connectDb();
       
      
     const user = await getLoggedInUser(req);

     if (!user) {
       return {
         redirect: {
           destination: "/login",
           permanent: false,
         },
       };
     }
     const cart = await getUpdatedCart(user._id);

     
     return {
       props: {
         user: JSON.parse(JSON.stringify(user)),
         cart: JSON.parse(JSON.stringify(cart)),
         serverRendered: true,
       },
     };
   } catch (error) {
     console.log(error);
     return {
       props: {
         error: { code: 500, message: "server error" },
       },
     };
   }
}