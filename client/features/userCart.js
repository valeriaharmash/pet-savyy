import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteItem, fetchUserOrder, setOrderQty } from './cartSlice';

const UserCart = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { userId } = useParams();

	const [cart, setCart] = useState([]);
	const [total, setTotal] = useState(0);
	const qtyOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

	// ensures orders are displayed
	useEffect(() => {
		const getOrder = async () => {
			try {
				const userOrder = await dispatch(fetchUserOrder(userId));
				setCart(userOrder.payload);
				setTotal(userOrder.payload[0].order.total);
			} catch (err) {
				console.error(err);
			}
		};
		getOrder();
	}, []);

	const handleDelete = async (itemId) => {
		// updating the front end
		const updatedCart = cart.filter((item) => item.itemId !== itemId);
		setCart(updatedCart);
		const subTotal = updatedCart.reduce((total, item) => {
			return total + item.item.price * item.qty;
		}, 0);
		setTotal(subTotal);

		// updating the back end
		dispatch(deleteItem({ userId, itemId, subTotal }));
	};

	const handleQuantityChange = async (itemId, quantity) => {
		// updating the front end
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

		// updating the back end
		dispatch(setOrderQty({ userId, itemId, quantity }));
	};

	return (
		<div className="content">
			<div className="container">
				<h2>Shopping Cart</h2>
				<h3>{`Total: $${total.toFixed(2)}`}</h3>
				<button
					disabled={!total}
					onClick={() => navigate('/checkout', { state: { total } })}
				>
					Checkout
				</button>
			</div>
			<div>
				{cart.map((item) => {
					return (
						<div key={item.itemId} className="cart-items">
							<Link to={`/items/${item.itemId}`}>
								<img
									src={item.item.imageUrl}
									alt={item.item.name}
									height="150"
									width="175"
								/>
							</Link>
							<div className="item-description">
								<Link to={`/items/${item.itemId}`} className="link">
									<h4>{item.item.name}</h4>
								</Link>
								<p>{item.item.stock > 0 ? 'In Stock' : 'Out of Stock'}</p>
								<select
									style={{ marginBottom: '1rem' }}
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

export default UserCart;
