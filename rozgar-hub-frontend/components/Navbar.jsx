"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
import { useLanguage } from "../app/context/LanguageContext";


export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();

  const translations = {
    en: {
      home: "Home",
      features: "Features",
      howItWorks: "How It Works",
      about: "About",
      contact: "Contact",
      login: "Login",
      signUp: "Sign Up",
      language: "اردو",
      title: "Rozgar Hub",
      join: "Join Rozgar Hub",
      choose: "Choose your account type to get started",
      worker: "Register as Worker",
      employer: "Register as Employer",
    },
    ur: {
      home: "ہوم",
      features: "خصوصیات",
      howItWorks: "یہ کیسے کام کرتا ہے",
      about: "ہمارے بارے میں",
      contact: "رابطہ",
      login: "لاگ ان",
      signUp: "سائن اپ",
      language: "English",
      title: "روزگار حب",
      join: "روزگار حب میں شامل ہوں",
      choose: "شروع کرنے کے لیے اپنے اکاؤنٹ کی قسم منتخب کریں",
      worker: "کارکن کے طور پر رجسٹر کریں",
      employer: "آجر کے طور پر رجسٹر کریں",
    },
  };

  const t = translations[language];

  const handleLogin = () => {
    router.push("/auth/login");
  };

  const handleSignUp = () => {
    Swal.fire({
      title: t.join,
      text: t.choose,
      showCancelButton: true,
      confirmButtonText: t.worker,
      cancelButtonText: t.employer,
    }).then((result) => {
      if (result.isConfirmed) {
        router.push("/auth/register/worker");
      } else {
        router.push("/auth/register/employer");
      }
    });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-br from-[#1e3a8a] via-[#172554] to-[#0f172a] border-b border-white/10 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">R</span>
          </div>
          <span className="text-white font-bold text-2xl hidden sm:inline">
            {t.title}
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-gray-300 hover:text-white">{t.home}</Link>
          <Link href="/#features" className="text-gray-300 hover:text-white">{t.features}</Link>
          <Link href="/#how-it-works" className="text-gray-300 hover:text-white">{t.howItWorks}</Link>
          <Link href="/#about" className="text-gray-300 hover:text-white">{t.about}</Link>
          <Link href="/#contact" className="text-gray-300 hover:text-white">{t.contact}</Link>

          <button
            onClick={toggleLanguage}
            className="bg-white/10 border border-white/20 text-white px-3 py-2 rounded-lg hover:bg-white/20"
          >
            {t.language}
          </button>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleLogin}
            className="px-4 py-2 text-white hover:text-orange-400"
          >
            {t.login}
          </button>

          <button
            onClick={handleSignUp}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            {t.signUp}
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#0f172a] p-4 space-y-3">
          <Link href="/" className="block text-gray-300">{t.home}</Link>
          <Link href="/#features" className="block text-gray-300">{t.features}</Link>
          <Link href="/#how-it-works" className="block text-gray-300">{t.howItWorks}</Link>
          <Link href="/#about" className="block text-gray-300">{t.about}</Link>
          <Link href="/#contact" className="block text-gray-300">{t.contact}</Link>
        </div>
      )}
    </nav>
  );
}
