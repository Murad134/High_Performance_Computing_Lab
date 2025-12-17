import { useLoaderData, Link, useNavigate } from "react-router-dom";

function TeamDetails() {
  const team = useLoaderData();
  const navigate = useNavigate();

  if (!team) {
    return (
      <div className="text-center py-16">
        <h2 className="text-3xl font-semibold text-gray-700 mb-6">Team not found</h2>
        <button
          onClick={() => navigate("/research/teams")}
          className="inline-flex items-center px-4 py-2 bg-pink-500 text-white rounded-lg shadow hover:bg-pink-600 transition-colors"
        >
          ← Back to Teams
        </button>
      </div>
    );
  }
  
  return (
    <div className="px-3">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm flex items-center space-x-2">
        <Link to="/" className="text-pink-600 hover:text-pink-700 font-medium">HPC</Link>
        <span className="text-gray-400">/</span>
        <Link to="/research/researchs" className="text-pink-600 hover:text-pink-700 font-medium">Research</Link>
        <span className="text-gray-400">/</span>
        <Link to="/research/researchs/teams" className="text-pink-600 hover:text-pink-700 font-medium">Teams</Link>
        <span className="text-gray-400">/</span>
        <span className="text-gray-800 font-semibold">{team.name}</span>
      </div>

      {/* Team Title */}
      <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">
        {team.name}
      </h1>

      {/* Team Full Name */}
      {team.fullName && (
        <p className="text-lg text-gray-600 mb-8 italic">{team.fullName}</p>
      )}

      {/* Main Content */}
      <div className="space-y-10">

        {/* Department and Contact Info */}
        <section className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
          {team.departmentFullName && (
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">{team.departmentName}:</span>{" "}
              {team.departmentFullName}
            </p>
          )}
          {team.leader && team.leader.name && (
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Team leader:</span>{" "}
              <Link to="#" className="text-pink-600 hover:text-pink-700 font-medium">
                {team.leader.name}
              </Link>
            </p>
          )}
          {team.leader && team.leader.email && (
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Mail:</span>{" "}
              <a
                href={`mailto:${team.leader.email}`}
                className="text-pink-600 hover:text-pink-700 font-medium"
              >
                {team.leader.email}
              </a>
            </p>
          )}
          {team.website && (
            <p>
              <a
                href={team.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 hover:text-pink-700 font-medium underline decoration-pink-400"
              >
                {team.name}'s website
              </a>
            </p>
          )}
        </section>

        {/* Presentation */}
        {team.presentation && (
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
              Presentation
            </h2>
            <p className="text-gray-700 leading-relaxed text-justify">
              {team.presentation}
            </p>
          </section>
        )}

        {/* Research Activities */}
        {team.researchActivities && team.researchActivities.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
              Research Activities
            </h2>
            <ul className="space-y-2 list-disc list-inside text-gray-700">
              {team.researchActivities.map((activity, idx) => (
                <li key={idx}>{activity}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Software */}
        {team.software && team.software.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
              Software
            </h2>
            <ul className="space-y-2 list-disc list-inside text-gray-700">
              {team.software.map((sw, idx) => (
                <li key={idx}>{sw}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Collaborations */}
        {team.collaborations && team.collaborations.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
              Collaborations
            </h2>
            <ul className="space-y-2 list-disc list-inside text-gray-700">
              {team.collaborations.map((collab, idx) => (
                <li key={idx}>{collab}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Keywords */}
        {team.keywords && team.keywords.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
              Keywords
            </h2>
            <p className="text-gray-700 leading-relaxed italic">
              {team.keywords.join(", ")}
            </p>
          </section>
        )}

      </div>
    </div>
  );
}

export default TeamDetails;
