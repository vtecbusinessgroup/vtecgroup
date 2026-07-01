export const servicesHtml = `
<section id="services">
  <div class="container">
    <div class="section-label">What We Do</div>
    <h2 class="section-title">Our Business Arms</h2>
    <p class="section-desc">Four strategically positioned sub-brands, each serving a distinct market need — yet all unified under the VTEC Business Group umbrella.</p>
    <div class="services-grid">

      <div class="service-card reveal">
        <div class="service-header sc-navy" style="padding-top:20px;">
          <div style="display:flex; justify-content:center; margin-bottom:14px;">
            <div style="width:90px; height:90px; border-radius:50%; overflow:hidden; border:2px solid rgba(201,162,39,0.35); background:white; flex-shrink:0;">
              <img src="/academy-logo.png" alt="InvestorMind Academy Logo" style="width:100%;height:100%;object-fit:cover;object-position:center 15%;" />
            </div>
          </div>
          <span class="service-badge">Education</span>
          <span class="service-icon lc-ico"><svg viewBox="0 0 24 24" style="width:30px;height:30px"><path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg></span>
          <h3>InvestorMind Academy</h3>
        </div>
        <div class="service-body">
          <p>Kenya's dedicated financial literacy and investment education platform. We bridge the knowledge gap between everyday Kenyans and the wealth-building tools available to them.</p>
          <div class="service-tags">
            <span class="tag">NSE Stock Market</span>
            <span class="tag">Money Market Funds</span>
            <span class="tag">SACCOs</span>
            <span class="tag">Financial Literacy</span>
            <span class="tag">Investment Strategy</span>
          </div>
          <a href="#contact" class="svc-cta navy">Explore Academy &rarr;</a>
        </div>
      </div>

      <div class="service-card reveal">
        <div class="service-header sc-green">
          <span class="service-badge">Consultancy</span>
          <span class="service-icon lc-ico"><svg viewBox="0 0 24 24" style="width:30px;height:30px"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg></span>
          <h3>VTEC Consultancy Services</h3>
        </div>
        <div class="service-body">
          <p>Strategic professional services tailored for Kenya's business landscape. We guide entrepreneurs, SMEs, and brands to make smarter decisions and build stronger market presence.</p>
          <div class="service-tags">
            <span class="tag">Financial Consulting</span>
            <span class="tag">Brand Consulting</span>
            <span class="tag">Content Marketing</span>
            <span class="tag">Business Strategy</span>
          </div>
          <a href="#contact" class="svc-cta green">Request Consultation &rarr;</a>
        </div>
      </div>

      <div class="service-card reveal" style="position:relative;overflow:hidden;">
        <div class="coming-soon-ribbon">Coming Soon</div>
        <div class="service-header sc-gold">
          <span class="service-badge">Retail</span>
          <span class="service-icon lc-ico"><svg viewBox="0 0 24 24" style="width:30px;height:30px"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18M16 10a4 4 0 0 1-8 0"/></svg></span>
          <h3>VTEC Retail Services</h3>
        </div>
        <div class="service-body">
          <p>A premium clothing and apparel retail venture currently in its pre-launch phase. Designed to bring quality, style, and accessibility to Kenya's urban fashion market.</p>
          <div class="service-tags">
            <span class="tag">Apparel</span>
            <span class="tag">Urban Fashion</span>
            <span class="tag">Kenyan Market</span>
            <span class="tag">Coming 2025/26</span>
          </div>
          <a href="#contact" class="svc-cta gold">Notify Me at Launch &rarr;</a>
        </div>
      </div>

      <div class="service-card reveal" style="position:relative;overflow:hidden;cursor:pointer;" onclick="if(!event.target.closest('a')) openEco('miliki')">
        <div class="gold-ribbon">In Development</div>
        <div class="service-header sc-miliki" style="padding-top:20px;">
          <div style="display:flex; justify-content:center; margin-bottom:14px;">
            <div style="width:90px; height:90px; border-radius:50%; overflow:hidden; border:2px solid #c9a227; box-shadow:0 0 20px rgba(201,162,39,0.4); background:#000; flex-shrink:0;">
              <img id="milikiLogoCard" alt="MILIKI App logo" loading="lazy" style="width:100%;height:100%;object-fit:cover;display:block;" src="/miliki-logo.png" />
            </div>
          </div>
          <span class="service-badge">Digital Arm</span>
          <span class="service-icon lc-ico"><svg viewBox="0 0 24 24" style="width:30px;height:30px"><path d="M12 2 4 5v6c0 5 3.5 9.5 8 11 4.5-1.5 8-6 8-11V5l-8-3z"/></svg></span>
          <h3>MILIKI App</h3>
        </div>
        <div class="service-body">
          <p>The flagship digital solution within the VTEC ecosystem — built to redefine asset ownership and wealth management for the modern Kenyan investor. Drawn from the Swahili word <em>miliki</em>, meaning "to own," MILIKI will bring every asset class including NSE equities, Money Market Funds, and bonds under one transparent, user-friendly dashboard.</p>
          <div class="service-tags">
            <span class="tag">NSE Equities</span>
            <span class="tag">Money Market Funds</span>
            <span class="tag">Wealth Tracking</span>
            <span class="tag">Asset Ownership</span>
            <span class="tag">Financial Dashboard</span>
          </div>
          <a href="#contact" class="svc-cta gold" onclick="event.stopPropagation();openEco('miliki');return false;">Join the Waitlist &rarr;</a>
        </div>
      </div>

    </div>
  </div>
</section>
`;
