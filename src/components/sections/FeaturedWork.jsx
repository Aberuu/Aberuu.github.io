import WORKS from '../../data/projects';

function FeaturedCard({ work, eager }) {
  return (
    <article className="featured-card">
      <div className="featured-card-image">
        <img
          src={work.image}
          alt={work.title}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
        />
        <div className="featured-card-overlay" />
        <div className="featured-card-desc">
          <p className="body-small" style={{ color: 'rgba(255,255,255,0.85)' }}>
            {work.statement}
          </p>
        </div>
      </div>
      <div className="featured-card-meta">
        <span>{work.category}</span>
        <span>{work.year}</span>
      </div>
      <h3 className="featured-card-title">{work.title}</h3>
    </article>
  );
}

function FeaturedWork() {
  const featured = WORKS.filter((w) => w.featured);

  return (
    <>
      <section className="featured-section" id="work">
        <div className="featured-header">
          <p className="section-subtitle reveal">Featured Work</p>
          <h2 className="section-title" style={{ marginTop: 16 }}>
            <span className="split-line">
              <span>Recent</span>
            </span>
            <span className="split-line">
              <span>projects</span>
            </span>
          </h2>
        </div>

        <div className="featured-grid">
          {featured.map((work, i) => (
            <FeaturedCard key={work.id} work={work} eager={i === 0} />
          ))}
        </div>
      </section>

      <section className="featured-horizontal" aria-label="Featured work gallery">
        <div className="featured-horizontal-inner">
          <div className="featured-header">
            <p className="section-subtitle">Explore</p>
            <h2 className="section-title" style={{ marginTop: 12 }}>
              Selected pieces
            </h2>
          </div>
          <div className="featured-track">
            {featured.map((work) => (
              <FeaturedCard key={`h-${work.id}`} work={work} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default FeaturedWork;
