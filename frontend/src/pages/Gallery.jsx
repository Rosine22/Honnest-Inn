import React from 'react';

const images = [
  'https://images.unsplash.com/photo-1501117716987-c8e6f4d2d3f6?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=8b3d3b6e0f8a3b2c8c3a0f5b2b1d1a6e',
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=5c5d5c5c5c5c5c5c5c5c5c5c5c',
  'https://images.unsplash.com/photo-1505691723518-36a8b1b1f9f7?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=4a1f1d1d1f1f1a1a1a1a1a1a1a1'
];

export default function Gallery() {
  return (
    <section>
      <h2>Gallery</h2>
      <div className="gallery-grid">
        {images.map((src, i) => (
          <img key={i} src={src} alt={`Gallery image ${i + 1}`} />
        ))}
      </div>
    </section>
  );
}