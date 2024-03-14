import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { SignOutAsync, selectLoggedInUser } from "../authSlice"

function Logout() {
    const dispatch = useDispatch()
    const user = useSelector(selectLoggedInUser)
    useEffect(()=>{
        dispatch(SignOutAsync(user.id))
    },[])
    return (
        <>
     {!user &&  <Navigate to='/login' replace={true}></Navigate>}
        </>
    )
  }
  
  export default Logout