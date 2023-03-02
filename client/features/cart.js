import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  fetchUserOrder,
  selectUserCart,
  setOrderQty,
  deleteItem,
} from "./cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();

  const orders = useSelector(selectUserCart);

  // const [item, setItem] = useState({});
  const [cart, setCart] = useState([]);
  // const [user, setUser] = useState();
  const [total, setTotal] = useState(0);
  const qtyOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    const getOrder = async () => {
      const userOrder = await dispatch(fetchUserOrder(userId));
      setCart(userOrder.payload);
      const subTotal = userOrder["payload"].reduce((total, item) => {
        return total + item.item.price * item.qty;
      }, 0);
      setTotal(subTotal);
    };
    getOrder();
  }, []);

  const handleDelete = async (itemId) => {
    const updatedCart = cart.filter((item) => item.itemId !== itemId);
    setCart(updatedCart);
    const subTotal = updatedCart.reduce((total, item) => {
      return total + item.item.price * item.qty;
    }, 0);

    setTotal(subTotal);
    await dispatch(deleteItem({ userId, itemId, subTotal }));
  };

  const handleQuantityChange = async (itemId, quantity) => {
    // await dispatch(setOrderQty({ userId, itemId, quantity }));
    const updatedCart = cart.map((item) => {
      if (item.itemId === itemId) {
        return { ...item, qty: quantity };
      }
      return item;
    });
    setCart(updatedCart);

    const subTotal = updatedCart.reduce((total, item) => {
      return total + item.item.price * item.qty;
    }, 0);

    setTotal(subTotal);
    await dispatch(setOrderQty({ userId, itemId, quantity, subTotal }));
  };

  return (
    <div className="content">
      <div className="container">
        <h1>Shopping Cart</h1>
        <h3 className="flex-end-column">{`Total: $${total.toFixed(2)}`}</h3>
        <Link to="/home">
          <button>Checkout</button>
        </Link>
      </div>
      <div>
        {cart.map((item) => {
          return (
            <div key={item.itemId} className="cart-items">
              <img
                src={item.item.imageUrl}
                alt={item.item.name}
                height="150"
                width="175"
              />
              <div className="item-description">
                <h4>Item: {item.item.name}</h4>
                <p>{item.item.stock > 0 ? "In Stock" : "Out of Stock"}</p>
                <select
                  style={{ marginBottom: "1rem" }}
                  value={item.qty}
                  onChange={(event) =>
                    handleQuantityChange(item.itemId, event.target.value)
                  }
                >
                  {qtyOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <button onClick={() => handleDelete(item.itemId)}>
                  Remove from Cart
                </button>
              </div>
              <div>{`$ ${(item.item.price * item.qty).toFixed(2)}`}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cart;
