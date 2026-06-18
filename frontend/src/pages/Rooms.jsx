import React from 'react';
import { Link } from 'react-router-dom';

const rooms = [
  { id: 1, name: 'Standard Double', price: '£55/night', img: 'https://images.unsplash.com/photo-1505691723518-36a8b1b1f9f7?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=4a1f1d1d1f1f1a1a1a1a1a1a1a1' },
  { id: 2, name: 'Twin Room', price: '£60/night', img: 'https://images.unsplash.com/photo-1501117716987-c8e6f4d2d3f6?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=8b3d3b6e0f8a3b2c8c3a0f5b2b1d1a6e' },
  { id: 3, name: 'Family Suite', price: '£85/night', img: 'https://images.unsplash.com/photo-1551882547-ffb4f0f2b6c4?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=2e2f2f2f2f2f2f2f2f2f2f2f2f2' }
];

export default function Rooms() {
  return (
    <section>
      <h2>Rooms</h2>
      <p>Comfortable, clean rooms with flexible check-in.</p>

      <div className="rooms-grid">
        {rooms.map((r) => (
          <article key={r.id} className="room-card">
            <img src={r.img} alt={r.name} />
            <div className="room-body">
              <h3>{r.name}</h3>
              <p className="price">{r.price}</p>
              <p>
                <Link to="/accommodation" className="btn primary">Book now</Link>
                <Link to="/gallery" className="btn outline">View gallery</Link>
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}