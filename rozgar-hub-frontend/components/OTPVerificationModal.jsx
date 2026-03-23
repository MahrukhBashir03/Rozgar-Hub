"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import OTPVerificationModal from "@/components/OTPVerificationModal";

export default function LoginPage() {
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

      // ── Email not verified → show OTP modal ──
      if (res.status === 403 && data.requiresVerification) {
        setShowOTP(true);
        return;
      }

      if (!res.ok) return alert(data.message || data.error || "Login failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user.role === "employer") {
        router.push("/employer/profile");
      } else {
        router.push("/worker/profile");
      }
    } catch (err) {
      alert("Server not reachable");
    }
  }

  // Called after OTP verified successfully
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

      {/* OTP Modal — only shows if email not verified */}
      {showOTP && (
        <OTPVerificationModal
          email={email}
          onVerified={handleVerified}
          onClose={() => setShowOTP(false)}
        />
      )}

      <div className="w-full max-w-md bg-white/95 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-10">

        <h1 className="text-4xl font-bold text-center text-[#1e3a8a] mb-2">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Login to continue to Rozgar Hub
        </p>

        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all shadow-sm"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all shadow-sm"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition duration-300 shadow-lg hover:shadow-orange-500/40"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-8">
          Don't have an account?{" "}
          <span
            onClick={() => router.push("/")}
            className="text-orange-500 cursor-pointer font-medium hover:underline"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}