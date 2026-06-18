import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Accommodation from './pages/Accommodation';
import Events from './pages/Events';
import NotFound from './pages/NotFound';
import Rooms from './pages/Rooms';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Hero from './components/Hero';
import Footer from './components/Footer';

export default function App() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage('Backend not running yet'));
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <BrowserRouter>
        <header className="site-header" role="banner">
          <div className="container">
            <div>
              <p className="eyebrow">Honest Inn</p>
              <h1 className="logo">Honest Inn</h1>
            </div>

            <nav role="navigation" aria-label="Main navigation">
              <ul className="nav-list">
                <li>
                  <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/menu" className={({ isActive }) => (isActive ? 'active' : '')}>
                    Menu
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/accommodation" className={({ isActive }) => (isActive ? 'active' : '')}>
                    Accommodation
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/events" className={({ isActive }) => (isActive ? 'active' : '')}>
                    Events
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <main id="main-content">
          <Hero />

          <div className="page">
            <div className="container">
              <p className="subtext">{message}</p>
            </div>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/accommodation" element={<Accommodation />} />
              <Route path="/events" element={<Events />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </main>

        <Footer />
      </BrowserRouter>
    </>
  );
}