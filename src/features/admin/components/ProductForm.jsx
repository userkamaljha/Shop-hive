import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useDispatch, useSelector } from 'react-redux'
import { clearSelectedProduct, createProductAsync, fetchProductByIdAsync, selectAllBrands, selectAllCategories, selectProductById, updateProductAsync } from '../../product/productSlice'
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Portal } from '@headlessui/react';
import {useNavigate} from "react-router-dom"
import Modal from '../../common/Modal';
import {useState} from 'react'



export default function ProductForm() {
  const { register, setValue, reset, handleSubmit, watch, formState: { errors } } = useForm()
  const brands = useSelector(selectAllBrands);
  const categories = useSelector(selectAllCategories)
  const dispatch = useDispatch()
  const params = useParams();
  const selectedProduct = useSelector(selectProductById)
  const [showModal ,setShowModal] = useState(null)
  const navigate = useNavigate()
  useEffect(() => {
    if (params.id) {
      dispatch(fetchProductByIdAsync(params.id))
    } else {
      dispatch(clearSelectedProduct())
    }
  }, [params.id], dispatch)

  useEffect(() => {
    if (selectedProduct && params.id) {
      selectedProduct.map(product => (
        setValue('title', product.title),
        setValue('description', product.description),
        setValue('price', product.price),
        setValue('discountPercentage', product.discountPercentage),
        setValue('stock', product.stock),
        setValue('thumbnail', product.thumbnail),
        setValue('brand', product.brand),
        setValue('category', product.category),
        setValue('image1', product.images[0]),
        setValue('image2', product.images[1]),
        setValue('image3', product.images[3])
      ))
    }
  }, [selectedProduct, params.id, setValue])

  const handleDelete = () => {
    if (selectedProduct) {
      const product = { ...selectedProduct[0] }
      product.deleted = true
      dispatch(updateProductAsync(product))
      navigate('/')
    }
  }

  {return selectedProduct && (
    <>
    <div className="bg-white my-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit((data) => {
        const product = { ...data }
        product.images = [product.image1, product.image2, product.image3, product.thumbnail]
        product.rating = 4
        delete product['image1']
        delete product['image2']
        delete product['image3']
        product.price = +product.price
        product.stock = +product.stock
        product.discountPercentage = +product.discountPercentage
        if (params.id) {
          product.id = params.id;
          product.rating = selectedProduct.rating || 4;
          dispatch(updateProductAsync(product))
        } else {
          dispatch(createProductAsync(product))
        }
        reset()
      })} noValidate>
        <div className="space-y-8  bg-gray-200 px-12 py-8">
          {/* heading */}
          <div className="border-b border-gray-900/10 pb-6">
            <h2 className="text-2xl  font-semibold leading-7 text-gray-900">Add Product Form</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you share.
            </p>
            
         {selectedProduct[0].deleted && <h1 className= 'text-red-500 mt-4'>This Product is Deleted!!</h1>}



          </div>

          {/* title */}
          <div className="sm:col-span-6 ">
            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
              Product name
            </label>
            <div className="my-2 ">
              <input
                type="text"
                {...register('title', { required: 'name is required' })}
                id="title"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* description */}
          <div className="col-span-full">
            <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
              Description
            </label>
            <div className="mt-2">
              <textarea
                id="description"
                {...register('description', { required: 'Product description is required' })}
                rows={3}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={''}
              />
            </div>
            <p className="text-sm leading-6 text-gray-600">Write a few sentences about your product description.</p>
          </div>

          {/* price */}
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-2">
              <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                Price
              </label>
              <div className="mt-2">
                <input
                  type="Number"
                  {...register('price', { required: 'Product price is required', min: 1, max: 100000 })}
                  id="price"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="discountPercentage" className="block text-sm font-medium leading-6 text-gray-900">
                Discount
              </label>
              <div className="mt-2">
                <input
                  type="Number"
                  placeholder='discount percentage'
                  {...register('discountPercentage', { required: 'Product discountPercentage is required', min: 0, max: 100 })}
                  id="discountPercentage"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
                Stock
              </label>
              <div className="mt-2">
                <input
                  type="Number"
                  {...register('stock', { required: 'Product stock is required', min: 0 })}
                  id="stock"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          {/* thumbnail */}
          <div className="sm:col-span-6 ">
            <label htmlFor="thumbnail" className="block text-sm font-medium leading-6 text-gray-900">
              Thumbnail
            </label>
            <div className="my-2 ">
              <input
                type="text"
                {...register('thumbnail', { required: 'Product Thumbnail URL is required' })}
                id="thumbnail"
                placeholder='URL Link'
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {/* image 1 */}
          <div className="sm:col-span-6 ">
            <label htmlFor="image1" className="block text-sm font-medium leading-6 text-gray-900">
              Product Image 1
            </label>
            <div className="my-2 ">
              <input
                type="text"
                {...register('image1', { required: 'image1 URL is required' })}
                id="image1"
                placeholder='URL Link'
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* image 2 */}
          <div className="sm:col-span-6 ">
            <label htmlFor="image2" className="block text-sm font-medium leading-6 text-gray-900">
              Product Image 2
            </label>
            <div className="my-2 ">
              <input
                type='url'
                {...register('image2', { required: 'image2 URL is required' })}
                id="image2"
                placeholder='URL Link'
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {/* image 3 */}
          <div className="sm:col-span-6 ">
            <label htmlFor="image3" className="block text-sm font-medium leading-6 text-gray-900">
              Product Image 3
            </label>
            <div className="my-2 ">
              <input
                type="text"
                {...register('image3', { required: 'image3 URL is required' })}
                id="image3"
                placeholder='URL Link'
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* brands */}
            <div className="sm:col-span-3">
              <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
                Choose Brands
              </label>
              <div className="mt-2">
                <select
                  id="brand"
                  {...register('brand', { required: 'Product brand is required' })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="">Choose brand</option>
                  {brands.map(brand => <option value={brand.value}>{brand.label}</option>)}
                </select>
              </div>
            </div>
            {/* cateogiers */}
            <div className="sm:col-span-3">
              <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                Choose Categoies
              </label>
              <div className="mt-2">
                <select
                  id="category"
                  {...register('category', { required: 'Product category is required' })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option className='' value="">Choose category</option>
                  {categories.map(category => <option value={category.value}>{category.label}</option>)}
                </select>
              </div>
            </div>
          </div>

    

          <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">Extra Options</legend>
              <div className="mt-6 space-y-6">
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="comments"
                      name="comments"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="comments" className="font-medium text-gray-900">
                      Comments
                    </label>
                    <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="candidates"
                      name="candidates"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="candidates" className="font-medium text-gray-900">
                      Candidates
                    </label>
                    <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="offers"
                      name="offers"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="offers" className="font-medium text-gray-900">
                      Offers
                    </label>
                    <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>

        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" onClick= {()=> navigate('/admin')} className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600">
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
          {selectedProduct && !selectedProduct[0].deleted && ( <button
            onClick={(e)=> {e.preventDefault(); setShowModal(true)}}
            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Delete   </button>)}
        </div>
      </form>
    </div>
    <Modal
          title='delete'
          message={`do you want to delete this Product ? ${selectedProduct[0].title}`}
          cancel='cancel'
          action='delete cart'
          openAction={handleDelete}
          cancelAction={()=> setShowModal(null)}
          showModal={showModal}></Modal>
    </>

  )}
}