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
  if (isLoading) return <p>Loading profabout...</p>;
  if (isError || !profabout) return <p>Failed to load data</p>;

  const { head, deputy } = profabout;

  return (
    <div className="grid grid-cols-1 gap-6">

      {/* Head of Lab */}
      <div className="bg-white rounded-xl p-6 text-center hover:shadow-2xl transition">
        <img
          src={head?.picture}
          alt="Head of Lab"
          className="w-9/12 h-40 object-cover rounded-lg mx-auto border-4 border-indigo-200 shadow-md"
        />
        <div className="mt-4 space-y-1">
          <h2 className="text-xl font-bold text-gray-800">
            {head?.name}
          </h2>

          <p className="text-sm text-gray-600">
            {head?.education?.bsc} {head?.education?.msc && `& ${head.education.msc}`}{" "}
            {head?.education?.phd && `& ${head.education.phd}`}
          </p>

          <p className="text-lg font-semibold text-indigo-700">
            {head?.position}
          </p>

          <p className="text-sm font-bold text-gray-600">
            {head?.department}
          </p>

          <p className="text-sm text-gray-600">
            {head?.university}
          </p>
        </div>
      </div>

      {/* Deputy Head of Lab */}
      <div className="bg-white rounded-xl p-6 text-center hover:shadow-2xl transition">
        <img
          src={deputy?.picture}
          alt="Deputy Head of Lab"
          className="w-9/12 h-40 object-cover rounded-lg mx-auto border-4 border-purple-200 shadow-md"
        />
        <div className="mt-4 space-y-1">
          <h2 className="text-xl font-bold text-gray-800">
            {deputy?.name}
          </h2>

          <p className="text-sm text-gray-600">
            {deputy?.education?.bsc} {deputy?.education?.msc && `& ${deputy.education.msc}`}{" "}
            {deputy?.education?.phd && `& ${deputy.education.phd}`}
          </p>

          <p className="text-lg font-semibold text-purple-700">
            {deputy?.position}
          </p>

          <p className="text-sm font-bold text-gray-600">
            {deputy?.department}
          </p>

          <p className="text-sm text-gray-600">
            {deputy?.university}
          </p>
        </div>
      </div>

    </div>
  );
}
export default ProfAbout;