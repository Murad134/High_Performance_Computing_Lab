import React from 'react';
import { useLoaderData } from 'react-router-dom';

const OtherCountryProjects = () => {
    const data = useLoaderData();

    return (
        <div className="px-4">
            <div className="max-w-6xl mx-auto">
                {/* Breadcrumb */}
                <div className="text-sm text-blue-600 mb-4">
                    {data.breadcrumb}
                </div>

                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        European projects and FEDER funded projects
                    </h1>
                </div>

                {/* Categories */}
                {data.categories.map((category, catIndex) => (
                    <div key={catIndex} className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">
                            {category.category}
                        </h2>

                        {/* Projects List */}
                        <div className="space-y-4">
                            {category.projects.map((project) => (
                                <div
                                    key={project.id}
                                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300 border-l-4 border-blue-500"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            {/* Name + Description same line */}
                                            <div className="mb-2">
                                                <span className="text-xl font-bold text-gray-800">
                                                    {project.name}:
                                                </span>
                                                <span className="text-gray-700 ml-2">
                                                    {project.description}
                                                </span>
                                            </div>

                                            {project.full_name && (
                                                <p className="text-sm text-gray-600 italic mb-3">
                                                    {project.full_name}
                                                </p>
                                            )}

                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {project.type && (
                                                    <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium">
                                                        {project.type}
                                                    </span>
                                                )}
                                                {project.focus_area && (
                                                    <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium">
                                                        {project.focus_area}
                                                    </span>
                                                )}
                                            </div>
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
export default OtherCountryProjects;