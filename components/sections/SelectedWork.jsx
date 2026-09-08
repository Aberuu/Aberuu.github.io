import { SELECTED_WORK } from '../../data/content';

function SelectedWork() {
  return (
    <section id="work" className="section-pad section-chapter section-chapter--cream">
      <div className="chapter-heading chapter-heading--split">
        <div>
          <div className="chapter-kicker reveal-item">
            <span>06</span>
            <span>Selected Work</span>
          </div>
          <h2 className="display-section reveal-item">
            Scenes that<br />shipped.
          </h2>
        </div>
        <p className="chapter-note reveal-item">
          A compact board of direction, editing, photography, and engineering work.
        </p>
      </div>

      <div className="work-grid">
        {SELECTED_WORK.map((work, index) => (
          <article key={work.id} className="work-card reveal-item" data-work-card>
            <span className="studio-card__index">{String(index + 1).padStart(2, '0')}</span>
            <div className="work-card-image">
              <img src={work.image} alt={work.title} loading="lazy" decoding="async" />
            </div>
            <div className="work-card-body">
              <div>
                <h3>{work.title}</h3>
                <p className="label-caps">{work.role}</p>
              </div>
              <div className="work-card-meta">
                <p className="label-caps">{work.category}</p>
                <p>{work.year}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default SelectedWork;
