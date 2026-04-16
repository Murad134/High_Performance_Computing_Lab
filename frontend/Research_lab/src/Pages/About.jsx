import React from "react";
import ProfAbout from "../Components/ProfAbout";
import Lababout from "../Components/Lababout";
import ResearchInterest from "../Components/ResearchInterest";
function About() {
    return (
        <section className="w-full mx-auto px-6 py-16 font-poppins">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start rounded-xl p-8">

                {/*Photo*/}
                <div className="flex justify-center md:justify-start md:col-span-3">
                    <ProfAbout />
                </div>

                {/* Biography Timeline */}
                <div className="md:col-span-6 font-poppins">
                    <Lababout></Lababout>
                </div>
                <div className="md:col-span-3 font-poppins">
                    <h2 className="text-3xl font-extrabold text-indigo-700 mb-6 text-center md:text-left tracking-wide">
                        Research Interests
                    </h2>
                    <ResearchInterest />
                </div>
            </div>
        </section>
    );
}
export default About;