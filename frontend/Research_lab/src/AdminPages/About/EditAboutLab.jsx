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
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );

  return (
    <div className="min-h-screen  py-12 px-2">
      <div className=" mx-auto  rounded-3xl py-3 px-2 border border-gray-100">

        {/* Gradient Heading */}
        <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-2">
          Update About Lab Information
        </h2>
        <div className="border-t border-gray-200 mb-8"></div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

          {/* Lab Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Lab Name
            </label>
            <input
              {...register("labName")}
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition shadow-sm"
              placeholder="Enter Lab Name"
            />
          </div>

          {/* Department & University Split */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Department Name
              </label>
              <input
                {...register("department")}
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition shadow-sm"
                placeholder="Enter Department Name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                University Name
              </label>
              <input
                {...register("university")}
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition shadow-sm"
                placeholder="Enter University Name"
              />
            </div>
          </div>

          {/* Lab Introduction */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Lab Introduction
            </label>
            <textarea
              {...register("labIntroduction")}
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition resize-none shadow-sm"
              placeholder="Write Lab Introduction"
            ></textarea>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mission
              </label>
              <textarea
                {...register("mission")}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition resize-none shadow-sm"
                placeholder="Write Mission"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Vision
              </label>
              <textarea
                {...register("vision")}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition resize-none shadow-sm"
                placeholder="Write Vision"
              ></textarea>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              disabled={saveMutation.isPending}
              className="px-6 py-2 text-sm font-medium text-white 
    bg-indigo-600 rounded-lg 
    hover:bg-indigo-700 
    disabled:opacity-50"
            >
              {saveMutation.isPending
                ? "Saving..."
                : aboutLab?._id
                  ? "Update"
                  : "Save"}
            </button>
          </div>


        </form>
      </div>
    </div>
  );
};

export default AdminAboutLab;
