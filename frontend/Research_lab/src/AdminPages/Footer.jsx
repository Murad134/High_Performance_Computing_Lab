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
    <section className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-8 text-indigo-700">
        Admin Panel – Edit Footer
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-8 space-y-10"
      >
        {/* ================= Lab Info ================= */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-l-4 border-yellow-400 pl-3 text-indigo-600">
            Lab Information
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Lab Name</label>
              <input
                name="labName"
                defaultValue={footer?.labName}
                type="text"
                className="w-full border rounded-md px-4 py-2"
                placeholder="HPC Research Lab"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Description / Tagline
              </label>
              <textarea
                name="description"
                defaultValue={footer?.description}
                rows="3"
                className="w-full border rounded-md px-4 py-2"
                placeholder="Inspiring innovation in HPC, AI, ML, and Data Science"
              />
            </div>
          </div>
        </div>

        {/* ================= Contact ================= */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-l-4 border-yellow-400 pl-3 text-indigo-600">
            Contact Information
          </h3>

          <div className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                name="email"
                defaultValue={footer?.email}
                type="email"
                className="w-full border rounded-md px-4 py-2"
                placeholder="example@domain.com"
              />
            </div>

            {/* Office Address - 3 Parts */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Office Address
              </label>
              <div className="grid md:grid-cols-3 gap-4">
                <input
                  name="room"
                  defaultValue={footer?.officeAddress?.room}
                  type="text"
                  className="border rounded-md px-4 py-2"
                  placeholder="Room 224"
                />
                <input
                  name="department"
                  defaultValue={footer?.officeAddress?.department}
                  type="text"
                  className="border rounded-md px-4 py-2"
                  placeholder="Dept. of CSE, JUST"
                />
                <input
                  name="city"
                  defaultValue={footer?.officeAddress?.city}
                  type="text"
                  className="border rounded-md px-4 py-2"
                  placeholder="Jashore-7408"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ================= Social Links ================= */}
        {/* <div>
          <h3 className="text-lg font-semibold mb-4 border-l-4 border-yellow-400 pl-3 text-indigo-600">
            Social Media
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Facebook</label>
              <input
                name="facebook"
                defaultValue={footer?.socialMedia?.facebook}
                type="url"
                className="border rounded-md px-4 py-2 w-full"
                placeholder="https://facebook.com/yourlab"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">GitHub</label>
              <input
                name="github"
                defaultValue={footer?.socialMedia?.github}
                type="url"
                className="border rounded-md px-4 py-2 w-full"
                placeholder="https://github.com/yourlab"
              />
            </div>
          </div>
        </div> */}
        {/* ================= Social Links ================= */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-l-4 border-yellow-400 pl-3 text-indigo-600">
            Social Media
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Facebook</label>
              <input
                name="facebook"
                defaultValue={footer?.socialMedia?.facebook}
                type="url"
                className="border rounded-md px-4 py-2 w-full"
                placeholder="https://facebook.com/yourlab"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">GitHub</label>
              <input
                name="github"
                defaultValue={footer?.socialMedia?.github}
                type="url"
                className="border rounded-md px-4 py-2 w-full"
                placeholder="https://github.com/yourlab"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">LinkedIn</label>
              <input
                name="linkedin"
                defaultValue={footer?.socialMedia?.linkedin}
                type="url"
                className="border rounded-md px-4 py-2 w-full"
                placeholder="https://linkedin.com/in/yourlab"
              />
            </div>
          </div>
        </div>


        {/* ================= Copyright ================= */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-l-4 border-yellow-400 pl-3 text-indigo-600">
            Copyright Text
          </h3>

          <div>
            <label className="block text-sm font-medium mb-1">
              Footer Bottom Text
            </label>
            <input
              name="copyrightText"
              defaultValue={footer?.copyrightText}
              type="text"
              className="w-full border rounded-md px-4 py-2"
              placeholder="© 2026 HPC Research Lab — All rights reserved."
            />
          </div>
        </div>

        {/* ================= Buttons ================= */}
        <div className="flex justify-end gap-4 pt-6">
          <button
            type="button"
            className="px-6 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            {footer ? "Update Footer" : "Create Footer"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AdminFooter;
