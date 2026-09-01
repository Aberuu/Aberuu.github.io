import { SOCIALS } from '../../data/content';

function Footer() {
  return (
    <footer id="contact" className="site-footer">
      <div className="footer-sweep" aria-hidden="true" />
      <div className="footer-character" aria-hidden="true">
        <span />
        <span />
      </div>
      <div className="footer-shell">
        <p className="chapter-kicker reveal-item">
          <span>Contact</span>
          <span>Open Studio</span>
        </p>
        <h2 className="footer-headline reveal-item">
          Bring me a rough idea.<br />I will give it a pulse.
        </h2>
        <nav className="footer-links reveal-item" aria-label="Social links">
          {SOCIALS.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          ))}
        </nav>
        <p className="footer-copy">&copy; {new Date().getFullYear()} Agaphe Abel</p>
      </div>
    </footer>
  );
}

export default Footer;
