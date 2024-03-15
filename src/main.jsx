import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import CartPage from './pages/CartPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import ProductDetailsPage from './pages/ProductDetailsPage.jsx'
import { Provider } from 'react-redux'
import { store } from './app/store.js'
import Protected from './features/auth/components/Protected.jsx'
import PageNotFound from './pages/404Page.jsx'
import OrderSuccessPage from './pages/OrderSuccessPage.jsx'
import UserOrderPage from './pages/UserOrderPage.jsx'
import UserProfilePage from './pages/UserProfilePage.jsx'
import Logout from './features/auth/components/Logout.jsx'
import ForgotPasswordPage from './pages/ForgotPassword.jsx'
import ProtectedAdmin from './features/auth/components/ProtectedAdmin.jsx'
import AdminHomePage from './pages/AdminHomePage.jsx'
import AdminProductDetailsPage from './pages/AdminProductDetailsPage.jsx'
import AdminProductFormPage from './pages/AdminProductFormPage.jsx'


let router = createBrowserRouter([
  {
    path:'/',
    element:<Protected> <App/></Protected>
  },
  {
    path:'/admin',
    element:<ProtectedAdmin><AdminHomePage/></ProtectedAdmin>
  },
  {path:'/login',
   element:<LoginPage/>
  },
  {path:'/signup',
   element:<SignupPage/>
  },
  {
    path:'/cart',
    element: <Protected><CartPage/></Protected>
  },
  {
    path:'/checkout',
    element: <Protected><CheckoutPage/></Protected>
  },
  {
    path:'/product-details/:id',
    element:<Protected><ProductDetailsPage/></Protected>
  },
  {
    path:'/admin/product-details/:id',
    element:<ProtectedAdmin><AdminProductDetailsPage/></ProtectedAdmin>
  },
  {
    path:'/admin/product-form',
    element:<ProtectedAdmin><AdminProductFormPage/></ProtectedAdmin>
  },
  {
    path:'/admin/product-form/edit/:id',
    element:<ProtectedAdmin><AdminProductFormPage/></ProtectedAdmin>
  },
  {
    path:'/order-success/:id',
    element:<OrderSuccessPage/>
  },
  {
    path:'/myorders',
    element:<Protected><UserOrderPage/></Protected>
  },
  {
    path:'/profile',
    element: <Protected><UserProfilePage/></Protected>
  },
  {
    path:'/logout',
    element: <Logout></Logout>
  },
  {
    path:'/forgot-password',
    element: <ForgotPasswordPage></ForgotPasswordPage>
  },
  {
    path:'/forgot-password',
    element: <ForgotPasswordPage></ForgotPasswordPage>
  },
  {
    path:'*',
    element:<PageNotFound/>
  },

])

ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}>
  <React.StrictMode>
   <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
  </Provider>
)
