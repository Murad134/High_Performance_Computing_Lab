import React from 'react';
import { useLoaderData, Link } from "react-router-dom";
const ExperimentalPlatforms = () => {
    const data = useLoaderData();
    const platforms = data.platforms;
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">

                {/* Breadcrumb */}
                <div className="mb-6 text-xs sm:text-sm flex flex-wrap items-center gap-1 sm:gap-2">
                    <Link
                        to="/"
                        className="text-pink-600 hover:text-pink-700 font-medium"
                    >
                        HPC
                    </Link>
                    <span className="text-gray-400">/</span>
                    <Link
                        to="/research"
                        className="text-pink-600 hover:text-pink-700 font-medium"
                    >
                        Research
                    </Link>
                    <span className="text-gray-400">/</span>
                    <span className="text-gray-800 font-semibold">
                        Experimental Platforms
                    </span>
                </div>

                {/* Page Title */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
                    Experimental Platforms
                </h1>

                {/* Platforms */}
                <div className="space-y-10">
                    {platforms.map((platform, index) => (
                        <div
                            key={index}
                            className="border-b pb-8 last:border-b-0"
                        >
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                                {platform.name}
                            </h2>

                            {platform.full_name && (
                                <p className="text-sm sm:text-base text-gray-500 italic mt-1">
                                    {platform.full_name}
                                </p>
                            )}

                            {platform.abbreviation && (
                                <span className="inline-block text-blue-800 text-xs sm:text-sm mt-2">
                                    {platform.abbreviation}
                                </span>
                            )}

                            <p className="text-gray-700 text-sm sm:text-base my-4 sm:my-6 max-w-4xl">
                                {platform.description}
                            </p>

                            {/* Research Areas */}
                            {platform.research_areas && (
                                <div className="mb-4">
                                    <h3 className="font-semibold text-gray-700 text-sm sm:text-base mb-2">
                                        Research Areas:
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {platform.research_areas.map((area, i) => (
                                            <span
                                                key={i}
                                                className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs sm:text-sm"
                                            >
                                                {area}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Expertise Fields */}
                            {platform.expertise_fields && (
                                <div>
                                    <h3 className="font-semibold text-gray-700 text-sm sm:text-base mb-2">
                                        Expertise Fields:
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {platform.expertise_fields.map((field, i) => (
                                            <span
                                                key={i}
                                                className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs sm:text-sm"
                                            >
                                                {field}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default ExperimentalPlatforms;