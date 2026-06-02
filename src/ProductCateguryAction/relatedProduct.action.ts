"use server"

export default async function getRelatedProduct(catId:string){
    let res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${catId}`)
    let paylod = await res.json()
    return paylod;
}