function Manifesto() {
  return (
    <section className="section-pad manifesto-section relative overflow-hidden">
      <div className="grain grain-animated" aria-hidden="true" />
      <div className="manifesto-mark" aria-hidden="true">AG</div>
      <div className="manifesto-shell">
        <div className="chapter-kicker reveal-item">
          <span>07</span>
          <span>Manifesto</span>
        </div>
        <p className="manifesto-text reveal-item">
          Every frame has a face.<br />Every pixel has a job.
        </p>
      </div>
    </section>
  );
}

export default Manifesto;
