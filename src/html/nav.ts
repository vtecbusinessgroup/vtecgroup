export const navHtml = `
<nav>
  <a href="/" class="nav-logo" style="text-decoration:none;">
    <div class="nav-logo-icon" style="width:38px; height:38px; border-radius:10px; background:var(--navy-card); border:1px solid var(--teal); display:grid; place-items:center; font-family:'Playfair Display', serif; font-weight:900; color:var(--teal); font-size:22px; overflow:hidden;">
      <img src="/vtec-logo.png" alt="VTEC Business Group Logo" style="width:100%; height:100%; object-fit:cover; object-position:center;" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" />
      <span style="display:none;">V</span>
    </div>
    <div class="nav-logo-text">
      <strong>VTEC</strong>
      <span>Business Group</span>
    </div>
  </a>
  
  <ul class="nav-links">
    <li><a href="#about">About</a></li>
    <li><a href="/business-diagnostic" target="_parent" class="nav-diagnostic" data-diagnostic-link><span class="nav-dot"></span>Free Diagnostic</a></li>
    <li><a href="#ecosystem">Ecosystem</a></li>
    <li><a href="#leadership">Leadership</a></li>
    <li><a href="#vision">Vision 2035</a></li>
    <li><a href="#contact" class="nav-cta">Contact Us</a></li>
  </ul>
  
  <div class="hamburger" onclick="toggleMenu()" id="hamburger">
    <span></span><span></span><span></span>
  </div>
</nav>

<div class="mobile-menu" id="mobileMenu">
  <a href="#about" onclick="toggleMenu()">About</a>
  <a href="/business-diagnostic" target="_parent" class="nav-diagnostic" data-diagnostic-link><span class="nav-dot"></span>Free Diagnostic</a>
  <a href="#ecosystem" onclick="toggleMenu()">Ecosystem</a>
  <a href="#leadership" onclick="toggleMenu()">Leadership</a>
  <a href="#vision" onclick="toggleMenu()">Vision 2035</a>
  <a href="#contact" class="mob-cta" onclick="toggleMenu()">Contact Us</a>
</div>
`;
