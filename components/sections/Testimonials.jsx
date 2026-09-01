import TESTIMONIALS from '../../data/testimonials';

function Testimonials() {
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="testimonials-header reveal">
        <p className="section-subtitle">Testimonials</p>
        <h2 className="section-title" style={{ marginTop: 16 }}>
          Words from collaborators
        </h2>
      </div>

      <div className="testimonials-track">
        {doubled.map((t, i) => (
          <blockquote
            key={`${t.id}-${i}`}
            className="testimonials-card"
            aria-hidden={i >= TESTIMONIALS.length}
          >
            <p className="testimonials-text">&ldquo;{t.text}&rdquo;</p>
            <footer className="testimonials-attribution">
              <cite className="testimonials-name">{t.name}</cite>
              <span className="testimonials-role">{t.role}</span>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
