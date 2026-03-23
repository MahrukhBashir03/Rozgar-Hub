"use client";
import { useState } from "react";

const content = {
  en: {
    dir: "ltr",
    heading: "Why Choose Rozgar Hub?",
    features: [
      {
        title: "Fast Hiring",
        description: "Find skilled workers near you within minutes.",
      },
      {
        title: "Verified Workers",
        description: "Profiles with ratings and verified experience.",
      },
      {
        title: "Secure & Reliable",
        description: "Transparent communication and fair wages.",
      },
    ],
  },
  ur: {
    dir: "rtl",
    heading: "روزگار ہب کیوں چنیں؟",
    features: [
      {
        title: "تیز بھرتی",
        description: "چند منٹوں میں اپنے قریب ہنر مند کارکن تلاش کریں۔",
      },
      {
        title: "تصدیق شدہ کارکن",
        description: "ریٹنگز اور تصدیق شدہ تجربے کے ساتھ پروفائلز۔",
      },
      {
        title: "محفوظ اور قابل اعتماد",
        description: "شفاف رابطہ اور منصفانہ اجرت۔",
      },
    ],
  },
};

const urduFont = { fontFamily: "'Noto Nastaliq Urdu', serif", lineHeight: "2" };

export default function Features() {
  const [lang, setLang] = useState("en");
  const t = content[lang];
  const isUrdu = lang === "ur";

  return (
    <section className="py-20 bg-gray-50" dir={t.dir}>
      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* Language Toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white border border-gray-200 rounded-xl p-1 gap-1 shadow-sm">
            <button
              onClick={() => setLang("en")}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                lang === "en"
                  ? "bg-orange-500 text-white shadow"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLang("ur")}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                lang === "ur"
                  ? "bg-orange-500 text-white shadow"
                  : "text-gray-500 hover:text-gray-800"
              }`}
              style={urduFont}
            >
              اردو
            </button>
          </div>
        </div>

        {/* Heading */}
        <h2
          className="text-3xl font-bold mb-12"
          style={isUrdu ? urduFont : {}}
        >
          {t.heading}
        </h2>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-10">
          {t.features.map((feature, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-md">
              <h3
                className="text-xl font-semibold mb-3"
                style={isUrdu ? urduFont : {}}
              >
                {feature.title}
              </h3>
              <p
                className="text-gray-600"
                style={isUrdu ? urduFont : {}}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}