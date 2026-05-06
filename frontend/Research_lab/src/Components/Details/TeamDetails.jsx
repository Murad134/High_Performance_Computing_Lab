import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import {
  FaEye,
  FaBullseye,
  FaFlask,
  FaCogs,
  FaCode,
  FaBalanceScale,
  FaMoneyBillWave,
  FaChartLine,
  FaRocket,
  FaUser,
  FaUsers,
  FaExternalLinkAlt,
  FaChevronRight,
  FaBuilding,
} from "react-icons/fa";

function TeamDetails() {
  const { id } = useParams();
  const axiosSecure = useAxios();

  const { data, isLoading } = useQuery({
    queryKey: ["team", id],
    queryFn: async () => {
      const res = await axiosSecure.get("/departments");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
          <p className="text-lg font-medium text-teal-600">
            Loading team details...
          </p>
        </div>
      </div>
    );

  let team = null;
  let department = null;

  data.forEach((dept) => {
    const found = dept.teams?.find((t) => t._id === id);
    if (found) {
      team = found;
      department = dept;
    }
  });

  if (!team)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md">
            <FaBuilding className="text-red-500 text-4xl mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-red-700 mb-2">Team Not Found</h2>
            <p className="text-red-600">
              The requested team could not be found. Please check the URL or contact support.
            </p>
          </div>
        </div>
      </div>
    );



  function Section({ title, data, icon: Icon }) {
    if (!data || data.length === 0) return null;

    return (
      <div className="bg-white border border-teal-100 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:border-teal-200 group">
        {/* Title with Icon */}
        <h3 className="text-xl font-bold mb-4 border-b-2 border-teal-100 pb-3 flex items-center gap-3 text-teal-800 group-hover:border-teal-300 transition-colors">
          {Icon && <Icon className="text-teal-500 text-xl" />}
          {title}
        </h3>

        <ul className="space-y-3">
          {data.map((item, index) => (
            <li key={index} className="flex items-start gap-3 text-gray-700 leading-relaxed">
              <FaChevronRight className="text-teal-400 mt-1 flex-shrink-0 text-sm" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">

        {/* 🔹 Academic Header Card */}
        <div className="bg-gradient-to-r from-teal-600 via-teal-700 to-teal-800 text-white rounded-2xl p-8 shadow-xl mb-8 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-24 -translate-x-24"></div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <FaUsers className="text-teal-200 text-2xl" />
              <span className="text-teal-200 font-medium uppercase tracking-wide text-sm">
                Research Team
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-3 leading-tight">
              {team.teamName}
            </h1>

            <h2 className="text-xl md:text-2xl opacity-90 mb-4 font-light">
              {team.fullName}
            </h2>

            <p className="text-lg leading-relaxed opacity-90 max-w-4xl mb-6">
              {team.description}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <FaBuilding className="text-teal-200" />
                <span className="font-medium">Department:</span>
                <span className="text-teal-200 underline decoration-teal-300">
                  {department?.name}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 🔹 Academic Grid Layout */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT SIDE - Research Sections */}
          <div className="lg:col-span-2 space-y-6">

            <Section title="Vision Statement" data={team.visionStatement} icon={FaEye} />
            <Section title="Mission Objectives" data={team.mission} icon={FaBullseye} />
            <Section title="Core Research Areas" data={team.coreResearchAreas} icon={FaFlask} />
            <Section title="Research Methodology" data={team.researchMethodology} icon={FaCogs} />
            <Section title="Technical Contributions" data={team.softwareTechnical} icon={FaCode} />
            <Section title="Publication Ethics" data={team.publicationEthics} icon={FaBalanceScale} />
            <Section title="Funding Strategy" data={team.fundingStrategy} icon={FaMoneyBillWave} />
            <Section title="Academic Impact" data={team.impactAcademic} icon={FaChartLine} />
            <Section title="Future Mission" data={team.futureMission} icon={FaRocket} />

          </div>

          {/* RIGHT SIDE - Team Information */}
          <div className="space-y-6">

            {/* Team Leader Card */}
            <div className="bg-white border border-teal-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-teal-100">
                <div className="bg-teal-100 p-2 rounded-lg group-hover:bg-teal-200 transition-colors">
                  <FaUser className="text-teal-600 text-lg" />
                </div>
                <h3 className="text-xl font-bold text-teal-800">Team Leader</h3>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-teal-700 min-w-[60px]">Name:</span>
                  <span className="text-gray-700">{team.leaderName}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-teal-700 min-w-[60px]">Email:</span>
                  <span className="text-gray-700">{team.leaderEmail}</span>
                </div>

                {team.leaderPortfolio && (
                  <a
                    href={team.leaderPortfolio}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 mt-4 bg-teal-50 hover:bg-teal-100 text-teal-700 font-medium px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-md group/link"
                  >
                    <FaExternalLinkAlt className="text-sm" />
                    Visit Portfolio
                    <FaChevronRight className="text-xs group-hover/link:translate-x-1 transition-transform" />
                  </a>
                )}
              </div>
            </div>

            {/* Team Members Card */}
            <div className="bg-white border border-teal-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-teal-100">
                <div className="bg-teal-100 p-2 rounded-lg group-hover:bg-teal-200 transition-colors">
                  <FaUsers className="text-teal-600 text-lg" />
                </div>
                <h3 className="text-xl font-bold text-teal-800">Team Members</h3>
              </div>

              {team.members && team.members.length > 0 ? (
                <ul className="space-y-2">
                  {team.members.map((member) => (
                    <li key={member._id}>
                      <Link
                        to={`/research/researchs/member/${member._id}`}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-teal-50 text-teal-700 font-medium transition-all duration-200 hover:shadow-sm group/member border border-transparent hover:border-teal-200"
                      >
                        <span>{member.name}</span>
                        <FaChevronRight className="text-teal-400 text-sm group-hover/member:translate-x-1 transition-transform" />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic text-center py-4">
                  No team members listed
                </p>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamDetails;