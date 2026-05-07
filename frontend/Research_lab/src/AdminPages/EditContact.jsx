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
      <h2 className="text-3xl font-bold mb-8 text-blue-700 flex items-center gap-3">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        Admin Panel – Edit Contact
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-8 space-y-10"
      >
        {/* ================= General Information ================= */}
        <div>
          <h3 className="text-xl font-bold mb-6 border-l-4 border-blue-400 pl-4 text-blue-700 flex items-center gap-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            General Information
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <input name="room" defaultValue={contact?.room} type="text" placeholder="Room No" className="border-2 border-teal-200 rounded-lg px-4 py-3 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-200 bg-white" />
            <input name="department" defaultValue={contact?.department} type="text" placeholder="Department" className="border-2 border-teal-200 rounded-lg px-4 py-3 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-200 bg-white" />
            <input name="building" defaultValue={contact?.building} type="text" placeholder="Building" className="border-2 border-teal-200 rounded-lg px-4 py-3 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-200 bg-white" />
            <input name="university" defaultValue={contact?.university} type="text" placeholder="University" className="border-2 border-teal-200 rounded-lg px-4 py-3 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-200 bg-white" />
            <input name="cityZip" defaultValue={contact?.cityZip} type="text" placeholder="City - Zip" className="border-2 border-teal-200 rounded-lg px-4 py-3 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-200 bg-white" />
          </div>
        </div>

        {/* ================= Social Information ================= */}
        <div>
          <h3 className="text-xl font-bold mb-6 border-l-4 border-blue-500 pl-4 text-blue-700 flex items-center gap-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            Social Information
          </h3>

          <div className="grid md:grid-cols-2 gap-8">

            {/* ===== Head of Lab Card ===== */}
            <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-2xl shadow-lg border border-blue-100/50 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-white">Head of Lab</h4>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-blue-700 mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email
                  </label>
                  <input
                    name="headEmail"
                    defaultValue={contact?.headEmail}
                    type="email"
                    placeholder="Email"
                    className="w-full border-2 border-blue-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-blue-700 mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2。065zm1。782 13。019H3。555V9h3。564v11。452zM22。225 0H1。771C。792 0 0 .774 0 1。7２9v２０。５４２C０ ２３。２２７。７９２ ２４ １。７７１ ２４h２０。４５１C２３。２ ２４ ２４ ２３。２２７ ２４ ２２。２７１V１。７２９C２４ 。７７４ ２３。２ ０ ２２。２２２ ０h。００３z"/>
                    </svg>
                    LinkedIn URL
                  </label>
                  <input
                    name="headLinkedin"
                    defaultValue={contact?.headLinkedin}
                    type="url"
                    placeholder="LinkedIn URL"
                    className="w-full border-2 border-teal-200 rounded-lg px-4 py-3 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-200 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-blue-700 mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook URL
                  </label>
                  <input
                    name="headFacebook"
                    defaultValue={contact?.headFacebook}
                    type="url"
                    placeholder="Facebook URL"
                    className="w-full border-2 border-blue-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-blue-700 mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                    </svg>
                    University Website
                  </label>
                  <input
                    name="headUniversityWebsite"
                    defaultValue={contact?.headUniversityWebsite}
                    type="url"
                    placeholder="University Website URL"
                    className="w-full border-2 border-blue-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-blue-700 mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Google Scholar
                  </label>
                  <input
                    name="headGoogleScholar"
                    defaultValue={contact?.headGoogleScholar}
                    type="url"
                    placeholder="Google Scholar URL"
                    className="w-full border-2 border-blue-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-blue-700 mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    ResearchGate
                  </label>
                  <input
                    name="headResearchGate"
                    defaultValue={contact?.headResearchGate}
                    type="url"
                    placeholder="ResearchGate URL"
                    className="w-full border-2 border-blue-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white"
                  />
                </div>
              </div>
            </div>

            {/* ===== Deputy Head of Lab Card ===== */}
            <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-2xl shadow-lg border border-blue-100/50 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-white">Deputy Head of Lab</h4>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-blue-700 mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email
                  </label>
                  <input
                    name="deputyHeadEmail"
                    defaultValue={contact?.deputyHeadEmail}
                    type="email"
                    placeholder="Email"
                    className="w-full border-2 border-blue-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-blue-700 mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1。729v20。54２C０ ２３。２２７．７９２ ２４ １。７７１ ２４h２０。４５１C２３。２ ２４ ２４ ２３。２２７ ２４ ２２。２７１V１。７２９C２４ .774 ₂₃。₂ ₀₂₃。₂₂₂ ᵗ₀h．₀₀₃z"/>
                    </svg>
                    LinkedIn URL
                  </label>
                  <input
                    name="deputyHeadLinkedin"
                    defaultValue={contact?.deputyHeadLinkedin}
                    type="url"
                    placeholder="LinkedIn URL"
                    className="w-full border-2 border-blue-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-blue-700 mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook URL
                  </label>
                  <input
                    name="deputyHeadFacebook"
                    defaultValue={contact?.deputyHeadFacebook}
                    type="url"
                    placeholder="Facebook URL"
                    className="w-full border-2 border-blue-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-blue-700 mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    ResearchGate URL
                  </label>
                  <input
                    name="deputyHeadResearchGate"
                    defaultValue={contact?.deputyHeadResearchGate}
                    type="url"
                    placeholder="ResearchGate URL"
                    className="w-full border-2 border-blue-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white"
                  />
                </div>
              </div>
            </div>

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
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
          >
            Update Contact
          </button>
        </div>
      </form>
    </section>
  );
};

export default AdminContact;