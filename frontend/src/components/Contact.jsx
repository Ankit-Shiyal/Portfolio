import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiSend, FiMail, FiMapPin, FiPhone, FiCheckCircle, FiAlertCircle, FiX } from 'react-icons/fi';
import axios from 'axios';

const initialForm = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
    if (type === 'success') {
      setTimeout(() => setToast(null), 5000);
    }
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim() || form.name.trim().length < 2) errs.name = 'Name must be at least 2 characters';
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Please enter a valid email';
    if (!form.subject.trim() || form.subject.trim().length < 3) errs.subject = 'Subject must be at least 3 characters';
    if (!form.message.trim() || form.message.trim().length < 10) errs.message = 'Message must be at least 10 characters';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    setToast(null);

    console.log('📤 Submitting contact form...');
    console.log('   Payload:', { ...form });

    try {
      const res = await axios.post('/api/contact', form, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 15000,
      });

      console.log('✅ Server response:', res.data);
      showToast('success', res.data.message || 'Message sent successfully!');
      setForm(initialForm);

    } catch (err) {
      console.error('❌ Request failed:');

      if (err.code === 'ECONNABORTED') {
        console.error('   Reason: Request timeout');
        showToast('error', 'Request timed out. Please try again.');
      } else if (err.response) {
        console.error('   Status:', err.response.status);
        console.error('   Data:', JSON.stringify(err.response.data, null, 2));
        console.error('   Headers:', JSON.stringify(err.response.headers, null, 2));

        const data = err.response.data;
        if (data?.errors) {
          setErrors(data.errors);
          showToast('error', 'Please fix the highlighted fields.');
        } else {
          showToast('error', data?.message || data?.debug || 'Server error. Please try again.');
        }
      } else if (err.request) {
        console.error('   Reason: No response received');
        console.error('   Request:', err.request);
        showToast('error', 'Cannot connect to server. Make sure the backend is running.');
      } else {
        console.error('   Reason:', err.message);
        showToast('error', 'An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    { icon: FiMail, label: 'Email', value: 'ankitshiyal2005@gmail.com', href: 'mailto:ankitshiyal2005@gmail.com' },
    { icon: FiPhone, label: 'Phone', value: '+91 9624908290', href: 'tel:+919624908290' },
    { icon: FiMapPin, label: 'Location', value: 'Bhavnagar, Gujarat, India' },
  ];

  return (
    <section id="contact" className="py-20 lg:py-32 relative">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -50, x: '-50%' }}
            className={`fixed top-24 left-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border ${
              toast.type === 'success'
                ? 'bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800'
                : 'bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800'
            }`}
          >
            {toast.type === 'success'
              ? <FiCheckCircle className="w-5 h-5 flex-shrink-0" />
              : <FiAlertCircle className="w-5 h-5 flex-shrink-0" />
            }
            <span className="text-sm font-medium">{toast.message}</span>
            <button onClick={() => setToast(null)} className="ml-2 p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg transition-colors">
              <FiX className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Get In <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Have a project in mind or just want to say hi? I'd love to hear from you.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mt-4" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {contactInfo.map((info, idx) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border hover:border-primary/30 transition-all duration-300"
              >
                <div className="p-3 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary">
                  <info.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{info.label}</p>
                  {info.href ? (
                    <a href={info.href} className="font-medium text-gray-900 dark:text-white hover:text-primary transition-colors">
                      {info.value}
                    </a>
                  ) : (
                    <p className="font-medium text-gray-900 dark:text-white">{info.value}</p>
                  )}
                </div>
              </motion.div>
            ))}

            <div className="p-5 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/[0.08] dark:to-secondary/[0.08] border border-primary/20">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Available for</h4>
              <div className="flex flex-wrap gap-2">
                {['Freelance', 'Full-time', 'Remote', 'Internship'].map((item) => (
                  <span key={item} className="px-3 py-1 text-xs font-medium bg-white dark:bg-dark-card text-primary rounded-lg border border-primary/20">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 bg-white dark:bg-dark-card rounded-2xl p-6 sm:p-8 border border-gray-100 dark:border-dark-border shadow-sm"
          >
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Name *</label>
                <input
                  type="text" name="name" value={form.name} onChange={handleChange}
                  disabled={loading}
                  className={`w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark border text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 transition-all disabled:opacity-60 ${
                    errors.name ? 'border-red-400 focus:ring-red-400/50' : 'border-gray-200 dark:border-dark-border focus:ring-primary/50'
                  }`}
                  placeholder="Your name"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email *</label>
                <input
                  type="email" name="email" value={form.email} onChange={handleChange}
                  disabled={loading}
                  className={`w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark border text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 transition-all disabled:opacity-60 ${
                    errors.email ? 'border-red-400 focus:ring-red-400/50' : 'border-gray-200 dark:border-dark-border focus:ring-primary/50'
                  }`}
                  placeholder="your@email.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Subject *</label>
              <input
                type="text" name="subject" value={form.subject} onChange={handleChange}
                disabled={loading}
                className={`w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark border text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 transition-all disabled:opacity-60 ${
                  errors.subject ? 'border-red-400 focus:ring-red-400/50' : 'border-gray-200 dark:border-dark-border focus:ring-primary/50'
                }`}
                placeholder="What's this about?"
              />
              {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Message *</label>
              <textarea
                name="message" value={form.message} onChange={handleChange} rows="5"
                disabled={loading}
                className={`w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark border text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 transition-all resize-none disabled:opacity-60 ${
                  errors.message ? 'border-red-400 focus:ring-red-400/50' : 'border-gray-200 dark:border-dark-border focus:ring-primary/50'
                }`}
                placeholder="Tell me about your project..."
              />
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={loading ? {} : { scale: 1.02 }}
              whileTap={loading ? {} : { scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-primary hover:bg-primary-dark text-white font-medium rounded-xl transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-primary/40 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <FiSend className="w-5 h-5" />
                  Send Message
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
