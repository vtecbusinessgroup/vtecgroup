// WhatsApp/Call choice popover
  function toggleWaPopover(e) {
    e.preventDefault();
    e.stopPropagation();
    const popover = document.getElementById('waPopover');
    if (popover) popover.classList.toggle('open');
  }
  document.addEventListener('click', function (e) {
    const popover = document.getElementById('waPopover');
    const trigger = document.getElementById('waTrigger');
    if (popover && popover.classList.contains('open') && trigger && !trigger.contains(e.target)) {
      popover.classList.remove('open');
    }
  });

  // Mobile menu (left drawer)
  function toggleMenu(force) {
    const menu = document.getElementById('mobileMenu');
    const ham  = document.getElementById('hamburger');
    const backdrop = document.getElementById('mmBackdrop');
    const open = typeof force === 'boolean' ? force : !menu.classList.contains('open');
    menu.classList.toggle('open', open);
    ham.classList.toggle('open', open);
    backdrop.classList.toggle('open', open);
    menu.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
    if (!open) closeAllSubs();
  }

  // Dropdown rows inside the drawer (one open at a time)
  function closeAllSubs() {
    document.querySelectorAll('#mobileMenu .mm-toggle[aria-expanded="true"]')
      .forEach(b => b.setAttribute('aria-expanded', 'false'));
  }
  function toggleSub(btn) {
    const willOpen = btn.getAttribute('aria-expanded') !== 'true';
    closeAllSubs();
    btn.setAttribute('aria-expanded', String(willOpen));
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') toggleMenu(false);
  });

  // ====== PRELOADER FIREWORKS ======
  (function plFireworksInit(){
    const canvas = document.getElementById('plParticles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = 0, H = 0, rockets = [], sparks = [], raf = 0, running = true, last = 0, nextLaunch = 0;
    const COLORS = ['#d4af37', '#f0d76e', '#ffd966', '#27ae60', '#5fd38a', '#ffffff'];
    function resize(){
      W = canvas.width = canvas.offsetWidth * devicePixelRatio;
      H = canvas.height = canvas.offsetHeight * devicePixelRatio;
    }
    function launch(){
      const dpr = devicePixelRatio;
      rockets.push({
        x: (0.15 + Math.random()*0.7) * W,
        y: H + 5,
        tx: (0.15 + Math.random()*0.7) * W,
        ty: (0.15 + Math.random()*0.45) * H,
        vy: -(7 + Math.random()*3) * dpr,
        vx: 0,
        color: COLORS[Math.floor(Math.random()*COLORS.length)],
        trail: []
      });
      rockets[rockets.length-1].vx = (rockets[rockets.length-1].tx - rockets[rockets.length-1].x) / 60;
    }
    function explode(r){
      const dpr = devicePixelRatio;
      const count = 60 + Math.floor(Math.random()*40);
      const baseColor = r.color;
      const useMix = Math.random() < 0.5;
      for (let i=0;i<count;i++){
        const angle = (Math.PI*2) * (i/count) + Math.random()*0.05;
        const speed = (1.5 + Math.random()*3.5) * dpr;
        sparks.push({
          x: r.x, y: r.y,
          vx: Math.cos(angle)*speed,
          vy: Math.sin(angle)*speed,
          life: 60 + Math.random()*30,
          age: 0,
          color: useMix ? COLORS[Math.floor(Math.random()*COLORS.length)] : baseColor,
          r: (1 + Math.random()*1.5) * dpr
        });
      }
    }
    function tick(t){
      if (!running) return;
      const dt = t - last; last = t;
      // fade trail effect
      ctx.globalAlpha = 1;
      ctx.fillStyle = 'rgba(10,37,64,0.22)';
      ctx.fillRect(0,0,W,H);
      // launch new rockets
      if (t > nextLaunch){
        const n = 1 + Math.floor(Math.random()*2);
        for (let i=0;i<n;i++) setTimeout(launch, i*120);
        nextLaunch = t + 500 + Math.random()*600;
      }
      // rockets
      for (let i=rockets.length-1; i>=0; i--){
        const r = rockets[i];
        r.x += r.vx; r.y += r.vy;
        r.vy += 0.08 * devicePixelRatio;
        r.trail.push({x:r.x, y:r.y});
        if (r.trail.length > 8) r.trail.shift();
        // draw trail
        for (let j=0;j<r.trail.length;j++){
          const tp = r.trail[j];
          ctx.beginPath();
          ctx.globalAlpha = j/r.trail.length * 0.7;
          ctx.fillStyle = r.color;
          ctx.shadowColor = r.color; ctx.shadowBlur = 8;
          ctx.arc(tp.x, tp.y, 1.6*devicePixelRatio, 0, Math.PI*2);
          ctx.fill();
        }
        if (r.y <= r.ty || r.vy >= 0){
          explode(r); rockets.splice(i,1);
        }
      }
      // sparks
      ctx.shadowBlur = 10;
      for (let i=sparks.length-1;i>=0;i--){
        const s = sparks[i];
        s.age++;
        s.x += s.vx; s.y += s.vy;
        s.vy += 0.05 * devicePixelRatio;
        s.vx *= 0.99; s.vy *= 0.99;
        const lifeRatio = 1 - s.age/s.life;
        if (lifeRatio <= 0) { sparks.splice(i,1); continue; }
        ctx.globalAlpha = Math.max(0, lifeRatio);
        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * lifeRatio, 0, Math.PI*2);
        ctx.fill();
      }
      ctx.globalAlpha = 1; ctx.shadowBlur = 0;
      raf = requestAnimationFrame(tick);
    }
    resize();
    // initial volley
    launch(); setTimeout(launch, 200); setTimeout(launch, 450);
    raf = requestAnimationFrame(tick);
    window.addEventListener('resize', resize);
    window._stopPlParticles = () => { running = false; cancelAnimationFrame(raf); };
  })();

  // ====== PRELOADER (3.5s splash) ======
  (function preloaderGuard(){
    let hidden = false;
    const hidePreloader = () => {
      if (hidden) return;
      hidden = true;
      const pl = document.getElementById('preloader');
      if (pl) {
        pl.classList.add('hide');
        setTimeout(() => { try { window._stopPlParticles && window._stopPlParticles(); } catch(_){} }, 900);
      }
      try { animateCounters(); } catch(_) {}
      // Let the outer app shell (e.g. the floating chat button) know the
      // splash screen is gone and the real homepage is now visible.
      try { window.parent.postMessage({ type: 'vtec-preloader-done' }, '*'); } catch(_){}
      try { window.dispatchEvent(new CustomEvent('vtec-preloader-done')); } catch(_){}
    };
    setTimeout(hidePreloader, 3500);
    window.addEventListener('load', () => setTimeout(hidePreloader, 3500));
    if (document.readyState === 'complete') setTimeout(hidePreloader, 3500);
  })();

  // ====== HERO COUNTERS ======
  function animateCounters() {
    document.querySelectorAll('.count').forEach(el => {
      const from = parseInt(el.dataset.from || '0', 10);
      const to   = parseInt(el.dataset.to   || '0', 10);
      const dur  = 2000; const start = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(from + (to - from) * eased);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }

  // ====== HERO PARTICLES (15 floating bubbles) ======
  (function buildParticles(){
    const root = document.getElementById('heroParticles');
    if (!root) return;
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { root.style.display = 'none'; return; }
    const count = 15;
    for (let i = 0; i < count; i++) {
      const s = document.createElement('span');
      const size = 4 + Math.random() * 8;
      const isGreen = i % 4 !== 0;
      s.style.setProperty('--x', (Math.random() * 100) + 'vw');
      s.style.width = s.style.height = size + 'px';
      s.style.background = isGreen ? 'rgba(39,174,96,0.25)' : 'rgba(255,255,255,0.15)';
      s.style.setProperty('--op', isGreen ? '0.25' : '0.15');
      s.style.setProperty('--dx', (Math.random() * 60 - 30) + 'px');
      s.style.animationDuration = (6 + Math.random() * 8) + 's';
      s.style.animationDelay = (Math.random() * 6) + 's';
      root.appendChild(s);
    }
  })();

  // ====== SCROLL PROGRESS ======
  const sp  = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    if (sp) sp.style.width = pct + '%';
  });

  // ====== Web3Forms ======
  const WEB3_KEY = 'd054593e-8ba0-4263-9444-e84b3aa03d62';
  const WEB3_ENDPOINT = 'https://api.web3forms.com/submit';

  async function joinWaitlist(e) {
    e.preventDefault();
    const btn = document.getElementById('wlBtn');
    const inp = document.getElementById('wlEmail');
    const status = document.getElementById('wlStatus');
    const original = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Joining…';
    status.textContent = '';
    try {
      const res = await fetch(WEB3_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3_KEY,
          subject: 'New InvestorMind Academy Waitlist Signup',
          from_name: 'InvestorMind Waitlist',
          email: inp.value,
          message: 'New waitlist signup: ' + inp.value
        })
      });
      const result = await res.json();
      if (result.success) {
        status.style.color = '#27ae60';
        status.textContent = "You're on the waitlist! We'll be in touch.";
        inp.value = '';
      } else {
        status.style.color = '#c0392b';
        status.textContent = 'Something went wrong. Please try again.';
      }
    } catch (err) {
      status.style.color = '#c0392b';
      status.textContent = 'Something went wrong. Please try again.';
    } finally {
      btn.textContent = original;
      btn.disabled = false;
    }
    return false;
  }

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 100);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(r => observer.observe(r));

  // Contact form handler — Web3Forms
  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('.form-submit');
    const status = document.getElementById('formStatus');
    const original = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Sending…';
    status.textContent = '';
    try {
      const fd = new FormData(form);
      const res = await fetch(WEB3_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3_KEY,
          subject: 'New VTEC Website Enquiry',
          name: fd.get('name'),
          email: fd.get('email'),
          interested_in: fd.get('interest'),
          message: fd.get('message')
        })
      });
      const result = await res.json();
      if (result.success) {
        status.style.color = '#27ae60';
        status.textContent = 'Message sent successfully!';
        form.reset();
      } else {
        status.style.color = '#c0392b';
        status.textContent = 'Could not send. Please try again.';
      }
    } catch (err) {
      status.style.color = '#c0392b';
      status.textContent = 'Could not send. Please try again.';
    } finally {
      setTimeout(() => {
        btn.disabled = false;
        btn.textContent = original;
      }, 2000);
    }
  }

  // Close drawer on outside click
  document.addEventListener('click', (e) => {
    const menu = document.getElementById('mobileMenu');
    const ham = document.getElementById('hamburger');
    if (menu.classList.contains('open') && !menu.contains(e.target) && !ham.contains(e.target)) {
      toggleMenu(false);
    }
  });

  // Ecosystem modal
  const ecoContent = {
    vtec: {
      badge: '● Parent Group',
      title: 'VTEC Business Group',
      body: [
        'VTEC Business Group is a modern, multi-service brand founded in October 2025 with a clear mandate: to build a connected ecosystem where education, trade, empowerment, and consultancy work as one engine for Kenyan economic progress.',
        'Operating as the parent organization, VTEC houses three core sub-brands — InvestorMind Academy, VTEC Consultancy Services, and VTEC Retail Services — alongside flagship digital platforms like the MILIKI App. Each pillar is designed to solve a real-world challenge for the Kenyan investor, entrepreneur, and consumer.',
        'Anchored on the philosophy of "Empowering Kenya. One Venture at a Time," VTEC is built to scale into a continental brand — combining local insight with global standards of operation, governance, and innovation.'
      ]
    },
    academy: {
      badge: '● Education Arm',
      title: 'InvestorMind Academy',
      body: [
        'InvestorMind Academy is the educational backbone of the VTEC ecosystem — a learning platform engineered to transform everyday Kenyans into informed, disciplined, and confident investors.',
        'Through structured programs, mentorship, and market-driven content, the Academy demystifies the world of investing: from the Nairobi Securities Exchange (NSE) and Money Market Funds, to bonds, real estate, and emerging digital assets. It champions what we call the "Alpha mentality" — a mindset rooted in financial literacy, patience, strategy, and long-term wealth creation.',
        'More than a course provider, InvestorMind serves as the upstream teacher of the ecosystem — preparing users with the knowledge they later activate through tools like the MILIKI App.'
      ]
    },
    consultancy: {
      badge: '● Advisory Arm',
      title: 'VTEC Consultancy Services',
      body: [
        'VTEC Consultancy Services is the strategic advisory arm of the group — partnering with founders, SMEs, corporates, and institutions to bridge the gap between vision and execution.',
        'Our consultancy spans business strategy, market entry, brand positioning, operational efficiency, financial structuring, and growth planning. We blend boardroom-grade frameworks with sharp, on-the-ground Kenyan market intelligence to deliver advice that actually moves the needle.',
        'Whether guiding an early-stage venture toward product-market fit or helping an established business unlock the next phase of growth, VTEC Consultancy positions itself as the trusted partner for organizations that want to build with intention.'
      ]
    },
    miliki: {
      badge: '● Live Now',
      title: 'MILIKI App',
      body: [
        '<strong style="color:var(--green-bright);">Status: Live and Active.</strong> The MILIKI App is up and running, built by the VTEC Business Group team and available to Kenyan users today.',
        'MILIKI serves as the flagship digital solution within the VTEC ecosystem — built to redefine asset ownership and wealth management for the modern Kenyan investor.',
        'Drawn from the Swahili word <em>miliki</em>, meaning "to own," the app closes an urgent gap in the market: the absence of a single, intuitive platform for tracking and acquiring diverse investments. From NSE equities and Money Market Funds to bonds and beyond, MILIKI brings every asset class under one transparent, user-friendly dashboard.',
        'While InvestorMind Academy continues providing the educational foundation — equipping users with the financial literacy and strategic insight to navigate the markets — the MILIKI App is the practical engine that turns that knowledge into tangible ownership.',
        'Together, they form the dual pillars of the VTEC portfolio: the "Alpha mentality" delivered through elite education, and the high-grade tools required to build, track, and grow a lasting financial legacy.',
        '<em style="color:rgba(255,255,255,0.55);">Ready to get started? Open the MILIKI App to explore your Portfolio, Budget, and Goals tools.</em>'
      ]
    }
  };

  const MILIKI_LOGO_DATA_URI = 'miliki-app-logo.jpg';
  // Bind MILIKI logo to the business-arms card on load
  (function(){
    const cardImg = document.getElementById('milikiLogoCard');
    if (cardImg) cardImg.src = MILIKI_LOGO_DATA_URI;
  })();

  function openEco(key) {
    const data = ecoContent[key];
    if (!data) return;
    const modal = document.getElementById('ecoModal');
    const card = document.getElementById('ecoModalCard');
    const badge = document.getElementById('ecoBadge');
    const logo = document.getElementById('ecoModalLogo');
    const footer = document.getElementById('ecoModalFooter');
    badge.innerHTML = data.badge;
    badge.hidden = false;
    badge.style.color = key === 'miliki' ? 'var(--green-bright)' : 'var(--gold)';
    document.getElementById('ecoTitle').textContent = data.title;
    document.getElementById('ecoBody').innerHTML = data.body.map(p => '<p>' + p + '</p>').join('');
    if (key === 'miliki') {
      card.classList.add('miliki-modal');
      logo.src = MILIKI_LOGO_DATA_URI;
      logo.className = 'miliki-modal-logo';
      logo.hidden = false;
      footer.hidden = false;
    } else {
      card.classList.remove('miliki-modal');
      logo.hidden = true;
      logo.removeAttribute('src');
      footer.hidden = true;
    }
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeEco() {
    const modal = document.getElementById('ecoModal');
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeEco();
  });
  // Expose for inline handlers
  window.openEco = openEco;
  window.closeEco = closeEco;
  // Cookie consent banner
  (function(){
    try {
      if (!localStorage.getItem('vtec_cookie_consent')) {
        var b = document.getElementById('cookieBanner');
        if (b) setTimeout(function(){ b.classList.add('show'); }, 800);
      }
    } catch(e){}
  })();
  window.dismissCookies = function(accepted) {
    try { localStorage.setItem('vtec_cookie_consent', accepted ? 'accepted' : 'declined'); } catch(e){}
    var b = document.getElementById('cookieBanner');
    if (b) b.classList.remove('show');
  };

/* ─────────────────────────────────── */

  (function(){
    var overlay = document.getElementById('our-story-overlay');
    function openStory(){
      if(overlay) {
        overlay.classList.add('open');
        overlay.style.display = 'block';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.zIndex = '100000';
      }
      document.body.classList.add('os-open');
      window.scrollTo(0,0);
    }
    function closeStory(){
      if(overlay) {
        overlay.classList.remove('open');
        overlay.style.display = 'none';
      }
      document.body.classList.remove('os-open');
    }
    function syncFromHash(){
      if (location.hash === '#/our-story') openStory(); else closeStory();
    }
    // Intercept any link to /our-story
    document.addEventListener('click', function(e){
      var a = e.target.closest && e.target.closest('a');
      if (!a) return;
      var href = a.getAttribute('href') || '';
      if (href === '/our-story' || href === '#/our-story' || href.endsWith('/our-story')) {
        e.preventDefault();
        if (location.hash !== '#/our-story') location.hash = '#/our-story';
        openStory();
      }
    });
    window.addEventListener('hashchange', syncFromHash);
    // When inside the iframe a link uses target=_top to "/", browser will navigate parent away.
    // To keep single-file behavior, intercept iframe load and patch its back/home links to just close.
    var frame = document.getElementById('our-story-frame');
    frame.addEventListener('load', function(){
      try {
        var doc = frame.contentDocument;
        if (!doc) return;
        doc.querySelectorAll('a').forEach(function(a){
          var h = a.getAttribute('href') || '';
          if (h === '/' || h === '/#' || h === '#') {
            a.addEventListener('click', function(ev){
              ev.preventDefault();
              parent.location.hash = '';
              parent.history.replaceState(null,'',parent.location.pathname + parent.location.search);
              closeStory();
            });
          } else if (h.indexOf('#') === 0) {
            // section anchors → close overlay and scroll to that section in parent
            a.addEventListener('click', function(ev){
              ev.preventDefault();
              var target = h;
              parent.location.hash = '';
              parent.history.replaceState(null,'',parent.location.pathname + parent.location.search);
              closeStory();
              setTimeout(function(){
                var el = parent.document.querySelector(target);
                if (el) el.scrollIntoView({behavior:'smooth'});
              }, 50);
            });
          }
        });
      } catch(e){}
    });
    syncFromHash();
  })();

/* ─────────────────────────────────── */

  (function(){
    document.querySelectorAll('[data-diagnostic-link]').forEach(function(link){
      link.addEventListener('click', function(e){
        e.preventDefault();
        var path = '/business-diagnostic';
        try {
          if (window.parent && window.parent !== window) {
            window.parent.location.href = path;
            return;
          }
        } catch(err) {}
        window.location.href = path;
      });
    });
  })();

/* ─────────────────────────────────── */

  // Live Nairobi (EAT, fixed UTC+3, no DST) clock badge in nav
  (function () {
    const el = document.getElementById('navClockTime');
    if (!el) return;
    function update() {
      const now = new Date();
      const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
      const nairobi = new Date(utcMs + 3 * 3600000);
      const h = String(nairobi.getHours()).padStart(2, '0');
      const m = String(nairobi.getMinutes()).padStart(2, '0');
      el.textContent = h + ':' + m + ' EAT';
    }
    update();
    setInterval(update, 30000);
  })();

  // Nav condenses on scroll — premium SaaS pattern
  (function () {
    const nav = document.querySelector('nav');
    if (!nav) return;
    let ticking = false;
    function apply() {
      if (window.scrollY > 60) nav.classList.add('nav-scrolled');
      else nav.classList.remove('nav-scrolled');
      ticking = false;
    }
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(apply);
        ticking = true;
      }
    }
    apply();
    window.addEventListener('scroll', onScroll, { passive: true });
  })();

// Footer link card — automatic entrance when it scrolls into view (no tap needed)
(function () {
  const card = document.querySelector('.footer-links');
  if (!card) return;
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  card.classList.add('fl-armed');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        card.classList.add('fl-in');
        io.disconnect();
      }
    });
  }, { threshold: 0.15 });
  io.observe(card);
})();
