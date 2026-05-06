
import React from "react";
import useAxios from "../../hooks/useAxios";
import { resolveBackendAssetUrl } from "../../utils";
import { useQuery } from "@tanstack/react-query";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function Picture_Awards() {
  const axios = useAxios();

  // Fetch images
  const { data: images = [], isLoading } = useQuery({
    queryKey: ["images"],
    queryFn: async () => {
      const res = await axios.get("/images");
      return res.data;
    },
  });

  if (isLoading) return (
    <div className="flex items-center justify-center py-16">
      <div className="relative">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-200 border-t-teal-500"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-teal-500 text-sm font-medium">Loading</span>
        </div>
      </div>
    </div>
  );

  if (!images.length) return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-12 text-center border border-gray-200">
      <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
        <span className="text-2xl">🏆</span>
      </div>
      <h3 className="text-xl font-bold text-gray-700 mb-2">Awards & Achievements</h3>
      <p className="text-gray-500">Award images and certificates will be displayed here.</p>
    </div>
  );

  // Responsive breakpoints
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1536 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 1536, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="w-full py-8">
      <Carousel
        responsive={responsive}
        autoPlay
        infinite
        swipeable
        draggable
        showDots={true}
        arrows={true}
        autoPlaySpeed={4000}
        containerClass="carousel-container"
        itemClass="px-3"
        dotListClass="custom-dot-list"
      >
        {images.map((img, ) => (
          <div key={img._id} className="group">
            <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2 bg-white">
              {/* Image Container */}
              <div className="relative h-72 md:h-80 lg:h-96 overflow-hidden">
                <img
                  src={resolveBackendAssetUrl(img.imageUrl)}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Hover Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-white text-xl font-bold leading-tight">
                    {img.title}
                  </h3>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-3 h-3 bg-white/30 rounded-full animate-ping"></div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-4 bg-gradient-to-r from-teal-50 to-blue-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">🏆</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-700">Award</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}