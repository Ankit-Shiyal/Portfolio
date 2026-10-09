import { useEffect, useState } from 'react';
import Icon from './Icon';

const CONTACT_FIELDS = ['name', 'email', 'subject', 'message'];

const INITIAL_FORM = { name: '', email: '', subject: '', message: '' };

function validate(data) {
  const errs = {};
  if (!data.name.trim() || data.name.trim().length < 2) {
    errs.name = 'Name must be at least 2 characters';
  }
  if (!data.email.trim() || !/^\S+@\S+\.\S+$/.test(data.email)) {
    errs.email = 'Please enter a valid email';
  }
  if (!data.subject.trim() || data.subject.trim().length < 3) {
    errs.subject = 'Subject must be at least 3 characters';
  }
  if (!data.message.trim() || data.message.trim().length < 10) {
    errs.message = 'Message must be at least 10 characters';
  }
  return errs;
}

function postJSON(url, body, timeoutMs) {
  const controller = 'AbortController' in window ? new AbortController() : null;
  const timer = timeoutMs
    ? setTimeout(() => {
        if (controller) controller.abort();
      }, timeoutMs)
    : null;

  const opts = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
  if (controller) opts.signal = controller.signal;

  return fetch(url, opts)
    .then((res) =>
      res
        .json()
        .catch(() => ({}))
        .then((data) => {
          if (!res.ok) {
            const error = new Error('HTTP ' + res.status);
            error.response = { status: res.status, data };
            throw error;
          }
          return data;
        })
    )
    .finally(() => {
      if (timer) clearTimeout(timer);
    });
}

export default function Contact() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast || toast.type !== 'success') return undefined;
    const timer = setTimeout(() => setToast(null), 5000);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleRequestError = (err) => {
    if (err && err.name === 'AbortError') {
      setToast({ type: 'error', message: 'Request timed out. Please try again.' });
      return;
    }

    if (err && err.response) {
      const data = err.response.data || {};
      if (data.errors) {
        const next = {};
        CONTACT_FIELDS.forEach((field) => {
          next[field] = data.errors[field] || '';
        });
        setErrors(next);
        setToast({ type: 'error', message: 'Please fix the highlighted fields.' });
      } else {
        setToast({
          type: 'error',
          message: data.message || data.debug || 'Server error. Please try again.',
        });
      }
      return;
    }

    setToast({
      type: 'error',
      message: 'Cannot connect to server. Make sure the backend is running.',
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const errs = validate(formData);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);

    postJSON('/api/contact', formData, 15000)
      .then((res) => {
        setToast({
          type: 'success',
          message: (res && res.message) || 'Message sent successfully!',
        });
        setFormData(INITIAL_FORM);
        setErrors({});
      })
      .catch((err) => handleRequestError(err))
      .finally(() => setLoading(false));
  };

  const fieldClass = (name) =>
    `form-control form-control-ct${errors[name] ? ' is-invalid' : ''}`;

  return (
    <>
      {/* ============ CONTACT ============ */}
      <section id="contact" className="section">
        <div className="site-container">
          <div className="section-head" data-reveal data-reveal-up>
            <h2 className="section-heading">
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <p className="section-sub">
              Have a project in mind or just want to say hi? I&#39;d love to
              hear from you.
            </p>
            <div className="section-line section-line-margin"></div>
          </div>

          <div className="row g-gap-5">
            <div
              className="col-12 col-lg-5"
              data-reveal
              data-reveal-left
              style={{ '--reveal-delay': '0.2s' }}
            >
              <div className="contact-info-card">
                <div className="contact-icon-box">
                  <Icon name="mail" className="icon-md" />
                </div>
                <div>
                  <p className="contact-info-label">Email</p>
                  <a
                    href="mailto:ankitshiyal2005@gmail.com"
                    className="contact-info-value"
                  >
                    ankitshiyal2005@gmail.com
                  </a>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="contact-icon-box">
                  <Icon name="phone" className="icon-md" />
                </div>
                <div>
                  <p className="contact-info-label">Phone</p>
                  <a href="tel:+919624908290" className="contact-info-value">
                    +91 9624908290
                  </a>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="contact-icon-box">
                  <Icon name="map-pin" className="icon-md" />
                </div>
                <div>
                  <p className="contact-info-label">Location</p>
                  <p className="contact-info-value">
                    Bhavnagar, Gujarat, India
                  </p>
                </div>
              </div>

              <div className="available-card">
                <h4 className="available-title">Available for</h4>
                <div className="available-badges">
                  <span className="available-badge">Freelance</span>
                  <span className="available-badge">Full-time</span>
                  <span className="available-badge">Remote</span>
                  <span className="available-badge">Internship</span>
                </div>
              </div>
            </div>

            <div
              className="col-12 col-lg-7"
              data-reveal
              data-reveal-right
              style={{ '--reveal-delay': '0.3s' }}
            >
              <form
                id="contact-form"
                className="contact-form"
                noValidate
                onSubmit={handleSubmit}
              >
                <div className="row g-3 mb-1">
                  <div className="col-12 col-sm-6">
                    <label className="form-label" htmlFor="name">
                      Name *
                    </label>
                    <input
                      type="text"
                      className={fieldClass('name')}
                      id="name"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={loading}
                    />
                    <p className="form-error" id="error-name">
                      {errors.name || ''}
                    </p>
                  </div>
                  <div className="col-12 col-sm-6">
                    <label className="form-label" htmlFor="email">
                      Email *
                    </label>
                    <input
                      type="email"
                      className={fieldClass('email')}
                      id="email"
                      name="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={loading}
                    />
                    <p className="form-error" id="error-email">
                      {errors.email || ''}
                    </p>
                  </div>
                </div>

                <div className="mb-1">
                  <label className="form-label" htmlFor="subject">
                    Subject *
                  </label>
                  <input
                    type="text"
                    className={fieldClass('subject')}
                    id="subject"
                    name="subject"
                    placeholder="What's this about?"
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  <p className="form-error" id="error-subject">
                    {errors.subject || ''}
                  </p>
                </div>

                <div className="mb-4">
                  <label className="form-label" htmlFor="message">
                    Message *
                  </label>
                  <textarea
                    className={fieldClass('message')}
                    id="message"
                    name="message"
                    rows="5"
                    placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={handleChange}
                    disabled={loading}
                  ></textarea>
                  <p className="form-error" id="error-message">
                    {errors.message || ''}
                  </p>
                </div>

                <button
                  type="submit"
                  className="btn btn-submit"
                  id="submit-btn"
                  disabled={loading}
                >
                  {loading ? (
                    <span id="submit-loading">
                      <svg className="spinner" viewBox="0 0 24 24" fill="none">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span id="submit-label">
                      <Icon name="send" className="icon-sm" /> Send Message
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {toast ? (
        <div id="toast-container">
          <div className={`toast-ct ${toast.type}`} role="alert">
            <Icon
              name={toast.type === 'success' ? 'check-circle' : 'alert-circle'}
              className="icon-md"
            />
            <span className="toast-msg">{toast.message}</span>
            <button
              type="button"
              className="toast-close"
              aria-label="Close"
              onClick={() => setToast(null)}
            >
              <Icon name="x" className="icon-xs" />
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
