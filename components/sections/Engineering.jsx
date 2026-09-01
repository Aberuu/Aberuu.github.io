import { useState } from 'react';
import { ENGINEERING } from '../../data/content';

function highlightCode(code) {
  return code
    .replace(/\b(const|export|function|return|useState)\b/g, '<span class="kw">$1</span>')
    .replace(/\b([a-zA-Z]+)\(/g, '<span class="fn">$1</span>(')
    .replace(/'([^']+)'/g, '<span class="str">\'$1\'</span>')
    .replace(/"([^"]+)"/g, '<span class="str">"$1"</span>');
}

function Engineering() {
  const [active, setActive] = useState(0);
  const item = ENGINEERING[active];

  return (
    <section id="engineering" className="section-pad section-chapter section-chapter--blue relative overflow-hidden">
      <div className="engineering-grid-bg absolute inset-0 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10">
        <div className="chapter-heading">
          <div className="chapter-kicker reveal-item">
            <span>04</span>
            <span>Engineering</span>
          </div>
          <h2 className="display-section reveal-item">
            Interfaces<br />with a pulse.
          </h2>
        </div>

        <div className="engineering-tabs reveal-item">
          {ENGINEERING.map((eng, i) => (
            <button
              key={eng.id}
              type="button"
              onClick={() => setActive(i)}
              className={active === i ? 'is-active' : ''}
            >
              {eng.category}
            </button>
          ))}
        </div>

        <div className="engineering-grid reveal-item">
          <div className="terminal" key={item.id}>
            <div className="terminal-bar">
              <span className="terminal-dot" />
              <span className="terminal-dot" />
              <span className="terminal-dot" />
            </div>
            <pre
              className="terminal-body"
              dangerouslySetInnerHTML={{ __html: highlightCode(item.code) }}
            />
          </div>

          <div className="interface-preview">
            <p className="label-caps">{item.category}</p>
            <h3>{item.title}</h3>
            <p>{item.output}</p>
            <div className="interface-meter">
              <span style={{ width: '78%' }} />
            </div>
            <div className="interface-card">
              <p>Signal translated into motion, layout, and usable interaction.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Engineering;
