import { axiosInstance } from "./axiosInstance";
// import axios from "axios";


export async function fetchProducts() {
  const res = await axiosInstance.get("products");
  return res.data.products;
}


export async function fetchProductById(id) {
  const res = await axiosInstance.get(`products/${id}`);
  return res.data;
}


export async function fetchCategories() {
  const res = await axiosInstance.get("products/category-list");
  return res.data;
}


export async function fetchProductByCategory(category) {
  try {
    const res = await axiosInstance.get(`products/category/${category}`);
    return res.data.products || [];
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
}


export async function searchProduct(product) {
  try {
    const res = await axiosInstance.get(`/products/search?q=${product}`);
    return res.data.products;
  } catch (error) {
    console.error("Error searching product:", error);
    return [];
  }
}



