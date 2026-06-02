export default async function getProductById(id: string) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${id}`
  );

  const result = await res.json();

  console.log("API RESULT:", result);

  if (!result?.data) return null;

  return result.data;
}