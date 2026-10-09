import { useEffect, useRef, useState } from 'react';
import Icon from '../components/Icon';

const SKILL_CATEGORIES = [
  {
    title: 'Frontend',
    icon: 'code',
    gradient: 'g-bc',
    skills: [
      { name: 'HTML5', icon: 'code', level: 90 },
      { name: 'CSS3', icon: 'layout', level: 85 },
      { name: 'JavaScript', icon: 'terminal', level: 80 },
      { name: 'Bootstrap', icon: 'grid', level: 85 },
    ],
  },
  {
    title: 'Backend',
    icon: 'server',
    gradient: 'g-ge',
    skills: [
      { name: 'Node.js', icon: 'server', level: 75 },
      { name: 'Express.js', icon: 'layers', level: 70 },
    ],
  },
  {
    title: 'Programming',
    icon: 'terminal',
    gradient: 'g-pp',
    skills: [
      { name: 'C', icon: 'cpu', level: 80 },
      { name: 'C++', icon: 'code', level: 75 },
    ],
  },
  {
    title: 'Tools & Platforms',
    icon: 'tool',
    gradient: 'g-or',
    skills: [
      { name: 'Git', icon: 'git-branch', level: 80 },
      { name: 'GitHub', icon: 'github', level: 85 },
    ],
  },
  {
    title: 'AI Tools',
    icon: 'cpu',
    gradient: 'g-vi',
    skills: [
      { name: 'ChatGPT', icon: 'message-circle', level: 85 },
      { name: 'GitHub Copilot', icon: 'zap', level: 80 },
      { name: 'Claude', icon: 'cpu', level: 75 },
      { name: 'OpenCode', icon: 'terminal', level: 70 },
    ],
  },
  {
    title: 'Deployment',
    icon: 'globe',
    gradient: 'g-tc',
    skills: [
      { name: 'Netlify', icon: 'globe', level: 85 },
      { name: 'Vercel', icon: 'triangle', level: 80 },
      { name: 'Render', icon: 'upload-cloud', level: 75 },
    ],
  },
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState(SKILL_CATEGORIES[0].title);
  const [panelVisible, setPanelVisible] = useState(false);
  const [fillsActive, setFillsActive] = useState(false);
  const observedRef = useRef(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setPanelVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    if (!('IntersectionObserver' in window)) {
      observedRef.current = true;
      setFillsActive(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !observedRef.current) {
            observedRef.current = true;
            setFillsActive(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const activeCategory =
    SKILL_CATEGORIES.find((cat) => cat.title === activeTab) ||
    SKILL_CATEGORIES[0];

  const handleTabClick = (title) => {
    setActiveTab(title);
    setPanelVisible(false);
    requestAnimationFrame(() => setPanelVisible(true));
  };

  return (
    <section id="skills" className="section section-alt" ref={sectionRef}>
      <div className="site-container">
        <div className="section-head" data-reveal data-reveal-up>
          <h2 className="section-heading">
            My <span className="gradient-text">Skills</span>
          </h2>
          <div className="section-line"></div>
        </div>

        <div
          className="skill-tabs"
          id="skill-tabs"
          role="tablist"
          data-reveal
          data-reveal-up
          style={{ '--reveal-delay': '0.1s' }}
        >
          {SKILL_CATEGORIES.map((cat) => (
            <button
              key={cat.title}
              type="button"
              className={`skill-tab${cat.title === activeTab ? ' active' : ''}`}
              role="tab"
              aria-selected={cat.title === activeTab}
              data-tab={cat.title}
              onClick={() => handleTabClick(cat.title)}
            >
              <Icon name={cat.icon} className="icon-xs" />
              {cat.title}
            </button>
          ))}
        </div>

        <div
          className={`skill-panel-enter${panelVisible ? ' visible' : ''}`}
          id="skill-panel"
        >
          <div className="skill-grid" key={activeTab}>
            {activeCategory.skills.map((skill, i) => (
              <article
                className="skill-card"
                key={skill.name}
                style={{ '--card-delay': `${i * 0.06}s` }}
              >
                <span className={`skill-card-icon ${activeCategory.gradient}`}>
                  <Icon name={skill.icon} className="icon-md" />
                </span>
                <h4 className="skill-card-name">{skill.name}</h4>
                <div className="skill-card-track">
                  <div
                    className={`skill-card-fill${fillsActive ? ' active' : ''}`}
                    style={{
                      '--level': `${skill.level}%`,
                      transitionDelay: `${0.15 + i * 0.08}s`,
                    }}
                  ></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
