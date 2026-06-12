import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-gray-100 dark:border-dark-border bg-white dark:bg-dark-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center md:text-left">
            <a href="#home" className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {'<AS />'}
            </a>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              &copy; {year} Ankit Shiyal. All rights reserved.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"
          >
            <span>Made with</span>
            <FiHeart className="w-4 h-4 text-red-500" />
            <span>by Ankit Shiyal</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex gap-3"
          >
            <a href="https://github.com/Ankit-Shiyal" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-gray-100 dark:bg-dark text-gray-600 dark:text-gray-400 hover:bg-primary hover:text-white dark:hover:bg-primary transition-all duration-300">
              <FiGithub className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com/in/ankit-shiyal-740734307" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-gray-100 dark:bg-dark text-gray-600 dark:text-gray-400 hover:bg-primary hover:text-white dark:hover:bg-primary transition-all duration-300">
              <FiLinkedin className="w-4 h-4" />
            </a>
            <a href="mailto:ankitshiyal2005@gmail.com" className="p-2.5 rounded-xl bg-gray-100 dark:bg-dark text-gray-600 dark:text-gray-400 hover:bg-primary hover:text-white dark:hover:bg-primary transition-all duration-300">
              <FiMail className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
