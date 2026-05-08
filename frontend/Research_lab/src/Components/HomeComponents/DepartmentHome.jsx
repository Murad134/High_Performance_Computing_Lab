import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";

function Departments() {
    const axiosInstance = useAxios();
    const navigate = useNavigate();

    // Fetch departments
    const { data: departments = [], isLoading, isError } = useQuery({
        queryKey: ["departments"],
        queryFn: async () => {
            const res = await axiosInstance.get("/departments");
            return res.data;
        },
    });

    if (isLoading)
        return <div className="text-center mt-10 text-gray-500">Loading departments...</div>;

    if (isError)
        return <div className="text-center mt-10 text-red-500">Error fetching departments!</div>;

    // Sort departments by departmentNo ascending
    const sortedDepartments = [...departments].sort((a, b) => {
        return Number(a.departmentNo) - Number(b.departmentNo);
    });

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Departments Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedDepartments.map((dept) => (
                    <div
                        key={dept._id}
                        className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-4 text-white">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">🏢</span>
                                <div>
                                    <h3 className="font-semibold text-lg">
                                        Department {dept.departmentNo}
                                    </h3>
                                    <p className="text-teal-100 text-sm">Research Division</p>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <h4 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-teal-600 transition-colors">
                                <button
                                    onClick={() => {
                                        navigate(`/research/researchs/departments/${dept._id}`);
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    className="hover:underline text-left"
                                >
                                    {dept.name}
                                </button>
                            </h4>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                                        <span className="text-teal-600 text-sm">👤</span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wide">Department Head</p>
                                        <p className="text-gray-800 font-medium">{dept.headName}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                        <span className="text-blue-600 text-sm">📅</span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wide">Established</p>
                                        <p className="text-gray-800 font-medium">{dept.startingYear}</p>
                                    </div>
                                </div>
                            </div>

                            {/* View Details Button */}
                            <div className="mt-4 pt-4 border-t border-gray-100">
                                <button
                                    onClick={() => {
                                        navigate(`/research/researchs/departments/${dept._id}`);
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    className="inline-flex items-center gap-2 bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600 transition-colors duration-200 text-sm font-medium"
                                >
                                    View Details
                                    <span className="text-xs">→</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Departments;