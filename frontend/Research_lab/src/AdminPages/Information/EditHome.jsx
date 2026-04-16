import React from "react";
import Swal from "sweetalert2";
import {
  useMutation,
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import useAxiosSecure from "../../hooks/useAxiosSecure";

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
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // ============================
  // ✅ GET DATA (like AdminContact)
  // ============================
  const { data: home, isLoading } = useQuery({
    queryKey: ["homeData"],
    queryFn: async () => {
      const res = await axios.get("/welcomehome");
      return res.data;
    },
  });

  // ============================
  // ✅ UPDATE (POST = UPSERT)
  // ============================
  const updateMutation = useMutation({
    mutationFn: async (data) => await axiosSecure.post("/welcomehome", data),

    onSuccess: () => {
      queryClient.invalidateQueries(["homeData"]);

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Home page updated successfully.",
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

  // ============================
  // ✅ HANDLE SUBMIT (LIKE YOUR CONTACT FORM)
  // ============================
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = {
      welcomeTitle: form.welcomeTitle.value,
      welcomeSubtitle: form.welcomeSubtitle.value,
      aboutTitle: form.aboutTitle.value,
      aboutDescription: form.aboutDescription.value,
      aboutButtonName: form.aboutButtonName.value,
      aboutButtonLink: form.aboutButtonLink.value,
    };

    updateMutation.mutate(formData);
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  // ============================
  // ✅ UI
  // ============================
  return (
    <div className="mx-auto p-1">
      <h1 className="text-3xl font-bold text-slate-800 mb-4">
        🏠 Edit Home Page
      </h1>

      <form
        onSubmit={handleSubmit}
        className=" rounded-xl p-8 space-y-8"
      >
        {/* ================= Welcome Section ================= */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-teal-600">
            👋 Welcome Section
          </h2>

          <input
            name="welcomeTitle"
            defaultValue={home?.welcomeTitle}
            type="text"
            placeholder="Enter welcome title"
            className="w-full border px-4 py-2 rounded mb-3"
          />

          <input
            name="welcomeSubtitle"
            defaultValue={home?.welcomeSubtitle}
            type="text"
            placeholder="Enter subtitle"
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        {/* ================= About Section ================= */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-teal-600">
            👨‍🏫 About Section
          </h2>

          <input
            name="aboutTitle"
            defaultValue={home?.aboutTitle}
            type="text"
            className="w-full border px-4 py-2 rounded mb-3"
          />

          <textarea
            name="aboutDescription"
            defaultValue={home?.aboutDescription}
            rows="5"
            className="w-full border px-4 py-2 rounded mb-3"
          />

          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="aboutButtonName"
              defaultValue={home?.aboutButtonName}
              type="text"
              className="w-full border px-4 py-2 rounded"
            />

            <input
              name="aboutButtonLink"
              defaultValue={home?.aboutButtonLink}
              type="text"
              className="w-full border px-4 py-2 rounded"
            />
          </div>
        </div>

        {/* ================= Buttons ================= */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-6 py-2 border rounded text-gray-600"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white rounded"
          >
            💾 Update
          </button>
        </div>
      </form>
    </div>
  );
}