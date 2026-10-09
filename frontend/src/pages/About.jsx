import Icon from '../components/Icon';

const TECH_GROUPS = [
  {
    icon: 'layout',
    title: 'Frontend',
    items: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'React.js'],
  },
  {
    icon: 'server',
    title: 'Backend',
    items: ['Node.js', 'Express.js', 'REST APIs'],
  },
  {
    icon: 'database',
    title: 'Database',
    items: ['MongoDB', 'Mongoose'],
  },
  {
    icon: 'tool',
    title: 'Tools & Deployment',
    items: ['Git', 'GitHub', 'VS Code', 'Vercel', 'Netlify'],
  },
];

const APPROACH = [
  {
    icon: 'code',
    title: 'Clean Code',
    desc: 'I aim for readable, well-structured code that is easy to maintain and extend.',
  },
  {
    icon: 'smartphone',
    title: 'Responsive Design',
    desc: 'Every layout is built to work smoothly across mobile, tablet and desktop.',
  },
  {
    icon: 'zap',
    title: 'Problem Solving',
    desc: 'I break problems into smaller parts and work through them step by step.',
  },
  {
    icon: 'book-open',
    title: 'Continuous Learning',
    desc: 'I keep practising new tools and concepts to steadily grow my full-stack skills.',
  },
];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="about-overlay"></div>
      <div className="site-container position-relative">
        <div className="section-head" data-reveal data-reveal-up>
          <h2 className="section-heading">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="section-line"></div>
        </div>

        <div className="row g-gap-5">
          <div
            className="col-12 col-lg-6"
            data-reveal
            data-reveal-left
            style={{ '--reveal-delay': '0.2s' }}
          >
            <h3 className="block-title">Who I Am</h3>
            <p className="block-text">
              I am a Full Stack Web Developer with a completed Diploma in
              Information Technology. My interest in web development started
              with curiosity about how websites work and grew into a passion for
              building complete applications — from the first line of markup to
              the database behind it.
            </p>
            <p className="block-text">
              I enjoy working across both the frontend and the backend: creating
              clean, responsive interfaces and connecting them to reliable
              server-side logic. I focus on writing code that is readable,
              maintainable, and genuinely useful to the people who use it, and I
              am always looking to improve my full-stack skills.
            </p>
          </div>

          <div
            className="col-12 col-lg-6"
            data-reveal
            data-reveal-right
            style={{ '--reveal-delay': '0.3s' }}
          >
            <h3 className="block-title mb-4">Education &amp; Learning</h3>

            <div className="timeline">
              <div
                className="timeline-item"
                data-reveal
                data-reveal-x
                style={{ '--reveal-delay': '0.4s' }}
              >
                <div className="timeline-dot"></div>
                <span className="timeline-year">2022-2025</span>
                <h4 className="timeline-title">Diploma in IT</h4>
                <p className="timeline-org">Government Polytechnic Rajkot</p>
                <p className="timeline-desc">CGPA: 7.14</p>
              </div>
              <div
                className="timeline-item"
                data-reveal
                data-reveal-x
                style={{ '--reveal-delay': '0.55s' }}
              >
                <div className="timeline-dot"></div>
                <span className="timeline-year">2024-2025</span>
                <h4 className="timeline-title">Full Stack Training</h4>
                <p className="timeline-org">
                  Red &amp; White Multimedia Education
                </p>
                <p className="timeline-desc">Web Development</p>
              </div>
            </div>

            <div
              className="objective-card"
              data-reveal
              data-reveal-up
              style={{ '--reveal-delay': '0.7s' }}
            >
              <h4 className="objective-title">Career Objective</h4>
              <p className="objective-text">
                To build responsive, user-friendly, and maintainable web
                applications while continuing to develop my full-stack skills
                and contribute to a collaborative development team.
              </p>
            </div>
          </div>
        </div>

        <div className="section-head about-subhead" data-reveal data-reveal-up>
          <h3 className="section-heading about-subheading">
            Technical <span className="gradient-text">Background</span>
          </h3>
          <div className="section-line"></div>
        </div>

        <div className="row g-4">
          {TECH_GROUPS.map((group, idx) => (
            <div
              className="col-12 col-sm-6 col-lg-3 d-flex"
              key={group.title}
              data-reveal
              data-reveal-up
              style={{ '--reveal-delay': `${0.1 + idx * 0.1}s` }}
            >
              <div className="tech-group w-100">
                <div className="tech-group-head">
                  <Icon name={group.icon} className="icon-md tech-group-icon" />
                  <h4 className="tech-group-title">{group.title}</h4>
                </div>
                <ul className="tech-group-list">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="section-head about-subhead" data-reveal data-reveal-up>
          <h3 className="section-heading about-subheading">
            My <span className="gradient-text">Approach</span>
          </h3>
          <div className="section-line"></div>
        </div>

        <div className="row g-4">
          {APPROACH.map((item, idx) => (
            <div
              className="col-12 col-sm-6 col-lg-3 d-flex"
              key={item.title}
              data-reveal
              data-reveal-up
              style={{ '--reveal-delay': `${0.1 + idx * 0.1}s` }}
            >
              <div className="approach-card w-100">
                <Icon name={item.icon} className="icon-md approach-icon" />
                <h4 className="approach-title">{item.title}</h4>
                <p className="approach-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
