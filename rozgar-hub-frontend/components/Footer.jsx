"use client";
import { useState } from "react";
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const content = {
  en: {
    dir: "ltr",
    tagline: "AI-powered employment platform connecting skilled workers with employers across Pakistan. Building bridges between opportunity and talent.",
    quickLinksTitle: "Quick Links",
    supportTitle: "Support",
    contactTitle: "Contact",
    address: "Karachi, Sindh, Pakistan",
    copyright: "All rights reserved. Made with ❤️ in Pakistan",
    quickLinks: [
      { label: "Home", href: "#home" },
      { label: "Features", href: "#features" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Testimonials", href: "#testimonials" },
    ],
    support: [
      { label: "Help Center", href: "#help" },
      { label: "Privacy Policy", href: "#privacy" },
      { label: "Terms & Conditions", href: "#terms" },
      { label: "FAQs", href: "#faqs" },
    ],
    bottomLinks: [
      { label: "Privacy", href: "#privacy" },
      { label: "Terms", href: "#terms" },
      { label: "Cookies", href: "#cookies" },
    ],
  },
  ur: {
    dir: "rtl",
    tagline: "اے آئی سے چلنے والا روزگار پلیٹ فارم جو پاکستان بھر میں ہنر مند کارکنوں کو آجروں سے جوڑتا ہے۔ موقع اور صلاحیت کے درمیان پل بناتا ہے۔",
    quickLinksTitle: "فوری لنکس",
    supportTitle: "مدد",
    contactTitle: "رابطہ",
    address: "کراچی، سندھ، پاکستان",
    copyright: "جملہ حقوق محفوظ ہیں۔ پاکستان میں ❤️ کے ساتھ بنایا گیا",
    quickLinks: [
      { label: "ہوم", href: "#home" },
      { label: "خصوصیات", href: "#features" },
      { label: "یہ کیسے کام کرتا ہے", href: "#how-it-works" },
      { label: "تجربات", href: "#testimonials" },
    ],
    support: [
      { label: "مدد مرکز", href: "#help" },
      { label: "رازداری کی پالیسی", href: "#privacy" },
      { label: "شرائط و ضوابط", href: "#terms" },
      { label: "اکثر پوچھے گئے سوالات", href: "#faqs" },
    ],
    bottomLinks: [
      { label: "رازداری", href: "#privacy" },
      { label: "شرائط", href: "#terms" },
      { label: "کوکیز", href: "#cookies" },
    ],
  },
};

const social = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

const urduFont = { fontFamily: "'Noto Nastaliq Urdu', serif", lineHeight: "2" };

export default function Footer() {
  const [lang, setLang] = useState("en");
  const t = content[lang];
  const isUrdu = lang === "ur";
  const currentYear = new Date().getFullYear();
  const lf = isUrdu ? urduFont : {};

  return (
    <footer
      dir={t.dir}
      className="relative bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#0b1120] border-t border-white/10 text-gray-300 overflow-hidden"
    >
      {/* Glow Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-orange-500 shadow-lg shadow-orange-500/30">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-extrabold text-white tracking-wide">Rozgar Hub</h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed" style={lf}>{t.tagline}</p>
            <div className="flex gap-4 pt-2">
              {social.map((s) => (
                <a key={s.label} href={s.href}
                  className="p-2 rounded-lg bg-white/5 hover:bg-orange-500/20 transition duration-300 group"
                  aria-label={s.label}
                >
                  <s.icon className="w-4 h-4 text-gray-400 group-hover:text-orange-400 transition" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-5 border-l-4 border-orange-500 pl-3" style={lf}>
              {t.quickLinksTitle}
            </h4>
            <ul className="space-y-3">
              {t.quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-400 hover:text-orange-400 transition duration-300 text-sm" style={lf}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-white mb-5 border-l-4 border-orange-500 pl-3" style={lf}>
              {t.supportTitle}
            </h4>
            <ul className="space-y-3">
              {t.support.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-400 hover:text-orange-400 transition duration-300 text-sm" style={lf}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-5 border-l-4 border-orange-500 pl-3" style={lf}>
              {t.contactTitle}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-gray-400 hover:text-orange-400 transition">
                <MapPin className="w-4 h-4 mt-1 text-orange-500 shrink-0" />
                <span style={lf}>{t.address}</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400 hover:text-orange-400 transition">
                <Mail className="w-4 h-4 mt-1 text-orange-500 shrink-0" />
                <a href="mailto:support@rozgarhub.pk" className="hover:underline">support@rozgarhub.pk</a>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400 hover:text-orange-400 transition">
                <Phone className="w-4 h-4 mt-1 text-orange-500 shrink-0" />
                <a href="tel:+923001234567" className="hover:underline">+92 300 1234567</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500 text-center md:text-left" style={lf}>
              © {currentYear} Rozgar Hub. {t.copyright}
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              {t.bottomLinks.map((link) => (
                <a key={link.label} href={link.href} className="hover:text-orange-400 transition" style={lf}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}