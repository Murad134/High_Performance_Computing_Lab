// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import useAxiosSecure from "../hooks/useAxiosSecure";
// import Swal from "sweetalert2";

// const AdminContact = () => {
//   const axiosSecure = useAxiosSecure();
//   const queryClient = useQueryClient();

//   // 🔹 GET Contact (findOne from backend)
//   const { data: contact, isLoading } = useQuery({
//     queryKey: ["contact"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/contact");
//       return res.data;
//     },
//   });
//   const updateMutation = useMutation({
//     mutationFn: async (data) => await axiosSecure.put("/contact", data),
//     onSuccess: () => {
//       queryClient.invalidateQueries(["contact"]);
//       Swal.fire({
//         icon: "success",
//         title: "Updated!",
//         text: "Contact information updated successfully.",
//         confirmButtonColor: "#4f46e5",
//       });
//     },
//     onError: (error) => {
//       Swal.fire({
//         icon: "error",
//         title: "Update Failed!",
//         text: error.response?.data?.message || "Something went wrong",
//       });
//     },
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const form = e.target;

//     const formData = {
//       room: form.room.value,
//       department: form.department.value,
//       building: form.building.value,
//       university: form.university.value,
//       cityZip: form.cityZip.value,

//       headEmail: form.headEmail.value,
//       headLinkedin: form.headLinkedin.value,
//       headFacebook: form.headFacebook.value,

//       deputyHeadEmail: form.deputyHeadEmail.value,
//       deputyHeadLinkedin: form.deputyHeadLinkedin.value,
//       deputyHeadFacebook: form.deputyHeadFacebook.value,
//     };
//     updateMutation.mutate(formData);
//   };

//   if (isLoading) return <p className="text-center mt-10">Loading contact data...</p>;
  
//   return (
//     <section className="mx-auto p-2">
//       <h2 className="text-2xl font-bold mb-8 text-indigo-700">
//         Admin Panel – Edit Contact
//       </h2>

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white rounded-xl shadow-lg p-8 space-y-10"
//       >
//         {/* ================= General Information ================= */}
//         <div>
//           <h3 className="text-lg font-semibold mb-4 border-l-4 border-yellow-400 pl-3 text-indigo-600">
//             General Information
//           </h3>

//           <div className="grid md:grid-cols-3 gap-6">
//             <input
//               name="room"
//               defaultValue={contact?.room}
//               type="text"
//               placeholder="Room No"
//               className="border rounded-md px-4 py-2"
//             />

//             <input
//               name="department"
//               defaultValue={contact?.department}
//               type="text"
//               placeholder="Department"
//               className="border rounded-md px-4 py-2"
//             />

//             <input
//               name="building"
//               defaultValue={contact?.building}
//               type="text"
//               placeholder="Building"
//               className="border rounded-md px-4 py-2"
//             />

//             <input
//               name="university"
//               defaultValue={contact?.university}
//               type="text"
//               placeholder="University"
//               className="border rounded-md px-4 py-2"
//             />

//             <input
//               name="cityZip"
//               defaultValue={contact?.cityZip}
//               type="text"
//               placeholder="City - Zip"
//               className="border rounded-md px-4 py-2"
//             />
//           </div>
//         </div>

//         {/* ================= Social Information ================= */}
//         <div>
//           <h3 className="text-lg font-semibold mb-4 border-l-4 border-yellow-400 pl-3 text-indigo-600">
//             Social Information
//           </h3>

//           <div className="grid md:grid-cols-2 gap-8">
//             {/* Head of Lab */}
//             <div className="space-y-3">
//               <h4 className="font-medium text-gray-700">Head of Lab</h4>

//               <input
//                 name="headEmail"
//                 defaultValue={contact?.headEmail}
//                 type="email"
//                 placeholder="Email"
//                 className="w-full border rounded-md px-4 py-2"
//               />

//               <input
//                 name="headLinkedin"
//                 defaultValue={contact?.headLinkedin}
//                 type="url"
//                 placeholder="LinkedIn URL"
//                 className="w-full border rounded-md px-4 py-2"
//               />

//               <input
//                 name="headFacebook"
//                 defaultValue={contact?.headFacebook}
//                 type="url"
//                 placeholder="Facebook URL"
//                 className="w-full border rounded-md px-4 py-2"
//               />
//             </div>

//             {/* Deputy Head */}
//             <div className="space-y-3">
//               <h4 className="font-medium text-gray-700">Deputy Head of Lab</h4>

//               <input
//                 name="deputyHeadEmail"
//                 defaultValue={contact?.deputyHeadEmail}
//                 type="email"
//                 placeholder="Email"
//                 className="w-full border rounded-md px-4 py-2"
//               />

//               <input
//                 name="deputyHeadLinkedin"
//                 defaultValue={contact?.deputyHeadLinkedin}
//                 type="url"
//                 placeholder="LinkedIn URL"
//                 className="w-full border rounded-md px-4 py-2"
//               />

//               <input
//                 name="deputyHeadFacebook"
//                 defaultValue={contact?.deputyHeadFacebook}
//                 type="url"
//                 placeholder="Facebook URL"
//                 className="w-full border rounded-md px-4 py-2"
//               />
//             </div>
//           </div>
//         </div>

//         {/* ================= Buttons ================= */}
//         <div className="flex justify-end gap-4 pt-6">
//           <button
//             type="button"
//             className="px-6 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
//             onClick={() => window.location.reload()}
//           >
//             Cancel
//           </button>

//           <button
//             type="submit"
//             className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
//           >
//             Update Contact
//           </button>
//         </div>
//       </form>
//     </section>
//   );
// };
// export default AdminContact;





import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AdminContact = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: contact, isLoading } = useQuery({
    queryKey: ["contact"],
    queryFn: async () => {
      const res = await axiosSecure.get("/contact");
      return res.data;
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data) => await axiosSecure.put("/contact", data),
    onSuccess: () => {
      queryClient.invalidateQueries(["contact"]);
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Contact information updated successfully.",
        confirmButtonColor: "#4f46e5",
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Update Failed!",
        text: error.response?.data?.message || "Something went wrong",
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = {
      room: form.room.value,
      department: form.department.value,
      building: form.building.value,
      university: form.university.value,
      cityZip: form.cityZip.value,

      // Head of Lab
      headEmail: form.headEmail.value,
      headLinkedin: form.headLinkedin.value,
      headFacebook: form.headFacebook.value,
      headUniversityWebsite: form.headUniversityWebsite.value,   // ✅ new
      headGoogleScholar: form.headGoogleScholar.value,           // ✅ new
      headResearchGate: form.headResearchGate.value,             // ✅ new

      // Deputy Head of Lab
      deputyHeadEmail: form.deputyHeadEmail.value,
      deputyHeadLinkedin: form.deputyHeadLinkedin.value,
      deputyHeadFacebook: form.deputyHeadFacebook.value,
      deputyHeadResearchGate: form.deputyHeadResearchGate.value, // ✅ new
    };

    updateMutation.mutate(formData);
  };

  if (isLoading) return <p className="text-center mt-10">Loading contact data...</p>;

  return (
    <section className="mx-auto p-2">
      <h2 className="text-2xl font-bold mb-8 text-indigo-700">
        Admin Panel – Edit Contact
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-8 space-y-10"
      >
        {/* ================= General Information ================= */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-l-4 border-yellow-400 pl-3 text-indigo-600">
            General Information
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <input name="room" defaultValue={contact?.room} type="text" placeholder="Room No" className="border rounded-md px-4 py-2" />
            <input name="department" defaultValue={contact?.department} type="text" placeholder="Department" className="border rounded-md px-4 py-2" />
            <input name="building" defaultValue={contact?.building} type="text" placeholder="Building" className="border rounded-md px-4 py-2" />
            <input name="university" defaultValue={contact?.university} type="text" placeholder="University" className="border rounded-md px-4 py-2" />
            <input name="cityZip" defaultValue={contact?.cityZip} type="text" placeholder="City - Zip" className="border rounded-md px-4 py-2" />
          </div>
        </div>

        {/* ================= Social Information ================= */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-l-4 border-yellow-400 pl-3 text-indigo-600">
            Social Information
          </h3>

          <div className="grid md:grid-cols-2 gap-8">

            {/* ===== Head of Lab ===== */}
            <div className="space-y-3">
              <h4 className="font-semibold text-indigo-700 text-base border-b pb-1">
                Head of Lab
              </h4>

              <div>
                <label className="text-lg text-black mb-1 block">Email</label>
                <input
                  name="headEmail"
                  defaultValue={contact?.headEmail}
                  type="email"
                  placeholder="Email"
                  className="w-full border rounded-md px-4 py-2"
                />
              </div>

              <div>
                <label className="text-lg text-black mb-1 block">LinkedIn URL</label>
                <input
                  name="headLinkedin"
                  defaultValue={contact?.headLinkedin}
                  type="url"
                  placeholder="LinkedIn URL"
                  className="w-full border rounded-md px-4 py-2"
                />
              </div>

              <div>
                <label className="text-lg text-black mb-1 block">Facebook URL</label>
                <input
                  name="headFacebook"
                  defaultValue={contact?.headFacebook}
                  type="url"
                  placeholder="Facebook URL"
                  className="w-full border rounded-md px-4 py-2"
                />
              </div>

              {/* ✅ New Fields */}
              <div>
                <label className="text-lg text-black mb-1 block">University Website URL</label>
                <input
                  name="headUniversityWebsite"
                  defaultValue={contact?.headUniversityWebsite}
                  type="url"
                  placeholder="University Website URL"
                  className="w-full border rounded-md px-4 py-2"
                />
              </div>

              <div>
                <label className="text-lg text-black mb-1 block">Google Scholar URL</label>
                <input
                  name="headGoogleScholar"
                  defaultValue={contact?.headGoogleScholar}
                  type="url"
                  placeholder="Google Scholar URL"
                  className="w-full border rounded-md px-4 py-2"
                />
              </div>

              <div>
                <label className="text-lg text-black mb-1 block">ResearchGate URL</label>
                <input
                  name="headResearchGate"
                  defaultValue={contact?.headResearchGate}
                  type="url"
                  placeholder="ResearchGate URL"
                  className="w-full border rounded-md px-4 py-2"
                />
              </div>
            </div>

            {/* ===== Deputy Head of Lab ===== */}
            <div className="space-y-3">
              <h4 className="font-semibold text-purple-700 text-base border-b pb-1">
                Deputy Head of Lab
              </h4>

              <div>
                <label className="text-lg text-black mb-1 block">Email</label>
                <input
                  name="deputyHeadEmail"
                  defaultValue={contact?.deputyHeadEmail}
                  type="email"
                  placeholder="Email"
                  className="w-full border rounded-md px-4 py-2"
                />
              </div>

              <div>
                <label className="text-lg text-black mb-1 block">LinkedIn URL</label>
                <input
                  name="deputyHeadLinkedin"
                  defaultValue={contact?.deputyHeadLinkedin}
                  type="url"
                  placeholder="LinkedIn URL"
                  className="w-full border rounded-md px-4 py-2"
                />
              </div>

              <div>
                <label className="text-lg text-black mb-1 block">Facebook URL</label>
                <input
                  name="deputyHeadFacebook"
                  defaultValue={contact?.deputyHeadFacebook}
                  type="url"
                  placeholder="Facebook URL"
                  className="w-full border rounded-md px-4 py-2"
                />
              </div>

              {/* ✅ New Field */}
              <div>
                <label className="text-lg text-black mb-1 block">ResearchGate URL</label>
                <input
                  name="deputyHeadResearchGate"
                  defaultValue={contact?.deputyHeadResearchGate}
                  type="url"
                  placeholder="ResearchGate URL"
                  className="w-full border rounded-md px-4 py-2"
                />
              </div>
            </div>

          </div>
        </div>

        {/* ================= Buttons ================= */}
        <div className="flex justify-end gap-4 pt-6">
          <button
            type="button"
            className="px-6 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
            onClick={() => window.location.reload()}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Update Contact
          </button>
        </div>
      </form>
    </section>
  );
};

export default AdminContact;