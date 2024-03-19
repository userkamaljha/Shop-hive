import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"
import { ITEMS_PER_PAGE } from "../../app/constants"

function Pagination({ page, handlePage, products, totalItems }) {  
    return (<>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
  
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{(page - 1) * ITEMS_PER_PAGE + 1}</span> to <span className="font-medium">{page * ITEMS_PER_PAGE > products.items ? products.items : page * ITEMS_PER_PAGE}</span> of{' '}
            <span className="font-medium">{products.items}</span> results
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <div
              onClick={(e) => handlePage(page > 1 ? page - 1 : page)}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </div>
  
  
  
            {Array.from({ length: Math.ceil(products.items / ITEMS_PER_PAGE) }).map((el, index) => (
              <div onClick={(e) => handlePage(index + 1)} className={`cursor-pointer border relative z-10 inline-flex items-center ${index + 1 == page ? 'bg-indigo-600 text-white' : 'bg-white text-gray-500'} px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:ouline-indigo-600`}>
                {index + 1}
              </div>
            )
  
            )}
  
  
  
            <div
              onClick={(e) => handlePage(page < products.items ? page + 1 : page)}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 cursor-pointer ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </nav>
        </div>
      </div>
    </>)
  }

  export default Pagination