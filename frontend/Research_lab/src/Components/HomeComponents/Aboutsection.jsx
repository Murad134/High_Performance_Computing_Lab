import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { resolveBackendAssetUrl } from "../../utils";

function Aboutsection() {
    const axios = useAxios();
    const navigate = useNavigate();

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

    const aboutBackground = home?.aboutImage
        ? resolveBackendAssetUrl(home.aboutImage)
        : "/assetss/11.avif";

    return (
        <section
            className="min-h-screen mx-auto flex items-center justify-center  bg-cover bg-center"
            style={{
                backgroundImage: `url('${aboutBackground}')`,
            }}
        >
            <div className="text-center  rounded-lg bg-white p-3">
                <p
                    className="text-black leading-relaxed whitespace-pre-line mb-8 mx-2"

                >
                    {home?.aboutDescription || "No description available"}
                </p>
                <button
                    onClick={() => {
                        navigate(home?.aboutButtonLink || "/");
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-block bg-teal-600  px-6 py-3 rounded-lg hover:bg-teal-700 transition"
                >
                    {home?.aboutButtonName || "Read More"}
                </button>
            </div>
        </section>
    );
}
export default Aboutsection;