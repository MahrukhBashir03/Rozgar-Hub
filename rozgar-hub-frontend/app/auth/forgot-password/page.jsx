"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

// ── Step 1: Enter Email ───────────────────────────────────────
function StepEmail({ onNext }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      onNext(email); // move to OTP step
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-5">
      <div className="text-center">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-[#1e3a8a]">Forgot Password?</h1>
        <p className="text-gray-500 text-sm mt-1">
          Enter your email and we'll send you an OTP
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(""); }}
            placeholder="Enter your registered email"
            className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
            required
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg">
            ⚠️ {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition duration-300 shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>
      </form>
    </div>
  );
}

// ── Step 2: Enter OTP ─────────────────────────────────────────
function StepOTP({ email, onNext }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const t = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(t);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const maskedEmail = email.replace(/(.{2})(.*)(@.*)/, (_, a, b, c) =>
    a + "*".repeat(b.length) + c
  );

  function handleChange(index, value) {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError("");
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
    if (newOtp.every((d) => d !== "") && value) handleVerify(newOtp.join(""));
  }

  function handleKeyDown(index, e) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(""));
      handleVerify(pasted);
    }
  }

  async function handleVerify(otpString) {
    const otpValue = otpString || otp.join("");
    if (otpValue.length !== 6) {
      setError("Please enter the complete 6-digit OTP.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      // We just validate OTP exists — actual reset happens in step 3
      // For now move to next step with otp value
      // (full validation happens on reset-password endpoint)
      onNext(otpValue);
    } catch (err) {
      setError(err.message);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    if (!canResend) return;
    setResending(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setCountdown(60);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (err) {
      setError(err.message);
    } finally {
      setResending(false);
    }
  }

  return (
    <div className="space-y-5">
      <div className="text-center">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-[#1e3a8a]">Enter OTP</h1>
        <p className="text-gray-500 text-sm mt-1">
          Code sent to <span className="font-semibold text-orange-500">{maskedEmail}</span>
        </p>
      </div>

      <div className="flex gap-2 justify-center" onPaste={handlePaste}>
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            disabled={loading}
            className={`w-11 h-12 text-center text-xl font-bold border-2 rounded-xl outline-none transition-all
              ${digit ? "border-orange-500 bg-orange-50 text-orange-600" : "border-gray-200 bg-gray-50"}
              focus:border-orange-500 focus:bg-white
              ${error ? "border-red-300" : ""}
            `}
          />
        ))}
      </div>

      {error && (
        <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg text-center">
          ⚠️ {error}
        </p>
      )}

      <button
        onClick={() => handleVerify()}
        disabled={loading || otp.some((d) => d === "")}
        className="w-full py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>

      <p className="text-center text-gray-500 text-sm">
        Didn't receive it?{" "}
        {canResend ? (
          <button
            onClick={handleResend}
            disabled={resending}
            className="text-orange-500 font-semibold hover:underline disabled:opacity-50"
          >
            {resending ? "Sending..." : "Resend OTP"}
          </button>
        ) : (
          <span className="text-gray-400">
            Resend in <span className="font-semibold text-orange-500">{countdown}s</span>
          </span>
        )}
      </p>
    </div>
  );
}

// ── Step 3: New Password ──────────────────────────────────────
function StepNewPassword({ email, otp, onDone }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      onDone(); // success
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-5">
      <div className="text-center">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-[#1e3a8a]">New Password</h1>
        <p className="text-gray-500 text-sm mt-1">Enter your new password below</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            New Password
          </label>
          <input
            type={showPass ? "text" : "password"}
            value={newPassword}
            onChange={(e) => { setNewPassword(e.target.value); setError(""); }}
            placeholder="Min. 6 characters"
            className="w-full border border-gray-300 p-3 pr-10 rounded-lg outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
            required
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
          >
            {showPass ? "🙈" : "👁️"}
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => { setConfirmPassword(e.target.value); setError(""); }}
            placeholder="Re-enter new password"
            className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
            required
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg">
            ⚠️ {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition duration-300 shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}

// ── Step 4: Success ───────────────────────────────────────────
function StepSuccess({ onLogin }) {
  return (
    <div className="text-center space-y-4">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-[#1e3a8a]">Password Reset!</h1>
      <p className="text-gray-500 text-sm">
        Your password has been reset successfully. You can now login with your new password.
      </p>
      <button
        onClick={onLogin}
        className="w-full py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition duration-300 shadow-md"
      >
        Go to Login
      </button>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1=email, 2=otp, 3=newpass, 4=success
  const [email, setEmail] = useState("");
  const [otpValue, setOtpValue] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#172554] to-[#1e3a8a] px-4">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-10">

        {/* Step indicators */}
        <div className="flex justify-center gap-2 mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all duration-300 ${
                s === step ? "w-8 bg-orange-500" : s < step ? "w-2 bg-orange-300" : "w-2 bg-gray-200"
              }`}
            />
          ))}
        </div>

        {step === 1 && (
          <StepEmail
            onNext={(e) => { setEmail(e); setStep(2); }}
          />
        )}

        {step === 2 && (
          <StepOTP
            email={email}
            onNext={(otp) => { setOtpValue(otp); setStep(3); }}
          />
        )}

        {step === 3 && (
          <StepNewPassword
            email={email}
            otp={otpValue}
            onDone={() => setStep(4)}
          />
        )}

        {step === 4 && (
          <StepSuccess onLogin={() => router.push("/auth/login")} />
        )}

        {/* Back to login */}
        {step < 4 && (
          <p className="text-center text-gray-500 text-sm mt-6">
            Remember your password?{" "}
            <span
              onClick={() => router.push("/auth/login")}
              className="text-orange-500 cursor-pointer font-medium hover:underline"
            >
              Back to Login
            </span>
          </p>
        )}
      </div>
    </div>
  );
}