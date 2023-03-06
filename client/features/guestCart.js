import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const GuestCart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const qtyOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // ensures orders are displayed
  useEffect(() => {
    // get cart items from local storage and set to cart state
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCart(cartItems);

    // calculate total
    const subTotal = cartItems.reduce((total, item) => {
      return total + item.item.price * item.qty;
    }, 0);
    setTotal(subTotal);
  }, []);

  const handleDelete = async (itemId) => {
    const updatedCart = cart.filter((item) => {
      console.log('****', item.item.id, itemId);
      return item.item.id !== itemId;
    });
    setCart(updatedCart);
    const subTotal = updatedCart.reduce((total, item) => {
      return total + item.item.price * item.qty;
    }, 0);

    setTotal(subTotal);

    // delete item in local storage
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const handleQuantityChange = async (itemId, quantity) => {
    const updatedCart = cart.map((item) => {
      if (item.itemId === itemId) {
        return { ...item, qty: quantity };
      }
      return item;
    });
    setCart(updatedCart);

    const subTotal = updatedCart.reduce((total, item) => {
      return total + item.item.price * item.qty;
    }, 0);

    setTotal(subTotal);

    // update cart items in local storage
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  return (
    <div className='content'>
      <div className='container'>
        <h2>Shopping Cart</h2>
        <h3 className='flex-end-column'>{`Total: $${total.toFixed(2)}`}</h3>
        <button onClick={() => navigate('/checkout', { state: { total } })}>
          Checkout
        </button>
      </div>
      <div>
        {cart.map((item) => {
          return (
            <div key={item.item.id} className='cart-items'>
              <img
                src={item.item.imageUrl}
                alt={item.item.name}
                height='150'
                width='175'
              />
              <div className='item-description'>
                <Link to={`/items/${item.itemId}`} className='link'>
                  <h4>Item: {item.item.name}</h4>
                </Link>
                <p>{item.item.stock > 0 ? 'In Stock' : 'Out of Stock'}</p>
                <select
                  style={{ marginBottom: '1rem' }}
                  value={item.qty}
                  onChange={(event) =>
                    handleQuantityChange(item.itemId, event.target.value)
                  }
                >
                  {qtyOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <button onClick={() => handleDelete(item.item.id)}>
                  Remove from Cart
                </button>
              </div>
              <div>{`$ ${(item.item.price * item.qty).toFixed(2)}`}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GuestCart;
