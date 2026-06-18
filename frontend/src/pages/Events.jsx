import React from 'react';
import BookingForm from '../shared/BookingForm';

export default function Events() {
  return (
    <section>
      <h2>Events & Garden Venue</h2>
      <p>
        Our garden and guest house are available for weddings and private
        functions. Request availability with the form below.
      </p>
      <BookingForm type="Event" />
    </section>
  );
}