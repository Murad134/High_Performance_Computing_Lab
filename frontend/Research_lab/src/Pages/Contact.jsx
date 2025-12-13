
import React from 'react'
import ProfAbout from '../Components/profAbout'
import { FaLinkedin, FaFacebook } from "react-icons/fa";

function Contact() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start rounded-xl p-8 pt-16">
      {/* Left */}
      <aside className="md:col-span-4 bg-gray-100 p-4 rounded-lg shadow">
        <ProfAbout />
      </aside>

      {/* Middle */}
      <aside className="md:col-span-8 space-y-8">
        
        {/* General Information */}
        <div className="p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">General Information</h2>
          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-semibold text-lg">Office:</h3>
              <p>
                Room no: 224, Department of Computer Science and Engineering, <br />
                Jatiya Kabi Kazi Nazrul Islam Academic Building, <br />
                JUST, Jashore-7408
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">Email:</h3>
              <a
                href="mailto:sks.kabir@just.edu.bd"
                className="text-blue-600 hover:underline"
              >
                sks.kabir@just.edu.bd
              </a>
            </div>
          </div>
        </div>

        {/* Social Media Information */}
        <div className=" p-6 rounded-lg ">
          <h2 className="text-2xl font-bold mb-4">Social Media Information</h2>
          <div className="space-y-4 text-gray-700">
            {/* LinkedIn */}
            <div className="flex items-center space-x-2">
              <FaLinkedin className="text-blue-700 text-2xl" />
              <a
                href="https://www.linkedin.com/in/your-profile"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline font-medium"
              >
                Connect with me on LinkedIn
              </a>
            </div>

            {/* Facebook */}
            <div className="flex items-center space-x-2">
              <FaFacebook className="text-blue-600 text-2xl" />
              <a
                href="https://www.facebook.com/your-profile"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-medium"
              >
                Connect with me on Facebook
              </a>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}

export default Contact
