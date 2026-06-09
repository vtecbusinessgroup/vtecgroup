  // Mobile menu
  function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    const ham  = document.getElementById('hamburger');
    menu.classList.toggle('open');
    ham.classList.toggle('open');
  }

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

  // ====== SCROLL PROGRESS + BACK TO TOP ======
  const sp  = document.getElementById('scrollProgress');
  const btt = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    if (sp) sp.style.width = pct + '%';
    if (btt) btt.classList.toggle('show', h.scrollTop > 400);
  });
  if (btt) btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

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

  // Smooth nav hide on mobile menu outside click
  document.addEventListener('click', (e) => {
    const menu = document.getElementById('mobileMenu');
    const ham = document.getElementById('hamburger');
    if (!menu.contains(e.target) && !ham.contains(e.target)) {
      menu.classList.remove('open');
    }
  });

  // Ecosystem modal
  const ecoContent = {
    vtec: {
      badge: '● Parent Group',
      title: 'VTEC Business Group',
      body: [
        'VTEC Business Group is a modern, multi-service holding entity founded in October 2025 with a clear mandate: to build a connected ecosystem where education, trade, empowerment, and consultancy work as one engine for Kenyan economic progress.',
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
      badge: '● In Development &nbsp; ● Coming Soon',
      title: 'MILIKI App',
      body: [
        '<strong style="color:var(--green-bright);">Status: In Active Development — Not Yet Launched.</strong> The MILIKI App is currently being engineered behind the scenes by the VTEC Business Group team and is not yet publicly available.',
        'Once launched, MILIKI will serve as the flagship digital solution within the VTEC ecosystem — built to redefine asset ownership and wealth management for the modern Kenyan investor.',
        'Drawn from the Swahili word <em>miliki</em>, meaning "to own," the app is being designed to close an urgent gap in the market: the absence of a single, intuitive platform for tracking and acquiring diverse investments. From NSE equities and Money Market Funds to bonds and beyond, MILIKI will bring every asset class under one transparent, user-friendly dashboard.',
        'While InvestorMind Academy will continue providing the educational foundation — equipping users with the financial literacy and strategic insight to navigate the markets — the MILIKI App is being built as the practical engine that turns that knowledge into tangible ownership.',
        'Together, they will form the dual pillars of the VTEC portfolio: the "Alpha mentality" delivered through elite education, and the high-grade tools required to build, track, and grow a lasting financial legacy.',
        '<em style="color:rgba(255,255,255,0.55);">Want early access? Reach out via the contact form to join the MILIKI early-adopter list.</em>'
      ]
    }
  };

  const MILIKI_LOGO_DATA_URI = 'data:image/jpeg;base64,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';
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
