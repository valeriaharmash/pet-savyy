import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { selectItems, fetchItems } from '../store/slices/items';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';

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
                      <li style={{ fontWeight: 'bold' }}>{`$${(item.price).toFixed(2)}`}</li>
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
  );
};

export default LimitedItems;
