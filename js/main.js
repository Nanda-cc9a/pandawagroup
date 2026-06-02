/* ══════════════════════════════════════════
   PT PANDAWA MITRA INDONESIA — MAIN.JS
   ══════════════════════════════════════════ */

'use strict';

// ─── Navbar Scroll Effect ───
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const current = window.scrollY;
  if (current > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  lastScroll = current;
}, { passive: true });

// ─── Hamburger Menu ───
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
  // Animate hamburger to X
  const spans = hamburger.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// ─── Smooth Nav Link Scrolling ───
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ─── Reveal on Scroll (IntersectionObserver) ───
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

revealEls.forEach(el => revealObserver.observe(el));

// ─── Layanan Cards Stagger Reveal ───
const layananCards = document.querySelectorAll('.layanan-card');
const layananObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      layananObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.08,
  rootMargin: '0px 0px -20px 0px'
});

layananCards.forEach(card => layananObserver.observe(card));

// ─── Active Nav Link Highlighting ───
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, {
  threshold: 0.35
});

sections.forEach(s => sectionObserver.observe(s));

// ─── Contact Form ───
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toast');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const nama = contactForm.querySelector('input[placeholder="Nama Anda"]').value;
  const phone = contactForm.querySelector('input[placeholder="08xxxxxxxxxx"]').value;
  const email = contactForm.querySelector('input[placeholder="email@anda.com"]').value || '-';
  const keperluan = contactForm.querySelector('select').value;
  const pesan = contactForm.querySelector('textarea').value || '-';

  const subject = `Hubungi Kami: ${keperluan} - ${nama}`;
  const body = `Halo PT. Pandawa Mitra Indonesia,

Saya ingin mengajukan pertanyaan/pesan dengan detail berikut:

• Nama Lengkap: ${nama}
• No. HP / WhatsApp: ${phone}
• Email: ${email}
• Keperluan: ${keperluan}

Pesan:
${pesan}

Terima kasih.`;

  const mailtoUrl = `mailto:pandawa5.pmi@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  // Open default mail client
  window.location.href = mailtoUrl;

  // Reset form and show success toast
  contactForm.reset();
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4500);
});

// ─── Flow Steps: Animate on hover/scroll ───
const flowSteps = document.querySelectorAll('.flow-step');

const flowObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 100);
      flowObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

flowSteps.forEach((step, i) => {
  step.style.opacity = '0';
  step.style.transform = 'translateY(20px)';
  step.style.transition = `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`;
  flowObserver.observe(step);
});

// ─── Keunggulan Items stagger ───
const keunggulanItems = document.querySelectorAll('.keunggulan-item');
keunggulanItems.forEach((item, i) => {
  item.style.transitionDelay = `${i * 0.1}s`;
});

// ─── Number Counter for Stats ───
function animateCounter(el, target, duration = 1200) {
  const isNum = !isNaN(parseInt(target));
  if (!isNum) return;
  const start = 0;
  const end = parseInt(target);
  const range = end - start;
  const startTime = performance.now();

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + range * eased);
    el.textContent = current;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const statNums = document.querySelectorAll('.stat-num[data-target]');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      animateCounter(el, el.getAttribute('data-target'));
      statsObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => statsObserver.observe(el));

// ─── RACI Table Row Hover ───
const raciRows = document.querySelectorAll('.raci-table tbody tr');
raciRows.forEach(row => {
  row.addEventListener('mouseenter', () => {
    row.style.background = 'rgba(200,168,75,0.04)';
  });
  row.addEventListener('mouseleave', () => {
    row.style.background = '';
  });
});

// ─── Subtle Parallax on Hero ───
const heroBg = document.querySelector('.hero-bg-pattern');
window.addEventListener('scroll', () => {
  if (!heroBg) return;
  const scrollY = window.scrollY;
  if (scrollY < window.innerHeight) {
    heroBg.style.transform = `translateY(${scrollY * 0.3}px)`;
  }
}, { passive: true });

// ─── Org Card Entrance ───
const orgCards = document.querySelectorAll('.org-card');
const orgObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0) scale(1)';
      }, (i % 5) * 80);
      orgObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

orgCards.forEach((card, i) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(16px) scale(0.97)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  orgObserver.observe(card);
});

// ─── Current Year in Footer ───
const yearEls = document.querySelectorAll('.footer-bottom');
yearEls.forEach(el => {
  const text = el.innerHTML;
  el.innerHTML = text.replace('2026', new Date().getFullYear());
});

console.log('%cPT Pandawa Mitra Indonesia', 'color: #c8a84b; font-size: 18px; font-weight: bold;');
console.log('%cP3MI — Legal · Profesional · Bermartabat', 'color: #5a6480; font-size: 12px;');
