export const homeHtml = `
<section class="hero" id="home">
  <div class="hero-overlay"></div>
  <div class="hero-grid"></div>
  <div class="hero-particles" id="heroParticles"></div>
  
  <div class="hero-badge">Est. October 2025 – Nairobi, Kenya</div>
  
  <div class="hero-stats">
    <div class="hero-stat">
      <div class="num"><span class="count" data-from="0" data-to="4">4</span></div>
      <p>Business Arms</p>
    </div>
    <div class="hero-stat">
      <div class="num scale-in"><span>1</span></div>
      <p>Brand Vision</p>
    </div>
    <div class="hero-stat">
      <div class="num"><span class="count" data-from="2000" data-to="2035">2035</span></div>
      <p>Empire Target</p>
    </div>
  </div>

  <h1>Empowering Kenya.<br/><span class="highlight">One Venture</span><br/>At A Time.</h1>
  
  <p class="hero-desc">A premier multi-service brand driving sustainable growth across Kenya through integrated financial literacy, strategic corporate consultancy, and innovative commerce. We are powered by vision and executed with excellence.</p>
  
  <div class="hero-arms">
    <div class="hero-arm-card">
      <div class="hero-arm-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5a10 10 0 0 0 12 0v-5"/></svg>
      </div>
      <div class="hero-arm-text">
        <strong>InvestorMind Academy</strong>
        <span>Financial Literacy & Investing</span>
      </div>
    </div>
    <div class="hero-arm-card">
      <div class="hero-arm-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
      </div>
      <div class="hero-arm-text">
        <strong>VTEC Consultancy Services</strong>
        <span>Strategy & Business Growth</span>
      </div>
    </div>
    <div class="hero-arm-card">
      <div class="hero-arm-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
      </div>
      <div class="hero-arm-text">
        <strong>VTEC Retail Services</strong>
        <span>Quality. Style. Value.</span>
      </div>
    </div>
    <div class="hero-arm-card">
      <div class="hero-arm-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
      </div>
      <div class="hero-arm-text">
        <strong>MILIKI App</strong>
        <span>Your Wealth Co-Pilot</span>
        <span class="hero-arm-badge">Coming Soon</span>
      </div>
    </div>
  </div>

  <div class="hero-btns">
    <a href="/services" class="btn-primary">Explore Our Services</a>
    <a href="#/our-story" class="btn-outline">Our Story</a>
  </div>
</section>

<section id="why" style="background:var(--off-white); padding-top:80px; padding-bottom:80px;">
  <div class="container">
    <div class="section-label">Our Advantage</div>
    <h2 class="section-title">Why Choose VTEC?</h2>
    <p class="section-desc">Four reasons clients, students, and partners choose to grow with the VTEC Business Group ecosystem.</p>
    
    <div class="why-grid">
      <div class="why-card reveal">
        <span class="why-icon lc-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg></span>
        <h3>Kenya First Approach</h3>
        <p>We are built for the Kenyan economic landscape. Every service, strategy, and solution is designed with the local market in mind.</p>
      </div>
      <div class="why-card reveal">
        <span class="why-icon lc-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg></span>
        <h3>Integrated Business Ecosystem</h3>
        <p>Education, consultancy, and retail working together under one roof. VTEC clients benefit from all three arms simultaneously.</p>
      </div>
      <div class="why-card reveal">
        <span class="why-icon lc-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></span>
        <h3>Practical. Not Theoretical.</h3>
        <p>We deliver real results and actionable strategies. Our approach is rooted in real-world Kenyan business experience.</p>
      </div>
      <div class="why-card reveal">
        <span class="why-icon lc-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg></span>
        <h3>Built for the Long Game</h3>
        <p>With a clear 2035 empire vision, VTEC is not a short-term venture. We are building for decades, and our clients grow with us.</p>
      </div>
    </div>
  </div>
</section>

<section id="partners" style="background: linear-gradient(180deg, #071A2B 0%, #0a1628 100%); text-align:center; padding: 80px 20px;">
  <div class="container">
    <span class="partners-badge" style="display:inline-block; padding: 8px 18px; border-radius:999px; background:rgba(39,174,96,0.12); border:1px solid rgba(39,174,96,0.35); color:var(--green-bright); font-size:12px; font-weight:600; letter-spacing:1.5px; text-transform:uppercase; margin-bottom:16px;">In Partnership</span>
    <h2 class="section-title" style="color:white;">Strategic Partnerships</h2>
    <p class="section-desc" style="color:rgba(255,255,255,0.7); margin-bottom:40px;">Working hand in hand with trusted partners who share our vision for impact and growth.</p>
    
    <div class="partners-grid" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 32px; max-width: 900px; margin: 0 auto;">
      
      <div class="partner-card reveal" style="background: linear-gradient(160deg, #0F2240 0%, #0B1A33 100%); border:1px solid rgba(255,255,255,0.06); border-radius:20px; padding:32px 28px; text-align:center; box-shadow: 0 10px 30px rgba(0,0,0,0.4);">
        <div class="partner-logo-wrap" style="width:140px; height:140px; margin:0 auto 22px; border-radius:18px; background:#fff; display:flex; align-items:center; justify-content:center; overflow:hidden; padding:10px;">
          <img src="/partner-dukedom.png" alt="Dukedom Media Logo" style="width:100%; height:100%; object-fit:contain;" />
        </div>
        <div class="partner-name" style="font-family:'Playfair Display',serif; font-size:24px; font-weight:700; color:#fff; margin-bottom:6px;">Dukedom Media</div>
        <div class="partner-founder-label" style="font-size:11px; letter-spacing:2px; text-transform:uppercase; color:var(--green-bright); margin-bottom:4px; font-weight:600;">Founder</div>
        <div class="partner-founder-name" style="font-size:16px; color:#fff; font-weight:500; margin-bottom:14px;">Mr. Dukedom Makori</div>
        <p class="partner-desc" style="color:rgba(255,255,255,0.7); font-size:14.5px; line-height:1.65; text-align:left; margin-bottom:20px;">Dukedom Media is a dynamic online media channel delivering compelling content in Sports and News. With a growing community of over 1,000 followers and 5,200+ posts, Dukedom Media is committed to bold storytelling and keeping audiences informed and engaged across multiple digital platforms.</p>
      </div>

      <div class="partner-card reveal" style="background: linear-gradient(160deg, #0F2240 0%, #0B1A33 100%); border:1px solid rgba(255,255,255,0.06); border-radius:20px; padding:32px 28px; text-align:center; box-shadow: 0 10px 30px rgba(0,0,0,0.4);">
        <div class="partner-logo-placeholder" style="width:140px; height:140px; margin:0 auto 22px; border-radius:18px; background:rgba(255,255,255,0.04); border:2px dashed rgba(255,255,255,0.18); display:flex; align-items:center; justify-content:center; color:rgba(255,255,255,0.5); font-size:12px; font-weight:600; letter-spacing:1px; text-align:center; padding:12px;">Logo Coming Soon</div>
        <div class="partner-name" style="font-family:'Playfair Display',serif; font-size:24px; font-weight:700; color:#fff; margin-bottom:6px;">The Grace Foundation</div>
        <div class="partner-founder-label" style="font-size:11px; letter-spacing:2px; text-transform:uppercase; color:var(--green-bright); margin-bottom:4px; font-weight:600;">Founder</div>
        <div class="partner-founder-name" style="font-size:16px; color:#fff; font-weight:500; margin-bottom:14px;">Maurine Mbuthia</div>
        <p class="partner-desc" style="color:rgba(255,255,255,0.7); font-size:14.5px; line-height:1.65; text-align:left; margin-bottom:20px;">The Grace Foundation is a Nairobi-based community foundation founded by Trauma Therapist Mbuthia Maurine. The foundation specializes in supporting individuals dealing with Post Abortion Trauma and those navigating pregnancy journeys, providing compassionate care, healing, and dignity to those who need it most.</p>
      </div>

    </div>
  </div>
</section>

<section id="testimonials" style="background:white; padding-top:80px; padding-bottom:80px;">
  <div class="container">
    <div class="section-label">Testimonials</div>
    <h2 class="section-title">What People Say</h2>
    <p class="section-desc">Real voices from students, entrepreneurs, and professionals across Kenya.</p>
    <div class="reveal" style="margin-top:8px;">
      <span class="reviews-badge"><span class="stars">★★★★★</span> Rated 4.9 by our community</span>
    </div>
    
    <div class="testi-grid" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; margin-top: 40px;">
      <div class="testi-card reveal" style="background:white; border:1px solid #e6e8f3; border-left:4px solid var(--green); border-radius:20px; padding:28px 24px; box-shadow:0 6px 22px rgba(13,33,73,0.05);">
        <div class="testi-avatar" style="width:56px; height:56px; border-radius:50%; background:linear-gradient(135deg, var(--navy), var(--green)); color:white; display:flex; align-items:center; justify-content:center; font-family:'Playfair Display', serif; font-size:20px; font-weight:800; margin-bottom:14px;">JM</div>
        <div class="testi-quote" style="color:var(--green); font-size:2rem; line-height:1; margin-bottom:8px; font-family:Georgia, serif;">"</div>
        <p class="testi-text" style="font-style:italic; color:#4a5568; font-size:15px; line-height:1.75; margin-bottom:16px;">InvestorMind Academy opened my eyes to the NSE. I made my first stock investment within a week of the course.</p>
        <div class="testi-stars" style="color:var(--gold); letter-spacing:2px; margin-bottom:14px; font-size:14px;">★★★★★</div>
        <div class="testi-name" style="color:var(--navy); font-weight:700; font-size:14px;">James M.</div>
        <div class="testi-role" style="color:var(--gray); font-size:12px;">University Student, Nairobi</div>
      </div>
      
      <div class="testi-card reveal" style="background:white; border:1px solid #e6e8f3; border-left:4px solid var(--green); border-radius:20px; padding:28px 24px; box-shadow:0 6px 22px rgba(13,33,73,0.05);">
        <div class="testi-avatar" style="width:56px; height:56px; border-radius:50%; background:linear-gradient(135deg, var(--gold), var(--green)); color:white; display:flex; align-items:center; justify-content:center; font-family:'Playfair Display', serif; font-size:20px; font-weight:800; margin-bottom:14px;">SK</div>
        <div class="testi-quote" style="color:var(--green); font-size:2rem; line-height:1; margin-bottom:8px; font-family:Georgia, serif;">"</div>
        <p class="testi-text" style="font-style:italic; color:#4a5568; font-size:15px; line-height:1.75; margin-bottom:16px;">VTEC Consultancy helped us rebrand completely. Our client inquiries doubled within two months.</p>
        <div class="testi-stars" style="color:var(--gold); letter-spacing:2px; margin-bottom:14px; font-size:14px;">★★★★★</div>
        <div class="testi-name" style="color:var(--navy); font-weight:700; font-size:14px;">Sarah K.</div>
        <div class="testi-role" style="color:var(--gray); font-size:12px;">SME Owner, Westlands</div>
      </div>
      
      <div class="testi-card reveal" style="background:white; border:1px solid #e6e8f3; border-left:4px solid var(--green); border-radius:20px; padding:28px 24px; box-shadow:0 6px 22px rgba(13,33,73,0.05);">
        <div class="testi-avatar" style="width:56px; height:56px; border-radius:50%; background:linear-gradient(135deg, #002149, var(--gold)); color:white; display:flex; align-items:center; justify-content:center; font-family:'Playfair Display', serif; font-size:20px; font-weight:800; margin-bottom:14px;">BO</div>
        <div class="testi-quote" style="color:var(--green); font-size:2rem; line-height:1; margin-bottom:8px; font-family:Georgia, serif;">"</div>
        <p class="testi-text" style="font-style:italic; color:#4a5568; font-size:15px; line-height:1.75; margin-bottom:16px;">The financial literacy sessions are practical, simple, and made for Kenyans. Nothing like it exists at this level.</p>
        <div class="testi-stars" style="color:var(--gold); letter-spacing:2px; margin-bottom:14px; font-size:14px;">★★★★★</div>
        <div class="testi-name" style="color:var(--navy); font-weight:700; font-size:14px;">Brian O.</div>
        <div class="testi-role" style="color:var(--gray); font-size:12px;">Young Professional, Kiambu</div>
      </div>
    </div>
  </div>
</section>

<section id="waitlist" style="background: linear-gradient(135deg, var(--navy) 0%, #01a1a3a 60%, #0f2a4a 100%); text-align:center; padding:60px 20px;">
  <div class="container">
    <h2 style="font-family:'DM Serif Display',serif; color:white; font-size:clamp(1.8rem, 5vw, 2.4rem); margin-bottom:12px; line-height:1.2;">Join the InvestorMind Academy Waitlist</h2>
    <p style="color:var(--green-bright); font-size:14px; letter-spacing:1px; margin-bottom:26px; font-weight:500;">Be first to access Kenya's premier financial literacy platform.</p>
    <form id="waitlistForm" style="display:flex; flex-direction:column; gap:10px; max-width:520px; margin:0 auto;" onsubmit="return joinWaitlist(event)">
      <div style="display:flex; gap:10px;">
        <input type="email" id="wlEmail" required placeholder="Enter your email address" style="flex:1; min-height:48px; padding:12px 16px; border-radius:50px; border:1px solid rgba(255,255,255,0.2); background:rgba(255,255,255,0.08); color:white; font-size:14px; outline:none;" />
        <button type="submit" id="wlBtn" style="background:var(--green); color:white; border:none; border-radius:50px; padding:12px 26px; font-weight:600; font-size:14px; cursor:pointer; min-height:48px;">Join Waitlist</button>
      </div>
      <p id="wlStatus" style="margin-top:14px; font-size:14px; min-height:20px; font-weight:600;"></p>
      <p style="color:rgba(255,255,255,0.45); font-size:12px; margin-top:14px;">No spam. Just updates on courses, launches, and financial insights.</p>
    </form>
  </div>
</section>

<section id="contact" style="background:white; padding-top:80px; padding-bottom:80px;">
  <div class="container">
    <div class="section-label">Get In Touch</div>
    <h2 class="section-title">Let's Build Together</h2>
    <p class="section-desc">Whether you're a student, entrepreneur, business, or potential partner — VTEC Business Group is ready to connect with you.</p>
    
    <div class="contact-grid" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap:48px; margin-top:40px;">
      
      <div class="contact-info-card reveal" style="background:var(--navy); border-radius:20px; padding:36px 28px; color:white;">
        <h3 style="font-family:'DM Serif Display',serif; font-size:clamp(1.4rem, 4vw, 1.8rem); font-weight:800; margin-bottom:10px;">Connect With VTEC</h3>
        <p style="color:rgba(255,255,255,0.55); font-size:14px; line-height:1.75; margin-bottom:30px;">We are always open to conversations about education, consultancy, partnerships, and collaboration opportunities within Kenya's growing economy.</p>
        
        <div class="contact-detail" style="display:flex; align-items:center; gap:14px; margin-bottom:18px;">
          <div class="contact-icon" style="width:42px; height:42px; border-radius:11px; background:rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:center; color:var(--green-bright);"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:20px; height:20px;"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg></div>
          <div>
            <strong style="display:block; color:white; font-size:13px; margin-bottom:2px;">Email Us</strong>
            <a href="mailto:info@vtecgroup.co.ke" style="color:rgba(255,255,255,0.5); font-size:13px; text-decoration:none;">info@vtecgroup.co.ke</a>
          </div>
        </div>
        
        <div class="contact-detail" style="display:flex; align-items:center; gap:14px; margin-bottom:18px;">
          <div class="contact-icon" style="width:42px; height:42px; border-radius:11px; background:rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:center; color:var(--green-bright);"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:20px; height:20px;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div>
          <div>
            <strong style="display:block; color:white; font-size:13px; margin-bottom:2px;">WhatsApp / Call</strong>
            <a href="tel:+254116644204" style="color:rgba(255,255,255,0.5); font-size:13px; text-decoration:none;">+254 116 644 204</a>
          </div>
        </div>
        
        <div class="contact-detail" style="display:flex; align-items:center; gap:14px; margin-bottom:18px;">
          <div class="contact-icon" style="width:42px; height:42px; border-radius:11px; background:rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:center; color:var(--green-bright);"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:20px; height:20px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div>
          <div>
            <strong style="display:block; color:white; font-size:13px; margin-bottom:2px;">Location</strong>
            <span style="color:rgba(255,255,255,0.5); font-size:13px;">Nairobi, Kenya</span>
          </div>
        </div>
      </div>
      
      <div class="contact-form-wrap reveal" style="background:var(--off-white); border-radius:20px; padding:36px 28px;">
        <h3 style="font-family:'DM Serif Display',serif; font-size:clamp(1.3rem, 3.5vw, 1.6rem); font-weight:800; color:#002149; margin-bottom:24px;">Send Us a Message</h3>
        <form id="contactForm" onsubmit="handleSubmit(event)">
          <div class="form-group" style="margin-bottom:16px;">
            <label style="display:block; font-size:11px; font-weight:700; color:var(--navy); letter-spacing:1px; text-transform:uppercase; margin-bottom:7px;">Full Name</label>
            <input type="text" name="name" required placeholder="Your full name" style="width:100%; padding:13px 15px; border:1.5px solid #d6deaf; border-radius:10px; font-family:'Outfit',sans-serif; font-size:14px; outline:none; min-height:48px;" />
          </div>
          <div class="form-group" style="margin-bottom:16px;">
            <label style="display:block; font-size:11px; font-weight:700; color:var(--navy); letter-spacing:1px; text-transform:uppercase; margin-bottom:7px;">Email Address</label>
            <input type="email" name="email" required placeholder="your@email.com" style="width:100%; padding:13px 15px; border:1.5px solid #d6deaf; border-radius:10px; font-family:'Outfit',sans-serif; font-size:14px; outline:none; min-height:48px;" />
          </div>
          <div class="form-group" style="margin-bottom:16px;">
            <label style="display:block; font-size:11px; font-weight:700; color:var(--navy); letter-spacing:1px; text-transform:uppercase; margin-bottom:7px;">I'm Interested In</label>
            <select name="interest" style="width:100%; padding:13px 15px; border:1.5px solid #d6deaf; border-radius:10px; font-family:'Outfit',sans-serif; font-size:14px; outline:none; min-height:48px; background:white;">
              <option>InvestorMind Academy</option>
              <option>VTEC Consultancy Services</option>
              <option>VTEC Retail Services</option>
              <option>Partnership / Collaboration</option>
              <option>General Enquiry</option>
            </select>
          </div>
          <div class="form-group" style="margin-bottom:16px;">
            <label style="display:block; font-size:11px; font-weight:700; color:var(--navy); letter-spacing:1px; text-transform:uppercase; margin-bottom:7px;">Message</label>
            <textarea name="message" required placeholder="Tell us how we can help you..." style="width:100%; padding:13px 15px; border:1.5px solid #d6deaf; border-radius:10px; font-family:'Outfit',sans-serif; font-size:14px; outline:none; min-height:110px; resize:vertical;"></textarea>
          </div>
          
          <input type="hidden" name="subject" value="New VTEC Website Enquiry" />
          <button type="submit" class="form-submit" style="width:100%; background:linear-gradient(135deg, var(--navy), var(--navy-mid)); color:white; border:none; border-radius:10px; font-weight:700; letter-spacing:0.5px; cursor:pointer; min-height:52px; font-size:15px; transition:transform 0.2s;">Send Message</button>
          <p id="formStatus" style="margin-top:14px; font-size:13px; color:var(--gray); min-height:18px; text-align:center;"></p>
        </form>
      </div>
      
    </div>
  </div>
</section>
`;
