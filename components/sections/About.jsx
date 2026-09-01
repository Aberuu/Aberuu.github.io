const TOOLS = [
  'Premiere Pro', 'After Effects', 'DaVinci Resolve',
  'React', 'TypeScript', 'Node.js',
  'Lightroom', 'Capture One',
];

function About() {
  return (
    <section className="about-section" id="about">
      <div className="about-grid">
        <div className="about-image reveal">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80"
            alt="Portrait of Agaphe Abel"
            loading="lazy"
            data-parallax="0.1"
          />
          <span className="about-image-caption">Jakarta, 2025</span>
        </div>

        <div className="about-content">
          <div>
            <p className="section-subtitle reveal">About</p>
            <h2 className="section-title" style={{ marginTop: 16, marginBottom: 28 }}>
              <span className="split-line"><span>Three disciplines,</span></span>
              <span className="split-line"><span>one vision.</span></span>
            </h2>
            <p className="body-large reveal">
              I work across video, engineering, and photography—not because I can&apos;t choose,
              but because the best stories live at the intersections.
            </p>
          </div>

          <div className="about-block reveal">
            <h3>Philosophy</h3>
            <p>
              Every project is a system of decisions. The frame, the function, the feel—they&apos;re
              all connected. I approach each discipline with the same rigor: understand the intent,
              respect the craft, and never ship something that doesn&apos;t feel right.
            </p>
          </div>

          <div className="about-block reveal">
            <h3>Process</h3>
            <p>
              Listen first. Build second. Everything begins with understanding the story that
              needs to be told—whether it&apos;s a 90-minute cut, a React component, or a single frame.
            </p>
          </div>

          <div className="about-block">
            <h3>Tools</h3>
            <div className="about-tools stagger-group">
              {TOOLS.map((tool) => (
                <span key={tool}>{tool}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
