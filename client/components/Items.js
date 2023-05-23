import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchItems } from '../store/slices/items';
import { useDispatch, useSelector } from 'react-redux';

const Items = () => {

  const user = useSelector((state) => state.auth.user);
  const items = useSelector((state) => state.items.allItems);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  return (
    <>
      {items !== [] ? (
        <>
          <h2 className="itemsHeader">Number of Items {`(${items.length})`}</h2>
          <div className="items">
            {items.map((item) => {
              return (
                <div key={item.id}>
                  <div className="itemContainer">
                    <Link to={`/items/${item.id}`}>
                      <div className="itemImage">
                        <img
                          src="https://heydjangles.com/wp-content/uploads/2020/08/halloween-costumes-for-chihuahuas-21-768x702.png"/>
                      </div>
                      <div className="itemDetails">
                        <ul>
                          <li>{item.name}</li>
                          <li
                            style={{ fontWeight: 'bold' }}
                          >{`$${(item.price).toFixed(2)}`}</li>
                        </ul>
                      </div>
                    </Link>

                    {user && user.role === 'admin' && (
                      <div className="itemFooter">
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
