import { Link, Navigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { updateItemAsync, deleteItemFromCardAsync, selectItems } from "../features/cart/cartSlice"
import { useForm } from "react-hook-form"
import { createUserAsync, selectLoggedInUser } from "../features/auth/authSlice"
import { selectUserInfo, updateUserAsync } from "../features/user/userSlice"
import {createOrderAsync, selectCurrentOrder} from "../features/order/orderSlice"
import { useState } from "react"
import { discountPrice } from "../app/constants"

function CheckoutPage() {
    const dispatch = useDispatch()
    const items = useSelector(selectItems)
    const { register, reset, handleSubmit, watch, formState: { errors } } = useForm()
    const totalAmount = items.reduce((amount, item) =>discountPrice(items[0]) * item.quantity + amount, 0)
    const totalItems = items.reduce((total, item) => item.quantity + total, 0)
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [paymentMethod, setPaymentMethod] = useState('cash')
    const orderPlaced = useSelector(selectCurrentOrder)

    const handleQuantity = (e, item) => {
        dispatch(updateItemAsync({ ...item, quantity: + e.target.value }))
    }
    const handleRemove = (e, id) => {
        dispatch(deleteItemFromCardAsync(id))
    }
    const user = useSelector(selectUserInfo)
    const handleAddress = (e) => {
        setSelectedAddress(user.addresses[e.target.value])
    }
    const handlePayment = (e) => {
        setPaymentMethod(e.target.value)
    }
    const handleOrder = (e)=>{
        const order = {
            items: items,
            totalAmount:totalAmount,
            totalItems:totalItems,
            user:user,
            paymentMethod:paymentMethod,
            selectedAddress:selectedAddress,
            status: 'pending' //admin can change this status
        }
     dispatch(createOrderAsync(order))
     dispatch(deleteItemFromCardAsync(order.items[0].id))
    //  todo: redirect to order success page
    //  todo: clear cart after order 
    //  todo: change stock in backend 
    }


    return (
        <>
        {!items.length && <Navigate to ="/" replaced = {true}></Navigate>}
        {orderPlaced &&  <Navigate to ={`/order-success/${orderPlaced.id}`} replaced = {true}></Navigate>}
            <div className="bg-gray-100 rounded-lg md:flex gap-2 my-8 sm:mx-auto mx-8 py-8 mx-auto max-w-7xl px-6 sm:px-6 lg:px-8">
                <form onSubmit={handleSubmit((data) => {
                    dispatch(updateUserAsync({ ...user, addresses: [...user.addresses, data] }))
                    reset()
                })} noValidate>
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-lg font-bold leading-6 text-gray-900">Personal Information</h2>
                        <p className="text-gray-500 mt-2">Use a permanent address where you can receive mail.</p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Full Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        {...register('name', { required: 'name is required' })}
                                        id="name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        {...register('email', { required: 'email is required' })}
                                        type="email"
                                        autoComplete="email"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="contactNo" className="block text-sm font-medium leading-6 text-gray-900">
                                    Contact Number
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="contactNo"
                                        {...register('contactNo', { required: 'Contact number is required' })}
                                        type="tel"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                    Street address
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        {...register('street', { required: 'street  is required' })}
                                        id="street"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2 sm:col-start-1">
                                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                    City
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        {...register('city', { required: 'city is required' })}
                                        id="city"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                                    State / Province
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        {...register('state', { required: 'state is required' })}
                                        id="state"
                                        autoComplete="address-level1"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="pincode" className="block text-sm font-medium leading-6 text-gray-900">
                                    ZIP / Pin Code
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        {...register('pincode', { required: 'pincode  is required' })}
                                        id="pincode"
                                        autoComplete="pincode"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button type="button" onClick={()=> reset()} className="text-sm font-semibold leading-6 text-gray-900">
                                Reset
                            </button>
                            <button
                                type="submit"
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Save Address
                            </button>
                        </div>
                    </div>

                    <div className="pb-12">

                        <div className="mt-10 space-y-10">
                            <fieldset>
                                <legend className="text-lg font-bold leading-6 text-gray-900">Delivery Address</legend>
                                <p className="text-gray-500 mt-2">Choose from Existing address</p>
                                <div className="mt-6  space-y-4">
                                    <ul>
                                        {user.addresses.map((address, index) => (
                                            <li
                                                key={index}
                                                className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200"
                                            >
                                                <div className="flex gap-x-4">
                                                    <input
                                                        onChange={(e) => handleAddress(e)}
                                                        value={index}
                                                        name="address"
                                                        type="radio"
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <div className="min-w-0 flex-auto">
                                                        <p className="text-sm font-semibold leading-6 text-gray-900">
                                                            {address.name}
                                                        </p>
                                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                                            {address.street}
                                                        </p>
                                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                                            {address.pincode}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="hidden sm:flex sm:flex-col sm:items-end">
                                                    <p className="text-sm leading-6 text-gray-900">
                                                        Phone: {address.contactNo}
                                                    </p>
                                                    <p className="text-sm leading-6 text-gray-500">
                                                        {address.state}
                                                    </p>
                                                </div>
                                            </li>))}
                                    </ul>
                                </div>
                            </fieldset>
                            <fieldset>
                                <legend className="text-lg font-bold leading-6 text-gray-900">Payment Methods</legend>
                                <p className="text-gray-500 mt-2">Choose any one Method</p>

                                <div className="mt-6 space-y-6">
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="cash-payment"
                                            name="payment"
                                            value='cash'
                                            onChange={handlePayment}
                                            type="radio"
                                            checked={paymentMethod === 'cash'}
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                        <label htmlFor="cash-payment" className="block text-sm font-medium leading-6 text-gray-900">
                                            Cash
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="card-payment"
                                            name="payment"
                                            onChange={handlePayment}
                                            value='card'
                                            type="radio"
                                            checked={paymentMethod === 'card'}
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                        <label htmlFor="card-payment" className="block text-sm font-medium leading-6 text-gray-900">
                                            Card Payment
                                        </label>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>

                </form>

                {/* cart portion */}
                <div className="bg-gray-100 my-8 rounded-sm mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <h1 className="text-4xl py-8 font-bold tracking-tight text-gray-900">Your Cart Products</h1>
                    <div className="mt-8  py-4   ">
                        {items.length > 0 ? <div className="flow-root">
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                {items.map((item) => (
                                    <li key={item.id} className="flex py-6">
                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                            <Link to={`/product-details/${item[0].id}`}>
                                                <img
                                                    src={item[0].thumbnail}
                                                    alt={item[0].title}
                                                    className="h-full w-full object-cover object-center"
                                                />
                                            </Link>
                                        </div>

                                        <div className="ml-4 flex flex-1 flex-col">
                                            <div>
                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                    <h3>
                                                        <a href={item.href}>{item[0].title}</a>
                                                    </h3>
                                                    <p className="ml-4">$ {discountPrice(item) }</p>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-500">{item[0].brand}</p>
                                            </div>
                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                <div className="text-gray-500">
                                                    <label htmlFor="Quantity" className="inline mr-4 text-sm font-medium leading-6 text-gray-900">
                                                        Qty
                                                    </label>
                                                    <select onChange={(e) => handleQuantity(e, item)} value={item.quantity}>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                    </select>
                                                </div>

                                                <div className="flex">
                                                    <button
                                                        onClick={(e) => handleRemove(e, item.id)}
                                                        type="button"
                                                        title='Remove Item'
                                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div> : (<div className='text-center'>
                            <h1 className='text-xl font-semibold'>Hey, it feels so light!!</h1>
                            <p className='text-md text-gray-500'>There is nothing in your bag. Let's add some items.</p>
                        </div>)}
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Subtotal</p>
                            <p>$ {totalAmount}</p>
                        </div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Total Items</p>
                            <p>{totalItems} Items</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                        <div className="mt-6">
                            <div
                                onClick={handleOrder}
                                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 cursor-pointer"
                            >
                                Place Order
                            </div>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                            <p>
                                or{' '}
                                <Link to='/'>
                                    <button
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                        onClick={() => setOpen(false)}
                                    >
                                        Continue Shopping
                                        <span aria-hidden="true"> &rarr;</span>
                                    </button>
                                </Link>

                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CheckoutPage
