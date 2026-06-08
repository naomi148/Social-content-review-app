/* ============================================================
   POST STUDIO — Shared components
   ============================================================ */
const { useState, useEffect, useRef, useCallback } = React;

/* ---------------- Icons (simple stroked UI glyphs) ---------------- */
const ICON_PATHS = {
  check: '<polyline points="20 6 9 17 4 12"/>',
  "check-circle": '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
  x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  message: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  clock: '<circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/>',
  copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  bell: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
  search: '<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  "chevron-down": '<polyline points="6 9 12 15 18 9"/>',
  "chevron-left": '<polyline points="15 18 9 12 15 6"/>',
  "chevron-right": '<polyline points="9 18 15 12 9 6"/>',
  more: '<circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/>',
  plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
  "arrow-right": '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
  play: '<polygon points="6 4 20 12 6 20 6 4"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/>',
  bookmark: '<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',
  send: '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
  sparkles: '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z"/>',
  filter: '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
  eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
  edit: '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z"/>',
  redo: '<polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>',
  comment: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
  layers: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>',
  film: '<rect x="2" y="3" width="20" height="18" rx="2"/><line x1="7" y1="3" x2="7" y2="21"/><line x1="17" y1="3" x2="17" y2="21"/><line x1="2" y1="9" x2="22" y2="9"/><line x1="2" y1="15" x2="22" y2="15"/>',
  zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  "trending-up": '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
  menu: '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>',
  globe: '<circle cx="12" cy="12" r="9"/><line x1="3" y1="12" x2="21" y2="12"/><path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z"/>',
  inbox: '<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
  party: '<path d="M5.8 11.3 2 22l10.7-3.79"/><path d="M4 3h.01"/><path d="M22 8h.01"/><path d="M15 2h.01"/><path d="M22 20h.01"/><path d="M22 2 11 13"/><circle cx="14" cy="14" r="0"/>',
};

function Icon({ name, size = 20, stroke = 2, className = "", style = {} }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
      className={className} style={{ flexShrink: 0, ...style }}
      dangerouslySetInnerHTML={{ __html: ICON_PATHS[name] || "" }}
    />
  );
}

/* ---------------- Platform glyphs ---------------- */
function NetworkGlyph({ network, size = 16 }) {
  if (network === "instagram") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="5.5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (network === "tiktok") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.5 3c.3 2.1 1.5 3.6 3.5 3.9v2.6c-1.3.1-2.5-.2-3.6-.9v5.9c0 3.2-2.4 5.5-5.4 5.5A5.2 5.2 0 0 1 5.5 14.9c0-3 2.4-5.3 5.4-5.3.3 0 .6 0 .9.1v2.7a2.7 2.7 0 0 0-1-.2 2.6 2.6 0 0 0 0 5.2c1.5 0 2.6-1.1 2.6-2.7V3h3.1z" />
      </svg>
    );
  }
  if (network === "facebook") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M14 8.5V7c0-.8.5-1 1-1h2V3h-2.5C12 3 11 4.6 11 6.7v1.8H9V11h2v10h3V11h2.2l.4-2.5H14z" />
      </svg>
    );
  }
  return null;
}

/* ---------------- Stage config ---------------- */
const STAGES = [
  { id: "review",    label: "Awaiting your review", short: "Review",    text: "var(--ps-review)",    bg: "var(--ps-review-bg)",    dot: "var(--ps-review-dot)" },
  { id: "changes",   label: "Changes requested",    short: "Changes",   text: "var(--ps-changes)",   bg: "var(--ps-changes-bg)",   dot: "var(--ps-changes-dot)" },
  { id: "approved",  label: "Approved",             short: "Approved",  text: "var(--ps-approved)",  bg: "var(--ps-approved-bg)",  dot: "var(--ps-approved-dot)" },
  { id: "scheduled", label: "Scheduled",            short: "Scheduled", text: "var(--ps-scheduled)", bg: "var(--ps-scheduled-bg)", dot: "var(--ps-scheduled-dot)" },
];
const stageById = (id) => STAGES.find((s) => s.id === id);

function StatusBadge({ stage, size = "md" }) {
  const s = stageById(stage);
  if (!s) return null;
  const pad = size === "sm" ? "3px 9px 3px 7px" : "4px 11px 4px 8px";
  const fs = size === "sm" ? 11 : 12;
  return (
    <span className="ps-status" style={{ background: s.bg, color: s.text, padding: pad, fontSize: fs }}>
      <span className="dot" style={{ background: s.dot }} />
      {s.short}
    </span>
  );
}

/* ---------------- Format chip ---------------- */
const FORMAT_META = {
  reel:     { icon: "film",  label: "Reel" },
  feed:     { icon: "image", label: "Post" },
  carousel: { icon: "layers", label: "Carousel" },
  story:    { icon: "zap",   label: "Story" },
};

/* ---------------- Date helpers ---------------- */
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
function fmtDate(iso) {
  const d = new Date(iso);
  return `${DAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]}`;
}
function fmtTime(iso) {
  const d = new Date(iso);
  let h = d.getHours(); const m = d.getMinutes();
  const ap = h >= 12 ? "pm" : "am";
  h = h % 12 || 12;
  return `${h}${m ? ":" + String(m).padStart(2, "0") : ""}${ap}`;
}
function fmtRel(iso) {
  const d = new Date(iso); const now = new Date("2026-06-03T12:00:00");
  const diff = Math.round((now - d) / 86400000);
  if (diff <= 0) return "today";
  if (diff === 1) return "yesterday";
  if (diff < 7) return `${diff}d ago`;
  return fmtDate(iso);
}

/* ============================================================
   MockMedia — rich CSS-composed post imagery
   ============================================================ */
const SCENES = {
  sunrise: {
    bg: "linear-gradient(180deg,#FFB05C 0%,#FF7A3C 46%,#E8511E 100%)",
    fg: "#fff", kicker: "MORNING FLOW", title: "MOBILITY", sub: "10-minute reset",
    motif: "sun",
  },
  bowl: {
    bg: "linear-gradient(150deg,#1FA971 0%,#127a52 100%)",
    fg: "#fff", kicker: "RECOVERY FUEL", title: "THE\nBOWL", sub: "40g protein",
    motif: "rings",
  },
  spotlight: {
    bg: "linear-gradient(160deg,#23262B 0%,#101114 100%)",
    fg: "#fff", kicker: "MEMBER SPOTLIGHT", title: "DANA", sub: "6 months in",
    motif: "portrait",
  },
  timetable: {
    bg: "linear-gradient(160deg,#FFE074 0%,#FFC21F 100%)",
    fg: "#1a1500", kicker: "NOW LIVE", title: "JUNE\nTIMETABLE", sub: "2 new slots",
    motif: "grid",
  },
  kettlebell: {
    bg: "linear-gradient(160deg,#26282d 0%,#0d0e10 100%)",
    fg: "#fff", kicker: "30-SEC FIX", title: "HINGE,\nNOT SQUAT", sub: "Swing technique",
    motif: "bell",
  },
  hydration: {
    bg: "linear-gradient(160deg,#5AA9F0 0%,#2E6FCB 100%)",
    fg: "#fff", kicker: "MYTH-BUSTER", title: "HOW MUCH\nWATER?", sub: "The real answer",
    motif: "drop",
  },
  run: {
    bg: "linear-gradient(150deg,#FF7A3C 0%,#FF4D2C 100%)",
    fg: "#fff", kicker: "COMMUNITY RUN", title: "SAT\n8AM · 5K", sub: "All paces welcome",
    motif: "motion",
  },
  breathe: {
    bg: "radial-gradient(circle at 50% 45%,#3FC5D4 0%,#1E8FA0 60%,#136775 100%)",
    fg: "#fff", kicker: "4-MIN RESET", title: "BREATHE", sub: "Wind down",
    motif: "rings",
  },
  qa: {
    bg: "linear-gradient(160deg,#8E6BFF 0%,#5B36D6 100%)",
    fg: "#fff", kicker: "TRAINER Q&A", title: "SLEEP &\nRECOVERY", sub: "3 questions",
    motif: "quote",
  },
  challenge: {
    bg: "linear-gradient(155deg,#FF6A33 0%,#E3370F 100%)",
    fg: "#fff", kicker: "SIGN-UPS FRIDAY", title: "6-WEEK\nCHALLENGE", sub: "Stronger together",
    motif: "burst",
  },
  quote: {
    bg: "linear-gradient(160deg,#1c1e22 0%,#0c0d0f 100%)",
    fg: "#fff", kicker: "MONDAY", title: "BUILD THE\nHABIT", sub: "",
    motif: "quote",
  },
  foam: {
    bg: "linear-gradient(155deg,#27B57C 0%,#15835a 100%)",
    fg: "#fff", kicker: "RECOVERY 101", title: "FOAM\nROLLING", sub: "3 spots you miss",
    motif: "roller",
  },
  coach: {
    bg: "linear-gradient(160deg,#2b2e34 0%,#111317 100%)",
    fg: "#fff", kicker: "MEET THE TEAM", title: "COACH\nTHEO", sub: "10 years strong",
    motif: "portrait",
  },
};

function SceneMotif({ motif, fg }) {
  const c = fg === "#fff" ? "rgba(255,255,255,0.16)" : "rgba(0,0,0,0.12)";
  const c2 = fg === "#fff" ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.07)";
  const common = { position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" };
  switch (motif) {
    case "sun":
      return <div style={common}><div style={{ position: "absolute", width: "62%", paddingTop: "62%", borderRadius: "50%", background: "rgba(255,255,255,0.22)", right: "-12%", top: "8%" }} /></div>;
    case "rings":
      return <div style={common}>{[0,1,2,3].map(i => <div key={i} style={{ position: "absolute", left: "50%", top: "50%", width: `${30+i*22}%`, paddingBottom: `${30+i*22}%`, height: 0, transform: "translate(-50%,-50%)", borderRadius: "50%", border: `2px solid ${c2}` }} />)}</div>;
    case "grid":
      return <div style={{ ...common, backgroundImage: `linear-gradient(${c} 1px,transparent 1px),linear-gradient(90deg,${c} 1px,transparent 1px)`, backgroundSize: "22px 22px", opacity: 0.6 }} />;
    case "bell":
      return <div style={common}><div style={{ position: "absolute", right: "-6%", bottom: "-8%", width: "55%", paddingTop: "55%", borderRadius: "50% 50% 46% 46%", background: c }} /><div style={{ position: "absolute", right: "16%", bottom: "40%", width: "20%", paddingTop: "20%", borderRadius: "50% 50% 0 0", border: `8px solid ${c}`, borderBottom: "none" }} /></div>;
    case "drop":
      return <div style={common}><div style={{ position: "absolute", left: "50%", top: "30%", width: "34%", paddingTop: "34%", transform: "translateX(-50%) rotate(45deg)", borderRadius: "50% 50% 50% 0", background: "rgba(255,255,255,0.2)" }} /></div>;
    case "motion":
      return <div style={common}>{[0,1,2,3,4].map(i => <div key={i} style={{ position: "absolute", left: 0, right: 0, height: 6, top: `${30+i*10}%`, background: c2, transform: `translateX(${i%2?-10:0}%)` }} />)}</div>;
    case "burst":
      return <div style={common}>{[...Array(12)].map((_,i) => <div key={i} style={{ position: "absolute", left: "50%", top: "50%", width: "3px", height: "46%", background: c2, transformOrigin: "top center", transform: `rotate(${i*30}deg)` }} />)}</div>;
    case "quote":
      return <div style={{ ...common }}><div style={{ position: "absolute", left: "6%", top: "2%", fontFamily: "Georgia,serif", fontSize: "180px", lineHeight: 1, color: c, fontStyle: "italic" }}>&ldquo;</div></div>;
    case "roller":
      return <div style={common}><div style={{ position: "absolute", right: "-10%", bottom: "12%", width: "70%", height: "26%", borderRadius: 999, background: c, transform: "rotate(-18deg)" }} /></div>;
    case "portrait":
      return <div style={common}><div style={{ position: "absolute", left: "50%", bottom: "-14%", width: "58%", paddingTop: "58%", transform: "translateX(-50%)", borderRadius: "50%", background: "rgba(255,255,255,0.10)" }} /><div style={{ position: "absolute", left: "50%", bottom: "-4%", width: "30%", paddingTop: "30%", transform: "translateX(-50%)", borderRadius: "50%", background: "rgba(255,255,255,0.16)" }} /></div>;
    default:
      return null;
  }
}

/* aspect: ratio string. variant: 'thumb' | 'full'. minimal hides type (clean art). align: 'bottom'|'center' */
function MockMedia({ scene, format = "feed", accent, variant = "thumb", radius, style = {}, showMeta = true, minimal = false, align = "bottom" }) {
  const s = SCENES[scene] || SCENES.quote;
  const vertical = format === "reel" || format === "story";
  const isFull = variant === "full";
  const titleSize = isFull ? (vertical ? 46 : 46) : (vertical ? 30 : 26);
  const pad = isFull ? 30 : 16;
  return (
    <div style={{
      position: "relative", width: "100%", height: "100%", overflow: "hidden",
      background: s.bg, color: s.fg, borderRadius: radius != null ? radius : 0,
      display: "flex", flexDirection: "column", justifyContent: align === "center" ? "center" : "flex-end",
      textAlign: align === "center" ? "center" : "left",
      ...style,
    }}>
      <SceneMotif motif={s.motif} fg={s.fg} />
      {/* readability veil */}
      <div style={{ position: "absolute", inset: 0, background: align === "center" ? "linear-gradient(180deg,rgba(0,0,0,0.12),rgba(0,0,0,0.28))" : "linear-gradient(180deg,rgba(0,0,0,0) 30%,rgba(0,0,0,0.28) 100%)" }} />
      {!minimal && (
        <div style={{ position: "relative", padding: pad, zIndex: 2 }}>
          {showMeta && <div style={{ fontFamily: "var(--ps-font-mono)", fontSize: isFull ? 12 : 10, letterSpacing: "0.16em", opacity: 0.9, marginBottom: 8 }}>{s.kicker}</div>}
          <div style={{ fontFamily: "var(--ps-font-display)", fontWeight: 900, fontSize: titleSize, lineHeight: 0.94, letterSpacing: "-0.03em", whiteSpace: "pre-line", textShadow: "0 2px 18px rgba(0,0,0,0.18)" }}>{s.title}</div>
          {s.sub && showMeta && <div style={{ marginTop: 10, fontSize: isFull ? 16 : 12, fontWeight: 600, opacity: 0.92 }}>{s.sub}</div>}
        </div>
      )}
    </div>
  );
}

Object.assign(window, {
  useState, useEffect, useRef, useCallback,
  Icon, NetworkGlyph, STAGES, stageById, StatusBadge, FORMAT_META,
  fmtDate, fmtTime, fmtRel, MONTHS, DAYS, MockMedia, SCENES,
});
