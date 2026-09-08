import SOCIALS from '../../data/socials';

function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="contact-section" id="contact">
      <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.45)', marginBottom: 32 }}>
        Contact
      </p>

      <h2 className="contact-cta">
        <span className="contact-cta-line">
          <span>Build Something</span>
        </span>
        <span className="contact-cta-line">
          <span>Remarkable</span>
        </span>
      </h2>

      <form className="contact-form reveal" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" required autoComplete="name" />
        <input type="email" name="email" placeholder="Email" required autoComplete="email" />
        <textarea name="message" placeholder="Tell me about your project..." required />
        <button type="submit">Send Inquiry</button>
      </form>

      <div className="contact-bottom">
        <span>&copy; {new Date().getFullYear()} Agaphe Abel. All rights reserved.</span>
        <div className="contact-links">
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noreferrer">
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Contact;
