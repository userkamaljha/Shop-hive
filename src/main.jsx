import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import CartPage from './pages/CartPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'


let router = createBrowserRouter([
  {
    path:'/',
    element: <App/>,
  },
  {path:'/login',
   element:<LoginPage/>
  },
  {path:'/signup',
   element:<SignupPage/>
  },
  {
    path:'/cart',
    element:<CartPage/>
  },
  {
    path:'/checkout',
    element:<CheckoutPage/>
  },

])

ReactDOM.createRoot(document.getElementById('root')).render(

  
  <React.StrictMode>
   <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
