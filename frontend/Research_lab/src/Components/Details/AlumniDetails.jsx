
function AlumniDetails({ item }) {
    return (
        <div className="card bg-base-100 hover:shadow-2xl transition-shadow duration-300 rounded-xl overflow-hidden">

            {/* ========= Header: Student Image ========= */}
            <header>
                <figure className="w-full h-48 overflow-hidden">
                    <img
                        src={item.student?.studentImage}
                        alt={item.student?.studentName}
                        className="w-full h-full object-cover p-2 rounded-xl"
                    />
                </figure>
            </header>

            {/* ========= Body ========= */}
            <div className="card-body p-4 border-t border-base-900">

                {/* Name */}
                <h2 className="card-title text-lg font-semibold mb-1">
                    Name : {item.student?.studentName}
                    <span className="badge badge-secondary ml-2">Alumni</span>
                </h2>

                {/* Student Info */}
                <div className="text-sm space-y-1">
                    <p>
                        <span className="font-medium">Roll:</span>{" "}
                        {item.student?.roll}
                    </p>
                    <p>
                        <span className="font-medium">Session:</span>{" "}
                        {item.student?.session}
                    </p>
                    <p>
                        <span className="font-medium">Department:</span>{" "}
                        {item.student?.department}
                    </p>
                </div>
            </div>

            {/* ========= Footer ========= */}
            <footer className="card-footer p-4 border-t border-base-700">
                <p className="text-sm">
                    <span className="font-semibold text-primary">Title:</span>{" "}
                    {item.type === "thesis"
                        ? item.thesis?.thesisTitle
                        : item.project?.projectTitle}{" "}
                    <span className="text-xs font-medium text-secondary">
                        ({item.type})
                    </span>
                </p>
            </footer>
        </div>
    );
}

export default AlumniDetails;