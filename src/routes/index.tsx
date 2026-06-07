import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VTEC Business Group | Visionary Trade, Empowerment & Consultancy" },
      {
        name: "description",
        content:
          "Kenya's dynamic holding entity powering financial education, strategic consultancy, and commerce. Empowering Kenya. One Venture at a Time.",
      },
      { property: "og:title", content: "VTEC Business Group" },
      { property: "og:description", content: "Empowering Kenya. One Venture at a Time." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

const AcademyIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c3.333 1.667 8.667 1.667 12 0v-5"/>
  </svg>
);

const ConsultancyIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2"/>
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
    <line x1="12" y1="12" x2="12" y2="16"/>
    <line x1="10" y1="14" x2="14" y2="14"/>
  </svg>
);

const RetailIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);

const WalletIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2"/>
    <path d="M16 12h.01"/>
    <path d="M2 10h20"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
);

function Index() {
  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", margin: 0, padding: 0, background: "#0a1628" }}>

      {/* NAVBAR */}
      <nav style={{
        background: "#0a1628",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 20px",
        position: "sticky",
        top: 0,
        zIndex: 100,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 46, height: 46, borderRadius: "50%",
            background: "#fff", display: "flex", alignItems: "center",
            justifyContent: "center", overflow: "hidden",
          }}>
            <img src="/vtec-logo.png" alt="VTEC" style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
                (e.target as HTMLImageElement).parentElement!.innerHTML =
                  '<span style="font-weight:900;color:#0a1628;font-size:11px;letter-spacing:-0.5px">VTEC</span>';
              }}
            />
          </div>
          <div>
            <div style={{ color: "#fff", fontWeight: "bold", fontSize: 17, letterSpacing: 2 }}>VTEC</div>
            <div style={{ color: "#22c55e", fontSize: 9, letterSpacing: 3, fontFamily: "sans-serif" }}>BUSINESS GROUP</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 5, cursor: "pointer", padding: 4 }}>
          <div style={{ width: 24, height: 2, background: "#fff", borderRadius: 2 }} />
          <div style={{ width: 24, height: 2, background: "#fff", borderRadius: 2 }} />
          <div style={{ width: 24, height: 2, background: "#fff", borderRadius: 2 }} />
        </div>
      </nav>

      {/* HERO */}
      <div style={{
        position: "relative",
        minHeight: "92vh",
        backgroundImage: "url('/hero-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center 20%",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "0 20px 36px",
      }}>
        {/* Dark overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, rgba(10,22,40,0.3) 0%, rgba(10,22,40,0.65) 50%, rgba(10,22,40,0.85) 100%)",
        }} />

        <div style={{ position: "relative", zIndex: 2 }}>

          {/* EST badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            border: "1px solid #22c55e", borderRadius: 20,
            padding: "5px 14px", color: "#22c55e",
            fontSize: 10, letterSpacing: 1.5,
            fontFamily: "sans-serif", marginBottom: 22,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
            EST. OCTOBER 2025 — NAIROBI, KENYA
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", marginBottom: 28, borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 24 }}>
            {[
              { value: "4+", label: "BUSINESS ARMS", green: true },
              { value: "#1", label: "HOLDING VISION", green: false },
              { value: "2035", label: "EMPIRE TARGET", green: true },
            ].map((stat, i) => (
              <div key={stat.label} style={{
                flex: 1, textAlign: "center",
                borderRight: i < 2 ? "1px solid rgba(255,255,255,0.15)" : "none",
              }}>
                <div style={{
                  color: stat.green ? "#22c55e" : "#fff",
                  fontSize: 30, fontWeight: "bold", lineHeight: 1,
                  fontFamily: "sans-serif",
                }}>{stat.value}</div>
                <div style={{
                  color: "rgba(255,255,255,0.55)", fontSize: 9,
                  letterSpacing: 1.5, marginTop: 4,
                  fontFamily: "sans-serif",
                }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Headline */}
          <div style={{ marginBottom: 18 }}>
            <div style={{ color: "#fff", fontSize: 38, fontWeight: "bold", lineHeight: 1.15 }}>
              Empowering Kenya.
            </div>
            <div style={{
              fontSize: 38, fontWeight: "bold", lineHeight: 1.15,
              color: "#22c55e", fontStyle: "italic",
              WebkitTextStroke: "1px #22c55e",
            }}>
              One Venture
            </div>
            <div style={{ color: "#fff", fontSize: 38, fontWeight: "bold", lineHeight: 1.15 }}>
              At A Time.
            </div>
          </div>

          {/* Subtext */}
          <p style={{
            color: "rgba(255,255,255,0.7)", fontSize: 14, lineHeight: 1.75,
            textAlign: "center", marginBottom: 28,
            fontFamily: "sans-serif", fontWeight: 300,
          }}>
            A dynamic holding entity building Kenya's future through financial education, strategic consultancy, and commerce — powered by vision and driven by purpose.
          </p>

          {/* Service cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
            {[
              { Icon: AcademyIcon, title: "InvestorMind Academy", sub: "Financial Literacy & Investing" },
              { Icon: ConsultancyIcon, title: "VTEC Consultancy Services", sub: "Strategy & Business Growth" },
              { Icon: RetailIcon, title: "VTEC Retail Services", sub: "Quality. Style. Value." },
              { Icon: WalletIcon, title: "MILIKI App", sub: "Your Wealth Co-Pilot", badge: "COMING SOON" },
            ].map((s) => (
              <div key={s.title} style={{
                background: "rgba(13, 48, 40, 0.72)",
                border: "1px solid rgba(34,197,94,0.15)",
                borderRadius: 12,
                padding: "16px 14px",
                backdropFilter: "blur(8px)",
              }}>
                <div style={{ marginBottom: 8 }}><s.Icon /></div>
                <div style={{
                  color: "#fff", fontWeight: "bold", fontSize: 12,
                  marginBottom: 4, fontFamily: "sans-serif", lineHeight: 1.3,
                }}>{s.title}</div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontFamily: "sans-serif" }}>{s.sub}</div>
                {s.badge && (
                  <div style={{
                    marginTop: 8, display: "inline-block",
                    border: "1px solid rgba(255,255,255,0.3)",
                    borderRadius: 4, padding: "2px 8px",
                    color: "rgba(255,255,255,0.5)", fontSize: 9,
                    letterSpacing: 1, fontFamily: "sans-serif",
                  }}>{s.badge}</div>
                )}
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div style={{ display: "flex", gap: 12 }}>
            <button style={{
              flex: 1, background: "#22c55e", color: "#fff",
              border: "none", borderRadius: 28, padding: "15px 0",
              fontWeight: "bold", fontSize: 13, cursor: "pointer",
              fontFamily: "sans-serif", letterSpacing: 0.5,
            }}>Explore Our Services</button>
            <button style={{
              flex: 1, background: "transparent", color: "#fff",
              border: "1px solid rgba(255,255,255,0.4)",
              borderRadius: 28, padding: "15px 0",
              fontWeight: "bold", fontSize: 13, cursor: "pointer",
              fontFamily: "sans-serif", letterSpacing: 0.5,
            }}>Our Story</button>
          </div>
        </div>
      </div>

      {/* WhatsApp FAB */}
      <a href="https://wa.me/254700000000" style={{
        position: "fixed", bottom: 24, right: 20,
        width: 54, height: 54, borderRadius: "50%",
        background: "#25d366", display: "flex",
        alignItems: "center", justifyContent: "center",
        textDecoration: "none", zIndex: 999,
        boxShadow: "0 4px 16px rgba(37,211,102,0.4)",
      }}>
        <WhatsAppIcon />
      </a>

    </div>
  );
}