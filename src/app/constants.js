export const ITEMS_PER_PAGE = 10
export const discountPrice = (product)=>{
return Math.round(product[0].price-product[0].price *product[0].discountPercentage/100, 2)
}