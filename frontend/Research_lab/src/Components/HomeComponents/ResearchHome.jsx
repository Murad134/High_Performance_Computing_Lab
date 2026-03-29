import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";

function ResearchInterest() {
  const axiosInstance = useAxios();

  // Fetch AboutProf Data
  const { data: aboutprof, isLoading } = useQuery({
    queryKey: ["aboutprof"],
    queryFn: async () => {
      const res = await axiosInstance.get("/aboutprof");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  if (!aboutprof?.researchInterests?.length)
    return (
      <div className="md:col-span-3 p-8 text-gray-500 text-center shadow-xl">
        No Research Interests Found
      </div>
    );

  return (
    <div className="md:col-span-3  rounded-2xl p-8   ">
      {/* Grid Layout */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-poppins">
        {aboutprof.researchInterests.map((interest) => (
          <li
            key={interest._id}
            className="flex items-center gap-4 p-4 bg-white/80 rounded-xl shadow-md hover:shadow-2xl border-l-4 border-indigo-500 transition-transform transform hover:scale-105 cursor-pointer group"
          >
            <span className="text-indigo-600 text-2xl">{interest.icon}</span>
            <span className="text-gray-800 font-semibold">{interest.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResearchInterest;