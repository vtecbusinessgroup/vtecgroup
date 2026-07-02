export const milikiHtml = `
<section id="waitlist" style="background:linear-gradient(135deg, var(--navy) 0%, #01a1a3a 60%, #0f2a4a 100%); text-align:center; padding:60px 20px;">
  <div class="container">
    <h2 style="font-family:'DM Serif Display',serif; color:white; font-size:clamp(1.8rem, 5vw, 2.4rem); margin-bottom:12px; line-height:1.2;">Join the MILIKI App Waitlist</h2>
    <p style="color:var(--green-bright); font-size:14px; letter-spacing:1px; margin-bottom:26px; font-weight:500;">Be first to access Kenya's premier digital wealth co-pilot.</p>
    <form class="wl-form" id="milikiWaitlistForm" style="display:flex; flex-direction:column; gap:10px; max-width:520px; margin:0 auto;" onsubmit="return joinWaitlist(event)">
      <div style="display:flex; gap:10px; width:100%;">
        <input type="email" required placeholder="Enter your email address" id="milikiEmail" aria-label="Email address" style="flex:1; min-height:48px; padding:12px 16px; border-radius:50px; border:1px solid rgba(255,255,255,0.2); background:rgba(255,255,255,0.08); color:white; font-size:14px; outline:none;"/>
        <button type="submit" id="milikiBtn" style="background:var(--green); color:white; border:none; border-radius:50px; padding:12px 26px; font-weight:600; font-size:14px; cursor:pointer;">Join Waitlist</button>
      </div>
      <p id="wlStatus" style="margin-top:14px;font-size:14px;min-height:20px;font-weight:600;"></p>
      <p style="color:rgba(255,255,255,0.45); font-size:12px; margin-top:10px;">No spam. Just updates on the app launch and early access.</p>
    </form>
  </div>
</section>
`;