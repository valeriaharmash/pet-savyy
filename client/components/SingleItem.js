import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleItem } from '../store/slices/items';
import { Link } from 'react-router-dom';

const SingleItem = () => {
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const item = useSelector((state) => state.items.selectedItem);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (itemId) {
      dispatch(fetchSingleItem(itemId));
    }
  }, [itemId]);

  if (!item.id) return null;

  return (
    <div className="row apart">
      <img className="item-img" src={item.imageUrl} />
      <div style={{ flex: 2, padding: '2rem' }}>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <div>
          {item.stock
            ? 'In Stock' && (
                <div>
                  <label htmlFor="qty">Qty</label>
                  <select>
                    {new Array(item.stock >= 5 ? 5 : item.stock)
                      .fill(0)
                      .map((val, idx) => (
                        <option key={idx} value={idx + 1}>
                          {idx + 1}
                        </option>
                      ))}
                  </select>
                </div>
              )
            : 'Out of Stock'}
        </div>
        <p>Price: {`${item.price}$`}</p>
        <button>Add to cart</button>
        {user.role === 'admin' && (
          <Link to={`/items/${item.id}/update`}>
            <button type="button">Update</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default SingleItem;
