// src/routes/partnerships.tsx
// VTEC Business Group — Partnership onboarding page.
// Self-contained: only needs react, @tanstack/react-router and lucide-react.
// Submits to /api/partnership (src/routes/api/partnership.ts).

import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Camera,
  Check,
  Clock3,
  Globe2,
  GraduationCap,
  Handshake,
  Link2,
  Loader2,
  Lock,
  Mail,
  MapPin,
  PenLine,
  Phone,
  Rocket,
  Share2,
  ShieldCheck,
  Sparkles,
  Store,
  Target,
  Trash2,
  User,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

export const Route = createFileRoute("/partnerships")({
  head: () => ({
    meta: [
      { title: "Partner with VTEC Business Group | Partnership Onboarding" },
      {
        name: "description",
        content:
          "Apply to partner with VTEC Business Group, the Nairobi holding company behind InvestorMind Academy, MILIKI App, VTEC Consultancy and VTEC Retail.",
      },
      { property: "og:title", content: "Partner with VTEC Business Group" },
      { property: "og:description", content: "Build the next venture with VTEC. Start your partnership onboarding." },
      { property: "og:image", content: "https://vtecgroup.co.ke/og-image.png" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Playfair+Display:wght@700;900&family=Outfit:wght@400;500;600;700&family=Michroma&family=Caveat:wght@600&display=swap",
      },
    ],
  }),
  component: PartnershipsPage,
});

/* ───────────────────────────── content ───────────────────────────── */

const LOGO = "/vtec-logo.png";
const COMMUNITY_URL = "https://app.vtecgroup.co.ke/?open=community";

type Arm = {
  id: string;
  name: string;
  short: string;
  tag: string;
  status: "Active" | "Live now" | "Coming soon";
  icon: LucideIcon;
  logo: string;
  roles: string[];
};

const ARMS: Arm[] = [
  {
    id: "InvestorMind Academy",
    name: "InvestorMind Academy",
    short: "InvestorMind",
    tag: "Financial literacy and investing",
    status: "Active",
    icon: GraduationCap,
    logo: "/investormind-academy-logo.png",
    roles: ["Co-host programmes and campus sessions", "Bring learners and community chapters", "Contribute content and expert talks"],
  },
  {
    id: "MILIKI App",
    name: "MILIKI App",
    short: "MILIKI",
    tag: "Your wealth co-pilot",
    status: "Live now",
    icon: Wallet,
    logo: "/miliki-app-logo.jpg",
    roles: ["Put the app in front of your network", "Integrate financial tools and products", "Serve as a MILIKI ambassador"],
  },
  {
    id: "VTEC Consultancy Services",
    name: "VTEC Consultancy Services",
    short: "Consultancy",
    tag: "Strategy and business growth",
    status: "Coming soon",
    icon: Briefcase,
    logo: "/vtec-logo.png",
    roles: ["Refer founders and institutions", "Deliver joint client engagements", "Advise on sector playbooks"],
  },
  {
    id: "VTEC Retail Services",
    name: "VTEC Retail Services",
    short: "Retail",
    tag: "Quality. Style. Value.",
    status: "Coming soon",
    icon: Store,
    logo: "/vtec-logo.png",
    roles: ["Supply or source quality products", "Open distribution and pickup points", "Co-create brand collaborations"],
  },
];

const TRACKS = [
  "Strategic partner",
  "Investor or co-investor",
  "Distribution and sales",
  "Education and community",
  "Technology partner",
  "Media and brand",
  "Ambassador",
];

const STATUSES = ["Student", "Employed", "Entrepreneur or founder", "Freelancer or creator", "Professional or consultant", "Other"];
const INDUSTRIES = ["Finance and investing", "Education", "Technology", "Retail and e-commerce", "Media and creative", "Agriculture", "Real estate", "Consulting", "Other"];
const EXPERIENCE = ["Just starting", "1 to 3 years", "4 to 7 years", "8+ years"];
const HOURS = ["1 to 3 hours", "4 to 8 hours", "9 to 15 hours", "Full-time"];
const HEARD = ["Instagram", "LinkedIn", "TikTok", "Facebook", "WhatsApp", "Referral", "Event or campus", "Other"];
const COUNTIES = ["Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo-Marakwet", "Embu", "Garissa", "Homa Bay", "Isiolo", "Kajiado", "Kakamega", "Kericho", "Kiambu", "Kilifi", "Kirinyaga", "Kisii", "Kisumu", "Kitui", "Kwale", "Laikipia", "Lamu", "Machakos", "Makueni", "Mandera", "Marsabit", "Meru", "Migori", "Mombasa", "Murang'a", "Nairobi", "Nakuru", "Nandi", "Narok", "Nyamira", "Nyandarua", "Nyeri", "Samburu", "Siaya", "Taita-Taveta", "Tana River", "Tharaka-Nithi", "Trans Nzoia", "Turkana", "Uasin Gishu", "Vihiga", "Wajir", "West Pokot"];

const TRAITS: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Target, title: "Visionary", text: "You think in ten-year roadmaps and still ship something this week." },
  { icon: Rocket, title: "Ambitious", text: "You want to build a recognised, impactful and profitable business." },
  { icon: Globe2, title: "Kenya first, continental next", text: "You understand the Kenyan market and see the continent beyond it." },
  { icon: Users, title: "Community-minded", text: "You grow by lifting others, inside the VTEC Community." },
];

const PROCESS = [
  { title: "Apply", text: "Complete the four-step onboarding form below." },
  { title: "Review", text: "The partnerships team reviews your application." },
  { title: "Conversation", text: "We reach out to discuss where you fit best." },
  { title: "Join the community", text: "Your partner pass is countersigned inside the VTEC Community." },
];

const STEPS: { label: string; icon: LucideIcon }[] = [
  { label: "About you", icon: User },
  { label: "Background", icon: Briefcase },
  { label: "Partnership", icon: Handshake },
  { label: "Review", icon: ShieldCheck },
];

/* ───────────────────────────── form model ───────────────────────────── */

type FormState = {
  fullName: string;
  phone: string;
  email: string;
  location: string;
  age: string;
  status: string;
  organisation: string;
  industry: string;
  experience: string;
  link: string;
  tracks: string[];
  arms: string[];
  contribution: string;
  vision: string;
  hours: string;
  heardFrom: string;
  consent: boolean;
  pledge: boolean;
  website: string; // honeypot
};

type Errors = Record<string, string>;

const INITIAL: FormState = {
  fullName: "",
  phone: "",
  email: "",
  location: "",
  age: "",
  status: "",
  organisation: "",
  industry: "",
  experience: "",
  link: "",
  tracks: [],
  arms: [],
  contribution: "",
  vision: "",
  hours: "",
  heardFrom: "",
  consent: false,
  pledge: false,
  website: "",
};

function validate(step: number, f: FormState, hasPhoto: boolean): Errors {
  const e: Errors = {};
  if (step === 0) {
    if (f.fullName.trim().split(/\s+/).filter(Boolean).length < 2) e.fullName = "Enter your first and last name.";
    if (!/^\+?[0-9\s-]{9,16}$/.test(f.phone.trim())) e.phone = "Enter a valid phone number, for example +254 7XX XXX XXX.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = "Enter a valid email address.";
    if (f.location.trim().length < 2) e.location = "Select the county you are in now.";
    const age = Number(f.age);
    if (!f.age || !Number.isInteger(age)) e.age = "Enter your age in years.";
    else if (age < 18) e.age = "Partners must be 18 or older.";
    else if (age > 80) e.age = "Enter a valid age.";
    if (!hasPhoto) e.photo = "Add a clear passport-style photo of your face.";
  }
  if (step === 1) {
    if (!f.status) e.status = "Choose what best describes you.";
    if (!f.industry) e.industry = "Choose your main industry.";
    if (!f.experience) e.experience = "Choose your experience level.";
    if (f.link.trim() && !/^(https?:\/\/)?[^\s.]+\.[^\s]{2,}$/.test(f.link.trim())) e.link = "Enter a valid link, or leave this empty.";
  }
  if (step === 2) {
    if (f.tracks.length === 0) e.tracks = "Choose at least one way you want to partner.";
    if (f.arms.length === 0) e.arms = "Choose at least one VTEC arm.";
    if (f.contribution.trim().length < 30) e.contribution = "Tell us a little more (at least 30 characters).";
    if (f.vision.trim().length < 30) e.vision = "Tell us a little more (at least 30 characters).";
    if (!f.hours) e.hours = "Choose your weekly availability.";
  }
  if (step === 3) {
    if (!f.consent) e.consent = "Agree to the privacy terms to submit.";
    if (!f.pledge) e.pledge = "Confirm your details and pledge to submit.";
  }
  return e;
}

/* ───────────────────────────── helpers ───────────────────────────── */

const prefersReducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

async function compressImage(file: File, maxSide = 900, quality = 0.85): Promise<Blob> {
  const bitmap: ImageBitmap | HTMLImageElement = await (async () => {
    if ("createImageBitmap" in window) {
      try {
        return await createImageBitmap(file, { imageOrientation: "from-image" });
      } catch {
        /* fall through to <img> */
      }
    }
    return await new Promise<HTMLImageElement>((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve(img);
      };
      img.onerror = () => reject(new Error("Could not read the image."));
      img.src = url;
    });
  })();
  const w = "naturalWidth" in bitmap ? bitmap.naturalWidth : bitmap.width;
  const h = "naturalHeight" in bitmap ? bitmap.naturalHeight : bitmap.height;
  const scale = Math.min(1, maxSide / Math.max(w, h));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(w * scale);
  canvas.height = Math.round(h * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not process the image.");
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bitmap as CanvasImageSource, 0, 0, canvas.width, canvas.height);
  return await new Promise<Blob>((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Could not process the image."))), "image/jpeg", quality),
  );
}

function useTilt<T extends HTMLElement>(max = 9) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--ry", `${(x * max * 2).toFixed(2)}deg`);
      el.style.setProperty("--rx", `${(-y * max * 2).toFixed(2)}deg`);
      el.style.setProperty("--gx", `${((x + 0.5) * 100).toFixed(0)}%`);
      el.style.setProperty("--gy", `${((y + 0.5) * 100).toFixed(0)}%`);
    };
    const leave = () => {
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [max]);
  return ref;
}

function Tilt({ className = "", children }: { className?: string; children: ReactNode }) {
  const ref = useTilt<HTMLDivElement>();
  return (
    <div ref={ref} className={`pt-tilt ${className}`}>
      {children}
    </div>
  );
}

/* ───────────────────────────── photo preview + landing-style helpers ───────────────────────────── */

/* Decodes with createImageBitmap (no blob:/data: <img> needed, so CSP cannot block it). */
async function decodeBlob(blob: Blob): Promise<CanvasImageSource & { width: number; height: number }> {
  try {
    return await createImageBitmap(blob);
  } catch {
    return await new Promise((resolve, reject) => {
      const url = URL.createObjectURL(blob);
      const img = new Image();
      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve(img);
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("decode failed"));
      };
      img.src = url;
    });
  }
}

/* Draws a centre-cropped passport-ratio preview onto a canvas. Falls back to a placeholder, never an empty frame. */
function PhotoThumb({ blob, label }: { blob: Blob; label: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let off = false;
    setFailed(false);
    (async () => {
      try {
        const src = await decodeBlob(blob);
        const c = ref.current;
        if (off || !c) return;
        const W = 240;
        const H = 300;
        c.width = W;
        c.height = H;
        const ctx = c.getContext("2d");
        if (!ctx) throw new Error("no canvas");
        const scale = Math.max(W / src.width, H / src.height);
        const dw = src.width * scale;
        const dh = src.height * scale;
        ctx.fillStyle = "#e8eefb";
        ctx.fillRect(0, 0, W, H);
        ctx.drawImage(src, (W - dw) / 2, (H - dh) * 0.25, dw, dh);
        (src as ImageBitmap).close?.();
      } catch {
        if (!off) setFailed(true);
      }
    })();
    return () => {
      off = true;
    };
  }, [blob]);
  if (failed)
    return (
      <span className="pt-thumb-fb" role="img" aria-label={label}>
        <User size={30} aria-hidden="true" />
      </span>
    );
  return <canvas ref={ref} className="pt-thumb" role="img" aria-label={label} />;
}

const normEmail = (e: string) => {
  const [l, d = ""] = e.trim().toLowerCase().split("@");
  const dom = d === "googlemail.com" ? "gmail.com" : d;
  const local = l.split("+")[0];
  return `${dom === "gmail.com" ? local.replace(/\./g, "") : local}@${dom}`;
};
const normPhoneKe = (p: string) => {
  const d = p.replace(/\D/g, "");
  return /^(0|254)?\d{9}$/.test(d) ? "254" + d.slice(-9) : d;
};

/* Landing-page counter: rolls from one value to another, once. */
function Counter({ from, to, dur, white }: { from: number; to: number; dur: number; white?: boolean }) {
  const [v, setV] = useState(to);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let raf = 0;
    const t0 = performance.now();
    setV(from);
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      setV(Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [from, to, dur]);
  return <span className={`pt-cycle${white ? " w" : ""}`}>{v}</span>;
}

/* Same clock as the landing page nav: day count on the road to 31 Dec 2035. */
function Timeline() {
  const [d, setD] = useState<number | null>(null);
  useEffect(() => {
    const n = new Date();
    const day = Math.floor((Date.UTC(n.getFullYear(), n.getMonth(), n.getDate()) - Date.UTC(2025, 9, 1)) / 86400000) + 1;
    setD(Math.min(Math.max(day, 1), 3744));
  }, []);
  if (d === null) return null;
  return (
    <div className="pt-timeline">
      <span className="pt-bars" aria-hidden="true">
        <i /><i /><i /><i /><i /><i />
      </span>
      <span>
        <small>Timeline</small>
        <b>Day {d.toLocaleString("en-US")} / 3,744</b>
      </span>
    </div>
  );
}

/* Real brand logo from /public, with the icon as a fallback. */
function ArmLogo({ arm, cls, size }: { arm: Arm; cls: string; size: number }) {
  const [bad, setBad] = useState(false);
  return (
    <span className={`${cls}${bad ? " fb" : ""}`}>
      {bad ? <arm.icon size={size} aria-hidden="true" /> : <img src={arm.logo} alt="" loading="eager" decoding="async" onError={() => setBad(true)} />}
    </span>
  );
}

const BUBBLES: [string, string, string, string][] = [["8%", "5px", "11s", "0s"], ["32%", "7px", "13s", "3.5s"], ["60%", "9px", "12s", "7s"], ["84%", "12px", "14s", "1.8s"]];
const STARS: [number, number, number][] = [[0, 3, 0.45], [34, 4, 0.55], [68, 4, 0.7], [102, 3, 0.5], [136, 4, 0.65], [170, 3, 0.45]];

/* Live arms: rising bubbles. Coming-soon arms: a star bursts and spirals out. Same language as the landing cards. */
function CardFx({ soon, i }: { soon: boolean; i: number }) {
  return (
    <span className="pt-fx" aria-hidden="true">
      {soon ? (
        <span className="pt-orb" style={{ ["--ox" as string]: i % 2 ? "58%" : "62%", ["--oy" as string]: "50%", ["--d" as string]: `${(i * 1.35).toFixed(2)}s` } as CSSProperties}>
          <b className="flare" />
          <i className="cstar" />
          <span className="orbit o1">
            {STARS.map(([a, s, o]) => (
              <i key={a} style={{ ["--a" as string]: `${a}deg`, ["--s" as string]: `${s}px`, ["--o" as string]: o } as CSSProperties} />
            ))}
          </span>
        </span>
      ) : (
        BUBBLES.map(([x, s, t, d]) => <i key={x} className="b" style={{ ["--x" as string]: x, ["--s" as string]: s, ["--t" as string]: t, ["--d" as string]: d } as CSSProperties} />)
      )}
    </span>
  );
}

function ShareButton() {
  const [msg, setMsg] = useState("Share this opportunity");
  const share = async () => {
    const url = "https://vtecgroup.co.ke/partnerships";
    try {
      if (navigator.share) {
        await navigator.share({ title: "Partner with VTEC Business Group", text: "VTEC's Partnership Phase Two window is open.", url });
      } else {
        await navigator.clipboard.writeText(url);
        setMsg("Link copied");
        setTimeout(() => setMsg("Share this opportunity"), 2200);
      }
    } catch {
      /* share sheet dismissed */
    }
  };
  return (
    <button type="button" className="pt-btn pt-btn-quiet" onClick={share}>
      <Share2 size={18} aria-hidden="true" /> {msg}
    </button>
  );
}

/* Hides itself until /partnership-poster.jpg exists in /public. */
function PosterFigure() {
  const [bad, setBad] = useState(false);
  if (bad) return null;
  return (
    <figure className="pt-poster-fig">
      <img
        src="/partnership-poster.jpg"
        alt="VTEC Partnership Phase Two poster. The partnership window is open. Key areas of interest: financial technology, AI and technology, business consulting, and financial literacy, investing and related skills. Send inquiries to Partnerships@vtecgroup.co.ke."
        width={1402}
        height={1122}
        loading="lazy"
        decoding="async"
        onError={() => setBad(true)}
      />
    </figure>
  );
}

function HeroParticles() {
  const [dots, setDots] = useState<CSSProperties[]>([]);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    setDots(
      Array.from({ length: 22 }, () => {
        const size = 3 + Math.random() * 6;
        return {
          width: size,
          height: size,
          background: Math.random() > 0.5 ? "rgba(39,174,96,.55)" : "rgba(120,160,255,.5)",
          animationDuration: `${12 + Math.random() * 14}s`,
          animationDelay: `${-Math.random() * 20}s`,
          ["--x" as string]: `${Math.random() * 100}vw`,
          ["--dx" as string]: `${(Math.random() - 0.5) * 120}px`,
          ["--op" as string]: 0.2 + Math.random() * 0.3,
        } as CSSProperties;
      }),
    );
  }, []);
  return (
    <div className="pt-particles" aria-hidden="true">
      {dots.map((d, i) => (
        <span key={i} style={d} />
      ))}
    </div>
  );
}

/* ───────────────────────────── confetti ───────────────────────────── */

function Confetti() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !ctx || prefersReducedMotion()) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    cv.width = w * dpr;
    cv.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const colors = ["#27ae60", "#f0d580", "#c9a227", "#8fb4ff", "#ffffff", "#1aa39a"];
    const bits = Array.from({ length: 150 }, () => {
      const a = Math.random() * Math.PI * 2;
      const v = 6 + Math.random() * 11;
      return {
        x: w / 2,
        y: h * 0.38,
        vx: Math.cos(a) * v,
        vy: Math.sin(a) * v - 6,
        r: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.4,
        s: 5 + Math.random() * 6,
        c: colors[Math.floor(Math.random() * colors.length)],
      };
    });
    let frame = 0;
    let raf = 0;
    const tick = () => {
      frame++;
      ctx.clearRect(0, 0, w, h);
      for (const b of bits) {
        b.vy += 0.28;
        b.vx *= 0.99;
        b.x += b.vx;
        b.y += b.vy;
        b.r += b.vr;
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(b.r);
        ctx.fillStyle = b.c;
        ctx.globalAlpha = Math.max(0, 1 - frame / 170);
        ctx.fillRect(-b.s / 2, -b.s / 4, b.s, b.s / 2);
        ctx.restore();
      }
      if (frame < 170) raf = requestAnimationFrame(tick);
      else ctx.clearRect(0, 0, w, h);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={ref} className="pt-confetti" aria-hidden="true" />;
}

/* ───────────────────────────── field wrapper ───────────────────────────── */

function Field({
  id,
  label,
  hint,
  error,
  icon: Icon,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  icon?: LucideIcon;
  children: ReactNode;
}) {
  return (
    <div className="pt-field">
      <label htmlFor={id}>
        {label}
        {hint && <span className="pt-hint">{hint}</span>}
      </label>
      <div className="pt-ctl">
        {Icon && <Icon size={18} className="pt-ico" aria-hidden="true" />}
        {children}
      </div>
      {error && (
        <p className="pt-err" id={`${id}-err`} role="alert">
          <AlertCircle size={14} aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

/* ───────────────────────────── page ───────────────────────────── */

type Done = { ref: string; first: string; fullName: string; location: string; arms: string[]; date: string };

function PartnershipsPage() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [photo, setPhoto] = useState<{ blob: Blob } | null>(null);
  const [photoBusy, setPhotoBusy] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [done, setDone] = useState<Done | null>(null);
  const [focusFlag, setFocusFlag] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const hydrated = useRef(false);

  // Restore an unfinished draft (text fields only) after hydration.
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("vtec-partner-draft");
      if (raw) {
        const d = JSON.parse(raw);
        if (d?.form) setForm({ ...INITIAL, ...d.form, consent: false, pledge: false, website: "" });
        if (typeof d?.step === "number") setStep(Math.min(d.step, 2));
      }
    } catch {
      /* ignore */
    }
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current || done) return;
    try {
      sessionStorage.setItem("vtec-partner-draft", JSON.stringify({ form, step }));
    } catch {
      /* ignore */
    }
  }, [form, step, done]);

  // Move focus to the first invalid field after a failed validation.
  useEffect(() => {
    if (!focusFlag) return;
    const el = cardRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
    el?.focus({ preventScroll: false });
  }, [focusFlag]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key as string]) {
      setErrors((e) => {
        const { [key as string]: _drop, ...rest } = e;
        return rest;
      });
    }
  };

  const toggle = (key: "tracks" | "arms", value: string) => {
    set(key, form[key].includes(value) ? form[key].filter((v) => v !== value) : [...form[key], value]);
  };

  const scrollToCard = () => cardRef.current?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });

  const goNext = () => {
    const e = validate(step, form, !!photo);
    setErrors(e);
    if (Object.keys(e).length) {
      setFocusFlag((n) => n + 1);
      return;
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
    scrollToCard();
  };

  const goBack = () => {
    setErrors({});
    setSendError("");
    setStep((s) => Math.max(s - 1, 0));
    scrollToCard();
  };

  const onPhoto = useCallback(
    async (file?: File | null) => {
      if (!file) return;
      if (!/^image\/(jpeg|png|webp)$/.test(file.type)) {
        setErrors((e) => ({ ...e, photo: "Use a JPG, PNG or WebP image." }));
        return;
      }
      if (file.size > 12 * 1024 * 1024) {
        setErrors((e) => ({ ...e, photo: "That image is over 12 MB. Choose a smaller one." }));
        return;
      }
      setPhotoBusy(true);
      try {
        const blob = await compressImage(file);
        setPhoto({ blob });
        setErrors((e) => {
          const { photo: _drop, ...rest } = e;
          return rest;
        });
      } catch {
        setErrors((e) => ({ ...e, photo: "We couldn't read that image. Try another photo." }));
      } finally {
        setPhotoBusy(false);
      }
    },
    [],
  );

  const submit = async () => {
    for (let s = 0; s < STEPS.length; s++) {
      const e = validate(s, form, !!photo);
      if (Object.keys(e).length) {
        setStep(s);
        setErrors(e);
        setFocusFlag((n) => n + 1);
        return;
      }
    }
    if (!photo) return;
    setSending(true);
    setSendError("");
    try {
      const mine = { e: normEmail(form.email), p: normPhoneKe(form.phone) };
      try {
        const seen = JSON.parse(localStorage.getItem("vtec-partner-submitted") || "[]") as { e: string; p: string }[];
        if (seen.some((x) => x.e === mine.e || x.p === mine.p)) {
          setSendError("An application with this email address or phone number has already been received. Our team will be in touch.");
          setSending(false);
          return;
        }
      } catch {
        /* ignore */
      }
      const fd = new FormData();
      const { consent: _c, pledge: _p, ...payload } = form;
      fd.append("payload", JSON.stringify(payload));
      fd.append("photo", photo.blob, "passport.jpg");
      const res = await fetch("/api/partnership", { method: "POST", body: fd });
      const data = (await res.json().catch(() => null)) as { ok?: boolean; ref?: string; error?: string } | null;
      if (!res.ok || !data?.ok) throw new Error(data?.error || "Request failed");
      try {
        const seen = JSON.parse(localStorage.getItem("vtec-partner-submitted") || "[]");
        localStorage.setItem("vtec-partner-submitted", JSON.stringify([...seen, mine]));
      } catch {
        /* ignore */
      }
      try {
        sessionStorage.removeItem("vtec-partner-draft");
      } catch {
        /* ignore */
      }
      setDone({
        ref: data.ref || "VTEC-P",
        first: form.fullName.trim().split(/\s+/)[0],
        fullName: form.fullName.trim(),
        location: form.location.trim(),
        arms: form.arms,
        date: new Date().toLocaleDateString("en-KE", { day: "numeric", month: "long", year: "numeric" }),
      });
      setTimeout(scrollToCard, 60);
    } catch (err) {
      setSendError(
        (err instanceof Error && err.message !== "Request failed" ? err.message + " " : "") +
          "Your answers are still here. Check your connection and try again, or email partnerships@vtecgroup.co.ke.",
      );
    } finally {
      setSending(false);
    }
  };

  const err = (k: string) => errors[k];
  const aria = (k: string) => ({ "aria-invalid": err(k) ? true : undefined, "aria-describedby": err(k) ? `${k}-err` : undefined }) as const;

  return (
    <div className="pt-root">
      <style>{CSS}</style>

      {/* ── nav ── */}
      <header className="pt-nav">
        <div className="pt-wrap pt-nav-in">
          <a href="/" className="pt-brand" aria-label="VTEC Business Group home">
            <span className="pt-logo">
              <img src={LOGO} alt="" />
            </span>
            <span>
              <b>VTEC</b>
              <small>BUSINESS GROUP</small>
            </span>
          </a>
          <Timeline />
          <nav className="pt-nav-links" aria-label="Page">
            <a href="/" className="pt-nav-home">
              <ArrowLeft size={16} aria-hidden="true" /> Home
            </a>
            <a href="#apply" className="pt-btn pt-btn-sm">
              Apply now
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* ── hero ── */}
        <section className="pt-hero">
          <div className="pt-hero-gridlines" aria-hidden="true" />
          <HeroParticles />
          <div className="pt-hero-in">
            <p className="pt-pill">
              <span className="pt-dot" /> Partnership onboarding is open
            </p>
            <div className="pt-stats">
              <div className="pt-stat">
                <div className="pt-num"><Counter from={0} to={4} dur={1200} /><span>+</span></div>
                <p>Business arms</p>
              </div>
              <div className="pt-stat">
                <div className="pt-num"><span>#</span><Counter from={9} to={1} dur={1500} white /></div>
                <p>Holding vision</p>
              </div>
              <div className="pt-stat">
                <div className="pt-num"><Counter from={2025} to={2035} dur={1900} /></div>
                <p>Empire target</p>
              </div>
            </div>
            <h1 className="pt-serif pt-h1">
              <span className="pt-ln"><span>Build the next</span></span>
              <span className="pt-ln"><span className="pt-hl">Venture</span></span>
              <span className="pt-ln"><span>with VTEC.</span></span>
            </h1>
            <p className="pt-lead">
              VTEC Business Group is a Nairobi holding company across <b>financial education</b>, <b>consultancy</b>, retail and wealth technology. We are onboarding partners who plan in decades, not quarters.
            </p>

            <div className="pt-hero-arms">
              {ARMS.map((a, i) => {
                const soon = a.status === "Coming soon";
                return (
                  <div key={a.id} className={`pt-hc ${soon ? "is-soon" : "is-live"}`}>
                    <CardFx soon={soon} i={i} />
                    <ArmLogo arm={a} cls="pt-hc-logo" size={18} />
                    <div className="pt-hc-text">
                      <strong>{a.name}</strong>
                      <span>{a.tag}</span>
                      <span className={`pt-badge ${soon ? "soon" : "live"}`}>
                        <i />
                        {a.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-cta-row">
              <a href="#apply" className="pt-btn">
                Start onboarding <ArrowRight size={18} aria-hidden="true" />
              </a>
            </div>
            <div className="pt-hero-links">
              <a href="#arms" className="pt-hero-link">
                See where you fit <Target size={15} aria-hidden="true" />
              </a>
              <a href={COMMUNITY_URL} target="_blank" rel="noopener noreferrer" className="pt-hero-link">
                VTEC Community <Users size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="pt-hero-wave" aria-hidden="true">
            <svg className="wv wv1" viewBox="0 0 2880 160" preserveAspectRatio="none"><path d="M0 62 Q360 8 720 62 T1440 62 T2160 62 T2880 62 V160 H0Z" /></svg>
            <svg className="wv wv2" viewBox="0 0 2880 160" preserveAspectRatio="none"><path d="M0 88 Q360 40 720 88 T1440 88 T2160 88 T2880 88 V160 H0Z" /></svg>
            <svg className="wv wv3" viewBox="0 0 2880 160" preserveAspectRatio="none"><path d="M0 116 Q360 84 720 116 T1440 116 T2160 116 T2880 116 V160 H0Z" /></svg>
          </div>
        </section>

        {/* ── arms ── */}
        <section className="pt-sec" id="arms">
          <div className="pt-wrap">
            <span className="pt-label">Where you fit</span>
            <h2 className="pt-serif">
              Four arms.
              <span className="pt-h2-2">Find where you plug in.</span>
            </h2>
            <p className="pt-sub">
              Partners join one or more arms. Two are open today. Two are being built, and early partners help shape them.
            </p>
            <div className="pt-arms">
              {ARMS.map((a, i) => {
                const soon = a.status === "Coming soon";
                return (
                  <Tilt key={a.id} className={`pt-arm ${soon ? "is-soon" : "is-live"}`}>
                    <CardFx soon={soon} i={i} />
                    <div className="pt-arm-top">
                      <ArmLogo arm={a} cls="pt-arm-ico" size={24} />
                      <span className={`pt-badge ${soon ? "soon" : "live"}`}>
                        <i />
                        {a.status}
                      </span>
                    </div>
                    <h3>{a.name}</h3>
                    <p className="pt-arm-tag">{a.tag}</p>
                    <ul>
                      {a.roles.map((r) => (
                        <li key={r}>
                          <Check size={15} aria-hidden="true" /> {r}
                        </li>
                      ))}
                    </ul>
                  </Tilt>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── who ── */}
        <section className="pt-sec pt-who">
          <div className="pt-wrap pt-who-grid">
            <div>
              <h2 className="pt-serif">We back people who are building something.</h2>
              <p className="pt-sub">
                VTEC is led by three co-founders with complementary strengths: vision, operations and growth. We look for the same energy in
                our partners, from ambitious young founders to seasoned operators.
              </p>
            </div>
            <ul className="pt-traits">
              {TRAITS.map((t) => (
                <li key={t.title}>
                  <span className="pt-trait-ico">
                    <t.icon size={22} aria-hidden="true" />
                  </span>
                  <div>
                    <h3>{t.title}</h3>
                    <p>{t.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── process ── */}
        <section className="pt-sec pt-process">
          <div className="pt-wrap">
            <h2 className="pt-serif">From application to community.</h2>
            <ol className="pt-steps-line">
              {PROCESS.map((p, i) => (
                <li key={p.title}>
                  <span className="pt-step-n">{i + 1}</span>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

                {/* ── phase two poster ── */}
        <section className="pt-sec pt-poster" id="phase-two">
          <div className="pt-wrap pt-poster-grid">
            <div>
              <span className="pt-label">Phase two</span>
              <h2 className="pt-serif">
                The partnership window is open.
                <span className="pt-h2-2">Bigger vision. More opportunities.</span>
              </h2>
              <p className="pt-sub">
                We are inviting partners, young talent and ambitious individuals to join VTEC Business Group. Every application is reviewed and considered.
              </p>
              <ul className="pt-areas">
                {["Financial technology", "AI and technology", "Business consulting", "Financial literacy, investing and related skills"].map((t) => (
                  <li key={t}>
                    <Check size={16} aria-hidden="true" /> {t}
                  </li>
                ))}
              </ul>
              <div className="pt-cta-row">
                <a href="#apply" className="pt-btn">
                  Apply now <ArrowRight size={18} aria-hidden="true" />
                </a>
                <ShareButton />
              </div>
            </div>
            <PosterFigure />
          </div>
        </section>

        {/* ── apply ── */}
        <section className="pt-apply" id="apply">
          <div className="pt-wrap">
            <div className="pt-apply-head">
              <h2 className="pt-serif">Partnership onboarding</h2>
              <p>Four short steps, about five minutes. Your application goes straight to the VTEC partnerships team.</p>
            </div>

            <div className="pt-card" ref={cardRef}>
              {done ? (
                <SuccessView done={done} photoBlob={photo?.blob} />
              ) : (
                <>
                  {/* progress */}
                  <div className="pt-progress" role="group" aria-label={`Step ${step + 1} of ${STEPS.length}: ${STEPS[step].label}`}>
                    <div className="pt-progress-bar">
                      <span style={{ width: `${(step / (STEPS.length - 1)) * 100}%` }} />
                    </div>
                    <ol>
                      {STEPS.map((s, i) => (
                        <li key={s.label} className={i === step ? "on" : i < step ? "past" : ""} aria-current={i === step ? "step" : undefined}>
                          <span>{i < step ? <Check size={16} aria-hidden="true" /> : <s.icon size={16} aria-hidden="true" />}</span>
                          <em>{s.label}</em>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="pt-step" key={step}>
                    {/* step 1 */}
                    {step === 0 && (
                      <div className="pt-grid">
                        <Field id="fullName" label="Full name" icon={User} error={err("fullName")}>
                          <input className="pt-input" id="fullName" name="name" autoComplete="name" placeholder="As on your ID" value={form.fullName} onChange={(e) => set("fullName", e.target.value)} {...aria("fullName")} />
                        </Field>
                        <Field id="phone" label="Phone number" icon={Phone} error={err("phone")}>
                          <input className="pt-input" id="phone" name="tel" type="tel" inputMode="tel" autoComplete="tel" placeholder="+254 7XX XXX XXX" value={form.phone} onChange={(e) => set("phone", e.target.value)} {...aria("phone")} />
                        </Field>
                        <Field id="email" label="Email address" icon={Mail} error={err("email")}>
                          <input className="pt-input" id="email" name="email" type="email" inputMode="email" autoComplete="email" placeholder="you@example.com" value={form.email} onChange={(e) => set("email", e.target.value)} {...aria("email")} />
                        </Field>
                        <Field id="location" label="Current location" icon={MapPin} error={err("location")}>
                          <select className="pt-input" id="location" name="location" autoComplete="address-level1" value={form.location} onChange={(e) => set("location", e.target.value)} {...aria("location")}>
                            <option value="" disabled>Select your county</option>
                            {COUNTIES.map((c) => (
                              <option key={c} value={`${c} County`}>{c}</option>
                            ))}
                          </select>
                        </Field>
                        <Field id="age" label="Age" hint="18 or older. Helps us build the right cohort." icon={Clock3} error={err("age")}>
                          <input className="pt-input" id="age" name="age" type="number" inputMode="numeric" min={18} max={80} placeholder="e.g. 24" value={form.age} onChange={(e) => set("age", e.target.value)} {...aria("age")} />
                        </Field>

                        <div className="pt-field pt-span">
                          <label htmlFor="photo">
                            Passport photo<span className="pt-hint">Clear, front-facing, plain background</span>
                          </label>
                          <div className={`pt-drop ${err("photo") ? "bad" : ""} ${photo ? "has" : ""}`}>
                            {photo ? (
                              <>
                                <PhotoThumb blob={photo.blob} label="Your passport photo preview" />
                                <div className="pt-drop-meta">
                                  <strong>Photo added</strong>
                                  <span>{Math.max(1, Math.round(photo.blob.size / 1024))} KB, ready to send</span>
                                  <div className="pt-drop-actions">
                                    <label htmlFor="photo" className="pt-link-btn">
                                      <Camera size={15} aria-hidden="true" /> Replace
                                    </label>
                                    <button
                                      type="button"
                                      className="pt-link-btn"
                                      onClick={() => {
                                        setPhoto(null);
                                      }}
                                    >
                                      <Trash2 size={15} aria-hidden="true" /> Remove
                                    </button>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <label htmlFor="photo" className="pt-drop-empty">
                                {photoBusy ? <Loader2 size={26} className="pt-spin" aria-hidden="true" /> : <Camera size={26} aria-hidden="true" />}
                                <strong>{photoBusy ? "Preparing your photo…" : "Tap to add your photo"}</strong>
                                <span>JPG, PNG or WebP. We resize it for you.</span>
                              </label>
                            )}
                            <input
                              id="photo"
                              type="file"
                              accept="image/jpeg,image/png,image/webp"
                              className="pt-file"
                              onChange={(e) => {
                                onPhoto(e.target.files?.[0]);
                                e.target.value = "";
                              }}
                              {...aria("photo")}
                            />
                          </div>
                          {err("photo") && (
                            <p className="pt-err" id="photo-err" role="alert">
                              <AlertCircle size={14} aria-hidden="true" />
                              {err("photo")}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* step 2 */}
                    {step === 1 && (
                      <div className="pt-grid">
                        <Field id="status" label="What best describes you?" icon={User} error={err("status")}>
                          <select className="pt-input" id="status" value={form.status} onChange={(e) => set("status", e.target.value)} {...aria("status")}>
                            <option value="">Choose one</option>
                            {STATUSES.map((o) => (
                              <option key={o}>{o}</option>
                            ))}
                          </select>
                        </Field>
                        <Field id="organisation" label="Business or organisation" hint="Optional" icon={Briefcase}>
                          <input className="pt-input" id="organisation" autoComplete="organization" placeholder="Where you work or what you run" value={form.organisation} onChange={(e) => set("organisation", e.target.value)} />
                        </Field>
                        <Field id="industry" label="Main industry" icon={Target} error={err("industry")}>
                          <select className="pt-input" id="industry" value={form.industry} onChange={(e) => set("industry", e.target.value)} {...aria("industry")}>
                            <option value="">Choose one</option>
                            {INDUSTRIES.map((o) => (
                              <option key={o}>{o}</option>
                            ))}
                          </select>
                        </Field>
                        <Field id="experience" label="Experience in business" icon={Rocket} error={err("experience")}>
                          <select className="pt-input" id="experience" value={form.experience} onChange={(e) => set("experience", e.target.value)} {...aria("experience")}>
                            <option value="">Choose one</option>
                            {EXPERIENCE.map((o) => (
                              <option key={o}>{o}</option>
                            ))}
                          </select>
                        </Field>
                        <div className="pt-span">
                          <Field id="link" label="LinkedIn, website or portfolio" hint="Optional" icon={Link2} error={err("link")}>
                            <input className="pt-input" id="link" type="url" inputMode="url" placeholder="linkedin.com/in/your-name" value={form.link} onChange={(e) => set("link", e.target.value)} {...aria("link")} />
                          </Field>
                        </div>
                      </div>
                    )}

                    {/* step 3 */}
                    {step === 2 && (
                      <div className="pt-grid">
                        <fieldset className="pt-field pt-span pt-set" aria-describedby={err("tracks") ? "tracks-err" : undefined}>
                          <legend>How do you want to partner?</legend>
                          <div className="pt-chips">
                            {TRACKS.map((t) => (
                              <label key={t} className="pt-opt">
                                <input type="checkbox" checked={form.tracks.includes(t)} onChange={() => toggle("tracks", t)} {...(err("tracks") ? { "aria-invalid": true } : {})} />
                                <span>{t}</span>
                              </label>
                            ))}
                          </div>
                          {err("tracks") && (
                            <p className="pt-err" id="tracks-err" role="alert">
                              <AlertCircle size={14} aria-hidden="true" />
                              {err("tracks")}
                            </p>
                          )}
                        </fieldset>

                        <fieldset className="pt-field pt-span pt-set" aria-describedby={err("arms") ? "arms-err" : undefined}>
                          <legend>Which VTEC arms interest you?</legend>
                          <div className="pt-chips">
                            {ARMS.map((a) => (
                              <label key={a.id} className="pt-opt pt-opt-arm">
                                <input type="checkbox" checked={form.arms.includes(a.id)} onChange={() => toggle("arms", a.id)} {...(err("arms") ? { "aria-invalid": true } : {})} />
                                <span>
                                  <a.icon size={16} aria-hidden="true" /> {a.short}
                                </span>
                              </label>
                            ))}
                          </div>
                          {err("arms") && (
                            <p className="pt-err" id="arms-err" role="alert">
                              <AlertCircle size={14} aria-hidden="true" />
                              {err("arms")}
                            </p>
                          )}
                        </fieldset>

                        <div className="pt-span">
                          <Field id="contribution" label="What can you bring to VTEC?" hint="Skills, networks, capital, audience, distribution" error={err("contribution")}>
                            <textarea className="pt-input pt-noico" id="contribution" rows={4} maxLength={1500} value={form.contribution} onChange={(e) => set("contribution", e.target.value)} {...aria("contribution")} />
                          </Field>
                        </div>
                        <div className="pt-span">
                          <Field id="vision" label="Why VTEC, and where do you see yourself by 2035?" error={err("vision")}>
                            <textarea className="pt-input pt-noico" id="vision" rows={4} maxLength={1500} value={form.vision} onChange={(e) => set("vision", e.target.value)} {...aria("vision")} />
                          </Field>
                        </div>
                        <Field id="hours" label="Weekly availability" icon={Clock3} error={err("hours")}>
                          <select className="pt-input" id="hours" value={form.hours} onChange={(e) => set("hours", e.target.value)} {...aria("hours")}>
                            <option value="">Choose one</option>
                            {HOURS.map((o) => (
                              <option key={o}>{o}</option>
                            ))}
                          </select>
                        </Field>
                        <Field id="heardFrom" label="How did you hear about VTEC?" hint="Optional" icon={Sparkles}>
                          <select className="pt-input" id="heardFrom" value={form.heardFrom} onChange={(e) => set("heardFrom", e.target.value)}>
                            <option value="">Choose one</option>
                            {HEARD.map((o) => (
                              <option key={o}>{o}</option>
                            ))}
                          </select>
                        </Field>
                      </div>
                    )}

                    {/* step 4 */}
                    {step === 3 && (
                      <div>
                        <div className="pt-review">
                          {photo && <PhotoThumb blob={photo.blob} label="Your passport photo" />}
                          <dl>
                            <div><dt>Name</dt><dd>{form.fullName}</dd></div>
                            <div><dt>Phone</dt><dd>{form.phone}</dd></div>
                            <div><dt>Email</dt><dd>{form.email}</dd></div>
                            <div><dt>Location</dt><dd>{form.location}</dd></div>
                            <div><dt>Age</dt><dd>{form.age}</dd></div>
                            <div><dt>Background</dt><dd>{[form.status, form.industry, form.experience].filter(Boolean).join(" · ")}</dd></div>
                            <div><dt>Partner as</dt><dd>{form.tracks.join(", ")}</dd></div>
                            <div><dt>Arms</dt><dd>{form.arms.join(", ")}</dd></div>
                            <div><dt>Availability</dt><dd>{form.hours}</dd></div>
                          </dl>
                          <button type="button" className="pt-link-btn pt-edit" onClick={() => { setStep(0); scrollToCard(); }}>
                            <PenLine size={15} aria-hidden="true" /> Edit details
                          </button>
                        </div>

                        <div className="pt-checks">
                          <label className="pt-check">
                            <input type="checkbox" checked={form.pledge} onChange={(e) => set("pledge", e.target.checked)} {...aria("pledge")} />
                            <span>I confirm my details are accurate, and I pledge to work with integrity, vision and respect for the VTEC Community.</span>
                          </label>
                          {err("pledge") && (
                            <p className="pt-err" id="pledge-err" role="alert">
                              <AlertCircle size={14} aria-hidden="true" />
                              {err("pledge")}
                            </p>
                          )}
                          <label className="pt-check">
                            <input type="checkbox" checked={form.consent} onChange={(e) => set("consent", e.target.checked)} {...aria("consent")} />
                            <span>
                              I agree that VTEC Business Group may use these details to review my application, as described in the{" "}
                              <a href="/privacy-policy.html" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.
                            </span>
                          </label>
                          {err("consent") && (
                            <p className="pt-err" id="consent-err" role="alert">
                              <AlertCircle size={14} aria-hidden="true" />
                              {err("consent")}
                            </p>
                          )}
                        </div>

                        {sendError && (
                          <p className="pt-banner" role="alert">
                            <AlertCircle size={18} aria-hidden="true" /> {sendError}
                          </p>
                        )}
                      </div>
                    )}

                    {/* honeypot */}
                    <input className="pt-hp" tabIndex={-1} autoComplete="off" aria-hidden="true" name="website" value={form.website} onChange={(e) => set("website", e.target.value)} />
                  </div>

                  <div className="pt-actions">
                    {step > 0 ? (
                      <button type="button" className="pt-btn pt-btn-quiet" onClick={goBack} disabled={sending}>
                        <ArrowLeft size={18} aria-hidden="true" /> Back
                      </button>
                    ) : (
                      <span className="pt-secure">
                        <Lock size={14} aria-hidden="true" /> Sent securely to our team
                      </span>
                    )}
                    {step < STEPS.length - 1 ? (
                      <button type="button" className="pt-btn" onClick={goNext}>
                        Continue <ArrowRight size={18} aria-hidden="true" />
                      </button>
                    ) : (
                      <button type="button" className="pt-btn pt-btn-gold" onClick={submit} disabled={sending}>
                        {sending ? (
                          <>
                            <Loader2 size={18} className="pt-spin" aria-hidden="true" /> Sending application…
                          </>
                        ) : (
                          <>
                            Submit application <Handshake size={18} aria-hidden="true" />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="pt-foot">
        <div className="pt-wrap pt-foot-in">
          <p>© {new Date().getFullYear()} VTEC Business Group, Nairobi, Kenya.</p>
          <p>
            <a href="mailto:partnerships@vtecgroup.co.ke">partnerships@vtecgroup.co.ke</a> · <a href="/privacy-policy.html">Privacy</a> ·{" "}
            <a href="/terms-of-service.html">Terms</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

/* ───────────────────────────── success view ───────────────────────────── */

function SuccessView({ done, photoBlob }: { done: Done; photoBlob?: Blob }) {
  return (
    <div className="pt-done" aria-live="polite">
      <Confetti />
      <svg className="pt-tick" viewBox="0 0 80 80" aria-hidden="true">
        <circle cx="40" cy="40" r="34" />
        <path d="M25 41l10 10 20-22" />
      </svg>
      <h2 className="pt-serif">Welcome aboard, {done.first}.</h2>
      <p className="pt-done-lead">
        Your onboarding form has reached the VTEC partnerships team. Keep an eye on your inbox and phone. We will be in touch soon.
      </p>

      <Tilt className="pt-pass">
        <div className="pt-pass-top">
          <span className="pt-logo">
            <img src={LOGO} alt="" />
          </span>
          <div>
            <b>VTEC Partner Pass</b>
            <small>Application {done.ref}</small>
          </div>
          <span className="pt-pass-state">
            <span className="pt-dot" /> Pending
          </span>
        </div>
        <div className="pt-pass-body">
          {photoBlob && <PhotoThumb blob={photoBlob} label={`Passport photo of ${done.fullName}`} />}
          <div>
            <h3>{done.fullName}</h3>
            <p>
              <MapPin size={14} aria-hidden="true" /> {done.location}
            </p>
            <div className="pt-pass-tags">
              {done.arms.map((a) => (
                <span key={a}>{a}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="pt-sign">
          <div>
            <span className="pt-sign-label">Your signature</span>
            <span className="pt-sign-ink">{done.fullName}</span>
            <span className="pt-sign-date">Signed {done.date}</span>
          </div>
          <div className="pt-sign-wait">
            <span className="pt-sign-label">VTEC Community</span>
            <span className="pt-sign-box">
              <PenLine size={16} aria-hidden="true" /> Awaiting countersignature
            </span>
            <span className="pt-sign-date">Added once your application is approved</span>
          </div>
        </div>
        <div className="pt-sheen" aria-hidden="true" />
      </Tilt>

      <ol className="pt-next">
        <li>
          <span>1</span>
          <div>
            <h3>We review your application</h3>
            <p>The partnerships team looks at your background, the arms you chose and your 2035 vision.</p>
          </div>
        </li>
        <li>
          <span>2</span>
          <div>
            <h3>We reach out</h3>
            <p>Expect a message or call to discuss where you fit best.</p>
          </div>
        </li>
        <li>
          <span>3</span>
          <div>
            <h3>The community countersigns</h3>
            <p>Your partner pass is completed inside the VTEC Community.</p>
          </div>
        </li>
      </ol>

      <div className="pt-done-cta">
        <a className="pt-btn" href={COMMUNITY_URL} target="_blank" rel="noopener noreferrer">
          <Users size={18} aria-hidden="true" /> Visit the VTEC Community
        </a>
        <a className="pt-btn pt-btn-quiet" href="/">
          Back to home
        </a>
      </div>
    </div>
  );
}

/* ───────────────────────────── styles ───────────────────────────── */

const CSS = `
@import url("https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Playfair+Display:wght@700;900&family=Outfit:wght@400;500;600;700&family=Michroma&family=Caveat:wght@600&display=swap");
.pt-root{--navy:#0D2149;--deep:#050b16;--mid:#163272;--green:#1f8c3b;--gb:#27ae60;--teal:#1aa39a;--gold:#c9a227;--gl:#f0d580;--ice:#8ec5ff;--off:#f4f7fc;--ink:#1a1a2e;--gray:#4a5568;--line:#d5deee;--err:#c0392b;
font-family:'Outfit',system-ui,sans-serif;color:var(--ink);background:var(--off);min-height:100vh;overflow-x:hidden;-webkit-font-smoothing:antialiased;line-height:1.5}
.pt-root *,.pt-root *::before,.pt-root *::after{box-sizing:border-box}
.pt-root h1,.pt-root h2,.pt-root h3,.pt-root p,.pt-root ul,.pt-root ol,.pt-root dl,.pt-root dd,.pt-root figure{margin:0;padding:0}
.pt-root ul,.pt-root ol{list-style:none}
.pt-root a{color:inherit}
.pt-root :focus-visible{outline:3px solid var(--gl);outline-offset:2px}
.pt-serif{font-family:'DM Serif Display','Playfair Display',serif;font-weight:900}
.pt-wrap{width:min(1140px,100% - 40px);margin-inline:auto}

/* nav: translucent blue glass, same family as the landing page */
.pt-nav{position:sticky;top:0;z-index:50;background:linear-gradient(180deg,rgba(22,50,114,.62) 0%,rgba(13,33,73,.66) 100%);backdrop-filter:blur(16px) saturate(150%);-webkit-backdrop-filter:blur(16px) saturate(150%);border-bottom:1px solid rgba(255,255,255,.12)}
.pt-nav-in{display:flex;align-items:center;justify-content:space-between;gap:14px;height:70px}
.pt-brand{display:flex;align-items:center;gap:12px;color:#fff;text-decoration:none;min-width:0}
.pt-brand b{display:block;font-family:'Michroma','Outfit',sans-serif;font-weight:400;letter-spacing:3px;font-size:17px;line-height:1}
.pt-brand small{display:block;color:var(--gb);letter-spacing:3.2px;font-size:9.5px;margin-top:5px}
.pt-logo{width:44px;height:44px;border-radius:50%;overflow:hidden;border:2px solid var(--gb);background:#fff;flex:none;display:block}
.pt-logo img{width:100%;height:100%;object-fit:cover;object-position:center 25%;display:block}
.pt-timeline{display:none;align-items:center;gap:10px;color:#fff}
.pt-timeline small{display:block;font-size:9px;letter-spacing:2.4px;text-transform:uppercase;color:rgba(190,215,255,.8)}
.pt-timeline b{display:block;font-size:13px;font-weight:600;letter-spacing:.4px;font-variant-numeric:tabular-nums}
.pt-bars{display:flex;align-items:flex-end;gap:3px;height:26px}
.pt-bars i{display:block;width:3px;border-radius:2px;background:rgba(142,197,255,.75);animation:ptBar 3.2s ease-in-out infinite}
.pt-bars i:nth-child(1){height:30%}.pt-bars i:nth-child(2){height:42%;animation-delay:.2s}.pt-bars i:nth-child(3){height:56%;animation-delay:.4s}.pt-bars i:nth-child(4){height:70%;animation-delay:.6s}.pt-bars i:nth-child(5){height:84%;animation-delay:.8s}.pt-bars i:nth-child(6){height:100%;animation-delay:1s}
@keyframes ptBar{0%,100%{opacity:.55}50%{opacity:1}}
@media(min-width:760px){.pt-timeline{display:flex}}
.pt-nav-links{display:flex;align-items:center;gap:14px}
.pt-nav-home{display:none;align-items:center;gap:6px;color:#c6d3ee;text-decoration:none;font-size:.92rem}
@media(min-width:560px){.pt-nav-home{display:inline-flex}.pt-brand b{font-size:21px}}

/* buttons */
.pt-btn{position:relative;overflow:hidden;display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:48px;padding:0 26px;border-radius:999px;border:0;font:inherit;font-weight:600;font-size:15px;color:#fff;text-decoration:none;cursor:pointer;background:linear-gradient(135deg,var(--green),var(--gb));box-shadow:0 8px 28px rgba(39,174,96,.38);transition:transform .2s,box-shadow .2s,opacity .2s;-webkit-tap-highlight-color:transparent}
.pt-btn:hover{transform:translateY(-2px);box-shadow:0 14px 36px rgba(39,174,96,.48)}
.pt-btn:active{transform:scale(.97)}
.pt-btn::after{content:"";position:absolute;top:0;bottom:0;left:-60%;width:30%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.22),transparent);transform:skewX(-20deg);animation:ptShine 8s ease-in-out infinite;pointer-events:none}
@keyframes ptShine{0%,65%{left:-60%}100%{left:130%}}
.pt-btn:disabled{opacity:.65;cursor:progress;transform:none}
.pt-btn-sm{min-height:40px;padding:0 18px;font-size:.92rem}
.pt-btn-quiet{background:transparent;color:var(--navy);border:1.5px solid var(--line);box-shadow:none}
.pt-btn-quiet::after{display:none}
.pt-btn-quiet:hover{background:#eef3fb;box-shadow:none}
.pt-btn-gold{background:linear-gradient(135deg,var(--gl),var(--gold));color:var(--navy);box-shadow:0 10px 28px -10px rgba(201,162,39,.8)}
.pt-spin{animation:ptSpin 1s linear infinite}
@keyframes ptSpin{to{transform:rotate(360deg)}}

/* hero: landing photo, aurora, grid, particles, glass cards, glass waves */
.pt-hero{position:relative;isolation:isolate;color:#fff;text-align:center;overflow:hidden;padding:46px 0 150px;background:linear-gradient(180deg,rgba(6,14,28,.58) 0%,rgba(8,17,32,.72) 45%,rgba(5,11,22,.94) 88%,#050b16 100%),radial-gradient(ellipse 720px 520px at 50% 38%,rgba(6,14,28,.15),rgba(6,14,28,.7) 100%),url(/1000100227.jpg) center/cover no-repeat,#050b16}
.pt-hero::before{content:"";position:absolute;inset:-20%;z-index:0;pointer-events:none;background:radial-gradient(ellipse at 20% 60%,rgba(31,140,59,.18) 0%,transparent 55%),radial-gradient(ellipse at 80% 20%,rgba(22,50,114,.4) 0%,transparent 55%);animation:ptAurora 32s ease-in-out infinite alternate;will-change:transform}
@keyframes ptAurora{0%{transform:translate3d(-2%,-1%,0) scale(1)}100%{transform:translate3d(3%,2%,0) scale(1.08)}}
.pt-hero-gridlines{position:absolute;inset:-44px 0 0 0;z-index:0;opacity:.05;background-image:linear-gradient(var(--green) 1px,transparent 1px),linear-gradient(90deg,var(--green) 1px,transparent 1px);background-size:44px 44px;-webkit-mask-image:radial-gradient(ellipse 85% 70% at 50% 45%,#000 20%,transparent 75%);mask-image:radial-gradient(ellipse 85% 70% at 50% 45%,#000 20%,transparent 75%);animation:ptGrid 18s linear infinite;pointer-events:none}
@keyframes ptGrid{to{transform:translate3d(0,44px,0)}}
.pt-particles{position:absolute;inset:0;z-index:1;overflow:hidden;pointer-events:none}
.pt-particles span{position:absolute;bottom:-20px;left:var(--x);border-radius:50%;opacity:0;animation:ptRise linear infinite}
@keyframes ptRise{0%{transform:translate3d(0,0,0);opacity:0}10%{opacity:var(--op)}100%{transform:translate3d(var(--dx),-110vh,0);opacity:0}}
.pt-hero-in{position:relative;z-index:2;width:min(780px,100% - 40px);margin-inline:auto;display:flex;flex-direction:column;align-items:center}
.pt-hero-wave{position:absolute;left:0;right:0;bottom:-1px;height:120px;z-index:3;overflow:hidden;pointer-events:none}
.pt-hero-wave::before{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 0%,rgba(120,150,210,.10) 45%,rgba(190,205,235,.22) 100%)}
.wv{position:absolute;left:0;bottom:0;width:200%;height:100%;will-change:transform}
.wv1{fill:rgba(244,247,252,.14);animation:ptWv 46s linear infinite}
.wv2{fill:rgba(244,247,252,.34);animation:ptWv 34s linear infinite reverse}
.wv3{fill:#f4f7fc;animation:ptWv 58s linear infinite}
@keyframes ptWv{from{transform:translate3d(0,0,0)}to{transform:translate3d(-50%,0,0)}}

.pt-pill{position:relative;overflow:hidden;display:inline-flex;align-items:center;gap:8px;padding:6px 16px;border-radius:999px;border:1px solid rgba(140,190,255,.42);background:rgba(110,168,255,.12);font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#a9cdff;margin-bottom:24px;animation:ptFade .8s ease both}
.pt-pill::after{content:"";position:absolute;top:0;bottom:0;left:-50%;width:30%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.14),transparent);transform:skewX(-20deg);animation:ptChip 9s ease-in-out infinite}
@keyframes ptChip{0%,60%{left:-50%}100%{left:130%}}
@keyframes ptFade{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}
.pt-dot{width:7px;height:7px;border-radius:50%;background:var(--ice);flex:none;display:inline-block;animation:ptPulse 2s infinite}
@keyframes ptPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.5)}}

.pt-stats{position:relative;display:flex;gap:28px;flex-wrap:wrap;justify-content:center;padding-bottom:22px;margin-bottom:26px;border-bottom:1px solid rgba(255,255,255,.15);animation:ptFade .9s .2s ease both}
.pt-stats::after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:1px;background:linear-gradient(90deg,transparent 0%,transparent 40%,rgba(110,168,255,.95) 50%,transparent 60%,transparent 100%);background-size:300% 100%;animation:ptLine 8s linear infinite}
@keyframes ptLine{from{background-position:100% 0}to{background-position:0 0}}
.pt-stat{position:relative;text-align:center}
.pt-stat:not(:last-child)::after{content:"";position:absolute;right:-14px;top:50%;transform:translateY(-50%);width:1px;height:32px;background:rgba(255,255,255,.15)}
.pt-num{font-family:'Playfair Display',serif;font-size:30px;font-weight:900;line-height:1;color:#fff;font-variant-numeric:tabular-nums}
.pt-num span{color:var(--ice);text-shadow:0 0 14px rgba(110,168,255,.35)}
.pt-num span.w{color:#fff;text-shadow:none}
.pt-stat p{margin-top:6px;font-size:10px;letter-spacing:1px;text-transform:uppercase;color:rgba(255,255,255,.7)}

.pt-h1{font-size:clamp(2.3rem,9vw,4rem);line-height:1.08;letter-spacing:-.5px;color:#fff;margin-bottom:18px}
.pt-ln{display:block;overflow:hidden;padding-bottom:.12em;margin-bottom:-.12em}
.pt-ln>span{display:inline-block;animation:ptLn 1s cubic-bezier(.2,.8,.2,1) both}
.pt-ln:nth-child(1)>span{animation-delay:.1s}.pt-ln:nth-child(2)>span{animation-delay:.28s}.pt-ln:nth-child(3)>span{animation-delay:.46s}
@keyframes ptLn{from{transform:translateY(105%)}to{transform:none}}
.pt-ln>.pt-hl{position:relative;color:#7fb0ff;background:linear-gradient(110deg,#3f78e8 0%,#6ea8ff 40%,#bcd6ff 50%,#6ea8ff 60%,#3f78e8 100%);background-size:250% 100%;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:ptLn 1s cubic-bezier(.2,.8,.2,1) .28s both,ptShineTxt 9s ease-in-out 1.4s infinite}
@keyframes ptShineTxt{0%,25%{background-position:100% 0}75%,100%{background-position:0 0}}
.pt-lead{max-width:34em;color:rgba(255,255,255,.74);font-size:clamp(.95rem,2.6vw,1.05rem);line-height:1.8;margin-bottom:30px;animation:ptFade .9s .3s ease both}
.pt-lead b{color:#fff;font-weight:600;padding-bottom:1px;background:linear-gradient(var(--gb),var(--gb)) 0 100%/100% 2px no-repeat}

.pt-hero-arms{display:grid;grid-template-columns:repeat(2,1fr);grid-auto-rows:1fr;gap:10px;width:100%;margin-bottom:28px;animation:ptFade .9s .35s ease both}
@media(min-width:900px){.pt-hero{padding-top:70px}.pt-hero-in{width:min(1000px,100% - 40px)}.pt-hero-arms{grid-template-columns:repeat(4,1fr);gap:12px}}
.pt-hc{position:relative;overflow:hidden;isolation:isolate;display:flex;align-items:stretch;gap:10px;padding:12px 10px;text-align:left;border-radius:14px;border:1px solid rgba(255,255,255,.12);background:linear-gradient(160deg,rgba(22,50,114,.28) 0%,rgba(13,33,73,.30) 55%,rgba(8,20,45,.38) 100%);-webkit-backdrop-filter:blur(8px) saturate(120%);backdrop-filter:blur(8px) saturate(120%);box-shadow:0 8px 22px rgba(0,0,0,.18),inset 0 1px 0 rgba(255,255,255,.12);transition:transform .25s ease,border-color .25s ease}
.pt-hc:hover{transform:translateY(-2px);border-color:rgba(255,255,255,.22)}
.pt-hc.is-live{border-color:rgba(39,174,96,.38);animation:ptLive 7s ease-in-out infinite}
@keyframes ptLive{0%,100%{border-color:rgba(39,174,96,.28)}50%{border-color:rgba(39,174,96,.58)}}
.pt-hc::before{content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;background:radial-gradient(circle at 12% 0%,rgba(255,255,255,.07),transparent 55%)}
.pt-hc.is-live::before{background:radial-gradient(circle at 12% 0%,rgba(39,174,96,.14),transparent 58%)}
.pt-hc::after{content:"";position:absolute;top:0;bottom:0;left:-70%;width:35%;z-index:-1;pointer-events:none;background:linear-gradient(100deg,transparent,rgba(255,255,255,.06),transparent);transform:skewX(-18deg);animation:ptSweep 12s ease-in-out infinite}
.pt-hc:nth-child(2)::after{animation-delay:3s}.pt-hc:nth-child(3)::after{animation-delay:6s}.pt-hc:nth-child(4)::after{animation-delay:9s}
@keyframes ptSweep{0%,70%{left:-70%}100%{left:140%}}
.pt-hc-logo,.pt-arm-ico{display:grid;place-items:center;flex:none;overflow:hidden;background:#fff;border:1px solid rgba(255,255,255,.4)}
.pt-hc-logo{width:34px;height:34px;border-radius:50%}
.pt-hc-logo img,.pt-arm-ico img{width:100%;height:100%;object-fit:contain;display:block}
.pt-hc-logo.fb,.pt-arm-ico.fb{background:rgba(255,255,255,.08);color:var(--ice)}
.pt-hc-text{display:flex;flex-direction:column;flex:1;min-width:0}
.pt-hc-text strong{display:block;color:#fff;font-size:12px;font-weight:700;line-height:1.3;margin-bottom:2px}
.pt-hc-text>span:not(.pt-badge){display:block;color:rgba(255,255,255,.62);font-size:11px;line-height:1.35;margin-bottom:8px}
.pt-badge{position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center;gap:6px;width:100%;height:22px;margin-top:auto;padding:0 6px;border-radius:6px;font-size:9px;font-weight:700;line-height:1;letter-spacing:.9px;text-transform:uppercase;white-space:nowrap}
.pt-badge i{position:relative;width:5px;height:5px;border-radius:50%;flex:none}
.pt-badge.live{color:#6ee79a;background:rgba(39,174,96,.14);border:1px solid rgba(39,174,96,.42)}
.pt-badge.live i{background:var(--gb)}
.pt-badge.live i::after{content:"";position:absolute;inset:0;border-radius:50%;background:var(--gb);animation:ptPing 3s ease-out infinite}
@keyframes ptPing{0%{transform:scale(1);opacity:.8}100%{transform:scale(3.2);opacity:0}}
.pt-badge.soon{color:#dcc274;border:1px dashed rgba(201,162,39,.45);background:linear-gradient(-45deg,rgba(201,162,39,.09) 25%,transparent 25% 50%,rgba(201,162,39,.09) 50% 75%,transparent 75%) 0 0/14px 14px,rgba(201,162,39,.04)}
.pt-badge.soon i{background:var(--gold)}

/* card effects: bubbles rise on live arms, a star bursts and spirals on coming-soon arms */
.pt-fx{position:absolute;inset:0;z-index:-1;pointer-events:none;overflow:hidden;border-radius:inherit}
.pt-fx .b{position:absolute;bottom:-20px;left:var(--x);width:var(--s);height:var(--s);border-radius:50%;opacity:0;border:1px solid rgba(190,255,220,.75);background:radial-gradient(circle at 30% 28%,rgba(255,255,255,.95) 0%,rgba(150,255,200,.55) 28%,rgba(39,174,96,.28) 58%,transparent 74%);box-shadow:0 0 6px 1px rgba(140,255,195,.8),0 0 16px 3px rgba(39,174,96,.45),inset 0 0 5px rgba(255,255,255,.55);animation:ptBubble var(--t) ease-in-out infinite;animation-delay:var(--d);will-change:transform,opacity}
@keyframes ptBubble{0%{transform:translate3d(0,0,0);opacity:0}12%{opacity:1}50%{transform:translate3d(5px,-110px,0);opacity:.95}85%{opacity:.7}100%{transform:translate3d(-4px,-240px,0);opacity:0}}
.pt-orb{position:absolute;left:var(--ox);top:var(--oy);width:0;height:0;perspective:240px}
.pt-orb::before{content:"";position:absolute;left:-34px;top:-34px;width:68px;height:68px;border-radius:50%;background:radial-gradient(circle,rgba(255,244,205,.6),rgba(201,162,39,.2) 45%,transparent 68%);opacity:0;animation:ptFlash 5.5s ease-out infinite;animation-delay:var(--d)}
.pt-orb .cstar{position:absolute;left:-7px;top:-7px;width:14px;height:14px;opacity:0;background:#fff6d2;clip-path:polygon(50% 0,60% 40%,100% 50%,60% 60%,50% 100%,40% 60%,0 50%,40% 40%);animation:ptStar 5.5s ease-out infinite;animation-delay:var(--d)}
.pt-orb .orbit{position:absolute;left:0;top:0;width:0;height:0;opacity:0;filter:drop-shadow(0 0 3px rgba(240,213,128,.95)) drop-shadow(0 0 7px rgba(201,162,39,.6));animation:ptRing 5.5s cubic-bezier(.2,.7,.3,1) infinite;animation-delay:calc(var(--d) + .1s);will-change:transform,opacity}
.pt-orb .orbit i{position:absolute;left:0;top:0;width:var(--s);height:var(--s);margin:calc(var(--s)/-2);background:#fff3c4;opacity:var(--o);clip-path:polygon(50% 0,60% 40%,100% 50%,60% 60%,50% 100%,40% 60%,0 50%,40% 40%);transform:rotate(var(--a)) translateX(46px) rotate(calc(var(--a)*-1))}
@keyframes ptFlash{0%{opacity:0;transform:scale(.1)}4%{opacity:1;transform:scale(.9)}30%,100%{opacity:0;transform:scale(1.7)}}
@keyframes ptStar{0%{opacity:0;transform:scale(.2) rotate(0)}5%{opacity:1;transform:scale(1.9) rotate(45deg)}18%{opacity:.95;transform:scale(1.1) rotate(90deg)}45%{opacity:0;transform:scale(.5) rotate(180deg)}100%{opacity:0}}
@keyframes ptRing{0%{opacity:0;transform:rotateX(66deg) rotateZ(0) scale(.05)}6%{opacity:1}55%{opacity:.7}78%,100%{opacity:0;transform:rotateX(66deg) rotateZ(300deg) scale(1)}}

.pt-cta-row{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
.pt-hero-links{display:flex;align-items:center;justify-content:center;gap:26px;margin-top:10px}
.pt-hero-link{position:relative;display:inline-flex;align-items:center;gap:7px;padding:8px 2px;min-height:40px;color:rgba(255,255,255,.84);font-size:14px;font-weight:600;text-decoration:none;transition:color .2s}
.pt-hero-link svg{color:var(--gb);flex:none;transition:transform .25s}
.pt-hero-link::after{content:"";position:absolute;left:0;right:0;bottom:4px;height:1px;background:linear-gradient(90deg,var(--gb),rgba(255,255,255,.35));opacity:.35;transition:opacity .25s}
.pt-hero-link:hover{color:#fff}.pt-hero-link:hover::after{opacity:1}.pt-hero-link:hover svg{transform:translateX(2px)}

/* sections */
.pt-sec{padding:72px 0}
.pt-label{display:flex;align-items:center;gap:12px;margin-bottom:14px;color:var(--green);font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase}
.pt-label::before{content:"";width:28px;height:2px;background:var(--green);flex:none}
.pt-sec h2{font-size:clamp(1.9rem,5.2vw,2.9rem);line-height:1.1;color:var(--navy);margin-bottom:14px}
.pt-h2-2{display:block;color:var(--green)}
.pt-sub{color:var(--gray);line-height:1.8;max-width:40em;font-size:1.02rem;margin-bottom:30px}

/* arms */
.pt-arms{display:grid;gap:18px;grid-template-columns:repeat(auto-fit,minmax(250px,1fr))}
.pt-arm{position:relative;isolation:isolate;overflow:hidden;background:linear-gradient(160deg,var(--mid),var(--navy) 60%,var(--deep));color:#fff;border-radius:22px;padding:24px;border:1px solid rgba(255,255,255,.1);box-shadow:0 24px 50px -28px rgba(13,33,73,.8);transition:transform .25s,border-color .25s}
.pt-arm.is-live{border-color:rgba(39,174,96,.4)}
.pt-arm-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px}
.pt-arm-ico{width:54px;height:54px;border-radius:16px;padding:5px}
.pt-arm .pt-badge{width:auto;height:26px;padding:0 12px;margin:0}
.pt-arm h3{font-size:1.25rem;font-weight:600;margin-bottom:4px}
.pt-arm-tag{color:#9fb2d9;font-size:.95rem;margin-bottom:16px}
.pt-arm li{display:flex;gap:10px;align-items:flex-start;font-size:.93rem;color:#dbe6ff;padding:7px 0;border-top:1px solid rgba(255,255,255,.08)}
.pt-arm li svg{color:var(--gb);flex:none;margin-top:3px}
.pt-tilt{transform:perspective(900px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));transition:transform .18s ease-out;will-change:transform;position:relative}

/* phase two poster */
.pt-poster{background:#fff}
.pt-poster-grid{display:grid;gap:34px;align-items:center}
@media(min-width:900px){.pt-poster-grid{grid-template-columns:1fr 1.05fr;gap:60px}}
.pt-areas{display:grid;gap:10px;margin-bottom:28px}
.pt-areas li{display:flex;gap:12px;align-items:center;padding:12px 14px;border-radius:14px;background:var(--off);border:1px solid #e3eaf6;color:var(--navy);font-weight:500}
.pt-areas svg{color:var(--green);flex:none}
.pt-poster-fig img{display:block;width:100%;height:auto;border-radius:20px;box-shadow:0 30px 60px -30px rgba(13,33,73,.55);border:1px solid #e3eaf6}
.pt-poster:has(.pt-poster-fig) .pt-poster-grid{align-items:center}
.pt-poster-grid:not(:has(.pt-poster-fig)){grid-template-columns:1fr;max-width:640px}

/* who */
.pt-who{background:var(--off)}
.pt-who-grid{display:grid;gap:34px}
@media(min-width:900px){.pt-who-grid{grid-template-columns:1fr 1fr;gap:70px;align-items:start}.pt-who .pt-sub{margin-bottom:0}}
.pt-traits li{display:flex;gap:16px;padding:20px 0;border-top:1px solid var(--line)}
.pt-traits li:last-child{border-bottom:1px solid var(--line)}
.pt-trait-ico{width:48px;height:48px;border-radius:14px;display:grid;place-items:center;flex:none;background:var(--navy);color:var(--gb)}
.pt-traits h3{font-size:1.1rem;font-weight:600;color:var(--navy);margin-bottom:2px}
.pt-traits p{color:var(--gray);font-size:.97rem}

/* process */
.pt-process{padding-bottom:40px;background:#fff}
.pt-steps-line{display:grid;gap:26px;margin-top:30px;position:relative}
.pt-steps-line::before{content:"";position:absolute;left:21px;top:10px;bottom:10px;width:2px;background:linear-gradient(var(--gb),#4a7bd8)}
.pt-steps-line li{position:relative;padding-left:64px}
.pt-step-n{position:absolute;left:0;top:0;width:44px;height:44px;border-radius:50%;display:grid;place-items:center;background:var(--navy);color:#fff;font-weight:700;border:3px solid #fff;box-shadow:0 0 0 2px var(--gb)}
.pt-steps-line h3{font-size:1.1rem;font-weight:600;color:var(--navy)}
.pt-steps-line p{color:var(--gray);font-size:.97rem}
@media(min-width:900px){
 .pt-steps-line{grid-template-columns:repeat(4,1fr);gap:24px}
 .pt-steps-line::before{left:22px;right:22px;top:21px;bottom:auto;width:auto;height:2px;background:linear-gradient(90deg,var(--gb),#4a7bd8)}
 .pt-steps-line li{padding:60px 0 0}
}

/* photo preview */
.pt-thumb{display:block;background:#e8eefb}
.pt-thumb-fb{display:grid;place-items:center;width:96px;height:120px;border-radius:12px;background:#e8eefb;color:#7d8ba3;border:2px solid #fff;flex:none}

/* apply */
.pt-apply{position:relative;padding:76px 0 90px;background:radial-gradient(110% 80% at 50% 0%,#1b3d86 0%,var(--navy) 50%,var(--deep) 100%);background-image:linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px),radial-gradient(110% 80% at 50% 0%,#1b3d86 0%,var(--navy) 50%,var(--deep) 100%);background-size:44px 44px,44px 44px,auto}
.pt-apply-head{text-align:center;color:#fff;max-width:620px;margin:0 auto 34px}
.pt-apply-head h2{font-size:clamp(2rem,6vw,3rem);line-height:1.1;margin-bottom:12px}
.pt-apply-head p{color:#c6d3ee;font-size:1.05rem}
.pt-card{position:relative;background:#fff;border-radius:26px;max-width:860px;margin:0 auto;padding:22px 18px 24px;box-shadow:0 40px 90px -30px rgba(0,0,0,.7);scroll-margin-top:84px}
@media(min-width:700px){.pt-card{padding:34px 40px 36px}}

.pt-progress{margin-bottom:26px}
.pt-progress-bar{height:5px;border-radius:5px;background:#e6ecf5;margin:0 6% 14px;overflow:hidden}
.pt-progress-bar span{display:block;height:100%;background:linear-gradient(90deg,var(--gb),var(--teal));border-radius:5px;transition:width .5s cubic-bezier(.3,.8,.3,1)}
.pt-progress ol{display:grid;grid-template-columns:repeat(4,1fr);gap:4px}
.pt-progress li{display:flex;flex-direction:column;align-items:center;gap:6px;color:#8795ad;font-size:.8rem}
.pt-progress li span{width:36px;height:36px;border-radius:50%;display:grid;place-items:center;background:#eef3fb;border:2px solid #e0e8f5;transition:all .3s}
.pt-progress li em{font-style:normal;font-weight:500;text-align:center}
.pt-progress li.on{color:var(--navy);font-weight:600}
.pt-progress li.on span{background:var(--navy);color:#fff;border-color:var(--navy);box-shadow:0 0 0 5px rgba(13,33,73,.12)}
.pt-progress li.past span{background:var(--gb);color:#fff;border-color:var(--gb)}

.pt-step{animation:ptStep .35s ease both}
@keyframes ptStep{from{opacity:0;transform:translateX(18px)}to{opacity:1;transform:none}}
.pt-grid{display:grid;gap:18px}
@media(min-width:700px){.pt-grid{grid-template-columns:1fr 1fr;gap:20px 22px}.pt-span{grid-column:1/-1}}

.pt-field{display:grid;gap:7px;align-content:start;min-width:0;border:0;padding:0;margin:0}
.pt-field>label,.pt-field>legend,.pt-set legend{font-weight:600;font-size:.92rem;color:var(--navy);padding:0}
.pt-hint{display:block;font-weight:400;font-size:.8rem;color:#6b7a93;margin-top:1px}
.pt-ctl{position:relative}
.pt-ico{position:absolute;left:14px;top:50%;transform:translateY(-50%);color:#7d8ba3;pointer-events:none}
.pt-input{width:100%;padding:14px 14px 14px 44px;border:1.5px solid var(--line);border-radius:14px;font:inherit;font-size:16px;color:var(--ink);background:#fff;transition:border-color .2s,box-shadow .2s;appearance:none;-webkit-appearance:none;min-height:50px}
select.pt-input{background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%237d8ba3' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'><path d='m6 9 6 6 6-6'/></svg>");background-repeat:no-repeat;background-position:right 14px center;padding-right:40px}
.pt-input::placeholder{color:#9aa7bd}
.pt-input:focus{outline:none;border-color:var(--gb);box-shadow:0 0 0 4px rgba(39,174,96,.16)}
.pt-input[aria-invalid="true"]{border-color:var(--err);box-shadow:0 0 0 4px rgba(192,57,43,.1)}
textarea.pt-input{resize:vertical;min-height:112px;line-height:1.55}
.pt-noico{padding-left:14px}
.pt-err{display:flex;align-items:center;gap:6px;color:var(--err);font-size:.85rem;font-weight:500}
.pt-hp{position:absolute;left:-9999px;width:1px;height:1px;opacity:0}

/* photo */
.pt-drop{position:relative;border:2px dashed #b9c8e3;border-radius:18px;background:#f7faff;transition:border-color .2s,background .2s}
.pt-drop:hover{border-color:var(--gb);background:#f1faf4}
.pt-drop.bad{border-color:var(--err)}
.pt-drop.has{border-style:solid;border-color:var(--gb);background:#f1faf4}
.pt-file{position:absolute;width:1px;height:1px;opacity:0;pointer-events:none}
.pt-file:focus-visible+*{outline:3px solid var(--gl)}
.pt-drop-empty{display:grid;justify-items:center;gap:6px;padding:26px 16px;cursor:pointer;color:var(--navy);text-align:center}
.pt-drop-empty span{color:#6b7a93;font-size:.88rem}
.pt-drop.has{display:flex;gap:16px;align-items:center;padding:14px}
.pt-drop.has>img,.pt-drop.has>canvas{width:96px;height:120px;object-fit:cover;border-radius:12px;border:2px solid #fff;box-shadow:0 8px 20px -8px rgba(13,33,73,.5);flex:none}
.pt-drop-meta{display:grid;gap:3px;color:var(--navy)}
.pt-drop-meta span{color:#6b7a93;font-size:.88rem}
.pt-drop-actions{display:flex;gap:16px;margin-top:8px}
.pt-link-btn{display:inline-flex;align-items:center;gap:6px;background:none;border:0;padding:6px 0;font:inherit;font-size:.9rem;font-weight:600;color:var(--green);cursor:pointer;min-height:36px}
.pt-link-btn:hover{text-decoration:underline}

/* chips */
.pt-set legend{margin-bottom:10px}
.pt-chips{display:flex;flex-wrap:wrap;gap:10px}
.pt-opt{position:relative;cursor:pointer}
.pt-opt input{position:absolute;opacity:0;inset:0;width:100%;height:100%;margin:0;cursor:pointer}
.pt-opt span{display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:0 16px;border-radius:999px;border:1.5px solid var(--line);background:#fff;font-size:.95rem;color:var(--navy);transition:all .18s}
.pt-opt:hover span{border-color:var(--gb)}
.pt-opt input:checked+span{background:var(--navy);border-color:var(--navy);color:#fff;box-shadow:0 8px 18px -10px rgba(13,33,73,.8)}
.pt-opt input:focus-visible+span{outline:3px solid var(--gl);outline-offset:2px}
.pt-opt input[aria-invalid="true"]+span{border-color:var(--err)}

/* review */
.pt-review{display:grid;gap:16px;padding:18px;border-radius:18px;background:#f4f7fc;border:1px solid #e3eaf6;position:relative}
.pt-review>img,.pt-review>canvas{width:84px;height:104px;object-fit:cover;border-radius:12px;border:2px solid #fff;box-shadow:0 8px 20px -10px rgba(13,33,73,.5)}
.pt-review dl{display:grid;gap:10px}
.pt-review dl div{display:grid;gap:1px}
.pt-review dt{font-size:.8rem;color:#6b7a93}
.pt-review dd{font-weight:600;color:var(--navy);overflow-wrap:anywhere}
@media(min-width:700px){.pt-review{grid-template-columns:auto 1fr;gap:22px}.pt-review dl{grid-template-columns:1fr 1fr;gap:14px 24px}}
.pt-edit{position:absolute;top:10px;right:14px}
.pt-checks{display:grid;gap:12px;margin-top:20px}
.pt-check{display:flex;gap:12px;align-items:flex-start;font-size:.95rem;color:var(--gray);line-height:1.55;cursor:pointer}
.pt-check input{width:22px;height:22px;margin-top:1px;flex:none;accent-color:var(--green);cursor:pointer}
.pt-check a{color:var(--green);font-weight:600}
.pt-banner{display:flex;gap:10px;align-items:flex-start;margin-top:18px;padding:14px 16px;border-radius:14px;background:#fdecea;color:#8a2a1f;font-size:.93rem}
.pt-banner svg{flex:none;margin-top:2px}

.pt-actions{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-top:28px;padding-top:22px;border-top:1px solid #e6ecf5}
.pt-actions .pt-btn{flex:1 1 auto}
@media(min-width:560px){.pt-actions .pt-btn{flex:0 0 auto}}
.pt-secure{display:none;align-items:center;gap:7px;color:#6b7a93;font-size:.85rem}
@media(min-width:560px){.pt-secure{display:inline-flex}}
.pt-actions:has(.pt-secure) .pt-btn{margin-left:auto}

/* success */
.pt-done{position:relative;text-align:center;padding:6px 0 4px}
.pt-confetti{position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:80}
.pt-tick{width:88px;height:88px;margin:0 auto 10px;display:block;overflow:visible}
.pt-tick circle{fill:rgba(39,174,96,.12);stroke:var(--gb);stroke-width:3;stroke-dasharray:215;stroke-dashoffset:215;animation:ptDraw .8s .1s ease forwards}
.pt-tick path{fill:none;stroke:var(--gb);stroke-width:5;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:50;stroke-dashoffset:50;animation:ptDraw .5s .7s ease forwards}
@keyframes ptDraw{to{stroke-dashoffset:0}}
.pt-done h2{font-size:clamp(2rem,6vw,2.8rem);color:var(--navy);line-height:1.1;margin-bottom:10px}
.pt-done-lead{color:var(--gray);max-width:34em;margin:0 auto 28px;font-size:1.05rem;line-height:1.7}

.pt-pass{max-width:520px;margin:0 auto 30px;text-align:left;border-radius:22px;padding:20px;color:#fff;background:linear-gradient(150deg,var(--mid),var(--navy) 55%,var(--deep));box-shadow:0 34px 60px -28px rgba(13,33,73,.9);overflow:hidden}
.pt-pass-top{display:flex;align-items:center;gap:12px;padding-bottom:16px;border-bottom:1px solid rgba(255,255,255,.12)}
.pt-pass-top b{display:block;font-size:1.02rem}
.pt-pass-top small{color:var(--gl);font-size:.8rem}
.pt-pass-state{margin-left:auto;display:inline-flex;align-items:center;gap:8px;font-size:.8rem;font-weight:600;padding:6px 12px;border-radius:999px;background:rgba(240,213,128,.14);color:var(--gl)}
.pt-pass-state .pt-dot{background:var(--gl)}
.pt-pass-body{display:flex;gap:16px;align-items:center;padding:18px 0}
.pt-pass-body>img,.pt-pass-body>canvas{width:84px;height:104px;object-fit:cover;border-radius:12px;border:2px solid rgba(255,255,255,.7);flex:none}
.pt-pass-body h3{font-size:1.3rem;font-weight:600;overflow-wrap:anywhere}
.pt-pass-body p{display:flex;align-items:center;gap:6px;color:#b7c6e6;font-size:.92rem;margin:3px 0 10px}
.pt-pass-tags{display:flex;flex-wrap:wrap;gap:6px}
.pt-pass-tags span{font-size:.75rem;padding:4px 10px;border-radius:999px;background:rgba(255,255,255,.1);color:#dbe6ff}
.pt-sign{display:grid;gap:16px;padding-top:16px;border-top:1px solid rgba(255,255,255,.12)}
@media(min-width:480px){.pt-sign{grid-template-columns:1fr 1fr}}
.pt-sign>div{display:grid;gap:5px;align-content:start}
.pt-sign-label{font-size:.78rem;color:#9fb2d9}
.pt-sign-ink{font-family:'Caveat','Segoe Script',cursive;font-size:2rem;line-height:1.1;color:var(--gl);overflow-wrap:anywhere;clip-path:inset(0 100% 0 0);animation:ptInk 1.8s 1s cubic-bezier(.5,0,.3,1) forwards}
@keyframes ptInk{to{clip-path:inset(0 0 0 0)}}
.pt-sign-box{display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:0 12px;border-radius:12px;border:1.5px dashed rgba(240,213,128,.6);color:var(--gl);font-size:.88rem;animation:ptBlink 2.4s ease-in-out infinite}
@keyframes ptBlink{50%{background:rgba(240,213,128,.1)}}
.pt-sign-date{font-size:.76rem;color:#8da2cc}
.pt-sheen{position:absolute;inset:0;pointer-events:none;background:linear-gradient(115deg,transparent 35%,rgba(255,255,255,.13) 48%,transparent 62%);background-size:260% 100%;animation:ptSheen 5s ease-in-out infinite}
@keyframes ptSheen{from{background-position:130% 0}to{background-position:-30% 0}}

.pt-next{display:grid;gap:14px;max-width:560px;margin:0 auto 30px;text-align:left}
.pt-next li{display:flex;gap:14px;align-items:flex-start}
.pt-next li>span{width:34px;height:34px;border-radius:50%;display:grid;place-items:center;flex:none;background:var(--navy);color:#fff;font-weight:700;font-size:.9rem}
.pt-next h3{font-size:1rem;font-weight:600;color:var(--navy)}
.pt-next p{color:var(--gray);font-size:.93rem}
.pt-done-cta{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}

/* footer */
.pt-foot{background:var(--deep);color:#9fb2d9;font-size:.88rem;padding:26px 0}
.pt-foot-in{display:flex;flex-wrap:wrap;gap:8px 24px;justify-content:space-between}
.pt-foot a{text-decoration:none}
.pt-foot a:hover{text-decoration:underline}

@media(prefers-reduced-motion:reduce){
 .pt-root *,.pt-root *::before,.pt-root *::after{animation-duration:.001s!important;animation-iteration-count:1!important;transition-duration:.001s!important}
 .pt-scene,.pt-orbit,.pt-chip{animation:none!important}
 .pt-chip{transform:translate(-50%,-50%)}
 .pt-sign-ink{clip-path:none}
}
`;
