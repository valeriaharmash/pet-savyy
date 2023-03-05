import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from "axios";
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useLocation } from 'react-router-dom';

// Test cards
// success 4242424242424242
// failed 4000000000009995
// auth 4000002500003155

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/completion`,
      },
    });

    if (error) {
      setMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      // TODO save payment intent ID on db.Order
    } else {
      setMessage('Unexpected state');
    }

    setIsProcessing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement/>
      <button disabled={isProcessing} id="submit">
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Pay now"}
        </span>
      </button>

      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

const Payment = () => {
  const location = useLocation();
  const { userId, amount } = location.state;
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    setStripePromise(loadStripe("pk_test_51MhztBBqYlNDwmdFusXTvPRRZjL6WViEJHbfIeFzVFw9z2RPHpfUEJpF76NcHLzsKEh8xObgkwof2b6AjSzQJRnZ00gfCf4mtE"));
  }, []);

  useEffect(() => {
    if (amount) {
      axios.post('/api/payments/intent', { amount: amount, userId }).then(res => {
        const { data: { clientSecret } } = res;
        setClientSecret(clientSecret);
      });
    }
  }, [amount]);

  if (!stripePromise || !clientSecret) return null;

  return <div>
    {stripePromise && clientSecret &&
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <p>{`Total: $${amount / 100}`}</p>
        <CheckoutForm/>
      </Elements>
    }
  </div>;
};

export default Payment;