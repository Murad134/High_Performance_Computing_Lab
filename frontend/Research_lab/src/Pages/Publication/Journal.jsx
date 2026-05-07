import React from "react";
import { FileText, ExternalLink, Calendar, Users, Tag, BookOpen, Award, Globe, TrendingUp } from "lucide-react";
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

    // Loading State
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-teal-200 border-t-teal-600 mb-4"></div>
                    <p className="text-teal-600 font-semibold text-lg">Loading journal publications...</p>
                </div>
            </div>
        );
    }

    // Error State
    if (isError) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="bg-red-100 border border-red-300 rounded-xl p-6 max-w-md">
                        <div className="text-red-500 mb-2">
                            <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <p className="text-red-700 font-semibold">Failed to load journal publications</p>
                        <p className="text-red-600 text-sm mt-1">Please try again later</p>
                    </div>
                </div>
            </div>
        );
    }

    // GROUP BY YEAR
    const grouped = journals.reduce((acc, item) => {
        const year = item.year || "Unknown";
        if (!acc[year]) acc[year] = [];
        acc[year].push(item);
        return acc;
    }, {});

    // Link finder
    const getLink = (publication) => {
        if (publication.doi) return `https://doi.org/${publication.doi}`;
        if (publication.pdfUrl) return publication.pdfUrl;
        if (publication.articleUrl) return publication.articleUrl;
        return null;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {/* HEADER */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full mb-6 shadow-xl">
                        <FileText className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                        Journal Publications
                    </h1>
                    <p className="text-xl text-gray-600 font-medium mb-6 max-w-2xl mx-auto">
                        Explore our peer-reviewed research publications in leading academic journals worldwide
                    </p>
                    <div className="w-32 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 mx-auto rounded-full"></div>
                </div>

                {/* YEAR GROUPS */}
                {Object.keys(grouped)
                    .sort((a, b) => b - a)
                    .map((year) => (
                        <div key={year} className="mb-16">

                            {/* YEAR HEADER */}
                            <div className="flex items-center mb-8">
                                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-teal-200 to-transparent"></div>
                                <div className="mx-8 px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300">
                                    <div className="flex items-center gap-3">
                                        <Calendar className="w-6 h-6 text-white" />
                                        <h2 className="text-3xl font-bold text-white tracking-wide">
                                            {year}
                                        </h2>
                                    </div>
                                </div>
                                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-teal-200 to-transparent"></div>
                            </div>

                            {/* JOURNAL CARDS - ROW WISE (1 per row) */}
                            <div className="grid grid-cols-1 gap-8">
                                {grouped[year].map((publication) => {
                                    const link = getLink(publication);

                                    return (
                                        <div
                                            key={publication._id}
                                            className="group bg-white border border-teal-100 rounded-2xl p-8 hover:shadow-2xl hover:shadow-teal-100/50 hover:border-teal-300 transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02]"
                                        >

                                            {/* HEADER WITH ICON */}
                                            <div className="flex items-start gap-4 mb-6">
                                                <div className="flex-shrink-0">
                                                    <div className="p-3 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                                                        <FileText className="w-7 h-7 text-white" />
                                                    </div>
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-teal-600 transition-colors duration-300 leading-tight">
                                                        {publication.title}
                                                    </h3>
                                                    <div className="flex items-center gap-2 text-teal-600 font-medium">
                                                        <BookOpen className="w-4 h-4" />
                                                        <span className="text-lg">
                                                            {publication.journalName}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* CONTENT GRID */}
                                            <div className="space-y-4 mb-6">

                                                {/* AUTHORS */}
                                                {publication.authors?.length > 0 && (
                                                    <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-4 border border-teal-100">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <Users className="w-4 h-4 text-teal-600" />
                                                            <span className="font-semibold text-teal-800">Authors</span>
                                                        </div>
                                                        <p className="text-sm text-gray-700">
                                                            {publication.authors
                                                                ?.sort((a, b) => a.authorOrder - b.authorOrder)
                                                                .map((a) => a.name)
                                                                .join(", ")}
                                                        </p>
                                                    </div>
                                                )}

                                                {/* PUBLICATION DETAILS */}
                                                <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-4 border border-teal-100">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <BookOpen className="w-4 h-4 text-teal-600" />
                                                        <span className="font-semibold text-teal-800">Publication Details</span>
                                                    </div>
                                                    <div className="space-y-1 text-sm text-gray-700">
                                                        {publication.publisher && (
                                                            <p><span className="font-medium">Publisher:</span> {publication.publisher}</p>
                                                        )}
                                                        {publication.issn && (
                                                            <p><span className="font-medium">ISSN:</span> {publication.issn}</p>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* KEYWORDS */}
                                                {publication.keywords?.length > 0 && (
                                                    <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-4 border border-teal-100">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <Tag className="w-4 h-4 text-teal-600" />
                                                            <span className="font-semibold text-teal-800">Keywords</span>
                                                        </div>
                                                        <div className="flex flex-wrap gap-2">
                                                            {publication.keywords.slice(0, 4).map((keyword, idx) => (
                                                                <span
                                                                    key={idx}
                                                                    className="px-3 py-1 bg-teal-100 text-teal-700 text-xs font-medium rounded-full border border-teal-200"
                                                                >
                                                                    {keyword}
                                                                </span>
                                                            ))}
                                                            {publication.keywords.length > 4 && (
                                                                <span className="px-3 py-1 bg-teal-200 text-teal-800 text-xs font-medium rounded-full">
                                                                    +{publication.keywords.length - 4} more
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}

                                            </div>

                                            {/* META INFORMATION */}
                                            <div className="flex flex-wrap gap-3 mb-6">
                                                {publication.volume && (
                                                    <span className="px-4 py-2 bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-800 text-sm font-semibold rounded-xl border border-teal-200">
                                                        Vol: {publication.volume}
                                                    </span>
                                                )}
                                                {publication.issue && (
                                                    <span className="px-4 py-2 bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-800 text-sm font-semibold rounded-xl border border-teal-200">
                                                        Issue: {publication.issue}
                                                    </span>
                                                )}
                                                {publication.pages && (
                                                    <span className="px-4 py-2 bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-800 text-sm font-semibold rounded-xl border border-teal-200">
                                                        pp: {publication.pages}
                                                    </span>
                                                )}
                                                {publication.impactFactor && (
                                                    <span className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm font-semibold rounded-xl shadow-md flex items-center gap-1">
                                                        <TrendingUp className="w-3 h-3" />
                                                        IF: {publication.impactFactor}
                                                    </span>
                                                )}
                                                <span className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm font-semibold rounded-xl shadow-md">
                                                    {year}
                                                </span>
                                            </div>

                                            {/* ACTION BUTTON */}
                                            {link && (
                                                <div className="flex justify-end">
                                                    <a
                                                        href={link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                                    >
                                                        <Globe className="w-4 h-4" />
                                                        View Publication
                                                        <ExternalLink className="w-4 h-4" />
                                                    </a>
                                                </div>
                                            )}

                                        </div>
                                    );
                                })}
                            </div>

                        </div>
                    ))}

                {/* EMPTY STATE */}
                {Object.keys(grouped).length === 0 && (
                    <div className="text-center py-16">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-full mb-6">
                            <FileText className="w-12 h-12 text-teal-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">No Journal Publications Found</h3>
                        <p className="text-gray-600">Journal publications will appear here once added.</p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Journal;