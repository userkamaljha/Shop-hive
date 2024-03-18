import React from 'react';
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { selectItems, updateItemAsync, deleteItemFromCardAsync } from '../cart/cartSlice'
import { discountPrice } from '../../app/constants';




export default function Cart() {
  const dispatch = useDispatch()
  const items = useSelector(selectItems)
  const [open, setOpen] = useState(true)
  const totalAmount = items.reduce((amount, item) => discountPrice(item) * item.quantity + amount, 0)
  const totalItems = items.reduce((total, item) => item.quantity + total, 0)
  const handleQuantity = (e, item) => {
    dispatch(updateItemAsync({ ...item, quantity: + e.target.value }))
  }

  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCardAsync(id))
  }

  return (
    <>
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
                        <p className="ml-4">$ {discountPrice(item)}</p>
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
          {items.length !== 0 && (<>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>$ {totalAmount}</p>
            </div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Total Items</p>
              <p>{totalItems} Items</p>
            </div>

            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
          </>)}
          {items.length !== 0 && (<div className="mt-6">
            <Link
              to="/checkout"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </Link>
          </div>)}
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or{' '}
              <Link to='/'>
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={() => setOpen(false)}
                >
                  {items.length !== 0 ? 'Continue Shopping' : 'Add Items to Bag'}
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </Link>

            </p>
          </div>
        </div>
      </div>

    </>
  )
}