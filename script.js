/* ============================================================
   EGS TRADING — Premium JS v4
   Canvas animation · Custom cursor · i18n · Scroll reveals
   Hero parallax · Stagger animations
   ============================================================ */

/* ---- Translations ---- */
const T = {
  fr: {
    'nav.activity': 'Activité',
    'nav.markets':  'Marchés',
    'nav.approach': 'Approche',
    'nav.contact':  'Contact',

    'hero.line1': 'Sourcing.',
    'hero.line2': 'Structuration.',
    'hero.line3': 'Exécution.',
    'hero.sub':   'EGS Trading — Négoce international FMCG &amp; commodities',
    'hero.cta':   'Découvrir',

    'intro.label': 'Introduction',
    'intro.text':  'EGS Trading intervient sur des opérations de négoce en produits de grande consommation et matières premières. La société développe, structure et réalise des transactions avec des producteurs, distributeurs et acheteurs professionnels.',

    'activity.label': 'Activité',
    'activity.title': 'L\'ensemble du<br>cycle de<br>transaction.',
    'activity.stat1': 'Fondée en',
    'activity.stat2': 'Commodities',

    'activity.p1h': 'Sourcing',
    'activity.p1t': 'Identification et sélection de sources d\'approvisionnement adaptées, en fonction des volumes, des spécifications et des conditions marché.',
    'activity.p2h': 'Commercialisation',
    'activity.p2t': 'Mise en place et suivi de débouchés auprès d\'acheteurs professionnels, principalement sur des volumes significatifs.',
    'activity.p3h': 'Structuration des opérations',
    'activity.p3t': 'Définition des paramètres de chaque transaction.',
    'activity.tag1': 'Prix',
    'activity.tag2': 'Volumes',
    'activity.tag3': 'Incoterms',
    'activity.tag4': 'Logistique',
    'activity.tag5': 'Conditions contractuelles',
    'activity.p4h': 'Conditions de paiement',
    'activity.p4t': 'Solutions adaptées selon les opérations : paiement comptant, différé, ou structuration spécifique selon les contreparties.',
    'activity.p5h': 'Exécution',
    'activity.p5t': 'Coordination et suivi des opérations jusqu\'à leur aboutissement.',

    'markets.label': 'Marchés',
    'markets.title': 'Nos marchés',
    'markets.m1h':  'FMCG',
    'markets.m1t':  'Boissons, produits alimentaires et autres références à forte rotation.',
    'markets.m1t1': 'Boissons',
    'markets.m1t2': 'Alimentaire',
    'markets.m1t3': 'Hygiène',
    'markets.m2h':  'Commodities',
    'markets.m2t':  'Produits agricoles et matières premières sélectionnées.',
    'markets.m2t1': 'Agricole',
    'markets.m2t2': 'Matières premières',
    'markets.m2t3': 'International',

    'clients.label': 'Nos clients',
    'clients.title': 'Avec qui<br>nous travaillons.',
    'clients.intro': 'EGS Trading travaille exclusivement avec des professionnels — entreprises, industriels et opérateurs qui nécessitent volumes, réactivité et coordination.',
    'clients.c1h':   'Producteurs &amp; industriels',
    'clients.c1t':   'Fabricants et producteurs cherchant à écouler des volumes sur de nouveaux marchés ou à optimiser leurs flux de vente.',
    'clients.c2h':   'Distributeurs &amp; grossistes',
    'clients.c2t':   'Opérateurs de distribution ayant des besoins d\'approvisionnement réguliers en produits FMCG ou matières premières.',
    'clients.c3h':   'Acheteurs professionnels',
    'clients.c3t':   'Entreprises intervenant sur des marchés internationaux, à la recherche de sources fiables et de conditions compétitives.',

    'contact.label': 'Contact',
    'contact.title': 'Pour toute<br>demande.',
    'form.name':       'Nom',
    'form.namePh':     'Votre nom',
    'form.company':    'Société',
    'form.companyPh':  'Votre société',
    'form.email':      'Email',
    'form.message':    'Message',
    'form.messagePh':  'Décrivez votre projet...',
    'form.send':       'Envoyer',
    'form.sending':    'Envoi…',
    'form.success':    'Message envoyé. Nous reviendrons vers vous rapidement.',
    'form.error':      'Une erreur est survenue. Veuillez réessayer ou écrire à contact@egs-trading.fr',

    'footer.tagline': 'Négoce international FMCG &amp; commodities',
    'footer.rights':  'Tous droits réservés.',
  },

  en: {
    'nav.activity': 'Activity',
    'nav.markets':  'Markets',
    'nav.approach': 'Approach',
    'nav.contact':  'Contact',

    'hero.line1': 'Sourcing.',
    'hero.line2': 'Structuring.',
    'hero.line3': 'Execution.',
    'hero.sub':   'EGS Trading — International FMCG &amp; commodities trading',
    'hero.cta':   'Discover',

    'intro.label': 'Introduction',
    'intro.text':  'EGS Trading operates in the trading of fast-moving consumer goods and raw materials. The company develops, structures and executes transactions with producers, distributors and professional buyers.',

    'activity.label': 'Activity',
    'activity.title': 'The full<br>transaction<br>cycle.',
    'activity.stat1': 'Founded',
    'activity.stat2': 'Commodities',

    'activity.p1h': 'Sourcing',
    'activity.p1t': 'Identification and selection of suitable supply sources, based on volumes, specifications and market conditions.',
    'activity.p2h': 'Sales',
    'activity.p2t': 'Development and management of outlets with professional buyers, primarily on significant volumes.',
    'activity.p3h': 'Deal structuring',
    'activity.p3t': 'Definition of each transaction\'s parameters.',
    'activity.tag1': 'Pricing',
    'activity.tag2': 'Volumes',
    'activity.tag3': 'Incoterms',
    'activity.tag4': 'Logistics',
    'activity.tag5': 'Contract terms',
    'activity.p4h': 'Payment terms',
    'activity.p4t': 'Tailored solutions per operation: upfront, deferred, or bespoke structuring based on counterparties.',
    'activity.p5h': 'Execution',
    'activity.p5t': 'Coordination and monitoring of operations through to completion.',

    'markets.label': 'Markets',
    'markets.title': 'Our markets',
    'markets.m1h':  'FMCG',
    'markets.m1t':  'Beverages, food products and other fast-moving references.',
    'markets.m1t1': 'Beverages',
    'markets.m1t2': 'Food',
    'markets.m1t3': 'Hygiene',
    'markets.m2h':  'Commodities',
    'markets.m2t':  'Selected agricultural products and raw materials.',
    'markets.m2t1': 'Agricultural',
    'markets.m2t2': 'Raw materials',
    'markets.m2t3': 'International',

    'clients.label': 'Our clients',
    'clients.title': 'Who we<br>work with.',
    'clients.intro': 'EGS Trading works exclusively with professionals — companies, manufacturers and operators requiring volume, agility and coordination.',
    'clients.c1h':   'Producers &amp; manufacturers',
    'clients.c1t':   'Producers and manufacturers looking to move volumes into new markets or optimise their sales flows.',
    'clients.c2h':   'Distributors &amp; wholesalers',
    'clients.c2t':   'Distribution operators with regular supply needs in FMCG products or raw materials.',
    'clients.c3h':   'Professional buyers',
    'clients.c3t':   'Companies operating in international markets, looking for reliable sources and competitive terms.',

    'contact.label': 'Contact',
    'contact.title': 'Get in<br>touch.',
    'form.name':       'Name',
    'form.namePh':     'Your name',
    'form.company':    'Company',
    'form.companyPh':  'Your company',
    'form.email':      'Email',
    'form.message':    'Message',
    'form.messagePh':  'Describe your project...',
    'form.send':       'Send',
    'form.sending':    'Sending…',
    'form.success':    'Message sent. We\'ll get back to you shortly.',
    'form.error':      'An error occurred. Please try again or write to contact@egs-trading.fr',

    'footer.tagline': 'International FMCG &amp; commodities trading',
    'footer.rights':  'All rights reserved.',
  }
};

/* ---- i18n engine ---- */
let lang = localStorage.getItem('egs-lang') || 'fr';

function applyLang(l) {
  lang = l;
  const t = T[l];
  document.documentElement.lang = l;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const k = el.dataset.i18n;
    if (t[k] !== undefined) el.innerHTML = t[k];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const k = el.dataset.i18nPlaceholder;
    if (t[k] !== undefined) el.placeholder = t[k];
  });
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === l));
  localStorage.setItem('egs-lang', l);
  document.dispatchEvent(new CustomEvent('egs:langchange'));
}

document.querySelectorAll('.lang-btn').forEach(b =>
  b.addEventListener('click', () => applyLang(b.dataset.lang))
);
applyLang(lang);

/* ---- Hero Canvas Animation ---- */
(function initCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H;

  const orbs = [
    { px: .18, py: .45, r: .42, rgb: [90, 31, 45],  alpha: .38, t: 0,   speed: .0018 },
    { px: .75, py: .28, r: .30, rgb: [157, 154, 154], alpha: .06, t: 2.1, speed: .0012 },
    { px: .50, py: .82, r: .35, rgb: [40,  12,  20],  alpha: .55, t: 4.5, speed: .0015 },
    { px: .88, py: .65, r: .22, rgb: [90,  31,  45],  alpha: .18, t: 1.2, speed: .002  },
  ];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#04040A';
    ctx.fillRect(0, 0, W, H);

    orbs.forEach(o => {
      o.t += o.speed;
      const x = (o.px + Math.sin(o.t * .7)  * .12) * W;
      const y = (o.py + Math.cos(o.t * .53) * .10) * H;
      const r = o.r * Math.min(W, H);
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0,  `rgba(${o.rgb},${o.alpha})`);
      g.addColorStop(.5, `rgba(${o.rgb},${o.alpha * .4})`);
      g.addColorStop(1,  `rgba(${o.rgb},0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
})();

/* ---- Custom Cursor ---- */
(function initCursor() {
  const cur = document.getElementById('cursor');
  const fol = document.getElementById('cursorFollower');
  if (!cur || window.innerWidth < 640) return;

  let mx = -100, my = -100, fx = -100, fy = -100;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cur.style.left = mx + 'px';
    cur.style.top  = my + 'px';
  });

  (function loop() {
    fx += (mx - fx) * .1;
    fy += (my - fy) * .1;
    fol.style.left = fx + 'px';
    fol.style.top  = fy + 'px';
    requestAnimationFrame(loop);
  })();

  document.querySelectorAll('a, button, .market-card, .form__submit, .principle').forEach(el => {
    el.addEventListener('mouseenter', () => cur.classList.add('cursor--hover'));
    el.addEventListener('mouseleave', () => cur.classList.remove('cursor--hover'));
  });
})();

/* Header scroll state + hero parallax are handled by motion.js (GSAP/ScrollTrigger)
   on pages that load it. Legal pages ship the header pre-scrolled in markup. */

/* ---- Burger menu ---- */
const burger   = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger?.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks?.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

/* Scroll reveal for .reveal-up / .reveal-line is owned by motion.js (GSAP ScrollTrigger)
   on pages that load it. On pages without motion.js, a no-JS-friendly fallback below
   makes sure content is never stuck invisible. */
if (!document.querySelector('script[src^="motion.js"]')) {
  document.querySelectorAll('.reveal-up, .reveal-line').forEach(el => el.classList.add('visible'));
}

/* ---- Contact form ---- */
const form   = document.getElementById('contactForm');
const notice = document.getElementById('formNotice');
const submit = document.getElementById('formSubmit');

form?.addEventListener('submit', e => {
  e.preventDefault();
  const t = T[lang];
  submit.disabled = true;
  notice.className = 'form__notice';
  notice.textContent = '';
  submit.querySelector('span').textContent = t['form.sending'];

  fetch('contact.php', { method: 'POST', body: new FormData(form) })
    .then(r => r.json())
    .then(data => {
      if (data.success) {
        notice.textContent = t['form.success'];
        notice.classList.add('success');
        form.reset();
      } else {
        notice.textContent = t['form.error'];
        notice.classList.add('error');
      }
    })
    .catch(() => {
      notice.textContent = t['form.error'];
      notice.classList.add('error');
    })
    .finally(() => {
      submit.disabled = false;
      submit.querySelector('span').textContent = t['form.send'];
    });
});
