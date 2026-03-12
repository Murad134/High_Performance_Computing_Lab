import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";
import ProfAbout from "../Components/profAbout";
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

  if (isLoading) {
    return (
      <div className="text-center mt-20 text-lg font-semibold">
        Loading Contact Information...
      </div>
    );
  }

  if (isError || !contact) {
    return (
      <div className="text-center mt-20 text-red-500">
        Failed to load contact information.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-start rounded-xl p-8 pt-16">

      {/* Left Sidebar */}
      <aside className="md:col-span-4 p-4 rounded-lg">
        <ProfAbout />
      </aside>

      {/* Main Content */}
      <aside className="md:col-span-8 space-y-6">

        {/* ================= General Information ================= */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl
         border border-blue-100 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-blue-300">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">General Information</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-3 bg-white/60 rounded-lg">
              <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <div>
                <p className="text-xs text-gray-500 font-medium mb-1">Room</p>
                <p className="text-gray-800 font-semibold">{contact.room}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-white/60 rounded-lg">
              <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
              <div>
                <p className="text-xs text-gray-500 font-medium mb-1">Department</p>
                <p className="text-gray-800 font-semibold">{contact.department}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-white/60 rounded-lg">
              <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-5L9 4H4zm7 5a1 1 0 10-2 0v1H8a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-xs text-gray-500 font-medium mb-1">Building</p>
                <p className="text-gray-800 font-semibold">{contact.building}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-white/60 rounded-lg">
              <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-xs text-gray-500 font-medium mb-1">University</p>
                <p className="text-gray-800 font-semibold">{contact.university}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-white/60 rounded-lg sm:col-span-2">
              <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-xs text-gray-500 font-medium mb-1">City - Zip</p>
                <p className="text-gray-800 font-semibold">{contact.cityZip}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= Head of Lab ================= */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-100 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-green-300">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Head of Lab</h2>
          </div>

          <div className="space-y-4">
            {/* Email */}
            <div className="flex items-center gap-3 p-4 bg-white/70 rounded-xl hover:bg-white transition-colors group">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 font-medium mb-1">Email</p>
                <a
                  href={`mailto:${contact.headEmail}`}
                  className="text-green-600 hover:text-green-700 font-semibold hover:underline transition-colors"
                >
                  {contact.headEmail}
                </a>
              </div>
            </div>

            {/* LinkedIn */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              {contact.headLinkedin && (
                <div className="flex items-center gap-3 p-4 bg-white/70 rounded-xl hover:bg-white transition-colors group">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <FaLinkedin className="w-5 h-5 text-blue-700" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-medium mb-1">LinkedIn Profile</p>
                    <a
                      href={contact.headLinkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 hover:text-blue-800 font-semibold hover:underline transition-colors flex items-center gap-2"
                    >
                      View Profile
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              )}

              {/* Facebook */}
              {contact.headFacebook && (
                <div className="flex items-center gap-3 p-4 bg-white/70 rounded-xl hover:bg-white transition-colors group">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                    <FaFacebook className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-medium mb-1">Facebook Profile</p>
                    <a
                      href={contact.headFacebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors flex items-center gap-2"
                    >
                      View Profile
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* ================= Deputy Head of Lab ================= */}
        <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-8 rounded-2xl  border border-purple-100 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-purple-300">
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Deputy Head of Lab</h2>
          </div>

          <div className="space-y-4">
            {/* Email */}
            <div className="flex items-center gap-3 p-4 bg-white/70 rounded-xl hover:bg-white transition-colors group">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 font-medium mb-1">Email</p>
                <a
                  href={`mailto:${contact.deputyHeadEmail}`}
                  className="text-purple-600 hover:text-purple-700 font-semibold hover:underline transition-colors"
                >
                  {contact.deputyHeadEmail}
                </a>
              </div>
            </div>

            {/* LinkedIn */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>

              {contact.deputyHeadLinkedin && (
                <div className="flex items-center gap-3 p-4 bg-white/70 rounded-xl hover:bg-white transition-colors group">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <FaLinkedin className="w-5 h-5 text-blue-700" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-medium mb-1">LinkedIn Profile</p>
                    <a
                      href={contact.deputyHeadLinkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 hover:text-blue-800 font-semibold hover:underline transition-colors flex items-center gap-2"
                    >
                      View Profile
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              )}

              {/* Facebook */}
              {contact.deputyHeadFacebook && (
                <div className="flex items-center gap-3 p-4 bg-white/70 rounded-xl hover:bg-white transition-colors group">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                    <FaFacebook className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-medium mb-1">Facebook Profile</p>
                    <a
                      href={contact.deputyHeadFacebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors flex items-center gap-2"
                    >
                      View Profile
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
export default Contact;