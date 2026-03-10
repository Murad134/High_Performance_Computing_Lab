// MakeAdmin.jsx
import React, { useState } from "react";
import { FaUser, FaUserShield } from "react-icons/fa";
import { Search } from "lucide-react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery, useMutation } from "@tanstack/react-query";

export default function MakeAdmin() {
    const axiosSecure = useAxiosSecure();
    const [email, setEmail] = useState("");
    const [searchEnabled, setSearchEnabled] = useState(false);

    // ================= SEARCH USERS =================
    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ["search-users", email],
        enabled: searchEnabled && !!email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/search?email=${email}`);
            return res.data;
        },
    });

    // ================= UPDATE ROLE =================
    const { mutateAsync: updateRole } = useMutation({
        mutationFn: async ({ userId, role }) =>
            await axiosSecure.patch(`/users/${userId}/role`, { role }),
        onSuccess: () => refetch(),
    });

    // ================= HANDLE ROLE CHANGE =================
    const handleRoleChange = async (userId, currentRole) => {
        const normalizedRole = (currentRole || "user").toLowerCase();
        const action = normalizedRole === "admin" ? "Remove Admin" : "Make Admin";
        const newRole = normalizedRole === "admin" ? "user" : "admin";

        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: `This will ${action.toLowerCase()} for the user`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
        });

        if (!confirm.isConfirmed) return;

        try {
            await updateRole({ userId, role: newRole });
            Swal.fire("Success", `User role updated to ${newRole}`, "success");
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Failed to update user role", "error");
        }
    };

    return (
        <div className="px-2 py-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-6 text-indigo-700 text-center">
                Make Admin
            </h2>

            {/* ================= SEARCH FORM ================= */}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    setSearchEnabled(true);
                    refetch();
                }}
                className="flex flex-col sm:flex-row items-center gap-3 mb-6 max-w-xl mx-auto bg-white shadow-md rounded-xl p-3 border border-gray-200"
            >
                <input
                    type="email"
                    placeholder="Search user by email..."
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button
                    type="submit"
                    className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                >
                    <Search size={18} />
                    Search
                </button>
            </form>

            {isLoading && (
                <p className="text-center text-gray-500 py-4">Loading...</p>
            )}

            {/* ================= DESKTOP/TABLET TABLE ================= */}
            {users.length > 0 && (
                <div className="overflow-x-auto sm:block hidden rounded-lg shadow border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-indigo-600 text-white text-sm uppercase">
                            <tr>
                                <th className="px-4 py-3 text-left">#</th>
                                <th className="px-4 py-3 text-left">Email</th>
                                <th className="px-4 py-3 text-left">Role</th>
                                <th className="px-4 py-3 text-left hidden md:table-cell">
                                    Created At
                                </th>
                                <th className="px-4 py-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((user, index) => {
                                const currentRole = (user.role || "user").toLowerCase();
                                const action =
                                    currentRole === "admin" ? "Remove Admin" : "Make Admin";

                                return (
                                    <tr
                                        key={user._id}
                                        className="hover:bg-indigo-50 transition-colors duration-150"
                                    >
                                        <td className="px-4 py-3 text-gray-700">{index + 1}</td>
                                        <td className="px-4 py-3 text-gray-800 truncate max-w-xs">
                                            {user.email}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span
                                                className={`px-2 py-1 rounded text-sm font-semibold ${currentRole === "admin"
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-green-100 text-green-700"
                                                    }`}
                                            >
                                                {currentRole.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 hidden md:table-cell text-gray-500 text-sm">
                                            {user.created_at
                                                ? new Date(user.created_at).toLocaleDateString("en-GB", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric",
                                                })
                                                : "N/A"}
                                        </td>
                                        <td className="px-4 py-3">
                                            {/* <button
                        className={`btn btn-xs ${
                          currentRole === "admin" ? "btn-error" : "btn-success"
                        }`}
                        onClick={() => handleRoleChange(user._id, currentRole)}
                      >
                        {currentRole === "admin" ? (
                          <FaUser className="mr-1" />
                        ) : (
                          <FaUserShield className="mr-1" />
                        )}
                        {action}
                      </button> */}
                                            <button
                                                className={`btn btn-xs ${currentRole === "admin"
                                                    ? "btn-error"
                                                    : "bg-yellow-400 hover:bg-yellow-500 text-black p-2"
                                                    }`}
                                                onClick={() => handleRoleChange(user._id, currentRole)}
                                            >
                                                {currentRole === "admin" ? <FaUser className="mr-1" /> : <FaUserShield className="mr-1" />}
                                                {action}
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            {/* ================= MOBILE CARD VIEW ================= */}
            <div className="sm:hidden mt-4 space-y-4">
                {users.length > 0 ? (
                    users.map((user, index) => {
                        const currentRole = (user.role || "user").toLowerCase();
                        const action =
                            currentRole === "admin" ? "Remove Admin" : "Make Admin";

                        return (
                            <div
                                key={user._id}
                                className="bg-white p-4 rounded-lg shadow border border-gray-200 divide-y divide-gray-100"
                            >
                                <div className="flex justify-between py-1">
                                    <span className="font-semibold text-gray-600">#</span>
                                    <span className="text-gray-800">{index + 1}</span>
                                </div>
                                <div className="flex justify-between py-1">
                                    <span className="font-semibold text-gray-600">Email</span>
                                    <span className="text-gray-800 truncate max-w-xs">
                                        {user.email}
                                    </span>
                                </div>
                                <div className="flex justify-between py-1">
                                    <span className="font-semibold text-gray-600">Role</span>
                                    <span
                                        className={`px-2 py-1 rounded text-sm font-semibold ${currentRole === "admin"
                                            ? "bg-red-100 text-red-700"
                                            : "bg-green-100 text-green-700"
                                            }`}
                                    >
                                        {currentRole.toUpperCase()}
                                    </span>
                                </div>
                                <div className="flex justify-between py-1">
                                    <span className="font-semibold text-gray-600">Created At</span>
                                    <span className="text-gray-500 text-sm">
                                        {user.created_at
                                            ? new Date(user.created_at).toLocaleString()
                                            : "N/A"}
                                    </span>
                                </div>
                                <div className="flex justify-center mt-2">
                                    {/* <button
                                        className={`btn w-full ${currentRole === "admin" ? "btn-error" : "btn-success"
                                            }`}
                                        onClick={() => handleRoleChange(user._id, currentRole)}
                                    >
                                        {currentRole === "admin" ? (
                                            <FaUser className="mr-1" />
                                        ) : (
                                            <FaUserShield className="mr-1" />
                                        )}
                                        {action}
                                    </button> */}
                                    <button
                                        className={`btn w-full ${currentRole === "admin"
                                                ? "btn-error"
                                                : "bg-yellow-400 hover:bg-yellow-500 text-black p-2"
                                            }`}
                                        onClick={() => handleRoleChange(user._id, currentRole)}
                                    >
                                        {currentRole === "admin" ? <FaUser className="mr-1" /> : <FaUserShield className="mr-1" />}
                                        {action}
                                    </button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    searchEnabled && (
                        <p className="text-center text-red-500 py-4">No user found</p>
                    )
                )}
            </div>
        </div>
    );
}