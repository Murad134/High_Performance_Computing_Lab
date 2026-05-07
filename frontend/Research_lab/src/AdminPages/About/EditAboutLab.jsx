import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AdminAboutLab = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: aboutLab, isLoading } = useQuery({
    queryKey: ["aboutlab"],
    queryFn: async () => {
      const res = await axiosSecure.get("/aboutlab");
      return res.data;
    },
  });

  const { register, handleSubmit } = useForm({
    values: aboutLab || {},
  });

  const saveMutation = useMutation({
    mutationFn: async (formData) => {
      if (aboutLab?._id) {
        return await axiosSecure.put("/aboutlab", formData);
      } else {
        return await axiosSecure.post("/aboutlab", formData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["aboutlab"]);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "About Lab saved successfully",
        confirmButtonColor: "#4f46e5",
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Something went wrong",
      });
    },
  });

  const onSubmit = (data) => {
    saveMutation.mutate(data);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-blue-600 font-semibold">Loading...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">
            🧪 About Lab Management
          </h1>
          <p className="text-gray-600">Update laboratory information and details</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 rounded-3xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl">🧪</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-blue-800">
                Update About Lab Information
              </h2>
              <p className="text-gray-600">Manage your laboratory's core information</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

          {/* Lab Name */}
          <div className="bg-white rounded-2xl border border-blue-100 p-6 shadow-lg">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              🏷️ Lab Name
            </label>
            <input
              {...register("labName")}
              type="text"
              className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
              placeholder="Enter Lab Name"
            />
          </div>

          {/* Department & University Split */}
          <div className="bg-white rounded-2xl border border-blue-100 p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-blue-800 mb-4">🏛️ Institution Details</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Department Name
                </label>
                <input
                  {...register("department")}
                  type="text"
                  className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                  placeholder="Enter Department Name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  University Name
                </label>
                <input
                  {...register("university")}
                  type="text"
                  className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                  placeholder="Enter University Name"
                />
              </div>
            </div>
          </div>

          {/* Lab Introduction */}
          <div className="bg-white rounded-2xl border border-blue-100 p-6 shadow-lg">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              📖 Lab Introduction
            </label>
            <textarea
              {...register("labIntroduction")}
              rows="5"
              className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-vertical shadow-sm"
              placeholder="Write Lab Introduction"
            />
          </div>

          {/* Mission & Vision */}
          <div className="bg-white rounded-2xl border border-blue-100 p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-blue-800 mb-4">🎯 Mission & Vision</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Mission Statement
                </label>
                <textarea
                  {...register("mission")}
                  rows="5"
                  className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-vertical shadow-sm"
                  placeholder="Write Mission Statement"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Vision Statement
                </label>
                <textarea
                  {...register("vision")}
                  rows="5"
                  className="w-full border-2 border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-vertical shadow-sm"
                  placeholder="Write Vision Statement"
                />
              </div>
            </div>
          </div>
          {/* Submit Button */}
          <div className="flex justify-end pt-6 border-t-2 border-blue-200">
            <button
              type="submit"
              disabled={saveMutation.isPending}
              className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {saveMutation.isPending ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  💾 {aboutLab?._id ? "Update" : "Save"}
                </span>
              )}
            </button>
          </div>


        </form>
        </div>
      </div>
    </div>
  );
};

export default AdminAboutLab;
