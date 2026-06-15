import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiCode, FiServer, FiTerminal, FiTool, FiCpu, FiGlobe } from 'react-icons/fi';

const skillCategories = [
  {
    title: 'Frontend', icon: FiCode, color: 'from-blue-500 to-cyan-500',
    skills: [
      { name: 'HTML5', level: 90 },
      { name: 'CSS3', level: 85 },
      { name: 'JavaScript', level: 80 },
      { name: 'Bootstrap', level: 85 },
    ],
  },
  {
    title: 'Backend', icon: FiServer, color: 'from-green-500 to-emerald-500',
    skills: [
      { name: 'Node.js', level: 75 },
      { name: 'Express.js', level: 70 },
    ],
  },
  {
    title: 'Programming', icon: FiTerminal, color: 'from-purple-500 to-pink-500',
    skills: [
      { name: 'C', level: 80 },
      { name: 'C++', level: 75 },
    ],
  },
  {
    title: 'Tools & Platforms', icon: FiTool, color: 'from-orange-500 to-red-500',
    skills: [
      { name: 'Git', level: 80 },
      { name: 'GitHub', level: 85 },
    ],
  },
  {
    title: 'AI Tools', icon: FiCpu, color: 'from-violet-500 to-indigo-500',
    skills: [
      { name: 'ChatGPT', level: 85 },
      { name: 'GitHub Copilot', level: 80 },
      { name: 'Claude', level: 75 },
    ],
  },
  {
    title: 'Deployment', icon: FiGlobe, color: 'from-teal-500 to-cyan-500',
    skills: [
      { name: 'Netlify', level: 85 },
      { name: 'Vercel', level: 80 },
      { name: 'StackBlitz', level: 70 },
      { name: 'CodePen', level: 75 },
    ],
  },
];

function CircularProgress({ level, label, inView, delay }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (level / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center gap-2"
    >
      <div className="relative w-20 h-20 sm:w-24 sm:h-24">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r={radius} fill="none" stroke="currentColor" strokeWidth="5" className="text-gray-200 dark:text-dark-border" />
          <motion.circle
            cx="40" cy="40" r={radius} fill="none" strokeWidth="5"
            strokeLinecap="round"
            stroke="url(#gradient)"
            initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
            animate={inView ? { strokeDashoffset: offset } : {}}
            transition={{ duration: 1.5, delay: delay + 0.3, ease: 'easeOut' }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.3, delay: delay + 1.5 }}
            className="text-sm font-bold text-gray-900 dark:text-white"
          >
            {level}%
          </motion.span>
        </div>
      </div>
      <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{label}</span>
    </motion.div>
  );
}

function SkillBar({ name, level, inView, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay }}
      className="space-y-1.5"
    >
      <div className="flex justify-between text-sm">
        <span className="font-medium text-gray-700 dark:text-gray-300">{name}</span>
        <span className="text-primary font-mono font-semibold">{level}%</span>
      </div>
      <div className="h-2.5 bg-gray-200 dark:bg-dark-border rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, delay: delay + 0.2, ease: 'easeOut' }}
          className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeTab, setActiveTab] = useState(skillCategories[0].title);

  const activeCategory = skillCategories.find((cat) => cat.title === activeTab);

  return (
    <section id="skills" className="py-20 lg:py-32 bg-gray-50/50 dark:bg-dark/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            My <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto" />
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {skillCategories.map((cat) => (
            <motion.button
              key={cat.title}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.2 }}
              onClick={() => setActiveTab(cat.title)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === cat.title
                  ? 'bg-primary text-white shadow-lg shadow-primary/25'
                  : 'bg-white dark:bg-dark-card text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-border hover:border-primary/50'
              }`}
            >
              <cat.icon className="w-4 h-4" />
              {cat.title}
            </motion.button>
          ))}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid lg:grid-cols-2 gap-8"
        >
          <div className="bg-white dark:bg-dark-card rounded-2xl p-6 sm:p-8 border border-gray-100 dark:border-dark-border shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <span className={`p-2 rounded-lg bg-gradient-to-br ${activeCategory.color} text-white`}>
                <activeCategory.icon className="w-5 h-5" />
              </span>
              {activeCategory.title}
            </h3>
            <div className="space-y-5">
              {activeCategory.skills.map((skill, idx) => (
                <SkillBar key={skill.name} {...skill} inView={inView} delay={0.2 + idx * 0.1} />
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-dark-card rounded-2xl p-6 sm:p-8 border border-gray-100 dark:border-dark-border shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Overview</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {activeCategory.skills.map((skill, idx) => (
                <CircularProgress key={skill.name} {...skill} inView={inView} delay={0.3 + idx * 0.1} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
