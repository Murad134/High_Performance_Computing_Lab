// import React, { useState } from "react";
// import { useMutation, useQuery, useQueryClient, QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import useAxios from "../../hooks/useAxios"; // ✅ use your axios instance

// const queryClient = new QueryClient();

// export default function AppWrapper() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <EditHome />
//     </QueryClientProvider>
//   );
// }

// function EditHome() {
//   const axios = useAxios(); // ✅ use custom axios
//   const queryClient = useQueryClient();

//   const [formData, setFormData] = useState({
//     welcomeTitle: "",
//     welcomeSubtitle: "",
//     aboutTitle: "",
//     aboutDescription: "",
//     aboutButtonName: "",
//     aboutButtonLink: "",
//   });

//   const [existingImages, setExistingImages] = useState([]);
//   const [newImages, setNewImages] = useState([]);
//   const [successMessage, setSuccessMessage] = useState("");

//   // ✅ Fetch home data
//   const { isLoading } = useQuery({
//     queryKey: ["homeData"],
//     queryFn: async () => {
//       const res = await axios.get("/api/home"); // ✅ auto uses baseURL
//       return res.data;
//     },
//     onSuccess: (data) => {
//       if (data) {
//         setFormData({
//           welcomeTitle: data.welcomeTitle || "",
//           welcomeSubtitle: data.welcomeSubtitle || "",
//           aboutTitle: data.aboutTitle || "",
//           aboutDescription: data.aboutDescription || "",
//           aboutButtonName: data.aboutButtonName || "",
//           aboutButtonLink: data.aboutButtonLink || "",
//         });
//         setExistingImages(data.welcomeImages || []);
//       }
//     },
//   });

//   // ✅ Update mutation
//   const updateMutation = useMutation({
//     mutationFn: async (form) => {
//       const payload = new FormData();

//       // form fields
//       Object.entries(form).forEach(([key, value]) => {
//         payload.append(key, value);
//       });

//       // new images
//       newImages.forEach((file) => {
//         payload.append("welcomeImages", file);
//       });

//       // existing images (IMPORTANT FIX)
//       existingImages.forEach((filename) => {
//         payload.append("existingImages", filename);
//       });

//       const res = await axios.post("/api/home", payload);
//       return res.data;
//     },

//     onSuccess: () => {
//       setSuccessMessage("✅ Home page updated successfully!");
//       queryClient.invalidateQueries({ queryKey: ["homeData"] });
//       setTimeout(() => setSuccessMessage(""), 3000);
//       setNewImages([]);
//     },

//     onError: () => {
//       setSuccessMessage("❌ Failed to update data");
//       setTimeout(() => setSuccessMessage(""), 3000);
//     },
//   });

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleAddImages = (e) => {
//     const files = Array.from(e.target.files);
//     setNewImages([...newImages, ...files]);
//   };

//   const handleRemoveNewImage = (index) => {
//     const arr = [...newImages];
//     arr.splice(index, 1);
//     setNewImages(arr);
//   };

//   const handleRemoveExistingImage = (index) => {
//     const arr = [...existingImages];
//     arr.splice(index, 1);
//     setExistingImages(arr);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Submitting form with data:", formData);
//     updateMutation.mutate(formData);
//   };

//   if (isLoading) return <div>Loading form...</div>;

//   return (
//     <div className="mx-auto p-2">
//       <h1 className="text-3xl font-bold text-slate-800 mb-4">
//         🏠 Edit Home Page
//       </h1>

//       {successMessage && (
//         <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium">
//           {successMessage}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-8">
//         {/* Welcome Section */}
//         <div className="bg-white rounded-xl shadow-sm border p-6">
//           <h2 className="text-2xl font-bold mb-4">👋 Welcome Section</h2>

//           <input
//             type="text"
//             name="welcomeTitle"
//             value={formData.welcomeTitle}
//             onChange={handleChange}
//             className="w-full px-4 py-3 border rounded-lg mb-3"
//             placeholder="Enter welcome title"
//             required
//           />

//           <input
//             type="text"
//             name="welcomeSubtitle"
//             value={formData.welcomeSubtitle}
//             onChange={handleChange}
//             className="w-full px-4 py-3 border rounded-lg mb-3"
//             placeholder="Enter subtitle"
//             required
//           />

//           {/* Existing images */}
//           {existingImages.length > 0 && (
//             <div className="mb-3">
//               <label className="block mb-2 font-semibold">
//                 Existing Images
//               </label>

//               {existingImages.map((img, idx) => (
//                 <div
//                   key={idx}
//                   className="flex items-center justify-between bg-gray-100 p-2 rounded mb-2"
//                 >
//                   <img
//                     src={`http://localhost:2500/uploads/${img}`} // ✅ FIXED
//                     alt=""
//                     className="h-16 w-16 object-cover rounded"
//                   />

//                   <button
//                     type="button"
//                     className="text-red-500"
//                     onClick={() => handleRemoveExistingImage(idx)}
//                   >
//                     Remove
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* New images */}
//           <input
//             type="file"
//             multiple
//             onChange={handleAddImages}
//             className="mb-2"
//           />

//           {newImages.map((file, idx) => (
//             <div key={idx} className="flex justify-between bg-gray-100 p-2 mb-1">
//               <span>{file.name}</span>
//               <button
//                 type="button"
//                 onClick={() => handleRemoveNewImage(idx)}
//               >
//                 ❌
//               </button>
//             </div>
//           ))}
//         </div>

//         {/* About Section */}
//         <div className="bg-white rounded-xl shadow-sm border p-6">
//           <h2 className="text-2xl font-bold mb-4">👨‍🏫 About Section</h2>

//           <input
//             type="text"
//             name="aboutTitle"
//             value={formData.aboutTitle}
//             onChange={handleChange}
//             className="w-full px-4 py-3 border rounded-lg mb-3"
//             required
//           />

//           <textarea
//             name="aboutDescription"
//             value={formData.aboutDescription}
//             onChange={handleChange}
//             rows="5"
//             className="w-full px-4 py-3 border rounded-lg mb-3"
//             required
//           />

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input
//               type="text"
//               name="aboutButtonName"
//               value={formData.aboutButtonName}
//               onChange={handleChange}
//               className="w-full px-4 py-3 border rounded-lg mb-3"
//               required
//             />

//             <input
//               type="text"
//               name="aboutButtonLink"
//               value={formData.aboutButtonLink}
//               onChange={handleChange}
//               className="w-full px-4 py-3 border rounded-lg"
//               required
//             />
//           </div>
//         </div>

//         <button className="w-full bg-indigo-600 text-white py-3 rounded-lg">
//           💾 Update
//         </button>
//       </form>
//     </div>
//   );
// }



import React, { useState, useEffect } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";

const queryClient = new QueryClient();

export default function AppWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <EditHome />
    </QueryClientProvider>
  );
}

function EditHome() {
  const axios = useAxios();
  const queryClient = useQueryClient();

  // -------------------------------
  // State: Form Data + Images
  // -------------------------------
  const [formData, setFormData] = useState({
    welcomeTitle: "",
    welcomeSubtitle: "",
    aboutTitle: "",
    aboutDescription: "",
    aboutButtonName: "",
    aboutButtonLink: "",
  });

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  // -------------------------------
  // Load saved data from localStorage on mount
  // -------------------------------
  useEffect(() => {
    const savedForm = localStorage.getItem("homeFormData");
    const savedImages = localStorage.getItem("homeExistingImages");

    if (savedForm) setFormData(JSON.parse(savedForm));
    if (savedImages) setExistingImages(JSON.parse(savedImages));
  }, []);

  // -------------------------------
  // Fetch data from backend
  // -------------------------------
  const { isLoading } = useQuery({
    queryKey: ["homeData"],
    queryFn: async () => {
      const res = await axios.get("/api/home");
      return res.data;
    },
    onSuccess: (data) => {
      if (data) {
        // Only update state if not already typed by user (keep unsaved edits)
        setFormData((prev) => ({
          welcomeTitle: prev.welcomeTitle || data.welcomeTitle || "",
          welcomeSubtitle: prev.welcomeSubtitle || data.welcomeSubtitle || "",
          aboutTitle: prev.aboutTitle || data.aboutTitle || "",
          aboutDescription: prev.aboutDescription || data.aboutDescription || "",
          aboutButtonName: prev.aboutButtonName || data.aboutButtonName || "",
          aboutButtonLink: prev.aboutButtonLink || data.aboutButtonLink || "",
        }));

        setExistingImages((prev) =>
          prev.length > 0 ? prev : data.welcomeImages || []
        );
      }
    },
  });

  // -------------------------------
  // Save unsaved data to localStorage
  // -------------------------------
  useEffect(() => {
    localStorage.setItem("homeFormData", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem("homeExistingImages", JSON.stringify(existingImages));
  }, [existingImages]);

  // -------------------------------
  // Mutation to update backend
  // -------------------------------
  const updateMutation = useMutation({
    mutationFn: async (form) => {
      const payload = new FormData();

      // Append form fields
      Object.entries(form).forEach(([key, value]) => payload.append(key, value));

      // Append new images
      newImages.forEach((file) => payload.append("welcomeImages", file));

      // Append existing images to keep
      existingImages.forEach((filename) =>
        payload.append("existingImages", filename)
      );

      const res = await axios.post("/api/home", payload);
      return res.data;
    },
    onSuccess: () => {
      setSuccessMessage("✅ Home page updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["homeData"] });

      // Clear new images and localStorage after successful update
      setNewImages([]);
      localStorage.removeItem("homeFormData");
      localStorage.removeItem("homeExistingImages");

      setTimeout(() => setSuccessMessage(""), 3000);
    },
    onError: () => {
      setSuccessMessage("❌ Failed to update data");
      setTimeout(() => setSuccessMessage(""), 3000);
    },
  });

  // -------------------------------
  // Handlers
  // -------------------------------
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAddImages = (e) => {
    const files = Array.from(e.target.files);
    setNewImages([...newImages, ...files]);
  };

  const handleRemoveNewImage = (index) => {
    const arr = [...newImages];
    arr.splice(index, 1);
    setNewImages(arr);
  };

  const handleRemoveExistingImage = (index) => {
    const arr = [...existingImages];
    arr.splice(index, 1);
    setExistingImages(arr);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  if (isLoading) return <div>Loading form...</div>;

  // -------------------------------
  // Render
  // -------------------------------
  return (
    <div className="mx-auto p-2">
      <h1 className="text-3xl font-bold text-slate-800 mb-4">🏠 Edit Home Page</h1>

      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-2xl font-bold mb-4">👋 Welcome Section</h2>

          <input
            type="text"
            name="welcomeTitle"
            value={formData.welcomeTitle}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg mb-3"
            placeholder="Enter welcome title"
            required
          />

          <input
            type="text"
            name="welcomeSubtitle"
            value={formData.welcomeSubtitle}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg mb-3"
            placeholder="Enter subtitle"
            required
          />

          {/* Existing images */}
          {existingImages.length > 0 && (
            <div className="mb-3">
              <label className="block mb-2 font-semibold">Existing Images</label>
              {existingImages.map((img, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-gray-100 p-2 rounded mb-2"
                >
                  <img
                    src={`http://localhost:2500/uploads/${img}`}
                    alt=""
                    className="h-16 w-16 object-cover rounded"
                  />
                  <button
                    type="button"
                    className="text-red-500"
                    onClick={() => handleRemoveExistingImage(idx)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* New images */}
          <input type="file" multiple onChange={handleAddImages} className="mb-2" />
          {newImages.map((file, idx) => (
            <div key={idx} className="flex justify-between bg-gray-100 p-2 mb-1">
              <span>{file.name}</span>
              <button type="button" onClick={() => handleRemoveNewImage(idx)}>
                ❌
              </button>
            </div>
          ))}
        </div>

        {/* About Section */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-2xl font-bold mb-4">👨‍🏫 About Section</h2>

          <input
            type="text"
            name="aboutTitle"
            value={formData.aboutTitle}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg mb-3"
            required
          />

          <textarea
            name="aboutDescription"
            value={formData.aboutDescription}
            onChange={handleChange}
            rows="5"
            className="w-full px-4 py-3 border rounded-lg mb-3"
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="aboutButtonName"
              value={formData.aboutButtonName}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg mb-3"
              required
            />
            <input
              type="text"
              name="aboutButtonLink"
              value={formData.aboutButtonLink}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg"
              required
            />
          </div>
        </div>

        <button className="w-full bg-indigo-600 text-white py-3 rounded-lg">💾 Update</button>
      </form>
    </div>
  );
}