import { useLoaderData, Link, useNavigate } from "react-router-dom";

function DepartmentDetails() {
  const data = useLoaderData();
  const navigate = useNavigate();
  const dept = data.selectedDept;

  if (!dept) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl text-gray-600 mb-4">Department not found</h2>
        <button
          onClick={() => navigate("/research/departments")}
          className="text-pink-500 hover:underline"
        >
          ← Back to Departments
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm">
        <Link to="/" className="text-pink-500 hover:underline">HPC</Link>
        <span className="text-gray-500"> &gt; </span>
        <Link to="/research" className="text-pink-500 hover:underline">Research</Link>
        <span className="text-gray-500"> &gt; </span>
        <Link to="/research/departments" className="text-pink-500 hover:underline">Departments</Link>
        <span className="text-gray-500"> &gt; </span>
        <span className="text-pink-500">{dept.name}</span>
      </div>

      {/* Department Title */}
      <h1 className="text-3xl font-light text-gray-800 mb-8">
        {dept.name}
      </h1>

      {/* Main Content */}
      <div className="space-y-8">
        
        {/* Presentation Section */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Presentation</h2>
          <p className="text-gray-700 leading-relaxed text-justify">
            {dept.details.presentation}
          </p>
          
          {/* Additional detailed presentation if exists */}
          {dept.details.fullPresentation && (
            <p className="text-gray-700 leading-relaxed text-justify mt-4">
              {dept.details.fullPresentation}
            </p>
          )}

          {/* Department composition info */}
          {dept.details.composition && (
            <p className="text-gray-700 leading-relaxed text-justify mt-4">
              {dept.details.composition}
            </p>
          )}
        </section>

        {/* Head Section */}
        {dept.details.head && dept.details.head.name && (
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Head</h2>
            <p className="text-gray-700">
              <Link 
                to={`#`} 
                className="text-pink-500 hover:underline"
              >
                {dept.details.head.name}
              </Link>
            </p>
          </section>
        )}

        {/* Teams Section */}
        {dept.details.teams && dept.details.teams.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Teams</h2>
            <div className="space-y-2">
              {dept.details.teams.map((team, idx) => (
                <div key={idx}>
                  <Link
                    to={`/research/teams/${team}`}
                    className="text-pink-500 hover:underline"
                  >
                    {team}
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Keywords Section */}
        {dept.details.keywords && dept.details.keywords.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Keywords</h2>
            <p className="text-gray-700 leading-relaxed text-justify">
              {dept.details.keywords.join(", ")}
            </p>
          </section>
        )}

        {/* Documents/Links Section */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Links</h2>
          <ul className="space-y-2">
            {dept.hceres.documentUrl && (
              <li>
                • <a
                  href={dept.hceres.documentUrl}
                  className="text-pink-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Access to the department pages
                </a>
              </li>
            )}
            {dept.details.seminarUrl && (
              <li>
                • <a
                  href={dept.details.seminarUrl}
                  className="text-pink-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Access to the seminar of the department
                </a>
              </li>
            )}
          </ul>
        </section>

      </div>
    </div>
  );
}

export default DepartmentDetails;