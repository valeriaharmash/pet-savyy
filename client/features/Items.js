import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addItemToCart, fetchItems, selectItems } from '../store/slices/items';
import { useDispatch, useSelector } from 'react-redux';

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
    await dispatch(addItemToCart({userId, itemId}));
  };

  return (
    <>
      {items !== [] ? (
        <>
          <h1 className="itemsHeader">Number of Items {`(${items.length})`}</h1>
          <div className="center">
            {user && user.role === 'admin' && (
              <button className="center" onClick={() => navigate('/items/add')}>
                Add Item
              </button>
            )}
          </div>
          <div className="items">
            {items.map((item) => {
              return (
                <div key={item.id}>
                  <div className="itemContainer">
                    <Link to={`/items/${item.id}`}>
                      <div id="itemImage">
                        <img
                          src="https://heydjangles.com/wp-content/uploads/2020/08/halloween-costumes-for-chihuahuas-21-768x702.png"/>
                      </div>
                      <div id="itemDetails">
                        <ul>
                          <li>{item.name}</li>
                          <li
                            style={{fontWeight: 'bold'}}
                          >{`$${item.price}`}</li>
                          {(!user || user.role !== 'admin') && (
                            <li>Number in cart: {`0`}</li>
                          )}
                        </ul>
                      </div>
                    </Link>

                    {(!user || user.role !== 'admin') && (
                      <div
                        id="itemFooter"
                        onClick={() => handleAddToCart(item.id)}
                      >
                        <Link to={`/user/${userId}/cart`}>Add to Cart</Link>
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
