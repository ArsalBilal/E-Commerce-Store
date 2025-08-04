import { axiosInstance } from './axiosInstance';
import { Product, ProductsResponse } from '../types';

export async function fetchProducts(): Promise<Product[]> {
  const res = await axiosInstance.get<ProductsResponse>("products");
  return res.data.products;
}

export async function fetchProductById(id: number): Promise<Product> {
  const res = await axiosInstance.get<Product>(`products/${id}`);
  return res.data;
}

export async function fetchCategories(): Promise<string[]> {
  const res = await axiosInstance.get<string[]>("products/category-list");
  return res.data;
}

export async function fetchProductByCategory(category: string): Promise<Product[]> {
  try {
    const res = await axiosInstance.get<ProductsResponse>(`products/category/${category}`);
    return res.data.products || [];
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
}

export async function searchProduct(product: string): Promise<Product[]> {
  try {
    const res = await axiosInstance.get<ProductsResponse>(`/products/search?q=${product}`);
    return res.data.products;
  } catch (error) {
    console.error("Error searching product:", error);
    return [];
  }
}
