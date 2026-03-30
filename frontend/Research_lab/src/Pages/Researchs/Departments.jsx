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

            {/* Breadcrumb */}
            <div className="mb-6 text-sm text-gray-600">
                <Link to="/" className="font-semibold text-red-500">Laboratory</Link> &gt;
                <Link to="/research/researchs" className="text-blue-600"> Research</Link> &gt;
                <Link to="/research/researchs/departments" className="text-blue-600"> Departments</Link>
            </div>

            {/* Page Title */}
            <h1 className="text-4xl font-bold text-gray-900 mb-8 tracking-tight">
                Departments
            </h1>
            {/* Main Content Card */}
            <div className="rounded-lg px-2 ">

                {/* Departments List */}
                <div className="space-y-8">
                    {sortedDepartments.map((dept, index) => (
                        <div
                            key={dept._id}
                            className="border-l-4 border-pink-400 pl-6 hover:bg-pink-50 transition-colors rounded-r-lg py-3"
                        >
                            {/* Department Name */}
                            <h3 className="text-pink-500 font-medium text-xl mb-2">
                                <Link to={`${dept._id}`}
                                    className="hover:text-pink-900 hover:underline transition-colors"
                                >
                                    {dept.departmentNo}. {dept.name}
                                </Link>
                            </h3>

                            {/* Department Details */}
                            <div className="text-gray-700 text-sm space-y-1 pt-2 border-t border-gray-100">

                                <p>
                                    <span className="font-medium">Head of Department:</span> {dept.headName}
                                </p>

                                <p>
                                    <span className="font-medium">Starting Year:</span> {dept.startingYear}
                                </p>

                                <p>
                                    •{" "}
                                    <a
                                        href={dept.documents}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-pink-500 hover:underline hover:text-pink-700 transition-colors"
                                    >
                                        Department Document
                                    </a>
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