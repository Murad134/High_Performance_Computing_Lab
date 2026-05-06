import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";
import ProfAbout from "../Components/ProfAbout";
import { FaLinkedin, FaFacebook } from "react-icons/fa";

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
    <div className="text-center mt-20 text-lg font-semibold">Loading Contact Information...</div>
  );

  if (isError || !contact) return (
    <div className="text-center mt-20 text-red-500">Failed to load contact information.</div>
  );

  /* ===== Reusable link card ===== */
  const LinkCard = ({ label, href, isEmail = false, icon, colorClass = "teal" }) => {
    const colors = {
      teal: { bg: "bg-teal-100", hover: "hover:bg-teal-200", text: "text-teal-600 hover:text-teal-700", icon: "text-teal-600" },
      blue: { bg: "bg-blue-100", hover: "hover:bg-blue-200", text: "text-blue-600 hover:text-blue-700", icon: "text-blue-600" },
      indigo: { bg: "bg-indigo-100", hover: "hover:bg-indigo-200", text: "text-indigo-600 hover:text-indigo-700", icon: "text-indigo-600" },
      blueSoft: { bg: "bg-blue-50", hover: "hover:bg-blue-100", text: "text-blue-600 hover:text-blue-700", icon: "text-blue-600" },
    };
    const c = colors[colorClass];

    return (
      <div className="flex items-center gap-3 p-4 bg-white/70 rounded-xl hover:bg-white transition-colors group">
        <div className={`w-10 h-10 ${c.bg} rounded-lg flex items-center justify-center ${c.hover} transition-colors`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-slate-500 font-medium mb-1">{label}</p>
          {isEmail ? (
            <a href={`mailto:${href}`} className={`${c.text} font-semibold hover:underline transition-colors truncate block`}>
              {href}
            </a>
          ) : (
            <a href={href} target="_blank" rel="noopener noreferrer"
              className={`${c.text} font-semibold hover:underline transition-colors flex items-center gap-2`}>
              View Profile
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </div>
    );
  };

  /* ===== Icons ===== */
  const EmailIcon = (cls) => (
    <svg className={`w-5 h-5 ${cls}`} fill="currentColor" viewBox="0 0 20 20">
      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
    </svg>
  );
  const WebIcon = (cls) => (
    <svg className={`w-5 h-5 ${cls}`} fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
    </svg>
  );
  const ScholarIcon = (cls) => (
    <svg className={`w-5 h-5 ${cls}`} fill="currentColor" viewBox="0 0 20 20">
      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
      <path d="M3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762z" />
    </svg>
  );
  const ResearchIcon = (cls) => (
    <svg className={`w-5 h-5 ${cls}`} fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-start rounded-xl p-8 pt-16">

      {/* Left Sidebar */}
      <aside className="md:col-span-4 p-4 rounded-lg">
        <ProfAbout />
      </aside>

      {/* Main Content */}
      <aside className="md:col-span-8 space-y-6">

        {/* ================= General Information ================= */}
        <div className="bg-gradient-to-br from-teal-50 to-blue-50 p-6 rounded-2xl border border-teal-100 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-teal-300">
            <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-teal-700">General Information</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Room", value: contact.room },
              { label: "Department", value: contact.department },
              { label: "Building", value: contact.building },
              { label: "University", value: contact.university },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-start gap-3 p-3 bg-white/60 rounded-lg">
                <div>
                  <p className="text-xs text-slate-500 font-medium mb-1">{label}</p>
                  <p className="text-slate-800 font-semibold">{value}</p>
                </div>
              </div>
            ))}
            <div className="flex items-start gap-3 p-3 bg-white/60 rounded-lg sm:col-span-2">
              <div>
                <p className="text-xs text-slate-500 font-medium mb-1">City - Zip</p>
                <p className="text-slate-800 font-semibold">{contact.cityZip}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= Head of Lab ================= */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-blue-300">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-blue-700">Head of Lab</h2>
          </div>

          {/* Row 1: Email | University Website */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <LinkCard label="Email" href={contact.headEmail} isEmail colorClass="blue"
              icon={EmailIcon("text-blue-600")} />
            <LinkCard label="University Website" href={contact.headUniversityWebsite} colorClass="blue"
              icon={WebIcon("text-blue-600")} />
          </div>

          {/* Row 2: Google Scholar | ResearchGate */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <LinkCard label="Google Scholar" href={contact.headGoogleScholar} colorClass="indigo"
              icon={ScholarIcon("text-indigo-600")} />
            <LinkCard label="ResearchGate" href={contact.headResearchGate} colorClass="indigo"
              icon={ResearchIcon("text-indigo-600")} />
          </div>

          {/* Row 3: LinkedIn | Facebook */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contact.headLinkedin && (
              <LinkCard label="LinkedIn Profile" href={contact.headLinkedin} colorClass="blueSoft"
                icon={<FaLinkedin className="w-5 h-5 text-blue-600" />} />
            )}
            {contact.headFacebook && (
              <LinkCard label="Facebook Profile" href={contact.headFacebook} colorClass="blueSoft"
                icon={<FaFacebook className="w-5 h-5 text-blue-600" />} />
            )}
          </div>
        </div>

        {/* ================= Deputy Head of Lab ================= */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl border border-indigo-100 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-indigo-300">
            <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-indigo-700">Deputy Head of Lab</h2>
          </div>

          {/* Row 1: Email | ResearchGate */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <LinkCard label="Email" href={contact.deputyHeadEmail} isEmail colorClass="indigo"
              icon={EmailIcon("text-indigo-600")} />
            <LinkCard label="ResearchGate" href={contact.deputyHeadResearchGate} colorClass="indigo"
              icon={ResearchIcon("text-indigo-600")} />
          </div>

          {/* Row 2: LinkedIn | Facebook */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contact.deputyHeadLinkedin && (
              <LinkCard label="LinkedIn Profile" href={contact.deputyHeadLinkedin} colorClass="blueSoft"
                icon={<FaLinkedin className="w-5 h-5 text-blue-600" />} />
            )}
            {contact.deputyHeadFacebook && (
              <LinkCard label="Facebook Profile" href={contact.deputyHeadFacebook} colorClass="blueSoft"
                icon={<FaFacebook className="w-5 h-5 text-blue-600" />} />
            )}
          </div>
        </div>

      </aside>
    </div>
  );
}

export default Contact;