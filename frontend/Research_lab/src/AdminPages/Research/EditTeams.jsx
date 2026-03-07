import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxios from "../../hooks/useAxios";
import { useFieldArray } from "react-hook-form";
const AdminAddUpdateTeamForm = () => {
  const axiosSecure = useAxios();
  const queryClient = useQueryClient();
  // ✅ Define defaultValues once outside the component
  const emptyValues = {
    departmentNo: "",
    teamName: "",
    fullName: "",
    leaderName: "",
    leaderEmail: "",
    leaderPortfolio: "",
    description: "",
    visionStatement: "",
    mission: "",
    coreResearchAreas: "",
    researchMethodology: "",
    softwareTechnical: "",
    publicationEthics: "",
    fundingStrategy: "",
    impactAcademic: "",
    futureMission: "",
    members: [],
  };
  // const { register, handleSubmit, reset, watch, setValue } = useForm();
  const { register, handleSubmit, reset, watch, control } = useForm({
    defaultValues: emptyValues,
  }
  );

  const [editingTeam, setEditingTeam] = useState(null);
  const [teamSearch, setTeamSearch] = useState("");

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "members",
  });

  /* ================= FETCH DEPARTMENTS ================= */
  const { data: departments = [] } = useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/departments");
      return res.data;
    },
  });

  /* ================= FETCH TEAMS ================= */
  const { data: teams = [] } = useQuery({
    queryKey: ["teams"],
    queryFn: async () => {
      const res = await axiosSecure.get("/teams");
      return res.data;
    },
  });

  /* ================= SELECTED DEPARTMENT ================= */
  const selectedDeptNo = watch("departmentNo");
  const selectedDept = departments.find(
    (d) => d.departmentNo === selectedDeptNo
  );

  /* ================= CREATE / UPDATE MUTATION ================= */
  const mutation = useMutation({
    mutationFn: async (data) => {
      if (editingTeam) {
        return await axiosSecure.put(`/teams/${editingTeam._id}`, data);
      } else {
        return await axiosSecure.post("/teams", data);
      }
    },
    onSuccess: () => {
      Swal.fire("Success!", "Team Saved Successfully", "success");
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      reset(emptyValues);
      replace([]);
      setEditingTeam(null);
    },
    onError: (error) => {
      Swal.fire(
        "Error!",
        error.response?.data?.message || "Something went wrong",
        "error"
      );
    },
  });

  const onSubmit = (data) => {
    if (selectedDept) {
      data.departmentName = selectedDept.name; // attach department name
    }

    // ✅ Remove _id if creating a new team
    if (!editingTeam) {
      delete data._id;
    }

    mutation.mutate(data);
  };

  /* ================= EDIT HANDLER ================= */
  // const handleEdit = (team) => {
  //   setEditingTeam(team);

  //   Object.keys(team).forEach((key) => {
  //     setValue(key, team[key]);
  //   });
  // };

  const handleEdit = (team) => {
    setEditingTeam(team);

    // Separate members from other fields
    const { members, ...rest } = team;

    // Reset all other fields
    reset(rest);

    // Replace members field array properly
    if (Array.isArray(members) && members.length > 0) {
      replace(members); // populate members if present
    } else {
      replace([]); // clear members if none
    }
  };

  /* ================= DELETE HANDLER ================= */
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the team!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      await axiosSecure.delete(`/teams/${id}`);
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      Swal.fire("Deleted!", "Team deleted successfully", "success");
    }
  };

  const filteredTeams = teams.filter((team) =>
    team.teamName?.toLowerCase().includes(teamSearch.toLowerCase())
  );

  return (
    <section className="max-w-7xl mx-auto p-6 space-y-12">

      {/* ================= FORM SECTION ================= */}
      <div className="bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-10">
          {editingTeam ? "Update Research Team" : "Add Research Team"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">

          {/* ================= DEPARTMENT SECTION ================= */}
          <div>
            <h3 className="text-xl font-semibold mb-6 border-b pb-2">
              Department Information
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block mb-2 font-medium">
                  Select Department *
                </label>
                <select
                  {...register("departmentNo", { required: true })}
                  className="w-full border rounded-lg p-3"
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept._id} value={dept.departmentNo}>
                      {dept.departmentNo} - {dept.name}
                    </option>
                  ))}
                </select>
              </div>

              {selectedDept && (
                <div>
                  <label className="block mb-2 font-medium">
                    Department Name
                  </label>
                  <input
                    value={selectedDept.name}
                    readOnly
                    className="w-full border rounded-lg p-3 bg-gray-100"
                  />
                </div>
              )}
            </div>
          </div>

          {/* ================= TEAM BASIC INFO ================= */}
          <div>
            <h3 className="text-xl font-semibold mb-6 border-b pb-2">
              Team Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-medium">
                  Team Name *
                </label>
                <input
                  {...register("teamName", { required: true })}
                  className="w-full border rounded-lg p-3"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Full Name
                </label>
                <input
                  {...register("fullName")}
                  className="w-full border rounded-lg p-3"
                />
              </div>
            </div>
          </div>

          {/* ================= TEAM LEADER SECTION ================= */}
          <div>
            <h3 className="text-xl font-semibold mb-6 border-b pb-2">
              Team Leader Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block mb-2 font-medium">
                  Leader Name
                </label>
                <input
                  {...register("leaderName")}
                  className="w-full border rounded-lg p-3"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Leader Email
                </label>
                <input
                  type="email"
                  {...register("leaderEmail")}
                  className="w-full border rounded-lg p-3"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Leader Portfolio
                </label>
                <input
                  {...register("leaderPortfolio")}
                  className="w-full border rounded-lg p-3"
                />
              </div>
            </div>
          </div>

          {/* ================= TEAM MEMBERS SECTION ================= */}
          <div>
            <h3 className="text-xl font-semibold mb-6 border-b pb-2">
              Team Members
            </h3>

            <div className="space-y-6">

              {fields.map((item, index) => (
                <div
                  key={item.id}
                  className="grid grid-cols-1 md:grid-cols-4 gap-4 border p-4 rounded-lg"
                >

                  {/* Member Name */}
                  <input
                    placeholder="Member Name"
                    {...register(`members.${index}.name`)}
                    className="border rounded-lg p-3"
                  />

                  {/* Member Email */}
                  <input
                    type="email"
                    placeholder="Member Email"
                    {...register(`members.${index}.email`)}
                    className="border rounded-lg p-3"
                  />

                  {/* Member Portfolio */}
                  <input
                    placeholder="Member Portfolio"
                    {...register(`members.${index}.portfolio`)}
                    className="border rounded-lg p-3"
                  />

                  {/* REMOVE BUTTON (ONLY EDIT MODE) */}
                  {editingTeam && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="bg-red-500 text-white rounded-lg px-4"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}

              {/* ADD MEMBER BUTTON */}
              <button
                type="button"
                onClick={() =>
                  append({
                    name: "",
                    email: "",
                    portfolio: "",
                  })
                }
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
              >
                + Add Member
              </button>

            </div>
          </div>
          {/* ================= DESCRIPTION INPUT ================= */}
          <div className="mb-2">
            <label className="block mb-1 font-medium">
              <h3 className="text-xl font-semibold mb-1 pb-1">
                Team Description
              </h3>
            </label>
            <textarea
              {...register("description")} // <-- add this to your form
              rows="2"
              className="w-full border rounded-lg p-3"
            />
          </div>
          {/* ================= RESEARCH & STRATEGIC DETAILS ================= */}
          <div>
            <h3 className="text-xl font-semibold mb-6 border-b pb-2">
              Research & Strategic Details
            </h3>

            {[
              { label: "Vision Statement", name: "visionStatement" },
              { label: "Mission", name: "mission" },
              { label: "Core Research Areas", name: "coreResearchAreas" },
              { label: "Research Methodology", name: "researchMethodology" },
              { label: "Software & Technical Contributions", name: "softwareTechnical" },
              { label: "Publication & Ethics Policy", name: "publicationEthics" },
              { label: "Funding & Sustainability Strategy", name: "fundingStrategy" },
              { label: "Impact & Academic Gaining", name: "impactAcademic" },
              { label: "Future Strategic Mission", name: "futureMission" },
            ].map((field) => (
              <div key={field.name} className="mb-6">
                <label className="block mb-2 font-medium">
                  {field.label}
                </label>
                <textarea
                  {...register(field.name)}
                  rows="3"
                  className="w-full border rounded-lg p-3"
                />
              </div>
            ))}
          </div>

          {/* ================= SUBMIT BUTTON ================= */}
          <div className="flex justify-end pt-6">
            <button
              type="submit"
              disabled={mutation.isPending}
              className="px-10 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            >
              {mutation.isPending
                ? "Saving..."
                : editingTeam
                  ? "Update Team"
                  : "Add Team"}
            </button>
          </div>

        </form>
      </div>

      {/* ================= TEAM LIST ================= */}
      <section>
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold text-indigo-700">
            Research Teams
          </h2>

          <input
            type="text"
            placeholder="Search by Team Name..."
            value={teamSearch}
            onChange={(e) => setTeamSearch(e.target.value)}
            className="border px-4 py-2 rounded-lg w-64"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-8 p-2">
          {filteredTeams.map((team) => (
            <div
              key={team._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition flex flex-col border"
            >
              {/* Header */}
              <div className="py-2 px-4 rounded-lg">
                <h3 className="text-lg font-bold">Team Name : {team.teamName}</h3>
                <p className="text-sm opacity-90">
                  Department Name : {team.departmentName}
                </p>
              </div>

              {/* Body */}
              <div className="py-2 px-4 space-y-2 text-sm text-gray-700 flex-1 border-t border-gray-200">
                <p><strong>Leader:</strong> {team.leaderName || "N/A"}</p>
                <p><strong>Email:</strong> {team.leaderEmail || "N/A"}</p>
                <p><strong>Vision:</strong> {team.visionStatement?.slice(0, 60) || "N/A"}...</p>
              </div>

              {/* Footer */}
              <div className="bg-gray-50 py-3 px-4 flex justify-between rounded-b-2xl">
                <button
                  onClick={() => handleEdit(team)}
                  className="text-yellow-600 font-semibold"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(team._id)}
                  className="text-red-600 font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};

export default AdminAddUpdateTeamForm;