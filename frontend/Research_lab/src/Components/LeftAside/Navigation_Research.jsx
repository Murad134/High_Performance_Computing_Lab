import { NavLink } from "react-router-dom";
import { Building, Users, ChevronRight, GraduationCap, BookOpen, Award, Microscope } from "lucide-react";

const navigation = [
  {
    label: "Academic Departments",
    path: "departments",
    icon: Building,
    description: "Research departments and scholarly programs"
  },
  {
    label: "Research Teams",
    path: "teams",
    icon: Users,
    description: "Collaborative research groups and teams"
  },
];

export default function NavigationResearch() {
  return (
    <aside className="px-6 py-8 bg-white border-r border-teal-100 shadow-sm">
      {/* Academic Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl shadow-lg">
            <Microscope className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Research Hub</h2>
            <p className="text-sm text-slate-500">Academic Excellence</p>
          </div>
        </div>
        <div className="w-full h-px bg-gradient-to-r from-teal-200 to-cyan-200"></div>
      </div>

      {/* Navigation Items */}
      <nav className="space-y-2">
        {navigation.map((item) => {
          const IconComponent = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group block p-4 rounded-2xl transition-all duration-300 border ${
                  isActive
                    ? "bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-300 shadow-lg shadow-teal-100/50"
                    : "border-transparent hover:border-teal-200 hover:bg-teal-50/50 hover:shadow-md"
                }`
              }
            >
              {({ isActive }) => (
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`p-2 rounded-xl transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-teal-500 to-cyan-500 shadow-lg"
                      : "bg-slate-100 group-hover:bg-teal-100"
                  }`}>
                    <IconComponent className={`w-5 h-5 transition-colors duration-300 ${
                      isActive
                        ? "text-white"
                        : "text-slate-600 group-hover:text-teal-600"
                    }`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-semibold transition-colors duration-300 ${
                        isActive
                          ? "text-teal-800"
                          : "text-slate-700 group-hover:text-teal-700"
                      }`}>
                        {item.label}
                      </h3>
                      <ChevronRight className={`w-4 h-4 transition-all duration-300 ${
                        isActive
                          ? "text-teal-600 translate-x-1"
                          : "text-slate-400 group-hover:text-teal-500 group-hover:translate-x-1"
                      }`} />
                    </div>
                    <p className={`text-sm mt-1 transition-colors duration-300 ${
                      isActive
                        ? "text-teal-600"
                        : "text-slate-500 group-hover:text-teal-500"
                    }`}>
                      {item.description}
                    </p>
                  </div>
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Academic Footer */}
      <div className="mt-8 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <GraduationCap className="w-4 h-4 text-teal-500" />
          <span>University Research Excellence</span>
        </div>
      </div>
    </aside>
  );
}