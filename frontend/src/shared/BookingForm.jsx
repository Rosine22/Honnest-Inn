import React, { useState } from 'react';
import PaymentForm from './PaymentForm';

export default function BookingForm({ type = 'Booking' }) {
  const [values, setValues] = useState({ 
    name: '', 
    email: '', 
    phone: '',
    date: '',
    endDate: '',
    guests: '1',
    message: ''
  });
  const [status, setStatus] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [saving, setSaving] = useState(false);

  const isVenue = type.includes('Venue') || type.includes('Events');

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Show payment form instead of just confirming
    setShowPayment(true);
  }

  async function handlePaymentComplete(method) {
    setSaving(true);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          bookingType: type,
          paymentMethod: method,
        }),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(errorBody?.message || 'Unable to save booking.');
      }

      setStatus(`✓ Payment received via ${method === 'momo' ? 'Momo' : 'Credit Card'}. Booking confirmed!`);
      setTimeout(() => {
        setValues({ name: '', email: '', phone: '', date: '', endDate: '', guests: '1', message: '' });
        setStatus(null);
        setShowPayment(false);
      }, 3000);
    } finally {
      setSaving(false);
    }
  }

  if (showPayment) {
    return (
      <PaymentForm 
        bookingDetails={values}
        onPaymentComplete={handlePaymentComplete}
        onBack={() => setShowPayment(false)}
        saving={saving}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} aria-label={`${type} booking form`}>
      <div>
        <label htmlFor="name">Full name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={values.name}
          onChange={handleChange}
          required
          aria-required="true"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          required
          aria-required="true"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label htmlFor="phone">Phone number</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={values.phone}
          onChange={handleChange}
          placeholder="+44 (0)..."
        />
      </div>

      <div>
        <label htmlFor="date">Check-in / Start date & time</label>
        <input
          id="date"
          name="date"
          type="datetime-local"
          value={values.date}
          onChange={handleChange}
          required
          aria-required="true"
        />
      </div>

      {isVenue ? (
        <div>
          <label htmlFor="endDate">Event date / End date & time</label>
          <input
            id="endDate"
            name="endDate"
            type="datetime-local"
            value={values.endDate}
            onChange={handleChange}
            required
            aria-required="true"
          />
        </div>
      ) : (
        <div>
          <label htmlFor="endDate">Check-out date & time</label>
          <input
            id="endDate"
            name="endDate"
            type="datetime-local"
            value={values.endDate}
            onChange={handleChange}
            required
            aria-required="true"
          />
        </div>
      )}

      <div>
        <label htmlFor="guests">Number of {isVenue ? 'guests' : 'guests'}</label>
        <input
          id="guests"
          name="guests"
          type="number"
          min="1"
          max={isVenue ? '500' : '10'}
          value={values.guests}
          onChange={handleChange}
          required
          aria-required="true"
        />
      </div>

      <div>
        <label htmlFor="message">Additional details</label>
        <textarea
          id="message"
          name="message"
          value={values.message}
          onChange={handleChange}
          placeholder={isVenue ? 'Tell us about your event...' : 'Any special requests?'}
          rows="4"
        />
      </div>

      <button type="submit">Proceed to Payment</button>

      {status && (
        <p role="status" aria-live="polite" style={{ color: '#10b981', textAlign: 'center' }}>
          {status}
        </p>
      )}
    </form>
  );
}