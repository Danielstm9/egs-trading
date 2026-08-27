/* ============================================================
   EGS TRADING — Motion System
   GSAP + ScrollTrigger + Lenis

   Owns everything scroll-driven: header state, hero cinematic
   intro/pin, text mask reveals, section choreography, seam
   transitions and magnetic micro-interactions. Content, copy
   and colors are untouched — this file only orchestrates how
   the existing markup enters and moves.

   Progressive enhancement: if the vendored libs fail to load,
   or the visitor prefers reduced motion, everything just
   appears — no movement, no dependency on this file to be
   usable.
   ============================================================ */
(function () {
  'use strict';

  if (typeof window.gsap === 'undefined' || typeof window.ScrollTrigger === 'undefined') {
    document.querySelectorAll('.reveal-up, .reveal-line').forEach((el) => el.classList.add('visible'));
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  const header = document.getElementById('header');

  document.documentElement.classList.add('js-motion-active');

  /* ---------------------------------------------------------
     Reduced motion: reveal everything statically, skip motion
  --------------------------------------------------------- */
  if (reduceMotion) {
    document.querySelectorAll('.reveal-up, .reveal-line').forEach((el) => el.classList.add('visible'));
    if (header) {
      ScrollTrigger.create({
        trigger: document.documentElement,
        start: 'top -60',
        toggleClass: { targets: header, className: 'scrolled' },
      });
    }
    return;
  }

  const mm = gsap.matchMedia();
  const DESKTOP = '(min-width: 901px)';
  const MOBILE = '(max-width: 900px)';

  /* ---------------------------------------------------------
     Smooth scroll (Lenis) — desktop / non-touch only
  --------------------------------------------------------- */
  let lenis = null;
  if (!isTouch && typeof window.Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      autoRaf: false,
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    /* In-page anchors (nav, hero CTA, footer) must be routed through Lenis —
       otherwise a plain hash jump fights Lenis's own scroll interpolation. */
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href').slice(1);
        const target = id && document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target, { offset: -80, duration: 1.2 });
      });
    });
  }

  /* ---------------------------------------------------------
     Scroll progress bar
  --------------------------------------------------------- */
  const progressFill = document.querySelector('#scrollProgress span');
  if (progressFill) {
    gsap.set(progressFill, { scaleX: 0, transformOrigin: 'left center' });
    ScrollTrigger.create({
      start: 0,
      end: () => document.documentElement.scrollHeight - window.innerHeight,
      onUpdate: (self) => gsap.set(progressFill, { scaleX: self.progress }),
    });
  }

  /* ---------------------------------------------------------
     Header state on scroll
  --------------------------------------------------------- */
  if (header) {
    ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top -60',
      toggleClass: { targets: header, className: 'scrolled' },
    });
  }

  /* ---------------------------------------------------------
     Text reveal helpers — split into lines/words, rebuilt on
     language change so the mask animation keeps working after
     an FR/EN switch (which rewrites innerHTML).
  --------------------------------------------------------- */
  function killTriggersFor(el) {
    ScrollTrigger.getAll().forEach((st) => { if (st.trigger === el) st.kill(); });
  }

  function splitIntoLines(el) {
    const nodes = Array.from(el.childNodes);
    el.innerHTML = '';
    const newLine = () => {
      const inner = document.createElement('span');
      inner.className = 'line-inner';
      const line = document.createElement('span');
      line.className = 'line';
      line.appendChild(inner);
      return { line, inner };
    };
    let current = newLine();
    nodes.forEach((node) => {
      if (node.nodeName === 'BR') {
        el.appendChild(current.line);
        current = newLine();
      } else {
        current.inner.appendChild(node);
      }
    });
    el.appendChild(current.line);
  }

  function splitIntoWords(el) {
    const text = el.textContent;
    el.innerHTML = '';
    text.split(/(\s+)/).forEach((chunk) => {
      if (!chunk.trim()) { el.appendChild(document.createTextNode(chunk)); return; }
      const outer = document.createElement('span');
      outer.className = 'word';
      const inner = document.createElement('span');
      inner.className = 'word-inner';
      inner.textContent = chunk;
      outer.appendChild(inner);
      el.appendChild(outer);
    });
  }

  function lineReveal(el) {
    if (!el) return;
    killTriggersFor(el);
    gsap.set(el, { opacity: 1, y: 0 });
    splitIntoLines(el);
    const inners = el.querySelectorAll('.line-inner');
    gsap.set(inners, { yPercent: 110 });
    gsap.to(inners, {
      yPercent: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.09,
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
    });
  }

  function quoteReveal(el) {
    if (!el) return;
    killTriggersFor(el);
    splitIntoWords(el);
    const inners = el.querySelectorAll('.word-inner');
    gsap.fromTo(
      inners,
      { opacity: 0.15, yPercent: 35 },
      {
        opacity: 1,
        yPercent: 0,
        ease: 'none',
        stagger: 0.03,
        scrollTrigger: { trigger: el, start: 'top 78%', end: 'bottom 55%', scrub: 0.5 },
      }
    );
  }

  function setupTextReveals() {
    lineReveal(document.querySelector('.about__title'));
    lineReveal(document.querySelector('.approach__title'));
    lineReveal(document.querySelector('.contact__title'));
    quoteReveal(document.querySelector('.manifesto__quote'));
  }
  setupTextReveals();
  document.addEventListener('egs:langchange', () => {
    setupTextReveals();
    ScrollTrigger.refresh();
  });

  /* ---------------------------------------------------------
     Hero — cinematic intro (load) + scroll pin (desktop)
  --------------------------------------------------------- */
  const hero = document.querySelector('.hero');
  const heroInner = document.querySelector('.hero__inner');
  const heroCanvas = document.getElementById('heroCanvas');

  if (hero) {
    const heroIntro = gsap.timeline({ delay: 0.15 });
    heroIntro
      .set('.hero__title-row', { autoAlpha: 0, y: 46 })
      .set('.hero__scroll-cta, .hero__year', { autoAlpha: 0, y: 14 })
      .to('.hero__title-row', { autoAlpha: 1, y: 0, duration: 1.1, ease: 'power3.out', stagger: 0.12 })
      .to('.hero__scroll-cta, .hero__year', { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.1 }, '-=0.55');

    if (!isTouch && heroInner) {
      const heroX = gsap.quickTo(heroInner, 'x', { duration: 0.9, ease: 'power2.out' });
      window.addEventListener('mousemove', (e) => {
        heroX((e.clientX / window.innerWidth - 0.5) * 16);
      }, { passive: true });
    }

    mm.add(DESKTOP, () => {
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: '+=70%',
          scrub: 0.8,
          pin: true,
          pinSpacing: true,
        },
      });
      heroTl
        .to('.hero__title-row', { yPercent: -16, opacity: 0, filter: 'blur(6px)', ease: 'none', stagger: 0.05 }, 0)
        .to('.hero__footer', { opacity: 0, y: 30, ease: 'none' }, 0.05)
        .to('.hero__year', { opacity: 0, ease: 'none' }, 0);
      if (heroCanvas) heroTl.to(heroCanvas, { scale: 1.25, filter: 'brightness(0.55)', ease: 'none' }, 0);

      return () => heroTl.scrollTrigger && heroTl.scrollTrigger.kill();
    });

    mm.add(MOBILE, () => {
      const heroMobileTl = gsap.to(heroInner, {
        opacity: 0,
        y: -30,
        ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
      });
      return () => heroMobileTl.scrollTrigger && heroMobileTl.scrollTrigger.kill();
    });
  }

  /* ---------------------------------------------------------
     Generic reveal batch — everything not individually staged
  --------------------------------------------------------- */
  const individuallyHandled = new Set(
    document.querySelectorAll(
      '.about__title, .approach__title, .contact__title, .clients__grid, .principle, .market-card, .hero__title-row, .hero__scroll-cta, .hero__year'
    )
  );
  gsap.utils.toArray('.reveal-up, .reveal-line').forEach((el) => {
    if (individuallyHandled.has(el)) return;
    const isLine = el.classList.contains('reveal-line');
    gsap.fromTo(
      el,
      { autoAlpha: 0, y: isLine ? 40 : 24 },
      {
        autoAlpha: 1,
        y: 0,
        duration: isLine ? 0.85 : 0.75,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' },
      }
    );
  });

  gsap.fromTo(
    '.footer',
    { opacity: 0, y: 24 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: '.footer', start: 'top 92%' } }
  );

  /* ---------------------------------------------------------
     Activité — staggered principle rows + progress rail
  --------------------------------------------------------- */
  function rowReveal(selector) {
    gsap.utils.toArray(selector).forEach((row) => {
      gsap.fromTo(
        row,
        { autoAlpha: 0, y: 28, clipPath: 'inset(0 100% 0 0)' },
        {
          autoAlpha: 1,
          y: 0,
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: row, start: 'top 88%', toggleActions: 'play none none reverse' },
        }
      );
    });
  }
  rowReveal('.principle');

  const clientsGrid = document.querySelector('.clients__grid');
  if (clientsGrid) gsap.set(clientsGrid, { opacity: 1, y: 0 });
  rowReveal('.client-type');

  function initRail(sectionSelector, columnSelector) {
    const section = document.querySelector(sectionSelector);
    const rail = document.querySelector(`${columnSelector} .rail__fill`);
    if (!section || !rail) return;
    gsap.set(rail, { scaleY: 0, transformOrigin: 'top center' });
    ScrollTrigger.create({
      trigger: section,
      start: 'top 15%',
      end: 'bottom 85%',
      scrub: 0.4,
      onUpdate: (self) => gsap.set(rail, { scaleY: self.progress }),
    });
  }
  mm.add(DESKTOP, () => {
    initRail('.about', '.about__sticky');
    initRail('.approach', '.approach__left');
  });

  /* ---------------------------------------------------------
     Marchés — pinned choreography (desktop) / simple reveal (mobile)
  --------------------------------------------------------- */
  const marketsSection = document.querySelector('.markets');
  const marketCards = gsap.utils.toArray('.market-card');
  if (marketsSection && marketCards.length) {
    mm.add(DESKTOP, () => {
      gsap.set(marketCards, { clipPath: 'inset(0% 0% 100% 0%)', scale: 0.94 });
      gsap.set('.market-card__num', { opacity: 0, y: 16 });
      const marketsTl = gsap.timeline({
        scrollTrigger: {
          trigger: marketsSection,
          start: 'top top',
          end: '+=60%',
          scrub: 0.7,
          pin: true,
        },
      });
      marketsTl
        .to(marketCards, { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, ease: 'none', stagger: 0.15 }, 0)
        .to('.market-card__num', { opacity: 1, y: 0, ease: 'none', stagger: 0.15 }, 0.15);

      return () => marketsTl.scrollTrigger && marketsTl.scrollTrigger.kill();
    });

    mm.add(MOBILE, () => {
      marketCards.forEach((card) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 90%' } }
        );
      });
    });
  }

  /* ---------------------------------------------------------
     Seam lines — draw across as the boundary crosses view
  --------------------------------------------------------- */
  gsap.utils.toArray('.seam').forEach((seam) => {
    const line = seam.querySelector('span');
    if (!line) return;
    gsap.to(line, {
      width: '56%',
      ease: 'none',
      scrollTrigger: { trigger: seam, start: 'top 92%', end: 'top 45%', scrub: true },
    });
  });

  /* ---------------------------------------------------------
     Magnetic micro-interactions (desktop / non-touch only)
  --------------------------------------------------------- */
  if (!isTouch) {
    function magnetize(el, pull) {
      const qx = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
      const qy = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        qx((e.clientX - (r.left + r.width / 2)) * pull);
        qy((e.clientY - (r.top + r.height / 2)) * pull);
      });
      el.addEventListener('mouseleave', () => { qx(0); qy(0); });
    }
    document.querySelectorAll('.hero__scroll-cta, .form__submit').forEach((el) => magnetize(el, 0.28));
    document.querySelectorAll('.market-card__arrow').forEach((el) => magnetize(el, 0.35));
  }

  /* ---------------------------------------------------------
     Refresh triggers on font load / resize
  --------------------------------------------------------- */
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 200);
  });
})();
