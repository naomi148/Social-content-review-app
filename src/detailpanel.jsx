/* ============================================================
   POST STUDIO — Post detail sliding panel
   ============================================================ */
function TargetLabel({ target }) {
  const surf = target.surface === "feed" ? "Feed" : target.surface === "reel" ? "Reel" : target.surface === "story" ? "Story" : target.surface === "video" ? "Video" : "";
  const net = target.network === "instagram" ? "Instagram" : target.network === "tiktok" ? "TikTok" : "Facebook";
  return `${net} ${surf}`.trim();
}

function PostDetail({ post, mode, isMobile, onClose, onApprove, onRequestChanges, onSendNote }) {
  const [tab, setTab] = useState(0);
  const panelRef = useRef(null);
  const backdropRef = useRef(null);
  useEffect(() => { setTab(0); }, [post && post.id]);
  useEffect(() => {
    // Slide-over entrance. Base style is already on-screen, so this only adds motion.
    try {
      panelRef.current && panelRef.current.animate(
        [{ transform: "translateX(100%)" }, { transform: "translateX(0)" }],
        { duration: 320, easing: "cubic-bezier(.22,1,.36,1)" });
      backdropRef.current && backdropRef.current.animate(
        [{ opacity: 0 }, { opacity: 1 }], { duration: 260, easing: "ease" });
    } catch (_) {}
  }, []);
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });
  const close = () => {
    let fin = false;
    const done = () => { if (!fin) { fin = true; onClose(); } };
    try {
      backdropRef.current && backdropRef.current.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200, easing: "ease", fill: "forwards" });
      const a = panelRef.current && panelRef.current.animate([{ transform: "translateX(0)" }, { transform: "translateX(100%)" }], { duration: 230, easing: "cubic-bezier(.4,0,.2,1)", fill: "forwards" });
      if (a) a.onfinish = done;
    } catch (_) {}
    setTimeout(done, 260);
  };
  if (!post) return null;
  const target = post.targets[tab] || post.targets[0];

  const preview = (
    <div className="ps-scroll" style={{ background: "var(--ps-bg-soft)", padding: isMobile ? "18px 16px 24px" : "26px", overflowY: "auto", flex: isMobile ? "none" : "0 0 44%", borderRight: isMobile ? "none" : "1px solid var(--ps-line)", borderBottom: isMobile ? "1px solid var(--ps-line)" : "none" }}>
      {post.targets.length > 1 && (
        <div className="ps-scroll" style={{ display: "flex", gap: 7, marginBottom: 18, overflowX: "auto", paddingBottom: 2 }}>
          {post.targets.map((t, i) => (
            <button key={i} onClick={() => setTab(i)} className="ps-chip" data-active={i === tab}
              style={{ flexShrink: 0 }}>
              <NetworkGlyph network={t.network} size={14} /><TargetLabel target={t} />
            </button>
          ))}
        </div>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12, color: "var(--ps-ink-3)" }}>
        <Icon name="eye" size={14} /><span className="ps-eyebrow" style={{ fontSize: 10.5 }}>Preview · <TargetLabel target={target} /></span>
      </div>
      <PlatformPreview post={post} target={target} />
      <div style={{ marginTop: 16, textAlign: "center", fontSize: 12, color: "var(--ps-ink-3)" }}>
        This is how your post will appear on {TargetLabel({ target })}.
      </div>
    </div>
  );

  const info = (
    <div className="ps-scroll" style={{ flex: 1, overflowY: "auto", padding: isMobile ? "20px 16px 120px" : "26px 28px 110px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
        <StatusBadge stage={post.stage} />
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12.5, fontWeight: 600, color: "var(--ps-ink-2)", background: "var(--ps-bg-soft)", border: "1px solid var(--ps-line)", padding: "3px 10px", borderRadius: 999 }}>
          <Icon name={FORMAT_META[post.format].icon} size={13} />{FORMAT_META[post.format].label}
        </span>
      </div>
      <h2 className="ps-h2" style={{ margin: "0 0 18px" }}>{post.title}</h2>

      {/* schedule + platforms */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 22 }}>
        <div style={{ border: "1px solid var(--ps-line)", borderRadius: 12, padding: "12px 14px" }}>
          <div className="ps-eyebrow" style={{ marginBottom: 7 }}>Goes live</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 700, fontSize: 14.5 }}>
            <Icon name="calendar" size={16} style={{ color: "var(--ps-orange)" }} />{fmtDate(post.scheduledAt)}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6, color: "var(--ps-ink-2)", fontSize: 13.5, fontFamily: "var(--ps-font-mono)" }}>
            <Icon name="clock" size={15} style={{ color: "var(--ps-ink-3)" }} />{fmtTime(post.scheduledAt)}
          </div>
        </div>
        <div style={{ border: "1px solid var(--ps-line)", borderRadius: 12, padding: "12px 14px" }}>
          <div className="ps-eyebrow" style={{ marginBottom: 7 }}>Publishing to</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {post.targets.map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, fontWeight: 600 }}>
                <NetworkGlyph network={t.network} size={15} /><TargetLabel target={t} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* caption */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
          <span className="ps-h3">Caption</span>
          <CopyButton className="ps-btn ps-btn-ghost ps-btn-sm" style={{ marginLeft: "auto" }} text={() => post.caption + "\n\n" + post.hashtags.join(" ")} label="Copy all" />
        </div>
        <div style={{ border: "1px solid var(--ps-line)", borderRadius: 12, padding: "15px 16px", background: "var(--ps-bg-softer)" }}>
          <div style={{ fontSize: 14.5, lineHeight: 1.6, whiteSpace: "pre-line", color: "var(--ps-ink)" }}>{post.caption}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14, paddingTop: 14, borderTop: "1px dashed var(--ps-line-2)" }}>
            {post.hashtags.map((h) => (
              <span key={h} style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ps-scheduled)", background: "var(--ps-scheduled-bg)", padding: "3px 9px", borderRadius: 999 }}>{h}</span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ height: 1, background: "var(--ps-line)", margin: "24px 0" }} />

      <FeedbackThread post={post} onSend={(t) => onSendNote(post.id, t)} />
    </div>
  );

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 60 }}>
      <div ref={backdropRef} onClick={close} style={{ position: "absolute", inset: 0, background: "rgba(21,23,26,0.42)" }} />
      <div ref={panelRef} style={{
        position: "absolute", top: 0, right: 0, bottom: 0,
        width: isMobile ? "100%" : "min(960px, 94vw)",
        background: "var(--ps-bg)", display: "flex", flexDirection: "column",
        boxShadow: "var(--ps-shadow-lg)",
      }}>
        {/* header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: isMobile ? "13px 14px" : "15px 22px", borderBottom: "1px solid var(--ps-line)", flexShrink: 0 }}>
          <button className="ps-btn ps-btn-ghost ps-btn-icon" onClick={close} aria-label="Close"><Icon name="chevron-right" size={20} /></button>
          <div style={{ fontWeight: 700, fontSize: 14, color: "var(--ps-ink-2)" }}>Post review</div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
            <CopyButton className="ps-btn ps-btn-ghost ps-btn-sm" text={() => post.caption} label="Copy caption" />
          </div>
        </div>
        {/* body */}
        <div style={{ flex: 1, display: "flex", flexDirection: isMobile ? "column" : "row", overflow: "hidden" }}>
          {preview}
          {info}
        </div>
        {/* sticky action bar */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: isMobile ? "12px 14px" : "14px 28px", background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)", borderTop: "1px solid var(--ps-line)", display: "flex", alignItems: "center", gap: 12 }}>
          <ApproveActions post={post} mode={mode} size="lg"
            onApprove={() => { onApprove(post.id); }}
            onRequestChanges={() => { onRequestChanges(post.id); }} />
        </div>
      </div>
    </div>
  );
}

window.PostDetail = PostDetail;
