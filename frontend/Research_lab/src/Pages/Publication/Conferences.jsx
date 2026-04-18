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
        const year = item?.yearOfPublication || item?.year || "Unknown";

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

                                                <p className="text-gray-600 italic mb-2">
                                                    {conference.conferenceName || conference.publicationName || "-"}
                                                </p>

                                                <p className="text-gray-600 mb-2">
                                                    <span className="font-semibold">Publication:</span> {conference.publicationName || "-"}
                                                </p>

                                                <p className="text-gray-600 mb-2">
                                                    <span className="font-semibold">Publisher:</span> {conference.publisher || "-"}
                                                </p>

                                                <p className="text-gray-500 text-sm mb-3">
                                                    <span className="font-semibold">Year:</span> {conference.yearOfPublication || conference.year || "-"}
                                                </p>

                                                {conference.authors?.length > 0 && (
                                                    <p className="text-sm text-gray-700 mb-3">
                                                        <span className="font-semibold">Authors:</span>{" "}
                                                        {conference.authors
                                                            .map((a) => (typeof a === "string" ? a : a?.name))
                                                            .filter(Boolean)
                                                            .join(", ")}
                                                    </p>
                                                )}

                                                {conference.keywords?.length > 0 && (
                                                    <p className="text-sm text-gray-700 mb-3">
                                                        <span className="font-semibold">Keywords:</span>{" "}
                                                        {conference.keywords.join(", ")}
                                                    </p>
                                                )}

                                                {/* META */}
                                                <div className="flex flex-wrap gap-3 mb-3">
                                                    {conference.conferenceVolume && (
                                                        <span className="px-3 py-1 bg-gray-100 text-sm rounded-lg">
                                                            Volume: {conference.conferenceVolume}
                                                        </span>
                                                    )}

                                                    {conference.issue && (
                                                        <span className="px-3 py-1 bg-gray-100 text-sm rounded-lg">
                                                            Issue: {conference.issue}
                                                        </span>
                                                    )}

                                                    {conference.pp && (
                                                        <span className="px-3 py-1 bg-gray-100 text-sm rounded-lg">
                                                            pp: {conference.pp}
                                                        </span>
                                                    )}

                                                </div>

                                                {/* PUBLICATION URL */}
                                                {(conference.publicationUrl || conference.contact?.website) && (

                                                    <a
                                                        href={conference.publicationUrl || conference.contact?.website}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 text-teal-500 hover:text-teal-600 text-sm font-semibold"
                                                    >
                                                        View Publication
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