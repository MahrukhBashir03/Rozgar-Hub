"use client";
import { useLanguage } from "../app/context/LanguageContext";
import { useState } from "react";

export default function SignupForm({ role }) {
 const [form, setForm] = useState({
 name: "",
 email: "",
 password: "",
 phone: "",
 cnic: "",
 cnicImage: "",
 });

 async function handleSignup(e) {
 e.preventDefault();

 const payload = {
 name: form.name,
 email: form.email,
 password: form.password,
 phone: form.phone,
 cnic: form.cnic,
 cnicImage: form.cnicImage,
 role, // IMPORTANT
 };

 const res = await fetch(
 `http://localhost:5000/api/auth/register/${role}`,
 {
 method: "POST",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify(payload),
 }
 );

 const data = await res.json();

 if (!res.ok) {
 return alert(data.error || "Signup failed");
 }

 alert("Signup successful 🎉 Please login now");
 }

 return (
 <form onSubmit​={handleSignup} className="space-y-3">
 <h2 className="text-xl font-bold">
 Signup as {role === "worker" ? "Worker" : "Employer"}
 </h2>

 <input
 placeholder="Name"
 className="border p-2 w-full"
 value={form.name}
 onChange​={(e) => setForm({ ...form, name: e.target.value })}
 required
 />

 <input
 type="email"
 placeholder="Email"
 className="border p-2 w-full"
 value={form.email}
 onChange​={(e) => setForm({ ...form, email: e.target.value })}
 required
 />

 <input
 type="password"
 placeholder="Password"
 className="border p-2 w-full"
 value={form.password}
 onChange​={(e) => setForm({ ...form, password: e.target.value })}
 required
 />

 <input
 placeholder="Phone (03XXXXXXXXX)"
 className="border p-2 w-full"
 value={form.phone}
 onChange​={(e) => setForm({ ...form, phone: e.target.value })}
 required
 />

 <input
 placeholder="CNIC (12345-1234567-1)"
 className="border p-2 w-full"
 value={form.cnic}
 onChange​={(e) => setForm({ ...form, cnic: e.target.value })}
 required
 />

 <input
 placeholder="CNIC Image URL"
 className="border p-2 w-full"
 value={form.cnicImage}
 onChange​={(e) =>
 setForm({ ...form, cnicImage: e.target.value })
 }
 required
 />

 <button className="bg-green-600 text-white py-2 w-full rounded">
 Sign Up
 </button>
 </form>
 );
}