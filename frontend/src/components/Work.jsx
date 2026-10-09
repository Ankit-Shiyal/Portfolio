import { useMemo, useState } from 'react';
import Icon from './Icon';
import ProjectCard from './ProjectCard';
import { PROJECTS, PROJECT_CATEGORIES } from '../data/projects';

export default function Work() {
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return PROJECTS.filter((project) => {
      const matchCategory =
        category === 'all' || project.category === category;
      const matchSearch =
        query === '' ||
        project.title.toLowerCase().includes(query) ||
        project.tech.some((tech) => tech.toLowerCase().includes(query)) ||
        project.category.toLowerCase().includes(query);
      return matchCategory && matchSearch;
    });
  }, [category, search]);

  let emptyMessage = '';
  if (filtered.length === 0) {
    const query = search.trim().toLowerCase();
    const catName = category === 'all' ? '' : category;
    if (query !== '' && catName !== '') {
      emptyMessage = `No ${catName} projects found matching your search.`;
    } else if (query !== '') {
      emptyMessage = 'No projects found matching your search.';
    } else if (catName !== '') {
      emptyMessage = `No ${catName} projects available.`;
    } else {
      emptyMessage = 'No projects available.';
    }
  }

  return (
    <section id="projects" className="section">
      <div className="site-container">
        <div
          className="section-head section-head-projects"
          data-reveal
          data-reveal-up
        >
          <h2 className="section-heading">
            <span className="gradient-text">Projects</span>
          </h2>
          <div className="section-line"></div>
        </div>

        <div
          className="project-toolbar"
          data-reveal
          data-reveal-up
          style={{ '--reveal-delay': '0.1s' }}
        >
          <div className="filter-btns" id="filter-btns">
            {PROJECT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`filter-btn${cat === category ? ' active' : ''}`}
                data-cat={cat}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="search-wrap">
            <Icon name="search" className="icon-xs search-icon" />
            <input
              type="text"
              id="search-input"
              className="form-control search-input"
              placeholder="Search projects..."
              autoComplete="off"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </div>

        <div className="row g-4 justify-content-center" id="projects-grid">
          {filtered.map((project, idx) => (
            <ProjectCard key={project.title} project={project} index={idx} />
          ))}
        </div>
        <div id="projects-empty">
          {filtered.length === 0 ? (
            <p className="empty-text">{emptyMessage}</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
