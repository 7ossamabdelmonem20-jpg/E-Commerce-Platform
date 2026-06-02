export default async function getProductById(id: string) {
  let res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${id}`
  );

  return res.json();
}