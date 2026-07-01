export const ecosystemHtml = `
<section id="ecosystem">
  <div class="container">
    <div class="section-label">The Ecosystem</div>
    <h2 class="section-title">One Group. Four Pillars.</h2>
    <p class="section-desc">A connected ecosystem of brands and digital tools — each engineered to educate, empower, and equip the modern Kenyan investor. Tap any card to learn more.</p>

    <div class="ecosystem-grid">

      <div class="eco-card reveal" onclick="openEco('vtec')" role="button" tabindex="0" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openEco('vtec')}">
        <span class="eco-badge">● Parent Group</span>
        <h3>VTEC Business Group</h3>
        <p>The visionary multi-service brand uniting education, consultancy, retail, and digital innovation under one Kenyan-grown umbrella.</p>
        <span class="eco-cta">Read more</span>
      </div>

      <div class="eco-card reveal" onclick="openEco('academy')" role="button" tabindex="0" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openEco('academy')}">
        <span class="eco-badge">● Education Arm</span>
        <h3>InvestorMind Academy</h3>
        <p>The educational backbone of VTEC — building financial literacy, investor discipline, and the Alpha mindset for wealth creation.</p>
        <span class="eco-cta">Read more</span>
      </div>

      <div class="eco-card reveal" onclick="openEco('consultancy')" role="button" tabindex="0" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openEco('consultancy')}">
        <span class="eco-badge">● Advisory Arm</span>
        <h3>VTEC Consultancy Services</h3>
        <p>Strategic advisory for businesses, founders, and institutions — bridging vision and execution with sharp, on-the-ground expertise.</p>
        <span class="eco-cta">Read more</span>
      </div>

      <div class="eco-card eco-miliki reveal" onclick="openEco('miliki')" role="button" tabindex="0" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openEco('miliki')}">
        <span class="eco-badge">● In Development</span> <span class="eco-badge" style="color:var(--green-bright);">● Coming Soon</span>
        <h3>MILIKI App</h3>
        <p>The upcoming flagship digital engine of VTEC — currently in active development, designed to turn financial knowledge into tangible asset ownership for the modern Kenyan investor.</p>
        <span class="eco-cta">Read more</span>
      </div>

    </div>
  </div>
</section>

<div class="eco-modal" id="ecoModal" onclick="if(event.target===this)closeEco()" aria-hidden="true">
  <div class="eco-modal-card" id="ecoModalCard" role="dialog" aria-modal="true" aria-labelledby="ecoTitle">
    <button class="eco-modal-close" onclick="closeEco()" aria-label="Close">×</button>
    <img id="ecoModalLogo" alt="" hidden />
    <span class="eco-badge" id="ecoBadge" hidden></span>
    <h3 id="ecoTitle"></h3>
    <div class="eco-body" id="ecoBody"></div>
    <div id="ecoModalFooter" style="text-align:center;" hidden>
      <button class="miliki-modal-close-btn" onclick="closeEco()">Close</button>
    </div>
  </div>
</div>

`;
