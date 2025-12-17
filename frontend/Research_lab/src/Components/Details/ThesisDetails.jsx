import { useLoaderData, useNavigate, useLocation } from "react-router-dom";

const ThesisDetails = () => {
    const loaderData = useLoaderData();
    const navigate = useNavigate();
    const location = useLocation();

    // ✅ location.state theke updated data nibo, otherwise loader data
    const thesis = location.state?.updatedThesis || loaderData;

    const {
        title,
        publicationDate,
        publicationPages,
        publicationName,
        abstract,
        keywords,
        thesisImage,
        studentName,
        studentSession,
        studentLevel,
        startDate,
        endDate,
        isCompleted,
    } = thesis;

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">

                {/* Thesis Image */}
                {thesisImage && (
                    <img
                        src={thesisImage}
                        alt={title}
                        className="w-full h-64 object-cover"
                    />
                )}

                <div className="p-6">
                    {/* Title */}
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">{title}</h2>

                    {/* Student Info */}

                    <p className="text-gray-600 mb-4">
                        <span className="font-semibold">Member:</span> {studentName}{" "}
                        <span className="ml-2 text-sm text-gray-500">({studentSession})</span>
                    </p>

                    <p className="text-gray-600 mb-4">
                        <span className="font-semibold">Program:</span> {studentLevel}
                    </p>

                    {/* Timeline */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <p className="text-gray-600">
                            <span className="font-semibold">Start Date:</span> {startDate}
                        </p>

                        {isCompleted && endDate && (
                            <p className="text-gray-600">
                                <span className="font-semibold">End Date:</span> {endDate}
                            </p>
                        )}
                    </div>
                    {/* Publication Info */}
                    <div className="mb-6">
                        <p className="text-gray-600 mb-2">
                            <span className="font-semibold">Publication:</span> {publicationName}
                        </p>
                        <p className="text-gray-600 mb-2">
                            <span className="font-semibold">Pages:</span> {publicationPages}
                        </p>
                        <p className="text-gray-600 mb-2">
                            <span className="font-semibold">Publication Date:</span> {publicationDate}
                        </p>

                    </div>



                    {/* Keywords */}
                    {keywords && keywords.length > 0 && (
                        <div className="mb-6">
                            <span className="font-semibold text-gray-700">Keywords:</span>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {keywords.map((keyword, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                                    >
                                        {keyword}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Abstract */}
                    <div className="mt-6">
                        <h3 className="font-semibold text-gray-700 mb-2">Abstract</h3>
                        <p className="text-gray-700 leading-relaxed">{abstract}</p>
                    </div>

                    {/* Status Badge */}
                    {isCompleted && (
                        <div className="mt-6">
                            <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full font-semibold">
                                ✓ Completed
                            </span>
                        </div>
                    )}

                    {/* Back Button */}
                    <button
                        onClick={() => navigate(-1)}
                        className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold"
                    >
                        ← Back to Theses
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ThesisDetails;


