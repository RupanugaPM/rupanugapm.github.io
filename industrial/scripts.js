/**
 * Tactical telemetry — nav, scroll spy, live clock, unit metadata
 */

(function () {
  'use strict';

  const pad = (n) => String(n).padStart(2, '0');

  function updateClock() {
    const el = document.getElementById('sys-clock');
    if (!el) return;
    const now = new Date();
    el.textContent = `${now.getUTCFullYear()}.${pad(now.getUTCMonth() + 1)}.${pad(now.getUTCDate())} // ${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())}:${pad(now.getUTCSeconds())} UTC`;
  }

  function initYear() {
    const y = document.getElementById('currentYear');
    if (y) y.textContent = new Date().getFullYear();
  }

  function initMobileNav() {
    const toggle = document.getElementById('mobile-menu');
    const wrap = document.getElementById('nav-links-wrap');
    if (!toggle || !wrap) return;

    toggle.addEventListener('click', () => {
      const open = wrap.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
      toggle.textContent = open ? '[ CLOSE ]' : '[ MENU ]';
    });

    document.querySelectorAll('#nav-links a, .nav-logo').forEach((el) => {
      el.addEventListener('click', () => {
        wrap.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = '[ MENU ]';
      });
    });
  }

  function initScrollSpy() {
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('#nav-links a');

    if (!navbar || !sections.length) return;

    const offset = () => navbar.offsetHeight + 40;

    function setActive(id) {
      navLinks.forEach((a) => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });
    }

    window.addEventListener('scroll', () => {
      const pos = window.pageYOffset + offset();
      let current = 'hero';

      sections.forEach((section) => {
        if (pos >= section.offsetTop) {
          current = section.id;
        }
      });

      setActive(current);
    }, { passive: true });
  }

  function initSmoothScroll() {
    const navbar = document.getElementById('navbar');

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (!targetId || targetId === '#') return;

        const target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();
        const navH = navbar ? navbar.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.pageYOffset - navH;

        window.scrollTo({ top, behavior: 'smooth' });

        if (history.pushState) {
          history.pushState(null, '', targetId);
        }
      });
    });
  }

  function initCoords() {
    const el = document.getElementById('hero-coords');
    if (!el) return;

    const lat = (22.98 + Math.random() * 0.01).toFixed(4);
    const lon = (88.42 + Math.random() * 0.01).toFixed(4);
    el.textContent = `${lat}°N // ${lon}°E // NIT-DGP`;
  }

  document.addEventListener('DOMContentLoaded', () => {
    initYear();
    updateClock();
    setInterval(updateClock, 1000);
    initMobileNav();
    initScrollSpy();
    initSmoothScroll();
    initCoords();
    window.dispatchEvent(new Event('scroll'));
  });
})();
