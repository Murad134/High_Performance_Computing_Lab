import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

function WelcomeSection() {
  const axios = useAxios(); 

  const { data: images, isLoading, isError } = useQuery({
    queryKey: ["welcomeImages"],
    queryFn: async () => {
      const res = await axios.get("/images/welcome");
      return res.data;
    },
  });

  const { data: homeData } = useQuery({
    queryKey: ["homeData"],
    queryFn: async () => {
      const res = await axios.get("/welcomehome");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (isError) return <p className="text-center text-red-500">Failed to load data</p>;

  return (
    <section className="relative w-full">
      <Carousel
        autoPlay
        infiniteLoop
        interval={3000}
        showThumbs={false}
        stopOnHover={false}
        showStatus={false}
        showIndicators={false}
      >
        {images.map((img) => (
          <div key={img._id} className="relative h-[90vh] w-full">
            {/* Background Image */}
            <img
              src={`http://localhost:2500${img.imageUrl}`}
              alt="Welcome"
              className="h-[90vh] w-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center px-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {homeData?.welcomeTitle || "Welcome to HPC Lab"}
              </h1>
              <p className="text-lg md:text-xl text-white">
                {homeData?.welcomeSubtitle || "High Performance Computing • AI • Data Science"}
              </p>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
}

export default WelcomeSection;