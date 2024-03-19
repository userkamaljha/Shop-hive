import { useEffect } from 'react'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import { useDispatch, useSelector } from 'react-redux'
import { fetchItemByUserIdAsync } from './features/cart/cartSlice'
import { selectLoggedInUser } from './features/auth/authSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchLoggedInUserAsync } from './features/user/userSlice'


function App() {
  const dispatch = useDispatch()
  const user = useSelector(selectLoggedInUser)
useEffect(()=>{
  if(user){
    dispatch(fetchItemByUserIdAsync(user.id))
    dispatch(fetchLoggedInUserAsync(user.id))
  }
}, [user.id])



  return (
    <>
    <Home></Home>
    </>
  )
}

export default App
