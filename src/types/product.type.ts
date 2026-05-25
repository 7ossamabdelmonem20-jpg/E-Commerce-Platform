type Subcategory = {
  _id: string;
  name: string;
  slug: string;
  category: string;
};

type Category = {
  _id: string;
  name: string;
  slug: string;
  image: string;
};

type Brand = {
  _id: string;
  name: string;
  slug: string;
  image: string;
};

export type ProductType = {
  sold: number;
  images: string[];
  subcategory: Subcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
};
