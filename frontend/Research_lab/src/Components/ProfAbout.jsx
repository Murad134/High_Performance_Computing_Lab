import React from "react";
import useAxios from "../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

function ProfAbout() {
  const axiosInstance = useAxios();
  const { data: profabout, isLoading, isError } = useQuery({
    queryKey: ["profabout"],
    queryFn: async () => {
      const res = await axiosInstance.get("/aboutprof");
      return res.data;
    },
  });

  if (isLoading) return (
    <div className="flex items-center justify-center py-8">
      <div className="w-8 h-8 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin"></div>
    </div>
  );
  if (isError || !profabout) return null;

  const { head, deputy } = profabout;

  return (
    <div className="grid grid-cols-1 gap-6">

      {/* Head of Lab */}
      <div className="bg-white rounded-xl p-6 text-center hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-teal-100">
        <img
          src={head?.picture}
          alt="Head of Lab"
          className="w-9/12 h-40 object-cover rounded-lg mx-auto border-4 border-teal-200 shadow-md hover:shadow-lg transition-shadow duration-300"
        />
        <div className="mt-4 space-y-1">
          <h2 className="text-xl font-bold text-slate-800">
            {head?.name}
          </h2>

          <p className="text-sm text-slate-600">
            {head?.education?.bsc} {head?.education?.msc && `& ${head.education.msc}`}{" "}
            {head?.education?.phd && `& ${head.education.phd}`}
          </p>

          <p className="text-lg font-semibold text-teal-700">
            {head?.position}
          </p>

          <p className="text-sm font-bold text-slate-600">
            {head?.department}
          </p>

          <p className="text-sm text-slate-600">
            {head?.university}
          </p>
        </div>
      </div>

      {/* Deputy Head of Lab */}
      <div className="bg-white rounded-xl p-6 text-center hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-cyan-100">
        <img
          src={deputy?.picture}
          alt="Deputy Head of Lab"
          className="w-9/12 h-40 object-cover rounded-lg mx-auto border-4 border-cyan-200 shadow-md hover:shadow-lg transition-shadow duration-300"
        />
        <div className="mt-4 space-y-1">
          <h2 className="text-xl font-bold text-slate-800">
            {deputy?.name}
          </h2>

          <p className="text-sm text-slate-600">
            {deputy?.education?.bsc} {deputy?.education?.msc && `& ${deputy.education.msc}`}{" "}
            {deputy?.education?.phd && `& ${deputy.education.phd}`}
          </p>

          <p className="text-lg font-semibold text-cyan-700">
            {deputy?.position}
          </p>

          <p className="text-sm font-bold text-slate-600">
            {deputy?.department}
          </p>

          <p className="text-sm text-slate-600">
            {deputy?.university}
          </p>
        </div>
      </div>

    </div>
  );
}

export default ProfAbout;