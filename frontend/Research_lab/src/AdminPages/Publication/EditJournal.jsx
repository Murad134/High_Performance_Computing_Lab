// import React from "react";

// export default function AdminAddJournalForm() {
//   return (
//     <section className="max-w-6xl mx-auto p-4 sm:p-6">
//       <h2 className="flex items-center justify-center text-2xl font-bold text-indigo-700 mb-8">
//         Add New Journal
//       </h2>

//       <form className="bg-white rounded-xl shadow-lg p-6 sm:p-8 space-y-8">
//         {/* ================= Year ================= */}
//         <div className="max-w-sm">
//           <label className="font-semibold text-gray-700 mb-1 block">Year</label>
//           <input
//             type="text"
//             name="year"
//             placeholder="2025"
//             className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
//           />
//         </div>

//         {/* ================= Journal Info ================= */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <Input label="Journal Title" name="title" />
//           <Input label="Journal Name" name="journal" />
//           <Input label="Volume" name="volume" />
//           <Input label="Issue" name="issue" />
//           <Input label="Pages" name="pages" placeholder="1050-1064" />
//           <Input label="URL" name="url" placeholder="https://..." />
//         </div>

//         {/* ================= Submit Button ================= */}
//         <div className="flex justify-end pt-6">
//           <button
//             type="button"
//             className="px-8 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
//           >
//             Add Journal
//           </button>
//         </div>
//       </form>
//     </section>
//   );
// }

// /* ================= Reusable Input ================= */
// function Input({ label, type = "text", ...props }) {
//   return (
//     <div className="flex flex-col gap-1">
//       <label className="font-semibold text-gray-700">{label}</label>
//       <input
//         type={type}
//         className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
//         {...props}
//       />
//     </div>
//   );
// }

// AdminAddArticle.jsx




import React from "react";
import { useForm } from "react-hook-form";

const AdminArticleFormSections = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    alert("Form submitted! Check console for data.");
  };

  return (
    <div className="mx-auto p-6 rounded-lg mt-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Journal Article</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

        {/* ====================== 1. Basic Info ====================== */}


        <section>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">1. Basic Info</h3>
          <div className="space-y-4">

            {/* Title */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Title *</label>
              <input
                {...register("title")}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            {/* Corresponding Author */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Corresponding Author</label>
              <input
                {...register("correspondingAuthor")}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Journal Name */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Journal Name</label>
              <input
                {...register("journalName")}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Publisher + ISSN side by side */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1 font-medium">Publisher</label>
                <input
                  {...register("publisher")}
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-medium">ISSN</label>
                <input
                  {...register("issn")}
                  placeholder="ISSN"
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

          </div>
        </section>
        {/* ====================== 2. Publication Details ====================== */}
        <section>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">2. Publication Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Volume</label>
              <input
                {...register("volume")}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Issue</label>
              <input
                {...register("issue")}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Pages</label>
              <input
                {...register("pages")}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Year</label>
              <input
                type="number"
                {...register("year")}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-gray-700 mb-1 font-medium">DOI</label>
              <input
                {...register("doi")}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
        </section>

        {/* ====================== 3. Links & Files ====================== */}
        <section>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">3. Links & Files</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Article URL</label>
              <input
                {...register("articleUrl")}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 font-medium">PDF URL</label>
              <input
                {...register("pdfUrl")}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
        </section>

        {/* ====================== 4. Abstract & Citation ====================== */}
        <section>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">4. Abstract & Citation</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Abstract</label>
              <textarea
                {...register("abstract")}
                rows={5}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-700 mb-1 font-medium">Citation Count</label>
              <input
                type="number"
                {...register("citationCount")}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
        </section>

        {/* ====================== Submit Button ====================== */}
        <section>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Submit Article
          </button>
        </section>
      </form>
    </div>
  );
};
export default AdminArticleFormSections;