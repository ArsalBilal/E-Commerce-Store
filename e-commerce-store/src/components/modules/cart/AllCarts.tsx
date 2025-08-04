import React, { useEffect, useState } from 'react';
import { useCart } from '../../../services/cartContext';

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  thumbnail: string;
}

const AllCarts: React.FC = () => {
  const { cartItems } = useCart();
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const newTotal = cartItems.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0);
    setTotal(newTotal);
  }, [cartItems]);

  return (
    <div>
      <h2>All Carts</h2>
      {cartItems.map((item: CartItem) => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p>Price: ${item.price}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Total: ${item.price * item.quantity}</p>
        </div>
      ))}
      <h3>Total: ${total}</h3>
    </div>
  );
};

export default AllCarts;
