export const teamHtml = `
<style>
  .team-page { padding: 80px 20px; background: var(--off-white); }
  .team-header { text-align: center; max-width: 700px; margin: 0 auto 60px; }
  .team-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 40px; max-width: 1200px; margin: 0 auto; }
  .leader-card { background: white; border-radius: 24px; border: 1px solid #e6e8f3; padding: 40px 32px; box-shadow: 0 10px 30px rgba(13,33,73,0.05); display: flex; flex-direction: column; height: 100%; position: relative; transition: transform 0.3s ease; }
  .leader-card:hover { transform: translateY(-5px); }
  .leader-avatar-wrap { width: 140px; height: 140px; margin: 0 auto 24px; border-radius: 50%; overflow: hidden; border: 3px solid var(--green-bright); box-shadow: 0 0 20px rgba(39,174,96,0.2); }
  .leader-avatar-wrap img { width: 100%; height: 100%; object-fit: cover; }
  .leader-name { font-family: 'Playfair Display', serif; font-size: 26px; font-weight: 700; color: var(--navy); text-align: center; margin-bottom: 6px; }
  .leader-role { font-size: 13px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: var(--green-bright); text-align: center; margin-bottom: 24px; }
  .leader-quote { background: rgba(0,33,73,0.03); border-left: 3px solid var(--navy); padding: 16px; border-radius: 0 12px 12px 0; font-style: italic; color: #4a5568; font-size: 14px; line-height: 1.6; margin-bottom: 24px; }
  .leader-bio { color: #4a5568; font-size: 15px; line-height: 1.7; margin-bottom: 24px; }
  .leader-section-title { font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: var(--navy); margin-top: 20px; margin-bottom: 8px; display: flex; align-items: center; gap: 8px; }
  .leader-section-title::after { content: ''; flex: 1; height: 1px; background: #e6e8f3; }
  .leader-text-block { color: #718096; font-size: 14px; line-height: 1.65; margin-bottom: 12px; }
  .leader-contact-row { display: flex; gap: 12px; margin-top: auto; padding-top: 24px; border-top: 1px solid #e6e8f3; }
  .leader-btn { flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 44px; border-radius: 50px; font-size: 13px; font-weight: 600; text-decoration: none; transition: all 0.25s; }
  .leader-btn.phone { background: var(--navy); color: white; }
  .leader-btn.email { background: transparent; border: 1.5px solid #d6deaf; color: var(--navy); }
  .leader-btn:hover { opacity: 0.9; transform: translateY(-1px); }
</style>

<section class="team-page">
  <div class="team-header">
    <div class="section-label">The Executive Committee</div>
    <h2 class="section-title">Our Leadership Team</h2>
    <p class="section-desc">Meet the strategic minds directing VTEC's long-term commercial assets, operational scale, and market footprint across the Kenyan digital economy.</p>
  </div>

  <div class="team-grid">
    
    <div class="leader-card reveal">
      <div class="leader-avatar-wrap">
        <img src="/kevin-headshot.jpg" alt="Kevin Inyangala">
      </div>
      <div class="leader-name">Kevin Inyangala</div>
      <div class="leader-role">Group CEO & Business Partner</div>
      
      <div class="leader-quote">
        "Vision without execution is wishful thinking. My job is to make sure VTEC delivers, quietly, consistently, and at the highest standard, every single time."
      </div>
      
      <p class="leader-bio">Kevin is the visionary architect of VTEC Business Group. He steers the overarching corporate strategy and 10-year enterprise roadmap, drawing on deep operational expertise in strategic communications, resource orchestration, and systemic market conditioning.</p>
      
      <div class="leader-section-title">Key Milestones</div>
      <p class="leader-text-block">Successfully architected the foundational strategy that transformed VTEC Business Group from a raw concept into a structured, highly viable multi-service brand. Under his governance, VTEC secured its core brand alignment and established its initial market execution infrastructure.</p>
      
      <div class="leader-section-title">Vision 2035 Mandate</div>
      <p class="leader-text-block">Tasked with guiding VTEC into a highly competitive, regionally recognized business conglomerate by 2035. His mandate focuses strictly on consolidating major institutional partnerships, scaling cross-border revenue lines, and formalizing a world-class corporate governance framework.</p>
      
      <div class="leader-contact-row">
        <a href="tel:+254748626367" class="leader-btn phone"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg> Call</a>
        <a href="mailto:kevininyangala5@gmail.com" class="leader-btn email"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg> Email</a>
      </div>
    </div>

    <div class="leader-card reveal">
      <div class="leader-avatar-wrap">
        <img src="/allan-headshot.jpg" alt="Allan Andati">
      </div>
      <div class="leader-name">Allan Andati</div>
      <div class="leader-role">Head of Operations & Business Partner</div>
      
      <div class="leader-quote">
        "Operational precision is the bridge between a strategic roadmap and market dominance. We engineer workflows that scale without friction."
      </div>
      
      <p class="leader-bio">Allan serves as the internal engine room of VTEC Business Group. He ensures that the parent group's overarching vision is seamlessly translated into operational reality on a day-to-day level, anchoring logistics, infrastructure stability, and cross-brand systemic execution.</p>
      
      <div class="leader-section-title">Key Milestones</div>
      <p class="leader-text-block">Instrumental in constructing the foundational operational framework of VTEC. He successfully mapped and implemented the internal workflows that lowered initial overhead and redundancy while creating a flexible infrastructure to support expanding commercial activities.</p>
      
      <div class="leader-section-title">Vision 2035 Mandate</div>
      <p class="leader-text-block">Responsible for deploying premium, world-class operational networks capable of supporting continuous ecosystem growth through 2035. This includes overseeing complete digital automation across sub-brands and enforcing strict accountability and performance management metrics.</p>
      
      <div class="leader-contact-row">
        <a href="tel:+254728004765" class="leader-btn phone"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg> Call</a>
        <a href="mailto:andatiallan047@gmail.com" class="leader-btn email"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg> Email</a>
      </div>
    </div>

    <div class="leader-card reveal">
      <div class="leader-avatar-wrap">
        <img src="/chrisantus-headshot.jpg" alt="Chrisantus Khaemba">
      </div>
      <div class="leader-name">Chrisantus Khaemba</div>
      <div class="leader-role">Head of Growth & Business Partner</div>
      
      <div class="leader-quote">
        "Growth is earned, not announced. Every client we serve, every market we enter, must walk away convinced that VTEC was the right call."
      </div>
      
      <p class="leader-bio">Chrisantus is the driving force behind market expansion and sustainable revenue generation for VTEC. He is specifically tasked with accelerating user and client acquisition and scaling the ecosystem's commercial solutions to the wider public.</p>
      
      <div class="leader-section-title">Key Milestones</div>
      <p class="leader-text-block">Played an essential role in driving VTEC's early pipeline generation and initial audience penetration. Through targeted outreach structures, he successfully established the early commercial traction that validated the brand's core positioning across consumer markets.</p>
      
      <div class="leader-section-title">Vision 2035 Mandate</div>
      <p class="leader-text-block">Tasked with capturing major market shares and driving sustainable monetization architectures by 2035. His focus centers on growing brand equity over digital platforms, securing high-value accounts, and embedding VTEC deeply into international distribution lines.</p>
      
      <div class="leader-contact-row">
        <a href="tel:+254742264472" class="leader-btn phone"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg> Call</a>
        <a href="mailto:khaembachris2005@gmail.com" class="leader-btn email"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg> Email</a>
      </div>
    </div>

  </div>
</section>
`;
