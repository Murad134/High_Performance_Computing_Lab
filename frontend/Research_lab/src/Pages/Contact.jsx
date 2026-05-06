import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";
import ProfAbout from "../Components/ProfAbout";
import { FaLinkedin, FaFacebook } from "react-icons/fa";
import { Mail, Globe, GraduationCap, Award, Users, Building, MapPin } from "lucide-react";

function Contact() {
  const axiosInstance = useAxios();

  const { data: contact, isLoading, isError } = useQuery({
    queryKey: ["contact"],
    queryFn: async () => {
      const res = await axiosInstance.get("/contact");
      return res.data;
    },
  });

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-lg font-semibold text-teal-700">Loading Contact Information...</p>
      </div>
    </div>
  );

  if (isError || !contact) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-8 bg-red-50 rounded-2xl border border-red-200">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <p className="text-lg font-semibold text-red-700">Failed to load contact information.</p>
      </div>
    </div>
  );

  /* ===== Enhanced Link Card ===== */
  const LinkCard = ({ label, href, isEmail = false, icon, variant = "primary" }) => {
    const variants = {
      primary: {
        bg: "bg-teal-50",
        hover: "hover:bg-teal-100",
        text: "text-teal-700 hover:text-teal-800",
        icon: "text-teal-600",
        border: "border-teal-200"
      },
      secondary: {
        bg: "bg-cyan-50",
        hover: "hover:bg-cyan-100",
        text: "text-cyan-700 hover:text-cyan-800",
        icon: "text-cyan-600",
        border: "border-cyan-200"
      },
      accent: {
        bg: "bg-blue-50",
        hover: "hover:bg-blue-100",
        text: "text-blue-700 hover:text-blue-800",
        icon: "text-blue-600",
        border: "border-blue-200"
      }
    };
    const v = variants[variant];

    return (
      <div className={`group p-4 bg-white/80 backdrop-blur-sm rounded-xl border ${v.border} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}>
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 ${v.bg} rounded-xl flex items-center justify-center ${v.hover} transition-all duration-300 group-hover:scale-110`}>
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">{label}</p>
            {isEmail ? (
              <a href={`mailto:${href}`} className={`${v.text} font-semibold hover:underline transition-colors block text-sm`}>
                {href}
              </a>
            ) : (
              <a href={href} target="_blank" rel="noopener noreferrer"
                className={`${v.text} font-semibold hover:underline transition-colors flex items-center gap-2 text-sm`}>
                View Profile
                <svg className="w-4 h-4 flex-shrink-0 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    );
  };

  /* ===== Info Card ===== */
  const InfoCard = ({ icon, label, value, variant = "primary" }) => {
    const variants = {
      primary: {
        bg: "bg-teal-50",
        text: "text-teal-700",
        icon: "text-teal-600",
        border: "border-teal-200"
      },
      secondary: {
        bg: "bg-cyan-50",
        text: "text-cyan-700",
        icon: "text-cyan-600",
        border: "border-cyan-200"
      }
    };
    const v = variants[variant];

    return (
      <div className={`p-4 bg-white/80 backdrop-blur-sm rounded-xl border ${v.border} hover:shadow-md transition-all duration-300`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 ${v.bg} rounded-lg flex items-center justify-center`}>
            {icon}
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">{label}</p>
            <p className={`font-semibold ${v.text} text-sm`}>{value}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-cyan-50/40">
      <div className="mx-auto px-4 py-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-8">
              <ProfAbout />
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-8 space-y-8">

            {/* ================= General Information ================= */}
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl border border-teal-200 shadow-[0_25px_50px_-20px_rgba(20,184,166,0.25)] hover:shadow-[0_35px_60px_-25px_rgba(20,184,166,0.4)] transition-all duration-500">
              <div className="flex items-center gap-4 mb-8 pb-6 border-b-2 border-teal-300">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-600">Contact Details</p>
                  <h2 className="text-3xl font-bold text-slate-900">General Information</h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoCard icon={<Building className="w-5 h-5 text-teal-600" />} label="Room" value={contact.room} />
                <InfoCard icon={<Users className="w-5 h-5 text-teal-600" />} label="Department" value={contact.department} />
                <InfoCard icon={<Building className="w-5 h-5 text-teal-600" />} label="Building" value={contact.building} />
                <InfoCard icon={<GraduationCap className="w-5 h-5 text-teal-600" />} label="University" value={contact.university} />
                <div className="md:col-span-2">
                  <InfoCard icon={<MapPin className="w-5 h-5 text-cyan-600" />} label="City - Zip" value={contact.cityZip} variant="secondary" />
                </div>
              </div>
            </div>

            {/* ================= Head of Lab ================= */}
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl border border-teal-200 shadow-[0_25px_50px_-20px_rgba(20,184,166,0.25)] hover:shadow-[0_35px_60px_-25px_rgba(20,184,166,0.4)] transition-all duration-500">
              <div className="flex items-center gap-4 mb-8 pb-6 border-b-2 border-teal-300">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-600">Leadership</p>
                  <h2 className="text-3xl font-bold text-slate-900">Head of Lab</h2>
                </div>
              </div>

              <div className="space-y-6">
                {/* Contact Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <LinkCard label="Email Address" href={contact.headEmail} isEmail variant="primary"
                    icon={<Mail className="w-5 h-5" />} />
                  <LinkCard label="University Website" href={contact.headUniversityWebsite} variant="secondary"
                    icon={<Globe className="w-5 h-5" />} />
                </div>

                {/* Academic Profiles */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <LinkCard label="Google Scholar" href={contact.headGoogleScholar} variant="accent"
                    icon={<GraduationCap className="w-5 h-5" />} />
                  <LinkCard label="ResearchGate" href={contact.headResearchGate} variant="primary"
                    icon={<Award className="w-5 h-5" />} />
                </div>

                {/* Social Profiles */}
                {(contact.headLinkedin || contact.headFacebook) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {contact.headLinkedin && (
                      <LinkCard label="LinkedIn Profile" href={contact.headLinkedin} variant="secondary"
                        icon={<FaLinkedin className="w-5 h-5" />} />
                    )}
                    {contact.headFacebook && (
                      <LinkCard label="Facebook Profile" href={contact.headFacebook} variant="secondary"
                        icon={<FaFacebook className="w-5 h-5" />} />
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* ================= Deputy Head of Lab ================= */}
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl border border-teal-200 shadow-[0_25px_50px_-20px_rgba(20,184,166,0.25)] hover:shadow-[0_35px_60px_-25px_rgba(20,184,166,0.4)] transition-all duration-500">
              <div className="flex items-center gap-4 mb-8 pb-6 border-b-2 border-teal-300">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-700 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-600">Leadership</p>
                  <h2 className="text-3xl font-bold text-slate-900">Deputy Head of Lab</h2>
                </div>
              </div>

              <div className="space-y-6">
                {/* Contact Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <LinkCard label="Email Address" href={contact.deputyHeadEmail} isEmail variant="primary"
                    icon={<Mail className="w-5 h-5" />} />
                  <LinkCard label="ResearchGate" href={contact.deputyHeadResearchGate} variant="accent"
                    icon={<Award className="w-5 h-5" />} />
                </div>

                {/* Social Profiles */}
                {(contact.deputyHeadLinkedin || contact.deputyHeadFacebook) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {contact.deputyHeadLinkedin && (
                      <LinkCard label="LinkedIn Profile" href={contact.deputyHeadLinkedin} variant="secondary"
                        icon={<FaLinkedin className="w-5 h-5" />} />
                    )}
                    {contact.deputyHeadFacebook && (
                      <LinkCard label="Facebook Profile" href={contact.deputyHeadFacebook} variant="secondary"
                        icon={<FaFacebook className="w-5 h-5" />} />
                    )}
                  </div>
                )}
              </div>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}

export default Contact;