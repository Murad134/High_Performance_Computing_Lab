import React, { useState, useEffect } from "react";
import img1 from "../assets/1.JPG";
import img2 from "../assets/2.png";
import img3 from "../assets/3.jpg";
import img4 from "../assets/4.jpg";
import img5 from "../assets/5.jpg";
import img6 from "../assets/6.png";
import img7 from "../assets/7.jpg";
import img8 from "../assets/3.jpg";
import img10 from "../assets/5.jpg";
import img12 from "../assets/6.png";
import img13 from "../assets/7.jpg";

export default function AutoScrollCarousel() {
  const images = [img1, img12, img2, img4, img6, img13, img8, img7, img10, img3, img5];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(3);

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto scroll
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev >= images.length - itemsPerView ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length, itemsPerView, isHovered]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev >= images.length - itemsPerView ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev <= 0 ? images.length - itemsPerView : prev - 1
    );
  };

  const slideWidth = 100 / itemsPerView;

  return (
    <div className="w-full bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-2">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            Awards & some Achievements pictures
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        {/* Carousel Container */}
        <div
          className="relative group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main Carousel */}
          <div className="overflow-hidden rounded-2xl shadow-2xl bg-white p-4">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * slideWidth}%)` }}
            >
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 px-2"
                  style={{ width: `${slideWidth}%` }}
                >
                  <div className="relative overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                    <img
                      src={img}
                      alt={`Slide ${idx + 1}`}
                      className="w-full h-64 sm:h-72 lg:h-80 object-cover"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                      <span className="text-white font-semibold text-lg">
                        Image {idx + 1}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
            aria-label="Previous slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
            aria-label="Next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: images.length - itemsPerView + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`transition-all duration-300 rounded-full ${currentIndex === idx
                ? "w-8 h-3 bg-blue-600"
                : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
                }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Info Text */}
      </div>
    </div>
  );
}