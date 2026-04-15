// // MakeAdmin.jsx
// import React, { useState } from "react";
// import { FaUser, FaUserShield } from "react-icons/fa";
// import { Search } from "lucide-react";
// import Swal from "sweetalert2";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { useQuery, useMutation } from "@tanstack/react-query";

// export default function MakeAdmin() {
//     const axiosSecure = useAxiosSecure();
//     const [email, setEmail] = useState("");
//     const [searchEnabled, setSearchEnabled] = useState(false);

//     // ================= SEARCH USERS =================
//     const { data: users = [], isLoading, refetch } = useQuery({
//         queryKey: ["search-users", email],
//         enabled: searchEnabled && !!email,
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/users/search?email=${email}`);
//             return res.data;
//         },
//     });

//     // ================= UPDATE ROLE =================
//     const { mutateAsync: updateRole } = useMutation({
//         mutationFn: async ({ userId, role }) =>
//             await axiosSecure.patch(`/users/${userId}/role`, { role }),
//         onSuccess: () => refetch(),
//     });

//     // ================= HANDLE ROLE CHANGE =================
//     const handleRoleChange = async (userId, currentRole) => {
//         const normalizedRole = (currentRole || "user").toLowerCase();
//         const action = normalizedRole === "admin" ? "Remove Admin" : "Make Admin";
//         const newRole = normalizedRole === "admin" ? "user" : "admin";

//         const confirm = await Swal.fire({
//             title: "Are you sure?",
//             text: `This will ${action.toLowerCase()} for the user`,
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonText: "Yes",
//         });

//         if (!confirm.isConfirmed) return;

//         try {
//             await updateRole({ userId, role: newRole });
//             Swal.fire("Success", `User role updated to ${newRole}`, "success");
//         } catch (err) {
//             console.error(err);
//             Swal.fire("Error", "Failed to update user role", "error");
//         }
//     };

//     return (
//         <div className="px-2 py-6 rounded-xl">
//             <h2 className="text-2xl font-bold mb-6 text-indigo-700 text-center">
//                 Make Admin
//             </h2>

//             {/* ================= SEARCH FORM ================= */}
//             <form
//                 onSubmit={(e) => {
//                     e.preventDefault();
//                     setSearchEnabled(true);
//                     refetch();
//                 }}
//                 className="flex flex-col sm:flex-row items-center gap-3 mb-6 max-w-xl mx-auto bg-white shadow-md rounded-xl p-3 border border-gray-200"
//             >
//                 <input
//                     type="email"
//                     placeholder="Search user by email..."
//                     className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <button
//                     type="submit"
//                     className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
//                 >
//                     <Search size={18} />
//                     Search
//                 </button>
//             </form>

//             {isLoading && (
//                 <p className="text-center text-gray-500 py-4">Loading...</p>
//             )}

//             {/* ================= DESKTOP/TABLET TABLE ================= */}
//             {users.length > 0 && (
//                 <div className="overflow-x-auto sm:block hidden rounded-lg shadow border border-gray-200">
//                     <table className="min-w-full divide-y divide-gray-200">
//                         <thead className="bg-indigo-600 text-white text-sm uppercase">
//                             <tr>
//                                 <th className="px-4 py-3 text-left">#</th>
//                                 <th className="px-4 py-3 text-left">Email</th>
//                                 <th className="px-4 py-3 text-left">Role</th>
//                                 <th className="px-4 py-3 text-left hidden md:table-cell">
//                                     Created At
//                                 </th>
//                                 <th className="px-4 py-3 text-left">Action</th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-200">
//                             {users.map((user, index) => {
//                                 const currentRole = (user.role || "user").toLowerCase();
//                                 const action =
//                                     currentRole === "admin" ? "Remove Admin" : "Make Admin";

//                                 return (
//                                     <tr
//                                         key={user._id}
//                                         className="hover:bg-indigo-50 transition-colors duration-150"
//                                     >
//                                         <td className="px-4 py-3 text-gray-700">{index + 1}</td>
//                                         <td className="px-4 py-3 text-gray-800 truncate max-w-xs">
//                                             {user.email}
//                                         </td>
//                                         <td className="px-4 py-3">
//                                             <span
//                                                 className={`px-2 py-1 rounded text-sm font-semibold ${currentRole === "admin"
//                                                     ? "bg-red-100 text-red-700"
//                                                     : "bg-green-100 text-green-700"
//                                                     }`}
//                                             >
//                                                 {currentRole.toUpperCase()}
//                                             </span>
//                                         </td>
//                                         <td className="px-4 py-3 hidden md:table-cell text-gray-500 text-sm">
//                                             {user.created_at
//                                                 ? new Date(user.created_at).toLocaleDateString("en-GB", {
//                                                     day: "numeric",
//                                                     month: "short",
//                                                     year: "numeric",
//                                                 })
//                                                 : "N/A"}
//                                         </td>
//                                         <td className="px-4 py-3">
//                                             {/* <button
//                         className={`btn btn-xs ${
//                           currentRole === "admin" ? "btn-error" : "btn-success"
//                         }`}
//                         onClick={() => handleRoleChange(user._id, currentRole)}
//                       >
//                         {currentRole === "admin" ? (
//                           <FaUser className="mr-1" />
//                         ) : (
//                           <FaUserShield className="mr-1" />
//                         )}
//                         {action}
//                       </button> */}
//                                             <button
//                                                 className={`btn btn-xs ${currentRole === "admin"
//                                                     ? "btn-error"
//                                                     : "bg-yellow-400 hover:bg-yellow-500 text-black p-2"
//                                                     }`}
//                                                 onClick={() => handleRoleChange(user._id, currentRole)}
//                                             >
//                                                 {currentRole === "admin" ? <FaUser className="mr-1" /> : <FaUserShield className="mr-1" />}
//                                                 {action}
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 );
//                             })}
//                         </tbody>
//                     </table>
//                 </div>
//             )}

//             {/* ================= MOBILE CARD VIEW ================= */}
//             <div className="sm:hidden mt-4 space-y-4">
//                 {users.length > 0 ? (
//                     users.map((user, index) => {
//                         const currentRole = (user.role || "user").toLowerCase();
//                         const action =
//                             currentRole === "admin" ? "Remove Admin" : "Make Admin";

//                         return (
//                             <div
//                                 key={user._id}
//                                 className="bg-white p-4 rounded-lg shadow border border-gray-200 divide-y divide-gray-100"
//                             >
//                                 <div className="flex justify-between py-1">
//                                     <span className="font-semibold text-gray-600">#</span>
//                                     <span className="text-gray-800">{index + 1}</span>
//                                 </div>
//                                 <div className="flex justify-between py-1">
//                                     <span className="font-semibold text-gray-600">Email</span>
//                                     <span className="text-gray-800 truncate max-w-xs">
//                                         {user.email}
//                                     </span>
//                                 </div>
//                                 <div className="flex justify-between py-1">
//                                     <span className="font-semibold text-gray-600">Role</span>
//                                     <span
//                                         className={`px-2 py-1 rounded text-sm font-semibold ${currentRole === "admin"
//                                             ? "bg-red-100 text-red-700"
//                                             : "bg-green-100 text-green-700"
//                                             }`}
//                                     >
//                                         {currentRole.toUpperCase()}
//                                     </span>
//                                 </div>
//                                 <div className="flex justify-between py-1">
//                                     <span className="font-semibold text-gray-600">Created At</span>
//                                     <span className="text-gray-500 text-sm">
//                                         {user.created_at
//                                             ? new Date(user.created_at).toLocaleString()
//                                             : "N/A"}
//                                     </span>
//                                 </div>
//                                 <div className="flex justify-center mt-2">
//                                     {/* <button
//                                         className={`btn w-full ${currentRole === "admin" ? "btn-error" : "btn-success"
//                                             }`}
//                                         onClick={() => handleRoleChange(user._id, currentRole)}
//                                     >
//                                         {currentRole === "admin" ? (
//                                             <FaUser className="mr-1" />
//                                         ) : (
//                                             <FaUserShield className="mr-1" />
//                                         )}
//                                         {action}
//                                     </button> */}
//                                     <button
//                                         className={`btn w-full ${currentRole === "admin"
//                                                 ? "btn-error"
//                                                 : "bg-yellow-400 hover:bg-yellow-500 text-black p-2"
//                                             }`}
//                                         onClick={() => handleRoleChange(user._id, currentRole)}
//                                     >
//                                         {currentRole === "admin" ? <FaUser className="mr-1" /> : <FaUserShield className="mr-1" />}
//                                         {action}
//                                     </button>
//                                 </div>
//                             </div>
//                         );
//                     })
//                 ) : (
//                     searchEnabled && (
//                         <p className="text-center text-red-500 py-4">No user found</p>
//                     )
//                 )}
//             </div>
//         </div>
//     );
// }





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