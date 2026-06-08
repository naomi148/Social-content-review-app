/* ============================================================
   POST STUDIO — App shell
   ============================================================ */
function useIsMobile(bp = 860) {
  const [m, setM] = useState(typeof window !== "undefined" ? window.innerWidth < bp : false);
  useEffect(() => {
    const on = () => setM(window.innerWidth < bp);
    window.addEventListener("resize", on); return () => window.removeEventListener("resize", on);
  }, [bp]);
  return m;
}

/* ---------------- Toast ---------------- */
function Toast({ toast, onUndo, onClose }) {
  useEffect(() => { if (!toast) return; const t = setTimeout(onClose, 4200); return () => clearTimeout(t); }, [toast]);
  if (!toast) return null;
  return (
    <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", zIndex: 80 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, background: "var(--ps-ink)", color: "#fff", borderRadius: 14, padding: "12px 14px 12px 18px", boxShadow: "var(--ps-shadow-lg)" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 9, fontSize: 14, fontWeight: 600 }}>
          {toast.icon && <span style={{ display: "grid", placeItems: "center", width: 24, height: 24, borderRadius: "50%", background: toast.tone || "var(--ps-approved-dot)" }}><Icon name={toast.icon} size={15} /></span>}
          {toast.msg}
        </span>
        {toast.undo && <button className="ps-btn ps-btn-sm" style={{ background: "rgba(255,255,255,0.14)", color: "#fff" }} onClick={onUndo}>Undo</button>}
        <button onClick={onClose} aria-label="Dismiss" style={{ background: "none", border: "none", color: "rgba(255,255,255,0.7)", cursor: "pointer", display: "grid", placeItems: "center", padding: 4 }}><Icon name="x" size={16} /></button>
      </div>
    </div>
  );
}

/* ---------------- Notifications ---------------- */
function Notifications({ posts, open, onClose, onOpenPost }) {
  if (!open) return null;
  const items = [];
  posts.filter((p) => p.unseen && p.stage === "review").forEach((p) => items.push({ id: p.id, kind: "new", title: p.title, time: p.scheduledAt, post: p }));
  posts.forEach((p) => { const last = p.thread[p.thread.length - 1]; if (last && last.role === "team") items.push({ id: p.id + "-r", kind: "reply", title: p.title, who: last.author, time: last.time, post: p }); });
  items.sort((a, b) => new Date(b.time) - new Date(a.time));
  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 40 }} />
      <div style={{ position: "absolute", top: 52, right: 0, width: 340, maxWidth: "92vw", background: "var(--ps-bg)", border: "1px solid var(--ps-line)", borderRadius: 16, boxShadow: "var(--ps-shadow-lg)", zIndex: 50, overflow: "hidden" }}>
        <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--ps-line)", display: "flex", alignItems: "center" }}>
          <span className="ps-h3">Activity</span>
          <span style={{ marginLeft: "auto", fontFamily: "var(--ps-font-mono)", fontSize: 12, color: "var(--ps-ink-3)" }}>{items.length} updates</span>
        </div>
        <div className="ps-scroll" style={{ maxHeight: 380, overflowY: "auto" }}>
          {items.map((it, i) => (
            <button key={i} onClick={() => { onClose(); onOpenPost(it.post); }} style={{ display: "flex", gap: 11, alignItems: "flex-start", width: "100%", textAlign: "left", padding: "13px 16px", background: "none", border: "none", borderBottom: "1px solid var(--ps-line)", cursor: "pointer" }}
              onMouseEnter={(e) => e.currentTarget.style.background = "var(--ps-bg-soft)"} onMouseLeave={(e) => e.currentTarget.style.background = "none"}>
              <span style={{ width: 32, height: 32, flexShrink: 0, borderRadius: 9, display: "grid", placeItems: "center", color: "#fff", background: it.kind === "new" ? "var(--ps-orange)" : "var(--ps-ink)" }}>
                <Icon name={it.kind === "new" ? "sparkles" : "comment"} size={16} />
              </span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: "block", fontSize: 13.5, lineHeight: 1.4 }}>
                  {it.kind === "new" ? <><b>New post</b> ready to review</> : <><b>{it.who}</b> replied</>}
                </span>
                <span style={{ display: "block", fontSize: 12.5, color: "var(--ps-ink-3)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{it.title} · {fmtRel(it.time)}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

/* ---------------- Stat card ---------------- */
function StatCard({ label, value, sub, dot, active, onClick, accent }) {
  return (
    <button onClick={onClick} style={{
      flex: 1, minWidth: 0, textAlign: "left", cursor: "pointer", background: "var(--ps-bg)",
      border: active ? `1.5px solid ${accent || "var(--ps-ink)"}` : "1px solid var(--ps-line)",
      borderRadius: 16, padding: "15px 17px", transition: "border-color .15s, box-shadow .15s, transform .12s", boxShadow: active ? "var(--ps-shadow-sm)" : "none",
    }}
      onMouseEnter={(e) => { if (!active) e.currentTarget.style.borderColor = "var(--ps-line-2)"; }}
      onMouseLeave={(e) => { if (!active) e.currentTarget.style.borderColor = "var(--ps-line)"; }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 10 }}>
        {dot && <span style={{ width: 8, height: 8, borderRadius: "50%", background: dot }} />}
        <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ps-ink-2)", letterSpacing: "-0.01em" }}>{label}</span>
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
        <span style={{ fontFamily: "var(--ps-font-display)", fontWeight: 800, fontSize: 32, letterSpacing: "-0.03em", lineHeight: 1 }}>{value}</span>
        {sub && <span style={{ fontSize: 12.5, color: "var(--ps-ink-3)" }}>{sub}</span>}
      </div>
    </button>
  );
}

/* ---------------- Welcome banner ---------------- */
function Welcome({ name, onDismiss }) {
  return (
    <div style={{ position: "relative", overflow: "hidden", borderRadius: 20, background: "linear-gradient(110deg,#15171A 0%,#23262C 100%)", color: "#fff", padding: "26px 28px", marginBottom: 18 }}>
      <div style={{ position: "absolute", right: -40, top: -40, width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle,rgba(255,90,44,0.55),transparent 70%)" }} />
      <div style={{ position: "absolute", right: 60, bottom: -70, width: 180, height: 180, borderRadius: "50%", background: "radial-gradient(circle,rgba(255,210,63,0.4),transparent 70%)" }} />
      <div style={{ position: "relative", maxWidth: 620 }}>
        <div className="ps-eyebrow" style={{ color: "rgba(255,255,255,0.7)", marginBottom: 10 }}>Welcome to Quivo</div>
        <h2 className="ps-h1" style={{ color: "#fff", margin: "0 0 10px" }}>Hi {name} — your content is ready to review.</h2>
        <p style={{ fontSize: 15, lineHeight: 1.55, color: "rgba(255,255,255,0.82)", margin: "0 0 18px" }}>
          Each card is one post. Open it to see a real preview, read the caption, and either <b style={{ color: "#fff" }}>approve</b> it or <b style={{ color: "#fff" }}>request changes</b>. You can also drag a card straight into <b style={{ color: "#fff" }}>Approved</b>.
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button className="ps-btn ps-btn-primary" onClick={onDismiss}>Start reviewing<Icon name="arrow-right" size={16} /></button>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
            <Avatar size={26} ring={false} /> Managed by Priya, your content lead
          </div>
        </div>
      </div>
      <button onClick={onDismiss} aria-label="Dismiss" style={{ position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.12)", border: "none", color: "#fff", width: 32, height: 32, borderRadius: 9, cursor: "pointer", display: "grid", placeItems: "center" }}><Icon name="x" size={17} /></button>
    </div>
  );
}

/* ---------------- Filter chips ---------------- */
function FilterBar({ platform, setPlatform, statusSet, toggleStatus, allStatus, query, setQuery, isMobile }) {
  const plats = [["all", "All platforms", null], ["instagram", "Instagram", "instagram"], ["tiktok", "TikTok", "tiktok"], ["facebook", "Facebook", "facebook"]];
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
      <div className="ps-scroll" style={{ display: "flex", gap: 7, overflowX: "auto", flexShrink: 1 }}>
        {plats.map(([id, label, net]) => (
          <button key={id} className="ps-chip" data-active={platform === id} onClick={() => setPlatform(id)} style={{ flexShrink: 0 }}>
            {net && <NetworkGlyph network={net} size={14} />}{label}
          </button>
        ))}
      </div>
      <div style={{ width: 1, height: 22, background: "var(--ps-line-2)", flexShrink: 0 }} />
      <div className="ps-scroll" style={{ display: "flex", gap: 7, overflowX: "auto", flexShrink: 1 }}>
        <button className="ps-chip" data-active={allStatus} onClick={() => toggleStatus("all")} style={{ flexShrink: 0 }}>All stages</button>
        {STAGES.map((s) => (
          <button key={s.id} className="ps-chip" data-active={!allStatus && statusSet.has(s.id)} onClick={() => toggleStatus(s.id)} style={{ flexShrink: 0 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: s.dot }} />{s.short}
          </button>
        ))}
      </div>
      {!isMobile && (
        <div style={{ position: "relative", marginLeft: "auto", flexShrink: 0 }}>
          <Icon name="search" size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--ps-ink-3)" }} />
          <input className="ps-input" placeholder="Search posts" value={query} onChange={(e) => setQuery(e.target.value)} style={{ width: 200, paddingLeft: 36, height: 38, fontSize: 13.5 }} />
        </div>
      )}
    </div>
  );
}

/* ============================================================ */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "approveMode": "buttons",
  "accent": "#FF5A2C"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const isMobile = useIsMobile();
  const [posts, setPosts] = useState(() => PS_DATA.map((p) => ({ ...p, thread: [...p.thread] })));
  const [openId, setOpenId] = useState(null);
  const [platform, setPlatform] = useState("all");
  const [statusSet, setStatusSet] = useState(() => new Set());
  const [query, setQuery] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [welcomed, setWelcomed] = useState(() => { try { return localStorage.getItem("ps_welcomed") === "1"; } catch (_) { return false; } });
  const lastMove = useRef(null);

  // apply accent tweak
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--ps-orange", t.accent);
    // derive hover (slightly darker) — keep simple
  }, [t.accent]);

  const allStatus = statusSet.size === 0;
  const activeFilters = (platform !== "all" ? 1 : 0) + (allStatus ? 0 : 1) + (query.trim() ? 1 : 0);
  const clearFilters = () => { setPlatform("all"); setStatusSet(new Set()); setQuery(""); };
  const toggleStatus = (id) => {
    if (id === "all") { setStatusSet(new Set()); return; }
    setStatusSet((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  const visible = posts.filter((p) => {
    if (platform !== "all" && !p.targets.some((tg) => tg.network === platform)) return false;
    if (!allStatus && !statusSet.has(p.stage)) return false;
    if (query.trim()) { const q = query.toLowerCase(); if (!(p.title.toLowerCase().includes(q) || p.caption.toLowerCase().includes(q) || p.hashtags.join(" ").toLowerCase().includes(q))) return false; }
    return true;
  });

  const counts = {
    review: posts.filter((p) => p.stage === "review").length,
    approved: posts.filter((p) => p.stage === "approved").length,
    scheduled: posts.filter((p) => p.stage === "scheduled").length,
  };
  const unseenCount = posts.filter((p) => p.unseen).length;
  const openPost = posts.find((p) => p.id === openId) || null;

  const setStage = (id, stage) => setPosts((ps) => ps.map((p) => p.id === id ? { ...p, stage, unseen: false } : p));
  const open = (p) => { setOpenId(p.id); setPosts((ps) => ps.map((x) => x.id === p.id ? { ...x, unseen: false } : x)); };

  const approve = (id) => {
    const prev = posts.find((p) => p.id === id)?.stage;
    lastMove.current = { id, prev };
    setStage(id, "approved");
    setToast({ msg: "Approved — nice. Your team will schedule it.", icon: "check", undo: true });
  };
  const requestChanges = (id) => {
    const p = posts.find((x) => x.id === id);
    if (p && (p.stage === "approved" || p.stage === "scheduled")) { setStage(id, "review"); setToast({ msg: "Reopened for review.", icon: "redo", tone: "var(--ps-ink-2)" }); return; }
    setStage(id, "changes");
    if (openId !== id) setOpenId(id);
    setToast({ msg: "Moved to Changes requested — add a note below.", icon: "comment", tone: "var(--ps-changes-dot)" });
  };
  const move = (id, stage) => {
    const prev = posts.find((p) => p.id === id)?.stage;
    if (prev === stage) return;
    lastMove.current = { id, prev };
    setStage(id, stage);
    const s = stageById(stage);
    setToast({ msg: `Moved to ${s.label}`, icon: stage === "approved" ? "check" : "arrow-right", tone: s.dot, undo: true });
  };
  const undo = () => { if (lastMove.current) { setStage(lastMove.current.id, lastMove.current.prev); lastMove.current = null; } setToast(null); };
  const sendNote = (id, text) => setPosts((ps) => ps.map((p) => p.id === id ? { ...p, thread: [...p.thread, { author: "You", role: "client", text, time: new Date().toISOString() }] } : p));
  const dismissWelcome = () => { setWelcomed(true); try { localStorage.setItem("ps_welcomed", "1"); } catch (_) {} };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: "var(--ps-bg-soft)", overflow: "hidden" }}>
      {/* ---------- Top bar ---------- */}
      <header style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 14, padding: isMobile ? "11px 16px" : "13px 28px", background: "var(--ps-bg)", borderBottom: "1px solid var(--ps-line)", zIndex: 30 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: "var(--ps-ink)", display: "grid", placeItems: "center", position: "relative" }}>
            <div style={{ width: 0, height: 0, borderLeft: "9px solid #fff", borderTop: "6px solid transparent", borderBottom: "6px solid transparent", marginLeft: 3 }} />
            <div style={{ position: "absolute", right: -2, top: -2, width: 11, height: 11, borderRadius: "50%", background: "var(--ps-orange)", border: "2px solid var(--ps-bg)" }} />
          </div>
          {!isMobile && <span style={{ fontFamily: "var(--ps-font-display)", fontWeight: 800, fontSize: 18, letterSpacing: "-0.03em" }}>Quivo</span>}
        </div>
        {!isMobile && <div style={{ width: 1, height: 24, background: "var(--ps-line-2)" }} />}
        {/* client switcher */}
        <button className="ps-btn ps-btn-ghost" style={{ gap: 9, padding: "6px 10px" }}>
          <Avatar size={26} />
          <span style={{ fontWeight: 700, fontSize: 14 }}>{isMobile ? PS_CLIENT.name : PS_CLIENT.full}</span>
          <Icon name="chevron-down" size={15} style={{ color: "var(--ps-ink-3)" }} />
        </button>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8, position: "relative" }}>
          <button className="ps-btn ps-btn-ghost ps-btn-icon" aria-label="Activity" onClick={() => setNotifOpen((v) => !v)} style={{ position: "relative" }}>
            <Icon name="bell" size={19} />
            {unseenCount > 0 && <span style={{ position: "absolute", top: 6, right: 6, width: 9, height: 9, borderRadius: "50%", background: "var(--ps-orange)", border: "2px solid var(--ps-bg)" }} />}
          </button>
          <Notifications posts={posts} open={notifOpen} onClose={() => setNotifOpen(false)} onOpenPost={open} />
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--ps-yellow)", display: "grid", placeItems: "center", fontWeight: 800, fontSize: 13, fontFamily: "var(--ps-font-display)", color: "var(--ps-ink)" }}>JL</div>
        </div>
      </header>

      {/* ---------- Overview + filters ---------- */}
      <div style={{ flexShrink: 0, padding: isMobile ? "16px 16px 10px" : "22px 28px 14px" }}>
        {!welcomed && <Welcome name={PS_CLIENT.name} onDismiss={dismissWelcome} />}
        {welcomed && (
          <div style={{ display: "flex", alignItems: "flex-end", gap: 12, marginBottom: 14, flexWrap: "wrap" }}>
            <div>
              <div className="ps-eyebrow" style={{ marginBottom: 6 }}>Your content board</div>
              <h1 className="ps-h1" style={{ margin: 0 }}>Good morning, {PS_CLIENT.name}.</h1>
            </div>
          </div>
        )}
        <div style={{ display: "flex", gap: 12, marginBottom: 14, flexWrap: isMobile ? "wrap" : "nowrap" }}>
          <StatCard label="Awaiting your review" value={counts.review} sub="to action" dot="var(--ps-review-dot)" accent="var(--ps-review-dot)"
            active={!allStatus && statusSet.size === 1 && statusSet.has("review")} onClick={() => setStatusSet(new Set(["review"]))} />
          <StatCard label="Approved" value={counts.approved} sub="ready" dot="var(--ps-approved-dot)" accent="var(--ps-approved-dot)"
            active={!allStatus && statusSet.size === 1 && statusSet.has("approved")} onClick={() => setStatusSet(new Set(["approved"]))} />
          <StatCard label="Scheduled this week" value={counts.scheduled} sub="going live" dot="var(--ps-scheduled-dot)" accent="var(--ps-scheduled-dot)"
            active={!allStatus && statusSet.size === 1 && statusSet.has("scheduled")} onClick={() => setStatusSet(new Set(["scheduled"]))} />
        </div>
        {/* collapsible filter toolbar */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <button className="ps-chip" data-active={filtersOpen} onClick={() => setFiltersOpen((v) => !v)}
            style={{ paddingRight: 11 }}>
            <Icon name="filter" size={14} />Filters
            {activeFilters > 0 && (
              <span style={{ minWidth: 18, height: 18, padding: "0 5px", borderRadius: 999, background: filtersOpen ? "rgba(255,255,255,0.22)" : "var(--ps-orange)", color: "#fff", fontSize: 11, fontWeight: 700, display: "grid", placeItems: "center" }}>{activeFilters}</span>
            )}
            <Icon name="chevron-down" size={14} style={{ transform: filtersOpen ? "rotate(180deg)" : "none", transition: "transform .2s ease", opacity: 0.7 }} />
          </button>
          {activeFilters > 0 && (
            <button className="ps-btn ps-btn-ghost ps-btn-sm" onClick={clearFilters}>
              <Icon name="x" size={14} />Clear
            </button>
          )}
          {!filtersOpen && activeFilters > 0 && (
            <span className="ps-meta" style={{ marginLeft: 2 }}>
              Showing {visible.length} of {posts.length} posts
            </span>
          )}
        </div>
        {filtersOpen && (
          <div style={{ marginTop: 12, paddingTop: 14, borderTop: "1px solid var(--ps-line)" }}>
            <FilterBar platform={platform} setPlatform={setPlatform} statusSet={statusSet} toggleStatus={toggleStatus} allStatus={allStatus} query={query} setQuery={setQuery} isMobile={isMobile} />
          </div>
        )}
      </div>

      {/* ---------- Board ---------- */}
      {visible.length === 0 ? (
        <div style={{ flex: 1, display: "grid", placeItems: "center", padding: 24 }}>
          <div style={{ textAlign: "center", maxWidth: 320 }}>
            <div style={{ width: 56, height: 56, margin: "0 auto 16px", borderRadius: 16, background: "var(--ps-bg)", border: "1px solid var(--ps-line)", display: "grid", placeItems: "center", color: "var(--ps-ink-4)" }}><Icon name="search" size={24} /></div>
            <h3 className="ps-h3" style={{ margin: "0 0 6px" }}>Nothing matches that filter</h3>
            <p className="ps-body" style={{ margin: "0 0 16px" }}>Try a different platform or stage.</p>
            <button className="ps-btn ps-btn-outline" onClick={() => { setPlatform("all"); setStatusSet(new Set()); setQuery(""); }}>Clear filters</button>
          </div>
        </div>
      ) : (
        <Board posts={visible} mode={t.approveMode} isMobile={isMobile} onOpen={open} onApprove={approve} onRequestChanges={requestChanges} onMove={move} />
      )}

      {openPost && <PostDetail post={openPost} mode={t.approveMode} isMobile={isMobile} onClose={() => setOpenId(null)} onApprove={approve} onRequestChanges={requestChanges} onSendNote={sendNote} />}
      <Toast toast={toast} onUndo={undo} onClose={() => setToast(null)} />

      {/* ---------- Tweaks ---------- */}
      <TweaksPanel>
        <TweakSection label="Approve / request-changes" />
        <TweakRadio label="Interaction" value={t.approveMode}
          options={[{ value: "buttons", label: "Buttons" }, { value: "confirm", label: "Confirm" }, { value: "slide", label: "Slide" }]}
          onChange={(v) => setTweak("approveMode", v)} />
        <div style={{ fontSize: 12, color: "var(--ps-ink-3)", lineHeight: 1.45, padding: "2px 2px 4px" }}>
          How the client commits an approval. Shown on the post detail and review cards.
        </div>
        <TweakSection label="Brand" />
        <TweakColor label="Accent" value={t.accent}
          options={["#FF5A2C", "#1FA971", "#3A5BD8", "#7C5CFF", "#15171A"]}
          onChange={(v) => setTweak("accent", v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
