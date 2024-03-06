export function fetchAllProducts() {
    return new Promise(async (resolve) =>{
      // todo: change it later
      const response = await fetch('http://localhost:3000/products?_sort=-price') 
      const data = await response.json()
      resolve({data})
    }
    );
  }
export function fetchProductsByFilters(filter) {
  // filter: {"category": "smartphone"}
  // todo : we will support multiple filter /sort
  let queryString = '';
  for(let key in filter){
    queryString += `${key}=${filter[key]}&`
  }
    return new Promise(async (resolve) =>{
      // todo: change it later
      const response = await fetch('http://localhost:3000/products/?'+ queryString) 
      const data = await response.json()
      resolve({data})
    }
    );
  }
export function fetchProductsBySort(sort) {
  // sort: {"sort": "high to low"}
  // todo : we will support multiple filter /sort
  let queryString = '';
  for(let key in sort){
    queryString += `${key}=${sort[key]}&`
  }
    return new Promise(async (resolve) =>{
      // todo: change it later
      const response = await fetch('http://localhost:3000/products/?'+ queryString) 
      const data = await response.json()
      resolve({data})
    }
    );
  }