const menuCategories = [
  {
    id: 'starters',
    title: 'Starters',
    items: [
      { id: 101, name: 'Garlic Mushrooms', short: 'Garlic Mush', price: '£5.50' },
      { id: 102, name: 'Crispy Calamari', short: 'Calamari', price: '£6.50' }
    ]
  },
  {
    id: 'mains',
    title: 'Mains',
    items: [
      { id: 201, name: 'Beef Kebab (Brochette)', short: 'Kebab', price: 'RWF 9,000', image: '/images/Beef-Brochettes.webp' },
      { id: 202, name: 'Chapati / Flatbread', short: 'Chapati', price: 'RWF 1,000', image: '/images/chapati.webp' },
      { id: 203, name: 'Fried Chicken', short: 'Fried Chkn', price: 'RWF 7,000', image: '/images/chicken.webp' },
      { id: 204, name: 'Chicken Stew', short: 'Chkn Stew', price: 'RWF 8,500', image: '/images/chi.webp' },
      { id: 205, name: 'Salmon Skewers', short: 'Salmon', price: 'RWF 14,000', image: '/images/fish-brochets.webp' },
      { id: 206, name: 'Grilled Fish', short: 'Grilled Fish', price: 'RWF 15,000', image: '/images/fish-roasted.jpg' },
      { id: 207, name: 'French Fries (Large)', short: 'Fries', price: 'RWF 3,000', image: '/images/fries.jpg' }
    ]
  },
  {
    id: 'sides',
    title: 'Sides',
    items: [
      { id: 151, name: 'Chapati (side)', short: 'Chapati', price: 'RWF 1,000', image: '/images/chapati.webp' }
    ]
  },
  {
    id: 'desserts',
    title: 'Desserts',
    items: [
      { id: 301, name: 'Sticky Toffee Pudding', short: 'Toffee Pdg', price: '£5.00' },
      { id: 302, name: 'Vanilla Ice Cream (2 scoops)', short: 'Ice Cream', price: '£3.50' }
    ]
  },
  {
    id: 'drinks',
    title: 'Drinks & Sides',
    items: [
      { id: 402, name: 'House IPA (pint)', short: 'IPA', price: 'RWF 7,000', image: '/images/beers.jpg' },
      { id: 403, name: 'Fanta (various)', short: 'Fanta', price: 'RWF 3,000', image: '/images/fantas.jpg' },
      { id: 404, name: 'Jack Daniels (whiskey)', short: 'Jack', price: 'RWF 18,000', image: '/images/jack-daniels.jpg' },
      { id: 405, name: 'Liquors (assorted)', short: 'Liquors', price: 'RWF 12,000', image: '/images/liquars.jpg' },
      { id: 406, name: 'Inyange Juice', short: 'Inyange', price: 'RWF 4,000', image: '/images/inyange-rwanda-juice.jpeg' }
    ]
  }
];

export default function Menu() {
  return (
    <section aria-labelledby="menu-heading">
      <h2 id="menu-heading">Food & Drinks</h2>
      {menuCategories.map((cat) => (
        <div key={cat.id} className="menu-category">
              <h3>{cat.title}</h3>
              <ul role="list" aria-label={`${cat.title} items`} className="menu-grid">
                    {cat.items.map((item) => {
                      if (item.image) {
                        return (
                          <li key={item.id} className="menu-card" style={{ backgroundImage: `url(${item.image})` }}>
                            <img
                              src={item.image}
                              alt=""
                              className="visually-hidden"
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                const card = e.currentTarget.closest('.menu-card');
                                const src = e.currentTarget.getAttribute('src') || '';
                                // try swapping common misspelling between liquors/liquars
                                if (src.includes('liquors.jpg') && !src.includes('liquars.jpg?q')) {
                                  if (card) card.style.backgroundImage = "url('/images/liquars.jpg')";
                                  e.currentTarget.src = '/images/liquars.jpg';
                                  return;
                                }
                                if (src.includes('liquars.jpg') && !src.includes('liquors.jpg?q')) {
                                  if (card) card.style.backgroundImage = "url('/images/liquors.jpg')";
                                  e.currentTarget.src = '/images/liquors.jpg';
                                  return;
                                }
                                // final fallback to placeholder
                                if (card) card.style.backgroundImage = "url('/images/placeholder.svg')";
                                card && card.classList.add('missing-image');
                              }}
                            />

                            <div className="card-overlay">
                              <div>
                                <strong>{item.name}</strong>
                                <div className="small-name" aria-hidden="true">{item.short}</div>
                              </div>
                              <div className="price">{item.price}</div>
                            </div>
                          </li>
                        );
                      }

                      return (
                        <li key={item.id} className="menu-card text-card">
                          <div className="card-overlay">
                            <div>
                              <strong>{item.name}</strong>
                              <div className="small-name" aria-hidden="true">{item.short}</div>
                            </div>
                            <div className="price">{item.price}</div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
        </div>
      ))}
    </section>
  );
}