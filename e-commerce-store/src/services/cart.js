import { data } from 'react-router-dom';
import { axiosInstance } from './axiosInstance';

export async function addToCart(userId, products) {
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
export async function getUserCart(userId) {
  try {
    const response = await axiosInstance.get(`/carts/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
export async function getAllCarts() {
    try {
        console.log(data);
        const response = await axiosInstance.get(`/carts`)
        return response.data;
        
    } catch (error) {
        throw error;
    }
    
}
