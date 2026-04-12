import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";

function Aboutsection() {
    const axios = useAxios();

    const { data: home, isLoading, isError } = useQuery({
        queryKey: ["homeData"],
        queryFn: async () => {
            const res = await axios.get("/welcomehome");
            return res.data;
        },
    });

    if (isLoading) {
        return <p className="text-center py-10">Loading...</p>;
    }

    if (isError) {
        return <p className="text-center text-red-500">Failed to load data</p>;
    }

    return (
        <section
            className="min-h-screen mx-auto flex items-center justify-center  bg-cover bg-center"
            style={{
                backgroundImage: `url('/assetss/11.avif')`, // ✅ public folder path
            }}
        >
            <div className="text-center  rounded-lg bg-white p-3">
                <p
                    className="text-black leading-relaxed whitespace-pre-line mb-8 mx-2"

                >
                    {home?.aboutDescription || "No description available"}
                </p>
                <a
                    href={home?.aboutButtonLink || "#"}
                    className="inline-block bg-indigo-600  px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
                >
                    {home?.aboutButtonName || "Read More"}
                </a>
            </div>
        </section>
    );
}
export default Aboutsection;