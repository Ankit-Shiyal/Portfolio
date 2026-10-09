import { Link } from 'react-router-dom';
import Slider from '../components/Slider';
import Icon from '../components/Icon';
import ProjectCard from '../components/ProjectCard';
import { PROJECTS } from '../data/projects';

const CORE_TECH = [
  'HTML',
  'CSS',
  'JavaScript',
  'Bootstrap',
  'React.js',
  'Node.js',
  'Express.js',
  'MongoDB',
];

const SERVICES = [
  {
    icon: 'layout',
    title: 'Frontend Development',
    desc: 'Building clean, responsive interfaces with React.js, HTML, CSS, JavaScript and Bootstrap.',
  },
  {
    icon: 'server',
    title: 'Backend Development',
    desc: 'Creating REST APIs and server-side logic with Node.js, Express.js and MongoDB.',
  },
  {
    icon: 'smartphone',
    title: 'Responsive Web Design',
    desc: 'Designing layouts that look and work smoothly on mobile, tablet and desktop.',
  },
];

const FEATURED = PROJECTS.slice(0, 3);

export default function Home() {
  return (
    <>
      <Slider />

      <section className="section home-section">
        <div className="site-container">
          <div className="section-head" data-reveal data-reveal-up>
            <h2 className="section-heading">
              What <span className="gradient-text">I Do</span>
            </h2>
            <div className="section-line"></div>
            <p className="section-sub">
              I enjoy working across the full stack — building responsive,
              user-friendly interfaces on the frontend and reliable APIs on the
              backend. My main interest lies in connecting the two to create
              complete, working web applications.
            </p>
          </div>

          <div
            className="tech-highlight"
            data-reveal
            data-reveal-up
            style={{ '--reveal-delay': '0.1s' }}
          >
            {CORE_TECH.map((tech) => (
              <span className="tech-badge" key={tech}>
                {tech}
              </span>
            ))}
          </div>

          <div className="row g-4 mt-4">
            {SERVICES.map((service, idx) => (
              <div
                className="col-12 col-md-6 col-lg-4 d-flex"
                key={service.title}
                data-reveal
                data-reveal-up
                style={{ '--reveal-delay': `${0.15 + idx * 0.1}s` }}
              >
                <div className="service-card w-100">
                  <span className="service-icon">
                    <Icon name={service.icon} className="icon-md" />
                  </span>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-desc">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="home-cta">
            <Link to="/about" className="btn-outline-grad">
              More About Me
              <Icon name="arrow-right" className="icon-xs" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section home-section">
        <div className="site-container">
          <div className="section-head" data-reveal data-reveal-up>
            <h2 className="section-heading">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <div className="section-line"></div>
            <p className="section-sub">
              A few projects from my portfolio that show how I build for the
              frontend and the backend.
            </p>
          </div>

          <div className="row g-4 justify-content-center">
            {FEATURED.map((project, idx) => (
              <ProjectCard key={project.title} project={project} index={idx} />
            ))}
          </div>

          <div className="home-cta">
            <Link to="/projects" className="btn btn-hire">
              View All Projects
              <Icon name="arrow-right" className="icon-xs" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
