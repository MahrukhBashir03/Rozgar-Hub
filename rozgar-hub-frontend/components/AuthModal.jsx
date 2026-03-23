"use client";
import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

export default function AuthModal({ onClose }) {
  const [step, setStep] = useState("choice"); // choice | role | form
  const [mode, setMode] = useState(null);    // login | signup
  const [role, setRole] = useState(null);    // worker | employer

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">

        {/* STEP 1: LOGIN OR SIGNUP */}
        {step === "choice" && (
          <>
            <h2 className="text-xl font-bold">
              Do you already have an account?
            </h2>

            <button
              className="w-full bg-blue-600 text-white py-2 rounded"
              onClick={() => {
                setMode("login");
                setStep("role");
              }}
            >
              Login
            </button>

            <button
              className="w-full border py-2 rounded"
              onClick={() => {
                setMode("signup");
                setStep("role");
              }}
            >
              Sign Up
            </button>
          </>
        )}

        {/* STEP 2: ROLE SELECTION */}
        {step === "role" && (
          <>
            <h2 className="text-xl font-bold">Who are you?</h2>

            <button
              className="w-full bg-gray-100 py-2 rounded"
              onClick={() => {
                setRole("worker");
                setStep("form");
              }}
            >
              Worker
            </button>

            <button
              className="w-full bg-gray-100 py-2 rounded"
              onClick={() => {
                setRole("employer");
                setStep("form");
              }}
            >
              Employer
            </button>

            <button
              className="text-sm text-gray-500 mt-2"
              onClick={() => {
                setRole(null);
                setMode(null);
                setStep("choice");
              }}
            >
              ← Back
            </button>
          </>
        )}

        {/* STEP 3: FORM */}
        {step === "form" && mode === "login" && role && (
          <LoginForm role={role} onClose={onClose} />
        )}

        {step === "form" && mode === "signup" && role && (
          <SignupForm role={role} />
        )}
      </div>
    </div>
  );
}
