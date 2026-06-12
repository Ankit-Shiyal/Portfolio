import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiCode, FiServer, FiTool } from 'react-icons/fi';

const highlights = [
  { icon: FiCode, title: 'Frontend', desc: 'React, HTML, CSS, JS, Bootstrap' },
  { icon: FiServer, title: 'Backend', desc: 'Node.js, Express.js, MongoDB' },
  { icon: FiTool, title: 'Tools', desc: 'Git, GitHub, VS Code, Netlify' },
];

const timeline = [
  { year: '2022-2025', title: 'Diploma in IT', org: 'Government Polytechnic Rajkot', desc: 'CGPA: 7.14' },
  { year: '2024-2025', title: 'Full Stack Training', org: 'Red & White Multimedia Education', desc: 'Web Development' },
];

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" className="py-20 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent dark:via-primary/[0.02]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Who I Am</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              I'm a passionate Full Stack Web Developer currently pursuing my Diploma in Information Technology at Government Polytechnic Rajkot. With a strong foundation in both frontend and backend technologies, I strive to build web applications that are not only visually appealing but also highly functional and user-friendly.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
              My journey in web development started with curiosity and has grown into a full-fledged passion. I enjoy turning complex problems into simple, beautiful, and intuitive solutions. When I'm not coding, you'll find me exploring new technologies or contributing to open-source projects.
            </p>

            <div className="grid sm:grid-cols-3 gap-4">
              {highlights.map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                  className="p-4 rounded-2xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300 group"
                >
                  <item.icon className="w-6 h-6 text-primary mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{item.title}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }}>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Experience Timeline</h3>
            <div className="space-y-6">
              {timeline.map((item, idx) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + idx * 0.15 }}
                  className="relative pl-8 before:absolute before:left-3 before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-primary before:to-secondary before:rounded-full"
                >
                  <div className="absolute left-1.5 top-1 w-4 h-4 rounded-full bg-primary border-2 border-white dark:border-dark-card" />
                  <span className="text-xs font-mono text-primary font-semibold">{item.year}</span>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mt-1">{item.title}</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{item.org}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/[0.08] dark:to-secondary/[0.08] border border-primary/20 dark:border-primary/20"
            >
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Career Objective</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                To leverage my skills in full stack web development to build innovative and scalable web applications, while continuously learning and growing as a developer in a challenging and collaborative environment.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
