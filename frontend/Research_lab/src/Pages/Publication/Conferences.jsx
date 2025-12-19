import React from 'react';
import { Mic, ExternalLink } from 'lucide-react';
import { useLoaderData } from 'react-router-dom';

const Conference = () => {
    const data = useLoaderData();
    
    const getLink = (publication) => {
        if (publication.doi) return publication.doi;
        if (publication.pdfUrl) return publication.pdfUrl;
        if (publication.url) return publication.url;
        return null;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-5xl mx-auto px-2">
                {/* Header */}
                <div className="text-center mb-12 pt-8">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-4">
                        Conference
                    </h1>
                    <div className="w-24 h-1 bg-teal-400 mx-auto rounded-full"></div>
                </div>

                {data && data.Conferences && data.Conferences.map((yearGroup) => (
                    <div key={yearGroup.year} className="mb-12">
                        {/* Year Badge */}
                        <div className="flex items-center mb-8">
                            <div className="h-px flex-1 bg-gray-300"></div>
                            <div className="mx-6 px-6 py-2 bg-teal-400 rounded-full shadow-lg">
                                <h2 className="text-2xl font-bold text-white tracking-wide">
                                    {yearGroup.year}
                                </h2>
                            </div>
                            <div className="h-px flex-1 bg-gray-300"></div>
                        </div>

                        <div className="space-y-6">
                            {yearGroup.items.map((publication, index) => {
                                const link = getLink(publication);
                                
                                return (
                                    <div 
                                        key={index} 
                                        className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-xl hover:border-teal-300 transition-all duration-300"
                                    >
                                        <div className="flex items-start gap-4">
                                            {/* Icon */}
                                            <div className="flex-shrink-0 mt-1">
                                                <div className="p-2.5 bg-teal-400 rounded-lg shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
                                                    <Mic className="w-6 h-6 text-white" />
                                                </div>
                                            </div>
                                            
                                            <div className="flex-1">
                                                {/* Year and Title */}
                                                <div className="flex items-start gap-3 mb-3">
                                                    <span className="text-base font-bold text-gray-500">({publication.year})</span>
                                                    <h3 className="text-xl font-bold text-gray-800 leading-snug group-hover:text-teal-500 transition-colors duration-300 flex-1">
                                                        {publication.title}
                                                    </h3>
                                                </div>
                                                
                                                {/* Conference Name */}
                                                <p className="text-base font-medium text-gray-600 italic mb-3 flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 bg-teal-400 rounded-full"></span>
                                                    {publication.conference}
                                                    {publication.publisher && (
                                                        <span className="text-gray-500">, {publication.publisher}</span>
                                                    )}
                                                </p>
                                                
                                                {/* Meta Info */}
                                                <div className="flex flex-wrap gap-3 mb-4">
                                                    <span className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-semibold rounded-lg border border-gray-200">
                                                        Vol. {publication.volume}
                                                    </span>
                                                    <span className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-semibold rounded-lg border border-gray-200">
                                                        pp. {publication.pages}
                                                    </span>
                                                    {link && (
                                                        <span className="px-3 py-1.5 bg-green-50 text-green-700 text-sm font-semibold rounded-lg border border-green-200">
                                                            Available
                                                        </span>
                                                    )}
                                                </div>
                                                
                                                {/* View Button */}
                                                {link && (
                                                    <a
                                                        href={link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 text-teal-500 hover:text-teal-600 text-sm font-semibold transition-colors duration-300"
                                                    >
                                                        <span>{link}</span>
                                                        <ExternalLink className="w-4 h-4" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}

                {/* Last Update */}
                {data && data.lastUpdate && (
                    <div className="text-center py-8 text-gray-600 text-sm">
                        Last Update: {data.lastUpdate}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Conference;