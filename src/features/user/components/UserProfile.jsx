import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectLoggedInUser } from '../../auth/authSlice';
import { selectUserInfo, updateUserAsync } from "../../user/userSlice"
import { useForm } from 'react-hook-form';


export default function UserProfile() {
    const dispatch = useDispatch();
    const user = useSelector(selectUserInfo)
    const { register, reset, setValue, handleSubmit, watch, formState: { errors } } = useForm()
    const [selectedEditIndex, setSelectedEditIndex] = useState(-1)
    const [showAddAddressForm, setShowAddAddressForm] = useState(false)

    const handleAdd = (address)=>{
        const newUser = { ...user, addresses: [...user.addresses, address] }
        dispatch(updateUserAsync(newUser))
        setShowAddAddressForm(false)
    }

    const handleEditForm = (index) => {
        setSelectedEditIndex(index)
        const address = user.addresses[index]
        setValue('name', address.name)
        setValue('email', address.email)
        setValue('contactNo', address.contactNo)
        setValue('street', address.street)
        setValue('city', address.city)
        setValue('state', address.state)
        setValue('pincode', address.pincode)
    }

    const handleEdit = (updateAddress, index) => {
        const newUser = { ...user, addresses: [...user.addresses] }
        newUser.addresses.splice(index, 1, updateAddress)
        dispatch(updateUserAsync(newUser))
        setSelectedEditIndex(-1)
        setValue('name')
    }
    const handleRemove = (e, index) => {
        const newUser = { ...user, addresses: [...user.addresses] }
        newUser.addresses.splice(index, 1)
        dispatch(updateUserAsync(newUser))
    }
    return (
        <div>
            <div className="bg-gray-100 my-8 rounded-sm mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <h1 className="text-4xl py-8 font-bold tracking-tight text-gray-900"> Name : {user.name ? user.name : 'Guest'} </h1>
                <h3 className="text-lg text-red-700 py-8 font-semibold   "> email address : {user.email}</h3>
                {user.role === 'admin' && (<h3 className="text-lg text-red-700  font-semibold   "> role : {user.role}</h3>)}
                      {/* add address */}
                     <button
                            type="button"
                            onClick = {(e)=> {setShowAddAddressForm(true); setSelectedEditIndex(-1)}}
                            className="rounded-md my-3 bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Add New Address
                        </button>

                        {showAddAddressForm ? (<form onSubmit={handleSubmit((data) => {
                            handleAdd(data)
                            reset()
                        })} noValidate>
                            <div className="border-b border-gray-900/10 pb-12">
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
                                    <button
                                        type="button"
                                        onClick = {(e)=> setShowAddAddressForm(false)}
                                        className="rounded-md text-indigo-600 px-3 py-2 text-sm font-semibold  hover:text-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Add Address
                                    </button>
                                </div>
                            </div>

                        </form>) : null}

                <div className='py-5'>
                    <h3>User addresses: </h3>

                    {user.addresses.length !== 0 ? (user.addresses.map((address, index) => (<>
                        {selectedEditIndex === index ? (<form onSubmit={handleSubmit((data) => {
                            handleEdit(data, index)
                            reset()
                        })} noValidate>
                            <div className="border-b border-gray-900/10 pb-12">
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
                                    <button
                                        type="submit"
                                        onClick={() => setSelectedEditIndex(-1)}
                                        className="rounded-md text-indigo-600 px-3 py-2 text-sm font-semibold hover:text-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Edit Address
                                    </button>
                                </div>
                            </div>

                        </form>) : null}
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
                                {selectedEditIndex == -1 && <button
                                    type="button"
                                    className="text-sm text-indigo-600 hover:text-indigo-400 font-semibold leading-6 text-gray-900"
                                    onClick={() => handleEditForm(index)}>
                                    Edit
                                </button>}
                                <button
                                    type="button"
                                    onClick={(e) => handleRemove(e, index)}
                                    className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Remove Address
                                </button>
                            </div>




                        </div>
                       
                    </>
                    ))) : <h1 className='my-4 text-semibold'>No Address Found!</h1>
                    }

                </div>

            </div>

        </div>
    );
}