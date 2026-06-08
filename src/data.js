/* ============================================================
   POST STUDIO — Mock data
   Logged-in client: FORMA · Strength & Recovery Studio
   ============================================================ */
window.PS_CLIENT = {
  name: "Forma",
  full: "Forma · Strength & Recovery Studio",
  handle: "@forma.studio",
  managerName: "Priya",
  managerRole: "Your content lead",
};

/* Scenes drive the CSS-composed mock imagery (see MockMedia). */
window.PS_DATA = [
  /* ---------------- AWAITING REVIEW ---------------- */
  {
    id: "p1",
    title: "Sunrise mobility flow",
    stage: "review",
    unseen: true,
    format: "reel",
    targets: [{ network: "instagram", surface: "reel" }, { network: "tiktok", surface: "video" }],
    media: { scene: "sunrise", type: "reel", duration: "0:34", accent: "#FF7A3C" },
    caption:
      "10 minutes to unstick your morning. This sunrise mobility flow opens the hips, shoulders and spine before you've even had coffee.\n\nSave it for tomorrow — your future self says thank you.",
    hashtags: ["#mobilitymatters", "#morningmovement", "#formastudio", "#recovery", "#strengthandmobility"],
    scheduledAt: "2026-06-09T07:00:00",
    thread: [
      { author: "Priya", role: "team", text: "Morning! First cut of the sunrise flow — kept it to the 6 moves you liked. Happy with the pace?", time: "2026-06-02T16:20:00" },
    ],
  },
  {
    id: "p2",
    title: "Protein bowl feature",
    stage: "review",
    unseen: true,
    format: "feed",
    targets: [{ network: "instagram", surface: "feed" }],
    media: { scene: "bowl", type: "image", accent: "#1FA971" },
    caption:
      "Recovery starts on the plate. Our go-to post-lift bowl: 40g protein, slow carbs, and enough colour to make Monday feel less like Monday.\n\nFull recipe in the studio app.",
    hashtags: ["#fuelyourtraining", "#highprotein", "#recoverynutrition", "#formastudio"],
    scheduledAt: "2026-06-10T12:30:00",
    thread: [],
  },
  {
    id: "p3",
    title: "Member spotlight — Dana",
    stage: "review",
    unseen: false,
    format: "carousel",
    targets: [{ network: "instagram", surface: "feed" }, { network: "facebook", surface: "feed" }],
    media: { scene: "spotlight", type: "carousel", count: 4, accent: "#15171A" },
    caption:
      "Six months ago Dana couldn't hold a plank for 20 seconds. Last week: a 90-second hold and her first unassisted pull-up.\n\nProgress isn't loud. It's just consistent. Proud of you, Dana. 👏",
    hashtags: ["#memberspotlight", "#strengthjourney", "#progressnotperfection", "#formafamily"],
    scheduledAt: "2026-06-11T18:00:00",
    thread: [
      { author: "Priya", role: "team", text: "Dana approved her photos being used. Caption keeps it warm but not over-the-top — let me know if you'd rather drop the clap.", time: "2026-06-03T09:10:00" },
    ],
  },
  {
    id: "p4",
    title: "Class timetable — June",
    stage: "review",
    unseen: true,
    format: "story",
    targets: [{ network: "instagram", surface: "story" }],
    media: { scene: "timetable", type: "story", accent: "#FFD23F" },
    caption: "New June timetable is live. Two new recovery slots on Wednesday evenings — link in bio to book.",
    hashtags: ["#timetable", "#booknow", "#formastudio"],
    scheduledAt: "2026-06-08T08:00:00",
    thread: [],
  },

  /* ---------------- CHANGES REQUESTED ---------------- */
  {
    id: "p5",
    title: "Kettlebell strength tip",
    stage: "changes",
    unseen: false,
    format: "reel",
    targets: [{ network: "instagram", surface: "reel" }, { network: "tiktok", surface: "video" }],
    media: { scene: "kettlebell", type: "reel", duration: "0:22", accent: "#15171A" },
    caption:
      "Your kettlebell swing is a hinge, not a squat. Here's the 30-second fix that protects your back and doubles your power.",
    hashtags: ["#kettlebell", "#strengthtips", "#hingenotsquat", "#formastudio"],
    scheduledAt: "2026-06-12T17:30:00",
    thread: [
      { author: "Priya", role: "team", text: "Quick technique reel for you.", time: "2026-06-01T11:00:00" },
      { author: "You", role: "client", text: "Love this one. Can we cut the intro title card? Gets to the tip faster. Also the music is a touch loud over the voiceover.", time: "2026-06-01T14:32:00" },
      { author: "Priya", role: "team", text: "On it — re-cutting now, will drop the title and bring the VO up 4dB. New version tomorrow AM.", time: "2026-06-01T15:05:00" },
    ],
  },
  {
    id: "p6",
    title: "Hydration myth-buster",
    stage: "changes",
    unseen: false,
    format: "feed",
    targets: [{ network: "instagram", surface: "feed" }],
    media: { scene: "hydration", type: "image", accent: "#3A82E0" },
    caption:
      "You don't need 4 litres a day. You need enough — and a pinch of salt does more than another glass of water. Here's what actually keeps you hydrated through a session.",
    hashtags: ["#hydration", "#mythbusting", "#performance", "#formastudio"],
    scheduledAt: "2026-06-13T13:00:00",
    thread: [
      { author: "You", role: "client", text: "Can we soften 'You don't need 4 litres'? Some members are really into their hydration goals — don't want it to read as dismissive.", time: "2026-06-02T10:15:00" },
      { author: "Priya", role: "team", text: "Totally fair. Reworking the hook to be more 'here's the nuance' than 'you're wrong'.", time: "2026-06-02T10:40:00" },
    ],
  },
  {
    id: "p7",
    title: "Saturday community run",
    stage: "changes",
    unseen: false,
    format: "feed",
    targets: [{ network: "instagram", surface: "feed" }, { network: "facebook", surface: "feed" }],
    media: { scene: "run", type: "image", accent: "#FF5A2C" },
    caption: "Saturday 8am. 5k along the canal, coffee after. All paces welcome — no one gets left behind.",
    hashtags: ["#communityrun", "#runclub", "#allpaceswelcome", "#formastudio"],
    scheduledAt: "2026-06-14T09:00:00",
    thread: [
      { author: "You", role: "client", text: "Date's wrong — this Saturday is the 13th, not the 14th. Can you fix and confirm the meeting point text on the image?", time: "2026-06-03T08:05:00" },
    ],
  },

  /* ---------------- APPROVED ---------------- */
  {
    id: "p8",
    title: "Recovery breathing reset",
    stage: "approved",
    unseen: false,
    format: "reel",
    targets: [{ network: "instagram", surface: "reel" }, { network: "tiktok", surface: "video" }],
    media: { scene: "breathe", type: "reel", duration: "0:48", accent: "#2EA5B5" },
    caption:
      "Wind down in 4 minutes. A guided box-breathing reset for the end of a heavy training day. Headphones in, lights low.",
    hashtags: ["#breathwork", "#recovery", "#nervoussystem", "#formastudio"],
    scheduledAt: "2026-06-07T20:30:00",
    thread: [
      { author: "Priya", role: "team", text: "Final cut with the calmer track.", time: "2026-05-30T12:00:00" },
      { author: "You", role: "client", text: "Perfect. Approved 🙌", time: "2026-05-31T19:20:00" },
    ],
  },
  {
    id: "p9",
    title: "Trainer Q&A — sleep",
    stage: "approved",
    unseen: false,
    format: "carousel",
    targets: [{ network: "instagram", surface: "feed" }],
    media: { scene: "qa", type: "carousel", count: 5, accent: "#7C5CFF" },
    caption:
      "\"Why am I always sore on Mondays?\" Coach Theo answers your top three recovery questions — swipe through for the short version.",
    hashtags: ["#trainerqa", "#sleepandrecovery", "#askacoach", "#formastudio"],
    scheduledAt: "2026-06-06T17:00:00",
    thread: [
      { author: "You", role: "client", text: "Great. Approved as-is.", time: "2026-05-29T15:00:00" },
    ],
  },
  {
    id: "p10",
    title: "Strength challenge launch",
    stage: "approved",
    unseen: false,
    format: "feed",
    targets: [{ network: "instagram", surface: "feed" }, { network: "facebook", surface: "feed" }],
    media: { scene: "challenge", type: "image", accent: "#FF5A2C" },
    caption:
      "The 6-Week Strength Challenge is back. Three sessions a week, one simple plan, a whole crew doing it with you. Sign-ups open Friday.",
    hashtags: ["#strengthchallenge", "#6weeks", "#strongertogether", "#formastudio"],
    scheduledAt: "2026-06-05T09:00:00",
    thread: [],
  },

  /* ---------------- SCHEDULED ---------------- */
  {
    id: "p11",
    title: "Monday motivation",
    stage: "scheduled",
    unseen: false,
    format: "feed",
    targets: [{ network: "instagram", surface: "feed" }],
    media: { scene: "quote", type: "image", accent: "#15171A" },
    caption: "You won't always be motivated. That's why you build the habit. See you on the floor this week.",
    hashtags: ["#mondaymotivation", "#showup", "#formastudio"],
    scheduledAt: "2026-06-08T06:30:00",
    thread: [
      { author: "You", role: "client", text: "Approved.", time: "2026-05-28T10:00:00" },
    ],
  },
  {
    id: "p12",
    title: "Foam rolling 101",
    stage: "scheduled",
    unseen: false,
    format: "reel",
    targets: [{ network: "instagram", surface: "reel" }, { network: "tiktok", surface: "video" }],
    media: { scene: "foam", type: "reel", duration: "0:41", accent: "#1FA971" },
    caption: "Foam rolling, done right. Three spots most people miss — and how long to actually hold each one.",
    hashtags: ["#foamrolling", "#mobility", "#recovery101", "#formastudio"],
    scheduledAt: "2026-06-09T18:00:00",
    thread: [],
  },
  {
    id: "p13",
    title: "Coach feature — Theo",
    stage: "scheduled",
    unseen: false,
    format: "feed",
    targets: [{ network: "instagram", surface: "feed" }, { network: "facebook", surface: "feed" }],
    media: { scene: "coach", type: "image", accent: "#15171A" },
    caption:
      "Meet Coach Theo. Ten years coaching, a soft spot for heavy deadlifts and terrible puns. Book a session and find out which.",
    hashtags: ["#meettheteam", "#coachfeature", "#formastudio"],
    scheduledAt: "2026-06-11T11:00:00",
    thread: [],
  },
];
