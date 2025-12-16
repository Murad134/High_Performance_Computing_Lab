import React, { useState, useEffect } from "react";
import img1 from "../assets/sliderImage/1.jpg";
import img2 from "../assets/sliderImage/3.jpg";
import img3 from "../assets/sliderImage/4.jpg";
import img4 from "../assets/sliderImage/1.jpg";
import img5 from "../assets/sliderImage/2.jpg";
import img6 from "../assets/sliderImage/6.jpg";
import img7 from "../assets/sliderImage/7.jpg";
import img8 from "../assets/sliderImage/8.jpg";
import img10 from "../assets/sliderImage/10.JPG";
import img12 from "../assets/sliderImage/12.JPG";
import img13 from "../assets/sliderImage/13.png";
export default function AutoScrollCarousel() {
  const images = [img1, img12, img2, img4, img6, img13, img8, img7, img10,img3, img5];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev >= images.length - 3 ? 0 : prev + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative max-w-6xl mx-auto mt-10 overflow-hidden rounded-xl shadow-lg">
      <div
        className="flex transition-transform duration-700"
        style={{ transform: `translateX(-${currentIndex * 33.33}%)` }}
      >
        {images.map((img, idx) => (
          <div
            key={idx}
            className="w-1/3 flex-shrink-0 p-2 border border-blue-300"
          >
            <img
              src={img}
              alt={`Slide ${idx}`}
              className="w-full h-72 object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}