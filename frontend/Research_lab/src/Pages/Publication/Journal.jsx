import React from "react";
import { FileText, ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
const Journal = () => {

    const axiosInstance = useAxios();

    // GET Journals
    const { data: journals = [], isLoading, isError } = useQuery({
        queryKey: ["journals"],
        queryFn: async () => {
            const res = await axiosInstance.get("/journals");
            return res.data;
        }
    });

    // loading
    if (isLoading) {
        return <p className="text-center mt-10 text-lg">Loading journals...</p>;
    }

    if (isError) {
        return <p className="text-center mt-10 text-red-500">Failed to load journals</p>;
    }

    // GROUP BY YEAR
    const grouped = journals.reduce((acc, item) => {
        const year = item.year || "Unknown";

        if (!acc[year]) {
            acc[year] = [];
        }

        acc[year].push(item);

        return acc;
    }, {});

    // link finder
    const getLink = (publication) => {
        if (publication.doi) return `https://doi.org/${publication.doi}`;
        if (publication.pdfUrl) return publication.pdfUrl;
        if (publication.articleUrl) return publication.articleUrl;
        return null;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="max-w-6xl mx-auto px-4">

                {/* Header */}
                <div className="text-center mb-14 pt-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-4 tracking-tight">
                        Journal Publications
                    </h1>
                    <div className="w-28 h-1.5 bg-gradient-to-r from-teal-400 to-blue-500 mx-auto rounded-full shadow-sm"></div>
                </div>

                {/* YEAR GROUP */}
                {Object.keys(grouped)
                    .sort((a, b) => b - a)
                    .map((year) => (
                        <div key={year} className="mb-10">

                            {/* YEAR BADGE */}
                            <div className="flex items-center mb-6">
                                <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

                                <div className="mx-4 px-6 py-2 bg-gradient-to-r from-teal-400 to-teal-500 rounded-full shadow-md">
                                    <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide">
                                        {year}
                                    </h2>
                                </div>

                                <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                            </div>

                            {/* Publications */}
                            <div className="space-y-6">

                                {grouped[year].map((publication) => {
                                    const link = getLink(publication);

                                    return (
                                        <div
                                            key={publication._id}
                                            className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-2xl hover:border-teal-300 transition-all duration-300"
                                        >

                                            <div className="flex gap-4">

                                                {/* ICON */}
                                                <div className="flex-shrink-0">
                                                    <div className="p-3 bg-gradient-to-br from-teal-400 to-teal-500 rounded-xl shadow-md group-hover:scale-110 transition">
                                                        <FileText className="w-6 h-6 text-white" />
                                                    </div>
                                                </div>

                                                <div className="flex-1">

                                                    {/* TITLE */}
                                                    <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 leading-snug group-hover:text-teal-600 transition">
                                                        {publication.title}
                                                    </h3>

                                                    {/* AUTHORS */}
                                                    <p className="text-gray-600 mb-2 text-sm md:text-base leading-relaxed">
                                                        <span className="font-semibold text-gray-700">Authors:</span>{" "}
                                                        {publication.authors
                                                            ?.sort((a, b) => a.authorOrder - b.authorOrder)
                                                            .map((a) => a.name)
                                                            .join(", ")}
                                                    </p>

                                                    {/* JOURNAL NAME */}
                                                    <p className="text-sm md:text-base italic text-gray-500 mb-4">
                                                        {publication.journalName}
                                                    </p>

                                                    {/* META */}
                                                    <div className="flex flex-wrap gap-2 mb-4">
                                                        {publication.volume && (
                                                            <span className="px-3 py-1 bg-gray-100 rounded-full text-xs md:text-sm font-medium text-gray-600">
                                                                Vol. {publication.volume}
                                                            </span>
                                                        )}

                                                        {publication.issue && (
                                                            <span className="px-3 py-1 bg-gray-100 rounded-full text-xs md:text-sm font-medium text-gray-600">
                                                                Issue {publication.issue}
                                                            </span>
                                                        )}

                                                        {publication.pages && (
                                                            <span className="px-3 py-1 bg-gray-100 rounded-full text-xs md:text-sm font-medium text-gray-600">
                                                                pp. {publication.pages}
                                                            </span>
                                                        )}
                                                    </div>

                                                    {/* FOOTER */}
                                                    <div className="flex items-center justify-between">

                                                        {/* Year small badge */}
                                                        <span className="text-xs px-2 py-1 bg-teal-50 text-teal-600 rounded-md font-semibold">
                                                            {year}
                                                        </span>

                                                        {/* VIEW BUTTON */}
                                                        {link && (
                                                            <a
                                                                href={link}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-400 to-teal-500 text-white text-sm font-semibold rounded-lg hover:from-teal-500 hover:to-teal-600 transition shadow"
                                                            >
                                                                View
                                                                <ExternalLink className="w-4 h-4" />
                                                            </a>
                                                        )}
                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

            </div>
        </div>
    );
};
export default Journal;