import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const axiosInstance = useAxios();

  const { data: footer, isLoading, isError } = useQuery({
    queryKey: ["footer"],
    queryFn: async () => {
      const res = await axiosInstance.get("/footer");
      return res.data;
    },
  });

  if (isLoading) return <p>Loading footer...</p>;
  if (isError || !footer) return null;

  const socialLinks = [
    { icon: <FaFacebook />, url: footer.socialMedia?.facebook, color: "hover:bg-blue-600", label: "Facebook" },
    { icon: <FaLinkedin />, url: footer.socialMedia?.linkedin, color: "hover:bg-blue-700", label: "LinkedIn" },
    { icon: <FaGithub />, url: footer.socialMedia?.github, color: "hover:bg-slate-700", label: "GitHub" },
  ];

  return (
    <footer className="bg-indigo-900 text-white py-10">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        {/* Lab Info */}
        <div>
          <h4 className="text-lg font-semibold mb-2">{footer.labName}</h4>
          <p className="text-sm">{footer.description}</p>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Contact</h4>
          <p className="text-sm">Email: {footer.email}</p>
          <p className="text-sm">
            Office: {footer.officeAddress?.room}, {footer.officeAddress?.department},{" "}
            {footer.officeAddress?.city}
          </p>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-xl font-semibold text-indigo-400 border-l-4 border-yellow-400 pl-3 mb-3">
            Connect
          </h4>
          <div className="flex gap-4">
            {socialLinks.map(
              (link, i) =>
                link.url && (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className={`w-12 h-12 bg-slate-800/50 ${link.color} rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg border border-slate-700/30`}
                  >
                    {link.icon}
                  </a>
                )
            )}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-sm text-gray-300">
        {footer.copyrightText}
      </div>
    </footer>
  );
};
export default Footer;