import { axiosInstance } from './axiosInstance';
import { Cart, CartProduct } from '../types';

export async function addToCart(userId: number, products: CartProduct[]): Promise<string> {
  try {
    console.log(products);
    const response = await axiosInstance.post('/carts/add', {
      userId,
      products,
    });

    return response.data.toString();
  } catch (error) {
    throw error;
  }
}

export async function getUserCart(userId: number): Promise<Cart> {
  try {
    const response = await axiosInstance.get<Cart>(`/carts/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getAllCarts(): Promise<Cart[]> {
  try {
    const response = await axiosInstance.get<Cart[]>(`/carts`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
