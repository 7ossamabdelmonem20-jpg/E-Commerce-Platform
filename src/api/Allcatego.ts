export default async function AllCategories(){
    let res =await fetch("https://ecommerce.routemisr.com/api/v1/categories");
    let {data} =await res.json();
    // console.log(data);
    return data
}