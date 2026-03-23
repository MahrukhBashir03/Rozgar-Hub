// // "use client";
// // import { useEffect, useState, useRef } from "react";
// // import { io } from "socket.io-client";
// // import dynamic from "next/dynamic";
// // import {
// //   Briefcase, CheckCircle, LogOut, Menu, X,
// //   MapPin, DollarSign, Bell, PlusCircle,
// //   ThumbsUp, ThumbsDown, MessageSquare
// // } from "lucide-react";

// // const JobMap = dynamic(() => import("@/components/JobMap"), { ssr: false });

// // const T = {
// //   en: {
// //     dir: "ltr", brand: "RozgarHub", role: "WORKER",
// //     navRequests: "Job Requests", navApplied: "My Applications",
// //     navBrowse: "Browse Jobs", navAvail: "Post Availability",
// //     logout: "Logout", online: "Online",
// //     headerRequests: "Incoming Requests", headerApplied: "My Applications",
// //     headerBrowse: "Browse Jobs", welcomeBack: "Welcome back",
// //     waitingTitle: "Waiting for job requests...",
// //     waitingDesc: "When an employer posts a job in your area, it will pop up automatically.",
// //     incomingTitle: "New request incoming!", incomingDesc: "Check the popup to respond.",
// //     recentNotifs: "Recent Notifications",
// //     noApps: "No applications yet.",
// //     appliedOn: "Applied", recently: "recently", pending: "Pending", shortlisted: "Shortlisted",
// //     applyNow: "Apply Now",
// //     applyFor: "Apply for Job", employerDetails: "Employer Details",
// //     employer: "Employer", location: "Location", cnic: "CNIC",
// //     jobLocationMap: "Job Location",
// //     employerListedRate: "Employer Listed Rate",
// //     yourOffer: "Your Offer (PKR)", aboveRate: "above listed rate",
// //     belowRate: "below listed rate", matchingRate: "Matching employer's listed rate",
// //     submitApp: "Submit Application",
// //     newJobRequest: "New Job Request", employerOffer: "EMPLOYER OFFER",
// //     acceptJob: "Accept Job", declineJob: "Decline",
// //     counterOffer: "Counter Offer", sendCounter: "Send Counter",
// //     offerSent: "Counter Offer Sent! Waiting for employer...",
// //     yourOfferWas: "Your counter offer:", counterReceived: "EMPLOYER COUNTER OFFER",
// //     yourOfferWasLabel: "Your offer was",
// //     accept: "Accept", reject: "Reject",
// //     jobConfirmed: "Job Confirmed! 🎉", jobConfirmedDesc: "Get ready to go to the job site",
// //     viewJobDetails: "View Job Details",
// //     offerRejected: "Not Selected", offerRejectedDesc: "The employer chose another worker",
// //     close: "Close",
// //     dismissed: "Request Dismissed", dismissedDesc: "The employer dismissed your acceptance",
// //     postAvailTitle: "Post Your Availability",
// //     skillLabel: "Your Skill/Trade", skillPlaceholder: "e.g., Electrician, Plumber",
// //     expLabel: "Years of Experience", expPlaceholder: "e.g., 5 years",
// //     rateLabel: "Hourly Rate (PKR)", ratePlaceholder: "e.g., 500",
// //     locLabel: "Your Location", locPlaceholder: "e.g., Karachi, Lahore",
// //     descLabel: "Description", descPlaceholder: "Describe your skills...",
// //     postBtn: "Post Availability", cancelBtn: "Cancel",
// //     swalEnterPrice: "Enter a price", swalEnterPriceText: "Please enter a counter price.",
// //     swalPosted: "Posted! ✅", swalPostedText: "Availability updated.",
// //     swalError: "Error", swalErrorText: "Failed to post.",
// //     swalSavedLocally: "Saved Locally", swalSavedLocallyText: "Saved locally.",
// //     swalAppSent: "Application Sent! 🎉", swalAppSentText: "Submitted. We'll notify you.",
// //     swalOops: "Oops!", swalAlreadyApplied: "You may have already applied.",
// //     swalAccepted: "🎉 Job Confirmed!", swalAcceptedText: "The employer confirmed your acceptance!",
// //     swalRejected: "Not Selected", swalRejectedText: "The employer chose another worker.",
// //     swalRejectCounter: "Reject Counter?", swalRejectCounterText: "Are you sure?",
// //     swalYesReject: "Yes, Reject", swalGoBack: "Go Back",
// //     swalLogout: "Logout?", swalLogoutText: "Are you sure?",
// //     swalYesLogout: "Yes, Logout", swalViewJob: "View Job",
// //     swalGreat: "Great!", langToggle: "اردو",
// //     optionalCounter: "Enter counter price (Rs.)...",
// //     counterNote: "Propose a different price instead",
// //     swalCounterReceived: "💬 Counter Offer!",
// //     swalCounterReceivedText: "Check the popup to respond.",
// //   },
// //   ur: {
// //     dir: "rtl", brand: "روزگار ہب", role: "ورکر",
// //     navRequests: "نوکری کی درخواستیں", navApplied: "میری درخواستیں",
// //     navBrowse: "نوکریاں دیکھیں", navAvail: "دستیابی پوسٹ کریں",
// //     logout: "لاگ آؤٹ", online: "آن لائن",
// //     headerRequests: "آنے والی درخواستیں", headerApplied: "میری درخواستیں",
// //     headerBrowse: "نوکریاں دیکھیں", welcomeBack: "خوش آمدید",
// //     waitingTitle: "نوکری کی درخواستوں کا انتظار ہے...",
// //     waitingDesc: "جب آپ کے علاقے میں کوئی نوکری پوسٹ ہوگی، خود بخود آجائے گی۔",
// //     incomingTitle: "نئی درخواست آ رہی ہے!", incomingDesc: "پاپ اپ میں جواب دیں۔",
// //     recentNotifs: "حالیہ اطلاعات",
// //     noApps: "ابھی کوئی درخواست نہیں۔",
// //     appliedOn: "درخواست دی", recently: "حال ہی میں", pending: "زیر التواء", shortlisted: "منتخب",
// //     applyNow: "ابھی درخواست دیں",
// //     applyFor: "نوکری کے لیے درخواست", employerDetails: "آجر کی تفصیلات",
// //     employer: "آجر", location: "مقام", cnic: "شناختی کارڈ",
// //     jobLocationMap: "نقشے پر کام کی جگہ",
// //     employerListedRate: "آجر کی مقررہ شرح",
// //     yourOffer: "آپ کی پیشکش (روپے)", aboveRate: "مقررہ شرح سے زیادہ",
// //     belowRate: "مقررہ شرح سے کم", matchingRate: "آجر کی مقررہ شرح کے برابر",
// //     submitApp: "درخواست جمع کریں",
// //     newJobRequest: "نئی نوکری کی درخواست", employerOffer: "آجر کی پیشکش",
// //     acceptJob: "نوکری قبول کریں", declineJob: "رد کریں",
// //     counterOffer: "جوابی پیشکش", sendCounter: "بھیجیں",
// //     offerSent: "جوابی پیشکش بھیج دی گئی!",
// //     yourOfferWas: "آپ کی جوابی پیشکش:", counterReceived: "آجر کی جوابی پیشکش",
// //     yourOfferWasLabel: "آپ کی پیشکش تھی",
// //     accept: "قبول کریں", reject: "رد کریں",
// //     jobConfirmed: "نوکری کی تصدیق! 🎉", jobConfirmedDesc: "کام کی جگہ پر جانے کے لیے تیار ہوں",
// //     viewJobDetails: "نوکری کی تفصیلات دیکھیں",
// //     offerRejected: "منتخب نہیں ہوئے", offerRejectedDesc: "آجر نے دوسرا ورکر منتخب کیا",
// //     close: "بند کریں",
// //     dismissed: "درخواست واپس", dismissedDesc: "آجر نے آپ کی قبولیت رد کر دی",
// //     postAvailTitle: "اپنی دستیابی پوسٹ کریں",
// //     skillLabel: "آپ کی مہارت", skillPlaceholder: "مثلاً: الیکٹریشن، پلمبر",
// //     expLabel: "تجربے کے سال", expPlaceholder: "مثلاً: ۵ سال",
// //     rateLabel: "فی گھنٹہ اجرت (روپے)", ratePlaceholder: "مثلاً: ۵۰۰",
// //     locLabel: "آپ کا مقام", locPlaceholder: "مثلاً: کراچی، لاہور",
// //     descLabel: "تفصیل", descPlaceholder: "اپنی مہارتیں بیان کریں...",
// //     postBtn: "دستیابی پوسٹ کریں", cancelBtn: "منسوخ کریں",
// //     swalEnterPrice: "قیمت درج کریں", swalEnterPriceText: "جوابی قیمت درج کریں۔",
// //     swalPosted: "پوسٹ ہو گئی! ✅", swalPostedText: "دستیابی اپڈیٹ ہو گئی۔",
// //     swalError: "خرابی", swalErrorText: "پوسٹ کرنے میں ناکامی۔",
// //     swalSavedLocally: "مقامی طور پر محفوظ", swalSavedLocallyText: "مقامی طور پر محفوظ کیا گیا۔",
// //     swalAppSent: "درخواست بھیج دی! 🎉", swalAppSentText: "جمع ہو گئی۔",
// //     swalOops: "افسوس!", swalAlreadyApplied: "شاید پہلے ہی درخواست دے چکے ہیں۔",
// //     swalAccepted: "🎉 نوکری کی تصدیق!", swalAcceptedText: "آجر نے آپ کو منتخب کر لیا!",
// //     swalRejected: "منتخب نہیں ہوئے", swalRejectedText: "آجر نے دوسرا ورکر منتخب کیا۔",
// //     swalRejectCounter: "جوابی پیشکش رد کریں؟", swalRejectCounterText: "کیا آپ واقعی؟",
// //     swalYesReject: "ہاں، رد کریں", swalGoBack: "واپس جائیں",
// //     swalLogout: "لاگ آؤٹ؟", swalLogoutText: "کیا آپ واقعی؟",
// //     swalYesLogout: "ہاں، لاگ آؤٹ", swalViewJob: "نوکری دیکھیں",
// //     swalGreat: "بہت اچھا!", langToggle: "English",
// //     optionalCounter: "جوابی قیمت درج کریں (روپے)...",
// //     counterNote: "مختلف قیمت تجویز کریں",
// //     swalCounterReceived: "💬 جوابی پیشکش!",
// //     swalCounterReceivedText: "پاپ اپ چیک کریں۔",
// //   }
// // };

// // const socket = io("http://localhost:5000");
// // if (typeof window !== "undefined") window._rozgarSocket = socket;

// // export default function WorkerDashboard() {
// //   const [lang, setLang] = useState("en");
// //   const t = T[lang];

// //   const [user, setUser] = useState(null);
// //   const [activeTab, setActiveTab] = useState("requests");
// //   const [sidebarOpen, setSidebarOpen] = useState(true);

// //   const [incomingRequest, setIncomingRequest] = useState(null);
// //   const [showPopup, setShowPopup] = useState(false);
// //   const [popupTimer, setPopupTimer] = useState(30);
// //   const timerRef = useRef(null);

// //   const [popupState, setPopupState] = useState(null);
// //   const [counterPrice, setCounterPrice] = useState("");
// //   const [employerCounter, setEmployerCounter] = useState(null);

// //   const [showApplyModal, setShowApplyModal] = useState(false);
// //   const [selectedJob, setSelectedJob] = useState(null);
// //   const [offeredRate, setOfferedRate] = useState("");

// //   const [appliedJobs, setAppliedJobs] = useState([]);
// //   const [notifications, setNotifications] = useState([]);

// //   const [showAvailModal, setShowAvailModal] = useState(false);
// //   const [availability, setAvailability] = useState({
// //     skill: "", experience: "", hourlyRate: "", location: "", description: "", status: "available"
// //   });

// //   const swal = (opts) => typeof window !== "undefined" && window.Swal && window.Swal.fire(opts);

// //   useEffect(() => {
// //     if (document.getElementById("swal-cdn")) return;
// //     const link = document.createElement("link");
// //     link.rel = "stylesheet";
// //     link.href = "https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css";
// //     document.head.appendChild(link);
// //     const script = document.createElement("script");
// //     script.id = "swal-cdn";
// //     script.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
// //     document.head.appendChild(script);
// //   }, []);

// //   useEffect(() => {
// //     const storedUser = localStorage.getItem("user");
// //     if (storedUser) {
// //       const u = JSON.parse(storedUser);
// //       setUser(u);
// //       socket.emit("join", u.id);
// //       socket.emit("worker_online", { workerId: u.id, name: u.name });
// //       fetch(`http://localhost:5000/api/applications/${u.id}`)
// //         .then(r => r.json()).then(setAppliedJobs).catch(() => {});
// //     }
// //   }, []);

// //   useEffect(() => {
// //     socket.on("new_job_request", (data) => {
// //       setIncomingRequest(data);
// //       setCounterPrice(data.offeredPrice || "");
// //       setPopupState(null);
// //       setShowPopup(true);
// //       setPopupTimer(30);
// //       addNotif(`📍 New job: ${data.title}`);
// //     });

// //     socket.on("employer_confirm_worker", () => {
// //       setPopupState("confirmed");
// //       addNotif("🎉 " + t.swalAcceptedText);
// //       swal({ title: t.swalAccepted, text: t.swalAcceptedText, icon: "success", confirmButtonColor: "#16a34a" });
// //     });

// //     socket.on("employer_dismiss_worker", () => {
// //       setPopupState("dismissed");
// //       addNotif("❌ " + t.dismissedDesc);
// //     });

// //     socket.on("employer_accepted", () => {
// //       setPopupState("confirmed");
// //       swal({ title: t.swalAccepted, text: t.swalAcceptedText, icon: "success", confirmButtonColor: "#16a34a" });
// //     });

// //     socket.on("employer_rejected", (data) => {
// //       if (data.workerId === user?.id) {
// //         setPopupState("rejected");
// //       }
// //     });

// //     socket.on("employer_counter", (data) => {
// //       if (data.workerId === user?.id) {
// //         setEmployerCounter(data);
// //         setPopupState("counter_received");
// //         swal({ title: t.swalCounterReceived, html: `<strong>Rs. ${data.price}</strong>`, icon: "info", confirmButtonColor: "#3b82f6" });
// //       }
// //     });

// //     socket.on("request_taken", (data) => {
// //       if (incomingRequest?.requestId === data.requestId && popupState !== "confirmed") {
// //         setPopupState("rejected");
// //       }
// //     });

// //     return () => {
// //       socket.off("new_job_request");
// //       socket.off("employer_confirm_worker");
// //       socket.off("employer_dismiss_worker");
// //       socket.off("employer_accepted");
// //       socket.off("employer_rejected");
// //       socket.off("employer_counter");
// //       socket.off("request_taken");
// //     };
// //   }, [user, incomingRequest, popupState, lang]);

// //   useEffect(() => {
// //     if (showPopup && popupState === null) {
// //       setPopupTimer(30);
// //       timerRef.current = setInterval(() => {
// //         setPopupTimer(prev => {
// //           if (prev <= 1) { clearInterval(timerRef.current); dismissPopup(); return 0; }
// //           return prev - 1;
// //         });
// //       }, 1000);
// //     } else {
// //       clearInterval(timerRef.current);
// //     }
// //     return () => clearInterval(timerRef.current);
// //   }, [showPopup, popupState]);

// //   const addNotif = (msg) => setNotifications(p => [...p, { id: Date.now(), msg }]);

// //   const dismissPopup = () => {
// //     setShowPopup(false);
// //     setIncomingRequest(null);
// //     setPopupState(null);
// //     setCounterPrice("");
// //     setEmployerCounter(null);
// //   };

// //   const handleAcceptJob = () => {
// //     socket.emit("worker_job_accept", {
// //       requestId: incomingRequest.requestId,
// //       employerId: incomingRequest.employerId,
// //       workerId: user.id,
// //       workerName: user.name,
// //       workerRating: "4.8",
// //       workerPhone: user.phone || "",
// //     });
// //     setPopupState("accepted_waiting");
// //   };

// //   const handleDeclineJob = () => {
// //     socket.emit("worker_job_decline", { requestId: incomingRequest.requestId, workerId: user.id });
// //     dismissPopup();
// //   };

// //   const handleSendCounter = () => {
// //     if (!counterPrice) {
// //       swal({ title: t.swalEnterPrice, text: t.swalEnterPriceText, icon: "warning", confirmButtonColor: "#f59e0b" });
// //       return;
// //     }
// //     socket.emit("worker_offer", {
// //       requestId: incomingRequest.requestId,
// //       employerId: incomingRequest.employerId,
// //       workerId: user.id,
// //       workerName: user.name,
// //       price: counterPrice,
// //       rating: "4.8",
// //       phone: user.phone,
// //     });
// //     setPopupState("counter_sent");
// //   };

// //   const handleAcceptEmployerCounter = () => {
// //     socket.emit("worker_accepted", {
// //       requestId: incomingRequest.requestId,
// //       employerId: incomingRequest.employerId,
// //       workerId: user.id,
// //       workerName: user.name,
// //       price: employerCounter.price,
// //       phone: user.phone,
// //     });
// //     setPopupState("confirmed");
// //   };

// //   const handleRejectEmployerCounter = () => {
// //     swal({
// //       title: t.swalRejectCounter, text: t.swalRejectCounterText, icon: "warning",
// //       showCancelButton: true, confirmButtonColor: "#ef4444", cancelButtonColor: "#6b7280",
// //       confirmButtonText: t.swalYesReject, cancelButtonText: t.swalGoBack
// //     }).then(r => {
// //       if (r.isConfirmed) {
// //         socket.emit("worker_rejected_counter", {
// //           requestId: incomingRequest.requestId,
// //           employerId: incomingRequest.employerId,
// //           workerId: user.id,
// //         });
// //         dismissPopup();
// //       }
// //     });
// //   };

// //   const handlePostAvailability = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const res = await fetch("http://localhost:5000/api/workers", {
// //         method: "POST", headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ ...availability, worker: user.id })
// //       });
// //       setShowAvailModal(false);
// //       res.ok
// //         ? swal({ title: t.swalPosted, text: t.swalPostedText, icon: "success", confirmButtonColor: "#16a34a" })
// //         : swal({ title: t.swalError, text: t.swalErrorText, icon: "error", confirmButtonColor: "#ef4444" });
// //     } catch (_) {
// //       setShowAvailModal(false);
// //       swal({ title: t.swalSavedLocally, text: t.swalSavedLocallyText, icon: "info", confirmButtonColor: "#3b82f6" });
// //     }
// //   };

// //   const handleApplyJob = async (jobId, rate) => {
// //     const res = await fetch("http://localhost:5000/api/applications", {
// //       method: "POST", headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({ job: jobId, worker: user.id, offeredRate: rate })
// //     });
// //     const data = await res.json();
// //     if (!res.ok) { swal({ title: t.swalOops, text: data.error || t.swalAlreadyApplied, icon: "error", confirmButtonColor: "#ef4444" }); return; }
// //     setShowApplyModal(false);
// //     swal({ title: t.swalAppSent, html: `<strong>Rs. ${rate}</strong> — ${t.swalAppSentText}`, icon: "success", confirmButtonColor: "#16a34a", confirmButtonText: t.swalGreat });
// //   };

// //   const handleLogout = () => {
// //     swal({
// //       title: t.swalLogout, text: t.swalLogoutText, icon: "question",
// //       showCancelButton: true, confirmButtonColor: "#ef4444", cancelButtonColor: "#6b7280",
// //       confirmButtonText: t.swalYesLogout, cancelButtonText: t.swalGoBack
// //     }).then(r => { if (r.isConfirmed) { localStorage.removeItem("user"); window.location.href = "/login"; } });
// //   };

// //   if (!user) return (
// //     <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #064e3b 0%, #065f46 100%)" }}>
// //       <div style={{ textAlign: "center", color: "#fff" }}>
// //         <div style={{ width: 56, height: 56, border: "4px solid #34d399", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto" }} />
// //       </div>
// //       <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
// //     </div>
// //   );

// //   return (
// //     <div dir={t.dir} style={{ minHeight: "100vh", display: "flex", background: "#f0f4f8", fontFamily: lang === "ur" ? "'Noto Nastaliq Urdu', serif" : "'Segoe UI', sans-serif" }}>

// //       {/* ── InDrive Popup ── */}
// //       {showPopup && incomingRequest && (
// //         <JobRequestPopup
// //           t={t} request={incomingRequest}
// //           popupState={popupState} popupTimer={popupTimer}
// //           counterPrice={counterPrice} setCounterPrice={setCounterPrice}
// //           employerCounter={employerCounter}
// //           onAcceptJob={handleAcceptJob}
// //           onDeclineJob={handleDeclineJob}
// //           onShowCounter={() => setPopupState("counter_input")}
// //           onSendCounter={handleSendCounter}
// //           onAcceptEmployerCounter={handleAcceptEmployerCounter}
// //           onRejectEmployerCounter={handleRejectEmployerCounter}
// //           onDismiss={dismissPopup}
// //           userId={user.id}
// //         />
// //       )}

// //       {/* ── Apply Modal — FIXED overflow ── */}
// //       {showApplyModal && selectedJob && (
// //         <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 24, backdropFilter: "blur(4px)" }}>
// //           {/* KEY FIX: flex column + overflow hidden on card, overflowY auto on body */}
// //           <div style={{ background: "#fff", borderRadius: 24, width: "100%", maxWidth: 480, boxShadow: "0 24px 60px rgba(0,0,0,0.3)", display: "flex", flexDirection: "column", maxHeight: "88vh", overflow: "hidden" }}>
// //             {/* Header — flexShrink 0 so it never scrolls away */}
// //             <div style={{ background: "linear-gradient(135deg, #0f172a, #1e3a5f)", padding: "24px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
// //               <div>
// //                 <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, margin: 0 }}>{t.applyFor}</p>
// //                 <h3 style={{ fontSize: 20, fontWeight: 800, color: "#fff", margin: "6px 0 0" }}>{selectedJob.title}</h3>
// //               </div>
// //               <button onClick={() => setShowApplyModal(false)} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 10, padding: 8, cursor: "pointer" }}>
// //                 <X size={18} color="#fff" />
// //               </button>
// //             </div>

// //             {/* Body — scrollable, map stays inside */}
// //             <div style={{ padding: 28, overflowY: "auto", flex: 1 }}>
// //               {/* Employer info */}
// //               <div style={{ background: "#f8fafc", border: "1.5px solid #e2e8f0", borderRadius: 14, padding: 16, marginBottom: 20 }}>
// //                 <h4 style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1, margin: "0 0 12px" }}>{t.employerDetails}</h4>
// //                 <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
// //                   <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
// //                     <div style={{ width: 32, height: 32, borderRadius: 8, background: "#dbeafe", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
// //                       <MapPin size={16} color="#3b82f6" />
// //                     </div>
// //                     <div>
// //                       <p style={{ fontSize: 11, color: "#94a3b8", margin: 0 }}>{t.location}</p>
// //                       <p style={{ fontSize: 14, fontWeight: 600, color: "#0f172a", margin: 0 }}>{selectedJob.location}</p>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* GPS MAP */}
// //               {(selectedJob.latitude || selectedJob.lat) && (selectedJob.longitude || selectedJob.lng) ? (
// //                 <div style={{ marginBottom: 20 }}>
// //                   <JobMap
// //                     lat={selectedJob.latitude || selectedJob.lat}
// //                     lng={selectedJob.longitude || selectedJob.lng}
// //                     height={200}
// //                     label={t.jobLocationMap}
// //                     showWorkerLocation={true}
// //                     workerId={user.id}
// //                     employerId={selectedJob.employer?._id || selectedJob.employer}
// //                   />
// //                   <p style={{ fontSize: 12, color: "#16a34a", fontWeight: 600, textAlign: "center", marginTop: 6, display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
// //                     🟢 Your live location is being shared with the employer
// //                   </p>
// //                 </div>
// //               ) : (
// //                 <div style={{ background: "#f8fafc", border: "1.5px dashed #e2e8f0", borderRadius: 12, padding: 16, marginBottom: 20, textAlign: "center" }}>
// //                   <p style={{ fontSize: 13, color: "#94a3b8", margin: 0 }}>📍 {selectedJob.location || "Location not specified"}</p>
// //                 </div>
// //               )}

// //               {/* Rate */}
// //               <div style={{ background: "#f0fdf4", border: "1.5px solid #86efac", borderRadius: 12, padding: "12px 18px", marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
// //                 <span style={{ fontSize: 13, color: "#16a34a", fontWeight: 600 }}>{t.employerListedRate}</span>
// //                 <span style={{ fontSize: 20, fontWeight: 800, color: "#0f172a" }}>
// //                   Rs. {String(selectedJob.salary).replace(/^Rs\.\s*/i, "")}
// //                 </span>
// //               </div>

// //               {/* Offer stepper */}
// //               <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, marginBottom: 24 }}>
// //                 <label style={{ fontSize: 13, fontWeight: 700, color: "#374151" }}>{t.yourOffer}</label>
// //                 <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
// //                   <button onClick={() => setOfferedRate(prev => String(Math.max(0, Number(prev) - 100)))}
// //                     style={{ width: 42, height: 42, borderRadius: 10, border: "none", background: "#f1f5f9", color: "#374151", fontSize: 22, fontWeight: 700, cursor: "pointer" }}>−</button>
// //                   <input type="number" value={offeredRate} onChange={e => setOfferedRate(e.target.value)}
// //                     style={{ width: 130, textAlign: "center", border: "2px solid #16a34a", borderRadius: 12, padding: "10px 0", fontSize: 22, fontWeight: 800, color: "#0f172a", outline: "none" }} />
// //                   <button onClick={() => setOfferedRate(prev => String(Number(prev) + 100))}
// //                     style={{ width: 42, height: 42, borderRadius: 10, border: "none", background: "#f1f5f9", color: "#374151", fontSize: 22, fontWeight: 700, cursor: "pointer" }}>+</button>
// //                 </div>
// //                 <p style={{ fontSize: 12, color: "#94a3b8", margin: 0 }}>
// //                   {Number(offeredRate) > Number(selectedJob.salary) ? `↑ Rs. ${Number(offeredRate) - Number(selectedJob.salary)} ${t.aboveRate}`
// //                     : Number(offeredRate) < Number(selectedJob.salary) ? `↓ Rs. ${Number(selectedJob.salary) - Number(offeredRate)} ${t.belowRate}`
// //                     : t.matchingRate}
// //                 </p>
// //               </div>

// //               <button onClick={() => handleApplyJob(selectedJob._id, offeredRate)}
// //                 style={{ width: "100%", padding: "15px", borderRadius: 14, border: "none", background: "linear-gradient(135deg, #22c55e, #16a34a)", color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 14px rgba(22,163,74,0.4)" }}>
// //                 {t.submitApp}
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* ── Sidebar ── */}
// //       <aside style={{ width: sidebarOpen ? 240 : 72, background: "linear-gradient(180deg, #064e3b 0%, #065f46 100%)", color: "#fff", display: "flex", flexDirection: "column", transition: "width 0.3s", flexShrink: 0 }}>
// //         <div style={{ padding: "24px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
// //           {sidebarOpen && <div><div style={{ fontSize: 20, fontWeight: 800 }}>{t.brand}</div><div style={{ fontSize: 11, opacity: 0.5, marginTop: 2 }}>{t.role}</div></div>}
// //           <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", padding: 8, borderRadius: 8, cursor: "pointer" }}>
// //             {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
// //           </button>
// //         </div>

// //         <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
// //           {[
// //             { id: "requests", icon: Bell, label: t.navRequests },
// //             { id: "applied", icon: CheckCircle, label: t.navApplied },
// //             { id: "browse", icon: Briefcase, label: t.navBrowse },
// //           ].map(item => (
// //             <button key={item.id} onClick={() => setActiveTab(item.id)} style={{
// //               display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 10, border: "none", cursor: "pointer",
// //               background: activeTab === item.id ? "rgba(52,211,153,0.2)" : "transparent",
// //               color: activeTab === item.id ? "#34d399" : "rgba(255,255,255,0.6)",
// //               fontWeight: activeTab === item.id ? 600 : 400, fontSize: 14, transition: "all 0.2s",
// //               flexDirection: t.dir === "rtl" ? "row-reverse" : "row"
// //             }}>
// //               <item.icon size={18} />
// //               {sidebarOpen && <span>{item.label}</span>}
// //             </button>
// //           ))}
// //           <button onClick={() => setShowAvailModal(true)} style={{
// //             display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 10, border: "none", cursor: "pointer",
// //             background: "rgba(251,146,60,0.2)", color: "#fb923c", fontWeight: 600, fontSize: 14, marginTop: 8,
// //             flexDirection: t.dir === "rtl" ? "row-reverse" : "row"
// //           }}>
// //             <PlusCircle size={18} />
// //             {sidebarOpen && <span>{t.navAvail}</span>}
// //           </button>
// //         </nav>

// //         <div style={{ padding: "16px 12px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
// //           {sidebarOpen && (
// //             <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", marginBottom: 8 }}>
// //               <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #34d399, #059669)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, flexShrink: 0 }}>
// //                 {user.name?.charAt(0).toUpperCase()}
// //               </div>
// //               <div>
// //                 <div style={{ fontSize: 13, fontWeight: 600 }}>{user.name}</div>
// //                 <div style={{ fontSize: 11, opacity: 0.5 }}>{user.email}</div>
// //               </div>
// //             </div>
// //           )}
// //           <button onClick={handleLogout} style={{
// //             display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 10, border: "none", cursor: "pointer", width: "100%",
// //             background: "rgba(239,68,68,0.15)", color: "#f87171", fontSize: 14,
// //             flexDirection: t.dir === "rtl" ? "row-reverse" : "row"
// //           }}>
// //             <LogOut size={16} />
// //             {sidebarOpen && <span>{t.logout}</span>}
// //           </button>
// //         </div>
// //       </aside>

// //       {/* ── Main ── */}
// //       <main style={{ flex: 1, overflow: "auto" }}>
// //         <header style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "20px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 5 }}>
// //           <div>
// //             <h1 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a", margin: 0 }}>
// //               {activeTab === "requests" ? t.headerRequests : activeTab === "applied" ? t.headerApplied : t.headerBrowse}
// //             </h1>
// //             <p style={{ fontSize: 13, color: "#64748b", margin: "4px 0 0" }}>{t.welcomeBack}, {user.name}</p>
// //           </div>

// //           <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
// //             <button onClick={() => setLang(l => l === "en" ? "ur" : "en")} style={{
// //               padding: "6px 16px", borderRadius: 20, border: "2px solid #16a34a", background: "#fff",
// //               color: "#16a34a", fontSize: 13, fontWeight: 700, cursor: "pointer",
// //               fontFamily: lang === "en" ? "'Noto Nastaliq Urdu', serif" : "'Segoe UI', sans-serif"
// //             }}>
// //               {t.langToggle}
// //             </button>
// //             <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#dcfce7", padding: "6px 14px", borderRadius: 20 }}>
// //               <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#16a34a" }} />
// //               <span style={{ fontSize: 12, fontWeight: 600, color: "#16a34a" }}>{t.online}</span>
// //             </div>
// //             {notifications.length > 0 && (
// //               <div style={{ position: "relative", cursor: "pointer" }} onClick={() => setNotifications([])}>
// //                 <Bell size={20} color="#64748b" />
// //                 <div style={{ position: "absolute", top: -4, right: -4, width: 16, height: 16, background: "#ef4444", borderRadius: "50%", fontSize: 10, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
// //                   {notifications.length}
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         </header>

// //         <div style={{ padding: "32px" }}>
// //           {activeTab === "requests" && <RequestsTab t={t} notifications={notifications} showPopup={showPopup} />}
// //           {activeTab === "applied" && <AppliedTab t={t} applied={appliedJobs} />}
// //           {activeTab === "browse" && (
// //             <BrowseTab t={t} userId={user.id}
// //               onOpenApplyModal={(job) => { setSelectedJob(job); setOfferedRate(job.salary || ""); setShowApplyModal(true); }} />
// //           )}
// //         </div>
// //       </main>

// //       {/* ── Availability Modal ── */}
// //       {showAvailModal && (
// //         <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 24 }}>
// //           <div style={{ background: "#fff", borderRadius: 20, padding: 32, maxWidth: 520, width: "100%", maxHeight: "90vh", overflowY: "auto" }}>
// //             <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
// //               <h3 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>{t.postAvailTitle}</h3>
// //               <button onClick={() => setShowAvailModal(false)} style={{ background: "#f1f5f9", border: "none", borderRadius: 8, padding: 8, cursor: "pointer" }}><X size={18} /></button>
// //             </div>
// //             <form onSubmit={handlePostAvailability} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
// //               {[
// //                 { key: "skill", label: t.skillLabel, placeholder: t.skillPlaceholder },
// //                 { key: "experience", label: t.expLabel, placeholder: t.expPlaceholder },
// //                 { key: "hourlyRate", label: t.rateLabel, placeholder: t.ratePlaceholder },
// //                 { key: "location", label: t.locLabel, placeholder: t.locPlaceholder },
// //               ].map(f => (
// //                 <div key={f.key}>
// //                   <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>{f.label}</label>
// //                   <input required value={availability[f.key]} onChange={e => setAvailability({ ...availability, [f.key]: e.target.value })}
// //                     placeholder={f.placeholder} style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: "1.5px solid #e2e8f0", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
// //                 </div>
// //               ))}
// //               <div>
// //                 <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>{t.descLabel}</label>
// //                 <textarea required value={availability.description} onChange={e => setAvailability({ ...availability, description: e.target.value })}
// //                   rows={3} placeholder={t.descPlaceholder} style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: "1.5px solid #e2e8f0", fontSize: 14, outline: "none", resize: "vertical", boxSizing: "border-box" }} />
// //               </div>
// //               <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
// //                 <button type="submit" style={{ flex: 1, padding: 14, background: "linear-gradient(135deg, #16a34a, #059669)", color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>{t.postBtn}</button>
// //                 <button type="button" onClick={() => setShowAvailModal(false)} style={{ padding: "14px 20px", background: "#f1f5f9", color: "#475569", border: "none", borderRadius: 12, fontSize: 14, cursor: "pointer" }}>{t.cancelBtn}</button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       )}

// //       <style>{`@keyframes spin{to{transform:rotate(360deg)}} @keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}} @keyframes fadeIn{from{opacity:0}to{opacity:1}}`}</style>
// //     </div>
// //   );
// // }

// // /* ═══════════════ JOB REQUEST POPUP ═══════════════ */
// // function JobRequestPopup({
// //   t, request, popupState, popupTimer,
// //   counterPrice, setCounterPrice, employerCounter,
// //   onAcceptJob, onDeclineJob, onShowCounter, onSendCounter,
// //   onAcceptEmployerCounter, onRejectEmployerCounter, onDismiss, userId
// // }) {
// //   const timerPct = (popupTimer / 30) * 100;
// //   const isInitial = popupState === null;

// //   return (
// //     <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 300, padding: 24, backdropFilter: "blur(6px)" }}>
// //       <div style={{ background: "#fff", borderRadius: 26, width: "100%", maxWidth: 460, boxShadow: "0 32px 80px rgba(0,0,0,0.35)", overflow: "hidden", maxHeight: "92vh", overflowY: "auto" }}>

// //         {isInitial && (
// //           <div style={{ height: 5, background: "#e2e8f0", overflow: "hidden" }}>
// //             <div style={{ height: "100%", width: `${timerPct}%`, transition: "width 1s linear", background: timerPct > 33 ? "linear-gradient(90deg,#22c55e,#16a34a)" : "linear-gradient(90deg,#ef4444,#dc2626)" }} />
// //           </div>
// //         )}

// //         <div style={{ padding: 26 }}>
// //           <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
// //             <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
// //               <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#22c55e" }} />
// //               <span style={{ fontSize: 12, fontWeight: 800, color: "#16a34a", textTransform: "uppercase", letterSpacing: ".08em" }}>{t.newJobRequest}</span>
// //             </div>
// //             <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
// //               {isInitial && <span style={{ fontSize: 13, fontWeight: 700, color: timerPct > 33 ? "#64748b" : "#ef4444" }}>⏱ {popupTimer}s</span>}
// //               <button onClick={onDismiss} style={{ background: "#f1f5f9", border: "none", borderRadius: 8, padding: 7, cursor: "pointer" }}><X size={15} color="#64748b" /></button>
// //             </div>
// //           </div>

// //           <div style={{ background: "linear-gradient(135deg,#0f172a,#1e3a5f)", borderRadius: 16, padding: 20, marginBottom: 16, color: "#fff" }}>
// //             <h3 style={{ fontSize: 18, fontWeight: 800, margin: "0 0 8px" }}>{request.title}</h3>
// //             {request.description && <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", margin: "0 0 14px", lineHeight: 1.5 }}>{request.description}</p>}
// //             <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
// //               {request.workLocation && (
// //                 <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,.08)", borderRadius: 8, padding: "5px 10px" }}>
// //                   <MapPin size={12} color="#60a5fa" />
// //                   <span style={{ fontSize: 12 }}>{request.workLocation}</span>
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           {request.lat && request.lng ? (
// //             <div style={{ marginBottom: 16 }}>
// //               <JobMap
// //                 lat={request.lat}
// //                 lng={request.lng}
// //                 height={180}
// //                 label="Job Location"
// //                 showWorkerLocation={popupState === "accepted_waiting" || popupState === "confirmed"}
// //                 workerId={userId}
// //                 employerId={request.employerId}
// //               />
// //               {(popupState === "accepted_waiting" || popupState === "confirmed") && (
// //                 <p style={{ fontSize: 11, color: "#16a34a", fontWeight: 700, textAlign: "center", marginTop: 5 }}>
// //                   🟢 Your live location is being shared with employer
// //                 </p>
// //               )}
// //             </div>
// //           ) : (
// //             request.workLocation && (
// //               <div style={{ background: "#f8fafc", borderRadius: 10, padding: "10px 14px", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
// //                 <MapPin size={14} color="#64748b" />
// //                 <span style={{ fontSize: 13, color: "#475569" }}>{request.workLocation}</span>
// //               </div>
// //             )
// //           )}

// //           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, padding: "14px 18px", background: "#f0fdf4", borderRadius: 12, border: "1.5px solid #86efac" }}>
// //             <div>
// //               <div style={{ fontSize: 11, color: "#16a34a", fontWeight: 700, marginBottom: 2 }}>{t.employerOffer}</div>
// //               <div style={{ fontSize: 26, fontWeight: 900, color: "#0f172a" }}>Rs. {request.offeredPrice || "Open"}</div>
// //             </div>
// //             <div style={{ textAlign: "right" }}>
// //               <div style={{ fontSize: 13, fontWeight: 700 }}>{request.employerName}</div>
// //               <div style={{ fontSize: 11, color: "#64748b" }}>{request.category}</div>
// //             </div>
// //           </div>

// //           {isInitial && (
// //             <>
// //               <div style={{ display: "flex", gap: 10, marginBottom: 0 }}>
// //                 <button onClick={onAcceptJob} style={{ flex: 2, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px", borderRadius: 13, border: "none", background: "linear-gradient(135deg,#22c55e,#16a34a)", color: "#fff", fontSize: 15, fontWeight: 800, cursor: "pointer", boxShadow: "0 4px 16px rgba(34,197,94,.35)" }}>
// //                   <ThumbsUp size={17} /> {t.acceptJob}
// //                 </button>
// //                 <button onClick={onDeclineJob} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "14px", borderRadius: 13, border: "1.5px solid #fecaca", background: "#fef2f2", color: "#ef4444", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
// //                   <ThumbsDown size={15} /> {t.declineJob}
// //                 </button>
// //               </div>
// //               <button onClick={onShowCounter} style={{ width: "100%", marginTop: 10, padding: "11px", borderRadius: 11, border: "1.5px solid #e2e8f0", background: "#f8fafc", color: "#475569", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
// //                 <MessageSquare size={14} /> {t.counterNote}
// //               </button>
// //             </>
// //           )}

// //           {popupState === "counter_input" && (
// //             <div>
// //               <label style={{ fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 8 }}>{t.counterOffer}</label>
// //               <div style={{ display: "flex", gap: 8 }}>
// //                 <input type="number" value={counterPrice} onChange={e => setCounterPrice(e.target.value)}
// //                   placeholder={t.optionalCounter} autoFocus
// //                   style={{ flex: 1, padding: "13px 14px", borderRadius: 11, border: "1.5px solid #e2e8f0", fontSize: 14, outline: "none" }} />
// //                 <button onClick={onSendCounter} style={{ padding: "13px 18px", borderRadius: 11, border: "none", background: "linear-gradient(135deg,#3b82f6,#2563eb)", color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
// //                   {t.sendCounter}
// //                 </button>
// //               </div>
// //               <button onClick={onDeclineJob} style={{ marginTop: 10, width: "100%", padding: "11px", borderRadius: 11, border: "1.5px solid #fecaca", background: "#fef2f2", color: "#ef4444", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
// //                 {t.declineJob}
// //               </button>
// //             </div>
// //           )}

// //           {popupState === "accepted_waiting" && (
// //             <div style={{ textAlign: "center", padding: "8px 0" }}>
// //               <div style={{ width: 52, height: 52, border: "4px solid #dcfce7", borderTopColor: "#16a34a", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
// //               <p style={{ fontWeight: 700, color: "#0f172a", fontSize: 15, marginBottom: 4 }}>✅ Request Accepted!</p>
// //               <p style={{ fontSize: 13, color: "#64748b" }}>Waiting for employer to confirm you...</p>
// //             </div>
// //           )}

// //           {popupState === "counter_sent" && (
// //             <div style={{ textAlign: "center", padding: "8px 0" }}>
// //               <div style={{ width: 52, height: 52, border: "4px solid #dbeafe", borderTopColor: "#3b82f6", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
// //               <p style={{ fontWeight: 700, color: "#0f172a", fontSize: 15, marginBottom: 4 }}>{t.offerSent}</p>
// //               <p style={{ fontSize: 13, color: "#64748b" }}>{t.yourOfferWas} Rs. {counterPrice}</p>
// //             </div>
// //           )}

// //           {popupState === "counter_received" && employerCounter && (
// //             <div>
// //               <div style={{ background: "#fef3c7", borderRadius: 12, padding: 16, marginBottom: 14, border: "1.5px solid #fcd34d" }}>
// //                 <div style={{ fontSize: 12, fontWeight: 700, color: "#d97706", marginBottom: 4 }}>{t.counterReceived}</div>
// //                 <div style={{ fontSize: 26, fontWeight: 900, color: "#0f172a", marginBottom: 2 }}>Rs. {employerCounter.price}</div>
// //                 <div style={{ fontSize: 12, color: "#64748b" }}>{t.yourOfferWasLabel} Rs. {counterPrice}</div>
// //               </div>
// //               <div style={{ display: "flex", gap: 10 }}>
// //                 <button onClick={onAcceptEmployerCounter} style={{ flex: 1, padding: 13, borderRadius: 12, border: "none", background: "linear-gradient(135deg,#22c55e,#16a34a)", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
// //                   {t.accept} Rs. {employerCounter.price}
// //                 </button>
// //                 <button onClick={onRejectEmployerCounter} style={{ padding: "13px 16px", borderRadius: 12, border: "none", background: "#fef2f2", color: "#ef4444", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
// //                   {t.reject}
// //                 </button>
// //               </div>
// //             </div>
// //           )}

// //           {popupState === "confirmed" && (
// //             <div style={{ textAlign: "center", padding: "12px 0" }}>
// //               <div style={{ fontSize: 52, marginBottom: 10 }}>🎉</div>
// //               <h3 style={{ fontSize: 20, fontWeight: 800, color: "#0f172a", marginBottom: 6 }}>{t.jobConfirmed}</h3>
// //               <p style={{ fontSize: 13, color: "#64748b", marginBottom: 20 }}>{t.jobConfirmedDesc}</p>
// //               <button onClick={onDismiss} style={{ padding: "12px 32px", background: "linear-gradient(135deg,#22c55e,#16a34a)", color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
// //                 {t.viewJobDetails}
// //               </button>
// //             </div>
// //           )}

// //           {popupState === "rejected" && (
// //             <div style={{ textAlign: "center", padding: "12px 0" }}>
// //               <div style={{ fontSize: 42, marginBottom: 10 }}>😔</div>
// //               <p style={{ fontWeight: 700, color: "#0f172a", fontSize: 15, marginBottom: 4 }}>{t.offerRejected}</p>
// //               <p style={{ fontSize: 13, color: "#64748b", marginBottom: 16 }}>{t.offerRejectedDesc}</p>
// //               <button onClick={onDismiss} style={{ padding: "10px 28px", background: "#f1f5f9", color: "#475569", border: "none", borderRadius: 12, fontSize: 14, cursor: "pointer" }}>{t.close}</button>
// //             </div>
// //           )}

// //           {popupState === "dismissed" && (
// //             <div style={{ textAlign: "center", padding: "12px 0" }}>
// //               <div style={{ fontSize: 36, marginBottom: 10 }}>🔄</div>
// //               <p style={{ fontWeight: 700, color: "#0f172a", fontSize: 15, marginBottom: 4 }}>{t.dismissed}</p>
// //               <p style={{ fontSize: 13, color: "#64748b", marginBottom: 16 }}>{t.dismissedDesc}</p>
// //               <button onClick={onDismiss} style={{ padding: "10px 28px", background: "#f1f5f9", color: "#475569", border: "none", borderRadius: 12, fontSize: 14, cursor: "pointer" }}>{t.close}</button>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //       <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
// //     </div>
// //   );
// // }

// // /* ═══════════════ TABS ═══════════════ */
// // function RequestsTab({ t, notifications, showPopup }) {
// //   return (
// //     <div style={{ maxWidth: 600, margin: "0 auto" }}>
// //       <div style={{ background: "#fff", borderRadius: 20, padding: 40, textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
// //         <div style={{ width: 80, height: 80, borderRadius: "50%", background: showPopup ? "linear-gradient(135deg,#22c55e,#16a34a)" : "linear-gradient(135deg,#e2e8f0,#cbd5e1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 32 }}>
// //           {showPopup ? "📩" : "📭"}
// //         </div>
// //         <h3 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>{showPopup ? t.incomingTitle : t.waitingTitle}</h3>
// //         <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6 }}>{showPopup ? t.incomingDesc : t.waitingDesc}</p>
// //         {notifications.length > 0 && (
// //           <div style={{ marginTop: 24, textAlign: "left" }}>
// //             <h4 style={{ fontSize: 14, fontWeight: 600, color: "#475569", marginBottom: 12 }}>{t.recentNotifs}</h4>
// //             {notifications.slice(-5).reverse().map(n => (
// //               <div key={n.id} style={{ padding: "10px 14px", background: "#f8fafc", borderRadius: 10, fontSize: 13, color: "#475569", marginBottom: 8 }}>{n.msg}</div>
// //             ))}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // function AppliedTab({ t, applied }) {
// //   return (
// //     <div style={{ maxWidth: 700, margin: "0 auto" }}>
// //       {applied.length === 0 ? (
// //         <div style={{ background: "#fff", borderRadius: 16, padding: 48, textAlign: "center", color: "#94a3b8" }}>
// //           <CheckCircle size={40} style={{ margin: "0 auto 12px", opacity: 0.3 }} />
// //           <p>{t.noApps}</p>
// //         </div>
// //       ) : (
// //         <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
// //           {applied.map(job => (
// //             <div key={job._id || job.id} style={{ background: "#fff", borderRadius: 16, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
// //               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
// //                 <div>
// //                   <h4 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", margin: "0 0 4px" }}>{job.title || job.job?.title}</h4>
// //                   <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>{t.appliedOn} {job.appliedOn || t.recently}</p>
// //                 </div>
// //                 <span style={{ padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: job.status === "Shortlisted" ? "#dcfce7" : "#fef3c7", color: job.status === "Shortlisted" ? "#16a34a" : "#d97706" }}>
// //                   {job.status === "Shortlisted" ? t.shortlisted : t.pending}
// //                 </span>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // function BrowseTab({ t, userId, onOpenApplyModal }) {
// //   const [jobs, setJobs] = useState([]);
// //   useEffect(() => { fetch("http://localhost:5000/api/jobs").then(r => r.json()).then(setJobs).catch(() => {}); }, []);
// //   return (
// //     <div style={{ maxWidth: 700, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
// //       {jobs.map(job => (
// //         <div key={job._id} style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
// //           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
// //             <div>
// //               <h4 style={{ fontSize: 17, fontWeight: 700, color: "#0f172a", margin: "0 0 4px" }}>{job.title}</h4>
// //               <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>{job.employer?.name}</p>
// //             </div>
// //             <span style={{ background: "#eff6ff", color: "#3b82f6", padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{job.type}</span>
// //           </div>
// //           <p style={{ fontSize: 14, color: "#475569", marginBottom: 14, lineHeight: 1.5 }}>{job.description}</p>
// //           <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
// //             <span style={{ fontSize: 13, color: "#64748b", display: "flex", alignItems: "center", gap: 4 }}><MapPin size={14} />{job.location}</span>
// //             <span style={{ fontSize: 13, color: "#64748b", display: "flex", alignItems: "center", gap: 4 }}><DollarSign size={14} />Rs. {job.salary}</span>
// //           </div>
// //           <button onClick={() => onOpenApplyModal(job)} style={{ width: "100%", padding: 12, background: "linear-gradient(135deg,#16a34a,#059669)", color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
// //             {t.applyNow}
// //           </button>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }


// "use client";
// import { useEffect, useState, useRef } from "react";
// import { io } from "socket.io-client";
// import dynamic from "next/dynamic";
// import {
//   Briefcase, CheckCircle, LogOut, Menu, X,
//   MapPin, DollarSign, Bell, PlusCircle,
//   ThumbsUp, ThumbsDown, MessageSquare, Search, SlidersHorizontal
// } from "lucide-react";

// const JobMap = dynamic(() => import("@/components/JobMap"), { ssr: false });

// const T = {
//   en: {
//     dir: "ltr", brand: "RozgarHub", role: "WORKER",
//     navRequests: "Job Requests", navApplied: "My Applications",
//     navBrowse: "Browse Jobs", navAvail: "Post Availability",
//     logout: "Logout", online: "Online",
//     headerRequests: "Incoming Requests", headerApplied: "My Applications",
//     headerBrowse: "Browse Jobs", welcomeBack: "Welcome back",
//     waitingTitle: "Waiting for job requests...",
//     waitingDesc: "When an employer posts a job in your area, it will pop up automatically.",
//     incomingTitle: "New request incoming!", incomingDesc: "Check the popup to respond.",
//     recentNotifs: "Recent Notifications",
//     noApps: "No applications yet.",
//     appliedOn: "Applied", recently: "recently", pending: "Pending", shortlisted: "Shortlisted",
//     applyNow: "Apply Now",
//     applyFor: "Apply for Job", employerDetails: "Employer Details",
//     employer: "Employer", location: "Location", cnic: "CNIC",
//     jobLocationMap: "Job Location",
//     employerListedRate: "Employer Listed Rate",
//     yourOffer: "Your Offer (PKR)", aboveRate: "above listed rate",
//     belowRate: "below listed rate", matchingRate: "Matching employer's listed rate",
//     submitApp: "Submit Application",
//     newJobRequest: "New Job Request", employerOffer: "EMPLOYER OFFER",
//     acceptJob: "Accept Job", declineJob: "Decline",
//     counterOffer: "Counter Offer", sendCounter: "Send Counter",
//     offerSent: "Counter Offer Sent! Waiting for employer...",
//     yourOfferWas: "Your counter offer:", counterReceived: "EMPLOYER COUNTER OFFER",
//     yourOfferWasLabel: "Your offer was",
//     accept: "Accept", reject: "Reject",
//     jobConfirmed: "Job Confirmed! 🎉", jobConfirmedDesc: "Get ready to go to the job site",
//     viewJobDetails: "View Job Details",
//     offerRejected: "Not Selected", offerRejectedDesc: "The employer chose another worker",
//     close: "Close",
//     dismissed: "Request Dismissed", dismissedDesc: "The employer dismissed your acceptance",
//     postAvailTitle: "Post Your Availability",
//     skillLabel: "Your Skill/Trade", skillPlaceholder: "e.g., Electrician, Plumber",
//     expLabel: "Years of Experience", expPlaceholder: "e.g., 5 years",
//     rateLabel: "Hourly Rate (PKR)", ratePlaceholder: "e.g., 500",
//     locLabel: "Your Location", locPlaceholder: "e.g., Karachi, Lahore",
//     descLabel: "Description", descPlaceholder: "Describe your skills...",
//     postBtn: "Post Availability", cancelBtn: "Cancel",
//     swalEnterPrice: "Enter a price", swalEnterPriceText: "Please enter a counter price.",
//     swalPosted: "Posted! ✅", swalPostedText: "Availability updated.",
//     swalError: "Error", swalErrorText: "Failed to post.",
//     swalSavedLocally: "Saved Locally", swalSavedLocallyText: "Saved locally.",
//     swalAppSent: "Application Sent! 🎉", swalAppSentText: "Submitted. We'll notify you.",
//     swalOops: "Oops!", swalAlreadyApplied: "You may have already applied.",
//     swalAccepted: "🎉 Job Confirmed!", swalAcceptedText: "The employer confirmed your acceptance!",
//     swalRejected: "Not Selected", swalRejectedText: "The employer chose another worker.",
//     swalRejectCounter: "Reject Counter?", swalRejectCounterText: "Are you sure?",
//     swalYesReject: "Yes, Reject", swalGoBack: "Go Back",
//     swalLogout: "Logout?", swalLogoutText: "Are you sure?",
//     swalYesLogout: "Yes, Logout", swalViewJob: "View Job",
//     swalGreat: "Great!", langToggle: "اردو",
//     optionalCounter: "Enter counter price (Rs.)...",
//     counterNote: "Propose a different price instead",
//     swalCounterReceived: "💬 Counter Offer!",
//     swalCounterReceivedText: "Check the popup to respond.",
//     aiFilterPlaceholder: "e.g. Electrician in Lahore under 2000, urgent",
//     aiFilterBtn: "Apply Filter",
//     aiFiltering: "Finding jobs...",
//     activeFilters: "Active Filters",
//     clearFilters: "Clear",
//     noJobsFound: "No jobs found",
//     noJobsFoundSub: "Try a different search or clear filters",
//     allJobs: "All Jobs",
//   },
//   ur: {
//     dir: "rtl", brand: "روزگار ہب", role: "ورکر",
//     navRequests: "نوکری کی درخواستیں", navApplied: "میری درخواستیں",
//     navBrowse: "نوکریاں دیکھیں", navAvail: "دستیابی پوسٹ کریں",
//     logout: "لاگ آؤٹ", online: "آن لائن",
//     headerRequests: "آنے والی درخواستیں", headerApplied: "میری درخواستیں",
//     headerBrowse: "نوکریاں دیکھیں", welcomeBack: "خوش آمدید",
//     waitingTitle: "نوکری کی درخواستوں کا انتظار ہے...",
//     waitingDesc: "جب آپ کے علاقے میں کوئی نوکری پوسٹ ہوگی، خود بخود آجائے گی۔",
//     incomingTitle: "نئی درخواست آ رہی ہے!", incomingDesc: "پاپ اپ میں جواب دیں۔",
//     recentNotifs: "حالیہ اطلاعات",
//     noApps: "ابھی کوئی درخواست نہیں۔",
//     appliedOn: "درخواست دی", recently: "حال ہی میں", pending: "زیر التواء", shortlisted: "منتخب",
//     applyNow: "ابھی درخواست دیں",
//     applyFor: "نوکری کے لیے درخواست", employerDetails: "آجر کی تفصیلات",
//     employer: "آجر", location: "مقام", cnic: "شناختی کارڈ",
//     jobLocationMap: "نقشے پر کام کی جگہ",
//     employerListedRate: "آجر کی مقررہ شرح",
//     yourOffer: "آپ کی پیشکش (روپے)", aboveRate: "مقررہ شرح سے زیادہ",
//     belowRate: "مقررہ شرح سے کم", matchingRate: "آجر کی مقررہ شرح کے برابر",
//     submitApp: "درخواست جمع کریں",
//     newJobRequest: "نئی نوکری کی درخواست", employerOffer: "آجر کی پیشکش",
//     acceptJob: "نوکری قبول کریں", declineJob: "رد کریں",
//     counterOffer: "جوابی پیشکش", sendCounter: "بھیجیں",
//     offerSent: "جوابی پیشکش بھیج دی گئی!",
//     yourOfferWas: "آپ کی جوابی پیشکش:", counterReceived: "آجر کی جوابی پیشکش",
//     yourOfferWasLabel: "آپ کی پیشکش تھی",
//     accept: "قبول کریں", reject: "رد کریں",
//     jobConfirmed: "نوکری کی تصدیق! 🎉", jobConfirmedDesc: "کام کی جگہ پر جانے کے لیے تیار ہوں",
//     viewJobDetails: "نوکری کی تفصیلات دیکھیں",
//     offerRejected: "منتخب نہیں ہوئے", offerRejectedDesc: "آجر نے دوسرا ورکر منتخب کیا",
//     close: "بند کریں",
//     dismissed: "درخواست واپس", dismissedDesc: "آجر نے آپ کی قبولیت رد کر دی",
//     postAvailTitle: "اپنی دستیابی پوسٹ کریں",
//     skillLabel: "آپ کی مہارت", skillPlaceholder: "مثلاً: الیکٹریشن، پلمبر",
//     expLabel: "تجربے کے سال", expPlaceholder: "مثلاً: ۵ سال",
//     rateLabel: "فی گھنٹہ اجرت (روپے)", ratePlaceholder: "مثلاً: ۵۰۰",
//     locLabel: "آپ کا مقام", locPlaceholder: "مثلاً: کراچی، لاہور",
//     descLabel: "تفصیل", descPlaceholder: "اپنی مہارتیں بیان کریں...",
//     postBtn: "دستیابی پوسٹ کریں", cancelBtn: "منسوخ کریں",
//     swalEnterPrice: "قیمت درج کریں", swalEnterPriceText: "جوابی قیمت درج کریں۔",
//     swalPosted: "پوسٹ ہو گئی! ✅", swalPostedText: "دستیابی اپڈیٹ ہو گئی۔",
//     swalError: "خرابی", swalErrorText: "پوسٹ کرنے میں ناکامی۔",
//     swalSavedLocally: "مقامی طور پر محفوظ", swalSavedLocallyText: "مقامی طور پر محفوظ کیا گیا۔",
//     swalAppSent: "درخواست بھیج دی! 🎉", swalAppSentText: "جمع ہو گئی۔",
//     swalOops: "افسوس!", swalAlreadyApplied: "شاید پہلے ہی درخواست دے چکے ہیں۔",
//     swalAccepted: "🎉 نوکری کی تصدیق!", swalAcceptedText: "آجر نے آپ کو منتخب کر لیا!",
//     swalRejected: "منتخب نہیں ہوئے", swalRejectedText: "آجر نے دوسرا ورکر منتخب کیا۔",
//     swalRejectCounter: "جوابی پیشکش رد کریں؟", swalRejectCounterText: "کیا آپ واقعی؟",
//     swalYesReject: "ہاں، رد کریں", swalGoBack: "واپس جائیں",
//     swalLogout: "لاگ آؤٹ؟", swalLogoutText: "کیا آپ واقعی؟",
//     swalYesLogout: "ہاں، لاگ آؤٹ", swalViewJob: "نوکری دیکھیں",
//     swalGreat: "بہت اچھا!", langToggle: "English",
//     optionalCounter: "جوابی قیمت درج کریں (روپے)...",
//     counterNote: "مختلف قیمت تجویز کریں",
//     swalCounterReceived: "💬 جوابی پیشکش!",
//     swalCounterReceivedText: "پاپ اپ چیک کریں۔",
//     aiFilterPlaceholder: "مثلاً: لاہور میں الیکٹریشن، ۲۰۰۰ سے کم، فوری",
//     aiFilterBtn: "AI سے تلاش کریں",
//     aiFiltering: "نوکریاں ڈھونڈ رہے ہیں...",
//     activeFilters: "فعال فلٹر",
//     clearFilters: "صاف کریں",
//     noJobsFound: "کوئی نوکری نہیں ملی",
//     noJobsFoundSub: "مختلف تلاش کریں یا فلٹر صاف کریں",
//     allJobs: "تمام نوکریاں",
//   }
// };

// const socket = io("http://localhost:5000");
// if (typeof window !== "undefined") window._rozgarSocket = socket;

// export default function WorkerDashboard() {
//   const [lang, setLang] = useState("en");
//   const t = T[lang];

//   const [user, setUser] = useState(null);
//   const [activeTab, setActiveTab] = useState("requests");
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const [incomingRequest, setIncomingRequest] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);
//   const [popupTimer, setPopupTimer] = useState(30);
//   const timerRef = useRef(null);

//   const [popupState, setPopupState] = useState(null);
//   const [counterPrice, setCounterPrice] = useState("");
//   const [employerCounter, setEmployerCounter] = useState(null);

//   const [showApplyModal, setShowApplyModal] = useState(false);
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [offeredRate, setOfferedRate] = useState("");

//   const [appliedJobs, setAppliedJobs] = useState([]);
//   const [notifications, setNotifications] = useState([]);

//   const [showAvailModal, setShowAvailModal] = useState(false);
//   const [availability, setAvailability] = useState({
//     skill: "", experience: "", hourlyRate: "", location: "", description: "", status: "available"
//   });

//   const swal = (opts) => typeof window !== "undefined" && window.Swal && window.Swal.fire(opts);

//   useEffect(() => {
//     if (document.getElementById("swal-cdn")) return;
//     const link = document.createElement("link");
//     link.rel = "stylesheet";
//     link.href = "https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css";
//     document.head.appendChild(link);
//     const script = document.createElement("script");
//     script.id = "swal-cdn";
//     script.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
//     document.head.appendChild(script);
//   }, []);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       const u = JSON.parse(storedUser);
//       setUser(u);
//       socket.emit("join", u.id);
//       socket.emit("worker_online", { workerId: u.id, name: u.name });
//       fetch(`http://localhost:5000/api/applications/${u.id}`)
//         .then(r => r.json()).then(setAppliedJobs).catch(() => {});
//     }
//   }, []);

//   useEffect(() => {
//     socket.on("new_job_request", (data) => {
//       setIncomingRequest(data);
//       setCounterPrice(data.offeredPrice || "");
//       setPopupState(null);
//       setShowPopup(true);
//       setPopupTimer(30);
//       addNotif(`📍 New job: ${data.title}`);
//     });

//     socket.on("employer_confirm_worker", () => {
//       setPopupState("confirmed");
//       addNotif("🎉 " + t.swalAcceptedText);
//       swal({ title: t.swalAccepted, text: t.swalAcceptedText, icon: "success", confirmButtonColor: "#16a34a" });
//     });

//     socket.on("employer_dismiss_worker", () => {
//       setPopupState("dismissed");
//       addNotif("❌ " + t.dismissedDesc);
//     });

//     socket.on("employer_accepted", () => {
//       setPopupState("confirmed");
//       swal({ title: t.swalAccepted, text: t.swalAcceptedText, icon: "success", confirmButtonColor: "#16a34a" });
//     });

//     socket.on("employer_rejected", (data) => {
//       if (data.workerId === user?.id) {
//         setPopupState("rejected");
//       }
//     });

//     socket.on("employer_counter", (data) => {
//       if (data.workerId === user?.id) {
//         setEmployerCounter(data);
//         setPopupState("counter_received");
//         swal({ title: t.swalCounterReceived, html: `<strong>Rs. ${data.price}</strong>`, icon: "info", confirmButtonColor: "#3b82f6" });
//       }
//     });

//     socket.on("request_taken", (data) => {
//       if (incomingRequest?.requestId === data.requestId && popupState !== "confirmed") {
//         setPopupState("rejected");
//       }
//     });

//     return () => {
//       socket.off("new_job_request");
//       socket.off("employer_confirm_worker");
//       socket.off("employer_dismiss_worker");
//       socket.off("employer_accepted");
//       socket.off("employer_rejected");
//       socket.off("employer_counter");
//       socket.off("request_taken");
//     };
//   }, [user, incomingRequest, popupState, lang]);

//   useEffect(() => {
//     if (showPopup && popupState === null) {
//       setPopupTimer(30);
//       timerRef.current = setInterval(() => {
//         setPopupTimer(prev => {
//           if (prev <= 1) { clearInterval(timerRef.current); dismissPopup(); return 0; }
//           return prev - 1;
//         });
//       }, 1000);
//     } else {
//       clearInterval(timerRef.current);
//     }
//     return () => clearInterval(timerRef.current);
//   }, [showPopup, popupState]);

//   const addNotif = (msg) => setNotifications(p => [...p, { id: Date.now(), msg }]);

//   const dismissPopup = () => {
//     setShowPopup(false);
//     setIncomingRequest(null);
//     setPopupState(null);
//     setCounterPrice("");
//     setEmployerCounter(null);
//   };

//   const handleAcceptJob = () => {
//     socket.emit("worker_job_accept", {
//       requestId: incomingRequest.requestId,
//       employerId: incomingRequest.employerId,
//       workerId: user.id,
//       workerName: user.name,
//       workerRating: "4.8",
//       workerPhone: user.phone || "",
//     });
//     setPopupState("accepted_waiting");
//   };

//   const handleDeclineJob = () => {
//     socket.emit("worker_job_decline", { requestId: incomingRequest.requestId, workerId: user.id });
//     dismissPopup();
//   };

//   const handleSendCounter = () => {
//     if (!counterPrice) {
//       swal({ title: t.swalEnterPrice, text: t.swalEnterPriceText, icon: "warning", confirmButtonColor: "#f59e0b" });
//       return;
//     }
//     socket.emit("worker_offer", {
//       requestId: incomingRequest.requestId,
//       employerId: incomingRequest.employerId,
//       workerId: user.id,
//       workerName: user.name,
//       price: counterPrice,
//       rating: "4.8",
//       phone: user.phone,
//     });
//     setPopupState("counter_sent");
//   };

//   const handleAcceptEmployerCounter = () => {
//     socket.emit("worker_accepted", {
//       requestId: incomingRequest.requestId,
//       employerId: incomingRequest.employerId,
//       workerId: user.id,
//       workerName: user.name,
//       price: employerCounter.price,
//       phone: user.phone,
//     });
//     setPopupState("confirmed");
//   };

//   const handleRejectEmployerCounter = () => {
//     swal({
//       title: t.swalRejectCounter, text: t.swalRejectCounterText, icon: "warning",
//       showCancelButton: true, confirmButtonColor: "#ef4444", cancelButtonColor: "#6b7280",
//       confirmButtonText: t.swalYesReject, cancelButtonText: t.swalGoBack
//     }).then(r => {
//       if (r.isConfirmed) {
//         socket.emit("worker_rejected_counter", {
//           requestId: incomingRequest.requestId,
//           employerId: incomingRequest.employerId,
//           workerId: user.id,
//         });
//         dismissPopup();
//       }
//     });
//   };

//   const handlePostAvailability = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("http://localhost:5000/api/workers", {
//         method: "POST", headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...availability, worker: user.id })
//       });
//       setShowAvailModal(false);
//       res.ok
//         ? swal({ title: t.swalPosted, text: t.swalPostedText, icon: "success", confirmButtonColor: "#16a34a" })
//         : swal({ title: t.swalError, text: t.swalErrorText, icon: "error", confirmButtonColor: "#ef4444" });
//     } catch (_) {
//       setShowAvailModal(false);
//       swal({ title: t.swalSavedLocally, text: t.swalSavedLocallyText, icon: "info", confirmButtonColor: "#3b82f6" });
//     }
//   };

//   const handleApplyJob = async (jobId, rate) => {
//     const res = await fetch("http://localhost:5000/api/applications", {
//       method: "POST", headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ job: jobId, worker: user.id, offeredRate: rate })
//     });
//     const data = await res.json();
//     if (!res.ok) { swal({ title: t.swalOops, text: data.error || t.swalAlreadyApplied, icon: "error", confirmButtonColor: "#ef4444" }); return; }
//     setShowApplyModal(false);
//     swal({ title: t.swalAppSent, html: `<strong>Rs. ${rate}</strong> — ${t.swalAppSentText}`, icon: "success", confirmButtonColor: "#16a34a", confirmButtonText: t.swalGreat });
//   };

//   const handleLogout = () => {
//     swal({
//       title: t.swalLogout, text: t.swalLogoutText, icon: "question",
//       showCancelButton: true, confirmButtonColor: "#ef4444", cancelButtonColor: "#6b7280",
//       confirmButtonText: t.swalYesLogout, cancelButtonText: t.swalGoBack
//     }).then(r => { if (r.isConfirmed) { localStorage.removeItem("user"); window.location.href = "/login"; } });
//   };

//   if (!user) return (
//     <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #064e3b 0%, #065f46 100%)" }}>
//       <div style={{ textAlign: "center", color: "#fff" }}>
//         <div style={{ width: 56, height: 56, border: "4px solid #34d399", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto" }} />
//       </div>
//       <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
//     </div>
//   );

//   return (
//     <div dir={t.dir} style={{ minHeight: "100vh", display: "flex", background: "#f0f4f8", fontFamily: lang === "ur" ? "'Noto Nastaliq Urdu', serif" : "'Segoe UI', sans-serif" }}>

//       {/* ── InDrive Popup ── */}
//       {showPopup && incomingRequest && (
//         <JobRequestPopup
//           t={t} request={incomingRequest}
//           popupState={popupState} popupTimer={popupTimer}
//           counterPrice={counterPrice} setCounterPrice={setCounterPrice}
//           employerCounter={employerCounter}
//           onAcceptJob={handleAcceptJob}
//           onDeclineJob={handleDeclineJob}
//           onShowCounter={() => setPopupState("counter_input")}
//           onSendCounter={handleSendCounter}
//           onAcceptEmployerCounter={handleAcceptEmployerCounter}
//           onRejectEmployerCounter={handleRejectEmployerCounter}
//           onDismiss={dismissPopup}
//           userId={user.id}
//         />
//       )}

//       {/* ── Apply Modal ── */}
//       {showApplyModal && selectedJob && (
//         <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 24, backdropFilter: "blur(4px)" }}>
//           <div style={{ background: "#fff", borderRadius: 24, width: "100%", maxWidth: 480, boxShadow: "0 24px 60px rgba(0,0,0,0.3)", display: "flex", flexDirection: "column", maxHeight: "88vh", overflow: "hidden" }}>
//             <div style={{ background: "linear-gradient(135deg, #0f172a, #1e3a5f)", padding: "24px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
//               <div>
//                 <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, margin: 0 }}>{t.applyFor}</p>
//                 <h3 style={{ fontSize: 20, fontWeight: 800, color: "#fff", margin: "6px 0 0" }}>{selectedJob.title}</h3>
//               </div>
//               <button onClick={() => setShowApplyModal(false)} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 10, padding: 8, cursor: "pointer" }}>
//                 <X size={18} color="#fff" />
//               </button>
//             </div>

//             <div style={{ padding: 28, overflowY: "auto", flex: 1 }}>
//               <div style={{ background: "#f8fafc", border: "1.5px solid #e2e8f0", borderRadius: 14, padding: 16, marginBottom: 20 }}>
//                 <h4 style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1, margin: "0 0 12px" }}>{t.employerDetails}</h4>
//                 <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//                   <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//                     <div style={{ width: 32, height: 32, borderRadius: 8, background: "#dbeafe", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
//                       <MapPin size={16} color="#3b82f6" />
//                     </div>
//                     <div>
//                       <p style={{ fontSize: 11, color: "#94a3b8", margin: 0 }}>{t.location}</p>
//                       <p style={{ fontSize: 14, fontWeight: 600, color: "#0f172a", margin: 0 }}>{selectedJob.location}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {(selectedJob.latitude || selectedJob.lat) && (selectedJob.longitude || selectedJob.lng) ? (
//                 <div style={{ marginBottom: 20 }}>
//                   <JobMap
//                     lat={selectedJob.latitude || selectedJob.lat}
//                     lng={selectedJob.longitude || selectedJob.lng}
//                     height={200}
//                     label={t.jobLocationMap}
//                     showWorkerLocation={true}
//                     workerId={user.id}
//                     employerId={selectedJob.employer?._id || selectedJob.employer}
//                   />
//                   <p style={{ fontSize: 12, color: "#16a34a", fontWeight: 600, textAlign: "center", marginTop: 6, display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
//                     🟢 Your live location is being shared with the employer
//                   </p>
//                 </div>
//               ) : (
//                 <div style={{ background: "#f8fafc", border: "1.5px dashed #e2e8f0", borderRadius: 12, padding: 16, marginBottom: 20, textAlign: "center" }}>
//                   <p style={{ fontSize: 13, color: "#94a3b8", margin: 0 }}>📍 {selectedJob.location || "Location not specified"}</p>
//                 </div>
//               )}

//               <div style={{ background: "#f0fdf4", border: "1.5px solid #86efac", borderRadius: 12, padding: "12px 18px", marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                 <span style={{ fontSize: 13, color: "#16a34a", fontWeight: 600 }}>{t.employerListedRate}</span>
//                 <span style={{ fontSize: 20, fontWeight: 800, color: "#0f172a" }}>
//                   Rs. {String(selectedJob.salary).replace(/^Rs\.\s*/i, "")}
//                 </span>
//               </div>

//               <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, marginBottom: 24 }}>
//                 <label style={{ fontSize: 13, fontWeight: 700, color: "#374151" }}>{t.yourOffer}</label>
//                 <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//                   <button onClick={() => setOfferedRate(prev => String(Math.max(0, Number(prev) - 100)))}
//                     style={{ width: 42, height: 42, borderRadius: 10, border: "none", background: "#f1f5f9", color: "#374151", fontSize: 22, fontWeight: 700, cursor: "pointer" }}>−</button>
//                   <input type="number" value={offeredRate} onChange={e => setOfferedRate(e.target.value)}
//                     style={{ width: 130, textAlign: "center", border: "2px solid #16a34a", borderRadius: 12, padding: "10px 0", fontSize: 22, fontWeight: 800, color: "#0f172a", outline: "none" }} />
//                   <button onClick={() => setOfferedRate(prev => String(Number(prev) + 100))}
//                     style={{ width: 42, height: 42, borderRadius: 10, border: "none", background: "#f1f5f9", color: "#374151", fontSize: 22, fontWeight: 700, cursor: "pointer" }}>+</button>
//                 </div>
//                 <p style={{ fontSize: 12, color: "#94a3b8", margin: 0 }}>
//                   {Number(offeredRate) > Number(selectedJob.salary) ? `↑ Rs. ${Number(offeredRate) - Number(selectedJob.salary)} ${t.aboveRate}`
//                     : Number(offeredRate) < Number(selectedJob.salary) ? `↓ Rs. ${Number(selectedJob.salary) - Number(offeredRate)} ${t.belowRate}`
//                     : t.matchingRate}
//                 </p>
//               </div>

//               <button onClick={() => handleApplyJob(selectedJob._id, offeredRate)}
//                 style={{ width: "100%", padding: "15px", borderRadius: 14, border: "none", background: "linear-gradient(135deg, #22c55e, #16a34a)", color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 14px rgba(22,163,74,0.4)" }}>
//                 {t.submitApp}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ── Sidebar ── */}
//       <aside style={{ width: sidebarOpen ? 240 : 72, background: "linear-gradient(180deg, #064e3b 0%, #065f46 100%)", color: "#fff", display: "flex", flexDirection: "column", transition: "width 0.3s", flexShrink: 0 }}>
//         <div style={{ padding: "24px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
//           {sidebarOpen && <div><div style={{ fontSize: 20, fontWeight: 800 }}>{t.brand}</div><div style={{ fontSize: 11, opacity: 0.5, marginTop: 2 }}>{t.role}</div></div>}
//           <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", padding: 8, borderRadius: 8, cursor: "pointer" }}>
//             {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
//           </button>
//         </div>

//         <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
//           {[
//             { id: "requests", icon: Bell, label: t.navRequests },
//             { id: "applied", icon: CheckCircle, label: t.navApplied },
//             { id: "browse", icon: Briefcase, label: t.navBrowse },
//           ].map(item => (
//             <button key={item.id} onClick={() => setActiveTab(item.id)} style={{
//               display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 10, border: "none", cursor: "pointer",
//               background: activeTab === item.id ? "rgba(52,211,153,0.2)" : "transparent",
//               color: activeTab === item.id ? "#34d399" : "rgba(255,255,255,0.6)",
//               fontWeight: activeTab === item.id ? 600 : 400, fontSize: 14, transition: "all 0.2s",
//               flexDirection: t.dir === "rtl" ? "row-reverse" : "row"
//             }}>
//               <item.icon size={18} />
//               {sidebarOpen && <span>{item.label}</span>}
//             </button>
//           ))}
//           <button onClick={() => setShowAvailModal(true)} style={{
//             display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 10, border: "none", cursor: "pointer",
//             background: "rgba(251,146,60,0.2)", color: "#fb923c", fontWeight: 600, fontSize: 14, marginTop: 8,
//             flexDirection: t.dir === "rtl" ? "row-reverse" : "row"
//           }}>
//             <PlusCircle size={18} />
//             {sidebarOpen && <span>{t.navAvail}</span>}
//           </button>
//         </nav>

//         <div style={{ padding: "16px 12px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
//           {sidebarOpen && (
//             <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", marginBottom: 8 }}>
//               <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #34d399, #059669)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, flexShrink: 0 }}>
//                 {user.name?.charAt(0).toUpperCase()}
//               </div>
//               <div>
//                 <div style={{ fontSize: 13, fontWeight: 600 }}>{user.name}</div>
//                 <div style={{ fontSize: 11, opacity: 0.5 }}>{user.email}</div>
//               </div>
//             </div>
//           )}
//           <button onClick={handleLogout} style={{
//             display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 10, border: "none", cursor: "pointer", width: "100%",
//             background: "rgba(239,68,68,0.15)", color: "#f87171", fontSize: 14,
//             flexDirection: t.dir === "rtl" ? "row-reverse" : "row"
//           }}>
//             <LogOut size={16} />
//             {sidebarOpen && <span>{t.logout}</span>}
//           </button>
//         </div>
//       </aside>

//       {/* ── Main ── */}
//       <main style={{ flex: 1, overflow: "auto" }}>
//         <header style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "20px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 5 }}>
//           <div>
//             <h1 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a", margin: 0 }}>
//               {activeTab === "requests" ? t.headerRequests : activeTab === "applied" ? t.headerApplied : t.headerBrowse}
//             </h1>
//             <p style={{ fontSize: 13, color: "#64748b", margin: "4px 0 0" }}>{t.welcomeBack}, {user.name}</p>
//           </div>

//           <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//             <button onClick={() => setLang(l => l === "en" ? "ur" : "en")} style={{
//               padding: "6px 16px", borderRadius: 20, border: "2px solid #16a34a", background: "#fff",
//               color: "#16a34a", fontSize: 13, fontWeight: 700, cursor: "pointer",
//               fontFamily: lang === "en" ? "'Noto Nastaliq Urdu', serif" : "'Segoe UI', sans-serif"
//             }}>
//               {t.langToggle}
//             </button>
//             <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#dcfce7", padding: "6px 14px", borderRadius: 20 }}>
//               <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#16a34a" }} />
//               <span style={{ fontSize: 12, fontWeight: 600, color: "#16a34a" }}>{t.online}</span>
//             </div>
//             {notifications.length > 0 && (
//               <div style={{ position: "relative", cursor: "pointer" }} onClick={() => setNotifications([])}>
//                 <Bell size={20} color="#64748b" />
//                 <div style={{ position: "absolute", top: -4, right: -4, width: 16, height: 16, background: "#ef4444", borderRadius: "50%", fontSize: 10, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
//                   {notifications.length}
//                 </div>
//               </div>
//             )}
//           </div>
//         </header>

//         <div style={{ padding: "32px" }}>
//           {activeTab === "requests" && <RequestsTab t={t} notifications={notifications} showPopup={showPopup} />}
//           {activeTab === "applied" && <AppliedTab t={t} applied={appliedJobs} />}
//           {activeTab === "browse" && (
//             <BrowseTab t={t} lang={lang} userId={user.id}
//               onOpenApplyModal={(job) => { setSelectedJob(job); setOfferedRate(job.salary || ""); setShowApplyModal(true); }} />
//           )}
//         </div>
//       </main>

//       {/* ── Availability Modal ── */}
//       {showAvailModal && (
//         <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 24 }}>
//           <div style={{ background: "#fff", borderRadius: 20, padding: 32, maxWidth: 520, width: "100%", maxHeight: "90vh", overflowY: "auto" }}>
//             <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
//               <h3 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>{t.postAvailTitle}</h3>
//               <button onClick={() => setShowAvailModal(false)} style={{ background: "#f1f5f9", border: "none", borderRadius: 8, padding: 8, cursor: "pointer" }}><X size={18} /></button>
//             </div>
//             <form onSubmit={handlePostAvailability} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
//               {[
//                 { key: "skill", label: t.skillLabel, placeholder: t.skillPlaceholder },
//                 { key: "experience", label: t.expLabel, placeholder: t.expPlaceholder },
//                 { key: "hourlyRate", label: t.rateLabel, placeholder: t.ratePlaceholder },
//                 { key: "location", label: t.locLabel, placeholder: t.locPlaceholder },
//               ].map(f => (
//                 <div key={f.key}>
//                   <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>{f.label}</label>
//                   <input required value={availability[f.key]} onChange={e => setAvailability({ ...availability, [f.key]: e.target.value })}
//                     placeholder={f.placeholder} style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: "1.5px solid #e2e8f0", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
//                 </div>
//               ))}
//               <div>
//                 <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>{t.descLabel}</label>
//                 <textarea required value={availability.description} onChange={e => setAvailability({ ...availability, description: e.target.value })}
//                   rows={3} placeholder={t.descPlaceholder} style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: "1.5px solid #e2e8f0", fontSize: 14, outline: "none", resize: "vertical", boxSizing: "border-box" }} />
//               </div>
//               <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
//                 <button type="submit" style={{ flex: 1, padding: 14, background: "linear-gradient(135deg, #16a34a, #059669)", color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>{t.postBtn}</button>
//                 <button type="button" onClick={() => setShowAvailModal(false)} style={{ padding: "14px 20px", background: "#f1f5f9", color: "#475569", border: "none", borderRadius: 12, fontSize: 14, cursor: "pointer" }}>{t.cancelBtn}</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       <style>{`@keyframes spin{to{transform:rotate(360deg)}} @keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}} @keyframes fadeIn{from{opacity:0}to{opacity:1}}`}</style>
//     </div>
//   );
// }

// /* ═══════════════ JOB REQUEST POPUP ═══════════════ */
// function JobRequestPopup({
//   t, request, popupState, popupTimer,
//   counterPrice, setCounterPrice, employerCounter,
//   onAcceptJob, onDeclineJob, onShowCounter, onSendCounter,
//   onAcceptEmployerCounter, onRejectEmployerCounter, onDismiss, userId
// }) {
//   const timerPct = (popupTimer / 30) * 100;
//   const isInitial = popupState === null;

//   return (
//     <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 300, padding: 24, backdropFilter: "blur(6px)" }}>
//       <div style={{ background: "#fff", borderRadius: 26, width: "100%", maxWidth: 460, boxShadow: "0 32px 80px rgba(0,0,0,0.35)", overflow: "hidden", maxHeight: "92vh", overflowY: "auto" }}>

//         {isInitial && (
//           <div style={{ height: 5, background: "#e2e8f0", overflow: "hidden" }}>
//             <div style={{ height: "100%", width: `${timerPct}%`, transition: "width 1s linear", background: timerPct > 33 ? "linear-gradient(90deg,#22c55e,#16a34a)" : "linear-gradient(90deg,#ef4444,#dc2626)" }} />
//           </div>
//         )}

//         <div style={{ padding: 26 }}>
//           <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
//             <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//               <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#22c55e" }} />
//               <span style={{ fontSize: 12, fontWeight: 800, color: "#16a34a", textTransform: "uppercase", letterSpacing: ".08em" }}>{t.newJobRequest}</span>
//             </div>
//             <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//               {isInitial && <span style={{ fontSize: 13, fontWeight: 700, color: timerPct > 33 ? "#64748b" : "#ef4444" }}>⏱ {popupTimer}s</span>}
//               <button onClick={onDismiss} style={{ background: "#f1f5f9", border: "none", borderRadius: 8, padding: 7, cursor: "pointer" }}><X size={15} color="#64748b" /></button>
//             </div>
//           </div>

//           <div style={{ background: "linear-gradient(135deg,#0f172a,#1e3a5f)", borderRadius: 16, padding: 20, marginBottom: 16, color: "#fff" }}>
//             <h3 style={{ fontSize: 18, fontWeight: 800, margin: "0 0 8px" }}>{request.title}</h3>
//             {request.description && <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", margin: "0 0 14px", lineHeight: 1.5 }}>{request.description}</p>}
//             <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
//               {request.workLocation && (
//                 <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,.08)", borderRadius: 8, padding: "5px 10px" }}>
//                   <MapPin size={12} color="#60a5fa" />
//                   <span style={{ fontSize: 12 }}>{request.workLocation}</span>
//                 </div>
//               )}
//             </div>
//           </div>

//           {request.lat && request.lng ? (
//             <div style={{ marginBottom: 16 }}>
//               <JobMap
//                 lat={request.lat}
//                 lng={request.lng}
//                 height={180}
//                 label="Job Location"
//                 showWorkerLocation={popupState === "accepted_waiting" || popupState === "confirmed"}
//                 workerId={userId}
//                 employerId={request.employerId}
//               />
//               {(popupState === "accepted_waiting" || popupState === "confirmed") && (
//                 <p style={{ fontSize: 11, color: "#16a34a", fontWeight: 700, textAlign: "center", marginTop: 5 }}>
//                   🟢 Your live location is being shared with employer
//                 </p>
//               )}
//             </div>
//           ) : (
//             request.workLocation && (
//               <div style={{ background: "#f8fafc", borderRadius: 10, padding: "10px 14px", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
//                 <MapPin size={14} color="#64748b" />
//                 <span style={{ fontSize: 13, color: "#475569" }}>{request.workLocation}</span>
//               </div>
//             )
//           )}

//           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, padding: "14px 18px", background: "#f0fdf4", borderRadius: 12, border: "1.5px solid #86efac" }}>
//             <div>
//               <div style={{ fontSize: 11, color: "#16a34a", fontWeight: 700, marginBottom: 2 }}>{t.employerOffer}</div>
//               <div style={{ fontSize: 26, fontWeight: 900, color: "#0f172a" }}>Rs. {request.offeredPrice || "Open"}</div>
//             </div>
//             <div style={{ textAlign: "right" }}>
//               <div style={{ fontSize: 13, fontWeight: 700 }}>{request.employerName}</div>
//               <div style={{ fontSize: 11, color: "#64748b" }}>{request.category}</div>
//             </div>
//           </div>

//           {isInitial && (
//             <>
//               <div style={{ display: "flex", gap: 10, marginBottom: 0 }}>
//                 <button onClick={onAcceptJob} style={{ flex: 2, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px", borderRadius: 13, border: "none", background: "linear-gradient(135deg,#22c55e,#16a34a)", color: "#fff", fontSize: 15, fontWeight: 800, cursor: "pointer", boxShadow: "0 4px 16px rgba(34,197,94,.35)" }}>
//                   <ThumbsUp size={17} /> {t.acceptJob}
//                 </button>
//                 <button onClick={onDeclineJob} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "14px", borderRadius: 13, border: "1.5px solid #fecaca", background: "#fef2f2", color: "#ef4444", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
//                   <ThumbsDown size={15} /> {t.declineJob}
//                 </button>
//               </div>
//               <button onClick={onShowCounter} style={{ width: "100%", marginTop: 10, padding: "11px", borderRadius: 11, border: "1.5px solid #e2e8f0", background: "#f8fafc", color: "#475569", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
//                 <MessageSquare size={14} /> {t.counterNote}
//               </button>
//             </>
//           )}

//           {popupState === "counter_input" && (
//             <div>
//               <label style={{ fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 8 }}>{t.counterOffer}</label>
//               <div style={{ display: "flex", gap: 8 }}>
//                 <input type="number" value={counterPrice} onChange={e => setCounterPrice(e.target.value)}
//                   placeholder={t.optionalCounter} autoFocus
//                   style={{ flex: 1, padding: "13px 14px", borderRadius: 11, border: "1.5px solid #e2e8f0", fontSize: 14, outline: "none" }} />
//                 <button onClick={onSendCounter} style={{ padding: "13px 18px", borderRadius: 11, border: "none", background: "linear-gradient(135deg,#3b82f6,#2563eb)", color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
//                   {t.sendCounter}
//                 </button>
//               </div>
//               <button onClick={onDeclineJob} style={{ marginTop: 10, width: "100%", padding: "11px", borderRadius: 11, border: "1.5px solid #fecaca", background: "#fef2f2", color: "#ef4444", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
//                 {t.declineJob}
//               </button>
//             </div>
//           )}

//           {popupState === "accepted_waiting" && (
//             <div style={{ textAlign: "center", padding: "8px 0" }}>
//               <div style={{ width: 52, height: 52, border: "4px solid #dcfce7", borderTopColor: "#16a34a", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
//               <p style={{ fontWeight: 700, color: "#0f172a", fontSize: 15, marginBottom: 4 }}>✅ Request Accepted!</p>
//               <p style={{ fontSize: 13, color: "#64748b" }}>Waiting for employer to confirm you...</p>
//             </div>
//           )}

//           {popupState === "counter_sent" && (
//             <div style={{ textAlign: "center", padding: "8px 0" }}>
//               <div style={{ width: 52, height: 52, border: "4px solid #dbeafe", borderTopColor: "#3b82f6", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
//               <p style={{ fontWeight: 700, color: "#0f172a", fontSize: 15, marginBottom: 4 }}>{t.offerSent}</p>
//               <p style={{ fontSize: 13, color: "#64748b" }}>{t.yourOfferWas} Rs. {counterPrice}</p>
//             </div>
//           )}

//           {popupState === "counter_received" && employerCounter && (
//             <div>
//               <div style={{ background: "#fef3c7", borderRadius: 12, padding: 16, marginBottom: 14, border: "1.5px solid #fcd34d" }}>
//                 <div style={{ fontSize: 12, fontWeight: 700, color: "#d97706", marginBottom: 4 }}>{t.counterReceived}</div>
//                 <div style={{ fontSize: 26, fontWeight: 900, color: "#0f172a", marginBottom: 2 }}>Rs. {employerCounter.price}</div>
//                 <div style={{ fontSize: 12, color: "#64748b" }}>{t.yourOfferWasLabel} Rs. {counterPrice}</div>
//               </div>
//               <div style={{ display: "flex", gap: 10 }}>
//                 <button onClick={onAcceptEmployerCounter} style={{ flex: 1, padding: 13, borderRadius: 12, border: "none", background: "linear-gradient(135deg,#22c55e,#16a34a)", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
//                   {t.accept} Rs. {employerCounter.price}
//                 </button>
//                 <button onClick={onRejectEmployerCounter} style={{ padding: "13px 16px", borderRadius: 12, border: "none", background: "#fef2f2", color: "#ef4444", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
//                   {t.reject}
//                 </button>
//               </div>
//             </div>
//           )}

//           {popupState === "confirmed" && (
//             <div style={{ textAlign: "center", padding: "12px 0" }}>
//               <div style={{ fontSize: 52, marginBottom: 10 }}>🎉</div>
//               <h3 style={{ fontSize: 20, fontWeight: 800, color: "#0f172a", marginBottom: 6 }}>{t.jobConfirmed}</h3>
//               <p style={{ fontSize: 13, color: "#64748b", marginBottom: 20 }}>{t.jobConfirmedDesc}</p>
//               <button onClick={onDismiss} style={{ padding: "12px 32px", background: "linear-gradient(135deg,#22c55e,#16a34a)", color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
//                 {t.viewJobDetails}
//               </button>
//             </div>
//           )}

//           {popupState === "rejected" && (
//             <div style={{ textAlign: "center", padding: "12px 0" }}>
//               <div style={{ fontSize: 42, marginBottom: 10 }}>😔</div>
//               <p style={{ fontWeight: 700, color: "#0f172a", fontSize: 15, marginBottom: 4 }}>{t.offerRejected}</p>
//               <p style={{ fontSize: 13, color: "#64748b", marginBottom: 16 }}>{t.offerRejectedDesc}</p>
//               <button onClick={onDismiss} style={{ padding: "10px 28px", background: "#f1f5f9", color: "#475569", border: "none", borderRadius: 12, fontSize: 14, cursor: "pointer" }}>{t.close}</button>
//             </div>
//           )}

//           {popupState === "dismissed" && (
//             <div style={{ textAlign: "center", padding: "12px 0" }}>
//               <div style={{ fontSize: 36, marginBottom: 10 }}>🔄</div>
//               <p style={{ fontWeight: 700, color: "#0f172a", fontSize: 15, marginBottom: 4 }}>{t.dismissed}</p>
//               <p style={{ fontSize: 13, color: "#64748b", marginBottom: 16 }}>{t.dismissedDesc}</p>
//               <button onClick={onDismiss} style={{ padding: "10px 28px", background: "#f1f5f9", color: "#475569", border: "none", borderRadius: 12, fontSize: 14, cursor: "pointer" }}>{t.close}</button>
//             </div>
//           )}
//         </div>
//       </div>
//       <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
//     </div>
//   );
// }

// /* ═══════════════ TABS ═══════════════ */
// function RequestsTab({ t, notifications, showPopup }) {
//   return (
//     <div style={{ maxWidth: 600, margin: "0 auto" }}>
//       <div style={{ background: "#fff", borderRadius: 20, padding: 40, textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
//         <div style={{ width: 80, height: 80, borderRadius: "50%", background: showPopup ? "linear-gradient(135deg,#22c55e,#16a34a)" : "linear-gradient(135deg,#e2e8f0,#cbd5e1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 32 }}>
//           {showPopup ? "📩" : "📭"}
//         </div>
//         <h3 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>{showPopup ? t.incomingTitle : t.waitingTitle}</h3>
//         <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6 }}>{showPopup ? t.incomingDesc : t.waitingDesc}</p>
//         {notifications.length > 0 && (
//           <div style={{ marginTop: 24, textAlign: "left" }}>
//             <h4 style={{ fontSize: 14, fontWeight: 600, color: "#475569", marginBottom: 12 }}>{t.recentNotifs}</h4>
//             {notifications.slice(-5).reverse().map(n => (
//               <div key={n.id} style={{ padding: "10px 14px", background: "#f8fafc", borderRadius: 10, fontSize: 13, color: "#475569", marginBottom: 8 }}>{n.msg}</div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// function AppliedTab({ t, applied }) {
//   return (
//     <div style={{ maxWidth: 700, margin: "0 auto" }}>
//       {applied.length === 0 ? (
//         <div style={{ background: "#fff", borderRadius: 16, padding: 48, textAlign: "center", color: "#94a3b8" }}>
//           <CheckCircle size={40} style={{ margin: "0 auto 12px", opacity: 0.3 }} />
//           <p>{t.noApps}</p>
//         </div>
//       ) : (
//         <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
//           {applied.map(job => (
//             <div key={job._id || job.id} style={{ background: "#fff", borderRadius: 16, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                 <div>
//                   <h4 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", margin: "0 0 4px" }}>{job.title || job.job?.title}</h4>
//                   <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>{t.appliedOn} {job.appliedOn || t.recently}</p>
//                 </div>
//                 <span style={{ padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: job.status === "Shortlisted" ? "#dcfce7" : "#fef3c7", color: job.status === "Shortlisted" ? "#16a34a" : "#d97706" }}>
//                   {job.status === "Shortlisted" ? t.shortlisted : t.pending}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// // ── CHANGE: BrowseTab with AI Smart Filter ─────────────────────────────────────
// function BrowseTab({ t, lang, userId, onOpenApplyModal }) {
//   const [allJobs, setAllJobs] = useState([]);
//   const [filteredJobs, setFilteredJobs] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filtering, setFiltering] = useState(false);
//   const [activeFilters, setActiveFilters] = useState(null);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/jobs")
//       .then(r => r.json())
//       .then(data => { setAllJobs(data); setFilteredJobs(data); })
//       .catch(() => {});
//   }, []);

//   const handleAIFilter = async () => {
//     if (!searchQuery.trim()) return;
//     setFiltering(true);
//     try {
//       const res = await fetch("http://localhost:5000/api/ai/smart-filter", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ query: searchQuery })
//       });
//       const filters = await res.json();
//       setActiveFilters(filters);
//       applyFilters(filters);
//     } catch (e) {
//       console.error("Smart filter failed", e);
//     }
//     setFiltering(false);
//   };

//   const applyFilters = (filters) => {
//     let results = [...allJobs];

//     if (filters.category && filters.category !== "") {
//       results = results.filter(job =>
//         (job.category || job.type || "").toLowerCase().includes(filters.category.toLowerCase()) ||
//         (job.title || "").toLowerCase().includes(filters.category.toLowerCase())
//       );
//     }

//     if (filters.location && filters.location !== "") {
//       results = results.filter(job =>
//         (job.location || "").toLowerCase().includes(filters.location.toLowerCase())
//       );
//     }

//     if (filters.minBudget && filters.minBudget > 0) {
//       results = results.filter(job => {
//         const salary = Number(String(job.salary).replace(/[^0-9]/g, ""));
//         return salary >= filters.minBudget;
//       });
//     }

//     if (filters.maxBudget && filters.maxBudget > 0) {
//       results = results.filter(job => {
//         const salary = Number(String(job.salary).replace(/[^0-9]/g, ""));
//         return salary <= filters.maxBudget;
//       });
//     }

//     if (filters.urgency && filters.urgency !== "") {
//       results = results.filter(job =>
//         (job.urgency || "").toLowerCase() === filters.urgency.toLowerCase()
//       );
//     }

//     if (filters.keywords && filters.keywords.length > 0) {
//       results = results.filter(job =>
//         filters.keywords.some(kw =>
//           (job.title || "").toLowerCase().includes(kw.toLowerCase()) ||
//           (job.description || "").toLowerCase().includes(kw.toLowerCase())
//         )
//       );
//     }

//     setFilteredJobs(results);
//   };

//   const clearFilters = () => {
//     setActiveFilters(null);
//     setFilteredJobs(allJobs);
//     setSearchQuery("");
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") handleAIFilter();
//   };

//   return (
//     <div style={{ maxWidth: 700, margin: "0 auto" }}>

//       {/* AI Search Bar */}
//       <div style={{ background: "#fff", borderRadius: 16, padding: 20, marginBottom: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
//         <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
//           <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, background: "#f8fafc", border: "1.5px solid #e2e8f0", borderRadius: 12, padding: "10px 14px" }}>
//             <SlidersHorizontal size={16} color="#6366f1" />
//             <input
//               value={searchQuery}
//               onChange={e => setSearchQuery(e.target.value)}
//               onKeyDown={handleKeyDown}
//               placeholder={t.aiFilterPlaceholder}
//               style={{ flex: 1, border: "none", background: "transparent", fontSize: 14, outline: "none", color: "#0f172a", fontFamily: lang === "ur" ? "'Noto Nastaliq Urdu', serif" : "'Segoe UI', sans-serif" }}
//             />
//             {searchQuery && (
//               <button onClick={clearFilters} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontSize: 16, lineHeight: 1 }}>×</button>
//             )}
//           </div>
//           <button
//             onClick={handleAIFilter}
//             disabled={filtering || !searchQuery.trim()}
//             style={{
//               display: "flex", alignItems: "center", gap: 6,
//               padding: "11px 18px", borderRadius: 12, border: "none",
//               background: filtering || !searchQuery.trim() ? "#e2e8f0" : "linear-gradient(135deg,#6366f1,#8b5cf6)",
//               color: filtering || !searchQuery.trim() ? "#94a3b8" : "#fff",
//               fontSize: 13, fontWeight: 700, cursor: filtering || !searchQuery.trim() ? "not-allowed" : "pointer",
//               whiteSpace: "nowrap", transition: "all 0.2s",
//               fontFamily: lang === "ur" ? "'Noto Nastaliq Urdu', serif" : "'Segoe UI', sans-serif",
//             }}>
//             <Search size={14} />
//             {filtering ? t.aiFiltering : t.aiFilterBtn}
//           </button>
//         </div>

//         {/* Active Filter Chips */}
//         {activeFilters && (
//           <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
//             <span style={{ fontSize: 11, fontWeight: 700, color: "#6366f1", textTransform: "uppercase", letterSpacing: ".06em" }}>{t.activeFilters}:</span>
//             {activeFilters.category && <FilterChip label={`📂 ${activeFilters.category}`} />}
//             {activeFilters.location && <FilterChip label={`📍 ${activeFilters.location}`} />}
//             {activeFilters.minBudget > 0 && <FilterChip label={`💰 Rs. ${activeFilters.minBudget}+`} />}
//             {activeFilters.maxBudget > 0 && <FilterChip label={`💰 Max Rs. ${activeFilters.maxBudget}`} />}
//             {activeFilters.urgency && <FilterChip label={`⚡ ${activeFilters.urgency}`} />}
//             {activeFilters.keywords?.map(k => <FilterChip key={k} label={`🔍 ${k}`} />)}
//             <button onClick={clearFilters} style={{ fontSize: 12, color: "#ef4444", fontWeight: 600, background: "#fef2f2", border: "none", borderRadius: 20, padding: "3px 10px", cursor: "pointer" }}>
//               {t.clearFilters}
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Results count */}
//       {activeFilters && (
//         <p style={{ fontSize: 13, color: "#64748b", marginBottom: 12, fontWeight: 500 }}>
//           {filteredJobs.length} {filteredJobs.length === 1 ? "job" : "jobs"} found
//         </p>
//       )}

//       {/* Job Cards */}
//       <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
//         {filteredJobs.length === 0 ? (
//           <div style={{ background: "#fff", borderRadius: 16, padding: 48, textAlign: "center", color: "#94a3b8", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
//             <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
//             <p style={{ fontWeight: 700, fontSize: 15, color: "#475569", marginBottom: 4 }}>{t.noJobsFound}</p>
//             <p style={{ fontSize: 13 }}>{t.noJobsFoundSub}</p>
//           </div>
//         ) : (
//           filteredJobs.map(job => (
//             <div key={job._id} style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
//               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
//                 <div>
//                   <h4 style={{ fontSize: 17, fontWeight: 700, color: "#0f172a", margin: "0 0 4px" }}>{job.title}</h4>
//                   <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>{job.employer?.name}</p>
//                 </div>
//                 <span style={{ background: "#eff6ff", color: "#3b82f6", padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{job.type}</span>
//               </div>
//               <p style={{ fontSize: 14, color: "#475569", marginBottom: 14, lineHeight: 1.5 }}>{job.description}</p>
//               <div style={{ display: "flex", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
//                 <span style={{ fontSize: 13, color: "#64748b", display: "flex", alignItems: "center", gap: 4 }}><MapPin size={14} />{job.location}</span>
//                 <span style={{ fontSize: 13, color: "#64748b", display: "flex", alignItems: "center", gap: 4 }}><DollarSign size={14} />Rs. {job.salary}</span>
//                 {job.urgency && (
//                   <span style={{ fontSize: 12, color: "#f59e0b", fontWeight: 600, background: "#fef3c7", padding: "2px 10px", borderRadius: 20 }}>⚡ {job.urgency}</span>
//                 )}
//               </div>
//               <button onClick={() => onOpenApplyModal(job)} style={{ width: "100%", padding: 12, background: "linear-gradient(135deg,#16a34a,#059669)", color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
//                 {t.applyNow}
//               </button>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// function FilterChip({ label }) {
//   return (
//     <span style={{ background: "#f0f0fe", color: "#4f46e5", fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 20, border: "1px solid #e0e0fc" }}>
//       {label}
//     </span>
//   );
// }


"use client";
import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import dynamic from "next/dynamic";
import {
  Briefcase, CheckCircle, LogOut, Menu, X,
  MapPin, DollarSign, Bell, PlusCircle,
  ThumbsUp, ThumbsDown, MessageSquare, Search, SlidersHorizontal
} from "lucide-react";

const JobMap = dynamic(() => import("@/components/JobMap"), { ssr: false });

const T = {
  en: {
    dir: "ltr", brand: "RozgarHub", role: "WORKER",
    navRequests: "Job Requests", navApplied: "My Applications",
    navBrowse: "Browse Jobs", navAvail: "Post Availability",
    logout: "Logout", online: "Online",
    headerRequests: "Incoming Requests", headerApplied: "My Applications",
    headerBrowse: "Browse Jobs", welcomeBack: "Welcome back",
    waitingTitle: "Waiting for job requests...",
    waitingDesc: "When an employer posts a job in your area, it will pop up automatically.",
    incomingTitle: "New request incoming!", incomingDesc: "Check the popup to respond.",
    recentNotifs: "Recent Notifications",
    noApps: "No applications yet.",
    appliedOn: "Applied", recently: "recently", pending: "Pending", shortlisted: "Shortlisted",
    applyNow: "Apply Now",
    applyFor: "Apply for Job", employerDetails: "Employer Details",
    employer: "Employer", location: "Location", cnic: "CNIC",
    jobLocationMap: "Job Location",
    employerListedRate: "Employer Listed Rate",
    yourOffer: "Your Offer (PKR)", aboveRate: "above listed rate",
    belowRate: "below listed rate", matchingRate: "Matching employer's listed rate",
    submitApp: "Submit Application",
    newJobRequest: "New Job Request", employerOffer: "EMPLOYER OFFER",
    acceptJob: "Accept Job", declineJob: "Decline",
    counterOffer: "Counter Offer", sendCounter: "Send Counter",
    offerSent: "Counter Offer Sent! Waiting for employer...",
    yourOfferWas: "Your counter offer:", counterReceived: "EMPLOYER COUNTER OFFER",
    yourOfferWasLabel: "Your offer was",
    accept: "Accept", reject: "Reject",
    jobConfirmed: "Job Confirmed! 🎉", jobConfirmedDesc: "Get ready to go to the job site",
    viewJobDetails: "View Job Details",
    offerRejected: "Not Selected", offerRejectedDesc: "The employer chose another worker",
    close: "Close",
    dismissed: "Request Dismissed", dismissedDesc: "The employer dismissed your acceptance",
    postAvailTitle: "Post Your Availability",
    skillLabel: "Your Skill/Trade", skillPlaceholder: "e.g., Electrician, Plumber",
    expLabel: "Years of Experience", expPlaceholder: "e.g., 5 years",
    rateLabel: "Hourly Rate (PKR)", ratePlaceholder: "e.g., 500",
    locLabel: "Your Location", locPlaceholder: "e.g., Karachi, Lahore",
    descLabel: "Description", descPlaceholder: "Describe your skills...",
    postBtn: "Post Availability", cancelBtn: "Cancel",
    swalEnterPrice: "Enter a price", swalEnterPriceText: "Please enter a counter price.",
    swalPosted: "Posted! ✅", swalPostedText: "Availability updated.",
    swalError: "Error", swalErrorText: "Failed to post.",
    swalSavedLocally: "Saved Locally", swalSavedLocallyText: "Saved locally.",
    swalAppSent: "Application Sent! 🎉", swalAppSentText: "Submitted. We'll notify you.",
    swalOops: "Oops!", swalAlreadyApplied: "You may have already applied.",
    swalAccepted: "🎉 Job Confirmed!", swalAcceptedText: "The employer confirmed your acceptance!",
    swalRejected: "Not Selected", swalRejectedText: "The employer chose another worker.",
    swalRejectCounter: "Reject Counter?", swalRejectCounterText: "Are you sure?",
    swalYesReject: "Yes, Reject", swalGoBack: "Go Back",
    swalLogout: "Logout?", swalLogoutText: "Are you sure?",
    swalYesLogout: "Yes, Logout", swalViewJob: "View Job",
    swalGreat: "Great!", langToggle: "اردو",
    optionalCounter: "Enter counter price (Rs.)...",
    counterNote: "Propose a different price instead",
    swalCounterReceived: "💬 Counter Offer!",
    swalCounterReceivedText: "Check the popup to respond.",
    aiFilterPlaceholder: "e.g. Electrician in Lahore under 2000, urgent",
    aiFilterBtn: "Apply Filter",
    aiFiltering: "Finding jobs...",
    activeFilters: "Active Filters",
    clearFilters: "Clear",
    noJobsFound: "No jobs found",
    noJobsFoundSub: "Try a different search or clear filters",
    allJobs: "All Jobs",
    profileProgress: "Profile Progress",
    profileComplete: "Profile Complete!",
    completeYourProfile: "Complete your profile to get more jobs",
    stepRegistered: "Account Registered",
    stepProfilePhoto: "Profile Photo",
    stepCnicDocs: "CNIC Documents",
    stepAvailability: "Availability Posted",
    stepLicense: "Driving License",
    stepVerified: "Admin Verified",
    tapToComplete: "Tap to complete",
  },
  ur: {
    dir: "rtl", brand: "روزگار ہب", role: "ورکر",
    navRequests: "نوکری کی درخواستیں", navApplied: "میری درخواستیں",
    navBrowse: "نوکریاں دیکھیں", navAvail: "دستیابی پوسٹ کریں",
    logout: "لاگ آؤٹ", online: "آن لائن",
    headerRequests: "آنے والی درخواستیں", headerApplied: "میری درخواستیں",
    headerBrowse: "نوکریاں دیکھیں", welcomeBack: "خوش آمدید",
    waitingTitle: "نوکری کی درخواستوں کا انتظار ہے...",
    waitingDesc: "جب آپ کے علاقے میں کوئی نوکری پوسٹ ہوگی، خود بخود آجائے گی۔",
    incomingTitle: "نئی درخواست آ رہی ہے!", incomingDesc: "پاپ اپ میں جواب دیں۔",
    recentNotifs: "حالیہ اطلاعات",
    noApps: "ابھی کوئی درخواست نہیں۔",
    appliedOn: "درخواست دی", recently: "حال ہی میں", pending: "زیر التواء", shortlisted: "منتخب",
    applyNow: "ابھی درخواست دیں",
    applyFor: "نوکری کے لیے درخواست", employerDetails: "آجر کی تفصیلات",
    employer: "آجر", location: "مقام", cnic: "شناختی کارڈ",
    jobLocationMap: "نقشے پر کام کی جگہ",
    employerListedRate: "آجر کی مقررہ شرح",
    yourOffer: "آپ کی پیشکش (روپے)", aboveRate: "مقررہ شرح سے زیادہ",
    belowRate: "مقررہ شرح سے کم", matchingRate: "آجر کی مقررہ شرح کے برابر",
    submitApp: "درخواست جمع کریں",
    newJobRequest: "نئی نوکری کی درخواست", employerOffer: "آجر کی پیشکش",
    acceptJob: "نوکری قبول کریں", declineJob: "رد کریں",
    counterOffer: "جوابی پیشکش", sendCounter: "بھیجیں",
    offerSent: "جوابی پیشکش بھیج دی گئی!",
    yourOfferWas: "آپ کی جوابی پیشکش:", counterReceived: "آجر کی جوابی پیشکش",
    yourOfferWasLabel: "آپ کی پیشکش تھی",
    accept: "قبول کریں", reject: "رد کریں",
    jobConfirmed: "نوکری کی تصدیق! 🎉", jobConfirmedDesc: "کام کی جگہ پر جانے کے لیے تیار ہوں",
    viewJobDetails: "نوکری کی تفصیلات دیکھیں",
    offerRejected: "منتخب نہیں ہوئے", offerRejectedDesc: "آجر نے دوسرا ورکر منتخب کیا",
    close: "بند کریں",
    dismissed: "درخواست واپس", dismissedDesc: "آجر نے آپ کی قبولیت رد کر دی",
    postAvailTitle: "اپنی دستیابی پوسٹ کریں",
    skillLabel: "آپ کی مہارت", skillPlaceholder: "مثلاً: الیکٹریشن، پلمبر",
    expLabel: "تجربے کے سال", expPlaceholder: "مثلاً: ۵ سال",
    rateLabel: "فی گھنٹہ اجرت (روپے)", ratePlaceholder: "مثلاً: ۵۰۰",
    locLabel: "آپ کا مقام", locPlaceholder: "مثلاً: کراچی، لاہور",
    descLabel: "تفصیل", descPlaceholder: "اپنی مہارتیں بیان کریں...",
    postBtn: "دستیابی پوسٹ کریں", cancelBtn: "منسوخ کریں",
    swalEnterPrice: "قیمت درج کریں", swalEnterPriceText: "جوابی قیمت درج کریں۔",
    swalPosted: "پوسٹ ہو گئی! ✅", swalPostedText: "دستیابی اپڈیٹ ہو گئی۔",
    swalError: "خرابی", swalErrorText: "پوسٹ کرنے میں ناکامی۔",
    swalSavedLocally: "مقامی طور پر محفوظ", swalSavedLocallyText: "مقامی طور پر محفوظ کیا گیا۔",
    swalAppSent: "درخواست بھیج دی! 🎉", swalAppSentText: "جمع ہو گئی۔",
    swalOops: "افسوس!", swalAlreadyApplied: "شاید پہلے ہی درخواست دے چکے ہیں۔",
    swalAccepted: "🎉 نوکری کی تصدیق!", swalAcceptedText: "آجر نے آپ کو منتخب کر لیا!",
    swalRejected: "منتخب نہیں ہوئے", swalRejectedText: "آجر نے دوسرا ورکر منتخب کیا۔",
    swalRejectCounter: "جوابی پیشکش رد کریں؟", swalRejectCounterText: "کیا آپ واقعی؟",
    swalYesReject: "ہاں، رد کریں", swalGoBack: "واپس جائیں",
    swalLogout: "لاگ آؤٹ؟", swalLogoutText: "کیا آپ واقعی؟",
    swalYesLogout: "ہاں، لاگ آؤٹ", swalViewJob: "نوکری دیکھیں",
    swalGreat: "بہت اچھا!", langToggle: "English",
    optionalCounter: "جوابی قیمت درج کریں (روپے)...",
    counterNote: "مختلف قیمت تجویز کریں",
    swalCounterReceived: "💬 جوابی پیشکش!",
    swalCounterReceivedText: "پاپ اپ چیک کریں۔",
    aiFilterPlaceholder: "مثلاً: لاہور میں الیکٹریشن، ۲۰۰۰ سے کم، فوری",
    aiFilterBtn: "AI سے تلاش کریں",
    aiFiltering: "نوکریاں ڈھونڈ رہے ہیں...",
    activeFilters: "فعال فلٹر",
    clearFilters: "صاف کریں",
    noJobsFound: "کوئی نوکری نہیں ملی",
    noJobsFoundSub: "مختلف تلاش کریں یا فلٹر صاف کریں",
    allJobs: "تمام نوکریاں",
    profileProgress: "پروفائل پروگریس",
    profileComplete: "پروفائل مکمل!",
    completeYourProfile: "زیادہ نوکریاں پانے کے لیے پروفائل مکمل کریں",
    stepRegistered: "اکاؤنٹ رجسٹر",
    stepProfilePhoto: "پروفائل فوٹو",
    stepCnicDocs: "شناختی کارڈ دستاویزات",
    stepAvailability: "دستیابی پوسٹ",
    stepLicense: "ڈرائیونگ لائسنس",
    stepVerified: "ایڈمن سے تصدیق",
    tapToComplete: "مکمل کریں",
  }
};

const socket = io("http://localhost:5000");
if (typeof window !== "undefined") window._rozgarSocket = socket;

export default function WorkerDashboard() {
  const [lang, setLang] = useState("en");
  const t = T[lang];

  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("requests");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [incomingRequest, setIncomingRequest] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupTimer, setPopupTimer] = useState(30);
  const timerRef = useRef(null);

  const [popupState, setPopupState] = useState(null);
  const [counterPrice, setCounterPrice] = useState("");
  const [employerCounter, setEmployerCounter] = useState(null);

  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [offeredRate, setOfferedRate] = useState("");

  const [appliedJobs, setAppliedJobs] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const [showAvailModal, setShowAvailModal] = useState(false);
  const [availability, setAvailability] = useState({
    skill: "", experience: "", hourlyRate: "", location: "", description: "", status: "available"
  });

  // ── Full user data from backend (for profile progress) ──
  const [userProfile, setUserProfile] = useState(null);

  const swal = (opts) => typeof window !== "undefined" && window.Swal && window.Swal.fire(opts);

  useEffect(() => {
    if (document.getElementById("swal-cdn")) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css";
    document.head.appendChild(link);
    const script = document.createElement("script");
    script.id = "swal-cdn";
    script.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const u = JSON.parse(storedUser);
      setUser(u);
      socket.emit("join", u.id);
      socket.emit("worker_online", { workerId: u.id, name: u.name });
      fetch(`http://localhost:5000/api/applications/${u.id}`)
        .then(r => r.json()).then(setAppliedJobs).catch(() => {});

      // ── Fetch full user profile for progress calculation ──
      const token = localStorage.getItem("token");
      if (token) {
        fetch(`http://localhost:5000/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        })
          .then(r => r.json())
          .then(data => { if (data.user) setUserProfile(data.user); })
          .catch(() => {
            // fallback: use localStorage user data
            setUserProfile(u);
          });
      } else {
        setUserProfile(u);
      }
    }
  }, []);

  useEffect(() => {
    socket.on("new_job_request", (data) => {
      setIncomingRequest(data);
      setCounterPrice(data.offeredPrice || "");
      setPopupState(null);
      setShowPopup(true);
      setPopupTimer(30);
      addNotif(`📍 New job: ${data.title}`);
    });
    socket.on("employer_confirm_worker", () => {
      setPopupState("confirmed");
      addNotif("🎉 " + t.swalAcceptedText);
      swal({ title: t.swalAccepted, text: t.swalAcceptedText, icon: "success", confirmButtonColor: "#16a34a" });
    });
    socket.on("employer_dismiss_worker", () => {
      setPopupState("dismissed");
      addNotif("❌ " + t.dismissedDesc);
    });
    socket.on("employer_accepted", () => {
      setPopupState("confirmed");
      swal({ title: t.swalAccepted, text: t.swalAcceptedText, icon: "success", confirmButtonColor: "#16a34a" });
    });
    socket.on("employer_rejected", (data) => {
      if (data.workerId === user?.id) setPopupState("rejected");
    });
    socket.on("employer_counter", (data) => {
      if (data.workerId === user?.id) {
        setEmployerCounter(data);
        setPopupState("counter_received");
        swal({ title: t.swalCounterReceived, html: `<strong>Rs. ${data.price}</strong>`, icon: "info", confirmButtonColor: "#3b82f6" });
      }
    });
    socket.on("request_taken", (data) => {
      if (incomingRequest?.requestId === data.requestId && popupState !== "confirmed") {
        setPopupState("rejected");
      }
    });
    return () => {
      socket.off("new_job_request");
      socket.off("employer_confirm_worker");
      socket.off("employer_dismiss_worker");
      socket.off("employer_accepted");
      socket.off("employer_rejected");
      socket.off("employer_counter");
      socket.off("request_taken");
    };
  }, [user, incomingRequest, popupState, lang]);

  useEffect(() => {
    if (showPopup && popupState === null) {
      setPopupTimer(30);
      timerRef.current = setInterval(() => {
        setPopupTimer(prev => {
          if (prev <= 1) { clearInterval(timerRef.current); dismissPopup(); return 0; }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [showPopup, popupState]);

  const addNotif = (msg) => setNotifications(p => [...p, { id: Date.now(), msg }]);

  const dismissPopup = () => {
    setShowPopup(false);
    setIncomingRequest(null);
    setPopupState(null);
    setCounterPrice("");
    setEmployerCounter(null);
  };

  const handleAcceptJob = () => {
    socket.emit("worker_job_accept", {
      requestId: incomingRequest.requestId,
      employerId: incomingRequest.employerId,
      workerId: user.id,
      workerName: user.name,
      workerRating: "4.8",
      workerPhone: user.phone || "",
    });
    setPopupState("accepted_waiting");
  };

  const handleDeclineJob = () => {
    socket.emit("worker_job_decline", { requestId: incomingRequest.requestId, workerId: user.id });
    dismissPopup();
  };

  const handleSendCounter = () => {
    if (!counterPrice) {
      swal({ title: t.swalEnterPrice, text: t.swalEnterPriceText, icon: "warning", confirmButtonColor: "#f59e0b" });
      return;
    }
    socket.emit("worker_offer", {
      requestId: incomingRequest.requestId,
      employerId: incomingRequest.employerId,
      workerId: user.id,
      workerName: user.name,
      price: counterPrice,
      rating: "4.8",
      phone: user.phone,
    });
    setPopupState("counter_sent");
  };

  const handleAcceptEmployerCounter = () => {
    socket.emit("worker_accepted", {
      requestId: incomingRequest.requestId,
      employerId: incomingRequest.employerId,
      workerId: user.id,
      workerName: user.name,
      price: employerCounter.price,
      phone: user.phone,
    });
    setPopupState("confirmed");
  };

  const handleRejectEmployerCounter = () => {
    swal({
      title: t.swalRejectCounter, text: t.swalRejectCounterText, icon: "warning",
      showCancelButton: true, confirmButtonColor: "#ef4444", cancelButtonColor: "#6b7280",
      confirmButtonText: t.swalYesReject, cancelButtonText: t.swalGoBack
    }).then(r => {
      if (r.isConfirmed) {
        socket.emit("worker_rejected_counter", {
          requestId: incomingRequest.requestId,
          employerId: incomingRequest.employerId,
          workerId: user.id,
        });
        dismissPopup();
      }
    });
  };

  const handlePostAvailability = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/workers", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...availability, worker: user.id })
      });
      setShowAvailModal(false);
      if (res.ok) {
        // Update progress — availability posted
        setUserProfile(prev => prev ? { ...prev, availabilityPosted: true } : prev);
        swal({ title: t.swalPosted, text: t.swalPostedText, icon: "success", confirmButtonColor: "#16a34a" });
      } else {
        swal({ title: t.swalError, text: t.swalErrorText, icon: "error", confirmButtonColor: "#ef4444" });
      }
    } catch (_) {
      setShowAvailModal(false);
      setUserProfile(prev => prev ? { ...prev, availabilityPosted: true } : prev);
      swal({ title: t.swalSavedLocally, text: t.swalSavedLocallyText, icon: "info", confirmButtonColor: "#3b82f6" });
    }
  };

  const handleApplyJob = async (jobId, rate) => {
    const res = await fetch("http://localhost:5000/api/applications", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ job: jobId, worker: user.id, offeredRate: rate })
    });
    const data = await res.json();
    if (!res.ok) {
      swal({ title: t.swalOops, text: data.error || t.swalAlreadyApplied, icon: "error", confirmButtonColor: "#ef4444" });
      return;
    }
    setShowApplyModal(false);
    swal({ title: t.swalAppSent, html: `<strong>Rs. ${rate}</strong> — ${t.swalAppSentText}`, icon: "success", confirmButtonColor: "#16a34a", confirmButtonText: t.swalGreat });
  };

  const handleLogout = () => {
    swal({
      title: t.swalLogout, text: t.swalLogoutText, icon: "question",
      showCancelButton: true, confirmButtonColor: "#ef4444", cancelButtonColor: "#6b7280",
      confirmButtonText: t.swalYesLogout, cancelButtonText: t.swalGoBack
    }).then(r => { if (r.isConfirmed) { localStorage.removeItem("user"); window.location.href = "/login"; } });
  };

  if (!user) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #064e3b 0%, #065f46 100%)" }}>
      <div style={{ textAlign: "center", color: "#fff" }}>
        <div style={{ width: 56, height: 56, border: "4px solid #34d399", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto" }} />
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  return (
    <div dir={t.dir} style={{ minHeight: "100vh", display: "flex", background: "#f0f4f8", fontFamily: lang === "ur" ? "'Noto Nastaliq Urdu', serif" : "'Segoe UI', sans-serif" }}>

      {showPopup && incomingRequest && (
        <JobRequestPopup
          t={t} request={incomingRequest}
          popupState={popupState} popupTimer={popupTimer}
          counterPrice={counterPrice} setCounterPrice={setCounterPrice}
          employerCounter={employerCounter}
          onAcceptJob={handleAcceptJob}
          onDeclineJob={handleDeclineJob}
          onShowCounter={() => setPopupState("counter_input")}
          onSendCounter={handleSendCounter}
          onAcceptEmployerCounter={handleAcceptEmployerCounter}
          onRejectEmployerCounter={handleRejectEmployerCounter}
          onDismiss={dismissPopup}
          userId={user.id}
        />
      )}

      {showApplyModal && selectedJob && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 24, backdropFilter: "blur(4px)" }}>
          <div style={{ background: "#fff", borderRadius: 24, width: "100%", maxWidth: 480, boxShadow: "0 24px 60px rgba(0,0,0,0.3)", display: "flex", flexDirection: "column", maxHeight: "88vh", overflow: "hidden" }}>
            <div style={{ background: "linear-gradient(135deg, #0f172a, #1e3a5f)", padding: "24px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
              <div>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, margin: 0 }}>{t.applyFor}</p>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: "#fff", margin: "6px 0 0" }}>{selectedJob.title}</h3>
              </div>
              <button onClick={() => setShowApplyModal(false)} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 10, padding: 8, cursor: "pointer" }}>
                <X size={18} color="#fff" />
              </button>
            </div>
            <div style={{ padding: 28, overflowY: "auto", flex: 1 }}>
              <div style={{ background: "#f8fafc", border: "1.5px solid #e2e8f0", borderRadius: 14, padding: 16, marginBottom: 20 }}>
                <h4 style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1, margin: "0 0 12px" }}>{t.employerDetails}</h4>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: "#dbeafe", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <MapPin size={16} color="#3b82f6" />
                  </div>
                  <div>
                    <p style={{ fontSize: 11, color: "#94a3b8", margin: 0 }}>{t.location}</p>
                    <p style={{ fontSize: 14, fontWeight: 600, color: "#0f172a", margin: 0 }}>{selectedJob.location}</p>
                  </div>
                </div>
              </div>
              {(selectedJob.latitude || selectedJob.lat) && (selectedJob.longitude || selectedJob.lng) ? (
                <div style={{ marginBottom: 20 }}>
                  <JobMap lat={selectedJob.latitude || selectedJob.lat} lng={selectedJob.longitude || selectedJob.lng} height={200} label={t.jobLocationMap} showWorkerLocation={true} workerId={user.id} employerId={selectedJob.employer?._id || selectedJob.employer} />
                  <p style={{ fontSize: 12, color: "#16a34a", fontWeight: 600, textAlign: "center", marginTop: 6 }}>🟢 Your live location is being shared with the employer</p>
                </div>
              ) : (
                <div style={{ background: "#f8fafc", border: "1.5px dashed #e2e8f0", borderRadius: 12, padding: 16, marginBottom: 20, textAlign: "center" }}>
                  <p style={{ fontSize: 13, color: "#94a3b8", margin: 0 }}>📍 {selectedJob.location || "Location not specified"}</p>
                </div>
              )}
              <div style={{ background: "#f0fdf4", border: "1.5px solid #86efac", borderRadius: 12, padding: "12px 18px", marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, color: "#16a34a", fontWeight: 600 }}>{t.employerListedRate}</span>
                <span style={{ fontSize: 20, fontWeight: 800, color: "#0f172a" }}>Rs. {String(selectedJob.salary).replace(/^Rs\.\s*/i, "")}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, marginBottom: 24 }}>
                <label style={{ fontSize: 13, fontWeight: 700, color: "#374151" }}>{t.yourOffer}</label>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <button onClick={() => setOfferedRate(prev => String(Math.max(0, Number(prev) - 100)))} style={{ width: 42, height: 42, borderRadius: 10, border: "none", background: "#f1f5f9", color: "#374151", fontSize: 22, fontWeight: 700, cursor: "pointer" }}>−</button>
                  <input type="number" value={offeredRate} onChange={e => setOfferedRate(e.target.value)} style={{ width: 130, textAlign: "center", border: "2px solid #16a34a", borderRadius: 12, padding: "10px 0", fontSize: 22, fontWeight: 800, color: "#0f172a", outline: "none" }} />
                  <button onClick={() => setOfferedRate(prev => String(Number(prev) + 100))} style={{ width: 42, height: 42, borderRadius: 10, border: "none", background: "#f1f5f9", color: "#374151", fontSize: 22, fontWeight: 700, cursor: "pointer" }}>+</button>
                </div>
                <p style={{ fontSize: 12, color: "#94a3b8", margin: 0 }}>
                  {Number(offeredRate) > Number(selectedJob.salary) ? `↑ Rs. ${Number(offeredRate) - Number(selectedJob.salary)} ${t.aboveRate}` : Number(offeredRate) < Number(selectedJob.salary) ? `↓ Rs. ${Number(selectedJob.salary) - Number(offeredRate)} ${t.belowRate}` : t.matchingRate}
                </p>
              </div>
              <button onClick={() => handleApplyJob(selectedJob._id, offeredRate)} style={{ width: "100%", padding: "15px", borderRadius: 14, border: "none", background: "linear-gradient(135deg, #22c55e, #16a34a)", color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 14px rgba(22,163,74,0.4)" }}>
                {t.submitApp}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Sidebar ── */}
      <aside style={{ width: sidebarOpen ? 240 : 72, background: "linear-gradient(180deg, #064e3b 0%, #065f46 100%)", color: "#fff", display: "flex", flexDirection: "column", transition: "width 0.3s", flexShrink: 0 }}>
        <div style={{ padding: "24px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          {sidebarOpen && <div><div style={{ fontSize: 20, fontWeight: 800 }}>{t.brand}</div><div style={{ fontSize: 11, opacity: 0.5, marginTop: 2 }}>{t.role}</div></div>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", padding: 8, borderRadius: 8, cursor: "pointer" }}>
            {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
        <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
          {[
            { id: "requests", icon: Bell, label: t.navRequests },
            { id: "applied",  icon: CheckCircle, label: t.navApplied },
            { id: "browse",   icon: Briefcase, label: t.navBrowse },
          ].map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} style={{
              display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 10, border: "none", cursor: "pointer",
              background: activeTab === item.id ? "rgba(52,211,153,0.2)" : "transparent",
              color: activeTab === item.id ? "#34d399" : "rgba(255,255,255,0.6)",
              fontWeight: activeTab === item.id ? 600 : 400, fontSize: 14, transition: "all 0.2s",
              flexDirection: t.dir === "rtl" ? "row-reverse" : "row"
            }}>
              <item.icon size={18} />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
          <button onClick={() => setShowAvailModal(true)} style={{
            display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 10, border: "none", cursor: "pointer",
            background: "rgba(251,146,60,0.2)", color: "#fb923c", fontWeight: 600, fontSize: 14, marginTop: 8,
            flexDirection: t.dir === "rtl" ? "row-reverse" : "row"
          }}>
            <PlusCircle size={18} />
            {sidebarOpen && <span>{t.navAvail}</span>}
          </button>
        </nav>
        <div style={{ padding: "16px 12px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          {sidebarOpen && (
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", marginBottom: 8 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #34d399, #059669)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, flexShrink: 0 }}>
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{user.name}</div>
                <div style={{ fontSize: 11, opacity: 0.5 }}>{user.email}</div>
              </div>
            </div>
          )}
          <button onClick={handleLogout} style={{
            display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 10, border: "none", cursor: "pointer", width: "100%",
            background: "rgba(239,68,68,0.15)", color: "#f87171", fontSize: 14,
            flexDirection: t.dir === "rtl" ? "row-reverse" : "row"
          }}>
            <LogOut size={16} />
            {sidebarOpen && <span>{t.logout}</span>}
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main style={{ flex: 1, overflow: "auto" }}>
        <header style={{ background: "#fff", borderBottom: "1px solid #e2e8f0", padding: "20px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 5 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a", margin: 0 }}>
              {activeTab === "requests" ? t.headerRequests : activeTab === "applied" ? t.headerApplied : t.headerBrowse}
            </h1>
            <p style={{ fontSize: 13, color: "#64748b", margin: "4px 0 0" }}>{t.welcomeBack}, {user.name}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={() => setLang(l => l === "en" ? "ur" : "en")} style={{
              padding: "6px 16px", borderRadius: 20, border: "2px solid #16a34a", background: "#fff",
              color: "#16a34a", fontSize: 13, fontWeight: 700, cursor: "pointer",
              fontFamily: lang === "en" ? "'Noto Nastaliq Urdu', serif" : "'Segoe UI', sans-serif"
            }}>{t.langToggle}</button>
            <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#dcfce7", padding: "6px 14px", borderRadius: 20 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#16a34a" }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: "#16a34a" }}>{t.online}</span>
            </div>
            {notifications.length > 0 && (
              <div style={{ position: "relative", cursor: "pointer" }} onClick={() => setNotifications([])}>
                <Bell size={20} color="#64748b" />
                <div style={{ position: "absolute", top: -4, right: -4, width: 16, height: 16, background: "#ef4444", borderRadius: "50%", fontSize: 10, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
                  {notifications.length}
                </div>
              </div>
            )}
          </div>
        </header>

        <div style={{ padding: "32px" }}>
          {activeTab === "requests" && (
            <RequestsTab
              t={t} notifications={notifications} showPopup={showPopup}
              userProfile={userProfile}
              onPostAvail={() => setShowAvailModal(true)}
            />
          )}
          {activeTab === "applied" && <AppliedTab t={t} applied={appliedJobs} />}
          {activeTab === "browse" && (
            <BrowseTab t={t} lang={lang} userId={user.id}
              onOpenApplyModal={(job) => { setSelectedJob(job); setOfferedRate(job.salary || ""); setShowApplyModal(true); }} />
          )}
        </div>
      </main>

      {/* ── Availability Modal ── */}
      {showAvailModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 24 }}>
          <div style={{ background: "#fff", borderRadius: 20, padding: 32, maxWidth: 520, width: "100%", maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>{t.postAvailTitle}</h3>
              <button onClick={() => setShowAvailModal(false)} style={{ background: "#f1f5f9", border: "none", borderRadius: 8, padding: 8, cursor: "pointer" }}><X size={18} /></button>
            </div>
            <form onSubmit={handlePostAvailability} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { key: "skill", label: t.skillLabel, placeholder: t.skillPlaceholder },
                { key: "experience", label: t.expLabel, placeholder: t.expPlaceholder },
                { key: "hourlyRate", label: t.rateLabel, placeholder: t.ratePlaceholder },
                { key: "location", label: t.locLabel, placeholder: t.locPlaceholder },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>{f.label}</label>
                  <input required value={availability[f.key]} onChange={e => setAvailability({ ...availability, [f.key]: e.target.value })}
                    placeholder={f.placeholder} style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: "1.5px solid #e2e8f0", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
                </div>
              ))}
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>{t.descLabel}</label>
                <textarea required value={availability.description} onChange={e => setAvailability({ ...availability, description: e.target.value })}
                  rows={3} placeholder={t.descPlaceholder} style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: "1.5px solid #e2e8f0", fontSize: 14, outline: "none", resize: "vertical", boxSizing: "border-box" }} />
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                <button type="submit" style={{ flex: 1, padding: 14, background: "linear-gradient(135deg, #16a34a, #059669)", color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>{t.postBtn}</button>
                <button type="button" onClick={() => setShowAvailModal(false)} style={{ padding: "14px 20px", background: "#f1f5f9", color: "#475569", border: "none", borderRadius: 12, fontSize: 14, cursor: "pointer" }}>{t.cancelBtn}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`@keyframes spin{to{transform:rotate(360deg)}} @keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}} @keyframes fadeIn{from{opacity:0}to{opacity:1}} @keyframes progressFill{from{width:0}to{width:var(--w)}}`}</style>
    </div>
  );
}

/* ═══════════════ PROFILE PROGRESS COMPONENT ═══════════════ */
function ProfileProgress({ t, userProfile, onPostAvail }) {
  if (!userProfile) return null;

  const isDriver = (userProfile.category || "").toLowerCase() === "driver";

  // ── Calculate steps ──
  const steps = [
    {
      key: "registered",
      label: t.stepRegistered,
      done: true, // always true if user is here
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
      key: "availability",
      label: t.stepAvailability,
      done: !!(userProfile.availabilityPosted),
      points: 20,
      action: onPostAvail,
    },
    ...(isDriver ? [{
      key: "license",
      label: t.stepLicense,
      done: !!(userProfile.documents?.drivingLicense),
      points: 10,
      action: null,
    }] : []),
    {
      key: "verified",
      label: t.stepVerified,
      done: !!(userProfile.isVerified),
      points: isDriver ? 15 : 25,
      action: null,
    },
  ];

  const totalPoints = steps.reduce((sum, s) => sum + s.points, 0);
  const earnedPoints = steps.filter(s => s.done).reduce((sum, s) => sum + s.points, 0);
  const percentage = Math.round((earnedPoints / totalPoints) * 100);
  const isComplete = percentage === 100;

  // Progress bar color
  const barColor = percentage >= 80 ? "#16a34a" : percentage >= 50 ? "#3b82f6" : "#f59e0b";

  return (
    <div style={{
      background: "#fff", borderRadius: 20, padding: 24,
      boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
      marginBottom: 20,
      border: isComplete ? "2px solid #22c55e" : "1.5px solid #e2e8f0",
      animation: "slideUp .4s ease-out",
    }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: "#0f172a", margin: 0 }}>
            {isComplete ? `🎉 ${t.profileComplete}` : t.profileProgress}
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
            ? "linear-gradient(90deg, #22c55e, #16a34a)"
            : `linear-gradient(90deg, ${barColor}, ${barColor}cc)`,
          width: `${percentage}%`,
          animation: "progressFill 1s ease-out forwards",
          "--w": `${percentage}%`,
          transition: "width 1s ease-out",
        }} />
      </div>

      {/* Steps List */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {steps.map(step => (
          <div key={step.key} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "10px 14px", borderRadius: 12,
            background: step.done ? "#f0fdf4" : "#f8fafc",
            border: `1.5px solid ${step.done ? "#bbf7d0" : "#e2e8f0"}`,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {/* Icon */}
              <div style={{
                width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: step.done ? "#22c55e" : "#e2e8f0",
                fontSize: 13,
              }}>
                {step.done ? "✓" : "○"}
              </div>
              <span style={{
                fontSize: 13, fontWeight: step.done ? 600 : 500,
                color: step.done ? "#15803d" : "#475569",
                textDecoration: step.done ? "none" : "none",
              }}>
                {step.label}
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{
                fontSize: 11, fontWeight: 700,
                color: step.done ? "#16a34a" : "#94a3b8",
                background: step.done ? "#dcfce7" : "#f1f5f9",
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
                  {t.tapToComplete} →
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════ REQUESTS TAB — updated with ProfileProgress ═══════════════ */
function RequestsTab({ t, notifications, showPopup, userProfile, onPostAvail }) {
  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>

      {/* ── Profile Progress Card ── */}
      <ProfileProgress t={t} userProfile={userProfile} onPostAvail={onPostAvail} />

      {/* ── Waiting / Incoming Card ── */}
      <div style={{ background: "#fff", borderRadius: 20, padding: 40, textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", background: showPopup ? "linear-gradient(135deg,#22c55e,#16a34a)" : "linear-gradient(135deg,#e2e8f0,#cbd5e1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 32 }}>
          {showPopup ? "📩" : "📭"}
        </div>
        <h3 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>{showPopup ? t.incomingTitle : t.waitingTitle}</h3>
        <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6 }}>{showPopup ? t.incomingDesc : t.waitingDesc}</p>
        {notifications.length > 0 && (
          <div style={{ marginTop: 24, textAlign: "left" }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: "#475569", marginBottom: 12 }}>{t.recentNotifs}</h4>
            {notifications.slice(-5).reverse().map(n => (
              <div key={n.id} style={{ padding: "10px 14px", background: "#f8fafc", borderRadius: 10, fontSize: 13, color: "#475569", marginBottom: 8 }}>{n.msg}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════ OTHER TABS ═══════════════ */
function AppliedTab({ t, applied }) {
  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      {applied.length === 0 ? (
        <div style={{ background: "#fff", borderRadius: 16, padding: 48, textAlign: "center", color: "#94a3b8" }}>
          <CheckCircle size={40} style={{ margin: "0 auto 12px", opacity: 0.3 }} />
          <p>{t.noApps}</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {applied.map(job => (
            <div key={job._id || job.id} style={{ background: "#fff", borderRadius: 16, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h4 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", margin: "0 0 4px" }}>{job.title || job.job?.title}</h4>
                  <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>{t.appliedOn} {job.appliedOn || t.recently}</p>
                </div>
                <span style={{ padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: job.status === "Shortlisted" ? "#dcfce7" : "#fef3c7", color: job.status === "Shortlisted" ? "#16a34a" : "#d97706" }}>
                  {job.status === "Shortlisted" ? t.shortlisted : t.pending}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function BrowseTab({ t, lang, userId, onOpenApplyModal }) {
  const [allJobs, setAllJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filtering, setFiltering] = useState(false);
  const [activeFilters, setActiveFilters] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/jobs")
      .then(r => r.json())
      .then(data => { setAllJobs(data); setFilteredJobs(data); })
      .catch(() => {});
  }, []);

  const handleAIFilter = async () => {
    if (!searchQuery.trim()) return;
    setFiltering(true);
    try {
      const res = await fetch("http://localhost:5000/api/ai/smart-filter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchQuery })
      });
      const filters = await res.json();
      setActiveFilters(filters);
      applyFilters(filters);
    } catch (e) { console.error("Smart filter failed", e); }
    setFiltering(false);
  };

  const applyFilters = (filters) => {
    let results = [...allJobs];
    if (filters.category) results = results.filter(job => (job.category || job.type || "").toLowerCase().includes(filters.category.toLowerCase()) || (job.title || "").toLowerCase().includes(filters.category.toLowerCase()));
    if (filters.location) results = results.filter(job => (job.location || "").toLowerCase().includes(filters.location.toLowerCase()));
    if (filters.minBudget > 0) results = results.filter(job => Number(String(job.salary).replace(/[^0-9]/g, "")) >= filters.minBudget);
    if (filters.maxBudget > 0) results = results.filter(job => Number(String(job.salary).replace(/[^0-9]/g, "")) <= filters.maxBudget);
    if (filters.urgency) results = results.filter(job => (job.urgency || "").toLowerCase() === filters.urgency.toLowerCase());
    if (filters.keywords?.length > 0) results = results.filter(job => filters.keywords.some(kw => (job.title || "").toLowerCase().includes(kw.toLowerCase()) || (job.description || "").toLowerCase().includes(kw.toLowerCase())));
    setFilteredJobs(results);
  };

  const clearFilters = () => { setActiveFilters(null); setFilteredJobs(allJobs); setSearchQuery(""); };

  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      <div style={{ background: "#fff", borderRadius: 16, padding: 20, marginBottom: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, background: "#f8fafc", border: "1.5px solid #e2e8f0", borderRadius: 12, padding: "10px 14px" }}>
            <SlidersHorizontal size={16} color="#6366f1" />
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onKeyDown={e => e.key === "Enter" && handleAIFilter()}
              placeholder={t.aiFilterPlaceholder}
              style={{ flex: 1, border: "none", background: "transparent", fontSize: 14, outline: "none", color: "#0f172a", fontFamily: lang === "ur" ? "'Noto Nastaliq Urdu', serif" : "'Segoe UI', sans-serif" }} />
            {searchQuery && <button onClick={clearFilters} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontSize: 16 }}>×</button>}
          </div>
          <button onClick={handleAIFilter} disabled={filtering || !searchQuery.trim()}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "11px 18px", borderRadius: 12, border: "none", background: filtering || !searchQuery.trim() ? "#e2e8f0" : "linear-gradient(135deg,#6366f1,#8b5cf6)", color: filtering || !searchQuery.trim() ? "#94a3b8" : "#fff", fontSize: 13, fontWeight: 700, cursor: filtering || !searchQuery.trim() ? "not-allowed" : "pointer", whiteSpace: "nowrap", fontFamily: lang === "ur" ? "'Noto Nastaliq Urdu', serif" : "'Segoe UI', sans-serif" }}>
            <Search size={14} />
            {filtering ? t.aiFiltering : t.aiFilterBtn}
          </button>
        </div>
        {activeFilters && (
          <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#6366f1", textTransform: "uppercase", letterSpacing: ".06em" }}>{t.activeFilters}:</span>
            {activeFilters.category && <FilterChip label={`📂 ${activeFilters.category}`} />}
            {activeFilters.location && <FilterChip label={`📍 ${activeFilters.location}`} />}
            {activeFilters.minBudget > 0 && <FilterChip label={`💰 Rs. ${activeFilters.minBudget}+`} />}
            {activeFilters.maxBudget > 0 && <FilterChip label={`💰 Max Rs. ${activeFilters.maxBudget}`} />}
            {activeFilters.urgency && <FilterChip label={`⚡ ${activeFilters.urgency}`} />}
            {activeFilters.keywords?.map(k => <FilterChip key={k} label={`🔍 ${k}`} />)}
            <button onClick={clearFilters} style={{ fontSize: 12, color: "#ef4444", fontWeight: 600, background: "#fef2f2", border: "none", borderRadius: 20, padding: "3px 10px", cursor: "pointer" }}>{t.clearFilters}</button>
          </div>
        )}
      </div>
      {activeFilters && <p style={{ fontSize: 13, color: "#64748b", marginBottom: 12, fontWeight: 500 }}>{filteredJobs.length} {filteredJobs.length === 1 ? "job" : "jobs"} found</p>}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {filteredJobs.length === 0 ? (
          <div style={{ background: "#fff", borderRadius: 16, padding: 48, textAlign: "center", color: "#94a3b8", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <p style={{ fontWeight: 700, fontSize: 15, color: "#475569", marginBottom: 4 }}>{t.noJobsFound}</p>
            <p style={{ fontSize: 13 }}>{t.noJobsFoundSub}</p>
          </div>
        ) : (
          filteredJobs.map(job => (
            <div key={job._id} style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div>
                  <h4 style={{ fontSize: 17, fontWeight: 700, color: "#0f172a", margin: "0 0 4px" }}>{job.title}</h4>
                  <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>{job.employer?.name}</p>
                </div>
                <span style={{ background: "#eff6ff", color: "#3b82f6", padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{job.type}</span>
              </div>
              <p style={{ fontSize: 14, color: "#475569", marginBottom: 14, lineHeight: 1.5 }}>{job.description}</p>
              <div style={{ display: "flex", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
                <span style={{ fontSize: 13, color: "#64748b", display: "flex", alignItems: "center", gap: 4 }}><MapPin size={14} />{job.location}</span>
                <span style={{ fontSize: 13, color: "#64748b", display: "flex", alignItems: "center", gap: 4 }}><DollarSign size={14} />Rs. {job.salary}</span>
                {job.urgency && <span style={{ fontSize: 12, color: "#f59e0b", fontWeight: 600, background: "#fef3c7", padding: "2px 10px", borderRadius: 20 }}>⚡ {job.urgency}</span>}
              </div>
              <button onClick={() => onOpenApplyModal(job)} style={{ width: "100%", padding: 12, background: "linear-gradient(135deg,#16a34a,#059669)", color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                {t.applyNow}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function FilterChip({ label }) {
  return <span style={{ background: "#f0f0fe", color: "#4f46e5", fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 20, border: "1px solid #e0e0fc" }}>{label}</span>;
}

/* ═══════════════ JOB REQUEST POPUP ═══════════════ */
function JobRequestPopup({ t, request, popupState, popupTimer, counterPrice, setCounterPrice, employerCounter, onAcceptJob, onDeclineJob, onShowCounter, onSendCounter, onAcceptEmployerCounter, onRejectEmployerCounter, onDismiss, userId }) {
  const timerPct = (popupTimer / 30) * 100;
  const isInitial = popupState === null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 300, padding: 24, backdropFilter: "blur(6px)" }}>
      <div style={{ background: "#fff", borderRadius: 26, width: "100%", maxWidth: 460, boxShadow: "0 32px 80px rgba(0,0,0,0.35)", overflow: "hidden", maxHeight: "92vh", overflowY: "auto" }}>
        {isInitial && (
          <div style={{ height: 5, background: "#e2e8f0", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${timerPct}%`, transition: "width 1s linear", background: timerPct > 33 ? "linear-gradient(90deg,#22c55e,#16a34a)" : "linear-gradient(90deg,#ef4444,#dc2626)" }} />
          </div>
        )}
        <div style={{ padding: 26 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#22c55e" }} />
              <span style={{ fontSize: 12, fontWeight: 800, color: "#16a34a", textTransform: "uppercase", letterSpacing: ".08em" }}>{t.newJobRequest}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {isInitial && <span style={{ fontSize: 13, fontWeight: 700, color: timerPct > 33 ? "#64748b" : "#ef4444" }}>⏱ {popupTimer}s</span>}
              <button onClick={onDismiss} style={{ background: "#f1f5f9", border: "none", borderRadius: 8, padding: 7, cursor: "pointer" }}><X size={15} color="#64748b" /></button>
            </div>
          </div>
          <div style={{ background: "linear-gradient(135deg,#0f172a,#1e3a5f)", borderRadius: 16, padding: 20, marginBottom: 16, color: "#fff" }}>
            <h3 style={{ fontSize: 18, fontWeight: 800, margin: "0 0 8px" }}>{request.title}</h3>
            {request.description && <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", margin: "0 0 14px", lineHeight: 1.5 }}>{request.description}</p>}
            {request.workLocation && (
              <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,.08)", borderRadius: 8, padding: "5px 10px", width: "fit-content" }}>
                <MapPin size={12} color="#60a5fa" />
                <span style={{ fontSize: 12 }}>{request.workLocation}</span>
              </div>
            )}
          </div>
          {request.lat && request.lng ? (
            <div style={{ marginBottom: 16 }}>
              <JobMap lat={request.lat} lng={request.lng} height={180} label="Job Location" showWorkerLocation={popupState === "accepted_waiting" || popupState === "confirmed"} workerId={userId} employerId={request.employerId} />
              {(popupState === "accepted_waiting" || popupState === "confirmed") && (
                <p style={{ fontSize: 11, color: "#16a34a", fontWeight: 700, textAlign: "center", marginTop: 5 }}>🟢 Your live location is being shared with employer</p>
              )}
            </div>
          ) : (
            request.workLocation && (
              <div style={{ background: "#f8fafc", borderRadius: 10, padding: "10px 14px", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                <MapPin size={14} color="#64748b" />
                <span style={{ fontSize: 13, color: "#475569" }}>{request.workLocation}</span>
              </div>
            )
          )}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, padding: "14px 18px", background: "#f0fdf4", borderRadius: 12, border: "1.5px solid #86efac" }}>
            <div>
              <div style={{ fontSize: 11, color: "#16a34a", fontWeight: 700, marginBottom: 2 }}>{t.employerOffer}</div>
              <div style={{ fontSize: 26, fontWeight: 900, color: "#0f172a" }}>Rs. {request.offeredPrice || "Open"}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{request.employerName}</div>
              <div style={{ fontSize: 11, color: "#64748b" }}>{request.category}</div>
            </div>
          </div>
          {isInitial && (
            <>
              <div style={{ display: "flex", gap: 10, marginBottom: 0 }}>
                <button onClick={onAcceptJob} style={{ flex: 2, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "14px", borderRadius: 13, border: "none", background: "linear-gradient(135deg,#22c55e,#16a34a)", color: "#fff", fontSize: 15, fontWeight: 800, cursor: "pointer" }}>
                  <ThumbsUp size={17} /> {t.acceptJob}
                </button>
                <button onClick={onDeclineJob} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "14px", borderRadius: 13, border: "1.5px solid #fecaca", background: "#fef2f2", color: "#ef4444", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                  <ThumbsDown size={15} /> {t.declineJob}
                </button>
              </div>
              <button onClick={onShowCounter} style={{ width: "100%", marginTop: 10, padding: "11px", borderRadius: 11, border: "1.5px solid #e2e8f0", background: "#f8fafc", color: "#475569", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <MessageSquare size={14} /> {t.counterNote}
              </button>
            </>
          )}
          {popupState === "counter_input" && (
            <div>
              <label style={{ fontSize: 13, fontWeight: 700, color: "#374151", display: "block", marginBottom: 8 }}>{t.counterOffer}</label>
              <div style={{ display: "flex", gap: 8 }}>
                <input type="number" value={counterPrice} onChange={e => setCounterPrice(e.target.value)} placeholder={t.optionalCounter} autoFocus style={{ flex: 1, padding: "13px 14px", borderRadius: 11, border: "1.5px solid #e2e8f0", fontSize: 14, outline: "none" }} />
                <button onClick={onSendCounter} style={{ padding: "13px 18px", borderRadius: 11, border: "none", background: "linear-gradient(135deg,#3b82f6,#2563eb)", color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>{t.sendCounter}</button>
              </div>
              <button onClick={onDeclineJob} style={{ marginTop: 10, width: "100%", padding: "11px", borderRadius: 11, border: "1.5px solid #fecaca", background: "#fef2f2", color: "#ef4444", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>{t.declineJob}</button>
            </div>
          )}
          {popupState === "accepted_waiting" && (
            <div style={{ textAlign: "center", padding: "8px 0" }}>
              <div style={{ width: 52, height: 52, border: "4px solid #dcfce7", borderTopColor: "#16a34a", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
              <p style={{ fontWeight: 700, color: "#0f172a", fontSize: 15, marginBottom: 4 }}>✅ Request Accepted!</p>
              <p style={{ fontSize: 13, color: "#64748b" }}>Waiting for employer to confirm you...</p>
            </div>
          )}
          {popupState === "counter_sent" && (
            <div style={{ textAlign: "center", padding: "8px 0" }}>
              <div style={{ width: 52, height: 52, border: "4px solid #dbeafe", borderTopColor: "#3b82f6", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
              <p style={{ fontWeight: 700, color: "#0f172a", fontSize: 15, marginBottom: 4 }}>{t.offerSent}</p>
              <p style={{ fontSize: 13, color: "#64748b" }}>{t.yourOfferWas} Rs. {counterPrice}</p>
            </div>
          )}
          {popupState === "counter_received" && employerCounter && (
            <div>
              <div style={{ background: "#fef3c7", borderRadius: 12, padding: 16, marginBottom: 14, border: "1.5px solid #fcd34d" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#d97706", marginBottom: 4 }}>{t.counterReceived}</div>
                <div style={{ fontSize: 26, fontWeight: 900, color: "#0f172a", marginBottom: 2 }}>Rs. {employerCounter.price}</div>
                <div style={{ fontSize: 12, color: "#64748b" }}>{t.yourOfferWasLabel} Rs. {counterPrice}</div>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={onAcceptEmployerCounter} style={{ flex: 1, padding: 13, borderRadius: 12, border: "none", background: "linear-gradient(135deg,#22c55e,#16a34a)", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>{t.accept} Rs. {employerCounter.price}</button>
                <button onClick={onRejectEmployerCounter} style={{ padding: "13px 16px", borderRadius: 12, border: "none", background: "#fef2f2", color: "#ef4444", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>{t.reject}</button>
              </div>
            </div>
          )}
          {popupState === "confirmed" && (
            <div style={{ textAlign: "center", padding: "12px 0" }}>
              <div style={{ fontSize: 52, marginBottom: 10 }}>🎉</div>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: "#0f172a", marginBottom: 6 }}>{t.jobConfirmed}</h3>
              <p style={{ fontSize: 13, color: "#64748b", marginBottom: 20 }}>{t.jobConfirmedDesc}</p>
              <button onClick={onDismiss} style={{ padding: "12px 32px", background: "linear-gradient(135deg,#22c55e,#16a34a)", color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>{t.viewJobDetails}</button>
            </div>
          )}
          {popupState === "rejected" && (
            <div style={{ textAlign: "center", padding: "12px 0" }}>
              <div style={{ fontSize: 42, marginBottom: 10 }}>😔</div>
              <p style={{ fontWeight: 700, color: "#0f172a", fontSize: 15, marginBottom: 4 }}>{t.offerRejected}</p>
              <p style={{ fontSize: 13, color: "#64748b", marginBottom: 16 }}>{t.offerRejectedDesc}</p>
              <button onClick={onDismiss} style={{ padding: "10px 28px", background: "#f1f5f9", color: "#475569", border: "none", borderRadius: 12, fontSize: 14, cursor: "pointer" }}>{t.close}</button>
            </div>
          )}
          {popupState === "dismissed" && (
            <div style={{ textAlign: "center", padding: "12px 0" }}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>🔄</div>
              <p style={{ fontWeight: 700, color: "#0f172a", fontSize: 15, marginBottom: 4 }}>{t.dismissed}</p>
              <p style={{ fontSize: 13, color: "#64748b", marginBottom: 16 }}>{t.dismissedDesc}</p>
              <button onClick={onDismiss} style={{ padding: "10px 28px", background: "#f1f5f9", color: "#475569", border: "none", borderRadius: 12, fontSize: 14, cursor: "pointer" }}>{t.close}</button>
            </div>
          )}
        </div>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}