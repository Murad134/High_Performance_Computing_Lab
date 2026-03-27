import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";

export default function SimpleStats() {
    const axiosInstance = useAxios();

    const { data: statsData = {}, isLoading } = useQuery({
        queryKey: ["dashboard-stats"],
        queryFn: async () => {
            const res = await axiosInstance.get("/dashboard/stats");
            return res.data;
        },
    });
    // Extract experience properly
    const headExp = statsData.aboutProf?.head?.experience || 0;
    const deputyExp = statsData.aboutProf?.deputy?.experience || 0;
    const totalExp = headExp + deputyExp;

    const stats = [
        {
            label: "Total Experience",
            value: totalExp,
            icon: "⏳",
            color: "from-orange-500 to-orange-600",
        },
        {
            label: "Publications",
            value: statsData.publications || 0,
            icon: "📘",
            color: "from-green-500 to-green-600",
        },
        {
            label: "Members / Students",
            value: statsData.members || 0,
            icon: "👨‍🎓",
            color: "from-blue-500 to-blue-600",
        },
    ];
    if (isLoading) {
        return (
            <div className="text-center py-10 text-gray-500">
                Loading stats...
            </div>
        );
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className={`rounded-2xl p-6 text-white shadow-lg bg-gradient-to-r ${stat.color} flex items-center justify-between`}
                >
                    <div>
                        <p className="text-sm opacity-90">{stat.label}</p>
                        <h2 className="text-3xl font-bold mt-2">{stat.value}</h2>
                    </div>
                    <div className="text-4xl opacity-80">{stat.icon}</div>
                </div>
            ))}
        </div>
    );
}