import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchOrder, updateOrderItem } from '../store/slices/orders';

const renderItemSelectOption = (item, handleQuantityChange) => {
  switch (item.stock) {
    case 0:
      return <p>Out of Stock</p>;
    case 1:
      return <p>Only One left in stock</p>;
    default:
      let itemOptions;
      if (item.stock >= 10) {
        itemOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      } else {
        itemOptions = new Array(item.stock).fill(0).map((v, idx) => idx + 1);
      }
      return <select
        style={{ marginBottom: '1rem' }}
        value={item.qty}
        onChange={(event) => handleQuantityChange(item.id, event.target.value)}
      >
        {itemOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>;
  }
};

const UserCart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [refresh, setRefresh] = useState(false);

  const pendingOrder = useSelector((state) => state.orders.pendingOrder);
  const selectedOrder = useSelector((state) => state.orders.selectedOrder);

  // ensures orders are displayed
  useEffect(() => {
    if (pendingOrder) {
      dispatch(fetchOrder(pendingOrder.id));
    }
  }, [pendingOrder, refresh]);

  const handleDelete = async (itemId) => {
    await dispatch(updateOrderItem({ itemId, orderId: pendingOrder.id, qty: 0 }));
    setRefresh(!refresh);
  };

  const handleQuantityChange = async (itemId, qty) => {
    await dispatch(updateOrderItem({ itemId, orderId: pendingOrder.id, qty }));
    setRefresh(!refresh);
  };

  if (!selectedOrder) return null;

  return (
    <div className="content">
      <div className="container">
        <h2>Shopping Cart</h2>
        <h3>{`Total: $${selectedOrder.total.toFixed(2)}`}</h3>
        <button
          disabled={!selectedOrder.total}
          onClick={() => navigate('/checkout', { state: { total: selectedOrder.total } })}
        >
          Checkout
        </button>
      </div>
      <div>
        {selectedOrder.items.map((item) => {
          return (
            <div key={item.id} className="cart-items">
              <Link to={`/items/${item.id}`}>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  height="150"
                  width="175"
                />
              </Link>
              <div className="item-description">
                <Link to={`/items/${item.id}`} className="link">
                  <h4>{item.name}</h4>
                </Link>
                {renderItemSelectOption(item, handleQuantityChange)}
                <button onClick={() => handleDelete(item.id)}>
                  Remove from Cart
                </button>
              </div>
              <div>
                <p>Price:</p>
                <div>{`$ ${item.price.toFixed(2)}`}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserCart;
