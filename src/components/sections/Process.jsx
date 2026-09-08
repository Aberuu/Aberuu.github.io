import { PROCESS_STEPS } from '../../data/content';

function Process() {
  return (
    <section id="process" className="process-stack section-chapter section-chapter--navy">
      <div className="section-pad pb-0">
        <div className="chapter-heading">
          <div className="chapter-kicker reveal-item">
            <span>05</span>
            <span>Process</span>
          </div>
          <h2 className="display-section reveal-item mb-0">
            How the<br />world gets built.
          </h2>
        </div>
      </div>

      {/* Vertical progress rail */}
      <div className="process-progress" aria-hidden="true">
        <div className="process-progress__track">
          <div className="process-progress__fill" />
        </div>
        {PROCESS_STEPS.map((_, i) => (
          <span key={i} className="process-progress__dot">{String(i + 1).padStart(2, '0')}</span>
        ))}
      </div>

      <div className="process-panels">
        {PROCESS_STEPS.map((step, i) => (
          <div key={step.id} className="process-panel" data-process-panel>
            {/* Decorative ghost number visible during transitions */}
            <span className="process-panel__ghost" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>

            <div className="process-panel__mark reveal-item">
              <span>{String(i + 1).padStart(2, '0')}</span>
            </div>
            <div className="reveal-item">
              <h3 className="process-panel-label">
                <span>{step.label}</span>
              </h3>
              <p>{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Process;
