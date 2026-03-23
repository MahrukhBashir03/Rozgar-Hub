"use client";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { Wrench, Building2, Check } from "lucide-react";
import { useLanguage } from "../app/context/LanguageContext";


export default function UserTypes() {
  const router = useRouter();

  const workerBenefits = [
    "Electricians, plumbers, masons, carpenters",
    "House cleaners, cooks, domestic helpers",
    "Painters, gardeners, AC technicians",
    "Drivers, delivery personnel",
    "Tailors, beauticians, skilled women",
    "Construction workers, daily wagers",
  ];

  const employerBenefits = [
    "Homeowners needing repairs",
    "Small business owners",
    "Construction site managers",
    "Event organizers",
    "Shops and restaurants",
    "Anyone needing skilled help",
  ];

  const handleWorkerClick = () => {
    Swal.fire({
      title: "Register as Worker",
      text: "You'll be able to find jobs near you and set your own rates!",
      icon: "info",
      iconColor: "#3b82f6",
      confirmButtonText: "Continue to Registration",
      confirmButtonColor: "#3b82f6",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      cancelButtonColor: "#6b7280",
    }).then((result) => {
      if (result.isConfirmed) {
        router.push("/auth/register/worker");
      }
    });
  };

  const handleEmployerClick = () => {
    Swal.fire({
      title: "Post a Job",
      text: "Post your job requirements and hire verified workers instantly!",
      icon: "info",
      iconColor: "#10b981",
      confirmButtonText: "Continue to Registration",
      confirmButtonColor: "#10b981",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      cancelButtonColor: "#6b7280",
    }).then((result) => {
      if (result.isConfirmed) {
        router.push("/auth/register/employer");
      }
    });
  };

  return (
    <section
      id="user-types"
      className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-medium mb-4">
            Who Is This For?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
            Built for <span className="text-blue-600">Workers</span> &{" "}
            <span className="text-green-600">Employers</span>
          </h2>
          <p className="text-lg text-gray-600">
            Whether you're looking for your next job or searching for skilled
            help, Rozgar Hub is designed with you in mind.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Worker Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600">
                <Wrench className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  For Workers
                </h3>
                <p className="text-gray-600">Find work near you</p>
              </div>
            </div>

            <p className="text-gray-600 mb-6">
              Create your profile, set your rates, and start receiving job
              requests from employers in your area. No middlemen, no waiting at
              labor chowks.
            </p>

            <ul className="space-y-3 mb-8">
              {workerBenefits.map((benefit, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-blue-600" />
                  </div>
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={handleWorkerClick}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 flex items-center justify-center gap-2"
            >
              <Wrench className="w-5 h-5" />
              Register as Worker
            </button>
          </div>

          {/* Employer Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-green-500 to-green-600">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  For Employers
                </h3>
                <p className="text-gray-600">Hire verified workers</p>
              </div>
            </div>

            <p className="text-gray-600 mb-6">
              Post job requirements, browse verified worker profiles, negotiate
              rates, and hire the right person for any task — all in minutes.
            </p>

            <ul className="space-y-3 mb-8">
              {employerBenefits.map((benefit, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={handleEmployerClick}
              className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-lg shadow-green-500/30 hover:shadow-green-500/50 flex items-center justify-center gap-2"
            >
              <Building2 className="w-5 h-5" />
              Post a Job
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}