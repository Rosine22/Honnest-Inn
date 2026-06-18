import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  const bg = 'https://images.unsplash.com/photo-1501117716987-c8e6f4d2d3f6?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&s=8b3d3b6e0f8a3b2c8c3a0f5b2b1d1a6e';

  return (
    <section className="hero-visual" style={{ backgroundImage: `url(${bg})` }}>
      <div className="hero-overlay">
        <div className="hero-inner">
          <h2>Welcome to Honest Inn Motel</h2>
          <p>Comfortable rooms, a friendly bar, and a beautiful garden venue.</p>
          <p className="hero-ctas">
            <Link to="/rooms" className="btn primary">View Rooms</Link>
            <Link to="/accommodation" className="btn outline">Book a Room</Link>
          </p>
        </div>
      </div>
    </section>
  );
}