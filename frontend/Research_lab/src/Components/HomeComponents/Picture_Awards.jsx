// import React from "react";
// import useAxios from "../../hooks/useAxios";
// import { useQuery } from "@tanstack/react-query";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";

// export default function Picture_Awards() {
//   const axios = useAxios();

//   // Fetch images
//   const { data: images = [], isLoading } = useQuery({
//     queryKey: ["images"],
//     queryFn: async () => {
//       const res = await axios.get("/images");
//       return res.data;
//     },
//   });

//   if (isLoading) return <p>Loading...</p>;
//   if (!images.length) return <p>No images found.</p>;

//   // Responsive breakpoints for 3 images on large screens
//   const responsive = {
//     superLargeDesktop: {
//       breakpoint: { max: 4000, min: 1536 },
//       items: 3,
//     },
//     desktop: {
//       breakpoint: { max: 1536, min: 1024 },
//       items: 3,
//     },
//     tablet: {
//       breakpoint: { max: 1024, min: 768 },
//       items: 2,
//     },
//     mobile: {
//       breakpoint: { max: 768, min: 0 },
//       items: 1,
//     },
//   };

//   return (
//     <div className="w-full my-6">
//       <Carousel
//         responsive={responsive}
//         autoPlay
//         infinite
//         swipeable
//         draggable
//         showDots={true}
//         arrows={true}
//         containerClass="carousel-container"
//         itemClass="px-2"
//       >
//         {images.map((img) => (
//           <div key={img._id} className="relative">
//             <img
//               src={`http://localhost:2500${img.imageUrl}`}
//               alt={img.title}
//               className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg"
//             />
//           </div>
//         ))}
//       </Carousel>
//     </div>
//   );
// }


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

  if (isLoading) return <p>Loading...</p>;
  if (!images.length) return <p>No images found.</p>;

  // Responsive breakpoints for 3 images on large screens
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
    <div className="w-full my-6">
      <Carousel
        responsive={responsive}
        autoPlay
        infinite
        swipeable
        draggable
        showDots={true}
        arrows={true}
        containerClass="carousel-container"
        itemClass="px-2"
      >
        {images.map((img) => (
          <div key={img._id} className="relative text-center">
            <img
              src={resolveBackendAssetUrl(img.imageUrl)}
              alt={img.title}
              className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg"
            />
            {/* Image title below picture */}
            <p className="mt-2 text-sm font-medium text-gray-700">{img.title}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
}