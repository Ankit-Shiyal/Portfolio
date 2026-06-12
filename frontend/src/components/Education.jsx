import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiBook, FiAward } from 'react-icons/fi';

const educationData = [
  {
    type: 'education',
    icon: FiBook,
    title: 'Diploma in Information Technology',
    org: 'Government Polytechnic Rajkot',
    period: '2022 - 2025',
    details: ['CGPA: 7.14', 'Focused on software development and web technologies', 'Participated in technical workshops and hackathons'],
    color: 'from-primary to-secondary',
  },
  {
    type: 'training',
    icon: FiAward,
    title: 'Full Stack Web Development',
    org: 'Red & White Multimedia Education',
    period: '2024 - 2025',
    details: ['Comprehensive full stack development training', 'Hands-on projects with modern tech stack', 'Industry-oriented curriculum'],
    color: 'from-secondary to-primary',
  },
];

export default function Education() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="education" className="py-20 lg:py-32 bg-gray-50/50 dark:bg-dark/50 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent dark:via-secondary/[0.02]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Education & <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Training</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto" />
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary dark:opacity-30" />

            <div className="space-y-12">
              {educationData.map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: idx * 0.2 }}
                  className="relative pl-20"
                >
                  <div className={`absolute left-4 p-2.5 rounded-xl bg-gradient-to-br ${item.color} text-white shadow-lg`}>
                    <item.icon className="w-5 h-5" />
                  </div>

                  <div className="bg-white dark:bg-dark-card rounded-2xl p-6 sm:p-8 border border-gray-100 dark:border-dark-border hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-300">
                    <span className="inline-block px-3 py-1 text-xs font-mono font-semibold text-primary bg-primary/10 dark:bg-primary/20 rounded-lg mb-3">
                      {item.period}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{item.title}</h3>
                    <p className="text-primary font-medium mb-4">{item.org}</p>
                    <ul className="space-y-2">
                      {item.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-gray-400 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
