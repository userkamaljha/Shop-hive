import Navbar from "../features/navbar/Navbar"
import UserOrders from "../features/user/components/UserOrder"

function UserOrderPage() {

    return (
      <>
       <Navbar/>
       <h1 className="text-2xl mx-28 my-8 font-semibold">My Orders</h1>
      <UserOrders/>
      </>
    )
  }
  
  export default UserOrderPage