import Navbar from "../features/navbar/Navbar"
import UserProfile from "../features/user/components/UserProfile"

function UserProfilePage() {

    return (
      <>
       <Navbar/>
       <h1 className="text-2xl mx-28 my-8 font-semibold">Your Profile</h1>
      <UserProfile/>
      </>
    )
  }
  
  export default UserProfilePage