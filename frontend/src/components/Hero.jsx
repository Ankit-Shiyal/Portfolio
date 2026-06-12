import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiDownload, HiMail } from 'react-icons/hi';
import { FiGithub, FiLinkedin, FiMapPin, FiChevronDown } from 'react-icons/fi';

const titles = ['Full Stack Web Developer', 'MERN Stack Developer', 'UI/UX Enthusiast', 'Problem Solver'];

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    const currentTitle = titles[titleIndex];
    let timeout;

    if (!isDeleting && charIndex < currentTitle.length) {
      timeout = setTimeout(() => {
        setDisplayText(currentTitle.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 80);
    } else if (!isDeleting && charIndex === currentTitle.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayText(currentTitle.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, 40);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, titleIndex]);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/10 dark:to-secondary/10" />
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 dark:bg-primary/10 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 dark:bg-secondary/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: '-3s' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 text-center lg:text-left">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-primary font-mono text-sm sm:text-base mb-4"
            >
              Hi, my name is
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Ankit Shiyal
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-600 dark:text-gray-400 mb-2 h-10"
            >
              <span>{displayText}</span>
              <span className="inline-block w-0.5 h-6 sm:h-7 lg:h-8 bg-primary ml-1 animate-pulse" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center lg:justify-start gap-2 text-gray-500 dark:text-gray-400 mb-6"
            >
              <FiMapPin className="w-4 h-4" />
              Bhavnagar, Gujarat, India
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-gray-600 dark:text-gray-400 max-w-xl mb-8 text-base sm:text-lg leading-relaxed"
            >
              Aspiring Full Stack Web Developer passionate about building responsive web applications and solving real-world problems with modern technologies.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <a
                href="/resume/Ankit_Shiyal_Resume.pdf"
                download
                className="group inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-xl transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5"
              >
                <HiDownload className="w-5 h-5 group-hover:animate-bounce" />
                Download Resume
              </a>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white font-medium rounded-xl transition-all duration-300"
              >
                <HiMail className="w-5 h-5" />
                Hire Me
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex gap-4 mt-8 justify-center lg:justify-start"
            >
              <a href="https://github.com/Ankit-Shiyal" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-100 dark:bg-dark-card text-gray-600 dark:text-gray-300 rounded-xl hover:bg-primary hover:text-white dark:hover:bg-primary transition-all duration-300">
                <FiGithub className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/in/ankit-shiyal-740734307" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-100 dark:bg-dark-card text-gray-600 dark:text-gray-300 rounded-xl hover:bg-primary hover:text-white dark:hover:bg-primary transition-all duration-300">
                <FiLinkedin className="w-5 h-5" />
              </a>
              <a href="mailto:ankitshiyal2005@gmail.com" className="p-3 bg-gray-100 dark:bg-dark-card text-gray-600 dark:text-gray-300 rounded-xl hover:bg-primary hover:text-white dark:hover:bg-primary transition-all duration-300">
                <HiMail className="w-5 h-5" />
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex-shrink-0"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full blur-3xl opacity-30 animate-pulse" />
              <div className="relative w-full h-full rounded-full border-2 border-gray-200 dark:border-dark-border overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 flex items-center justify-center">
                <img
                  src="/my-photo.png"
                  alt="Ankit Shiyal"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <FiChevronDown className="w-6 h-6 text-gray-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
