import React from 'react';

export default function Contact() {
  return (
    <section>
      <h2>Contact</h2>
      <p>Phone:  0788 335 140</p>
      <p>Email: info@honestinn.example</p>
      <form className="contact-form" onSubmit={(e) => e.preventDefault()} aria-label="Contact form">
        <div>
          <label htmlFor="c-name">Name</label>
          <input id="c-name" name="name" type="text" required />
        </div>
        <div>
          <label htmlFor="c-email">Email</label>
          <input id="c-email" name="email" type="email" required />
        </div>
        <div>
          <label htmlFor="c-msg">Message</label>
          <textarea id="c-msg" name="message" rows="4" required />
        </div>
        <button className="btn primary">Send</button>
      </form>
    </section>
  );
}