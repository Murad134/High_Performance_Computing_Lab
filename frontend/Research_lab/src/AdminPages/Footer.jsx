import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AdminFooter = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // 🔹 GET Footer
  const { data: footer, isLoading } = useQuery({
    queryKey: ["footer"],
    queryFn: async () => {
      const res = await axiosSecure.get("/footer");
      return res.data;
    },
  });

  // 🔹 CREATE Footer
  const createMutation = useMutation({
    mutationFn: async (data) => await axiosSecure.post("/footer", data),
    onSuccess: () => {
      queryClient.invalidateQueries(["footer"]);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Footer Created Successfully",
        confirmButtonColor: "#4f46e5",
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.response?.data?.message || "Something went wrong",
      });
    },
  });

  // 🔹 UPDATE Footer
  const updateMutation = useMutation({
    mutationFn: async (data) => await axiosSecure.put("/footer", data),
    onSuccess: () => {
      queryClient.invalidateQueries(["footer"]);
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Footer Updated Successfully",
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
      labName: form.labName.value,
      description: form.description.value,
      email: form.email.value,
      officeAddress: {
        room: form.room.value,
        department: form.department.value,
        city: form.city.value,
      },
      socialMedia: {
        facebook: form.facebook.value,
        github: form.github.value,
        linkedin: form.linkedin.value,
      },
      copyrightText: form.copyrightText.value,
    };

    if (!footer?._id) {
      createMutation.mutate(formData);
    } else {
      updateMutation.mutate(formData);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <section className="mx-auto p-2">
      <h2 className="text-3xl font-bold mb-8 text-blue-700 flex items-center gap-3">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        Admin Panel – Edit Footer
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl border border-blue-100/50 p-8 space-y-8"
      >
        {/* ================= Lab Info ================= */}
        <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-2xl shadow-lg border border-blue-100/50 p-6">
          <h3 className="text-xl font-bold mb-6 border-l-4 border-blue-400 pl-4 text-blue-700 flex items-center gap-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            Lab Information
          </h3>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-blue-700 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Lab Name
              </label>
              <input
                name="labName"
                defaultValue={footer?.labName}
                type="text"
                className="w-full border-2 border-blue-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white"
                placeholder="HPC Research Lab"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-blue-700 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Description / Tagline
              </label>
              <textarea
                name="description"
                defaultValue={footer?.description}
                rows="3"
                className="w-full border-2 border-blue-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white resize-none"
                placeholder="Inspiring innovation in HPC, AI, ML, and Data Science"
              />
            </div>
          </div>
        </div>

        {/* ================= Contact ================= */}
        <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-2xl shadow-lg border border-blue-100/50 p-6">
          <h3 className="text-xl font-bold mb-6 border-l-4 border-blue-400 pl-4 text-blue-700 flex items-center gap-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact Information
          </h3>

          <div className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-blue-700 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email
              </label>
              <input
                name="email"
                defaultValue={footer?.email}
                type="email"
                className="w-full border-2 border-blue-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white"
                placeholder="example@domain.com"
              />
            </div>

            {/* Office Address - 3 Parts */}
            <div>
              <label className="block text-sm font-semibold text-blue-700 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Office Address
              </label>
              <div className="grid md:grid-cols-3 gap-4">
                <input
                  name="room"
                  defaultValue={footer?.officeAddress?.room}
                  type="text"
                  className="border-2 border-blue-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white"
                  placeholder="Room 224"
                />
                <input
                  name="department"
                  defaultValue={footer?.officeAddress?.department}
                  type="text"
                  className="border-2 border-blue-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white"
                  placeholder="Dept. of CSE, JUST"
                />
                <input
                  name="city"
                  defaultValue={footer?.officeAddress?.city}
                  type="text"
                  className="border-2 border-blue-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white"
                  placeholder="Jashore-7408"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ================= Social Links ================= */}
        <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-2xl shadow-lg border border-blue-100/50 p-6">
          <h3 className="text-xl font-bold mb-6 border-l-4 border-blue-400 pl-4 text-blue-700 flex items-center gap-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            Social Media
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-blue-700 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </label>
              <input
                name="facebook"
                defaultValue={footer?.socialMedia?.facebook}
                type="url"
                className="w-full border-2 border-blue-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white"
                placeholder="https://facebook.com/yourlab"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-blue-700 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 6.627 5.374 12 12 12s12-5.373 12-12c0-6.627-5.374-12-12-12zm2.218 18.616c-.354 0-.684-.288-.684-.693v-4.49c0-.41.33-.693.684-.693.354 0 .684.283.684.693v4.49c0 .405-.33.693-.684.693zm.84-8.75c-.494 0-.9-.406-.9-.9s.406-.9.9-.9.9.406.9.9-.406.9-.9.9z"/>
                </svg>
                GitHub
              </label>
              <input
                name="github"
                defaultValue={footer?.socialMedia?.github}
                type="url"
                className="w-full border-2 border-blue-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white"
                placeholder="https://github.com/yourlab"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-blue-700 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1。7２9v２０。５４２C０ ２３。２２７。７９２ ２４ １。７７１ ２４h２０。４５１C２３。２ ２４ ２４ ２３。２２７ ２４ ２２。２７１V１。７２９C２４ 。７７４ ２３。２ ０ ２２。２₂₂ ０h。００３z"/>
                </svg>
                LinkedIn
              </label>
              <input
                name="linkedin"
                defaultValue={footer?.socialMedia?.linkedin}
                type="url"
                className="w-full border-2 border-blue-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white"
                placeholder="https://linkedin.com/in/yourlab"
              />
            </div>
          </div>
        </div>


        {/* ================= Copyright ================= */}
        <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-2xl shadow-lg border border-blue-100/50 p-6">
          <h3 className="text-xl font-bold mb-6 border-l-4 border-blue-400 pl-4 text-blue-700 flex items-center gap-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Copyright Text
          </h3>

          <div>
            <label className="block text-sm font-semibold text-blue-700 mb-2 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Footer Bottom Text
            </label>
            <input
              name="copyrightText"
              defaultValue={footer?.copyrightText}
              type="text"
              className="w-full border-2 border-blue-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white"
              placeholder="© 2026 HPC Research Lab — All rights reserved."
            />
          </div>
        </div>

        {/* ================= Buttons ================= */}
        <div className="flex justify-end gap-4 pt-6">
          <button
            type="button"
            className="px-6 py-3 border-2 border-blue-200 text-blue-700 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 font-semibold"
            onClick={() => window.location.reload()}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
          >
            {footer ? "Update Footer" : "Create Footer"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AdminFooter;
