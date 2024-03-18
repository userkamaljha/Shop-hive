import { useDispatch, useSelector } from "react-redux"
import { ITEMS_PER_PAGE } from "../../../app/constants"
import { fetchAllOrdersAsync, selectAllOrder, selectTotalOrders, updateOrderAsync } from "../../order/orderSlice"
import { EyeIcon } from "@heroicons/react/24/outline"
import { PencilIcon } from "@heroicons/react/24/outline"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"



function AdminOrder() {
  const [page, setPage] = useState(1)
  const dispatch = useDispatch()
  const totalOrders = useSelector(selectTotalOrders)
  const orders = useSelector(selectAllOrder)
  console.log(orders);
  const [editableOrderId , setEditableOrderId] = useState(-1)

  

 
  const handleEdit = (e, order)=>{
    setEditableOrderId(order.id)
  }
  const handleStatus = (e, order)=>{
    const updatedOrder = {...order, status: e.target.value};
    dispatch(updateOrderAsync(updatedOrder))
    setEditableOrderId(-1)
  }

  const chooseColor = (status)=>{
    switch  (status){
      case "pending" : 
      return 'bg-purple-200 text-purple-900'
      case "dispatched" : 
      return 'bg-yellow-200 text-yellow-900'
      case "delivered" : 
      return 'bg-green-200 text-green-900'
      case "cancelled" : 
      return 'bg-red-200 text-red-900'
      default : return 'bg-purple-200 text-purple-900'
    }
  }
  useEffect(() => {
    const pagination = {
      _page: page,
      _per_page: ITEMS_PER_PAGE
    }
    dispatch(fetchAllOrdersAsync(pagination))
  }, [dispatch, page, editableOrderId])
 return  (
    <>
     <div className="bg-white  mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
     <div className="bg-white p-8 rounded-md w-full">
  <div>
    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
      <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
         <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                User Email Address
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Shipping Address
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Qty
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Total Amount
              </th>
              
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody >
           {orders && orders.map(order => <tr>
           
              <td className="px-5 py-5 border-b  border-gray-200 bg-white text-sm">
                {order.items.map(item => (<div className="flex items-center">
                  <div className="flex-shrink-0 w-10 h-10">
                    <img
                      className="w-full h-full rounded-md"
                      src={item[0].thumbnail}
                      alt="product thumbnail"
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-900 whitespace-no-wrap">
                      {item[0].title}
                    </p>
                  </div>
                </div>) )}
                
              </td>
              <td className="px-5 py-5   border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{order.user.email}</p>
              </td>
              <td className="text-center py-5  border-b border-gray-200 truncate bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap  ">
                 {order.selectedAddress.name}, 
                    {order.selectedAddress.street} ,
                    {order.selectedAddress.city} ,
                   ...
                  </p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{order.items[0].quantity}</p>
              </td>
              <td className="px-14  py-5 border-b border-gray-200  bg-white text-sm">
                <p className="text-gray-900  whitespace-no-wrap">$ {order.totalAmount}</p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {order.id !== editableOrderId ? (
                  <span className={`${chooseColor(order.status)} relative inline-block px-3 py-1 rounded-full  font-semibold  leading-tight`}>
                   {order.status}
                </span>
                ) : ( <select onChange={(e) => handleStatus(e, order)}>
                <option value="">Choose status</option>
                <option value="pending">Pending</option>
                <option value="dispatched">Dispatched</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>)}
               
              </td>
              <td className="px-14  py-5 border-b border-gray-200 bg-white text-sm">
                
                {/* <span  className=""><Link to = '/admin/myorders'><EyeIcon className="w-5 inline cursor-pointer"/></Link></span> */}
                <span onClick={(e) => handleEdit(e, order)} className=""><PencilIcon className="w-5 mx-2 cursor-pointer inline hover:text-green-500"/></span>

                  
              </td>
            </tr>) }
          </tbody>
        </table>
        <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
          <span className="text-xs xs:text-sm text-gray-900">
            Showing 1 to 4 of 50 Entries
          </span>
          <div className="inline-flex mt-2 xs:mt-0">
            <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
              Prev
            </button>
            &nbsp; &nbsp;
            <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
     </div>


    </>
  )
}

export default AdminOrder
