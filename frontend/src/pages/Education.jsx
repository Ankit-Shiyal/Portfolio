import Icon from '../components/Icon';

export default function Education() {
  return (
    <section id="education" className="section section-alt">
      <div className="edu-overlay"></div>
      <div className="site-container position-relative">
        <div className="section-head" data-reveal data-reveal-up>
          <h2 className="section-heading">
            Education &amp; <span className="gradient-text">Training</span>
          </h2>
          <div className="section-line"></div>
        </div>

        <div className="edu-wrapper">
          <div className="edu-timeline">
            <div className="edu-item" data-reveal data-reveal-left>
              <div className="edu-icon g-ps">
                <Icon name="book" className="icon-md" />
              </div>
              <div className="edu-card">
                <span className="edu-period">2022 - 2025</span>
                <h3 className="edu-title">Diploma in Information Technology</h3>
                <p className="edu-org">Government Polytechnic Rajkot</p>
                <ul className="edu-list">
                  <li className="edu-detail">
                    <span className="edu-dot"></span>CGPA: 7.14
                  </li>
                  <li className="edu-detail">
                    <span className="edu-dot"></span>Focused on software
                    development and web technologies
                  </li>
                  <li className="edu-detail">
                    <span className="edu-dot"></span>Participated in technical
                    workshops and hackathons
                  </li>
                </ul>
              </div>
            </div>

            <div
              className="edu-item"
              data-reveal
              data-reveal-left
              style={{ '--reveal-delay': '0.2s' }}
            >
              <div className="edu-icon g-sp">
                <Icon name="award" className="icon-md" />
              </div>
              <div className="edu-card">
                <span className="edu-period">2025 - 2026</span>
                <h3 className="edu-title">Full Stack Web Development</h3>
                <p className="edu-org">Red &amp; White Multimedia Education</p>
                <ul className="edu-list">
                  <li className="edu-detail">
                    <span className="edu-dot"></span>Comprehensive full stack
                    development training
                  </li>
                  <li className="edu-detail">
                    <span className="edu-dot"></span>Hands-on projects with
                    modern tech stack
                  </li>
                  <li className="edu-detail">
                    <span className="edu-dot"></span>Industry-oriented
                    curriculum
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
