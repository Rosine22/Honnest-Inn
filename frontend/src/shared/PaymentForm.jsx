import React, { useMemo, useState } from 'react';

export default function PaymentForm({ bookingDetails, onPaymentComplete, onBack, saving = false }) {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [cardDetails, setCardDetails] = useState({ cardNumber: '', expiry: '', cvc: '' });
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [error, setError] = useState(null);

  const momoPayment = useMemo(() => {
    const momoNumbers = ['+256 701 234 567', '+256 772 845 190', '+256 785 901 246'];
    const momoCodes = ['HN-2048', 'INN-5731', 'BK-8916'];
    const index = Math.floor(Math.random() * momoNumbers.length);

    return {
      recipient: 'Honest-Inn Hotel',
      number: momoNumbers[index],
      code: momoCodes[index],
    };
  }, []);

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleCardPayment = (e) => {
    e.preventDefault();
    if (cardDetails.cardNumber && cardDetails.expiry && cardDetails.cvc) {
      setError(null);
      setPaymentStatus('processing');
      Promise.resolve(onPaymentComplete('card'))
        .then(() => setPaymentStatus('success'))
        .catch((bookingError) => {
          setPaymentStatus(null);
          setError(bookingError.message || 'Unable to save booking.');
        });
    }
  };

  const handleMomoPayment = () => {
    setError(null);
    setPaymentStatus('processing');
    Promise.resolve(onPaymentComplete('momo'))
      .then(() => setPaymentStatus('success'))
      .catch((bookingError) => {
        setPaymentStatus(null);
        setError(bookingError.message || 'Unable to save booking.');
      });
  };

  return (
    <div className="payment-modal">
      <div className="payment-container">
        <div className="payment-header">
          <h2>Complete Payment</h2>
          <p>Choose your preferred payment method</p>
        </div>

        {!paymentMethod ? (
          <div className="payment-methods">
            <div className="booking-summary">
              <h3>Booking Summary</h3>
              <p><strong>Name:</strong> {bookingDetails.name}</p>
              <p><strong>Email:</strong> {bookingDetails.email}</p>
              <p><strong>Dates:</strong> {bookingDetails.date} to {bookingDetails.endDate}</p>
              <p><strong>Guests:</strong> {bookingDetails.guests}</p>
              <p className="total-price"><strong>Total Amount:</strong> £{bookingDetails.totalAmount || '250'}</p>
            </div>

            <div className="payment-options">
              <button
                type="button"
                className="payment-option"
                onClick={() => setPaymentMethod('momo')}
              >
                <div className="payment-icon">📱</div>
                <div className="payment-info">
                  <h3>Momo Cash</h3>
                  <p>Mobile Money - Quick and secure</p>
                </div>
              </button>

              <button
                type="button"
                className="payment-option"
                onClick={() => setPaymentMethod('card')}
              >
                <div className="payment-icon">💳</div>
                <div className="payment-info">
                  <h3>Credit Card</h3>
                  <p>Visa, Mastercard, etc.</p>
                </div>
              </button>
            </div>
          </div>
        ) : paymentMethod === 'momo' ? (
          <div className="payment-momo">
            {paymentStatus === 'success' ? (
              <div className="payment-success">
                <div className="success-icon">✓</div>
                <h3>Payment Received!</h3>
                <p>Your booking has been confirmed.</p>
              </div>
            ) : (
              <div className="momo-code-display">
                <p className="momo-label">Pay on this number:</p>
                <div className="momo-code">{momoPayment.number}</div>
                <p className="momo-instruction">Use this payment code when sending your Momo payment.</p>
                <div className="momo-details">
                  <p><strong>Recipient:</strong> {momoPayment.recipient}</p>
                  <p><strong>Payment Code:</strong> {momoPayment.code}</p>
                  <p><strong>Amount:</strong> £{bookingDetails.totalAmount || '250'}</p>
                </div>
                  <button type="button" className="btn primary payment-btn" onClick={handleMomoPayment} disabled={saving || paymentStatus === 'processing'}>
                    {paymentStatus === 'processing' ? 'Saving booking...' : 'I Have Paid'}
                </button>
              </div>
            )}
          </div>
        ) : paymentMethod === 'card' ? (
          <form onSubmit={handleCardPayment} className="payment-card-form">
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                id="cardNumber"
                name="cardNumber"
                type="text"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.cardNumber}
                onChange={handleCardChange}
                maxLength="19"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="expiry">Expiry Date</label>
                <input
                  id="expiry"
                  name="expiry"
                  type="text"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={handleCardChange}
                  maxLength="5"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="cvc">CVC</label>
                <input
                  id="cvc"
                  name="cvc"
                  type="text"
                  placeholder="123"
                  value={cardDetails.cvc}
                  onChange={handleCardChange}
                  maxLength="3"
                  required
                />
              </div>
            </div>

            {paymentStatus === 'success' ? (
              <div className="payment-success">
                <div className="success-icon">✓</div>
                <h3>Payment Successful!</h3>
                <p>Your booking has been confirmed.</p>
              </div>
            ) : paymentStatus === 'processing' ? (
              <div className="payment-success">
                <p>Saving booking details...</p>
              </div>
            ) : (
              <button type="submit" className="btn primary payment-btn" disabled={saving}>
                {saving ? 'Saving booking...' : `Pay £${bookingDetails.totalAmount || '250'}`}
              </button>
            )}
          </form>
        ) : null}

        {error && (
          <p role="alert" style={{ color: '#ef4444', textAlign: 'center' }}>
            {error}
          </p>
        )}

        {!paymentStatus && paymentMethod && (
          <button type="button" className="btn outline back-btn" onClick={() => setPaymentMethod(null)}>
            ← Back to Payment Methods
          </button>
        )}

        {paymentStatus !== 'success' && (
          <button type="button" className="btn outline close-btn" onClick={onBack}>
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
