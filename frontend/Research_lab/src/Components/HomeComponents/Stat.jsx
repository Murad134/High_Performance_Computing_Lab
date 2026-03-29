
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import useAxios from "../../hooks/useAxios";

function Counter({ target, start }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!start) return; // start only when visible

        let startValue = 0;
        const duration = 1000;
        const increment = target / (duration / 16);

        const timer = setInterval(() => {
            startValue += increment;
            if (startValue >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(startValue));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [target, start]);

    return <span>{count}</span>;
}

export default function SimpleStats() {
    const axiosInstance = useAxios();

    const { ref, inView } = useInView({
        triggerOnce: true, // only once animation
        threshold: 0.3,   // 30% visible হলে trigger
    });

    const { data: statsData = {}, isLoading } = useQuery({
        queryKey: ["dashboard-stats"],
        queryFn: async () => {
            const res = await axiosInstance.get("/dashboard/stats");
            return res.data;
        },
    });

    const headExp = statsData.aboutProf?.head?.experience || 0;
    const deputyExp = statsData.aboutProf?.deputy?.experience || 0;
    const totalExp = headExp + deputyExp;

    const stats = [
        {
            label: "Head of Lab Experience",
            value: totalExp,
            icon: "⏳",
            color: "from-orange-500 to-orange-600",
        },
        {
            label: "Departments",
            value: statsData.departments || 0,
            icon: "🏢",
            color: "from-purple-500 to-purple-600",
        },
        {
            label :'Teams',
            value: statsData.teams || 0,
            icon: "👥",
            color: "from-pink-500 to-pink-600",

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
        return <div className="text-center py-10 text-gray-500">Loading...</div>;
    }

    return (
        <div
            ref={ref}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className={`group rounded-2xl p-6 text-white shadow-md bg-gradient-to-r ${stat.color} flex items-center justify-between transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
                >
                    <div>
                        <p className="text-sm opacity-90">{stat.label}</p>
                        <h2 className="text-3xl font-bold mt-2">
                            <Counter target={stat.value} start={inView} />
                        </h2>
                    </div>

                    <div className="text-4xl opacity-80 group-hover:scale-110 transition">
                        {stat.icon}
                    </div>
                </div>
            ))}
        </div>
    );
}