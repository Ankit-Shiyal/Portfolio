import { useEffect, useState } from 'react';
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

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const desktopLinkClass = ({ isActive }) =>
    `nav-link-custom${isActive ? ' active' : ''}`;
  const mobileLinkClass = ({ isActive }) =>
    `nav-link-mobile${isActive ? ' active' : ''}`;

  return (
    <header>
      <nav
        id="site-nav"
        className={`navbar-portfolio${scrolled ? ' scrolled' : ''}${
          open ? ' open' : ''
        }`}
        aria-label="Main navigation"
      >
        <div className="site-container">
          <div className="navbar-inner">
            <Link to="/" className="nav-logo gradient-text">
              {'<AS />'}
            </Link>

            <div className="nav-desktop">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={desktopLinkClass}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            <button
              type="button"
              className="nav-toggle"
              id="nav-toggle"
              aria-label="Toggle menu"
              aria-expanded={String(open)}
              aria-controls="nav-mobile"
              onClick={() => setOpen((prev) => !prev)}
            >
              <Icon name="menu" className="icon-sm icon-menu" />
              <Icon name="x" className="icon-sm icon-close" />
            </button>
          </div>
        </div>

        <div className="nav-mobile" id="nav-mobile">
          <div className="nav-mobile-inner">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={mobileLinkClass}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
