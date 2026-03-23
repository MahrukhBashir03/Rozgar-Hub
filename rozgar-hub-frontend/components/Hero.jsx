"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const content = {
  en: {
    dir: "ltr",
    badge: "🚀 Connecting Workers & Employers Across Pakistan",
    heading1: "Find",
    headingHighlight: "Skilled Workers",
    heading2: "Near You, Instantly",
    description:
      "Rozgar Hub bridges the gap between daily wage workers, electricians, plumbers, and skilled professionals with employers seeking quality service. Fast, trusted, and efficient hiring.",
    workerBtn: "👷 I'm Looking for Work",
    employerBtn: "🏢 I Need Workers",
    stats: [
      { value: "10K+", label: "Active Workers" },
      { value: "5K+", label: "Employers" },
      { value: "98%", label: "Success Rate" },
    ],
    card: [
      { title: "Quick Hire", sub: "Find workers in minutes" },
      { title: "Verified Profiles", sub: "Trusted & skill-verified workers" },
      { title: "Location-Based", sub: "Find nearby workers instantly" },
    ],
  },
  ur: {
    dir: "rtl",
    badge: "🚀 پاکستان بھر میں کارکنوں اور آجروں کو جوڑنا",
    heading1: "تلاش کریں",
    headingHighlight: "ہنر مند کارکن",
    heading2: "اپنے قریب، فوری طور پر",
    description:
      "روزگار ہب روزانہ اجرت کے کارکنوں، الیکٹریشنوں، پلمبروں اور ہنر مند پیشہ وروں کو معیاری خدمات کے خواہشمند آجروں سے جوڑتا ہے۔ تیز، قابل اعتماد اور مؤثر بھرتی۔",
    workerBtn: "👷 مجھے کام چاہیے",
    employerBtn: "🏢 مجھے کارکن چاہییں",
    stats: [
      { value: "10K+", label: "فعال کارکن" },
      { value: "5K+", label: "آجر" },
      { value: "98%", label: "کامیابی کی شرح" },
    ],
    card: [
      { title: "فوری بھرتی", sub: "چند منٹوں میں کارکن تلاش کریں" },
      { title: "تصدیق شدہ پروفائلز", sub: "قابل اعتماد اور تصدیق شدہ کارکن" },
      { title: "مقام کی بنیاد پر", sub: "قریبی کارکن فوری تلاش کریں" },
    ],
  },
};

const urduFont = { fontFamily: "'Noto Nastaliq Urdu', serif", lineHeight: "2" };

const cardIcons = [
  // Lightning
  <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>,
  // Shield
  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>,
  // Location
  <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>,
];

const cardBgs = ["bg-orange-500/20", "bg-blue-500/20", "bg-orange-500/20"];

export default function Hero() {
  const router = useRouter();
  const [lang, setLang] = useState("en");
  const t = content[lang];
  const isUrdu = lang === "ur";
  const lf = isUrdu ? urduFont : {};

  return (
    <section
      dir={t.dir}
      className="min-h-screen flex items-center bg-gradient-to-br from-[#1e3a8a] via-[#172554] to-[#0f172a] text-white px-6 md:px-10 relative overflow-hidden pt-20"
    >
      {/* Decorative blobs */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto w-full relative z-10">

        {/* Language Toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-white/5 border border-white/10 rounded-xl p-1 gap-1">
            <button
              onClick={() => setLang("en")}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                lang === "en"
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLang("ur")}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                lang === "ur"
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                  : "text-gray-400 hover:text-white"
              }`}
              style={urduFont}
            >
              اردو
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-block">
              <span
                className="px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-full text-orange-400 text-sm font-medium"
                style={lf}
              >
                {t.badge}
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight" style={isUrdu ? { ...urduFont, lineHeight: "1.8" } : {}}>
              {t.heading1}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                {t.headingHighlight}
              </span>{" "}
              {t.heading2}
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed" style={lf}>
              {t.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => router.push("/auth/register/worker")}
                className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5"
              >
                <span className="flex items-center justify-center gap-2" style={lf}>
                  {t.workerBtn}
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>

              <button
                onClick={() => router.push("/auth/register/employer")}
                className="group px-8 py-4 border-2 border-orange-500 text-orange-500 font-semibold rounded-xl hover:bg-orange-500 hover:text-white transition-all duration-300 hover:-translate-y-0.5"
              >
                <span className="flex items-center justify-center gap-2" style={lf}>
                  {t.employerBtn}
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
              {t.stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl font-bold text-orange-400">{stat.value}</div>
                  <div className="text-sm text-gray-400 mt-1" style={lf}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual Card */}
          <div className="hidden md:block relative">
            <div className="relative">
              <div className="absolute -rotate-6 w-full h-96 bg-gradient-to-br from-orange-500/20 to-transparent border border-orange-500/30 rounded-2xl backdrop-blur-sm" />
              <div className="absolute rotate-3 w-full h-96 bg-gradient-to-br from-blue-500/20 to-transparent border border-blue-500/30 rounded-2xl backdrop-blur-sm" />

              <div className="relative w-full h-96 bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl backdrop-blur-md p-8 shadow-2xl">
                <div className="space-y-6">
                  {t.card.map((item, i) => (
                    <div key={i} className="flex items-center gap-4" dir={t.dir}>
                      <div className={`w-16 h-16 ${cardBgs[i]} rounded-full flex items-center justify-center shrink-0`}>
                        {cardIcons[i]}
                      </div>
                      <div>
                        <div className="font-semibold text-lg" style={lf}>{item.title}</div>
                        <div className="text-sm text-gray-400" style={lf}>{item.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}