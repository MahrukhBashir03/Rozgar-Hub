"use client";
import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import dynamic from "next/dynamic";
import {
  Briefcase, LogOut, Menu, X, Clock, Send,
  CheckCircle, XCircle, Bell, Search, AlertCircle,
  Phone, Zap
} from "lucide-react";

const socket = io("http://localhost:5000");
if (typeof window !== "undefined") window._rozgarSocket = socket;

const JobMap = dynamic(() => import("@/components/JobMap"), { ssr: false });

const LANG = {
  en: {
    dir: "ltr",
    findWorker: "🔍 Find a Worker",
    myRequests: "📋 My Requests",
    history: "🕐 History",
    welcomeBack: "Welcome back",
    logout: "Logout",
    postJob: "Post a Job Request",
    postJobSub: "Workers near you will see your request — like InDrive",
    category: "Work Category",
    jobTitle: "Job Title",
    jobTitlePlaceholder: "e.g., Fix wiring in bedroom",
    urgency: "Urgency",
    urgent1h: "⚡ Within 1 Hour",
    urgentToday: "📅 Today",
    urgentWeek: "📆 This Week",
    urgentFlex: "🕐 Flexible",
    description: "Description",
    descPlaceholder: "Describe the work needed... or click Generate with AI ✨",
    generateAI: "✨ Generate with AI",
    generating: "⏳ Generating...",
    location: "📍 Location",
    locationPlaceholder: "Work site address / area (e.g., DHA Phase 5, Karachi)",
    pinHint: "📌 Click on the map to pin exact job location:",
    pinned: "✅ Pinned:",
    pickup: "Pickup",
    drop: "Drop",
    pickupPlaceholder: "Pickup location",
    dropPlaceholder: "Drop location",
    budget: "Budget",
    fixedBudget: "💰 Fixed Budget",
    openOffers: "🤝 Open to Offers",
    sendRequest: "Send Request to Nearby Workers",
    posting: "Posting...",
    cancelRequest: "Cancel Request",
    searching: "Searching Nearby Workers...",
    elapsed: "elapsed",
    waitingWorkers: "Waiting for workers to respond...",
    waitingWorkersDesc: "Workers near you will see your request and can accept it instantly",
    workersReady: "Workers Ready to Start",
    counterOffers: "💬 Counter Offers",
    confirmedTitle: "Worker Confirmed! 🎉",
    confirmedSub: "Your worker is on the way",
    postAnother: "Post Another Request",
    agreedPrice: "Agreed Price",
    eta: "ETA",
    etaValue: "~15 min",
    phone: "Phone",
    status: "Status",
    enRoute: "En Route",
    yourOffer: "Your Offer",
    confirmWorker: "Confirm Worker",
    accept: "Accept",
    counter: "Counter",
    send: "Send",
    above: "above your offer",
    below: "below your offer",
    counterPricePlaceholder: "Counter price (Rs.)",
    noHistory: "No history yet",
    noHistorySub: "Completed jobs will appear here",
    noRequests: "No requests yet",
    noRequestsSub: 'Use "Find Worker" to post your first request',
    loading: "Loading...",
    navFind: "Find Worker",
    navRequests: "My Requests",
    navHistory: "History",
    selectCategory: "Please select a category first",
    serverError: "Cannot connect with server",
    langBtn: "اردو",
    jobSiteLocation: "Job Site Location",
    acceptedBadge: "✓ ACCEPTED YOUR REQUEST",
    readyNow: "Ready Now",
    locationFound: "✅ Location found — or click map to adjust:",
    reliabilityScore: "Reliability Score",
    marketRate: "💡 AI Market Rate",
    typicalRange: "Typical range",
    yourOfferLabel: "Your offer",
    offerFair: "✅ Fair offer — workers will respond well",
    offerLow: "⚠️ Below market — consider raising your offer",
    offerHigh: "ℹ️ Above market — you may get faster responses",
    // ── Profile Progress ──
    profileProgress: "Profile Progress",
    profileComplete: "Profile Complete! 🎉",
    completeYourProfile: "Complete your profile to hire better workers",
    stepRegistered: "Account Registered",
    stepProfilePhoto: "Profile Photo Uploaded",
    stepCnicDocs: "CNIC Documents Uploaded",
    stepEmailVerified: "Email Verified",
    stepFirstJob: "First Job Posted",
    stepVerified: "Account Verified by Admin",
    tapToPost: "Post a Job →",
  },
  ur: {
    dir: "rtl",
    findWorker: "🔍 کارکن تلاش کریں",
    myRequests: "📋 میری درخواستیں",
    history: "🕐 تاریخ",
    welcomeBack: "خوش آمدید",
    logout: "لاگ آؤٹ",
    postJob: "نوکری کی درخواست پوسٹ کریں",
    postJobSub: "آپ کے قریب کارکن آپ کی درخواست دیکھیں گے",
    category: "کام کی قسم",
    jobTitle: "نوکری کا عنوان",
    jobTitlePlaceholder: "مثلاً: کمرے میں وائرنگ ٹھیک کریں",
    urgency: "فوری",
    urgent1h: "⚡ ایک گھنٹے میں",
    urgentToday: "📅 آج",
    urgentWeek: "📆 اس ہفتے",
    urgentFlex: "🕐 لچکدار",
    description: "تفصیل",
    descPlaceholder: "کام کی تفصیل لکھیں... یا AI سے بنوائیں ✨",
    generateAI: "✨ AI سے بنائیں",
    generating: "⏳ بن رہا ہے...",
    location: "📍 مقام",
    locationPlaceholder: "کام کی جگہ کا پتہ (مثلاً: DHA فیز 5، کراچی)",
    pinHint: "📌 نقشے پر کلک کر کے جگہ پن کریں:",
    pinned: "✅ پن کیا:",
    pickup: "پک اپ",
    drop: "ڈراپ",
    pickupPlaceholder: "پک اپ مقام",
    dropPlaceholder: "ڈراپ مقام",
    budget: "بجٹ",
    fixedBudget: "💰 مقررہ بجٹ",
    openOffers: "🤝 آفرز قبول ہیں",
    sendRequest: "قریبی کارکنوں کو درخواست بھیجیں",
    posting: "پوسٹ ہو رہا ہے...",
    cancelRequest: "درخواست منسوخ کریں",
    searching: "قریبی کارکن تلاش ہو رہے ہیں...",
    elapsed: "گزر گئے",
    waitingWorkers: "کارکنوں کے جواب کا انتظار ہے...",
    waitingWorkersDesc: "قریبی کارکن آپ کی درخواست دیکھیں گے اور قبول کر سکتے ہیں",
    workersReady: "کارکن تیار ہیں",
    counterOffers: "💬 جوابی پیشکشیں",
    confirmedTitle: "کارکن کی تصدیق! 🎉",
    confirmedSub: "آپ کا کارکن آ رہا ہے",
    postAnother: "ایک اور درخواست دیں",
    agreedPrice: "طے شدہ قیمت",
    eta: "وقت",
    etaValue: "~15 منٹ",
    phone: "فون",
    status: "حالت",
    enRoute: "راستے میں",
    yourOffer: "آپ کی پیشکش",
    confirmWorker: "کارکن کی تصدیق کریں",
    accept: "قبول کریں",
    counter: "جوابی پیشکش",
    send: "بھیجیں",
    above: "آپ کی پیشکش سے زیادہ",
    below: "آپ کی پیشکش سے کم",
    counterPricePlaceholder: "جوابی قیمت (روپے)",
    noHistory: "ابھی کوئی تاریخ نہیں",
    noHistorySub: "مکمل نوکریاں یہاں دکھیں گی",
    noRequests: "ابھی کوئی درخواست نہیں",
    noRequestsSub: 'نوکری پوسٹ کرنے کے لیے "کارکن تلاش کریں" استعمال کریں',
    loading: "لوڈ ہو رہا ہے...",
    navFind: "کارکن تلاش",
    navRequests: "میری درخواستیں",
    navHistory: "تاریخ",
    selectCategory: "پہلے قسم منتخب کریں",
    serverError: "سرور سے رابطہ نہیں ہو سکا",
    langBtn: "English",
    jobSiteLocation: "کام کی جگہ",
    acceptedBadge: "✓ درخواست قبول کی",
    readyNow: "ابھی تیار",
    locationFound: "✅ جگہ مل گئی — یا نقشے پر کلک کریں:",
    reliabilityScore: "قابل اعتماد اسکور",
    marketRate: "💡 AI مارکیٹ ریٹ",
    typicalRange: "عام رینج",
    yourOfferLabel: "آپ کی پیشکش",
    offerFair: "✅ مناسب قیمت — کارکن قبول کریں گے",
    offerLow: "⚠️ کم قیمت — زیادہ دیں",
    offerHigh: "ℹ️ زیادہ قیمت — جلدی جواب ملے گا",
    // ── Profile Progress ──
    profileProgress: "پروفائل پروگریس",
    profileComplete: "پروفائل مکمل! 🎉",
    completeYourProfile: "بہتر کارکن پانے کے لیے پروفائل مکمل کریں",
    stepRegistered: "اکاؤنٹ رجسٹر",
    stepProfilePhoto: "پروفائل فوٹو اپلوڈ",
    stepCnicDocs: "شناختی کارڈ اپلوڈ",
    stepEmailVerified: "ای میل تصدیق",
    stepFirstJob: "پہلی نوکری پوسٹ",
    stepVerified: "ایڈمن سے تصدیق",
    tapToPost: "نوکری پوسٹ کریں →",
  }
};

const S = {
  btn: (bg, color = "#fff", extra = {}) => ({
    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
    padding: "13px 20px", borderRadius: 12, border: "none",
    background: bg, color, fontFamily: "'Outfit', sans-serif",
    fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "opacity 0.2s, transform 0.15s",
    ...extra,
  }),
  card: (extra = {}) => ({
    background: "#fff", borderRadius: 18,
    boxShadow: "0 2px 16px rgba(15,23,42,0.07)", overflow: "hidden", ...extra,
  }),
  label: {
    fontSize: 11.5, fontWeight: 700, color: "#64748b",
    textTransform: "uppercase", letterSpacing: "0.07em", display: "block", marginBottom: 7,
  },
  input: {
    width: "100%", padding: "12px 14px", borderRadius: 10,
    border: "1.5px solid #e2e8f0", fontSize: 14, color: "#0f172a",
    fontFamily: "'Outfit', sans-serif", outline: "none",
    boxSizing: "border-box", background: "#fafbfc", transition: "border-color 0.2s",
  },
};

const CATS = [
  { id: "electrician", label: "Electrician", labelUr: "الیکٹریشن", icon: "⚡" },
  { id: "plumber",    label: "Plumber",     labelUr: "پلمبر",      icon: "🔧" },
  { id: "carpenter",  label: "Carpenter",   labelUr: "بڑھئی",      icon: "🪚" },
  { id: "painter",    label: "Painter",     labelUr: "پینٹر",      icon: "🖌️" },
  { id: "cleaner",    label: "Cleaner",     labelUr: "صفائی",      icon: "🧹" },
  { id: "driver",     label: "Driver",      labelUr: "ڈرائیور",    icon: "🚗" },
  { id: "mason",      label: "Mason",       labelUr: "راج",        icon: "🧱" },
  { id: "welder",     label: "Welder",      labelUr: "ویلڈر",      icon: "🔥" },
];

const BLANK = {
  title: "", description: "", category: "electrician",
  workLocation: "", pickupLocation: "", dropLocation: "",
  budgetType: "fixed", offeredPrice: "", urgency: "flexible",
  lat: null, lng: null,
};

export default function EmployerDashboard() {
  const [lang, setLang] = useState("en");
  const t = LANG[lang];
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("find");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [step, setStep] = useState("form");
  const [jobRequest, setJobRequest] = useState(BLANK);
  const [incomingOffers, setIncomingOffers] = useState([]);
  const [workerAccepts, setWorkerAccepts] = useState([]);
  const [confirmedWorker, setConfirmedWorker] = useState(null);
  const [activeRequestId, setActiveRequestId] = useState(null);
  const [searchTimer, setSearchTimer] = useState(0);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const timerRef = useRef(null);

  // ── Full user profile for progress ──
  const [userProfile, setUserProfile] = useState(null);
  // ── Track if first job has been posted ──
  const [firstJobPosted, setFirstJobPosted] = useState(false);

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) {
      const p = JSON.parse(u);
      setUser(p);
      socket.emit("join", p.id);

      // Fetch full profile
      const token = localStorage.getItem("token");
      if (token) {
        fetch("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` }
        })
          .then(r => r.json())
          .then(data => { if (data.user) setUserProfile(data.user); })
          .catch(() => setUserProfile(p));
      } else {
        setUserProfile(p);
      }

      // Check if any job posted before
      fetch(`http://localhost:5000/api/jobs/employer/${p.id}`)
        .then(r => r.json())
        .then(data => { if (Array.isArray(data) && data.length > 0) setFirstJobPosted(true); })
        .catch(() => {});
    }
  }, []);

  useEffect(() => {
    socket.on("worker_job_accept", (data) => {
      setWorkerAccepts(prev => {
        const exists = prev.find(w => w.workerId === data.workerId);
        return exists ? prev : [...prev, data];
      });
      addNotif(`✅ ${data.workerName} ne request accept ki!`);
    });
    socket.on("worker_offer", data => {
      setIncomingOffers(prev => {
        const ex = prev.find(o => o.workerId === data.workerId);
        return ex ? prev.map(o => o.workerId === data.workerId ? data : o) : [...prev, data];
      });
      addNotif(`${data.workerName} ne Rs. ${data.price} ki offer di`);
    });
    socket.on("worker_accepted", data => { setConfirmedWorker(data); setStep("confirmed"); });
    return () => {
      socket.off("worker_job_accept");
      socket.off("worker_offer");
      socket.off("worker_accepted");
    };
  }, []);

  useEffect(() => {
    if (step === "searching") {
      setSearchTimer(0);
      timerRef.current = setInterval(() => setSearchTimer(t => t + 1), 1000);
    } else clearInterval(timerRef.current);
    return () => clearInterval(timerRef.current);
  }, [step]);

  const addNotif = msg => setNotifications(p => [...p, { id: Date.now(), msg }]);
  const upd = (k, v) => setJobRequest(p => ({ ...p, [k]: v }));

  const handleSendRequest = async e => {
    e.preventDefault();
    if (!user) return;
    setSubmitError(""); setSubmitting(true);
    const payload = {
      ...jobRequest,
      employer: user.id,
      location: jobRequest.workLocation || jobRequest.pickupLocation || "Not specified",
      salary: jobRequest.budgetType === "fixed" && jobRequest.offeredPrice ? `Rs. ${jobRequest.offeredPrice}` : "Negotiable",
      type: "temporary",
      latitude: jobRequest.lat,
      longitude: jobRequest.lng,
    };
    try {
      const res = await fetch("http://localhost:5000/api/jobs", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) { setSubmitError(data.error || "Failed to post"); setSubmitting(false); return; }
      setActiveRequestId(data._id);
      setFirstJobPosted(true); // ← mark first job posted
      try {
        await fetch("http://localhost:5000/api/job-requests", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...jobRequest, employerId: user.id }),
        });
      } catch (_) {}
      socket.emit("new_job_request", {
        requestId: data._id, employerId: user.id,
        employerName: user.name, ...jobRequest,
        lat: jobRequest.lat, lng: jobRequest.lng,
      });
      setStep("searching");
    } catch (_) {
      const fakeId = "demo_" + Date.now();
      setActiveRequestId(fakeId);
      setFirstJobPosted(true);
      socket.emit("new_job_request", {
        requestId: fakeId, employerId: user?.id,
        employerName: user?.name, ...jobRequest,
        lat: jobRequest.lat, lng: jobRequest.lng,
      });
      setStep("searching");
    }
    setSubmitting(false);
  };

  const handleConfirmWorker = (worker) => {
    try {
      fetch(`http://localhost:5000/api/job-requests/${activeRequestId}/accept`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workerId: worker.workerId, finalPrice: jobRequest.offeredPrice }),
      });
    } catch (_) {}
    socket.emit("employer_confirm_worker", {
      requestId: activeRequestId, workerId: worker.workerId,
      employerName: user.name, finalPrice: jobRequest.offeredPrice,
    });
    setConfirmedWorker({ ...worker, price: jobRequest.offeredPrice });
    setStep("confirmed");
  };

  const handleDismissWorker = (worker) => {
    socket.emit("employer_dismiss_worker", { requestId: activeRequestId, workerId: worker.workerId });
    setWorkerAccepts(prev => prev.filter(w => w.workerId !== worker.workerId));
  };

  const handleAcceptOffer = async offer => {
    try {
      await fetch(`http://localhost:5000/api/job-requests/${activeRequestId}/accept`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workerId: offer.workerId, finalPrice: offer.price }),
      });
    } catch (_) {}
    socket.emit("employer_accepted", { requestId: activeRequestId, workerId: offer.workerId, employerName: user.name });
    setConfirmedWorker(offer); setStep("confirmed");
  };

  const handleRejectOffer = wid => {
    setIncomingOffers(p => p.filter(o => o.workerId !== wid));
    socket.emit("employer_rejected", { requestId: activeRequestId, workerId: wid });
  };

  const handleCounterOffer = (offer, price) =>
    socket.emit("employer_counter", { requestId: activeRequestId, workerId: offer.workerId, price, employerName: user.name });

  const resetFlow = () => {
    setStep("form"); setJobRequest(BLANK); setIncomingOffers([]);
    setWorkerAccepts([]); setConfirmedWorker(null); setActiveRequestId(null);
  };

  if (!user) return <Loader t={t} />;

  const NAV = [
    { id: "find",     icon: Search,    label: t.navFind },
    { id: "requests", icon: Briefcase, label: t.navRequests },
    { id: "history",  icon: Clock,     label: t.navHistory },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Noto+Nastaliq+Urdu:wght@400;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Outfit',sans-serif}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes ping{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.25;transform:scale(1.65)}}
        @keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideIn{from{opacity:0;transform:translateX(30px)}to{opacity:1;transform:translateX(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}
        @keyframes glow{0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,0.4)}50%{box-shadow:0 0 0 12px rgba(34,197,94,0)}}
        @keyframes scoreLoad{from{width:0}to{width:var(--w)}}
        @keyframes priceFadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
        @keyframes progressFill{from{width:0}to{width:var(--w)}}
        .inp:focus{border-color:#3b82f6!important;background:#fff!important;box-shadow:0 0 0 3px rgba(59,130,246,.12)}
        .nav-btn:hover{background:rgba(255,255,255,.08)!important}
        .cat-btn:hover{transform:translateY(-2px);border-color:#93c5fd!important}
        .act-btn:hover{opacity:.88;transform:translateY(-1px)}
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:6px}
        @media(max-width:600px){
          .form-4col{grid-template-columns:repeat(2,1fr)!important}
          .form-2col{grid-template-columns:1fr!important}
          .main-pad{padding:14px!important}
        }
      `}</style>

      <div dir={t.dir} style={{ minHeight: "100vh", display: "flex", background: "#f0f4f9", fontFamily: lang === "ur" ? "'Noto Nastaliq Urdu', serif" : "'Outfit', sans-serif" }}>
        {sidebarOpen && (
          <div onClick={() => setSidebarOpen(false)}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.45)", zIndex: 99 }} />
        )}

        <aside style={{
          width: sidebarOpen ? 230 : 64,
          background: "linear-gradient(160deg,#0b1526 0%,#162644 65%,#1a3255 100%)",
          color: "#fff", display: "flex", flexDirection: "column",
          transition: "width .28s cubic-bezier(.4,0,.2,1)", flexShrink: 0,
          position: "relative", zIndex: 100,
          boxShadow: "3px 0 18px rgba(0,0,0,.18)",
        }}>
          <div style={{ padding: "20px 14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
            {sidebarOpen && (
              <div style={{ animation: "fadeIn .25s" }}>
                <div style={{ fontSize: 18, fontWeight: 900, letterSpacing: "-.4px", background: "linear-gradient(90deg,#60a5fa,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>RozgarHub</div>
                <div style={{ fontSize: 9.5, opacity: .4, letterSpacing: ".12em", marginTop: 1 }}>EMPLOYER</div>
              </div>
            )}
            <button onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{ background: "rgba(255,255,255,.08)", border: "none", color: "#94a3b8", padding: 7, borderRadius: 8, cursor: "pointer", flexShrink: 0 }}>
              {sidebarOpen ? <X size={14} /> : <Menu size={14} />}
            </button>
          </div>
          <nav style={{ flex: 1, padding: "12px 9px", display: "flex", flexDirection: "column", gap: 3 }}>
            {NAV.map(item => (
              <button key={item.id} className="nav-btn"
                onClick={() => { setActiveTab(item.id); if (window.innerWidth < 768) setSidebarOpen(false); }}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: sidebarOpen ? "11px 12px" : "11px",
                  borderRadius: 10, border: "none", cursor: "pointer",
                  justifyContent: sidebarOpen ? (t.dir === "rtl" ? "flex-end" : "flex-start") : "center",
                  background: activeTab === item.id ? "rgba(59,130,246,.22)" : "transparent",
                  color: activeTab === item.id ? "#93c5fd" : "rgba(255,255,255,.5)",
                  fontWeight: activeTab === item.id ? 700 : 500, fontSize: 13.5,
                  fontFamily: lang === "ur" ? "'Noto Nastaliq Urdu', serif" : "'Outfit', sans-serif",
                  transition: "all .18s",
                  flexDirection: t.dir === "rtl" ? "row-reverse" : "row",
                }}>
                <item.icon size={16} />
                {sidebarOpen && <span style={{ animation: "fadeIn .2s" }}>{item.label}</span>}
              </button>
            ))}
          </nav>
          <div style={{ padding: "10px 9px", borderTop: "1px solid rgba(255,255,255,.08)" }}>
            {sidebarOpen && (
              <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "9px 11px", marginBottom: 6, borderRadius: 10, background: "rgba(255,255,255,.05)", animation: "fadeIn .25s", flexDirection: t.dir === "rtl" ? "row-reverse" : "row" }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#3b82f6,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, flexShrink: 0 }}>
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div style={{ overflow: "hidden", textAlign: t.dir === "rtl" ? "right" : "left" }}>
                  <div style={{ fontSize: 12.5, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user.name}</div>
                  <div style={{ fontSize: 11, opacity: .4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user.email}</div>
                </div>
              </div>
            )}
            <button onClick={() => { localStorage.removeItem("user"); window.location.href = "/login"; }}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px", borderRadius: 10, border: "none", cursor: "pointer", width: "100%", background: "rgba(239,68,68,.12)", color: "#f87171", fontSize: 13, fontFamily: lang === "ur" ? "'Noto Nastaliq Urdu', serif" : "'Outfit', sans-serif", justifyContent: sidebarOpen ? (t.dir === "rtl" ? "flex-end" : "flex-start") : "center", flexDirection: t.dir === "rtl" ? "row-reverse" : "row" }}>
              <LogOut size={15} />
              {sidebarOpen && <span>{t.logout}</span>}
            </button>
          </div>
        </aside>

        <main style={{ flex: 1, overflow: "auto", minWidth: 0 }}>
          <header style={{ background: "#fff", borderBottom: "1px solid #e8edf3", padding: "16px 26px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50, boxShadow: "0 1px 4px rgba(0,0,0,.04)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button onClick={() => setSidebarOpen(true)}
                style={{ background: "#f1f5f9", border: "none", borderRadius: 9, padding: 8, cursor: "pointer" }}>
                <Menu size={17} color="#475569" />
              </button>
              <div style={{ textAlign: t.dir === "rtl" ? "right" : "left" }}>
                <h1 style={{ fontSize: 19, fontWeight: 800, color: "#0f172a", margin: 0 }}>
                  {activeTab === "find" ? t.findWorker : activeTab === "requests" ? t.myRequests : t.history}
                </h1>
                <p style={{ fontSize: 11.5, color: "#94a3b8", margin: "2px 0 0" }}>{t.welcomeBack}, {user.name}</p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <button onClick={() => setLang(l => l === "en" ? "ur" : "en")}
                style={{ padding: "7px 14px", borderRadius: 9, border: "2px solid #3b82f6", background: "#eff6ff", color: "#3b82f6", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: lang === "en" ? "'Noto Nastaliq Urdu', serif" : "'Outfit', sans-serif" }}>
                {t.langBtn}
              </button>
              <div style={{ position: "relative", cursor: "pointer" }} onClick={() => setNotifications([])}>
                <div style={{ background: "#f1f5f9", padding: 8, borderRadius: 10 }}>
                  <Bell size={17} color={notifications.length ? "#3b82f6" : "#94a3b8"} />
                </div>
                {notifications.length > 0 && (
                  <div style={{ position: "absolute", top: -3, right: -3, width: 14, height: 14, background: "#ef4444", borderRadius: "50%", fontSize: 8.5, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800 }}>
                    {notifications.length}
                  </div>
                )}
              </div>
            </div>
          </header>

          <div className="main-pad" style={{ padding: "24px 26px" }}>
            {activeTab === "find" && (
              <FindWorkerFlow
                t={t} lang={lang}
                step={step} jobRequest={jobRequest} upd={upd}
                onSubmit={handleSendRequest}
                workerAccepts={workerAccepts}
                incomingOffers={incomingOffers}
                confirmedWorker={confirmedWorker}
                onConfirmWorker={handleConfirmWorker}
                onDismissWorker={handleDismissWorker}
                onAcceptOffer={handleAcceptOffer}
                onRejectOffer={handleRejectOffer}
                onCounterOffer={handleCounterOffer}
                onReset={resetFlow}
                searchTimer={searchTimer}
                submitError={submitError}
                submitting={submitting}
              />
            )}
            {activeTab === "requests" && (
              <RequestsTab
                userId={user.id} t={t}
                userProfile={userProfile}
                firstJobPosted={firstJobPosted}
                onGoPostJob={() => setActiveTab("find")}
              />
            )}
            {activeTab === "history" && <EmptyState icon="🕐" title={t.noHistory} sub={t.noHistorySub} />}
          </div>
        </main>
      </div>
    </>
  );
}

/* ═══════════════ EMPLOYER PROFILE PROGRESS ═══════════════ */
function EmployerProfileProgress({ t, userProfile, firstJobPosted, onGoPostJob }) {
  if (!userProfile) return null;

  const steps = [
    {
      key: "registered",
      label: t.stepRegistered,
      done: true,
      points: 20,
      action: null,
    },
    {
      key: "profilePhoto",
      label: t.stepProfilePhoto,
      done: !!(userProfile.documents?.profilePhoto),
      points: 15,
      action: null,
    },
    {
      key: "cnicDocs",
      label: t.stepCnicDocs,
      done: !!(userProfile.documents?.cnicFront && userProfile.documents?.cnicBack),
      points: 20,
      action: null,
    },
    {
      key: "emailVerified",
      label: t.stepEmailVerified,
      done: !!(userProfile.isEmailVerified),
      points: 15,
      action: null,
    },
    {
      key: "firstJob",
      label: t.stepFirstJob,
      done: firstJobPosted,
      points: 15,
      action: onGoPostJob,
    },
    {
      key: "verified",
      label: t.stepVerified,
      done: !!(userProfile.isVerified),
      points: 15,
      action: null,
    },
  ];

  const totalPoints  = steps.reduce((sum, s) => sum + s.points, 0);
  const earnedPoints = steps.filter(s => s.done).reduce((sum, s) => sum + s.points, 0);
  const percentage   = Math.round((earnedPoints / totalPoints) * 100);
  const isComplete   = percentage === 100;
  const barColor     = percentage >= 80 ? "#3b82f6" : percentage >= 50 ? "#6366f1" : "#f59e0b";

  return (
    <div style={{
      background: "#fff", borderRadius: 20, padding: 24,
      boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
      marginBottom: 20,
      border: isComplete ? "2px solid #3b82f6" : "1.5px solid #e2e8f0",
      animation: "slideUp .4s ease-out",
    }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: "#0f172a", margin: 0 }}>
            {isComplete ? t.profileComplete : t.profileProgress}
          </h3>
          {!isComplete && (
            <p style={{ fontSize: 12, color: "#64748b", margin: "3px 0 0" }}>{t.completeYourProfile}</p>
          )}
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 26, fontWeight: 900, color: barColor, lineHeight: 1 }}>{percentage}%</div>
          <div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 600 }}>{earnedPoints}/{totalPoints} pts</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ background: "#e2e8f0", borderRadius: 99, height: 10, overflow: "hidden", marginBottom: 18 }}>
        <div style={{
          height: "100%", borderRadius: 99,
          background: isComplete
            ? "linear-gradient(90deg, #3b82f6, #2563eb)"
            : `linear-gradient(90deg, ${barColor}, ${barColor}cc)`,
          width: `${percentage}%`,
          transition: "width 1s ease-out",
        }} />
      </div>

      {/* Steps */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {steps.map(step => (
          <div key={step.key} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "10px 14px", borderRadius: 12,
            background: step.done ? "#eff6ff" : "#f8fafc",
            border: `1.5px solid ${step.done ? "#bfdbfe" : "#e2e8f0"}`,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: step.done ? "#3b82f6" : "#e2e8f0",
                fontSize: 13, color: step.done ? "#fff" : "#94a3b8",
                fontWeight: 800,
              }}>
                {step.done ? "✓" : "○"}
              </div>
              <span style={{
                fontSize: 13, fontWeight: step.done ? 600 : 500,
                color: step.done ? "#1d4ed8" : "#475569",
              }}>
                {step.label}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{
                fontSize: 11, fontWeight: 700,
                color: step.done ? "#2563eb" : "#94a3b8",
                background: step.done ? "#dbeafe" : "#f1f5f9",
                padding: "2px 8px", borderRadius: 20,
              }}>
                +{step.points} pts
              </span>
              {!step.done && step.action && (
                <button
                  onClick={step.action}
                  style={{
                    fontSize: 11, fontWeight: 700, color: "#3b82f6",
                    background: "#eff6ff", border: "none", borderRadius: 20,
                    padding: "3px 10px", cursor: "pointer",
                  }}>
                  {t.tapToPost}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════ REQUESTS TAB — updated with Progress ═══════════════ */
function RequestsTab({ userId, t, userProfile, firstJobPosted, onGoPostJob }) {
  const [items, setItems]     = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`http://localhost:5000/api/jobs/employer/${userId}`).then(r => r.json()).catch(() => []),
      fetch(`http://localhost:5000/api/job-requests/employer/${userId}`).then(r => r.json()).catch(() => []),
    ]).then(([jobs, requests]) => {
      const all = [...(Array.isArray(jobs) ? jobs : []), ...(Array.isArray(requests) ? requests : [])];
      setItems(all); setLoading(false);
    });
  }, [userId]);

  if (loading) return <div style={{ textAlign: "center", padding: 48, color: "#94a3b8", fontSize: 14 }}>{t.loading}</div>;

  return (
    <div style={{ maxWidth: 680, margin: "0 auto" }}>

      {/* ── Employer Profile Progress ── */}
      <EmployerProfileProgress
        t={t}
        userProfile={userProfile}
        firstJobPosted={firstJobPosted}
        onGoPostJob={onGoPostJob}
      />

      {/* ── Job List ── */}
      {items.length === 0 ? (
        <EmptyState icon="📋" title={t.noRequests} sub={t.noRequestsSub} />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
          {items.map(item => (
            <div key={item._id} style={{ ...S.card(), padding: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 3 }}>{item.title}</div>
                  <div style={{ fontSize: 12, color: "#64748b" }}>{item.location || item.workLocation} · {item.type || item.category}</div>
                  {item.salary && <div style={{ fontSize: 13, fontWeight: 600, color: "#3b82f6", marginTop: 4 }}>{item.salary}</div>}
                </div>
                <StatusBadge status={item.status || "pending"} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════ AI PRICING SUGGESTION ═══════════════ */
function PricingSuggestion({ category, location, offeredPrice, lang, t }) {
  const [suggestion, setSuggestion] = useState(null);
  const [loading, setLoading]       = useState(false);
  const debounceRef                 = useRef(null);

  useEffect(() => {
    if (!category || !offeredPrice || String(offeredPrice).length < 3) { setSuggestion(null); return; }
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/ai/price-suggestion", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ category, location, offeredPrice, lang }),
        });
        const data = await res.json();
        if (data.minRate) setSuggestion(data);
      } catch (_) {}
      setLoading(false);
    }, 800);
    return () => clearTimeout(debounceRef.current);
  }, [category, location, offeredPrice, lang]);

  if (!offeredPrice || String(offeredPrice).length < 3) return null;
  if (loading) return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: "#f8fafc", borderRadius: 10, marginTop: 10 }}>
      <div style={{ width: 13, height: 13, border: "2px solid #6366f1", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite", flexShrink: 0 }} />
      <span style={{ fontSize: 12, color: "#94a3b8" }}>Checking market rates...</span>
    </div>
  );
  if (!suggestion) return null;

  const assessmentConfig = {
    fair:          { color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0", msg: t.offerFair },
    low:           { color: "#d97706", bg: "#fffbeb", border: "#fde68a", msg: t.offerLow },
    high:          { color: "#2563eb", bg: "#eff6ff", border: "#bfdbfe", msg: t.offerHigh },
    not_specified: { color: "#6366f1", bg: "#f5f3ff", border: "#ddd6fe", msg: "" },
  };
  const cfg = assessmentConfig[suggestion.assessment] || assessmentConfig.not_specified;

  return (
    <div style={{ marginTop: 10, borderRadius: 12, padding: "14px 16px", background: cfg.bg, border: `1.5px solid ${cfg.border}`, animation: "priceFadeIn .4s ease-out" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontSize: 12, fontWeight: 800, color: cfg.color }}>{t.marketRate}</span>
        <span style={{ fontSize: 11, color: "#64748b", fontWeight: 600 }}>{suggestion.unit === "per day" ? "/day" : `/${suggestion.unit}`}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <span style={{ fontSize: 11, color: "#64748b", whiteSpace: "nowrap" }}>{t.typicalRange}:</span>
        <div style={{ flex: 1, background: "#e2e8f0", borderRadius: 99, height: 6 }}>
          <div style={{ height: "100%", borderRadius: 99, background: `linear-gradient(90deg, ${cfg.color}55, ${cfg.color})`, width: "100%" }} />
        </div>
        <span style={{ fontSize: 12, fontWeight: 800, color: "#0f172a", whiteSpace: "nowrap" }}>Rs. {suggestion.minRate.toLocaleString()} – {suggestion.maxRate.toLocaleString()}</span>
      </div>
      {cfg.msg && <p style={{ fontSize: 12, color: cfg.color, fontWeight: 600, margin: "0 0 6px" }}>{cfg.msg}</p>}
      {suggestion.tipEn && <p style={{ fontSize: 11.5, color: "#64748b", margin: 0, fontStyle: "italic" }}>"{lang === "ur" ? suggestion.tipUr : suggestion.tipEn}"</p>}
    </div>
  );
}

/* ═══════════════ FIND WORKER FLOW ═══════════════ */
function FindWorkerFlow({ t, lang, step, jobRequest, upd, onSubmit, workerAccepts, incomingOffers, confirmedWorker, onConfirmWorker, onDismissWorker, onAcceptOffer, onRejectOffer, onCounterOffer, onReset, searchTimer, submitError, submitting }) {
  const [counterPrices, setCounterPrices] = useState({});
  const [generating, setGenerating]       = useState(false);
  const [geocoding, setGeocoding]         = useState(false);
  const [parsing, setParsing]             = useState(false);

  const generateDescription = async () => {
    if (!jobRequest.category) { alert(t.selectCategory); return; }
    setGenerating(true);
    try {
      const response = await fetch("http://localhost:5000/api/ai/generate-description", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: jobRequest.category, title: jobRequest.title, location: jobRequest.workLocation, budget: jobRequest.offeredPrice, lang })
      });
      const data = await response.json();
      if (data.description) upd("description", data.description);
      else alert(data.error || "Something went wrong");
    } catch (e) { alert(t.serverError); }
    setGenerating(false);
  };

  const parseJobDescription = async (text) => {
    if (!text || text.length < 10) return;
    setParsing(true);
    try {
      const response = await fetch("http://localhost:5000/api/ai/parse-job", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: text })
      });
      const data = await response.json();
      if (data.skills)          upd("skills", Array.isArray(data.skills) ? data.skills.join(", ") : data.skills);
      if (data.urgency)         upd("urgency", data.urgency === "high" ? "1_hour" : data.urgency === "medium" ? "today" : "flexible");
      if (data.budget_estimate) upd("offeredPrice", data.budget_estimate.replace(/[^0-9]/g, "").slice(0, 6));
      if (data.category) {
        const match = CATS.find(c => c.label.toLowerCase() === data.category.toLowerCase());
        if (match) upd("category", match.id);
      }
      if (data.location && data.location.trim() !== "") {
        upd("workLocation", data.location);
        geocodeAddress(data.location);
      }
    } catch (e) { console.error("Auto-fill failed", e); }
    setParsing(false);
  };

  const geocodeAddress = async (address) => {
    if (!address || address.length < 2) return;
    setGeocoding(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`, { headers: { "Accept-Language": "en" } });
      const data = await res.json();
      if (data && data[0]) { upd("lat", parseFloat(data[0].lat)); upd("lng", parseFloat(data[0].lon)); }
    } catch (_) {}
    setGeocoding(false);
  };

  if (step === "confirmed" && confirmedWorker) return (
    <div style={{ maxWidth: 500, margin: "0 auto", animation: "slideUp .5s" }}>
      <div style={{ ...S.card(), padding: 40, textAlign: "center", border: "2px solid #22c55e" }}>
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg,#22c55e,#16a34a)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px", fontSize: 30, animation: "pulse 2s infinite" }}>✓</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", marginBottom: 5 }}>{t.confirmedTitle}</h2>
        <p style={{ color: "#64748b", fontSize: 13.5, marginBottom: 22 }}>{t.confirmedSub}</p>
        <div style={{ background: "#f8fafc", borderRadius: 13, padding: 18, marginBottom: 22, textAlign: t.dir === "rtl" ? "right" : "left" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, flexDirection: t.dir === "rtl" ? "row-reverse" : "row" }}>
            <div style={{ width: 46, height: 46, borderRadius: "50%", background: "linear-gradient(135deg,#3b82f6,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 800, color: "#fff" }}>
              {(confirmedWorker.workerName || confirmedWorker.name)?.charAt(0)}
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700 }}>{confirmedWorker.workerName || confirmedWorker.name}</div>
              <div style={{ fontSize: 12, color: "#64748b" }}>⭐ {confirmedWorker.workerRating || "4.8"}</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}>
            <MiniCard icon="💰" label={t.agreedPrice} value={confirmedWorker.price ? `Rs. ${confirmedWorker.price}` : "As agreed"} />
            <MiniCard icon="⏱️" label={t.eta} value={t.etaValue} />
            <MiniCard icon="📞" label={t.phone} value={confirmedWorker.workerPhone || "---"} />
            <MiniCard icon="✅" label={t.status} value={t.enRoute} accent="#16a34a" />
          </div>
        </div>
        {jobRequest.lat && jobRequest.lng && (
          <div style={{ marginBottom: 20 }}>
            <JobMap lat={jobRequest.lat} lng={jobRequest.lng} height={200} label={t.jobSiteLocation} />
          </div>
        )}
        <button className="act-btn" onClick={onReset} style={S.btn("linear-gradient(135deg,#3b82f6,#2563eb)", "#fff", { padding: "13px 28px", fontFamily: lang === "ur" ? "'Noto Nastaliq Urdu', serif" : "'Outfit', sans-serif" })}>
          {t.postAnother}
        </button>
      </div>
    </div>
  );

  if (step === "searching") return (
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      <div style={{ ...S.card(), padding: "30px 24px", marginBottom: 18, textAlign: "center", animation: "slideUp .4s" }}>
        <div style={{ position: "relative", width: 84, height: 84, margin: "0 auto 16px" }}>
          {[0, 10, 20].map(i => (
            <div key={i} style={{ position: "absolute", inset: i, borderRadius: "50%", border: `2.5px solid rgba(59,130,246,${.5 - i * .015})`, animation: `ping 2s ease-out ${i * .3}s infinite` }} />
          ))}
          <div style={{ position: "absolute", inset: 20, borderRadius: "50%", background: "linear-gradient(135deg,#3b82f6,#2563eb)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>📍</div>
        </div>
        <h2 style={{ fontSize: 19, fontWeight: 800, color: "#0f172a", marginBottom: 5 }}>{t.searching}</h2>
        <p style={{ color: "#94a3b8", fontSize: 13, marginBottom: 16 }}>{Math.floor(searchTimer / 60)}:{String(searchTimer % 60).padStart(2, "0")} {t.elapsed}</p>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
          <Chip color="#3b82f6">📍 {jobRequest.workLocation || "Your area"}</Chip>
          <Chip color="#22c55e">💰 {jobRequest.budgetType === "open" ? t.openOffers : `Rs. ${jobRequest.offeredPrice}`}</Chip>
          <Chip color="#f59e0b">{CATS.find(c => c.id === jobRequest.category)?.icon}{" "}{lang === "ur" ? CATS.find(c => c.id === jobRequest.category)?.labelUr : CATS.find(c => c.id === jobRequest.category)?.label}</Chip>
        </div>
      </div>

      {workerAccepts.length > 0 && (
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 14.5, fontWeight: 800, color: "#0f172a", marginBottom: 12, display: "flex", alignItems: "center", gap: 8, flexDirection: t.dir === "rtl" ? "row-reverse" : "row" }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e", animation: "glow 2s infinite" }} />
            {t.workersReady}
            <span style={{ background: "#dcfce7", color: "#16a34a", padding: "2px 10px", borderRadius: 20, fontSize: 12 }}>{workerAccepts.length}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {workerAccepts.map(worker => (
              <WorkerAcceptCard key={worker.workerId} t={t} lang={lang} worker={worker} offeredPrice={jobRequest.offeredPrice}
                onConfirm={() => onConfirmWorker(worker)} onDismiss={() => onDismissWorker(worker)} />
            ))}
          </div>
        </div>
      )}

      {incomingOffers.length > 0 && (
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 14.5, fontWeight: 700, color: "#0f172a", marginBottom: 12, display: "flex", alignItems: "center", gap: 8, flexDirection: t.dir === "rtl" ? "row-reverse" : "row" }}>
            {t.counterOffers}
            <span style={{ background: "#eff6ff", color: "#3b82f6", padding: "2px 10px", borderRadius: 20, fontSize: 12 }}>{incomingOffers.length}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {incomingOffers.map(offer => (
              <OfferCard key={offer.workerId} t={t} lang={lang} offer={offer} originalPrice={jobRequest.offeredPrice}
                counterPrice={counterPrices[offer.workerId] || ""}
                onCounterChange={v => setCounterPrices(p => ({ ...p, [offer.workerId]: v }))}
                onAccept={() => onAcceptOffer(offer)}
                onReject={() => onRejectOffer(offer.workerId)}
                onCounter={() => onCounterOffer(offer, counterPrices[offer.workerId])} />
            ))}
          </div>
        </div>
      )}

      {workerAccepts.length === 0 && incomingOffers.length === 0 && (
        <div style={{ ...S.card(), padding: 28, textAlign: "center" }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>⏳</div>
          <p style={{ color: "#475569", fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{t.waitingWorkers}</p>
          <p style={{ color: "#94a3b8", fontSize: 12.5 }}>{t.waitingWorkersDesc}</p>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <button className="act-btn" onClick={onReset} style={{ ...S.btn("#fef2f2", "#ef4444"), border: "1.5px solid #fecaca", fontFamily: lang === "ur" ? "'Noto Nastaliq Urdu', serif" : "'Outfit', sans-serif" }}>
          {t.cancelRequest}
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", animation: "slideUp .4s" }}>
      <div style={S.card()}>
        <div style={{ background: "linear-gradient(135deg,#0b1526,#1a3255)", padding: "24px 26px" }}>
          <h2 style={{ color: "#fff", fontSize: 19, fontWeight: 800, margin: "0 0 4px" }}>{t.postJob}</h2>
          <p style={{ color: "rgba(255,255,255,.4)", fontSize: 12.5 }}>{t.postJobSub}</p>
        </div>
        <form onSubmit={onSubmit} style={{ padding: "26px 26px 30px" }}>
          {submitError && (
            <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "11px 15px", marginBottom: 18, display: "flex", alignItems: "center", gap: 8, color: "#dc2626", fontSize: 13 }}>
              <AlertCircle size={15} /> {submitError}
            </div>
          )}
          <div style={{ marginBottom: 24 }}>
            <label style={S.label}>{t.category}</label>
            <div className="form-4col" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginTop: 8 }}>
              {CATS.map(cat => (
                <button key={cat.id} type="button" className="cat-btn"
                  onClick={() => upd("category", cat.id)}
                  style={{ padding: "11px 6px", borderRadius: 11, border: `2px solid ${jobRequest.category === cat.id ? "#3b82f6" : "#e2e8f0"}`, background: jobRequest.category === cat.id ? "#eff6ff" : "#fafbfc", cursor: "pointer", textAlign: "center", transition: "all .18s" }}>
                  <div style={{ fontSize: 18, marginBottom: 2 }}>{cat.icon}</div>
                  <div style={{ fontSize: 10.5, fontWeight: 700, color: jobRequest.category === cat.id ? "#3b82f6" : "#64748b", fontFamily: lang === "ur" ? "'Noto Nastaliq Urdu', serif" : "'Outfit', sans-serif" }}>
                    {lang === "ur" ? cat.labelUr : cat.label}
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className="form-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
            <div>
              <label style={S.label}>{t.jobTitle}</label>
              <input className="inp" required value={jobRequest.title} onChange={e => upd("title", e.target.value)} placeholder={t.jobTitlePlaceholder} style={S.input} />
            </div>
            <div>
              <label style={S.label}>{t.urgency}</label>
              <select value={jobRequest.urgency} onChange={e => upd("urgency", e.target.value)} style={{ ...S.input, cursor: "pointer" }}>
                <option value="1_hour">{t.urgent1h}</option>
                <option value="today">{t.urgentToday}</option>
                <option value="this_week">{t.urgentWeek}</option>
                <option value="flexible">{t.urgentFlex}</option>
              </select>
            </div>
          </div>
          <div style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 7 }}>
              <label style={{ ...S.label, marginBottom: 0 }}>
                {t.description}
                {parsing && <span style={{ marginLeft: 8, fontSize: 10.5, color: "#6366f1", fontWeight: 600 }}>✨ Auto-filling...</span>}
              </label>
              <button type="button" onClick={generateDescription} disabled={generating}
                style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 13px", borderRadius: 8, border: "none", background: generating ? "#e2e8f0" : "linear-gradient(135deg, #6366f1, #8b5cf6)", color: generating ? "#94a3b8" : "#fff", fontSize: 11.5, fontWeight: 700, cursor: generating ? "not-allowed" : "pointer", fontFamily: lang === "ur" ? "'Noto Nastaliq Urdu', serif" : "'Outfit', sans-serif" }}>
                {generating ? t.generating : t.generateAI}
              </button>
            </div>
            <textarea className="inp" required value={jobRequest.description} onChange={e => upd("description", e.target.value)} onBlur={e => parseJobDescription(e.target.value)} placeholder={t.descPlaceholder} rows={3} style={{ ...S.input, resize: "vertical" }} />
          </div>
          <div style={{ background: "#f8fafc", borderRadius: 13, padding: 16, marginBottom: 18, border: "1.5px solid #e8edf3" }}>
            <label style={{ ...S.label, marginBottom: 10 }}>{t.location}</label>
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              <input className="inp" required value={jobRequest.workLocation}
                onChange={e => { upd("workLocation", e.target.value); upd("lat", null); upd("lng", null); }}
                onBlur={e => { if (e.target.value) geocodeAddress(e.target.value); }}
                placeholder={t.locationPlaceholder} style={{ ...S.input, background: "#fff", flex: 1 }} />
              <button type="button" onClick={() => geocodeAddress(jobRequest.workLocation)} disabled={geocoding || !jobRequest.workLocation}
                style={{ padding: "0 14px", borderRadius: 10, border: "none", flexShrink: 0, background: geocoding ? "#e2e8f0" : "#3b82f6", color: geocoding ? "#94a3b8" : "#fff", fontWeight: 700, fontSize: 12, cursor: "pointer", whiteSpace: "nowrap" }}>
                {geocoding ? "..." : "📍 Find"}
              </button>
            </div>
            <p style={{ fontSize: 11.5, color: "#64748b", marginBottom: 8, fontWeight: 600 }}>{jobRequest.lat ? t.locationFound : t.pinHint}</p>
            <JobMap lat={jobRequest.lat} lng={jobRequest.lng} height={220} label={jobRequest.lat ? "✓ Job location pinned" : "Click map to pin location"} onLocationSelect={({ lat, lng }) => { upd("lat", lat); upd("lng", lng); }} />
            {jobRequest.lat && <p style={{ fontSize: 11.5, color: "#16a34a", marginTop: 8, fontWeight: 600 }}>{t.pinned} {jobRequest.lat.toFixed(4)}, {jobRequest.lng.toFixed(4)}</p>}
            {jobRequest.category === "driver" && (
              <div className="form-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
                <div>
                  <label style={{ ...S.label, marginBottom: 5 }}>{t.pickup}</label>
                  <input className="inp" value={jobRequest.pickupLocation} onChange={e => upd("pickupLocation", e.target.value)} placeholder={t.pickupPlaceholder} style={{ ...S.input, background: "#fff" }} />
                </div>
                <div>
                  <label style={{ ...S.label, marginBottom: 5 }}>{t.drop}</label>
                  <input className="inp" value={jobRequest.dropLocation} onChange={e => upd("dropLocation", e.target.value)} placeholder={t.dropPlaceholder} style={{ ...S.input, background: "#fff" }} />
                </div>
              </div>
            )}
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={S.label}>{t.budget}</label>
            <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
              {["fixed", "open"].map(bt => (
                <button key={bt} type="button" onClick={() => upd("budgetType", bt)} style={{ flex: 1, padding: "12px", borderRadius: 11, border: `2px solid ${jobRequest.budgetType === bt ? "#3b82f6" : "#e2e8f0"}`, background: jobRequest.budgetType === bt ? "#eff6ff" : "#fafbfc", color: jobRequest.budgetType === bt ? "#3b82f6" : "#94a3b8", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: lang === "ur" ? "'Noto Nastaliq Urdu', serif" : "'Outfit', sans-serif", transition: "all .18s" }}>
                  {bt === "fixed" ? t.fixedBudget : t.openOffers}
                </button>
              ))}
            </div>
            {jobRequest.budgetType === "fixed" && (
              <>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "#64748b", fontWeight: 700, fontSize: 14 }}>Rs.</span>
                  <input className="inp" required type="number" value={jobRequest.offeredPrice} onChange={e => upd("offeredPrice", e.target.value)} placeholder="0" style={{ ...S.input, paddingLeft: 46 }} />
                </div>
                <PricingSuggestion category={jobRequest.category} location={jobRequest.workLocation} offeredPrice={jobRequest.offeredPrice} lang={lang} t={t} />
              </>
            )}
          </div>
          <button type="submit" disabled={submitting} className="act-btn" style={{ ...S.btn("linear-gradient(135deg,#3b82f6,#2563eb)", "#fff", { width: "100%", padding: "14px", fontSize: 14.5, borderRadius: 12, boxShadow: "0 6px 18px rgba(59,130,246,.32)", opacity: submitting ? .7 : 1, fontFamily: lang === "ur" ? "'Noto Nastaliq Urdu', serif" : "'Outfit', sans-serif" }) }}>
            <Send size={16} />
            {submitting ? t.posting : t.sendRequest}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ═══════════════ P-WRS BADGE ═══════════════ */
function PWRSBadge({ workerId, workerName, workerRating, lang, t }) {
  const [score, setScore]   = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!workerId) return;
    fetch("http://localhost:5000/api/ai/worker-score", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ workerId, name: workerName || "Worker", category: "general", rating: parseFloat(workerRating) || 4.5, totalJobs: 0, completedJobs: 0, responseTimeMinutes: 10, isVerified: true, profileComplete: true })
    }).then(r => r.json()).then(data => { setScore(data); setLoading(false); }).catch(() => setLoading(false));
  }, [workerId]);
  if (loading) return (
    <div style={{ background: "#f8fafc", borderRadius: 10, padding: "10px 14px", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ width: 14, height: 14, border: "2px solid #6366f1", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
      <span style={{ fontSize: 12, color: "#94a3b8" }}>Calculating reliability score...</span>
    </div>
  );
  if (!score) return null;
  const pct = score.score;
  const barColor = score.color || "#16a34a";
  return (
    <div style={{ background: "#f8fafc", borderRadius: 12, padding: "12px 14px", marginBottom: 14, border: `1.5px solid ${barColor}22` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: ".06em" }}>🤖 {t.reliabilityScore}</span>
        <span style={{ fontSize: 15, fontWeight: 900, color: barColor }}>{pct}/100</span>
      </div>
      <div style={{ background: "#e2e8f0", borderRadius: 99, height: 7, overflow: "hidden", marginBottom: 8 }}>
        <div style={{ height: "100%", borderRadius: 99, background: `linear-gradient(90deg, ${barColor}, ${barColor}cc)`, width: `${pct}%`, animation: "scoreLoad 1s ease-out forwards", "--w": `${pct}%` }} />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: score.explanation ? 6 : 0 }}>
        <span style={{ background: `${barColor}18`, color: barColor, fontSize: 11, fontWeight: 700, padding: "2px 10px", borderRadius: 20 }}>{lang === "ur" ? score.labelUr : score.label}</span>
        {score.breakdown?.verifiedScore > 0 && <span style={{ fontSize: 11, color: "#16a34a", fontWeight: 600 }}>✅ Verified</span>}
      </div>
      {score.explanation && <p style={{ fontSize: 11.5, color: "#64748b", margin: 0, lineHeight: 1.5, fontStyle: "italic" }}>"{score.explanation}"</p>}
    </div>
  );
}

/* ═══════════════ WORKER ACCEPT CARD ═══════════════ */
function WorkerAcceptCard({ t, lang, worker, offeredPrice, onConfirm, onDismiss }) {
  return (
    <div style={{ ...S.card(), padding: 0, border: "2px solid #22c55e", animation: "slideIn .35s cubic-bezier(.4,0,.2,1)", overflow: "visible", position: "relative" }}>
      <div style={{ position: "absolute", top: -10, right: 16, background: "linear-gradient(135deg,#22c55e,#16a34a)", color: "#fff", fontSize: 10.5, fontWeight: 800, padding: "3px 10px", borderRadius: 20, letterSpacing: ".06em", boxShadow: "0 2px 8px rgba(34,197,94,.4)" }}>{t.acceptedBadge}</div>
      <div style={{ padding: "20px 20px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16, flexDirection: t.dir === "rtl" ? "row-reverse" : "row" }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", background: "linear-gradient(135deg,#22c55e,#059669)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 900, color: "#fff", flexShrink: 0, boxShadow: "0 0 0 3px #dcfce7" }}>
            {worker.workerName?.charAt(0).toUpperCase()}
          </div>
          <div style={{ flex: 1, textAlign: t.dir === "rtl" ? "right" : "left" }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#0f172a", marginBottom: 2 }}>{worker.workerName}</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", flexDirection: t.dir === "rtl" ? "row-reverse" : "row" }}>
              <span style={{ fontSize: 12, color: "#f59e0b", fontWeight: 600 }}>⭐ {worker.workerRating || "4.8"}</span>
              {worker.workerExperience && <span style={{ fontSize: 12, color: "#64748b" }}>· {worker.workerExperience} exp</span>}
            </div>
          </div>
          <div style={{ textAlign: t.dir === "rtl" ? "left" : "right" }}>
            <div style={{ fontSize: 11, color: "#64748b", marginBottom: 2 }}>{t.yourOffer}</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: "#0f172a" }}>Rs. {offeredPrice || "—"}</div>
          </div>
        </div>
        <PWRSBadge workerId={worker.workerId} workerName={worker.workerName} workerRating={worker.workerRating} lang={lang} t={t} />
        <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap", flexDirection: t.dir === "rtl" ? "row-reverse" : "row" }}>
          {worker.workerPhone && (
            <div style={{ display: "flex", alignItems: "center", gap: 5, background: "#f1f5f9", borderRadius: 8, padding: "5px 10px" }}>
              <Phone size={12} color="#64748b" />
              <span style={{ fontSize: 12, color: "#475569", fontWeight: 600 }}>{worker.workerPhone}</span>
            </div>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 5, background: "#dcfce7", borderRadius: 8, padding: "5px 10px" }}>
            <Zap size={12} color="#16a34a" />
            <span style={{ fontSize: 12, color: "#16a34a", fontWeight: 700 }}>{t.readyNow}</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="act-btn" onClick={onConfirm} style={{ ...S.btn("linear-gradient(135deg,#22c55e,#16a34a)", "#fff", { flex: 1, padding: "13px", fontSize: 14.5, borderRadius: 12, boxShadow: "0 4px 14px rgba(34,197,94,.3)" }) }}>
            <CheckCircle size={16} /> {t.confirmWorker}
          </button>
          <button className="act-btn" onClick={onDismiss} style={S.btn("#fef2f2", "#ef4444", { padding: "13px 15px", borderRadius: 12, border: "1.5px solid #fecaca" })}>
            <XCircle size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════ OFFER CARD ═══════════════ */
function OfferCard({ t, lang, offer, originalPrice, counterPrice, onCounterChange, onAccept, onReject, onCounter }) {
  const [showCounter, setShowCounter] = useState(false);
  const diff = Number(offer.price) - Number(originalPrice);
  const isHigher = diff > 0;
  return (
    <div style={{ ...S.card(), padding: 20, border: `2px solid ${isHigher ? "#fef3c7" : "#dcfce7"}`, animation: "slideUp .3s" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, flexDirection: t.dir === "rtl" ? "row-reverse" : "row" }}>
        <div style={{ width: 46, height: 46, borderRadius: "50%", background: "linear-gradient(135deg,#8b5cf6,#6d28d9)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, fontWeight: 800, color: "#fff", flexShrink: 0 }}>{offer.workerName?.charAt(0)}</div>
        <div style={{ flex: 1, textAlign: t.dir === "rtl" ? "right" : "left" }}>
          <div style={{ fontSize: 14.5, fontWeight: 700 }}>{offer.workerName}</div>
          <div style={{ fontSize: 12, color: "#64748b" }}>⭐ {offer.rating || "4.7"}</div>
        </div>
        <div style={{ textAlign: t.dir === "rtl" ? "left" : "right" }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: isHigher ? "#f59e0b" : "#16a34a" }}>Rs. {offer.price}</div>
          <div style={{ fontSize: 11, color: isHigher ? "#f59e0b" : "#16a34a" }}>{isHigher ? `+${diff} ${t.above}` : `${Math.abs(diff)} ${t.below}`}</div>
        </div>
      </div>
      <PWRSBadge workerId={offer.workerId} workerName={offer.workerName} workerRating={offer.rating} lang={lang} t={t} />
      {offer.message && <div style={{ background: "#f8fafc", borderRadius: 9, padding: "8px 12px", marginBottom: 12, fontSize: 12.5, color: "#475569", fontStyle: "italic" }}>"{offer.message}"</div>}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button className="act-btn" onClick={onAccept} style={{ ...S.btn("linear-gradient(135deg,#22c55e,#16a34a)", "#fff", { flex: 1, minWidth: 80 }) }}><CheckCircle size={14} /> {t.accept}</button>
        <button className="act-btn" onClick={() => setShowCounter(!showCounter)} style={{ ...S.btn("#f1f5f9", "#475569", { flex: 1, minWidth: 80 }) }}>{t.counter}</button>
        <button className="act-btn" onClick={onReject} style={{ ...S.btn("#fef2f2", "#ef4444", { padding: "13px 15px" }) }}><XCircle size={15} /></button>
      </div>
      {showCounter && (
        <div style={{ display: "flex", gap: 8, marginTop: 11 }}>
          <input type="number" placeholder={t.counterPricePlaceholder} value={counterPrice} onChange={e => onCounterChange(e.target.value)} className="inp" style={{ ...S.input, flex: 1 }} />
          <button className="act-btn" onClick={() => { onCounter(); setShowCounter(false); }} style={S.btn("#3b82f6")}>{t.send}</button>
        </div>
      )}
    </div>
  );
}

/* ═══════════════ HELPERS ═══════════════ */
function MiniCard({ icon, label, value, accent }) {
  return (
    <div style={{ background: "#fff", borderRadius: 10, padding: "10px 12px" }}>
      <div style={{ fontSize: 15, marginBottom: 3 }}>{icon}</div>
      <div style={{ fontSize: 9.5, color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 13, fontWeight: 700, color: accent || "#0f172a" }}>{value}</div>
    </div>
  );
}
function Chip({ color, children }) {
  return <span style={{ background: `${color}18`, color, padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, fontFamily: "'Outfit',sans-serif" }}>{children}</span>;
}
function StatusBadge({ status }) {
  const m = { pending: ["#fef3c7","#d97706"], confirmed: ["#dcfce7","#16a34a"], cancelled: ["#fee2e2","#dc2626"], completed: ["#dbeafe","#2563eb"], negotiating: ["#faf5ff","#7c3aed"] };
  const [bg, color] = m[status] || m.pending;
  return <span style={{ background: bg, color, padding: "4px 11px", borderRadius: 20, fontSize: 11.5, fontWeight: 700, fontFamily: "'Outfit',sans-serif", whiteSpace: "nowrap" }}>{status}</span>;
}
function EmptyState({ icon, title, sub }) {
  return (
    <div style={{ maxWidth: 400, margin: "32px auto", textAlign: "center" }}>
      <div style={{ ...S.card(), padding: 44, color: "#94a3b8" }}>
        <div style={{ fontSize: 38, marginBottom: 12 }}>{icon}</div>
        <p style={{ fontWeight: 700, fontSize: 15, color: "#475569", marginBottom: 5 }}>{title}</p>
        <p style={{ fontSize: 13 }}>{sub}</p>
      </div>
    </div>
  );
}
function Loader({ t }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#0b1526,#1a3255)", fontFamily: "'Outfit',sans-serif" }}>
      <div style={{ textAlign: "center", color: "#fff" }}>
        <div style={{ width: 44, height: 44, border: "4px solid #3b82f6", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 14px" }} />
        <p style={{ opacity: .45, fontSize: 13 }}>{t ? t.loading : "Loading..."}</p>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}