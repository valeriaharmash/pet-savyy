import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const Checkout = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [address, setAddress] = useState('');

	const user = useSelector((state) => state.auth.user);
	const orderId = useSelector((state) => state.cart.orderId);

	useEffect(() => {
		if (user) {
			setFirstName(user.firstName);
			setLastName(user.lastName);
			setEmail(user.email);
			setAddress(user.address);
		}
	}, [user]);

	return (
		<div className="column">
			<h2>Checkout</h2>
			<form>
				<div className="row apart">
					<label htmlFor="firstName" className="form-label">
						First Name:
					</label>
					<input
						className="form"
						name="firstName"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
					/>
				</div>
				<div className="row apart">
					<label htmlFor="lastName" className="form-label">
						Last Name:
					</label>
					<input
						className="form"
						name="lastName"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
					/>
				</div>
				<div className="row apart">
					<label htmlFor="email" className="form-label">
						Email:
					</label>
					<input
						className="form"
						name="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="row apart">
					<label htmlFor="address" className="form-label">
						Shipping Address:
					</label>
					<input
						className="form"
						name="address"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
					/>
				</div>
				<div className="row around">
					<button
						onClick={() =>
							navigate('/checkout/pay', {
								state: {
									userId: user && user.id,
									amount: Number(location.state.total) * 100,
									orderId,
									shippingAddress: address,
								},
							})
						}
					>
						Continue to Payment
					</button>
					<button onClick={() => navigate('/')}>Cancel</button>
				</div>
			</form>
		</div>
	);
};

export default Checkout;