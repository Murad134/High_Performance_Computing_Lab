import React from "react";

function LabAbout() {
    return (
        <div className="md:col-span-6 font-poppins">
            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-8 text-center md:text-left">
                HPC Research Lab
            </h1>

            <h2 className="text-lg font-medium text-gray-600 leading-snug mb-10 text-center md:text-left">
                Department of Computer Science and Engineering (CSE) <br />
                Jashore University of Science and Technology (JUST), Bangladesh
            </h2>

            {/* Timeline */}
            <div className="relative border-l-4 border-indigo-500 pl-6 space-y-10">
                {/* Step 1 */}
                <div>
                    <div className="absolute -left-3 top-1 w-6 h-6 bg-indigo-500 rounded-full border-4 border-white"></div>
                    <h3 className="text-xl font-semibold text-indigo-700">Lab Introduction</h3>
                    <p className="text-gray-700 leading-relaxed">
                        The <span className="font-semibold">High Performance Computing (HPC) Lab</span>
                        at JUST is dedicated to advanced computing research. It unites students and
                        faculty to explore parallel computing, AI, and big data solutions for
                        real‑world challenges.
                    </p>
                </div>

                {/* Step 2 */}
                <div>
                    <div className="absolute -left-3 top-1 w-6 h-6 bg-purple-500 rounded-full border-4 border-white"></div>
                    <h3 className="text-xl font-semibold text-purple-700">Mission & Vision</h3>
                    <p className="text-gray-700 leading-relaxed mb-2">
                        Our mission is to foster a culture of curiosity, collaboration, and
                        excellence in HPC research. We empower students with hands‑on
                        experience and impactful publications.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                        Our vision is to become a nationally recognized research hub,
                        collaborating with academia and industry to solve global challenges
                        using HPC technologies.
                    </p>
                </div>

                {/* Step 3 */}
                <div>
                    <div className="absolute -left-3 top-1 w-6 h-6 bg-pink-500 rounded-full border-4 border-white"></div>
                    <h3 className="text-xl font-semibold text-pink-700">Future Goals</h3>
                    <ul className="text-gray-700 space-y-1 leading-relaxed list-disc list-inside">
                        <li>Expand HPC cluster with more GPU/CPU nodes</li>
                        <li>Publish impactful research in top‑tier journals</li>
                        <li>Collaborate with international universities & industries</li>
                        <li>Organize workshops, hackathons & training programs</li>
                        <li>Support innovative student‑led projects & startups</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default LabAbout;
