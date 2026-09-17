/* ============================================================
   Ankit Shiyal - Portfolio
   Vanilla JavaScript (no frameworks)
   ============================================================ */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    if (window.feather) {
      feather.replace();
    }

    document.documentElement.classList.add('dark');

    setFooterYear();
    initNavbar();
    initTyping();
    initScrollReveal();
    initSkills();
    initProjects();
    initContactForm();
  }

  /* ---------- Footer year ---------- */

  function setFooterYear() {
    var el = document.getElementById('footer-year');
    if (el) {
      el.textContent = new Date().getFullYear();
    }
  }

  /* ---------- Navbar ---------- */

  function initNavbar() {
    var nav = document.getElementById('site-nav');
    var toggle = document.getElementById('nav-toggle');
    var mobile = document.getElementById('nav-mobile');
    if (!nav || !toggle || !mobile) return;

    function onScroll() {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    mobile.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    var sections = document.querySelectorAll('main section[id]');
    var desktopLinks = document.querySelectorAll('.nav-desktop .nav-link-custom');
    var mobileLinks = document.querySelectorAll('.nav-mobile .nav-link-mobile');
    var allLinks = Array.prototype.slice.call(desktopLinks).concat(
      Array.prototype.slice.call(mobileLinks)
    );

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            var id = entry.target.id;
            allLinks.forEach(function (link) {
              var isActive = link.getAttribute('href') === '#' + id;
              link.classList.toggle('active', isActive);
            });
          });
        },
        { rootMargin: '-50% 0px -50% 0px' }
      );
      sections.forEach(function (section) {
        observer.observe(section);
      });
    }
  }

  /* ---------- Hero typing animation ---------- */

  var TITLES = [
    'Full Stack Web Developer',
    'MERN Stack Developer',
    'UI/UX Enthusiast',
    'Problem Solver',
  ];

  function initTyping() {
    var el = document.getElementById('typed-text');
    if (!el) return;

    var titleIndex = 0;
    var charIndex = 0;
    var isDeleting = false;

    function tick() {
      var currentTitle = TITLES[titleIndex];

      if (!isDeleting && charIndex < currentTitle.length) {
        charIndex += 1;
        el.textContent = currentTitle.slice(0, charIndex);
        setTimeout(tick, 80);
      } else if (!isDeleting && charIndex === currentTitle.length) {
        isDeleting = true;
        setTimeout(tick, 2000);
      } else if (isDeleting && charIndex > 0) {
        charIndex -= 1;
        el.textContent = currentTitle.slice(0, charIndex);
        setTimeout(tick, 40);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % TITLES.length;
        setTimeout(tick, 200);
      }
    }

    tick();
  }

  /* ---------- Scroll reveal ---------- */

  function initScrollReveal() {
    var items = document.querySelectorAll('[data-reveal]');
    if (!items.length) return;

    function reveal(el) {
      el.classList.add('reveal-in-view');
    }

    if (!('IntersectionObserver' in window)) {
      items.forEach(reveal);
      return;
    }

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            reveal(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    items.forEach(function (item) {
      observer.observe(item);
    });
  }

  /* ---------- Skills ---------- */

  var SKILL_CATEGORIES = [
    {
      title: 'Frontend',
      icon: 'code',
      gradient: 'g-bc',
      skills: [
        { name: 'HTML5', icon: 'code', level: 90 },
        { name: 'CSS3', icon: 'layout', level: 85 },
        { name: 'JavaScript', icon: 'terminal', level: 80 },
        { name: 'Bootstrap', icon: 'grid', level: 85 },
      ],
    },
    {
      title: 'Backend',
      icon: 'server',
      gradient: 'g-ge',
      skills: [
        { name: 'Node.js', icon: 'server', level: 75 },
        { name: 'Express.js', icon: 'layers', level: 70 },
      ],
    },
    {
      title: 'Programming',
      icon: 'terminal',
      gradient: 'g-pp',
      skills: [
        { name: 'C', icon: 'cpu', level: 80 },
        { name: 'C++', icon: 'code', level: 75 },
      ],
    },
    {
      title: 'Tools & Platforms',
      icon: 'tool',
      gradient: 'g-or',
      skills: [
        { name: 'Git', icon: 'git-branch', level: 80 },
        { name: 'GitHub', icon: 'github', level: 85 },
      ],
    },
    {
      title: 'AI Tools',
      icon: 'cpu',
      gradient: 'g-vi',
      skills: [
        { name: 'ChatGPT', icon: 'message-circle', level: 85 },
        { name: 'GitHub Copilot', icon: 'zap', level: 80 },
        { name: 'Claude', icon: 'cpu', level: 75 },
        { name: 'OpenCode', icon: 'terminal', level: 70 },
      ],
    },
    {
      title: 'Deployment',
      icon: 'globe',
      gradient: 'g-tc',
      skills: [
        { name: 'Netlify', icon: 'globe', level: 85 },
        { name: 'Vercel', icon: 'triangle', level: 80 },
        { name: 'Render', icon: 'upload-cloud', level: 75 },
        { name: 'StackBlitz', icon: 'zap', level: 70 },
        { name: 'CodePen', icon: 'codepen', level: 75 },
      ],
    },
  ];

  var activeSkillTab = SKILL_CATEGORIES[0].title;
  var skillsSectionObserved = false;
  var skillsObserver = null;

  function initSkills() {
    var tabsEl = document.getElementById('skill-tabs');
    var panelEl = document.getElementById('skill-panel');
    var section = document.getElementById('skills');
    if (!tabsEl || !panelEl) return;

    tabsEl.setAttribute('role', 'tablist');

    renderSkillTabs();

    if ('IntersectionObserver' in window && section) {
      skillsObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting && !skillsSectionObserved) {
              skillsSectionObserved = true;
              animateSkillPanel();
              skillsObserver.disconnect();
            }
          });
        },
        { threshold: 0.1 }
      );
      skillsObserver.observe(section);
    } else {
      skillsSectionObserved = true;
    }

    renderSkillPanel();
  }

  function renderSkillTabs() {
    var tabsEl = document.getElementById('skill-tabs');
    tabsEl.innerHTML = SKILL_CATEGORIES.map(function (cat) {
      var active = cat.title === activeSkillTab;
      return (
        '<button type="button" class="skill-tab' +
        (active ? ' active' : '') +
        '" role="tab" aria-selected="' +
        active +
        '" data-tab="' +
        cat.title +
        '">' +
        '<i data-feather="' +
        cat.icon +
        '" class="icon-xs"></i>' +
        cat.title +
        '</button>'
      );
    }).join('');

    tabsEl.querySelectorAll('.skill-tab').forEach(function (btn) {
      btn.addEventListener('click', function () {
        activeSkillTab = btn.getAttribute('data-tab');
        renderSkillTabs();
        renderSkillPanel();
        feather.replace();
      });
    });
  }

  function getActiveSkillCategory() {
    return SKILL_CATEGORIES.filter(function (cat) {
      return cat.title === activeSkillTab;
    })[0];
  }

  function renderSkillPanel() {
    var panelEl = document.getElementById('skill-panel');
    var cat = getActiveSkillCategory();

    panelEl.classList.remove('visible');
    panelEl.innerHTML = buildSkillPanelHTML(cat);

    feather.replace();

    requestAnimationFrame(function () {
      panelEl.classList.add('visible');
    });

    if (skillsSectionObserved) {
      animateSkillPanel();
    }
  }

  function buildSkillPanelHTML(cat) {
    var cards = cat.skills
      .map(function (skill, i) {
        return (
          '<article class="skill-card" style="--card-delay:' +
          i * 0.06 +
          's">' +
          '<span class="skill-card-icon ' +
          cat.gradient +
          '"><i data-feather="' +
          skill.icon +
          '" class="icon-md"></i></span>' +
          '<h4 class="skill-card-name">' +
          skill.name +
          '</h4>' +
          '<div class="skill-card-track">' +
          '<div class="skill-card-fill" style="--level:' +
          skill.level +
          '%; transition-delay:' +
          (0.15 + i * 0.08) +
          's"></div>' +
          '</div>' +
          '</article>'
        );
      })
      .join('');

    return '<div class="skill-grid">' + cards + '</div>';
  }

  function animateSkillPanel() {
    var panelEl = document.getElementById('skill-panel');
    if (!panelEl) return;

    panelEl.querySelectorAll('.skill-card-fill').forEach(function (fill) {
      fill.classList.add('active');
    });
  }

  /* ---------- Projects ---------- */

  var PROJECTS = [
    {
      title: 'E-Commerce',
      desc: 'E-commerce website built using HTML, CSS, JavaScript and Bootstrap.',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
      category: 'frontend',
      github: 'https://github.com/Ankit-Shiyal/revision-js/tree/main/E-Commerce',
      live: 'https://revision-js.vercel.app/',
      gradient: 'g-bc',
    },
    {
      title: 'Quiz Application',
      desc: 'Quiz application built using HTML, CSS, JavaScript and Bootstrap.',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
      category: 'frontend',
      github: 'https://github.com/Ankit-Shiyal/Javascript/tree/main/Quiz%20Application',
      live: 'https://rainbow-axolotl-6855c4.netlify.app/',
      gradient: 'g-pp',
    },
    {
      title: 'Weather API',
      desc: 'Weather application built using HTML5, CSS3, JavaScript and a weather API.',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'API'],
      category: 'frontend',
      github: 'https://github.com/Ankit-Shiyal/Wether-API/tree/main/Wether%20API',
      live: 'https://wether-api-neon.vercel.app/',
      gradient: 'g-ge',
    },
  ];

  var PROJECT_CATEGORIES = ['all', 'frontend', 'backend', 'fullstack'];
  var activeProjectCategory = 'all';
  var projectSearch = '';

  function initProjects() {
    var filterEl = document.getElementById('filter-btns');
    var gridEl = document.getElementById('projects-grid');
    var emptyEl = document.getElementById('projects-empty');
    var searchInput = document.getElementById('search-input');
    if (!filterEl || !gridEl) return;

    filterEl.innerHTML = PROJECT_CATEGORIES.map(function (cat) {
      return (
        '<button type="button" class="filter-btn' +
        (cat === activeProjectCategory ? ' active' : '') +
        '" data-cat="' +
        cat +
        '">' +
        cat +
        '</button>'
      );
    }).join('');

    filterEl.querySelectorAll('.filter-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        activeProjectCategory = btn.getAttribute('data-cat');
        Array.prototype.forEach.call(filterEl.children, function (child) {
          child.classList.toggle('active', child === btn);
        });
        renderProjects();
      });
    });

    searchInput.addEventListener('input', function (e) {
      projectSearch = e.target.value.trim();
      renderProjects();
    });

    renderProjects();
  }

  function renderProjects() {
    var gridEl = document.getElementById('projects-grid');
    var emptyEl = document.getElementById('projects-empty');
    var query = projectSearch.toLowerCase();

    var filtered = PROJECTS.filter(function (project) {
      var matchCategory =
        activeProjectCategory === 'all' ||
        project.category === activeProjectCategory;
      var matchSearch =
        query === '' ||
        project.title.toLowerCase().indexOf(query) !== -1 ||
        project.tech.some(function (t) {
          return t.toLowerCase().indexOf(query) !== -1;
        }) ||
        project.category.toLowerCase().indexOf(query) !== -1;
      return matchCategory && matchSearch;
    });

    gridEl.innerHTML = filtered
      .map(function (project, idx) {
        return (
          '<div class="col-12 col-sm-6 col-lg-4 d-flex">' +
          '<article class="project-card" style="animation-delay:' +
          idx * 0.05 +
          's">' +
          '<div class="project-topline ' +
          project.gradient +
          '"></div>' +
          '<div class="project-body">' +
          '<h3 class="project-title">' +
          project.title +
          '</h3>' +
          '<p class="project-desc line-clamp-2">' +
          project.desc +
          '</p>' +
          '<div class="tech-badges">' +
          project.tech
            .map(
              function (t) {
                return '<span class="tech-badge">' + t + '</span>';
              }
            )
            .join('') +
          '</div>' +
          '<div class="project-links">' +
          '<a href="' +
          project.github +
          '" target="_blank" rel="noopener noreferrer" class="project-link">' +
          '<i data-feather="github" class="icon-xs"></i> GitHub</a>' +
          '<a href="' +
          project.live +
          '" target="_blank" rel="noopener noreferrer" class="project-link">' +
          '<i data-feather="external-link" class="icon-xs"></i> Live Demo</a>' +
          '</div>' +
          '</div>' +
          '</article>' +
          '</div>'
        );
      })
      .join('');

    if (filtered.length === 0) {
      var catName =
        activeProjectCategory === 'fullstack'
          ? 'fullstack'
          : activeProjectCategory === 'all'
            ? ''
            : activeProjectCategory;
      var msg;
      if (query !== '' && catName !== '') {
        msg = 'No ' + catName + ' projects found matching your search.';
      } else if (query !== '') {
        msg = 'No projects found matching your search.';
      } else if (catName !== '') {
        msg = 'No ' + catName + ' projects available.';
      } else {
        msg = 'No projects available.';
      }
      emptyEl.innerHTML = '<p class="empty-text">' + msg + '</p>';
    } else {
      emptyEl.innerHTML = '';
    }

    feather.replace();
  }

  /* ---------- Contact form ---------- */

  var CONTACT_FIELDS = ['name', 'email', 'subject', 'message'];

  function initContactForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;

    var submitBtn = document.getElementById('submit-btn');
    var submitLabel = document.getElementById('submit-label');
    var submitLoading = document.getElementById('submit-loading');
    var fields = {};
    CONTACT_FIELDS.forEach(function (name) {
      fields[name] = form.elements[name];
    });

    form.addEventListener('input', function (e) {
      if (e.target.name) {
        setFieldError(e.target.name, '');
      }
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      handleSubmit();
    });

    function validate(data) {
      var errs = {};
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

    function setLoading(isLoading) {
      CONTACT_FIELDS.forEach(function (name) {
        if (fields[name]) fields[name].disabled = isLoading;
      });
      if (submitBtn) submitBtn.disabled = isLoading;
      if (submitLabel) submitLabel.classList.toggle('d-none', isLoading);
      if (submitLoading) submitLoading.classList.toggle('d-none', !isLoading);
    }

    function handleSubmit() {
      var data = {
        name: fields.name.value,
        email: fields.email.value,
        subject: fields.subject.value,
        message: fields.message.value,
      };

      var errs = validate(data);
      setAllErrors(errs);
      if (Object.keys(errs).length > 0) return;

      setLoading(true);

      postJSON('/api/contact', data, 15000)
        .then(function (res) {
          showToast(
            'success',
            (res && res.message) || 'Message sent successfully!'
          );
          form.reset();
          setAllErrors({});
        })
        .catch(function (err) {
          handleRequestError(err);
        })
        .finally(function () {
          setLoading(false);
        });
    }
  }

  function getContactField(name) {
    return document.getElementById(name);
  }

  function setFieldError(name, message) {
    var field = getContactField(name);
    var errorEl = document.getElementById('error-' + name);
    if (field) field.classList.toggle('is-invalid', Boolean(message));
    if (errorEl) errorEl.textContent = message || '';
  }

  function setAllErrors(errs) {
    CONTACT_FIELDS.forEach(function (name) {
      setFieldError(name, errs[name] || '');
    });
  }

  function setFieldErrorsFromServer(errors) {
    CONTACT_FIELDS.forEach(function (name) {
      setFieldError(name, errors[name] || '');
    });
  }

  function postJSON(url, body, timeoutMs) {
    var controller = 'AbortController' in window ? new AbortController() : null;
    var timer = timeoutMs
      ? setTimeout(function () {
          if (controller) controller.abort();
        }, timeoutMs)
      : null;

    var opts = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    };
    if (controller) opts.signal = controller.signal;

    return fetch(url, opts)
      .then(function (res) {
        return res.json().catch(function () {
          return {};
        }).then(function (data) {
          if (!res.ok) {
            var error = new Error('HTTP ' + res.status);
            error.response = { status: res.status, data: data };
            throw error;
          }
          return data;
        });
      })
      .finally(function () {
        if (timer) clearTimeout(timer);
      });
  }

  function handleRequestError(err) {
    if (err && err.name === 'AbortError') {
      showToast('error', 'Request timed out. Please try again.');
      return;
    }

    if (err && err.response) {
      var data = err.response.data || {};
      if (data.errors) {
        setFieldErrorsFromServer(data.errors);
        showToast('error', 'Please fix the highlighted fields.');
      } else {
        showToast(
          'error',
          data.message || data.debug || 'Server error. Please try again.'
        );
      }
      return;
    }

    showToast('error', 'Cannot connect to server. Make sure the backend is running.');
  }

  /* ---------- Toast ---------- */

  var toastTimeout = null;

  function showToast(type, message) {
    var container = document.getElementById('toast-container');
    if (!container) return;

    if (toastTimeout) {
      clearTimeout(toastTimeout);
      toastTimeout = null;
    }

    container.innerHTML =
      '<div class="toast-ct ' +
      type +
      '" role="alert">' +
      '<i data-feather="' +
      (type === 'success' ? 'check-circle' : 'alert-circle') +
      '" class="icon-md"></i>' +
      '<span class="toast-msg">' +
      message +
      '</span>' +
      '<button type="button" class="toast-close" aria-label="Close">' +
      '<i data-feather="x" class="icon-xs"></i>' +
      '</button>' +
      '</div>';

    feather.replace();

    var toast = container.firstElementChild;
    var closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', function () {
      toast.remove();
      if (toastTimeout) {
        clearTimeout(toastTimeout);
        toastTimeout = null;
      }
    });

    if (type === 'success') {
      toastTimeout = setTimeout(function () {
        if (toast.parentNode) toast.remove();
        toastTimeout = null;
      }, 5000);
    }
  }
})();