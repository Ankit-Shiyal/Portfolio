import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import myPhoto from '../assets/images/my-photo.png';

const TITLES = ['Full Stack Web Developer', 'MERN Stack Developer'];

export default function Slider() {
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timer = null;

    const tick = () => {
      const currentTitle = TITLES[titleIndex];

      if (!isDeleting && charIndex < currentTitle.length) {
        charIndex += 1;
        setTypedText(currentTitle.slice(0, charIndex));
        timer = setTimeout(tick, 80);
      } else if (!isDeleting && charIndex === currentTitle.length) {
        isDeleting = true;
        timer = setTimeout(tick, 2000);
      } else if (isDeleting && charIndex > 0) {
        charIndex -= 1;
        setTypedText(currentTitle.slice(0, charIndex));
        timer = setTimeout(tick, 40);
      } else {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % TITLES.length;
        timer = setTimeout(tick, 200);
      }
    };

    tick();

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="hero">
      <div className="hero-bg"></div>
      <div className="hero-blob hero-blob-1"></div>
      <div className="hero-blob hero-blob-2"></div>

      <div className="site-container hero-content">
        <div className="hero-text">
          <p className="hero-eyebrow anim-item" style={{ animationDelay: '0.1s' }}>
            Hi, my name is
          </p>

          <h1 className="hero-name anim-item" style={{ animationDelay: '0.2s' }}>
            Ankit Shiyal
          </h1>

          <div className="hero-typing anim-item" style={{ animationDelay: '0.3s' }}>
            <span id="typed-text">{typedText}</span>
            <span className="typing-cursor"></span>
          </div>

          <p className="hero-location anim-item" style={{ animationDelay: '0.4s' }}>
            <Icon name="map-pin" className="icon-sm" /> Bhavnagar, Gujarat, India
          </p>

          <p className="hero-desc anim-item" style={{ animationDelay: '0.5s' }}>
            I build responsive, user-friendly web applications from front to
            back — turning ideas into clean interfaces and reliable,
            well-structured code.
          </p>

          <div className="hero-actions anim-item" style={{ animationDelay: '0.6s' }}>
            <a
              href="/resume/Ankit_Shiyal_Resume.pdf"
              download
              className="btn btn-resume"
            >
              <Icon name="download" className="icon-sm icon-bounce" />
              Download Resume
            </a>
            <Link to="/contact" className="btn btn-hire">
              <Icon name="mail" className="icon-sm" />
              Hire Me
            </Link>
          </div>

          <div className="hero-social anim-item" style={{ animationDelay: '0.8s' }}>
            <a
              href="https://github.com/Ankit-Shiyal"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              aria-label="GitHub"
            >
              <Icon name="github" className="icon-sm" />
            </a>
            <a
              href="https://linkedin.com/in/ankit-shiyal-740734307"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              aria-label="LinkedIn"
            >
              <Icon name="linkedin" className="icon-sm" />
            </a>
            <a
              href="mailto:ankitshiyal2005@gmail.com"
              className="social-btn"
              aria-label="Email"
            >
              <Icon name="mail" className="icon-sm" />
            </a>
          </div>
        </div>

        <div className="hero-photo anim-photo" style={{ animationDelay: '0.3s' }}>
          <div className="hero-photo-glow"></div>
          <div className="hero-photo-inner">
            <img src={myPhoto} alt="Ankit Shiyal" loading="lazy" />
          </div>
        </div>
      </div>

      <div className="hero-scroll anim-fade" style={{ animationDelay: '1.5s' }}>
        <div className="hero-scroll-inner">
          <Icon name="chevron-down" className="icon-md" />
        </div>
      </div>
    </section>
  );
}
