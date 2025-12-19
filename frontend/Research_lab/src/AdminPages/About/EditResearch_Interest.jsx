// // import React from 'react'

// // function EditResearch_Interest() {
// //     return (
// //         <div>EditResearch_Interest</div>
// //     )
// // }
// // export default EditResearch_Interest

// import React from "react";
// import {
//     FaBrain,
//     FaImage,
//     FaRobot,
//     FaNetworkWired,
//     FaMicrochip,
// } from "react-icons/fa";

// export default function EditResearchInterests() {
//     return (
//         <section className="max-w-5xl mx-auto p-6">
//             <h2 className="text-2xl font-bold text-gray-800 mb-8">
//                 Edit Research Interests
//             </h2>

//             {/* Add New Interest */}
//             <div className="bg-white rounded-xl shadow-md p-6 mb-10">
//                 <h3 className="text-lg font-semibold text-gray-700 mb-4">
//                     Add New Interest
//                 </h3>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {/* Interest Name */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Interest Title
//                         </label>
//                         <input
//                             type="text"
//                             placeholder="e.g. Machine Learning"
//                             className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
//                         />
//                     </div>

//                     {/* Icon */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Icon Name (optional)
//                         </label>
//                         <input
//                             type="text"
//                             placeholder="FaBrain / FaRobot / FaImage"
//                             className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
//                         />
//                     </div>
//                 </div>

//                 <div className="flex justify-end mt-6">
//                     <button
//                         type="button"
//                         className="px-6 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
//                     >
//                         Add Interest
//                     </button>
//                 </div>
//             </div>

//             {/* Existing Interests */}
//             <div className="bg-white rounded-xl shadow-md p-6">
//                 <h3 className="text-lg font-semibold text-gray-700 mb-6">
//                     Existing Research Interests
//                 </h3>

//                 <div className="space-y-4">
//                     {/* Item */}
//                     <div className="flex items-center justify-between border rounded-lg p-4">
//                         <div className="flex items-center gap-4">
//                             <FaBrain className="text-indigo-600 text-xl" />
//                             <span className="font-medium text-gray-800">
//                                 Machine Learning
//                             </span>
//                         </div>
//                         <div className="flex gap-3">
//                             <button className="text-sm text-indigo-600 hover:underline">
//                                 Edit
//                             </button>
//                             <button className="text-sm text-red-600 hover:underline">
//                                 Delete
//                             </button>
//                         </div>
//                     </div>

//                     <div className="flex items-center justify-between border rounded-lg p-4">
//                         <div className="flex items-center gap-4">
//                             <FaImage className="text-indigo-600 text-xl" />
//                             <span className="font-medium text-gray-800">
//                                 Image Processing
//                             </span>
//                         </div>
//                         <div className="flex gap-3">
//                             <button className="text-sm text-indigo-600 hover:underline">
//                                 Edit
//                             </button>
//                             <button className="text-sm text-red-600 hover:underline">
//                                 Delete
//                             </button>
//                         </div>
//                     </div>

//                     <div className="flex items-center justify-between border rounded-lg p-4">
//                         <div className="flex items-center gap-4">
//                             <FaRobot className="text-indigo-600 text-xl" />
//                             <span className="font-medium text-gray-800">
//                                 Artificial Intelligence
//                             </span>
//                         </div>
//                         <div className="flex gap-3">
//                             <button className="text-sm text-indigo-600 hover:underline">
//                                 Edit
//                             </button>
//                             <button className="text-sm text-red-600 hover:underline">
//                                 Delete
//                             </button>
//                         </div>
//                     </div>

//                     <div className="flex items-center justify-between border rounded-lg p-4">
//                         <div className="flex items-center gap-4">
//                             <FaNetworkWired className="text-indigo-600 text-xl" />
//                             <span className="font-medium text-gray-800">
//                                 Software Defined Networking
//                             </span>
//                         </div>
//                         <div className="flex gap-3">
//                             <button className="text-sm text-indigo-600 hover:underline">
//                                 Edit
//                             </button>
//                             <button className="text-sm text-red-600 hover:underline">
//                                 Delete
//                             </button>
//                         </div>
//                     </div>

//                     <div className="flex items-center justify-between border rounded-lg p-4">
//                         <div className="flex items-center gap-4">
//                             <FaMicrochip className="text-indigo-600 text-xl" />
//                             <span className="font-medium text-gray-800">
//                                 Internet of Things (IoT)
//                             </span>
//                         </div>
//                         <div className="flex gap-3">
//                             <button className="text-sm text-indigo-600 hover:underline">
//                                 Edit
//                             </button>
//                             <button className="text-sm text-red-600 hover:underline">
//                                 Delete
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }

import React, { useState } from "react";
import { researchIcons } from "../Data/Research_Icon.jsx";

export default function EditResearchInterests() {
  const [items, setItems] = useState(researchIcons);
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("");

  // ADD
  const handleAdd = () => {
    if (!title || !icon) return;

    const selectedIcon = researchIcons.find(
      (i) => i.value === icon
    );

    setItems([
      ...items,
      {
        label: title,
        value: Date.now(), // unique key for frontend
        icon: selectedIcon.icon,
      },
    ]);

    setTitle("");
    setIcon("");
  };

  // DELETE
  const handleDelete = (value) => {
    setItems(items.filter((item) => item.value !== value));
  };

  return (
    <section className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-8">
        Edit Research Interests
      </h2>

      {/* Add Interest */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-10">
        <h3 className="text-lg font-semibold mb-4">
          Add New Interest
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Interest title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded-md px-4 py-2"
          />

          <select
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            className="border rounded-md px-4 py-2"
          >
            <option value="">Select icon</option>
            {researchIcons.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleAdd}
            className="bg-indigo-600 text-white px-6 py-2 rounded-md"
          >
            Add
          </button>
        </div>
      </div>

      {/* Existing Interests */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">
          Existing Interests
        </h3>

        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.value}
              className="flex items-center justify-between border rounded-lg p-4"
            >
              <div className="flex items-center gap-4">
                <span className="text-indigo-600 text-xl">
                  {item.icon}
                </span>
                <span className="font-medium">{item.label}</span>
              </div>

              <button
                onClick={() => handleDelete(item.value)}
                className="text-sm text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
