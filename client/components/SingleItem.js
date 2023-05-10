import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchSingleItem } from '../store/slices/items';
import { fetchOrder, updateOrderItem } from '../store/slices/orders';
import { ItemSelectOption } from './shared';

const SingleItem = () => {
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const [itemQty, setItemQty] = useState(1);
  const [refresh, setRefresh] = useState(false);

  const item = useSelector((state) => state.items.selectedItem);
  const user = useSelector((state) => state.auth.user);
  const { pendingOrder, selectedOrder } = useSelector((state) => state.orders);

  const qtyInCart = useMemo(() => {
    let qty = 0;
    if (selectedOrder) {
      selectedOrder.items.forEach((item) => {
        if (item.id === Number(itemId)) {
          qty = item.qty;
        }
      });
    }
    return qty;
  }, [selectedOrder]);

  useEffect(() => {
    if (itemId) {
      dispatch(fetchSingleItem(itemId));
    }
  }, [itemId]);

  useEffect(() => {
    if (user) {
      dispatch(fetchOrder(pendingOrder.id));
    }
  }, [pendingOrder, refresh]);


  const handleAddToCart = async () => {
    if (user) {
      await dispatch(
        updateOrderItem({ orderId: pendingOrder.id, itemId, qty: itemQty + qtyInCart })
      );
      setRefresh(!refresh);
      setItemQty(1);
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
    <div className="row apart">
      <img className="item-img" src={item.imageUrl}/>
      <div style={{ flex: 2, padding: '2rem' }}>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <ItemSelectOption
          itemId={item.id}
          qty={itemQty}
          stock={item.stock - qtyInCart}
          limit={30}
          handleQuantityChange={(itemId, value) => setItemQty(Number(value))}
        />
        {!!qtyInCart && <p>{`In cart: ${qtyInCart}`}</p>}
        <p>Price: {`$ ${(item.price).toFixed(2)}`}</p>
        {(!user || user.role !== 'admin') && (
          <button
            disabled={!itemQty}
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
        )}
        {user && user.role === 'admin' && (
          <Link to={`/items/${item.id}/update`}>
            <button type="button">Update</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default SingleItem;
