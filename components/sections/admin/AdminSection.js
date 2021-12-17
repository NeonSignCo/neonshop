import dynamic from "next/dynamic";
import { ADD_NEW_PRODUCT, CUSTOMERS, DASHBOARD, ORDERS, PRODUCTS, REVIEWS, useAdminContext } from "../../../pages/admin";
import AdminHeader from "./AdminHeader"
import AddNewProductSection from "./sections/AddNewProductSection";
import Sidebar from "./Sidebar"


const DashboardSection = dynamic(() => import('./sections/DashboardSection'));
const OrderSection = dynamic(() => import('./sections/OrderSection'));
const ProductSection = dynamic(() => import('./sections/ProductSection'));
const CustomerSection = dynamic(() => import('./sections/CustomerSection'));
const ReviewSection = dynamic(() => import('./sections/ReviewSection'));

const AdminSection = () => {
    const [state] = useAdminContext();
    return (
      <div className="flex flex-col  min-h-screen bg-[#f1f2f6]">
        <AdminHeader />
        <div className="flex-1 flex gap-2">
          <Sidebar />
          {state.activeSection === DASHBOARD ? (
            <DashboardSection />
          ) : state.activeSection === ORDERS ? (
            <OrderSection />
          ) : state.activeSection === PRODUCTS ? (
            <ProductSection />
          ) : state.activeSection === CUSTOMERS ? (
            <CustomerSection />
          ) : state.activeSection === ADD_NEW_PRODUCT ? (
            <AddNewProductSection/>
          ) : (
            state.activeSection === REVIEWS && <ReviewSection />
          )}
        </div>
      </div>
    );
}

export default AdminSection
