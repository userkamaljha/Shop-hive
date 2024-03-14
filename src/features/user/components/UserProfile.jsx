import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectLoggedInUser } from '../../auth/authSlice';


export default function UserProfile() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser)
  return (
      <div>
      <div className="bg-gray-100 my-8 rounded-sm mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <h1 className="text-4xl py-8 font-bold tracking-tight text-gray-900"> Name : {user.name ? user.name : 'Guest'}</h1>
                    <h3 className="text-lg text-red-700 py-8 font-semibold   "> email address : {user.email}</h3>

                    <div className='py-5'>
                    <h3>User addresses: </h3>
                    {user.addresses.length !== 0 ? (user.addresses.map(address=>(

                    <div
                        className="flex my-4 justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200"
                    >
                            <div className="flex gap-x-4">
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
                           <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button type="button" onClick={(e)=> handleRemove(e, index)} className="text-sm text-indigo-600 hover:text-indigo-400 font-semibold leading-6 text-gray-900">
                                Edit
                            </button>
                            <button
                                type="button"
                                onClick={(e)=> handleRemove()}
                                className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Remove Address
                            </button>
                        </div>
                        
 
                        
                       
                    </div>
                        ))) : <h1 className='my-4 text-semibold'>No Address Found!</h1>}

                    </div>
                    
                </div>
      
    </div>
  );
}