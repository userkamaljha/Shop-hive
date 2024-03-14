import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectLoggedInUser } from '../../auth/authSlice';
import { fetchLoggedInUserOrdersAsync, selectUserOrders } from '../userSlice';
import { Link } from 'react-router-dom';

export default function UserOrders() {
    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser)
    const orders = useSelector(selectUserOrders)
    useEffect(() => {
        dispatch(fetchLoggedInUserOrdersAsync(user.id))
    }, [user.id, dispatch])

    {return orders.length !== 0 ?(
        <>
            {orders.map((order) => (
               <div className="bg-gray-100 my-8 rounded-sm mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <h1 className="text-4xl py-8 font-bold tracking-tight text-gray-900"> Order id :  #{order.id}</h1>
                    <h3 className="text-lg text-red-700 py-8 font-semibold   ">Order Status : {order.status}</h3>
                    <div className="mt-8  py-4   ">
                        {order.items.length > 0 ? <div className="flow-root">
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                {order.items.map((item) => (
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
                                                    <p className="ml-4">$ {item[0].price}</p>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-500">{item[0].brand}</p>
                                            </div>
                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                <div className="text-gray-500">
                                                    <label htmlFor="Quantity" className="inline mr-4 text-sm font-medium leading-6 text-gray-900">
                                                        Qty : {item.quantity}
                                                    </label>
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
                        {order.items.length !== 0 && (<>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                                <p>Subtotal</p>
                                <p>$ {order.totalAmount}</p>
                            </div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                                <p>Total Items</p>
                                <p>{order.totalItems} Items</p>
                            </div>

                        </>)}


                    </div>
                    <div className='py-5'>
                    <h3>shipping address: </h3>
                    <div
                        className="flex my-4 justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200"
                    >
                        <div className="flex gap-x-4">
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-900">
                                    {order.selectedAddress.name}
                                </p>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                    {order.selectedAddress.street}
                                </p>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                    {order.selectedAddress.pincode}
                                </p>
                            </div>
                        </div>
                        <div className="hidden sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm leading-6 text-gray-900">
                                Phone: {order.selectedAddress.contactNo}
                            </p>
                            <p className="text-sm leading-6 text-gray-500">
                                {order.selectedAddress.state}
                            </p>
                        </div>
                    </div>
                    </div>
                    
                </div>
            ))}
        </>
    )  :  <div className=" text-center my-8 rounded-sm mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <h1 className='font-semibold text-2xl '>No Orders Found!</h1>
    </div>}
}