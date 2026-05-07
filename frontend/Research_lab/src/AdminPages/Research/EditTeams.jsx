import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useFieldArray } from "react-hook-form";
const AdminAddUpdateTeamForm = () => {
  const axiosSecure = useAxiosSecure();
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


  const handleEdit = (team) => {
    setEditingTeam(team);

    // Scroll to the form at the top
    window.scrollTo({ top: 0, behavior: 'smooth' });

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
    <section className="mx-auto p-6 space-y-6">

      {/* Custom Animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes slideInUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          .animate-slide-in-up {
            animation: slideInUp 0.6s ease-out forwards;
          }
          .animate-pulse-gentle {
            animation: pulse 2s ease-in-out infinite;
          }
        `
      }} />

      {/* ================= FORM SECTION ================= */}
      <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100 shadow-xl rounded-3xl p-8">
        {/* Header with Icon */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-blue-800 mb-2">
            {editingTeam ? "Update Research Team" : "Add Research Team"}
          </h2>
          <p className="text-blue-600 font-medium">Manage your research team information</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

          {/* ================= DEPARTMENT SECTION ================= */}
          <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-800">Department Information</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Select Department *
                </label>
                <select
                  {...register("departmentNo", { required: true })}
                  className="w-full border-2 border-blue-200 rounded-xl p-4 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-700"
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
                  <label className="block mb-2 font-semibold text-gray-700">
                    Department Name
                  </label>
                  <input
                    value={selectedDept.name}
                    readOnly
                    className="w-full border-2 border-blue-200 rounded-xl p-4 bg-blue-50 text-gray-700 font-medium"
                  />
                </div>
              )}
            </div>
          </div>

          {/* ================= TEAM BASIC INFO ================= */}
          <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-800">Team Basic Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Tea Name *
                </label>
                <input
                  {...register("teamName", { required: true })}
                  className="w-full border-2 border-blue-200 rounded-xl p-4 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-700"
                  placeholder="Enter team name"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Full Name
                </label>
                <input
                  {...register("fullName")}
                  className="w-full border-2 border-blue-200 rounded-xl p-4 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-700"
                  placeholder="Enter full name"
                />
              </div>
            </div>
          </div>

          {/* ================= TEAM LEADER SECTION ================= */}
          <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-800">Team Leader Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Leader Name
                </label>
                <input
                  {...register("leaderName")}
                  className="w-full border-2 border-blue-200 rounded-xl p-4 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-700"
                  placeholder="Enter leader name"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Leader Email
                </label>
                <input
                  type="email"
                  {...register("leaderEmail")}
                  className="w-full border-2 border-blue-200 rounded-xl p-4 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-700"
                  placeholder="Enter leader email"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Leader Portfolio
                </label>
                <input
                  {...register("leaderPortfolio")}
                  className="w-full border-2 border-blue-200 rounded-xl p-4 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-700"
                  placeholder="Enter portfolio URL"
                />
              </div>
            </div>
          </div>

          {/* ================= TEAM MEMBERS SECTION ================= */}
          <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-800">Team Members</h3>
            </div>

            <div className="space-y-6">
              {fields.map((item, index) => (
                <div
                  key={item.id}
                  className="grid grid-cols-1 md:grid-cols-4 gap-4 border-2 border-blue-100 p-4 rounded-xl bg-blue-50/30"
                >
                  {/* Member Name */}
                  <input
                    placeholder="Member Name"
                    {...register(`members.${index}.name`)}
                    className="border-2 border-blue-200 rounded-lg p-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-700"
                  />

                  {/* Member Email */}
                  <input
                    type="email"
                    placeholder="Member Email"
                    {...register(`members.${index}.email`)}
                    className="border-2 border-blue-200 rounded-lg p-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-700"
                  />

                  {/* Member Portfolio */}
                  <input
                    placeholder="Member Portfolio"
                    {...register(`members.${index}.portfolio`)}
                    className="border-2 border-blue-200 rounded-lg p-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-700"
                  />

                  {/* REMOVE BUTTON (ONLY EDIT MODE) */}
                  {editingTeam && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-3 font-semibold transition-all duration-200 hover:shadow-md"
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
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Member
              </button>
            </div>
          </div>
          {/* ================= DESCRIPTION INPUT ================= */}
          <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-800">Team Description</h3>
            </div>
            <textarea
              {...register("description")}
              rows="3"
              className="w-full border-2 border-blue-200 rounded-xl p-4 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-700 resize-vertical"
              placeholder="Enter team description..."
            />
          </div>
          {/* ================= RESEARCH & STRATEGIC DETAILS ================= */}
          <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-800">Research & Strategic Details</h3>
            </div>

            <div className="grid gap-6">
              {[
                { label: "Vision Statement", name: "visionStatement", icon: "🎯" },
                { label: "Mission", name: "mission", icon: "🚀" },
                { label: "Core Research Areas", name: "coreResearchAreas", icon: "🔬" },
                { label: "Research Methodology", name: "researchMethodology", icon: "📊" },
                { label: "Software & Technical Contributions", name: "softwareTechnical", icon: "💻" },
                { label: "Publication & Ethics Policy", name: "publicationEthics", icon: "📝" },
                { label: "Funding & Sustainability Strategy", name: "fundingStrategy", icon: "💰" },
                { label: "Impact & Academic Gaining", name: "impactAcademic", icon: "📈" },
                { label: "Future Strategic Mission", name: "futureMission", icon: "🔮" },
              ].map((field) => (
                <div key={field.name} className="space-y-2">
                  <label className="block font-semibold text-gray-700 flex items-center gap-2">
                    <span className="text-lg">{field.icon}</span>
                    {field.label}
                  </label>
                  <textarea
                    {...register(field.name)}
                    rows="3"
                    className="w-full border-2 border-blue-200 rounded-xl p-4 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 text-gray-700 resize-vertical"
                    placeholder={`Enter ${field.label.toLowerCase()}...`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ================= SUBMIT BUTTON ================= */}
          <div className="flex justify-center pt-6">
            <button
              type="submit"
              disabled={mutation.isPending}
              className="px-12 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-xl hover:scale-105 disabled:hover:scale-100 flex items-center gap-3"
            >
              {mutation.isPending ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {editingTeam ? "Update Team" : "Add Team"}
                </>
              )}
            </button>
          </div>

        </form>
      </div>

      {/* ================= PREMIUM TEAM CARDS SECTION ================= */}
      <section className="relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-400 to-teal-500 rounded-full blur-2xl"></div>
        </div>

        <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8">
          {/* Section Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent mb-2">
                Research Teams
              </h2>
              <p className="text-gray-600 font-medium">Manage and organize your research teams</p>
            </div>

            {/* Enhanced Search Bar */}
            <div className="relative w-80">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search teams by name..."
                value={teamSearch}
                onChange={(e) => setTeamSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-blue-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-300 text-gray-700 placeholder-gray-400 font-medium"
              />
              {teamSearch && (
                <button
                  onClick={() => setTeamSearch("")}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-blue-400 hover:text-blue-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Premium Cards Grid */}
          <div className="grid md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredTeams.map((team, index) => (
              <div
                key={team._id}
                className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl border border-blue-50 overflow-hidden transition-all duration-500 hover:-translate-y-2 animate-slide-in-up flex flex-col min-h-[450px]"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Background Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-50/30 via-white to-blue-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Top Accent Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                {/* ===== CARD HEADER ===== */}
                <div className="relative p-6 border-b border-teal-100/30 bg-gradient-to-r from-teal-50/20 to-blue-50/20">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-teal-100 text-teal-700 border border-teal-200">
                        Team #{team.teamName?.slice(0, 8) || "N/A"}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-800 transition-colors duration-300 mb-2 line-clamp-2">
                    {team.teamName || "Unnamed Team"}
                  </h3>

                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    {team.departmentName || "No Department"}
                  </div>
                </div>

                {/* ===== CARD BODY ===== */}
                <div className="relative flex-1 p-6 space-y-4 bg-white">
                  {/* Team Leader */}
                  <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-blue-50 to-blue-50 rounded-xl border border-blue-100/50">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-blue-700 mb-1">Team Leader</p>
                      <p className="text-sm text-gray-600 truncate">{team.leaderName || "Not assigned"}</p>
                      {team.leaderEmail && (
                        <p className="text-xs text-gray-600 mt-1 truncate">{team.leaderEmail}</p>
                      )}
                    </div>
                  </div>

                  {/* Team Stats */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-center">
                      <div className="text-lg font-bold text-blue-600">{team.members?.length || 0}</div>
                      <div className="text-xs text-gray-600">Members</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-center">
                      <div className="text-lg font-bold text-blue-600">
                        {team.coreResearchAreas && typeof team.coreResearchAreas === 'string' ? team.coreResearchAreas.split(',').length : 0}
                      </div>
                      <div className="text-xs text-gray-600">Research Areas</div>
                    </div>
                  </div>

                  {/* Vision Statement */}
                  {team.visionStatement && (
                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span className="text-sm font-semibold text-blue-700">Vision</span>
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-3 italic">
                        "{team.visionStatement.length > 120 ? `${team.visionStatement.substring(0, 120)}...` : team.visionStatement}"
                      </p>
                    </div>
                  )}


                </div>

                {/* ===== CARD FOOTER ===== */}
                <div className="relative px-6 pb-6 border-t border-teal-100/30 bg-gradient-to-r from-gray-50/50 to-teal-50/30">
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => handleEdit(team)}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2 group/btn"
                    >
                      <svg className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(team._id)}
                      className="px-4 py-3 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-md hover:scale-105 flex items-center justify-center"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredTeams.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-br from-teal-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {teamSearch ? "No teams found" : "No teams yet"}
              </h3>
              <p className="text-gray-500">
                {teamSearch ? `No teams match "${teamSearch}"` : "Start by adding your first research team above"}
              </p>
            </div>
          )}
        </div>
      </section>
    </section>
  );
};

export default AdminAddUpdateTeamForm;