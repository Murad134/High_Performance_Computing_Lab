import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { ChevronDown, Users, GraduationCap, BookOpen, Award, ArrowRight } from 'lucide-react';

const SECTIONS = [
  {
    key: 'bsc',
    label: 'BSc Program',
    tag: '01',
    tone: 'from-teal-500 to-cyan-500',
    icon: BookOpen,
    note: 'Undergraduate researchers',
    currentColor: 'border-teal-500 bg-teal-50 text-teal-700',
    alumniColor: 'border-teal-600 bg-teal-50 text-teal-800'
  },
  {
    key: 'msc',
    label: 'MSc Program',
    tag: '02',
    tone: 'from-teal-600 to-blue-500',
    icon: Users,
    note: 'Graduate research track',
    currentColor: 'border-blue-500 bg-blue-50 text-blue-700',
    alumniColor: 'border-blue-600 bg-blue-50 text-blue-800'
  },
  {
    key: 'phd',
    label: 'PhD Program',
    tag: '03',
    tone: 'from-teal-700 to-indigo-500',
    icon: GraduationCap,
    note: 'Doctoral candidates',
    currentColor: 'border-indigo-500 bg-indigo-50 text-indigo-700',
    alumniColor: 'border-indigo-600 bg-indigo-50 text-indigo-800'
  }
];

function LeftSidebar() {
  const { level } = useParams();
  const navigate = useNavigate();
  const [expandedSection, setExpandedSection] = useState(level || null);

  useEffect(() => {
    if (level) setExpandedSection(level);
  }, [level]);

  const handleSectionClick = (sectionKey) => {
    navigate(`/member/${sectionKey}/current`);
    setExpandedSection(sectionKey);
  };

  return (
    <aside className="w-full md:w-[360px] md:sticky md:top-20 md:self-start">
      <div className="rounded-3xl border border-teal-200 bg-gradient-to-br from-white via-teal-50/30 to-cyan-50/40 p-6 shadow-[0_25px_50px_-20px_rgba(20,184,166,0.25)] backdrop-blur-sm">
        {/* Header */}
        <div className="mb-6 border-b border-teal-200 pb-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Program Explorer</h2>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-2">Navigate through our academic programs and meet our talented researchers</p>
        </div>

        <div className="space-y-4">
          {SECTIONS.map((section) => {
            const isActiveProgram = level === section.key;
            const isOpen = expandedSection === section.key;
            const IconComponent = section.icon;

            return (
              <div
                key={section.key}
                className={`rounded-2xl border-2 bg-white/90 backdrop-blur-sm p-4 transition-all duration-500 hover:shadow-lg hover:shadow-teal-100/50 ${
                  isActiveProgram
                    ? 'border-teal-400 shadow-[0_12px_32px_-16px_rgba(20,184,166,0.4)] ring-1 ring-teal-200'
                    : 'border-teal-100 hover:border-teal-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => handleSectionClick(section.key)}
                  className="flex w-full items-center gap-4 text-left group"
                >
                  <div className="relative">
                    <span
                      className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r ${section.tone} text-sm font-bold text-white shadow-lg transition-transform group-hover:scale-110`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </span>
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-teal-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
                      {section.tag}
                    </span>
                  </div>

                  <span className="flex-1">
                    <span className="block text-base font-bold text-slate-900 group-hover:text-teal-800 transition-colors">
                      {section.label}
                    </span>
                    <span className="block text-xs text-slate-500 mt-1 leading-relaxed">
                      {section.note}
                    </span>
                  </span>

                  <span
                    className={`text-slate-400 transition-all duration-300 group-hover:text-teal-600 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </span>
                </button>

                <div
                  className={`grid overflow-hidden transition-all duration-300 ${
                    isOpen ? 'mt-3 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="min-h-0 space-y-2 pl-1">
                    <NavLink
                      to={`/member/${section.key}/current`}
                      className={({ isActive }) =>
                        `block rounded-xl border px-3 py-2 text-sm font-semibold transition-all ${
                          isActive
                            ? 'border-teal-500 bg-teal-50 text-teal-700'
                            : 'border-slate-200 text-slate-700 hover:border-teal-300 hover:bg-teal-50/60'
                        }`
                      }
                    >
                      Current Students
                    </NavLink>

                    <NavLink
                      to={`/member/${section.key}/alumni`}
                      className={({ isActive }) =>
                        `block rounded-xl border px-3 py-2 text-sm font-semibold transition-all ${
                          isActive
                            ? 'border-teal-600 bg-teal-50 text-teal-800'
                            : 'border-slate-200 text-slate-700 hover:border-teal-300 hover:bg-teal-50/60'
                        }`
                      }
                    >
                      Alumni
                    </NavLink>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

export default LeftSidebar;
