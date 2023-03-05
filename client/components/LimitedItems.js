import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { selectItems, fetchItems } from '../store/slices/items';
import { useSelector, useDispatch } from 'react-redux';

const LimitedItems = ({ maxItems }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const items = useSelector(selectItems);

  const limitedItems = items.slice(0, maxItems);

  return (
    <>
      <h2>Featured Items</h2>
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
                      <li style={{ fontWeight: 'bold' }}>{`$${item.price}`}</li>
                    </ul>
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default LimitedItems;
