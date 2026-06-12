import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiGithub, FiExternalLink, FiSearch } from 'react-icons/fi';

const projects = [
  {
    title: 'E-Commerce Platform',
    desc: 'Full-stack e-commerce solution with product management, cart functionality, and payment integration.',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    category: 'fullstack',
    github: 'https://github.com/Ankit-Shiyal',
    live: 'https://ankit-shiyal.vercel.app',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Task Management App',
    desc: 'Collaborative task management tool with real-time updates, drag-and-drop, and team features.',
    tech: ['React', 'Express.js', 'Socket.io', 'Tailwind'],
    category: 'fullstack',
    github: 'https://github.com/Ankit-Shiyal',
    live: 'https://ankit-shiyal.vercel.app',
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Weather Dashboard',
    desc: 'Real-time weather dashboard with 7-day forecast, interactive maps, and location-based updates.',
    tech: ['JavaScript', 'API', 'CSS3', 'HTML5'],
    category: 'frontend',
    github: 'https://github.com/Ankit-Shiyal',
    live: 'https://ankit-shiyal.vercel.app',
    color: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Chat Application',
    desc: 'Real-time messaging app with private chats, group conversations, and media sharing capabilities.',
    tech: ['Node.js', 'Socket.io', 'Express.js', 'MongoDB'],
    category: 'backend',
    github: 'https://github.com/Ankit-Shiyal',
    live: 'https://ankit-shiyal.vercel.app',
    color: 'from-orange-500 to-red-500',
  },
  {
    title: 'Portfolio Website',
    desc: 'Modern personal portfolio showcasing skills, projects, and professional experience with dark mode.',
    tech: ['React', 'Tailwind', 'Framer Motion'],
    category: 'frontend',
    github: 'https://github.com/Ankit-Shiyal',
    live: 'https://ankit-shiyal.vercel.app',
    color: 'from-violet-500 to-indigo-500',
  },
  {
    title: 'REST API Service',
    desc: 'RESTful API service with authentication, rate limiting, and comprehensive documentation.',
    tech: ['Node.js', 'Express.js', 'JWT', 'MongoDB'],
    category: 'backend',
    github: 'https://github.com/Ankit-Shiyal',
    live: 'https://ankit-shiyal.vercel.app',
    color: 'from-teal-500 to-cyan-500',
  },
];

const categories = ['all', 'frontend', 'backend', 'fullstack'];

export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = projects.filter((p) => {
    const matchCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.tech.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchCategory && matchSearch;
  });

  return (
    <section id="projects" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Featured <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-8" />
        </motion.div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex gap-2">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3 }}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-primary text-white shadow-lg shadow-primary/25'
                    : 'bg-gray-100 dark:bg-dark-card text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-border'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
        </div>

        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, idx) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group relative bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border overflow-hidden hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className={`h-2 bg-gradient-to-r ${project.color}`} />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{project.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((t) => (
                      <span key={t} className="px-2.5 py-1 text-xs font-medium bg-primary/10 dark:bg-primary/20 text-primary rounded-lg">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                      <FiGithub className="w-4 h-4" /> Code
                    </a>
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                      <FiExternalLink className="w-4 h-4" /> Live Demo
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No projects found matching your search.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
