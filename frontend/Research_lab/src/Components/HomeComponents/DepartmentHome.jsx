import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxios from "../../hooks/useAxios";

function Departments() {
    const axiosInstance = useAxios();

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
        <div className="mx-auto px-4 py-4">
            {/* Main Content Card */}
            <div className="rounded-lg px-2 ">

                {/* Departments List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedDepartments.map((dept) => (
                        <div
                            key={dept._id}
                            className="border-l-4 border-pink-400 pl-4 hover:bg-pink-50 transition rounded-lg p-4 shadow-sm"
                        >
                            <h3 className="text-pink-500 font-medium text-lg mb-2">
                                <Link
                                    to={`/research/researchs/departments/${dept._id}`}
                                    className="hover:text-pink-900 hover:underline"
                                >
                                    {dept.departmentNo}. {dept.name}
                                </Link>
                            </h3>

                            <div className="text-gray-700 text-sm space-y-1 border-t pt-2">
                                <p>
                                    <span className="font-medium text-gray-700">👤 Head:</span>
                                    {dept.headName}
                                </p>
                                <p>
                                    <span className="font-medium text-gray-700">📅 Year:</span>
                                    {dept.startingYear}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>

    );
}
export default Departments;