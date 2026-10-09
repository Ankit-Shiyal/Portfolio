import { Link, NavLink } from 'react-router-dom';
import Icon from './Icon';

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/skills', label: 'Skills' },
  { to: '/projects', label: 'Projects' },
  { to: '/education', label: 'Education' },
  { to: '/contact', label: 'Contact' },
];

const SERVICES = [
  'Frontend Development',
  'Backend Development',
  'Responsive Web Design',
  'Web Application Development',
];

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="site-container">
        <div className="footer-grid">
          <div className="footer-col">
            <Link
              to="/"
              className="footer-logo gradient-text"
              aria-label="Ankit Shiyal - Home"
            >
              {'<AS />'}
            </Link>
            <h3 className="footer-name">Ankit Shiyal</h3>
            <p className="footer-desc">
              Full Stack Web Developer passionate about building responsive and
              user-friendly web applications.
            </p>
            <div className="footer-social">
              <a
                href="https://github.com/Ankit-Shiyal"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Icon name="github" className="icon-sm" />
              </a>
              <a
                href="https://linkedin.com/in/ankit-shiyal-740734307"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Icon name="linkedin" className="icon-sm" />
              </a>
              <a href="mailto:ankitshiyal2005@gmail.com" aria-label="Email">
                <Icon name="mail" className="icon-sm" />
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-list">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.end}
                    className={({ isActive }) =>
                      `footer-link${isActive ? ' active' : ''}`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">What I Do</h4>
            <ul className="footer-list">
              {SERVICES.map((service) => (
                <li key={service}>
                  <span className="footer-label">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Contact</h4>
            <ul className="footer-info">
              <li>
                <Icon name="map-pin" className="icon-sm" />
                <span>Bhavnagar, Gujarat, India</span>
              </li>
              <li>
                <Icon name="mail" className="icon-sm" />
                <a href="mailto:ankitshiyal2005@gmail.com">
                  ankitshiyal2005@gmail.com
                </a>
              </li>
            </ul>
            <Link to="/contact" className="footer-contact-btn">
              Contact Me
              <Icon name="arrow-right" className="icon-xs" />
            </Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            &copy; {year} Ankit Shiyal. All rights reserved.
          </p>
          <button type="button" className="footer-top-btn" onClick={scrollToTop}>
            Back to Top
            <Icon name="arrow-up" className="icon-xs" />
          </button>
        </div>
      </div>
    </footer>
  );
}
