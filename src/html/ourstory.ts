export const storyHtml = `
<style>
  .story-wrapper { background: linear-gradient(180deg, #002149 0%, #0a1628 100%); color: #ffffff; padding-bottom: 100px; font-family: 'Outfit', sans-serif; }
  .story-container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }
  .os-chapter { color: var(--green-bright); font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px; display: inline-block; border-left: 2px solid var(--green-bright); padding-left: 10px; }
  .os-title { font-family: 'DM Serif Display', 'Playfair Display', serif; font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; margin-bottom: 24px; line-height: 1.1; }
  .os-desc { color: #A0AEC0; font-size: 16px; line-height: 1.8; max-width: 800px; margin-bottom: 48px; }
  
  /* Sections */
  .os-section { padding-top: 80px; padding-bottom: 40px; border-bottom: 1px solid rgba(255,255,255,0.05); }
  .os-section:last-child { border-bottom: none; }
  
  /* Grids */
  .os-grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 32px; }
  .os-grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }
  .os-grid-4 { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; }
  
  /* Cards */
  .os-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 32px; transition: transform 0.3s ease; }
  .os-card:hover { transform: translateY(-4px); background: rgba(255,255,255,0.05); }
  
  /* Specifics */
  .vtec-meaning-row { display: flex; align-items: flex-start; gap: 16px; margin-bottom: 20px; }
  .vtec-letter { width: 40px; height: 40px; background: var(--green); color: white; display: flex; align-items: center; justify-content: center; font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 800; border-radius: 8px; flex-shrink: 0; }
  .vtec-text strong { display: block; font-size: 15px; margin-bottom: 4px; color: white; }
  .vtec-text span { color: #A0AEC0; font-size: 14px; line-height: 1.5; }
  
  .founder-img { width: 80px; height: 80px; border-radius: 50%; border: 2px solid var(--green-bright); object-fit: cover; margin-bottom: 16px; }
  .founder-name { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: white; margin-bottom: 4px; }
  .founder-role { font-size: 11px; color: var(--green-bright); text-transform: uppercase; letter-spacing: 1px; font-weight: 600; margin-bottom: 16px; }
  
  .journey-num { font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 800; color: var(--green); margin-bottom: 12px; }
  
  .arm-card { padding: 32px 24px; border-radius: 16px; position: relative; overflow: hidden; }
  .arm-card::before { content: ''; position: absolute; inset: 0; opacity: 0.15; background-image: radial-gradient(circle at top right, white, transparent); pointer-events: none; }
  .arm-badge { display: inline-block; padding: 4px 10px; background: rgba(255,255,255,0.1); border-radius: 4px; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600; margin-bottom: 16px; }
  
  .milestone-row { display: flex; align-items: center; gap: 16px; margin-bottom: 24px; }
  .milestone-year { font-family: 'Playfair Display', serif; font-weight: 800; font-size: 18px; width: 60px; color: var(--gold); }
  .milestone-bar { flex: 1; height: 6px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden; }
  .milestone-fill { height: 100%; background: linear-gradient(90deg, var(--green), var(--green-bright)); border-radius: 4px; }
  .milestone-label { width: 140px; text-align: right; font-size: 13px; color: #A0AEC0; font-weight: 600; }
</style>

<div class="story-wrapper">
  <section class="os-section" style="padding-top: 120px; text-align: center;">
    <div class="story-container">
      <div class="os-chapter">Our Story</div>
      <h1 class="os-title">From a Single Idea<br/>to <span style="color:var(--green-bright)">An Empire in Motion</span>.</h1>
      <p class="os-desc" style="margin: 0 auto;">The story of VTEC Business Group, how a shared vision in Nairobi became a structured multi-service brand with a ten year roadmap to redefine commerce, capital, and consultancy in East Africa.</p>
    </div>
  </section>

  <section class="os-section">
    <div class="story-container">
      <div class="os-chapter">Chapter 01</div>
      <h2 class="os-title">Where It All Began</h2>
      <p class="os-desc">VTEC Business Group was officially founded in <strong>October 2025</strong>, in <strong>Nairobi, Kenya</strong>, born out of countless late night conversations between three young Kenyans who refused to accept that financial empowerment, strategic thinking, and serious commerce had to remain reserved for the privileged few.</p>
      
      <div class="os-grid-2">
        <div class="os-card">
          <p style="color: #A0AEC0; line-height: 1.8; margin-bottom: 16px;">What started as a structured plan on paper quickly evolved into a registered multi-service brand with a clear mission: build Kenyan businesses that compete on merit, educate Kenyans on real wealth building, and deliver consultancy that translates ambition into outcomes.</p>
          <p style="color: #A0AEC0; line-height: 1.8;">The name itself, <strong style="color:var(--green-bright)">VTEC</strong>, was deliberate. Each letter is a pillar, a promise, and a discipline.</p>
        </div>
        <div class="os-card">
          <h3 style="font-family:'Playfair Display',serif; font-size:22px; margin-bottom:24px;">What Does <span style="color:var(--green-bright)">VTEC</span> Stand For?</h3>
          <div class="vtec-meaning-row">
            <div class="vtec-letter">V</div>
            <div class="vtec-text"><strong>Visionary</strong><span>Forward-thinking strategy built for where Kenya's economy is heading.</span></div>
          </div>
          <div class="vtec-meaning-row">
            <div class="vtec-letter">T</div>
            <div class="vtec-text"><strong>Trade</strong><span>The commercial backbone, movement of goods, services, and ideas.</span></div>
          </div>
          <div class="vtec-meaning-row">
            <div class="vtec-letter">E</div>
            <div class="vtec-text"><strong>Empowerment</strong><span>Raising people before profits, through knowledge and opportunity.</span></div>
          </div>
          <div class="vtec-meaning-row">
            <div class="vtec-letter">C</div>
            <div class="vtec-text"><strong>Consultancy</strong><span>The intellectual engine guiding strategic decisions that shape futures.</span></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="os-section">
    <div class="story-container">
      <div class="os-chapter">Chapter 02</div>
      <h2 class="os-title">The Foundation</h2>
      <p class="os-desc">Three complementary Business Partners, bringing vision, operations, and growth expertise together under one disciplined leadership team.</p>
      
      <div class="os-grid-3">
        <div class="os-card" style="text-align: center;">
          <img src="/kevin-headshot.jpg" alt="Kevin Inyangala" class="founder-img" />
          <div class="founder-name">Kevin Inyangala</div>
          <div class="founder-role">Group CEO & Business Partner</div>
          <p style="color:#A0AEC0; font-size:13px; line-height:1.6;">Architect of VTEC's long term strategy and brand narrative. Kevin sets the vision and ensures every business arm aligns with the 2035 empire roadmap.</p>
        </div>
        <div class="os-card" style="text-align: center;">
          <img src="/allan-headshot.jpg" alt="Allan Andati" class="founder-img" />
          <div class="founder-name">Allan Andati</div>
          <div class="founder-role">Head of Operations & Business Partner</div>
          <p style="color:#A0AEC0; font-size:13px; line-height:1.6;">The execution engine of the group. Allan designs the systems, workflows, and infrastructure that turn strategy into consistent onsite delivery.</p>
        </div>
        <div class="os-card" style="text-align: center;">
          <img src="/chrisantus-headshot.jpg" alt="Chrisantus Khaemba" class="founder-img" />
          <div class="founder-name">Chrisantus Khaemba</div>
          <div class="founder-role">Head of Growth & Business Partner</div>
          <p style="color:#A0AEC0; font-size:13px; line-height:1.6;">The commercial driver. Chrisantus leads client acquisition, brand expansion, and the high value partnerships that fuel VTEC's revenue and reach.</p>
        </div>
      </div>
    </div>
  </section>
</div>
`;
