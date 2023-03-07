import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { selectItems, fetchItems, addItemToCart } from '../store/slices/items';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Overlay, Popover } from 'react-bootstrap';

const LimitedItems = ({ maxItems }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  let userId = null;
  if (user) {
    userId = user.id;
  }

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const items = useSelector(selectItems);

  const limitedItems = items.slice(0, maxItems);

  const [confirmation, setConfirmation] = useState(false);
  const [target, setTarget] = useState(null);

  const handlePopover = (event) => {
    setTarget(event.target);
  };

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
    setTarget(event.target);
    setConfirmation(true);
    setTimeout(() => setConfirmation(false), 2000);
  };

  return (
    <>
      <h2 className='items-header'>Today's Items</h2>
      <div className='items'>
        {limitedItems.map((item) => {
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
                      >{`$${item.price.toFixed(2)}`}</li>
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
                      onMouseEnter={handlePopover}
                    >
                      Add to Cart
                    </Button>{' '}
                    <Overlay
                      show={confirmation}
                      target={target}
                      placement='top'
                    >
                      <Popover id='popover1'>Item added to cart!</Popover>
                    </Overlay>
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
  );
};

export default LimitedItems;
