// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   async function handleLogin(e) {
//     e.preventDefault();

//     try {
//       const res = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();
//       if (!res.ok) return alert(data.error || "Login failed");

//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data.user));

//       if (data.user.role === "employer") {
//         router.push("/employer/profile");
//       } else {
//         router.push("/worker/profile");
//       }
//     } catch (err) {
//       alert("Server not reachable");
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#172554] to-[#1e3a8a] px-4">
//       <div className="w-full max-w-md bg-white/95 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-10">

//         <h1 className="text-4xl font-bold text-center text-[#1e3a8a] mb-2">
//           Welcome Back
//         </h1>

//         <p className="text-center text-gray-500 mb-8">
//           Login to continue to Rozgar Hub
//         </p>

//         <form onSubmit={handleLogin} className="space-y-5">

//           <div>
//             <label className="block text-sm font-medium text-gray-600 mb-2">
//               Email
//             </label>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all shadow-sm"
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-600 mb-2">
//               Password
//             </label>
//             <input
//               type="password"
//               placeholder="Enter your password"
//               className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all shadow-sm"
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full py-3 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition duration-300 shadow-lg hover:shadow-orange-500/40"
//           >
//             Login
//           </button>
//         </form>

//         <p className="text-center text-gray-500 text-sm mt-8">
//           Don’t have an account?{" "}
//           <span
        
//             // onClick={() => router.push("/auth/register")}
//             onClick={() => router.push("/")}

//             className="text-orange-500 cursor-pointer font-medium hover:underline"
//           >
//             Sign Up
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import OTPVerificationModal from "@/components/OTPVerificationModal";

const content = {
  en: {
    dir: "ltr",
    title: "Welcome Back",
    subtitle: "Login to continue to Rozgar Hub",
    emailLabel: "Email",
    emailPlaceholder: "Enter your email",
    passwordLabel: "Password",
    passwordPlaceholder: "Enter your password",
    forgotPassword: "Forgot Password?",
    loginBtn: "Login",
    noAccount: "Don't have an account?",
    signUp: "Sign Up",
    alertFailed: "Login failed",
    alertServer: "Server not reachable",
  },
  ur: {
    dir: "rtl",
    title: "خوش آمدید",
    subtitle: "روزگار ہب جاری رکھنے کے لیے لاگ ان کریں",
    emailLabel: "ای میل",
    emailPlaceholder: "اپنی ای میل درج کریں",
    passwordLabel: "پاس ورڈ",
    passwordPlaceholder: "اپنا پاس ورڈ درج کریں",
    forgotPassword: "پاس ورڈ بھول گئے؟",
    loginBtn: "لاگ ان",
    noAccount: "اکاؤنٹ نہیں ہے؟",
    signUp: "سائن اپ کریں",
    alertFailed: "لاگ ان ناکام ہوگیا",
    alertServer: "سرور تک رسائی ممکن نہیں",
  },
};

const urduFont = { fontFamily: "'Noto Nastaliq Urdu', serif", lineHeight: "2" };

export default function LoginPage() {
  const [lang, setLang] = useState("en");
  const t = content[lang];
  const isUrdu = lang === "ur";
  const lf = isUrdu ? urduFont : {};

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.status === 403 && data.requiresVerification) {
        setShowOTP(true);
        return;
      }

      if (!res.ok) return alert(data.message || data.error || t.alertFailed);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user.role === "employer") {
        router.push("/employer/profile");
      } else {
        router.push("/worker/profile");
      }
    } catch (err) {
      alert(t.alertServer);
    }
  }

  function handleVerified(data) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    if (data.user.role === "employer") {
      router.push("/employer/profile");
    } else {
      router.push("/worker/profile");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#172554] to-[#1e3a8a] px-4">

      {showOTP && (
        <OTPVerificationModal
          email={email}
          onVerified={handleVerified}
          onClose={() => setShowOTP(false)}
        />
      )}

      <div
        dir={t.dir}
        className="w-full max-w-md bg-white/95 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-10"
      >
        {/* Language Toggle */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex bg-gray-100 border border-gray-200 rounded-xl p-1 gap-1">
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

        <h1 className="text-4xl font-bold text-center text-[#1e3a8a] mb-2" style={lf}>
          {t.title}
        </h1>
        <p className="text-center text-gray-500 mb-8" style={lf}>
          {t.subtitle}
        </p>

        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2" style={lf}>
              {t.emailLabel}
            </label>
            <input
              type="email"
              placeholder={t.emailPlaceholder}
              className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all shadow-sm"
              style={lf}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-600" style={lf}>
                {t.passwordLabel}
              </label>
              <span
                onClick={() => router.push("/auth/forgot-password")}
                className="text-sm text-orange-500 cursor-pointer hover:underline font-medium"
                style={lf}
              >
                {t.forgotPassword}
              </span>
            </div>
            <input
              type="password"
              placeholder={t.passwordPlaceholder}
              className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all shadow-sm"
              style={lf}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition duration-300 shadow-lg hover:shadow-orange-500/40"
            style={lf}
          >
            {t.loginBtn}
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-8" style={lf}>
          {t.noAccount}{" "}
          <span
            onClick={() => router.push("/")}
            className="text-orange-500 cursor-pointer font-medium hover:underline"
            style={lf}
          >
            {t.signUp}
          </span>
        </p>
      </div>
    </div>
  );
}