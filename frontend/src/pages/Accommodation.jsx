import React, { useState } from 'react';
import BookingForm from '../shared/BookingForm';

const accommodations = {
  rooms: [
    { id: 1, name: 'Standard Double', price: '£55/night', img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=800&auto=format&fit=crop', capacity: 2, desc: 'Cozy double room with ensuite' },
    { id: 2, name: 'Twin Room', price: '£60/night', img: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?q=80&w=800&auto=format&fit=crop', capacity: 2, desc: 'Two single beds, perfect for friends' },
    { id: 3, name: 'Family Suite', price: '£85/night', img: 'https://images.unsplash.com/photo-1505691723518-36a8b1b1f9f7?q=80&w=800&auto=format&fit=crop', capacity: 4, desc: 'Spacious suite with bedroom and living area' },
    { id: 4, name: 'Deluxe Lodge', price: '£120/night', img: 'https://images.unsplash.com/photo-1575321024033-b52f5cf3b4d7?q=80&w=800&auto=format&fit=crop', capacity: 6, desc: 'Premium lodge with modern amenities' },
  ],
  venue: [
    { id: 5, name: 'The Grand Manor', price: 'From £800/day', img: 'https://images.unsplash.com/photo-1519681393784-82542a8ba75c?q=80&w=800&auto=format&fit=crop', capacity: 150, desc: 'Beautiful historic house perfect for weddings' },
    { id: 6, name: 'Garden Pavilion', price: 'From £400/day', img: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=800&auto=format&fit=crop', capacity: 100, desc: 'Outdoor garden space for events' },
  ]
};

export default function Accommodation() {
  const [activeTab, setActiveTab] = useState('rooms');
  const [bookingType, setBookingType] = useState('Rooms');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setBookingType(tab === 'rooms' ? 'Rooms & Lodges' : 'Venue & Events');
  };

  const currentItems = activeTab === 'rooms' ? accommodations.rooms : accommodations.venue;

  return (
    <section className="page">
      <div className="hero">
        <p className="eyebrow">Our Spaces</p>
        <h1>Choose Your Perfect Stay</h1>
        <p className="subtext">From cozy rooms and spacious lodges to stunning venues for your special events.</p>
      </div>

      {/* Tabs */}
      <div className="accommodation-tabs">
        <button 
          className={`tab-btn ${activeTab === 'rooms' ? 'active' : ''}`}
          onClick={() => handleTabChange('rooms')}
        >
          🏨 Rooms & Lodges
        </button>
        <button 
          className={`tab-btn ${activeTab === 'venue' ? 'active' : ''}`}
          onClick={() => handleTabChange('venue')}
        >
          🎉 Venue & Events
        </button>
      </div>

      {/* Listings Grid */}
      <div className="accommodation-grid">
        {currentItems.map((item) => (
          <article key={item.id} className="accommodation-card">
            <img src={item.img} alt={item.name} />
            <div className="accommodation-body">
              <h3>{item.name}</h3>
              <p className="accommodation-price">{item.price}</p>
              <p className="accommodation-capacity">👥 Up to {item.capacity} {item.capacity === 1 ? 'person' : 'people'}</p>
              <p className="accommodation-desc">{item.desc}</p>
              <button 
                className="btn primary"
                onClick={() => setActiveTab('form')}
              >
                Book Now
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Booking Form Section */}
      <section className="booking-section">
        <div className="booking-header">
          <h2>Reserve Your {bookingType}</h2>
          <p>Fill out the form below to request a reservation. We'll contact you shortly to confirm availability and details.</p>
        </div>
        <div className="booking-form-container">
          <BookingForm type={bookingType} />
        </div>
      </section>
    </section>
  );
}