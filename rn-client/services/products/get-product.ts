export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
};

export async function getProduct(productId: string) {
  const res = await fetch(`https://dummyjson.com/products/${productId}`);
  const data: Product = await res.json();
  return data;
}

export async function getProducts() {
  const res = await fetch(`https://dummyjson.com/products`);
  const data: {
    products: Product[];
  } = await res.json();
  return data.products;
}
