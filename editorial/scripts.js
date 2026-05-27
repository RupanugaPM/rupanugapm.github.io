(function () {
  'use strict';

  gsap.registerPlugin(ScrollTrigger);

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initNav() {
    const nav = document.getElementById('site-nav');
    if (!nav) return;

    ScrollTrigger.create({
      start: 'top -80',
      onUpdate: (self) => {
        nav.classList.toggle('nav-pill--scrolled', self.scroll() > 40);
      },
    });
  }

  function initHero() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('.hero-anim', { y: 48, opacity: 0, duration: 1, stagger: 0.12, delay: 0.15 });
  }

  function initRevealImages() {
    if (prefersReduced) return;

    document.querySelectorAll('.reveal-img').forEach((img) => {
      gsap.fromTo(
        img,
        { scale: 0.8, opacity: 0.5, filter: 'brightness(0.7)' },
        {
          scale: 1,
          opacity: 1,
          filter: 'brightness(1)',
          ease: 'none',
          scrollTrigger: {
            trigger: img,
            start: 'top 85%',
            end: 'bottom 15%',
            scrub: true,
          },
        }
      );

      gsap.to(img, {
        scale: 0.92,
        opacity: 0.25,
        filter: 'brightness(0.45)',
        ease: 'none',
        scrollTrigger: {
          trigger: img,
          start: 'center 30%',
          end: 'bottom top',
          scrub: true,
        },
      });
    });
  }

  function initScrubText() {
    if (prefersReduced) return;

    const block = document.querySelector('.scrub-block');
    if (!block) return;

    const words = block.querySelectorAll('.scrub-word');
    if (!words.length) return;

    gsap.to(words, {
      opacity: 1,
      stagger: 0.08,
      ease: 'none',
      scrollTrigger: {
        trigger: block,
        start: 'top 70%',
        end: 'bottom 40%',
        scrub: true,
      },
    });
  }

  function initPinGallery() {
    if (prefersReduced) return;

    const section = document.querySelector('.pin-gallery');
    if (!section) return;

    const items = section.querySelectorAll('.pin-item');
    if (!items.length) return;

    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: () => `+=${items.length * 320}`,
      pin: '.pin-title-col',
      anticipatePin: 1,
    });

    items.forEach((item, i) => {
      gsap.from(item, {
        y: 60,
        opacity: 0,
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1,
        },
      });
    });
  }

  function initExperience() {
    if (prefersReduced) return;

    gsap.from('.exp-anim', {
      y: 48,
      opacity: 0,
      duration: 0.85,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#experience',
        start: 'top 78%',
      },
    });
  }

  function initMilestones() {
    if (prefersReduced) return;

    gsap.from('.milestone-card', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#achievements',
        start: 'top 75%',
      },
    });
  }

  function initBentoHover() {
    document.querySelectorAll('.bento-card').forEach((card) => {
      const media = card.querySelector('.bento-media');
      if (!media) return;
      card.addEventListener('mouseenter', () => {
        gsap.to(media, { scale: 1.05, duration: 0.7, ease: 'power2.out' });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(media, { scale: 1, duration: 0.7, ease: 'power2.out' });
      });
    });
  }

  function initTestimonialCarousel() {
    const track = document.querySelector('.testimonial-track');
    const prev = document.querySelector('[data-carousel-prev]');
    const next = document.querySelector('[data-carousel-next]');
    if (!track || !prev || !next) return;

    let index = 0;
    const cards = track.querySelectorAll('.testimonial-card');

    function go(dir) {
      index = (index + dir + cards.length) % cards.length;
      gsap.to(track, {
        x: -index * (cards[0].offsetWidth + 24),
        duration: 0.6,
        ease: 'power3.inOut',
      });
    }

    prev.addEventListener('click', () => go(-1));
    next.addEventListener('click', () => go(1));
  }

  document.addEventListener('DOMContentLoaded', () => {
    initNav();
    if (!prefersReduced) {
      initHero();
      initRevealImages();
      initScrubText();
      initPinGallery();
      initExperience();
      initMilestones();
    }
    initBentoHover();
    initTestimonialCarousel();

    ScrollTrigger.refresh();
  });

  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
