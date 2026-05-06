import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";
import {
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaExternalLinkAlt,
  FaChevronRight,
  FaFlask,
  FaGraduationCap,
  FaBuilding,
} from "react-icons/fa";

const Footer = () => {
  const axiosInstance = useAxios();

  const { data: footer, isLoading, isError } = useQuery({
    queryKey: ["footer"],
    queryFn: async () => {
      const res = await axiosInstance.get("/footer");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="bg-teal-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-300 mx-auto mb-4"></div>
          <p className="text-teal-200">Loading footer...</p>
        </div>
      </div>
    );

  if (isError || !footer) return null;

  const socialLinks = [
    {
      icon: <FaFacebook />,
      url: footer.socialMedia?.facebook,
      color: "hover:bg-teal-600",
      bgColor: "bg-teal-100",
      iconColor: "text-teal-600",
      label: "Facebook"
    },
    {
      icon: <FaLinkedin />,
      url: footer.socialMedia?.linkedin,
      color: "hover:bg-teal-700",
      bgColor: "bg-teal-200",
      iconColor: "text-teal-700",
      label: "LinkedIn"
    },
    {
      icon: <FaGithub />,
      url: footer.socialMedia?.github,
      color: "hover:bg-teal-800",
      bgColor: "bg-teal-300",
      iconColor: "text-teal-800",
      label: "GitHub"
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-teal-900 via-teal-800 to-teal-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-white rounded-full translate-x-40 translate-y-40"></div>
      </div>

      <div className="relative z-10">
        {/* Academic Header */}
        <div className="border-b border-teal-700/50">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="bg-teal-600 p-2 rounded-lg">
                <FaFlask className="text-teal-100 text-xl" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-teal-100">
                High Performance Computing Lab
              </h2>
            </div>
            <p className="text-center text-teal-200 max-w-2xl mx-auto">
              Advancing computational research and innovation in high-performance computing technologies
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">

            {/* Lab Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-teal-600 p-2 rounded-lg">
                  <FaBuilding className="text-teal-100 text-lg" />
                </div>
                <h4 className="text-xl font-bold text-teal-100">About the Lab</h4>
              </div>

              <div className="space-y-3">
                <h5 className="text-lg font-semibold text-white">{footer.labName}</h5>
                <p className="text-teal-200 leading-relaxed text-sm">
                  {footer.description}
                </p>
              </div>

              <div className="pt-4 border-t border-teal-700/50">
                <div className="flex items-center gap-2 text-teal-300">
                  <FaGraduationCap className="text-sm" />
                  <span className="text-sm font-medium">Academic Research Excellence</span>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-teal-600 p-2 rounded-lg">
                  <FaEnvelope className="text-teal-100 text-lg" />
                </div>
                <h4 className="text-xl font-bold text-teal-100">Contact Information</h4>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FaEnvelope className="text-teal-400 mt-1 text-sm" />
                  <div>
                    <p className="text-white font-medium text-sm">Email</p>
                    <p className="text-teal-200 text-sm">{footer.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-teal-400 mt-1 text-sm" />
                  <div>
                    <p className="text-white font-medium text-sm">Office Location</p>
                    <p className="text-teal-200 text-sm leading-relaxed">
                      {footer.officeAddress?.room}, {footer.officeAddress?.department}<br />
                      {footer.officeAddress?.city}
                    </p>
                  </div>
                </div>

                {footer.phone && (
                  <div className="flex items-start gap-3">
                    <FaPhone className="text-teal-400 mt-1 text-sm" />
                    <div>
                      <p className="text-white font-medium text-sm">Phone</p>
                      <p className="text-teal-200 text-sm">{footer.phone}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Social Media & Connect */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-teal-600 p-2 rounded-lg">
                  <FaExternalLinkAlt className="text-teal-100 text-lg" />
                </div>
                <h4 className="text-xl font-bold text-teal-100">Connect With Us</h4>
              </div>

              <p className="text-teal-200 text-sm leading-relaxed mb-6">
                Follow our research journey and stay updated with the latest developments in high-performance computing.
              </p>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map(
                    (link, i) =>
                      link.url && (
                        <a
                          key={i}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={link.label}
                          className={`group relative w-12 h-12 ${link.bgColor} ${link.color} rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg border-2 border-transparent hover:border-teal-400 overflow-hidden`}
                        >
                          <span className={`${link.iconColor} text-lg group-hover:text-white transition-colors`}>
                            {link.icon}
                          </span>
                          <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-teal-600 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                        </a>
                      )
                  )}
                </div>

                <div className="pt-4 border-t border-teal-700/50">
                  <p className="text-teal-300 text-sm">
                    Join our academic community and contribute to cutting-edge research.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Footer Bottom */}
        <div className="border-t border-teal-700/50 bg-teal-950/50">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-teal-300">
                <FaChevronRight className="text-xs" />
                <span className="text-sm font-medium">{footer.copyrightText}</span>
              </div>

              <div className="flex items-center gap-4 text-teal-400 text-sm">
                <span className="flex items-center gap-1">
                  <FaFlask className="text-xs" />
                  Research Excellence
                </span>
                <span className="flex items-center gap-1">
                  <FaGraduationCap className="text-xs" />
                  Academic Innovation
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;