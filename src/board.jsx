/* ============================================================
   POST STUDIO — Kanban board
   ============================================================ */
function CardActions({ post, mode, onOpen, onApprove, onRequestChanges }) {
  const [confirming, setConfirming] = useState(false);
  const stop = (fn) => (e) => { e.stopPropagation(); fn && fn(); };

  if (post.stage === "review") {
    if (mode === "confirm" && confirming) {
      return (
        <div style={{ display: "flex", gap: 7 }}>
          <button className="ps-btn ps-btn-ghost ps-btn-sm" style={{ flex: 1 }} onClick={stop(() => setConfirming(false))}>Cancel</button>
          <button className="ps-btn ps-btn-primary ps-btn-sm" style={{ flex: 1.2 }} onClick={stop(() => onApprove(post.id))}><Icon name="check" size={15} />Confirm</button>
        </div>
      );
    }
    return (
      <div style={{ display: "flex", gap: 7 }}>
        <button className="ps-btn ps-btn-outline ps-btn-sm" style={{ flex: 1 }} onClick={stop(() => onRequestChanges(post.id))}>
          <Icon name="redo" size={14} />Changes
        </button>
        <button className="ps-btn ps-btn-primary ps-btn-sm" style={{ flex: 1.1 }} onClick={stop(() => mode === "confirm" ? setConfirming(true) : onApprove(post.id))}>
          <Icon name="check" size={15} />Approve
        </button>
      </div>
    );
  }
  if (post.stage === "changes") {
    return (
      <button className="ps-btn ps-btn-outline ps-btn-sm" style={{ width: "100%" }} onClick={stop(() => onOpen(post))}>
        <Icon name="comment" size={14} />View notes & reply
      </button>
    );
  }
  if (post.stage === "approved") {
    return (
      <button className="ps-btn ps-btn-ghost ps-btn-sm" style={{ width: "100%", justifyContent: "space-between" }} onClick={stop(() => onOpen(post))}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--ps-approved)", fontWeight: 700 }}><Icon name="check-circle" size={15} />Approved</span>
        <Icon name="arrow-right" size={15} />
      </button>
    );
  }
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "7px 12px", border: "1px solid transparent", fontSize: 12.5, color: "var(--ps-scheduled)", fontWeight: 600 }}>
      <Icon name="clock" size={14} />Live {fmtDate(post.scheduledAt)} · {fmtTime(post.scheduledAt)}
    </div>
  );
}

function PostCard({ post, mode, dragging, onOpen, onApprove, onRequestChanges, onDragStart, onDragEnd }) {
  const vertical = post.format === "reel" || post.format === "story";
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, post)}
      onDragEnd={onDragEnd}
      onClick={() => onOpen(post)}
      style={{
        background: "var(--ps-surface)", border: "1px solid var(--ps-line)", borderRadius: 16,
        boxShadow: "var(--ps-shadow-card)", overflow: "hidden", cursor: "pointer",
        opacity: dragging ? 0.4 : 1, transition: "box-shadow .18s ease, transform .18s ease, border-color .18s ease",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "var(--ps-shadow-md)"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.borderColor = "var(--ps-line-2)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "var(--ps-shadow-card)"; e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = "var(--ps-line)"; }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 11, padding: 13 }}>
        <div style={{ position: "relative", display: "flex", gap: 12, alignItems: "stretch" }}>
        {/* thumbnail — stretches to the card's content height instead of dictating it */}
        <div style={{ position: "relative", width: 72, flexShrink: 0, alignSelf: "stretch", minHeight: 68, borderRadius: 11, overflow: "hidden", boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.05)" }}>
          <MockMedia scene={post.media.scene} format={post.format} variant="thumb" showMeta={false} minimal={true} />
          <div style={{ position: "absolute", top: 5, left: 5, display: "flex", gap: 4 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 3, background: "rgba(0,0,0,0.55)", color: "#fff", borderRadius: 6, padding: "2px 5px", fontSize: 10, fontWeight: 600, backdropFilter: "blur(2px)" }}>
              <Icon name={FORMAT_META[post.format].icon} size={11} />{post.media.duration || (post.media.count ? post.media.count : FORMAT_META[post.format].label)}
            </span>
          </div>
          {(post.format === "reel") && <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}><div style={{ width: 26, height: 26, borderRadius: "50%", background: "rgba(255,255,255,0.9)", display: "grid", placeItems: "center" }}><Icon name="play" size={13} style={{ color: "#15171A" }} /></div></div>}
        </div>
        {/* body */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
            <div style={{ fontWeight: 700, fontSize: 14.5, letterSpacing: "-0.01em", lineHeight: 1.25, flex: 1 }}>{post.title}</div>
            {post.unseen && <span title="New" style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--ps-orange)", flexShrink: 0, marginTop: 5 }} />}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, margin: "7px 0" }}>
            {[...new Set(post.targets.map((t) => t.network))].map((n) => (
              <span key={n} style={{ color: "var(--ps-ink-2)", display: "inline-flex" }}><NetworkGlyph network={n} size={14} /></span>
            ))}
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--ps-ink-4)" }} />
            <span style={{ fontFamily: "var(--ps-font-mono)", fontSize: 11.5, color: "var(--ps-ink-3)" }}>{fmtDate(post.scheduledAt)}</span>
          </div>
          <div style={{ fontSize: 12.5, lineHeight: 1.45, color: "var(--ps-ink-2)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {post.caption.split("\n")[0]}
          </div>
        </div>
      </div>
        <CardActions post={post} mode={mode} onOpen={onOpen} onApprove={onApprove} onRequestChanges={onRequestChanges} />
      </div>
    </div>
  );
}

function Column({ stage, posts, mode, dragId, dropTarget, onOpen, onApprove, onRequestChanges, onDragStart, onDragEnd, onDragOverCol, onDrop, isMobile }) {
  const isDrop = dropTarget === stage.id && dragId;
  return (
    <div
      onDragOver={(e) => { e.preventDefault(); onDragOverCol(stage.id); }}
      onDrop={(e) => { e.preventDefault(); onDrop(stage.id); }}
      style={{
        flex: isMobile ? "0 0 86%" : "1 1 0", minWidth: isMobile ? "86%" : 280, maxWidth: isMobile ? "86%" : 360, minHeight: 0,
        display: "flex", flexDirection: "column", scrollSnapAlign: "start",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "0 4px 12px" }}>
        <span style={{ width: 9, height: 9, borderRadius: "50%", background: stage.dot }} />
        <span style={{ fontWeight: 700, fontSize: 13.5, letterSpacing: "-0.01em" }}>{stage.label}</span>
        <span style={{ fontFamily: "var(--ps-font-mono)", fontSize: 12, color: "var(--ps-ink-3)", background: "var(--ps-bg)", border: "1px solid var(--ps-line)", borderRadius: 999, minWidth: 22, height: 20, padding: "0 7px", display: "grid", placeItems: "center" }}>{posts.length}</span>
      </div>
      <div className="ps-scroll" style={{
        flex: 1, display: "flex", flexDirection: "column", gap: 10, padding: 8, borderRadius: 16,
        background: isDrop ? "var(--ps-orange-100)" : "var(--ps-bg-soft)",
        outline: isDrop ? "2px dashed var(--ps-orange)" : "1px solid transparent",
        transition: "background .15s ease, outline-color .15s ease", minHeight: 0, overflowY: "auto", overflowX: "hidden",
      }}>
        {posts.length === 0 ? (
          <div style={{ flex: 1, display: "grid", placeItems: "center", padding: "30px 16px", textAlign: "center" }}>
            <div>
              <div style={{ width: 38, height: 38, margin: "0 auto 10px", borderRadius: 11, background: "var(--ps-bg)", border: "1px solid var(--ps-line)", display: "grid", placeItems: "center", color: "var(--ps-ink-4)" }}>
                <Icon name={stage.id === "review" ? "inbox" : stage.id === "approved" ? "check" : stage.id === "scheduled" ? "calendar" : "comment"} size={18} />
              </div>
              <div style={{ fontSize: 12.5, color: "var(--ps-ink-3)", maxWidth: 180 }}>
                {stage.id === "review" ? "You're all caught up — nothing waiting." :
                 stage.id === "changes" ? "No change requests. Drag a card here or use Request changes." :
                 stage.id === "approved" ? "Approved posts will land here." :
                 "Approved posts get scheduled here."}
              </div>
            </div>
          </div>
        ) : posts.map((p) => (
          <PostCard key={p.id} post={p} mode={mode} dragging={dragId === p.id}
            onOpen={onOpen} onApprove={onApprove} onRequestChanges={onRequestChanges}
            onDragStart={onDragStart} onDragEnd={onDragEnd} />
        ))}
      </div>
    </div>
  );
}

function Board({ posts, mode, isMobile, onOpen, onApprove, onRequestChanges, onMove }) {
  const [dragId, setDragId] = useState(null);
  const [dropTarget, setDropTarget] = useState(null);
  const onDragStart = (e, post) => { setDragId(post.id); e.dataTransfer.effectAllowed = "move"; try { e.dataTransfer.setData("text/plain", post.id); } catch (_) {} };
  const onDragEnd = () => { setDragId(null); setDropTarget(null); };
  const onDrop = (stageId) => { if (dragId) onMove(dragId, stageId); setDragId(null); setDropTarget(null); };
  return (
    <div className="ps-scroll" style={{
      display: "flex", gap: isMobile ? 14 : 18, alignItems: "stretch",
      overflowX: "auto", padding: isMobile ? "0 16px 20px" : "0 28px 24px",
      scrollSnapType: isMobile ? "x mandatory" : "none", minHeight: 0, flex: 1,
    }}>
      {STAGES.map((stage) => (
        <Column key={stage.id} stage={stage} mode={mode} isMobile={isMobile}
          posts={posts.filter((p) => p.stage === stage.id)}
          dragId={dragId} dropTarget={dropTarget}
          onOpen={onOpen} onApprove={onApprove} onRequestChanges={onRequestChanges}
          onDragStart={onDragStart} onDragEnd={onDragEnd}
          onDragOverCol={setDropTarget} onDrop={onDrop} />
      ))}
    </div>
  );
}

Object.assign(window, { Board, Column, PostCard, CardActions });
