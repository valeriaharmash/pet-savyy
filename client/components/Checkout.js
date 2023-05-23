import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [recipientFirstName, setRecipientFirstName] = useState('');
  const [recipientLastName, setRecipientLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const user = useSelector((state) => state.auth.user);
  const pendingOrder = useSelector((state) => state.orders.pendingOrder);

  useEffect(() => {
    if (user) {
      setRecipientFirstName(user.firstName);
      setRecipientLastName(user.lastName);
      setEmail(user.email);
      setAddress(user.address);
    }
  }, [user]);

  return (
    <div className="column">
      <h2>Shipping Information</h2>
      <form>
        <div className="row apart">
          <label htmlFor="firstName" className="form-label">
            Recipient First Name:
          </label>
          <input
            className="form"
            name="firstName"
            value={recipientFirstName}
            onChange={(e) => setRecipientFirstName(e.target.value)}
          />
        </div>
        <div className="row apart">
          <label htmlFor="lastName" className="form-label">
            Recipient Last Name:
          </label>
          <input
            className="form"
            name="lastName"
            value={recipientLastName}
            onChange={(e) => setRecipientLastName(e.target.value)}
          />
        </div>
        {!user && <div className="row apart">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            className="form"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>}
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
            disabled={!recipientFirstName || !recipientLastName || !email || !address}
            onClick={() =>
              navigate('/checkout/pay', {
                state: {
                  userId: user && user.id,
                  recipientName: `${recipientFirstName} ${recipientLastName}`,
                  amount: Number(location.state.total) * 100,
                  orderId: pendingOrder.id,
                  shippingAddress: address,
                },
              })
            }
          >
            Continue to Payment
          </button>
          <button onClick={() => navigate('/cart')}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;