import React from "react";
import profP from "../assets/Prof.png";
import deputyP from "../assets/Murad.jpg";

function ProfAbout() {
  return (
    <div className="grid grid-cols-1  gap-3">
      {/* Head of Lab */}
      <div className="bg-white  rounded-xl p-6 text-center hover:shadow-2xl transition">
        <img
          src={profP}
          alt="Head of Lab"
          className="w-9/12 h-40 object-cover rounded-lg mx-auto border-4 border-indigo-200 shadow-md"
        />
        <div className="mt-4 space-y-1">
          <h2 className="text-xl font-bold text-gray-800">Sk. Shalauddin Kabir</h2>
          <p className="text-sm text-gray-600">
            B.Sc. (Engg.) & M.Sc. (Engg.) in CSE (JUST)
          </p>
          <p className="text-lg font-semibold text-indigo-700">Head of Lab</p>
          <p className="text-sm font-bold text-gray-600">
            Dept. of Computer Science and Engineering
          </p>
          <p className="text-sm text-gray-600">
            Jashore University of Science and Technology
          </p>
        </div>
      </div>

      {/* Deputy Head of Lab */}
      <div className="bg-white rounded-xl p-6 text-center hover:shadow-2xl transition">
        <img
          src={deputyP}
          alt="Deputy Head of Lab"
          className="w-9/12 h-40 object-cover rounded-lg mx-auto border-4 border-purple-200 shadow-md"
        />
        <div className="mt-4 space-y-1">
          <h2 className="text-xl font-bold text-gray-800">[Deputy Head Name]</h2>
          <p className="text-sm text-gray-600">
            [Degree Info, e.g. B.sc(Engg.) in CSE (JUST)]
          </p>
          <p className="text-lg font-semibold text-purple-700">Deputy Head of Lab</p>
          <p className="text-sm font-bold text-gray-600">
            Dept. of Computer Science and Engineering
          </p>
          <p className="text-sm text-gray-600">
            Jashore University of Science and Technology
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProfAbout;
