import Icon from './Icon';

export default function ProjectCard({ project, index = 0 }) {
  return (
    <div className="col-12 col-sm-6 col-lg-4 d-flex">
      <article
        className="project-card"
        style={{ animationDelay: `${index * 0.05}s` }}
      >
        <div className={`project-topline ${project.gradient}`}></div>
        <div className="project-body">
          <h3 className="project-title">{project.title}</h3>
          <p className="project-desc line-clamp-2">{project.desc}</p>
          <div className="tech-badges">
            {project.tech.map((tech) => (
              <span className="tech-badge" key={tech}>
                {tech}
              </span>
            ))}
          </div>
          <div className="project-links">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              <Icon name="github" className="icon-xs" /> GitHub
            </a>
            {project.live ? (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                <Icon name="external-link" className="icon-xs" /> Live Demo
              </a>
            ) : null}
          </div>
        </div>
      </article>
    </div>
  );
}
