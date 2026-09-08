import WORKS from '../../data/projects';

function SelectedProjects() {
  const projects = WORKS.filter((w) => !w.featured);

  return (
    <section className="projects-section" id="projects">
      <div className="projects-section-header">
        <p className="section-subtitle reveal">Selected Projects</p>
        <h2 className="section-title" style={{ marginTop: 16 }}>
          <span className="split-line"><span>Magazine</span></span>
          <span className="split-line"><span>archive</span></span>
        </h2>
      </div>

      {projects.map((work, i) => (
        <article
          key={work.id}
          className={`projects-item ${i % 2 !== 0 ? 'is-reversed' : ''}`}
        >
          <div className="projects-item-image">
            <img
              src={work.image}
              alt={work.title}
              loading="lazy"
              decoding="async"
              data-parallax="0.08"
            />
          </div>
          <div className="projects-item-content stagger-group">
            <p className="projects-item-cat">{work.category}</p>
            <h3 className="projects-item-title">{work.title}</h3>
            <p className="projects-item-desc">{work.desc}</p>
            <p className="projects-item-year">{work.year}</p>
          </div>
        </article>
      ))}
    </section>
  );
}

export default SelectedProjects;
