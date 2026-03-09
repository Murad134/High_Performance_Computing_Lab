import React from "react";
import { Mic, ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
const Conference = () => {

    const axiosInstance = useAxios();


    // GET API
    const { data: conferences = [], isLoading, isError } = useQuery({
        queryKey: ["conferences"],
        queryFn: async () => {
            const res = await axiosInstance.get("/conferences");
            return res.data;
        }
    });

    if (isLoading) {
        return <p className="text-center mt-10">Loading conferences...</p>;
    }

    if (isError) {
        return <p className="text-center text-red-500 mt-10">Failed to load conferences</p>;
    }

    // GROUP BY YEAR
    const grouped = conferences.reduce((acc, item) => {

        const year = item?.dates?.start_date
            ? new Date(item.dates.start_date).getFullYear()
            : "Unknown";

        if (!acc[year]) acc[year] = [];

        acc[year].push(item);

        return acc;

    }, {});

    return (
        <div className="min-h-screen bg-gray-50">

            <div className="mx-auto px-2">

                {/* HEADER */}
                <div className="text-center mb-12 pt-5">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-4">
                        Conference
                    </h1>
                    <div className="w-24 h-1 bg-teal-400 mx-auto rounded-full"></div>
                </div>

                {/* YEAR GROUP */}
                {Object.keys(grouped)
                    .sort((a, b) => b - a)
                    .map((year) => (

                        <div key={year} className="mb-6">

                            {/* YEAR BADGE */}
                            <div className="flex items-center mb-4">

                                <div className="h-px flex-1 bg-gray-300"></div>

                                <div className="mx-6 px-6 py-2 bg-teal-400 rounded-full shadow-lg">
                                    <h2 className="text-2xl font-bold text-white tracking-wide">
                                        {year}
                                    </h2>
                                </div>

                                <div className="h-px flex-1 bg-gray-300"></div>

                            </div>

                            <div className="space-y-6">

                                {grouped[year].map((conference) => (

                                    <div
                                        key={conference._id}
                                        className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-xl hover:border-teal-300 transition-all duration-300"
                                    >

                                        <div className="flex items-start gap-4">

                                            {/* ICON */}
                                            <div className="flex-shrink-0 mt-1">
                                                <div className="p-2.5 bg-teal-400 rounded-lg shadow-md">
                                                    <Mic className="w-6 h-6 text-white" />
                                                </div>
                                            </div>

                                            <div className="flex-1">

                                                {/* TITLE */}
                                                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-teal-500">
                                                    {conference.title}
                                                </h3>

                                                {/* THEME */}
                                                <p className="text-gray-600 italic mb-2">
                                                    {conference.theme}
                                                </p>

                                                {/* VENUE */}
                                                <p className="text-gray-600 mb-2">
                                                    📍 {conference.venue?.building}, {conference.venue?.city},{" "}
                                                    {conference.venue?.country}
                                                </p>

                                                {/* DATE */}
                                                <p className="text-gray-500 text-sm mb-3">
                                                    {conference.dates?.start_date} → {conference.dates?.end_date}
                                                </p>

                                                {/* KEYNOTE GUEST */}
                                                {conference.guests?.length > 0 && (
                                                    <p className="text-sm text-gray-700 mb-3">
                                                        <span className="font-semibold">Speaker:</span>{" "}
                                                        {conference.guests.map(g => g.name).join(", ")}
                                                    </p>
                                                )}

                                                {/* META */}
                                                <div className="flex flex-wrap gap-3 mb-3">

                                                    <span className="px-3 py-1 bg-gray-100 text-sm rounded-lg">
                                                        {conference.conference_type}
                                                    </span>

                                                    <span className="px-3 py-1 bg-gray-100 text-sm rounded-lg">
                                                        Fee: ${conference.registration?.fee}
                                                    </span>

                                                    {conference.published_proceedings && (
                                                        <span className="px-3 py-1 bg-green-50 text-green-700 text-sm rounded-lg">
                                                            Proceedings Published
                                                        </span>
                                                    )}

                                                </div>

                                                {/* WEBSITE */}
                                                {conference.contact?.website && (

                                                    <a
                                                        href={conference.contact.website}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 text-teal-500 hover:text-teal-600 text-sm font-semibold"
                                                    >
                                                        Visit Website
                                                        <ExternalLink className="w-4 h-4" />
                                                    </a>

                                                )}

                                            </div>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        </div>

                    ))}

            </div>

        </div>
    );
};

export default Conference;