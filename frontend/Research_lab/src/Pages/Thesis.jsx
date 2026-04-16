import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxios from "../hooks/useAxios";
import useAxiosSecure from "../hooks/useAxiosSecure";
import LeftAsideThesis from '../Components/LeftAside/LeftAsideThesis';
import CardThesis from '../Components/CardComponents/CardThesis';
import useUserRole from '../hooks/useUserRole';

function Thesis() {
  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("current");

  // ✅ Search states
  const [searchRoll, setSearchRoll] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const { role } = useUserRole();

  // Fetch all projects
  const { data: thesis = [], isLoading } = useQuery({
    queryKey: ["studentproject"],
    queryFn: async () => {
      const res = await axiosInstance.get("/studentproject");
      return res.data.filter(item => item.type === "thesis");
    },
  });

  // Mutation to update nested status
  const updateMutation = useMutation({
    mutationFn: async ({ id, status, type }) => {
      return await axiosSecure.patch(`/studentproject/nested-status/${id}`, { status, type });
    },
    onSuccess: () => queryClient.invalidateQueries(["studentproject"]),
  });

  const handleMarkComplete = (id, type) => {
    Swal.fire({
      title: "Mark as completed?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) updateMutation.mutate({ id, status: "completed", type });
    });
  };

  const handleMarkIncomplete = (id, type) => {
    Swal.fire({
      title: "Mark as ongoing?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) updateMutation.mutate({ id, status: "ongoing", type });
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure to delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/studentproject/${id}`).then(() => {
          queryClient.invalidateQueries(["studentproject"]);
        });
      }
    });
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  // Filter projects by nested status
  const currentThesis = thesis.filter(p => p.thesis?.thesisstatus === "ongoing");
  const completedThesis = thesis.filter(p => p.thesis?.thesisstatus === "completed");

  // Select the active tab projects
  let displayThesis = activeTab === "current" ? currentThesis : completedThesis;

  // ✅ Apply search filters
  if (searchRoll.trim() !== "") {
    displayThesis = displayThesis.filter(p =>
      p.student.roll.toLowerCase().includes(searchRoll.toLowerCase())
    );
  }

  if (searchTitle.trim() !== "") {
    displayThesis = displayThesis.filter(p =>
      p.thesis.thesisTitle.toLowerCase().includes(searchTitle.toLowerCase())
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Left Aside Tabs */}
      <div className="bg-white px-2 py-1 shadow">
        <LeftAsideThesis activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Search Bars - right side */}
      {
        role === 'admin' && (
          <div className="flex justify-end gap-4 mt-4 px-4">
            {/* Search by Roll */}
            <div className="flex flex-col items-end p-2 rounded-lg shadow-sm border border-gray-200">
              <label className="text-sm font-bold mb-1">Search by Roll</label>
              <input
                type="text"
                placeholder="Enter Roll"
                value={searchRoll}
                onChange={(e) => setSearchRoll(e.target.value)}
                className="w-44 px-3 py-1.5 border border-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 placeholder-gray-400"
              />
            </div>

            {/* Search by Project Title */}
            <div className="flex flex-col items-end p-2 rounded-lg shadow-sm border border-gray-200">
              <label className="text-sm font-bold mb-1">Search by Thesis Title</label>
              <input
                type="text"
                placeholder="Enter Title"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
                className="w-44 px-3 py-1.5 border border-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 placeholder-gray-400"
              />
            </div>
          </div>
        )
      }

      {/* Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-5 px-2 pb-10">
        {displayThesis.length > 0 ? (
          displayThesis.map(item => (
            <CardThesis
              key={item._id}
              item={item}
              onMarkComplete={handleMarkComplete}
              onMarkIncomplete={handleMarkIncomplete}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500 text-lg">
            {activeTab === "current"
              ? "🎉 All projects completed!"
              : "No completed projects yet"}
          </div>
        )}
      </div>
    </div>
  );
};

export default Thesis;