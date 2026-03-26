import React, { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AdminEditProfessor = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            head: { picture: "", name: "", position: "", education: { bsc: "", msc: "", phd: "" }, teachingStartYear: "", department: "", university: "" },
            deputy: { picture: "", name: "", position: "", education: { bsc: "", msc: "", phd: "" }, teachingStartYear: "", department: "", university: "" },
        },
    });

    /* ================= GET ================= */
    const { data: professorData, isLoading } = useQuery({
        queryKey: ["professor"],
        queryFn: async () => {
            const res = await axiosSecure.get("/aboutprof");
            return res.data;
        },
    });

    /* ================= KEY FIX ================= */
    useEffect(() => {
        if (professorData) {
            reset(professorData); // backend theke data ashle form populate korbe
        }
    }, [professorData, reset]);

    /* ================= UPDATE ================= */
    const mutation = useMutation({
        mutationFn: async (updatedData) => {
            const res = await axiosSecure.put("/aboutprof", updatedData);
            return res.data;
        },
    });

    const onSubmit = async (data) => {
        try {
            await mutation.mutateAsync(data);
            Swal.fire({ icon: "success", title: "Updated Successfully!", timer: 1500, showConfirmButton: false });
            queryClient.invalidateQueries({ queryKey: ["professor"] }); // v5 syntax
        } catch (err) {
            console.error("Update failed:", err);
            Swal.fire({ icon: "error", title: "Update Failed!" });
        }
    };

    if (isLoading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="mx-auto bg-gradient-to-br rounded-2xl p-10">
            <h2 className="text-3xl font-extrabold text-indigo-700 mb-10 text-center tracking-wide">
                Edit Professor Information
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
                {/* ================= Head of Lab ================= */}
                <div>
                    <h3 className="text-2xl font-semibold text-indigo-600 mb-6 border-b pb-2">
                        Head of Lab
                    </h3>
                    <div className="space-y-6">
                        <div>
                            <label className="font-medium text-gray-700">Picture URL</label>
                            <input
                                {...register("head.picture")}
                                placeholder="Enter Head Picture URL"
                                className="input input-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-indigo-400"
                            />
                        </div>
                        <div>
                            <label className="font-medium text-gray-700">Name</label>
                            <input
                                {...register("head.name")}
                                placeholder="Enter Name"
                                className="input input-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-indigo-400"
                            />
                        </div>
                        <div>
                            <label className="font-medium text-gray-700">Position / Designation</label>
                            <select
                                {...register("head.position")}
                                className="select select-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-indigo-400"
                            >
                                <option value="">Select Position</option>
                                <option value="Head of Lab">Head of Lab</option>
                                <option value="Deputy Head of Lab">Deputy Head of Lab</option>
                            </select>
                        </div>
                        <div>
                            <label className="font-semibold text-gray-800 text-lg">Education</label>
                            <div className="grid md:grid-cols-3 gap-4 mt-3">
                                <input
                                    {...register("head.education.bsc")}
                                    placeholder="BSc"
                                    className="input input-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-indigo-400"
                                />
                                <input
                                    {...register("head.education.msc")}
                                    placeholder="MSc"
                                    className="input input-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-indigo-400"
                                />
                                <input
                                    {...register("head.education.phd")}
                                    placeholder="PhD"
                                    className="input input-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-indigo-400"
                                />
                                <label className="font-semibold text-gray-800 text-lg">Teaching Start Year</label>

                            </div>
                            <div>
                                <input
                                    {...register("head.teachingStartYear")}
                                    className="input input-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-indigo-400"
                                />
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="font-medium text-gray-700">Department Name</label>
                                <input
                                    {...register("head.department")}
                                    placeholder="Department Name"
                                    className="input input-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-indigo-400"
                                />
                            </div>
                            <div>
                                <label className="font-medium text-gray-700">University Name</label>
                                <input
                                    {...register("head.university")}
                                    placeholder="University Name"
                                    className="input input-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-indigo-400"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* ================= Deputy Head ================= */}
                <div>
                    <h3 className="text-2xl font-semibold text-purple-600 mb-6 border-b pb-2">
                        Deputy Head of Lab
                    </h3>
                    <div className="space-y-6">
                        <div>
                            <label className="font-medium text-gray-700">Picture URL</label>
                            <input
                                {...register("deputy.picture")}
                                placeholder="Enter Deputy Picture URL"
                                className="input input-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-purple-400"
                            />
                        </div>
                        <div>
                            <label className="font-medium text-gray-700">Name</label>
                            <input
                                {...register("deputy.name")}
                                placeholder="Enter Name"
                                className="input input-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-purple-400"
                            />
                        </div>
                        <div>
                            <label className="font-medium text-gray-700">Position / Designation</label>
                            <select
                                {...register("deputy.position")}
                                className="select select-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-purple-400"
                            >
                                <option value="">Select Position</option>
                                <option value="Head of Lab">Head of Lab</option>
                                <option value="Deputy Head of Lab">Deputy Head of Lab</option>
                            </select>
                        </div>
                        <div>
                            <label className="font-semibold text-gray-800 text-lg">Education</label>
                            <div className="grid md:grid-cols-3 gap-4 mt-3">
                                <input
                                    {...register("deputy.education.bsc")}
                                    placeholder="BSc"
                                    className="input input-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-purple-400"
                                />
                                <input
                                    {...register("deputy.education.msc")}
                                    placeholder="MSc"
                                    className="input input-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-purple-400"
                                />
                                <input
                                    {...register("deputy.education.phd")}
                                    placeholder="PhD"
                                    className="input input-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-purple-400"
                                />
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="font-medium text-gray-700">Department Name</label>
                                <input
                                    {...register("deputy.department")}
                                    placeholder="Department Name"
                                    className="input input-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-purple-400"
                                />
                            </div>
                            <div>
                                <label className="font-medium text-gray-700">University Name</label>
                                <input
                                    {...register("deputy.university")}
                                    placeholder="University Name"
                                    className="input input-bordered w-full border border-blue-300 px-2 focus:ring-2 focus:ring-purple-400"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={mutation.isLoading}
                        className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                    >
                        {mutation.isLoading ? "Updating..." : "Update"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminEditProfessor;