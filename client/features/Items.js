import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addItemToCart, fetchItems, selectItems } from '../store/slices/items';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

const Items = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  let userId = null;
  if (user) {
    userId = user.id;
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  let items = useSelector(selectItems);

  const handleAddToCart = async (itemId) => {
    if (user) {
      dispatch(addItemToCart({ userId, itemId }));
    } else {
      let item = items.filter((item) => item.id === itemId);
      item = item[0];

      // grab the local cart items
      let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

      // check if item is already in the cart
      const itemIndex = cartItems.findIndex((item) => item.item.id === itemId);
      if (itemIndex !== -1) {
        cartItems[itemIndex].qty += 1;
      } else {
        cartItems.push({ item, qty: 1 });
      }
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  };

  return (
    <>
      {items !== [] ? (
        <>
          <h1 className='itemsHeader'>Number of Items {`(${items.length})`}</h1>
          <div className='items'>
            {items.map((item) => {
              return (
                <div key={item.id}>
                  <div className='itemContainer'>
                    <Link to={`/items/${item.id}`}>
                      <div id='itemImage'>
                        <img src='https://heydjangles.com/wp-content/uploads/2020/08/halloween-costumes-for-chihuahuas-21-768x702.png' />
                      </div>
                      <div id='itemDetails'>
                        <ul>
                          <li>{item.name}</li>
                          <li
                            style={{ fontWeight: 'bold' }}
                          >{`$${item.price}`}</li>
                          {(!user || user.role !== 'admin') && (
                            <li>Number in cart: {`0`}</li>
                          )}
                        </ul>
                      </div>
                    </Link>

                    {(!user || user.role !== 'admin') && (
                      <div
                        id='itemFooter'
                        onClick={() => handleAddToCart(item.id)}
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100%',
                        }}
                      >
                        <Button
                          className='button'
                          variant='secondary'
                          style={{ alignSelf: 'center' }}
                        >
                          Add to Cart
                        </Button>{' '}
                      </div>
                    )}

                    {user && user.role === 'admin' && (
                      <div id='itemFooter'>
                        <Link to={`/items/${item.id}/update`}>Update</Link>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};

export default Items;
