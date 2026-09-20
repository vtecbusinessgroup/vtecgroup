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

  // Mobile menu
  function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    const ham  = document.getElementById('hamburger');
    const backdrop = document.getElementById('mmBackdrop');
    menu.classList.toggle('open');
    ham.classList.toggle('open');
    backdrop.classList.toggle('open');
    document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
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
      overlay.classList.add('open');
      document.body.classList.add('os-open');
      window.scrollTo(0,0);
    }
    function closeStory(){
      overlay.classList.remove('open');
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
    var TERMS_HTML = ''
      + '<div class="legal-label">Legal</div>'
      + '<h1>Terms of Service</h1>'
      + '<p class="legal-meta">Effective Date: 1 January 2026 &nbsp;|&nbsp; Last Updated: April 2026</p>'

      + '<h2>1. Introduction</h2>'
      + '<p>Welcome to VTEC Business Group. These Terms of Service govern your access to and use of the VTEC Business Group website, products, programmes, and any related digital services that we operate. By browsing this website, registering for any of our offerings, or otherwise interacting with our platforms, you confirm that you have read, understood, and agreed to be bound by these Terms.</p>'
      + '<p>If you do not agree with any part of these Terms, kindly discontinue use of the website immediately. We may update these Terms from time to time, and the updated version will become effective once published on this page.</p>'

      + '<h2>2. About VTEC Business Group</h2>'
      + '<p>VTEC Business Group is a Kenyan enterprise that operates a portfolio of ventures across financial education, digital media, technology, and entrepreneurship. Our mission is to empower individuals and organisations through trusted information, professional services, and inclusive growth opportunities.</p>'

      + '<h2>3. Eligibility</h2>'
      + '<p>You must be at least eighteen years of age to register for paid services or programmes. By using this website you represent that you meet this requirement and that all information you submit is accurate, current, and lawful.</p>'

      + '<h2>4. Use of the Website</h2>'
      + '<p>You agree to use the website only for lawful purposes and in a manner that does not infringe the rights of, restrict, or inhibit anyone else from using or enjoying the website. The following activities are strictly prohibited:</p>'
      + '<ul>'
      + '<li>Attempting to gain unauthorised access to any part of the website, our servers, or related infrastructure.</li>'
      + '<li>Uploading or transmitting any virus, malicious code, or harmful component.</li>'
      + '<li>Copying, reproducing, or redistributing any part of our content for commercial purposes without prior written permission.</li>'
      + '<li>Using the website to harass, defame, or impersonate any person or entity.</li>'
      + '</ul>'

      + '<h2>5. Intellectual Property</h2>'
      + '<p>All content on this website, including text, graphics, logos, photographs, videos, course materials, and software, is the property of VTEC Business Group or its licensors and is protected by applicable intellectual property laws. You may view and download content for personal, non commercial use only. Any other use requires our prior written consent.</p>'

      + '<h2>6. Programmes, Courses, and Paid Services</h2>'
      + '<p>Where you enrol in a programme, course, mentorship, or any other paid service, additional terms specific to that offering may apply. You agree to honour all enrolment requirements, payment schedules, and conduct standards that we communicate in writing or through your participant agreement.</p>'

      + '<h2>7. Payments and Refunds</h2>'
      + '<p>All fees are quoted in Kenyan Shillings unless stated otherwise. Payments made for digital downloads, live events, or completed coaching sessions are generally non refundable. Where a refund is permitted, the applicable terms and timelines will be outlined at the point of purchase or on the relevant programme page.</p>'

      + '<h2>8. Third Party Links and Services</h2>'
      + '<p>Our website may contain links to third party websites or integrate third party tools for analytics, payments, communication, or social engagement. VTEC Business Group does not control these external services and is not responsible for their content, security, or privacy practices. You access such third party services at your own risk.</p>'

      + '<h2>9. Disclaimers</h2>'
      + '<p>The information provided on this website and within our programmes is for general educational and informational purposes only. While we make every reasonable effort to ensure accuracy, we do not guarantee that the content is complete, current, or suitable for any specific purpose. Nothing on this website constitutes professional financial, legal, tax, or investment advice. You should consult a qualified professional before making any decision based on the information presented.</p>'

      + '<h2>10. Limitation of Liability</h2>'
      + '<p>To the maximum extent permitted by law, VTEC Business Group, its directors, employees, partners, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of the website or any of our services. Your sole remedy for dissatisfaction with the website is to discontinue its use.</p>'

      + '<h2>11. Indemnity</h2>'
      + '<p>You agree to indemnify and hold VTEC Business Group harmless from any claim, demand, loss, or expense arising out of your breach of these Terms, your misuse of the website, or your violation of any law or third party right.</p>'

      + '<h2>12. Termination</h2>'
      + '<p>We reserve the right to suspend or terminate your access to the website or any of our services at our sole discretion, without notice, where we reasonably believe that you have breached these Terms or engaged in conduct that may harm our business, our community, or other users.</p>'

      + '<h2>13. Governing Law</h2>'
      + '<p>These Terms are governed by and construed in accordance with the laws of the Republic of Kenya. Any dispute arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the competent courts of Kenya.</p>'

      + '<h2>14. Contact Us</h2>'
      + '<p>If you have any questions, concerns, or feedback regarding these Terms of Service, please reach out to us at <a href="mailto:info@vtecgroup.co.ke">info@vtecgroup.co.ke</a>. We aim to respond to all queries within five business days.</p>'

      + '<div class="legal-footer">© 2026 VTEC Business Group. All rights reserved.</div>';

    var PRIVACY_HTML = ''
      + '<div class="legal-label">Legal</div>'
      + '<h1>Privacy Policy</h1>'
      + '<p class="legal-meta">Effective Date: 1 January 2026 &nbsp;|&nbsp; Last Updated: April 2026</p>'

      + '<h2>1. Our Commitment to Your Privacy</h2>'
      + '<p>VTEC Business Group respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, store, and safeguard your data when you visit our website, enrol in our programmes, or otherwise interact with our digital services.</p>'
      + '<p>By using our website, you consent to the practices described in this Policy. If you do not agree with any part of this Policy, please refrain from using our services.</p>'

      + '<h2>2. Information We Collect</h2>'
      + '<p>We may collect the following categories of information:</p>'
      + '<h3>Personal Information You Provide</h3>'
      + '<p>This includes details such as your full name, email address, telephone number, postal address, payment information, and any other information you submit through our contact forms, enrolment pages, or programme registrations.</p>'
      + '<h3>Information We Collect Automatically</h3>'
      + '<p>When you visit the website, we may automatically collect technical data such as your device type, browser version, operating system, IP address, referral source, pages visited, and time spent on each page. This information helps us understand how visitors engage with our content.</p>'
      + '<h3>Information from Third Parties</h3>'
      + '<p>We may receive information about you from analytics partners, advertising platforms, payment processors, and social media services where you choose to interact with us through those channels.</p>'

      + '<h2>3. How We Use Your Information</h2>'
      + '<p>We use the information we collect for purposes that include, but are not limited to:</p>'
      + '<ul>'
      + '<li>Providing, operating, and improving our website, programmes, and services.</li>'
      + '<li>Processing your enrolment, payment, and access to course or membership materials.</li>'
      + '<li>Responding to your enquiries, support requests, and feedback.</li>'
      + '<li>Sending you transactional messages, updates, newsletters, and marketing communications where you have opted in.</li>'
      + '<li>Personalising your experience and recommending content or programmes that may be relevant to you.</li>'
      + '<li>Conducting research, analytics, and reporting to improve our offerings.</li>'
      + '<li>Meeting our legal, regulatory, accounting, and reporting obligations.</li>'
      + '</ul>'

      + '<h2>4. Lawful Basis for Processing</h2>'
      + '<p>We process your personal data on one or more of the following lawful bases: your consent, the performance of a contract with you, compliance with a legal obligation, or our legitimate business interests where these do not override your fundamental rights and freedoms.</p>'

      + '<h2>5. Sharing of Information</h2>'
      + '<p>We do not sell your personal information. We may share information with trusted service providers who help us operate our business, such as cloud hosting partners, payment processors, email service providers, and analytics platforms. These partners are required to maintain the confidentiality and security of your information and to use it only for the purposes we specify.</p>'
      + '<p>We may also disclose your information where required by law, court order, or other legal process, or to protect our rights, property, or safety, or that of our users and the public.</p>'

      + '<h2>6. International Data Transfers</h2>'
      + '<p>Some of our service providers may store or process your information outside Kenya. Where this occurs, we take reasonable steps to ensure that appropriate safeguards are in place to protect your information in accordance with this Policy and applicable data protection laws.</p>'

      + '<h2>7. Data Retention</h2>'
      + '<p>We retain your personal information only for as long as is necessary to fulfil the purposes outlined in this Policy, to comply with our legal obligations, to resolve disputes, and to enforce our agreements. Once data is no longer required, we securely delete or anonymise it.</p>'

      + '<h2>8. Your Rights</h2>'
      + '<p>Subject to applicable law, you have the right to:</p>'
      + '<ul>'
      + '<li>Request access to the personal information we hold about you.</li>'
      + '<li>Request correction of any inaccurate or incomplete information.</li>'
      + '<li>Request deletion of your personal information where there is no overriding lawful reason for us to keep it.</li>'
      + '<li>Object to or restrict certain types of processing.</li>'
      + '<li>Withdraw your consent at any time, without affecting the lawfulness of processing carried out before withdrawal.</li>'
      + '<li>Lodge a complaint with the relevant data protection authority.</li>'
      + '</ul>'
      + '<p>To exercise any of these rights, please contact us using the details provided at the end of this Policy.</p>'

      + '<h2>9. Security of Your Information</h2>'
      + '<p>We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. While we strive to use commercially acceptable means to safeguard your data, no method of transmission over the internet or electronic storage is one hundred percent secure, and we cannot guarantee absolute security.</p>'

      + '<h2>10. Children\u2019s Privacy</h2>'
      + '<p>Our services are not directed to individuals under the age of eighteen, and we do not knowingly collect personal information from minors. If you believe that a minor has provided us with personal information, please contact us so we can take appropriate action.</p>'

      + '<h2>11. Updates to This Policy</h2>'
      + '<p>We may update this Privacy Policy from time to time to reflect changes in our practices, technologies, or legal requirements. The updated version will be posted on this page with a revised effective date. We encourage you to review this Policy periodically.</p>'

      + '<h2>12. Contact Us</h2>'
      + '<p>If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us at <a href="mailto:info@vtecgroup.co.ke">info@vtecgroup.co.ke</a>. We will respond to your request within a reasonable timeframe.</p>'

      + '<div class="legal-footer">© 2026 VTEC Business Group. All rights reserved.</div>';

    var COOKIE_HTML = ''
      + '<div class="legal-label">Legal</div>'
      + '<h1>Cookie Policy</h1>'
      + '<p class="legal-meta">Effective Date: 1 January 2026 &nbsp;|&nbsp; Last Updated: April 2026</p>'

      + '<h2>1. Introduction</h2>'
      + '<p>This Cookie Policy explains how VTEC Business Group uses cookies and similar tracking technologies on our website. It should be read together with our Privacy Policy, which provides further information on how we collect and use personal data.</p>'
      + '<p>By continuing to use our website, you consent to the use of cookies as described in this Policy. You may adjust your preferences at any time through your browser settings.</p>'

      + '<h2>2. What Are Cookies</h2>'
      + '<p>Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work efficiently, to remember your preferences, and to provide reporting information to website owners. Cookies can be either session based, which expire when you close your browser, or persistent, which remain on your device until they expire or are deleted.</p>'

      + '<h2>3. Types of Cookies We Use</h2>'
      + '<h3>Strictly Necessary Cookies</h3>'
      + '<p>These cookies are essential for the website to function properly. They enable core features such as page navigation, secure access to protected areas, and the operation of our cookie banner. Without these cookies the website cannot perform as intended.</p>'
      + '<h3>Performance and Analytics Cookies</h3>'
      + '<p>These cookies help us understand how visitors engage with our website by collecting anonymous information about pages viewed, time spent on the site, and any errors encountered. We use this data to improve the performance, content, and structure of our pages.</p>'
      + '<h3>Functionality Cookies</h3>'
      + '<p>These cookies allow the website to remember choices you make, such as your preferred language or region, and to provide enhanced, more personalised features.</p>'
      + '<h3>Marketing and Advertising Cookies</h3>'
      + '<p>These cookies may be set by us or by our advertising partners to deliver advertisements that are more relevant to your interests, to limit how often you see a particular advertisement, and to measure the effectiveness of our marketing campaigns.</p>'

      + '<h2>4. Third Party Cookies</h2>'
      + '<p>Some cookies on our website are placed by trusted third party services such as analytics providers, video platforms, and social media networks. These third parties may use cookies to track your activity across multiple websites in line with their own privacy and cookie policies.</p>'

      + '<h2>5. Managing Your Cookie Preferences</h2>'
      + '<p>You have the right to accept or decline cookies. Most web browsers allow you to control cookies through their settings, including the ability to block all cookies, delete existing cookies, or receive a notification before a cookie is placed. Please note that disabling certain cookies may affect the functionality and performance of our website.</p>'
      + '<p>For more information on managing cookies in popular browsers, please refer to your browser\u2019s help section.</p>'

      + '<h2>6. Cookie Consent</h2>'
      + '<p>When you first visit our website, you will see a cookie banner inviting you to accept or decline non essential cookies. Your preference is recorded so that the banner does not appear on every visit. You may change your decision at any time by clearing your browser storage and reloading the website.</p>'

      + '<h2>7. Updates to This Cookie Policy</h2>'
      + '<p>We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our business practices. The latest version will always be available on this page with a revised effective date.</p>'

      + '<h2>8. Contact Us</h2>'
      + '<p>If you have questions about how we use cookies or about this Policy, please contact us at <a href="mailto:info@vtecgroup.co.ke">info@vtecgroup.co.ke</a>.</p>'

      + '<div class="legal-footer">© 2026 VTEC Business Group. All rights reserved.</div>';

    var MAP = { '#/terms': TERMS_HTML, '#/privacy': PRIVACY_HTML, '#/cookies': COOKIE_HTML };
    var overlay = document.getElementById('legal-overlay');
    var content = document.getElementById('legalContent');
    function openLegal(html){
      content.innerHTML = html;
      overlay.classList.add('open');
      document.body.classList.add('legal-open');
      overlay.scrollTop = 0;
    }
    function closeLegal(){
      overlay.classList.remove('open');
      document.body.classList.remove('legal-open');
    }
    function syncFromHash(){
      var h = location.hash;
      if (MAP[h]) openLegal(MAP[h]);
      else closeLegal();
    }
    document.addEventListener('click', function(e){
      var a = e.target.closest && e.target.closest('a');
      if (!a) return;
      var href = a.getAttribute('href') || '';
      if (href === '#/terms' || href === '#/privacy' || href === '#/cookies') {
        e.preventDefault();
        if (location.hash !== href) location.hash = href;
        else syncFromHash();
      }
    });
    document.getElementById('legalBackBtn').addEventListener('click', function(e){
      e.preventDefault();
      location.hash = '';
      history.replaceState(null,'',location.pathname + location.search);
      closeLegal();
    });
    window.addEventListener('hashchange', syncFromHash);
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
