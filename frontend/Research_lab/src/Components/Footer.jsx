import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-teal-300 text-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-3 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Brand / Tagline */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-indigo-600">HPC Research Lab</h3>
            <p className="text-indigo-700 leading-relaxed">
              Inspiring innovation and advancing research in High Performance Computing, AI, ML and Data Science.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-indigo-600 border-l-4 border-yellow-400 pl-3">
              Contact
            </h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 mt-1">✉</span>
                <div>
                  <span className="block text-sm text-indigo-600">Email:</span>
                  <a
                    href="mailto:sks.kabir@just.edu.bd"
                    className="text-indigo-600 hover:text-red-800 transition-colors"
                  >
                    sks.kabir@just.edu.bd
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 mt-1">📍</span>
                <div>
                  <span className="block text-sm text-indigo-600">Office:</span>
                  <span className="text-indigo-600">Room 224, Dept. of CSE, JUST, Jashore-7408</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-indigo-600 border-l-4 border-yellow-400 pl-3">
              Connect
            </h4>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-slate-800/50 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg border border-slate-700/30"
                aria-label="Facebook"
              >
                <FaFacebook className="text-xl text-white" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-slate-800/50 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg border border-slate-700/30"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-xl text-white" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-slate-800/50 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg border border-slate-700/30"
                aria-label="GitHub"
              >
                <FaGithub className="text-xl text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-blue-700/30 bg-blue-800/50">
        <div className="max-w-7xl mx-auto px-3 py-2">
          <p className="text-center text-red-700 text-lg">
            © {new Date().getFullYear()} HPC Research Lab — All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}