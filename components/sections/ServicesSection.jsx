import SERVICES from '../../data/services';

function ServicesSection() {
  return (
    <section className="services-section" id="services">
      <div className="services-header reveal">
        <p className="section-subtitle">Services</p>
        <h2 className="section-title" style={{ marginTop: 16 }}>
          What I do
        </h2>
      </div>

      <div className="services-grid">
        {SERVICES.map((service, i) => (
          <article key={service.id} className="services-card reveal">
            <p className="services-card-index">0{i + 1}</p>
            <h3 className="services-card-title">{service.title}</h3>
            <p className="services-card-desc">{service.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ServicesSection;
