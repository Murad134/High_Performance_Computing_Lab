
import React, { useState } from "react";
import { Search } from "lucide-react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useQuery, useMutation } from "@tanstack/react-query";

export default function MakeAdmin() {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const [email, setEmail] = useState("");
    const [searchEnabled, setSearchEnabled] = useState(false);

    // ================= GET CURRENT USER ROLE =================
    const { data: currentUserRoleData } = useQuery({
        queryKey: ["current-user-role", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/role?email=${user.email}`);
            return res.data;
        },
    });

    const currentUserRole = currentUserRoleData?.role;

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
            await axiosSecure.patch(
                `/users/${userId}/role`,
                { role },
                {
                    headers: {
                        email: user?.email,
                    },
                }
            ),
        onSuccess: () => refetch(),
    });

    // ================= HANDLE ROLE CHANGE =================
    const handleRoleChange = async (userId, targetRole) => {
        if (currentUserRole !== "superadmin") {
            return Swal.fire("Blocked", "Only superadmin can change roles", "error");
        }

        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: `Change role to ${targetRole}?`,
            icon: "warning",
            showCancelButton: true,
        });

        if (!confirm.isConfirmed) return;

        try {
            await updateRole({ userId, role: targetRole });
            Swal.fire("Success", `Role updated to ${targetRole}`, "success");
        } catch {
            Swal.fire("Error", "Failed to update role", "error");
        }
    };

    return (
        // <div className="px-2 py-6">
        //     <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">
        //         Make Admin Panel
        //     </h2>

        //     {/* ================= SEARCH ================= */}
        //     <form
        //         onSubmit={(e) => {
        //             e.preventDefault();
        //             setSearchEnabled(true);
        //             refetch();
        //         }}
        //         className="flex gap-3 max-w-xl mx-auto mb-6"
        //     >
        //         <input
        //             type="email"
        //             placeholder="Search user..."
        //             value={email}
        //             onChange={(e) => setEmail(e.target.value)}
        //             className="flex-1 border px-3 py-2 rounded"
        //         />
        //         <button className="bg-blue-600 text-white px-4 rounded">
        //             <Search size={16} /> Search
        //         </button>
        //     </form>

        //     {isLoading && <p className="text-center">Loading...</p>}

        //     {/* ================= TABLE ================= */}
        //     {users.length > 0 && (
        //         <div className="overflow-x-auto">
        //             <table className="w-full border">
        //                 <thead className="bg-indigo-600 text-white">
        //                     <tr>
        //                         <th>Email</th>
        //                         <th>Role</th>
        //                         <th>Actions</th>
        //                     </tr>
        //                 </thead>

        //                 <tbody>
        //                     {users.map((u) => (
        //                         <tr key={u._id} className="border-b">
        //                             <td>{u.email}</td>

        //                             <td className="font-bold">
        //                                 {u.role.toUpperCase()}
        //                             </td>

        //                             <td className="space-x-2">

        //                                 {/* USER */}
        //                                 {u.role === "user" && (
        //                                     <button
        //                                         onClick={() =>
        //                                             handleRoleChange(u._id, "admin")
        //                                         }
        //                                         className="bg-yellow-400 px-2 py-1"
        //                                     >
        //                                         Make Admin
        //                                     </button>
        //                                 )}

        //                                 {/* ADMIN */}
        //                                 {u.role === "admin" && (
        //                                     <>
        //                                         <button
        //                                             onClick={() =>
        //                                                 handleRoleChange(u._id, "superadmin")
        //                                             }
        //                                             className="bg-green-500 px-2 py-1 text-white"
        //                                         >
        //                                             Make Superadmin
        //                                         </button>

        //                                         <button
        //                                             onClick={() =>
        //                                                 handleRoleChange(u._id, "user")
        //                                             }
        //                                             className="bg-red-500 px-2 py-1 text-white"
        //                                         >
        //                                             Remove Admin
        //                                         </button>
        //                                     </>
        //                                 )}

        //                                 {/* SUPERADMIN */}
        //                                 {u.role === "superadmin" && (
        //                                     <>
        //                                         <button
        //                                             onClick={() =>
        //                                                 handleRoleChange(u._id, "admin")
        //                                             }
        //                                             className="bg-blue-500 px-2 py-1 text-white"
        //                                         >
        //                                             Demote Admin
        //                                         </button>

        //                                         <button
        //                                             onClick={() =>
        //                                                 handleRoleChange(u._id, "user")
        //                                             }
        //                                             className="bg-gray-500 px-2 py-1 text-white"
        //                                         >
        //                                             Make User
        //                                         </button>
        //                                     </>
        //                                 )}

        //                             </td>
        //                         </tr>
        //                     ))}
        //                 </tbody>
        //             </table>
        //         </div>
        //     )}
        // </div>

        <div className="px-4 py-6">
            <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">
                Make Admin Panel
            </h2>

            {/* ================= SEARCH ================= */}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    setSearchEnabled(true);
                    refetch();
                }}
                className="flex gap-3 max-w-2xl mx-auto mb-8 bg-white p-3 rounded-xl shadow-md border"
            >
                <input
                    type="email"
                    placeholder="Search user by email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />

                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg transition flex items-center gap-2">
                    <Search size={16} />
                    Search
                </button>
            </form>

            {isLoading && (
                <p className="text-center text-gray-500">Loading users...</p>
            )}

            {/* ================= TABLE ================= */}
            {users.length > 0 && (
                <div className="overflow-x-auto bg-white shadow-lg rounded-xl border">
                    <table className="w-full text-sm">
                        <thead className="bg-indigo-600 text-white">
                            <tr>
                                <th className="text-left p-4">Email</th>
                                <th className="text-left p-4">Role</th>
                                <th className="text-left p-4">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((u) => (
                                <tr
                                    key={u._id}
                                    className="border-b hover:bg-gray-50 transition"
                                >
                                    {/* EMAIL */}
                                    <td className="p-4 font-medium text-gray-700">
                                        {u.email}
                                    </td>

                                    {/* ROLE BADGE */}
                                    <td className="p-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-bold
                                    ${u.role === "superadmin"
                                                    ? "bg-purple-100 text-purple-700"
                                                    : u.role === "admin"
                                                        ? "bg-blue-100 text-blue-700"
                                                        : "bg-green-100 text-green-700"
                                                }`}
                                        >
                                            {u.role.toUpperCase()}
                                        </span>
                                    </td>

                                    {/* ACTIONS */}
                                    <td className="p-4 space-x-2">

                                        {/* USER */}
                                        {u.role === "user" && (
                                            <button
                                                onClick={() =>
                                                    handleRoleChange(u._id, "admin")
                                                }
                                                className="px-3 py-1 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-black font-medium transition"
                                            >
                                                Make Admin
                                            </button>
                                        )}

                                        {/* ADMIN */}
                                        {u.role === "admin" && (
                                            <>
                                                <button
                                                    onClick={() =>
                                                        handleRoleChange(
                                                            u._id,
                                                            "superadmin"
                                                        )
                                                    }
                                                    className="px-3 py-1 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium transition"
                                                >
                                                    Make Superadmin
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        handleRoleChange(u._id, "user")
                                                    }
                                                    className="px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition"
                                                >
                                                    Remove Admin
                                                </button>
                                            </>
                                        )}

                                        {/* SUPERADMIN */}
                                        {u.role === "superadmin" && (
                                            <>
                                                <button
                                                    onClick={() =>
                                                        handleRoleChange(u._id, "admin")
                                                    }
                                                    className="px-3 py-1 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition"
                                                >
                                                    Demote Admin
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        handleRoleChange(u._id, "user")
                                                    }
                                                    className="px-3 py-1 rounded-lg bg-gray-500 hover:bg-gray-600 text-white font-medium transition"
                                                >
                                                    Make User
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}