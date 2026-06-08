/* ============================================================
   POST STUDIO — Post detail side panel + platform previews
   ============================================================ */

/* ---------------- Brand avatar ---------------- */
function Avatar({ size = 32, ring = true }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%", flexShrink: 0,
      background: ring ? "conic-gradient(from 210deg,#FFD23F,#FF5A2C,#E8511E,#FFD23F)" : "transparent",
      padding: ring ? 2 : 0, display: "grid", placeItems: "stretch",
    }}>
      <div style={{
        borderRadius: "50%", background: "#15171A", color: "#fff",
        display: "grid", placeItems: "center", border: ring ? "2px solid #fff" : "none",
        fontFamily: "var(--ps-font-display)", fontWeight: 800, fontSize: size * 0.42,
      }}>F</div>
    </div>
  );
}

function CopyButton({ text, label = "Copy", className = "ps-btn ps-btn-outline ps-btn-sm" }) {
  const [done, setDone] = useState(false);
  const copy = () => {
    const t = typeof text === "function" ? text() : text;
    navigator.clipboard?.writeText(t).catch(() => {});
    setDone(true); setTimeout(() => setDone(false), 1600);
  };
  return (
    <button className={className} onClick={copy} style={{ color: done ? "var(--ps-approved)" : undefined, borderColor: done ? "var(--ps-approved)" : undefined }}>
      <Icon name={done ? "check" : "copy"} size={15} />
      {done ? "Copied" : label}
    </button>
  );
}

/* ---------------- Platform previews ---------------- */
function IGActionRail({ vertical }) {
  const items = ["heart", "comment", "send"];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "center" }}>
      {items.map((n) => <Icon key={n} name={n} size={27} stroke={2} style={{ color: "#fff", filter: "drop-shadow(0 1px 3px rgba(0,0,0,.4))" }} />)}
      <Icon name="more" size={24} style={{ color: "#fff", filter: "drop-shadow(0 1px 3px rgba(0,0,0,.4))" }} />
    </div>
  );
}

function IGFeedPreview({ post }) {
  return (
    <div style={{ width: "100%", background: "#fff", borderRadius: 14, overflow: "hidden", border: "1px solid #E9E9E4", boxShadow: "var(--ps-shadow-sm)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 13px" }}>
        <Avatar size={34} />
        <div style={{ lineHeight: 1.2 }}>
          <div style={{ fontWeight: 700, fontSize: 14 }}>forma.studio</div>
          <div style={{ fontSize: 11.5, color: "#8E939B" }}>Sponsored</div>
        </div>
        <Icon name="more" size={20} style={{ marginLeft: "auto", color: "#15171A" }} />
      </div>
      <div style={{ width: "100%", aspectRatio: "4 / 5" }}>
        <MockMedia scene={post.media.scene} format="feed" variant="full" />
      </div>
      <div style={{ padding: "10px 13px 15px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 9 }}>
          <Icon name="heart" size={24} /><Icon name="comment" size={23} /><Icon name="send" size={22} />
          <Icon name="bookmark" size={23} style={{ marginLeft: "auto" }} />
        </div>
        <div style={{ fontWeight: 700, fontSize: 13.5, marginBottom: 6 }}>1,248 likes</div>
        <div style={{ fontSize: 13.5, lineHeight: 1.5, whiteSpace: "pre-line" }}>
          <span style={{ fontWeight: 700 }}>forma.studio</span>{" "}
          {post.caption}
          {"\n"}
          <span style={{ color: "#2E5FB0" }}>{post.hashtags.join(" ")}</span>
        </div>
        <div style={{ fontSize: 11, color: "#8E939B", marginTop: 8, letterSpacing: "0.02em", textTransform: "uppercase" }}>{fmtRel(post.scheduledAt) === "today" ? "Just now" : fmtDate(post.scheduledAt)}</div>
      </div>
    </div>
  );
}

function VerticalChrome({ post, kind }) {
  // kind: 'reel' | 'story' | 'tiktok'
  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: "9 / 16", borderRadius: 18, overflow: "hidden", background: "#000" }}>
      <MockMedia scene={post.media.scene} format="reel" variant="full" showMeta={true} align="center" />
      {/* top */}
      {kind === "story" ? (
        <div style={{ position: "absolute", top: 10, left: 10, right: 10, zIndex: 3 }}>
          <div style={{ display: "flex", gap: 4, marginBottom: 10 }}>
            {[1,1,0.3,0.3].map((o,i) => <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: `rgba(255,255,255,${o === 1 ? 0.95 : 0.4})` }} />)}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <Avatar size={30} ring={false} />
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 13.5 }}>forma.studio</span>
            <span style={{ color: "rgba(255,255,255,.75)", fontSize: 12.5 }}>2h</span>
            <Icon name="x" size={20} style={{ marginLeft: "auto", color: "#fff" }} />
          </div>
        </div>
      ) : (
        <div style={{ position: "absolute", top: 12, left: 14, right: 14, zIndex: 3, display: "flex", alignItems: "center", color: "#fff" }}>
          <Icon name="chevron-left" size={22} />
          <span style={{ marginLeft: "auto", marginRight: "auto", fontWeight: 800, fontSize: 15, fontFamily: "var(--ps-font-display)", transform: "translateX(-11px)" }}>
            {kind === "tiktok" ? "For You" : "Reels"}
          </span>
          {kind === "tiktok" && <span style={{ position: "absolute", right: 0 }}><Icon name="search" size={20} /></span>}
        </div>
      )}
      {/* bottom gradient + content */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg,rgba(0,0,0,0.55) 0%,rgba(0,0,0,0) 42%)", zIndex: 1 }} />
      {kind !== "story" && (
        <>
          <div style={{ position: "absolute", right: 12, bottom: 26, zIndex: 4 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 18, alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                <Icon name="heart" size={29} style={{ color: "#fff" }} /><span style={{ color: "#fff", fontSize: 11, fontWeight: 600 }}>4.2k</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                <Icon name="comment" size={28} style={{ color: "#fff" }} /><span style={{ color: "#fff", fontSize: 11, fontWeight: 600 }}>86</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                <Icon name="send" size={27} style={{ color: "#fff" }} /><span style={{ color: "#fff", fontSize: 11, fontWeight: 600 }}>312</span>
              </div>
              {kind === "tiktok"
                ? <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#444,#111)", border: "2px solid rgba(255,255,255,.5)", display: "grid", placeItems: "center" }}><Icon name="play" size={14} style={{ color: "#fff" }} /></div>
                : <Icon name="more" size={26} style={{ color: "#fff" }} />}
            </div>
          </div>
          <div style={{ position: "absolute", left: 14, right: 64, bottom: 22, zIndex: 4, color: "#fff" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <Avatar size={28} ring={false} />
              <span style={{ fontWeight: 700, fontSize: 13.5 }}>forma.studio</span>
              <span style={{ fontSize: 12, border: "1px solid rgba(255,255,255,.6)", padding: "2px 8px", borderRadius: 6 }}>Follow</span>
            </div>
            <div style={{ fontSize: 13, lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
              {post.caption.split("\n")[0]}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8, fontSize: 12 }}>
              <Icon name={kind === "tiktok" ? "play" : "film"} size={13} style={{ color: "#fff" }} />
              <span style={{ opacity: .92 }}>Original audio · Forma</span>
            </div>
          </div>
        </>
      )}
      {kind === "story" && (
        <div style={{ position: "absolute", left: 12, right: 12, bottom: 14, zIndex: 4, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ flex: 1, height: 38, borderRadius: 999, border: "1px solid rgba(255,255,255,.6)", display: "flex", alignItems: "center", padding: "0 14px", color: "rgba(255,255,255,.8)", fontSize: 13 }}>Send message</div>
          <Icon name="heart" size={24} style={{ color: "#fff" }} />
          <Icon name="send" size={23} style={{ color: "#fff" }} />
        </div>
      )}
    </div>
  );
}

function FacebookPreview({ post }) {
  return (
    <div style={{ width: "100%", background: "#fff", borderRadius: 14, overflow: "hidden", border: "1px solid #E9E9E4", boxShadow: "var(--ps-shadow-sm)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "13px 14px 10px" }}>
        <Avatar size={40} ring={false} />
        <div style={{ lineHeight: 1.25 }}>
          <div style={{ fontWeight: 700, fontSize: 14.5 }}>Forma · Strength & Recovery</div>
          <div style={{ fontSize: 12, color: "#8E939B", display: "flex", alignItems: "center", gap: 5 }}>{fmtDate(post.scheduledAt)} · <Icon name="globe" size={12} /></div>
        </div>
        <Icon name="more" size={20} style={{ marginLeft: "auto", color: "#65686C" }} />
      </div>
      <div style={{ padding: "0 14px 12px", fontSize: 14.5, lineHeight: 1.5, whiteSpace: "pre-line" }}>{post.caption}</div>
      <div style={{ width: "100%", aspectRatio: "1.91 / 1" }}>
        <MockMedia scene={post.media.scene} format="feed" variant="full" />
      </div>
      <div style={{ display: "flex", justifyContent: "space-around", padding: "6px 8px", borderTop: "1px solid #EEE", margin: "0 4px" }}>
        {[["heart","Like"],["comment","Comment"],["send","Share"]].map(([ic,l]) => (
          <div key={l} style={{ display: "flex", alignItems: "center", gap: 7, padding: "9px 12px", color: "#65686C", fontSize: 13.5, fontWeight: 600 }}>
            <Icon name={ic} size={19} />{l}
          </div>
        ))}
      </div>
    </div>
  );
}

function PlatformPreview({ post, target }) {
  const { network, surface } = target;
  if (network === "facebook") return <FacebookPreview post={post} />;
  if (network === "tiktok") return <div style={{ maxWidth: 300, margin: "0 auto" }}><VerticalChrome post={post} kind="tiktok" /></div>;
  if (network === "instagram" && surface === "reel") return <div style={{ maxWidth: 300, margin: "0 auto" }}><VerticalChrome post={post} kind="reel" /></div>;
  if (network === "instagram" && surface === "story") return <div style={{ maxWidth: 300, margin: "0 auto" }}><VerticalChrome post={post} kind="story" /></div>;
  return <IGFeedPreview post={post} />;
}

/* ---------------- Feedback thread ---------------- */
function FeedbackThread({ post, onSend }) {
  const [val, setVal] = useState("");
  const endRef = useRef(null);
  useEffect(() => { endRef.current?.parentNode && (endRef.current.parentNode.scrollTop = endRef.current.parentNode.scrollHeight); }, [post.thread.length]);
  const submit = () => { if (!val.trim()) return; onSend(val.trim()); setVal(""); };
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <Icon name="comment" size={17} style={{ color: "var(--ps-ink-2)" }} />
        <span className="ps-h3">Feedback</span>
        <span style={{ fontFamily: "var(--ps-font-mono)", fontSize: 12, color: "var(--ps-ink-3)", background: "var(--ps-bg-soft)", padding: "2px 8px", borderRadius: 999 }}>{post.thread.length}</span>
      </div>
      {post.thread.length === 0 ? (
        <div style={{ padding: "20px 16px", background: "var(--ps-bg-soft)", borderRadius: 12, textAlign: "center", color: "var(--ps-ink-3)", fontSize: 13.5, marginBottom: 14 }}>
          No notes yet. Leave specific feedback and the team will reply here.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 16 }}>
          {post.thread.map((m, i) => {
            const mine = m.role === "client";
            return (
              <div key={i} style={{ display: "flex", gap: 10, flexDirection: mine ? "row-reverse" : "row" }}>
                <div style={{ width: 30, height: 30, flexShrink: 0, borderRadius: "50%", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 12, color: "#fff", background: mine ? "var(--ps-ink)" : "var(--ps-orange)" }}>
                  {mine ? "Y" : m.author[0]}
                </div>
                <div style={{ maxWidth: "78%" }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "baseline", marginBottom: 3, justifyContent: mine ? "flex-end" : "flex-start" }}>
                    <span style={{ fontWeight: 700, fontSize: 12.5 }}>{mine ? "You" : m.author}</span>
                    <span style={{ fontSize: 11, color: "var(--ps-ink-3)" }}>{fmtRel(m.time)}</span>
                  </div>
                  <div style={{ padding: "10px 13px", borderRadius: mine ? "14px 14px 4px 14px" : "14px 14px 14px 4px", fontSize: 13.5, lineHeight: 1.5, background: mine ? "var(--ps-ink)" : "var(--ps-bg-soft)", color: mine ? "#fff" : "var(--ps-ink)", border: mine ? "none" : "1px solid var(--ps-line)" }}>
                    {m.text}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={endRef} />
        </div>
      )}
      <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
        <textarea className="ps-textarea" rows={1} placeholder="Leave a note for the team…" value={val}
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) submit(); }}
          style={{ minHeight: 44 }} />
        <button className="ps-btn ps-btn-dark ps-btn-icon" onClick={submit} aria-label="Send"><Icon name="send" size={17} /></button>
      </div>
    </div>
  );
}

/* ---------------- Approve actions (3 interaction modes) ---------------- */
function SlideToApprove({ onApprove }) {
  const trackRef = useRef(null); const [x, setX] = useState(0); const [done, setDone] = useState(false);
  const drag = useRef(false);
  const KNOB = 46;
  const onDown = () => { if (done) return; drag.current = true; };
  const onMove = (clientX) => {
    if (!drag.current || done) return;
    const t = trackRef.current.getBoundingClientRect();
    let nx = clientX - t.left - KNOB / 2;
    nx = Math.max(0, Math.min(nx, t.width - KNOB));
    setX(nx);
    if (nx >= t.width - KNOB - 4) { setDone(true); drag.current = false; setTimeout(onApprove, 280); }
  };
  const onUp = () => { if (done) return; drag.current = false; setX(0); };
  useEffect(() => {
    const mm = (e) => onMove(e.clientX);
    const tm = (e) => onMove(e.touches[0].clientX);
    window.addEventListener("mousemove", mm); window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", tm); window.addEventListener("touchend", onUp);
    return () => { window.removeEventListener("mousemove", mm); window.removeEventListener("mouseup", onUp); window.removeEventListener("touchmove", tm); window.removeEventListener("touchend", onUp); };
  });
  return (
    <div ref={trackRef} style={{ position: "relative", height: 54, borderRadius: 999, background: done ? "var(--ps-approved)" : "var(--ps-orange-100)", overflow: "hidden", userSelect: "none", transition: "background .25s ease", flex: 1 }}>
      <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", color: done ? "#fff" : "var(--ps-orange-700)", fontWeight: 700, fontSize: 14.5, paddingLeft: 30, transition: "color .2s", letterSpacing: "-0.01em" }}>
        {done ? "Approved" : "Slide to approve"}
      </div>
      <div onMouseDown={onDown} onTouchStart={onDown}
        style={{ position: "absolute", top: 4, left: 4, width: KNOB, height: KNOB, borderRadius: "50%", background: done ? "#fff" : "var(--ps-orange)", color: done ? "var(--ps-approved)" : "#fff", display: "grid", placeItems: "center", cursor: done ? "default" : "grab", transform: `translateX(${x}px)`, transition: drag.current ? "none" : "transform .25s cubic-bezier(.4,0,.2,1)", boxShadow: "0 2px 8px rgba(0,0,0,.18)" }}>
        <Icon name={done ? "check" : "arrow-right"} size={22} />
      </div>
    </div>
  );
}

function ApproveActions({ post, mode, onApprove, onRequestChanges, size = "lg" }) {
  const [confirming, setConfirming] = useState(false);
  const isApproved = post.stage === "approved" || post.stage === "scheduled";
  const big = size === "lg";

  if (isApproved) {
    return (
      <div style={{ display: "flex", gap: 10, alignItems: "center", flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, flex: 1, justifyContent: "center", height: big ? 54 : 44, borderRadius: 12, background: "var(--ps-approved-bg)", color: "var(--ps-approved)", fontWeight: 700, fontSize: 14.5 }}>
          <Icon name="check-circle" size={20} />{post.stage === "scheduled" ? "Approved & scheduled" : "Approved"}
        </div>
        <button className="ps-btn ps-btn-outline" style={{ height: big ? 54 : 44 }} onClick={() => onRequestChanges()}>
          <Icon name="redo" size={16} />Reopen
        </button>
      </div>
    );
  }

  if (mode === "slide") {
    return (
      <div style={{ display: "flex", gap: 10, alignItems: "center", flex: 1 }}>
        <SlideToApprove onApprove={onApprove} />
        <button className="ps-btn ps-btn-outline" style={{ height: 54, padding: "0 16px" }} onClick={onRequestChanges}>
          <Icon name="redo" size={16} />Request changes
        </button>
      </div>
    );
  }

  if (mode === "confirm" && confirming) {
    return (
      <div style={{ display: "flex", gap: 10, alignItems: "center", flex: 1 }}>
        <span style={{ fontSize: 13.5, fontWeight: 600, color: "var(--ps-ink-2)", marginRight: 2 }}>Approve & schedule this post?</span>
        <button className="ps-btn ps-btn-ghost" style={{ height: big ? 54 : 44 }} onClick={() => setConfirming(false)}>Cancel</button>
        <button className="ps-btn ps-btn-primary" style={{ height: big ? 54 : 44 }} onClick={onApprove}><Icon name="check" size={17} />Yes, approve</button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", gap: 10, flex: 1 }}>
      <button className="ps-btn ps-btn-outline" style={{ flex: 1, height: big ? 54 : 44 }} onClick={onRequestChanges}>
        <Icon name="redo" size={17} />Request changes
      </button>
      <button className="ps-btn ps-btn-primary" style={{ flex: 1.3, height: big ? 54 : 44 }} onClick={() => mode === "confirm" ? setConfirming(true) : onApprove()}>
        <Icon name="check" size={18} />Approve
      </button>
    </div>
  );
}

Object.assign(window, { Avatar, CopyButton, PlatformPreview, IGFeedPreview, VerticalChrome, FacebookPreview, FeedbackThread, ApproveActions, SlideToApprove });
