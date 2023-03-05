import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { addItemToCart, fetchSingleItem } from '../store/slices/items';

const SingleItem = () => {
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const item = useSelector((state) => state.items.selectedItem);
  const user = useSelector((state) => state.auth.user);
  const [itemQty, setItemQty] = useState(0);

  let userId = null;
  if (user) {
    userId = user.id;
  }

  useEffect(() => {
    if (itemId) {
      dispatch(fetchSingleItem(itemId));
    }
  }, [itemId]);

  const handleAddToCart = async (itemId, quantity) => {
    if (user) {
      dispatch(
        addItemToCart({ userId, itemId, quantity: parseInt(quantity, 10) })
      );
    } else {
      // grab the local cart items
      let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

      // check if item is already in the cart
      const itemIndex = cartItems.findIndex((item) => item.item.id === itemId);
      if (itemIndex !== -1) {
        cartItems[itemIndex].qty += parseInt(quantity);
      } else {
        cartItems.push({ item, qty: quantity });
      }
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  };

  if (!item.id) return null;

  return (
    <div className='row apart'>
      <img className='item-img' src={item.imageUrl} />
      <div style={{ flex: 2, padding: '2rem' }}>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <div>
          {item.stock ? (
            <div>
              <p>In Stock</p>
              {(!user || user.role !== 'admin') && (
                <div>
                  <label htmlFor='qty'>Qty</label>
                  <select onChange={(e) => setItemQty(e.target.value)}>
                    {new Array(item.stock >= 5 ? 6 : item.stock + 1)
                      .fill(0)
                      .map((val, idx) => (
                        <option key={idx} value={idx}>
                          {idx}
                        </option>
                      ))}
                  </select>
                </div>
              )}
            </div>
          ) : (
            'Out of Stock'
          )}
        </div>
        <p>Price: {`$ ${item.price}`}</p>
        {(!user || user.role !== 'admin') && (
          <button
            disabled={!itemQty}
            onClick={() => handleAddToCart(item.id, itemQty)}
          >
            Add to cart
          </button>
        )}
        {user && user.role === 'admin' && (
          <Link to={`/items/${item.id}/update`}>
            <button type='button'>Update</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default SingleItem;
