export function fetchAllProducts() {
    return new Promise(async (resolve) =>{
      // todo: change it later
      const response = await fetch('http://localhost:3000/products') 
      const data = await response.json()
      resolve({data})
    }
    );
  }
export function fetchProductsByFilters(filter, pagination) {
  // filter: {"category": "smartphone"}
  // pagination :{_page:1, _limit= 10"}
  // todo : we will support multiple filter /sort
  let queryString = '';
  for(let key in filter){
    const categoryValues = filter[key];
    if(categoryValues.length > 0){
      const lastCategoryValue = categoryValues[categoryValues.length -1]
      queryString += `${key}=${lastCategoryValue}&`
    }
  }
console.log(pagination);
  for(let key in pagination){
    queryString += `${key}=${pagination[key]}&`
    console.log(pagination[key]);
  }
  
    return new Promise(async (resolve) =>{
      // todo: change it later
      const response = await fetch('http://localhost:3000/products/?'+ queryString) 
      const data = await response.json()
      const totalItems = await response.headers.get('X-Total-Count')
      resolve({data: {products:data, totalItems: totalItems}})
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