
import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-300 text-gray-800 mt-16">
      <div className="container mx-auto px-6 md:px-20 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Brand / Tagline */}
        <div>
          <h2 className="text-2xl font-extrabold mb-3">Professor Portfolio</h2>
          <p className="text-sm leading-relaxed text-gray-700">
            Inspiring innovation and advancing research in High Performance Computing, AI, ML and Data Science.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>
              Email:{" "}
              <a
                href="mailto:sks.kabir@just.edu.bd"
                className="hover:underline text-indigo-700"
              >
                sks.kabir@just.edu.bd
              </a>
            </li>
            <li>Office: Room 224, Dept. of CSE, JUST, Jashore-7408</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Connect</h3>
          <div className="flex space-x-4">
            <a
              href="https://www.linkedin.com/in/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-700 transition"
            >
              <FaLinkedin size={26} />
            </a>
            <a
              href="https://www.facebook.com/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-700 transition"
            >
              <FaFacebook size={26} />
            </a>
            <a
              href="https://github.com/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition"
            >
              <FaGithub size={26} />
            </a>
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="border-t border-gray-400 py-4 text-center text-sm text-gray-700">
        © {new Date().getFullYear()} Professor Portfolio — All rights reserved.
      </div>
    </footer>
  );
}
