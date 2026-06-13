// HERO SWIPER SLIDESHOW
(function () {
  const projectsData = [
    {
      id: 'kyrios',
      name: 'Kyrios — E-Learning Platform',
      shortDesc: 'Online learning platform with tiered subscriptions, course purchasing, Google OAuth, and interactive dashboards for users and admins.',
      type: 'Next.js · Django · PostgreSQL',
      locked: false,
      links: [
        { url: 'https://github.com/bernarddwumfour/Creaca', label: 'Frontend' },
        { url: 'https://github.com/bernarddwumfour/kyrios-backend', label: 'Backend' }
      ],
      slides: [
        { img: 'images/kyrios_hero_landing.png', cap: 'AI-Driven Skill Acquisition Hero' },
        { img: 'images/kyrios_course_catalog.png', cap: 'Multi-Disciplinary Course Explorer' },
        { img: 'images/kyrios_pricing_plans.png', cap: 'Tiered Learning Path Subscriptions' },
        { img: 'images/kyrios_admin_dashboard.png', cap: 'System Oversight & Admin Analytics' },
        { img: 'images/kyrios_user_profile.png', cap: 'User Personalization & Account Info' },
        { img: 'images/kyrios_security_settings.png', cap: 'Advanced Workspace Security & 2FA' }
      ]
    },
    {
      id: 'iplug',
      name: 'iPlug — E-Commerce & POS',
      shortDesc: 'Unified retail ecosystem: customer-facing web storefront + on-premise POS with live inventory sync, barcode scanning, and split payment processing.',
      type: 'Next.js · Django · PostgreSQL',
      locked: false,
      links: [
        { url: 'https://github.com/bernarddwumfour/estore-frontend', label: 'Frontend' },
        { url: 'https://github.com/bernarddwumfour/estore-backend', label: 'Backend' }
      ],
      slides: [
        { img: 'images/iplug_storefront_hero.png', cap: 'Premium Apple Retail Digital Storefront Hero' },
        { img: 'images/iplug_product_grid.png', cap: 'Dynamic Catalog Filtering and Product Grid' },
        { img: 'images/iplug_categories_showcase.png', cap: 'Visual Category Explorer and Promotional Banners' },
        { img: 'images/iplug_admin_analytics.png', cap: 'Products Analytics, Revenue and Order Trends Dashboard' },
        { img: 'images/iplug_category_management.png', cap: 'Backend Inventory Management and Category Hierarchy' },
        { img: 'images/iplug_pos_terminal.png', cap: 'Cloud-Synced Point of Sale Checkout Interface' },
        { img: 'images/iplug_order_logs.png', cap: 'System Audit Logs & Order Activity Monitor' }
      ]
    },
    {
      id: 'furnichar',
      name: 'Furnichar — Premium E-Commerce',
      shortDesc: 'Immersive online furniture retail concept emphasizing clean structural grids, high-fidelity production imagery, and seamless checkout pipelines.',
      type: 'UI/UX Design · Figma',
      locked: false,
      links: [],
      slides: [
        { img: 'images/furnichar_hero_showcase.png', cap: 'Minimalist Furniture E-Commerce Hero & Product Feature' }
      ]
    },
    {
      id: 'constructionui',
      name: 'Apex Construction Landing Page',
      shortDesc: 'Professional landing page blueprint for structural engineering firm highlighting core engineering services, project milestones, and heavy machinery operations.',
      type: 'UI/UX Design · Figma',
      locked: false,
      links: [],
      slides: [
        { img: 'images/constructionui_landing_page.png', cap: 'Industrial Construction Services & Corporate Branding Showpiece' }
      ]
    },
    {
      id: 'sparklescrub',
      name: 'SparkleScrub — Commercial Cleaning',
      shortDesc: 'Service booking presentation page tailored for modern professional cleaning enterprises, prioritizing transparent pricing tiers and user conversion architecture.',
      type: 'UI/UX Design · Figma',
      locked: false,
      links: [],
      slides: [
        { img: 'images/sparklescrub_service_booking.png', cap: 'Commercial and Domestic Cleaner Service Information Portal' }
      ]
    },
    {
      id: 'salon',
      name: 'GlowSalon — Wellness Booking Platform',
      shortDesc: 'Elegant luxury beauty and spa appointment platform mockup incorporating clean layout components to improve friction-free service bookings.',
      type: 'UI/UX Design · Figma',
      locked: false,
      links: [],
      slides: [
        { img: 'images/salon_appointment_hub.png', cap: 'High-End Wellness Salon Landing and Appointment Hub' }
      ]
    },
    {
      id: 'plantui',
      name: 'Verdant — Botanical Retail Portal',
      shortDesc: 'Organic e-commerce layout emphasizing modern plant nurseries, clean typography, minimalist navigation paths, and botanical care instructions.',
      type: 'UI/UX Design · Figma',
      locked: false,
      links: [],
      slides: [
        { img: 'images/plantui_botanical_catalog.png', cap: 'Urban Plant Nursery Storefront Grid and Lifestyle Section' }
      ]
    },
    {
      id: 'herbalui',
      name: 'Herbal Essence — Wellness Brand Page',
      shortDesc: 'Holistic healthcare product application concept blending clean earthy tones, transparent ingredient lists, and smooth customer navigation layouts.',
      type: 'UI/UX Design · Figma',
      locked: false,
      links: [],
      slides: [
        { img: 'images/herbalui_wellness_storefront.png', cap: 'Natural Organic Skincare and Herbal Products Landing Page' }
      ]
    }
  ];

  const flat = [];
  projectsData.forEach((proj, pi) => {
    proj.slides.forEach((slide, si) => {
      flat.push({ pi, si, slide, proj: proj });
    });
  });

  const track = document.getElementById('heroViewerTrack');
  const thumbsEl = document.getElementById('heroThumbs');

  if (track && thumbsEl) {
    flat.forEach(item => {
      const div = document.createElement('div');
      div.className = 'hero-viewer-slide';
      div.innerHTML = `<img src="${item.slide.img}" alt="${item.slide.caption}" loading="lazy">`;
      track.appendChild(div);
    });

    projectsData.forEach((proj, pi) => {
      const th = document.createElement('div');
      th.className = 'hero-thumb' + (pi === 0 ? ' active' : '');
      th.innerHTML = `
        <img src="${proj.slides[0].img}" alt="${proj.name}" loading="lazy">
        <div class="hero-thumb-label"><span>${proj.name.split('—')[0].trim().split(' ').slice(0, 2).join(' ')}</span></div>
      `;
      th.addEventListener('click', () => jumpToProject(pi));
      thumbsEl.appendChild(th);
    });

    let curFlat = 0;
    let elapsed = 0;
    let tick;
    const SLIDE_MS = 3000;

    function goToFlat(idx, resetEl = true) {
      curFlat = (idx + flat.length) % flat.length;
      const item = flat[curFlat];
      track.style.transform = `translateX(-${curFlat * 100}%)`;
      document.getElementById('heroViewerProj').textContent = item.proj.name;
      document.getElementById('heroViewerName').textContent = item.slide.caption;
      document.getElementById('heroViewerCaption').textContent = `${item.si + 1} / ${item.proj.slides.length}`;
      document.querySelectorAll('.hero-thumb').forEach((t, i) => t.classList.toggle('active', i === item.pi));
      if (resetEl) {
        elapsed = 0;
        document.getElementById('heroProgressFill').style.width = '0%';
      }
      resetTick();
    }

    function jumpToProject(pi) {
      const idx = flat.findIndex(f => f.pi === pi);
      if (idx >= 0) goToFlat(idx);
    }

    function resetTick() {
      clearInterval(tick);
      tick = setInterval(() => {
        elapsed += 80;
        const pct = Math.min(elapsed / SLIDE_MS * 100, 100);
        document.getElementById('heroProgressFill').style.width = pct + '%';
        if (elapsed >= SLIDE_MS) {
          elapsed = 0;
          goToFlat(curFlat + 1, false);
        }
      }, 80);
    }

    document.getElementById('heroPrev').addEventListener('click', () => goToFlat(curFlat - 1));
    document.getElementById('heroNext').addEventListener('click', () => goToFlat(curFlat + 1));
    goToFlat(0);
  }
})();

// Custom cursor
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
if (cursor && ring) {
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
  });
  (function loop() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(loop);
  })();
}

// Theme toggle
const html = document.documentElement;
const themeBtn = document.getElementById('themeBtn');
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
themeBtn.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// Hamburger / mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  document.querySelectorAll('.mobile-nav-link').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// Nav scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
  const sections = ['hero', 'about', 'experience', 'skills', 'work', 'contact'];
  let current = sections[0];
  const nearBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 80;
  if (nearBottom) {
    current = 'contact';
  } else {
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 120) current = id;
    });
  }
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

// Scroll reveal
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});

// Make hero-thumbs draggable for horizontal scroll
const heroThumbs = document.querySelector('.hero-thumbs');
if (heroThumbs) {
  let isDown = false;
  let startX;
  let scrollLeft;

  heroThumbs.addEventListener('mousedown', (e) => {
    isDown = true;
    heroThumbs.classList.add('active');
    startX = e.pageX - heroThumbs.offsetLeft;
    scrollLeft = heroThumbs.scrollLeft;
  });

  heroThumbs.addEventListener('mouseleave', () => {
    isDown = false;
    heroThumbs.classList.remove('active');
  });

  heroThumbs.addEventListener('mouseup', () => {
    isDown = false;
    heroThumbs.classList.remove('active');
  });

  heroThumbs.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - heroThumbs.offsetLeft;
    const walk = (x - startX) * 1.5; // scroll speed multiplier
    heroThumbs.scrollLeft = scrollLeft - walk;
  });

  heroThumbs.style.cursor = 'grab';
  heroThumbs.addEventListener('mousedown', () => {
    heroThumbs.style.cursor = 'grabbing';
  });
  heroThumbs.addEventListener('mouseup', () => {
    heroThumbs.style.cursor = 'grab';
  });
}

/* PROJECT SECTION DYNAMICS */
const CARD_MS = 3500;
const GH_ICON = `<svg width="11" height="11" viewBox="0 0 12 12" fill="currentColor"><path d="M6 1C3.24 1 1 3.24 1 6c0 2.21 1.43 4.09 3.42 4.75.25.05.34-.11.34-.24v-.85c-1.39.3-1.68-.67-1.68-.67-.23-.58-.56-.73-.56-.73-.45-.31.03-.3.03-.3.5.03.76.51.76.51.44.76 1.16.54 1.44.41.04-.32.17-.54.31-.66-1.1-.13-2.26-.55-2.26-2.45 0-.54.19-.98.51-1.33-.05-.12-.22-.63.05-1.31 0 0 .42-.13 1.37.51A4.77 4.77 0 016 3.52c.42 0 .85.06 1.25.17.95-.64 1.37-.51 1.37-.51.27.68.1 1.19.05 1.31.32.35.51.79.51 1.33 0 1.91-1.16 2.32-2.27 2.45.18.15.34.46.34.92v1.37c0 .13.09.29.34.24A5.01 5.01 0 0011 6c0-2.76-2.24-5-5-5z"/></svg>`;
const LOCK_ICON = `<svg width="10" height="10" viewBox="0 0 10 10" fill="none"><rect x="1" y="4" width="8" height="5.5" rx="1" stroke="currentColor" stroke-width="0.9"/><path d="M3 4V3a2 2 0 014 0v1" stroke="currentColor" stroke-width="0.9" stroke-linecap="round"/></svg>`;
const EYE_ICON = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;

const PROJECTS = {
  software: [
    {
      id: 'kyrios',
      name: 'Kyrios — E-Learning Platform',
      shortDesc: 'Online learning platform with tiered subscriptions, course purchasing, Google OAuth, and interactive dashboards for users and admins.',
      type: 'Next.js · Django · PostgreSQL',
      locked: false,
      previewUrl: 'https://kyrios-demo.vercel.app/en',
      links: [
        { url: 'https://github.com/bernarddwumfour/Creaca', label: 'Frontend' },
        { url: 'https://github.com/bernarddwumfour/kyrios-backend', label: 'Backend' }
      ],
      slides: [
        { img: 'images/kyrios_hero_landing.png', cap: 'AI-Driven Skill Acquisition Hero' },
        { img: 'images/kyrios_course_catalog.png', cap: 'Multi-Disciplinary Course Explorer' },
        { img: 'images/kyrios_pricing_plans.png', cap: 'Tiered Learning Path Subscriptions' },
        { img: 'images/kyrios_admin_dashboard.png', cap: 'System Oversight & Admin Analytics' },
        { img: 'images/kyrios_user_profile.png', cap: 'User Personalization & Account Info' },
        { img: 'images/kyrios_security_settings.png', cap: 'Advanced Workspace Security & 2FA' }
      ]
    },
    {
      id: 'iplug',
      name: 'iPlug — E-Commerce & POS',
      shortDesc: 'Unified retail ecosystem: customer-facing web storefront + on-premise POS with live inventory sync, barcode scanning, and split payment processing.',
      type: 'Next.js · Django · PostgreSQL',
      locked: false,
      previewUrl: 'https://estore-frontend-boqb.vercel.app/',
      links: [
        { url: 'https://github.com/bernarddwumfour/estore-frontend', label: 'Frontend' },
        { url: 'https://github.com/bernarddwumfour/estore-backend', label: 'Backend' }
      ],
      slides: [
        { img: 'images/iplug_storefront_hero.png', cap: 'Premium Apple Retail Digital Storefront Hero' },
        { img: 'images/iplug_product_grid.png', cap: 'Dynamic Catalog Filtering and Product Grid' },
        { img: 'images/iplug_categories_showcase.png', cap: 'Visual Category Explorer and Promotional Banners' },
        { img: 'images/iplug_admin_analytics.png', cap: 'Products Analytics, Revenue and Order Trends Dashboard' },
        { img: 'images/iplug_category_management.png', cap: 'Backend Inventory Management and Category Hierarchy' },
        { img: 'images/iplug_pos_terminal.png', cap: 'Cloud-Synced Point of Sale Checkout Interface' },
        { img: 'images/iplug_order_logs.png', cap: 'System Audit Logs & Order Activity Monitor' }
      ]
    },
  ],
  uiux: [
    {
      id: 'furnichar',
      name: 'Furnichar — Premium E-Commerce',
      shortDesc: 'Immersive online furniture retail concept emphasizing clean structural grids, high-fidelity production imagery, and seamless checkout pipelines.',
      type: 'UI/UX Design · Figma',
      locked: false,
      previewUrl: 'https://www.figma.com/design/Te914L3OTQXb2E9JQtK1zV/Untitled?node-id=0-1&t=7edxXdc37ZtESBw9-0',
      links: [],
      slides: [
        { img: 'images/furnichar_hero_showcase.png', cap: 'Minimalist Furniture E-Commerce Hero & Product Feature' }
      ]
    },
    {
      id: 'sparklescrub',
      name: 'SparkleScrub — Commercial Cleaning',
      shortDesc: 'Service booking presentation page tailored for modern professional cleaning enterprises, prioritizing transparent pricing tiers and user conversion architecture.',
      type: 'UI/UX Design · Figma',
      locked: false,
      previewUrl: 'https://www.figma.com/design/m8k8KQpaZN6DXGipWBBD99/Untitled?node-id=0-1&t=ZbFy7KElvtMarocd-0',
      links: [],
      slides: [
        { img: 'images/sparklescrub_service_booking.png', cap: 'Commercial and Domestic Cleaner Service Information Portal' }
      ]
    },
    {
      id: 'salon',
      name: 'GlowSalon — Wellness Booking Platform',
      shortDesc: 'Elegant luxury beauty and spa appointment platform mockup incorporating clean layout components to improve friction-free service bookings.',
      type: 'UI/UX Design · Figma',
      locked: false,
      previewUrl: 'https://www.figma.com/design/4DXRbTKDdTThPfcdbeOo9H/Untitled?node-id=0-1&t=6jamwAUNh3gLNANf-1',
      links: [],
      slides: [
        { img: 'images/salon_appointment_hub.png', cap: 'High-End Wellness Salon Landing and Appointment Hub' }
      ]
    },
    {
      id: 'plantui',
      name: 'Verdant — Botanical Retail Portal',
      shortDesc: 'Organic e-commerce layout emphasizing modern plant nurseries, clean typography, minimalist navigation paths, and botanical care instructions.',
      type: 'UI/UX Design · Figma',
      locked: false,
      previewUrl: 'https://www.figma.com/design/rp4oDJ7XWsH5z50KwSACUd/Untitled?node-id=0-1&t=LstXrxVJlh5LugzK-1',
      links: [],
      slides: [
        { img: 'images/plantui_botanical_catalog.png', cap: 'Urban Plant Nursery Storefront Grid and Lifestyle Section' }
      ]
    },
    {
      id: 'herbalui',
      name: 'Herbal Essence — Wellness Brand Page',
      shortDesc: 'Holistic healthcare product application concept blending clean earthy tones, transparent ingredient lists, and smooth customer navigation layouts.',
      type: 'UI/UX Design · Figma',
      locked: false,
      previewUrl: 'https://www.figma.com/file/EeTZQiqhsiJ6OanfDcDcwh/Untitled?type=design&node-id=0-1&mode=design&t=ksTvfDoJ1BXyH7ZJ-0',
      links: [],
      slides: [
        { img: 'images/herbalui_wellness_storefront.png', cap: 'Natural Organic Skincare and Herbal Products Landing Page' }
      ]
    },
    {
      id: 'constructionui',
      name: 'Apex Construction Landing Page',
      shortDesc: 'Professional landing page blueprint for structural engineering firm highlighting core engineering services, project milestones, and heavy machinery operations.',
      type: 'UI/UX Design · Figma',
      locked: false,
      previewUrl: '',
      links: [],
      slides: [
        { img: 'images/constructionui_landing_page.png', cap: 'Industrial Construction Services & Corporate Branding Showpiece' }
      ]
    },
  ]
};

PROJECTS.all = [...PROJECTS.software, ...PROJECTS.uiux];

function buildCard(proj) {
  const slides = proj.slides.map((s, i) => `
    <div class="proj-slide">
      <img src="${s.img}" alt="${s.cap}" loading="lazy">
      <div class="proj-slide-ov">
        <div class="proj-slide-label">Slide note</div>
        <div class="proj-slide-text">${s.cap}</div>
      </div>
    </div>`).join('');
  const dots = proj.slides.length > 1 ? proj.slides.map((_, i) => `<div class="proj-dot${i === 0 ? ' active' : ''}" data-i="${i}"></div>`).join('') : '';
  const arrows = proj.slides.length > 1 ? `<div class="proj-arrows"><div class="proj-arrow pa-prev">&#8592;</div><div class="proj-arrow pa-next">&#8594;</div></div>` : '';

  const previewLink = (proj.previewUrl && proj.previewUrl.trim() !== '')
    ? `<a href="${proj.previewUrl}" target="_blank" class="proj-link preview-btn" title="Live Preview">${EYE_ICON}</a>`
    : '';

  const links = proj.links.map(l => `<a href="${l.url}" target="_blank" class="proj-link" title="${l.label} GitHub">${GH_ICON}</a>`).join('');
  const tags = proj.type.split('·').map(t => `<span class="tag">${t.trim()}</span>`).join('');
  const locked = proj.locked ? `<div class="locked-badge">${LOCK_ICON} Private / Enterprise</div>` : '';
  return `
  <div class="proj-card reveal" data-id="${proj.id}">
    <div class="proj-ss">
      <div class="proj-prog"><div class="proj-prog-fill"></div></div>
      <div class="proj-track">${slides}</div>
      ${arrows}
      ${proj.slides.length > 1 ? `<div class="proj-dots">${dots}</div>` : ''}
      ${proj.slides.length > 1 ? `<div class="proj-counter">1 / ${proj.slides.length}</div>` : ''}
    </div>
    <div class="proj-info">
      <div class="proj-info-top">
        <div class="proj-name">${proj.name}</div>
        <div class="proj-links-row">${previewLink}${links}</div>
      </div>
      <p class="proj-short-desc">${proj.shortDesc}</p>
      <div class="proj-tags">${tags}</div>
      ${locked}
    </div>
  </div>`;
}

function initCard(card) {
  const track = card.querySelector('.proj-track');
  const dots = card.querySelectorAll('.proj-dot');
  const prevBtn = card.querySelector('.pa-prev');
  const nextBtn = card.querySelector('.pa-next');
  const pFill = card.querySelector('.proj-prog-fill');
  const counterEl = card.querySelector('.proj-counter');
  if (!track) return;
  const total = track.children.length;
  if (total <= 1) return;
  let cur = 0, elapsed = 0, tick = null;
  function goTo(n, rst = true) {
    cur = (n + total) % total;
    track.style.transform = `translateX(-${cur * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === cur));
    if (counterEl) counterEl.textContent = `${cur + 1} / ${total}`;
    if (rst) { elapsed = 0; pFill.style.width = '0%'; }
    startTick();
  }
  function startTick() {
    clearInterval(tick);
    tick = setInterval(() => {
      elapsed += 80;
      pFill.style.width = Math.min(elapsed / CARD_MS * 100, 100) + '%';
      if (elapsed >= CARD_MS) { elapsed = 0; goTo(cur + 1, false); }
    }, 120);
  }
  if (prevBtn) prevBtn.addEventListener('click', () => goTo(cur - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goTo(cur + 1));
  dots.forEach(d => d.addEventListener('click', () => goTo(parseInt(d.dataset.i))));
  card.addEventListener('mouseenter', () => clearInterval(tick));
  card.addEventListener('mouseleave', () => startTick());
  startTick();
}

let currentTab = 'all';
function renderGrid(tab) {
  const grid = document.getElementById('projectsGrid');
  grid.innerHTML = PROJECTS[tab].map(buildCard).join('');
  grid.querySelectorAll('.proj-card').forEach(c => { initCard(c); obs.observe(c); });
}
document.getElementById('projTabs').addEventListener('click', e => {
  const btn = e.target.closest('.proj-tab');
  if (!btn) return;
  currentTab = btn.dataset.tab;
  document.querySelectorAll('.proj-tab').forEach(t => t.classList.toggle('active', t === btn));
  renderGrid(currentTab);
});

// ============================================
// EMAILJS
// ============================================
emailjs.init('2yST3hqNehmlhb6Kj');

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const text = document.getElementById('submitText');
    const spinner = document.getElementById('submitSpinner');
    const status = document.getElementById('formStatus');

    btn.disabled = true;
    text.textContent = 'Sending...';
    spinner.style.display = 'inline-block';
    status.textContent = '';
    status.className = 'form-status';

    emailjs.sendForm('service_pv46ltl', 'template_1c80uem', this)
      .then(() => {
        status.textContent = '✓ Message sent! I\'ll get back to you soon.';
        status.className = 'form-status success';
        contactForm.reset();
      })
      .catch(() => {
        status.textContent = '✗ Something went wrong. Please try emailing me directly.';
        status.className = 'form-status error';
      })
      .finally(() => {
        btn.disabled = false;
        text.textContent = 'Send Message';
        spinner.style.display = 'none';
      });
  });
}


// ============================================
// RADIAL FAB BURST
// ============================================
const fabMain = document.getElementById('fabMain');
const fabRipple = document.getElementById('fabRipple');
const fabRoot = document.getElementById('fabRoot');
let fabOpen = false;

const fabChildren = [
  { wrapId: 'wrap-contact', tx: -8, ty: -90, delay: 0 },
  { wrapId: 'wrap-gmail', tx: -72, ty: 66, delay: 165 },
  { wrapId: 'wrap-whatsapp', tx: -72, ty: -62, delay: 55 },
  { wrapId: 'wrap-linkedin', tx: -98, ty: 4, delay: 110 },
  { wrapId: 'wrap-backtotop', tx: 0, ty: 76, delay: 0, alwaysVisible: true },

];

function fabBurst(shouldOpen) {
  fabOpen = shouldOpen;
  fabMain.classList.toggle('open', fabOpen);
  const icon = document.getElementById('fabMainIcon');
  if (fabOpen) {
    icon.innerHTML = `<line x1="18" y1="6" x2="6" y2="18" stroke="white" stroke-width="2.5" stroke-linecap="round"/><line x1="6" y1="6" x2="18" y2="18" stroke="white" stroke-width="2.5" stroke-linecap="round"/>`;
    icon.setAttribute('fill', 'none');
  } else {
    icon.innerHTML = `<path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2.046 21.15a.75.75 0 0 0 .927.928l3.982-1.392A9.96 9.96 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/>`;
    icon.setAttribute('fill', 'currentColor');
  }
  if (fabOpen) {
    fabRipple.classList.remove('animate');
    void fabRipple.offsetWidth;
    fabRipple.classList.add('animate');
  }

  fabChildren.forEach(({ wrapId, tx, ty, delay, alwaysVisible }) => {
    if (alwaysVisible) return;
    const wrap = document.getElementById(wrapId);
    const btn = wrap.querySelector('.fab-btn');
    if (fabOpen) {
      wrap.style.transitionDelay = delay + 'ms';
      btn.style.transitionDelay = delay + 'ms';
      wrap.style.transform = `translate(${tx}px, ${ty}px)`;
      btn.classList.add('open');
    } else {
      const rDelay = (165 - delay) + 'ms';
      wrap.style.transitionDelay = rDelay;
      btn.style.transitionDelay = rDelay;
      wrap.style.transform = 'translate(0,0)';
      btn.classList.remove('open');
    }
  });
}

if (fabMain) {
  fabMain.addEventListener('click', (e) => {
    e.stopPropagation();
    fabBurst(!fabOpen);
  });
}

document.addEventListener('click', (e) => {
  if (fabOpen && fabRoot && !fabRoot.contains(e.target)) fabBurst(false);
});

// contact popup toggle (message child button)
const fabContactToggle = document.getElementById('fabContactToggle');
const contactPopup = document.getElementById('contactPopup');
const contactPopupClose = document.getElementById('contactPopupClose');

if (fabContactToggle && contactPopup) {
  fabContactToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    contactPopup.classList.toggle('open');
  });
}
if (contactPopupClose) {
  contactPopupClose.addEventListener('click', () => contactPopup.classList.remove('open'));
}

// Back to top — always visible, sits below main button
const backToTopWrap = document.getElementById('wrap-backtotop');
const backToTopBtn = document.getElementById('backToTop');

if (backToTopWrap && backToTopBtn) {
  // position it statically below the main button
  backToTopWrap.style.transform = 'translate(-4px, 76px)';
  backToTopBtn.classList.add('always-visible');

  window.addEventListener('scroll', () => {
    const show = window.scrollY > 500;
    backToTopBtn.style.opacity = show ? '1' : '0.3';
    backToTopBtn.style.pointerEvents = show ? 'auto' : 'none';
  });

  backToTopBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

renderGrid('all');


// ============================================
// SPIRAL WAVE ANIMATION CANVAS
// ============================================
(function initSpiralWave() {
  const canvas = document.getElementById('spiralCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, time = 0;
  let animationId = null;

  function resizeCanvas() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const LINES = 20;
  const SPEED = 0.005;

  function drawLine(i) {
    const p = i / (LINES - 1);

    // Dynamic color based on position (matches theme)
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const r = isDark ? Math.floor(80 + p * 100) : Math.floor(60 + p * 80);
    const g = isDark ? Math.floor(60 + p * 80) : Math.floor(90 + p * 70);
    const b = isDark ? Math.floor(180 + p * 75) : Math.floor(150 + p * 105);
    const alpha = 0.15 + p * 0.65;
    const lw = 0.7 + p * 1.2;

    const spread = Math.min(W, H) * 0.06;
    const edgeDistance = Math.abs(p - 0.5) * 3;
    const spreadMultiplier = Math.pow(edgeDistance, .9);
    const perpOffset = (p - 0.5) * spread * spreadMultiplier * 0.8;

    const dx = 1 / Math.sqrt(2);
    const dy = 1 / Math.sqrt(2);
    const nx = -dy;
    const ny = dx;

    ctx.beginPath();
    ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
    ctx.lineWidth = lw;

    const centerFactor = Math.pow(Math.max(0, 0.65 - edgeDistance), 1.6);
    const twistStrength = centerFactor * 125;

    const STEPS = 30;
    for (let s = 0; s <= STEPS; s++) {
      const tVal = s / STEPS;
      const diag = tVal * 1.3 - 0.15;
      let bx = diag * W;
      let by = diag * H;

      const freq1 = 0.0028 + p * 0.0018;
      const freq2 = freq1 * 1.5;
      const amp = 30 + p * 75;

      const wave = Math.sin(tVal * W * freq1 + time + i * 0.16) * amp * 0.7
        + Math.sin(tVal * W * freq2 + time * 0.8 + i * 0.22) * amp * 0.3;

      const twistWave = Math.sin(tVal * Math.PI * 2.5 + p * 2.2) * twistStrength;

      const totalPerp = perpOffset + wave + twistWave;
      const px = bx + nx * totalPerp;
      const py = by + ny * totalPerp;

      s === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.stroke();
  }

  function animateSpiral() {
    if (!ctx) return;
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < LINES; i++) drawLine(i);
    time += SPEED;
    animationId = requestAnimationFrame(animateSpiral);
  }

  animateSpiral();

  // Optional: restart animation on theme change to refresh colors
  const observer = new MutationObserver(() => {
    // Colors will update on next frames naturally
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
})();