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

  if (isLoading) return (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
    </div>
  );

  if (!aboutprof?.researchInterests?.length)
    return (
      <div className="bg-gray-50 rounded-xl p-12 text-center">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">🔬</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-600 mb-2">No Research Interests Found</h3>
        <p className="text-gray-500">Research interests will be displayed here once added.</p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto">
      {/* Research Interests Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {aboutprof.researchInterests.map((interest) => (
          <div
            key={interest._id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group cursor-pointer"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">{interest.icon}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Research Area</h3>
                  <p className="text-teal-100 text-sm">Specialization Focus</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h4 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-teal-600 transition-colors leading-tight">
                {interest.title}
              </h4>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                <span>Active Research Domain</span>
              </div>
            </div>

            {/* Hover Effect Indicator */}
            <div className="px-6 pb-4">
              <div className="w-full bg-gray-100 rounded-full h-1 group-hover:bg-teal-200 transition-colors">
                <div className="bg-teal-500 h-1 rounded-full w-0 group-hover:w-full transition-all duration-500"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResearchInterest;