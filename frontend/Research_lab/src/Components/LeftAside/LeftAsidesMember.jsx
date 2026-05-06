import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const SECTIONS = [
  {
    key: 'bsc',
    label: 'BSc',
    tag: '01',
    tone: 'from-cyan-500 to-sky-500',
    note: 'Undergraduate researchers'
  },
  {
    key: 'msc',
    label: 'MSc',
    tag: '02',
    tone: 'from-emerald-500 to-teal-500',
    note: 'Graduate research track'
  },
  {
    key: 'phd',
    label: 'PhD',
    tag: '03',
    tone: 'from-amber-500 to-orange-500',
    note: 'Doctoral candidates'
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
    <aside className="w-full md:w-[340px] md:sticky md:top-20 md:self-start">
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-b from-white via-slate-50 to-slate-100 p-5 shadow-[0_20px_40px_-28px_rgba(15,23,42,0.7)] md:p-6">
        <div className="mb-5 border-b border-slate-200 pb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Members</p>
          <h2 className="mt-1 text-2xl font-bold text-slate-900">Program Explorer</h2>
        </div>

        <div className="space-y-3">
          {SECTIONS.map((section) => {
            const isActiveProgram = level === section.key;
            const isOpen = expandedSection === section.key;

            return (
              <div
                key={section.key}
                className={`rounded-2xl border bg-white/85 p-3 transition-all duration-300 ${
                  isActiveProgram
                    ? 'border-slate-900 shadow-[0_10px_24px_-18px_rgba(15,23,42,0.85)]'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => handleSectionClick(section.key)}
                  className="flex w-full items-center gap-3 text-left"
                >
                  <span
                    className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r ${section.tone} text-sm font-bold text-white`}
                  >
                    {section.tag}
                  </span>

                  <span className="flex-1">
                    <span className="block text-base font-bold text-slate-900">{section.label}</span>
                    <span className="block text-xs text-slate-500">{section.note}</span>
                  </span>

                  <span
                    className={`text-xs font-bold uppercase tracking-[0.3em] text-slate-500 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
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
                            ? 'border-cyan-500 bg-cyan-50 text-cyan-700'
                            : 'border-slate-200 text-slate-700 hover:border-cyan-300 hover:bg-cyan-50/60'
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
                            ? 'border-amber-500 bg-amber-50 text-amber-700'
                            : 'border-slate-200 text-slate-700 hover:border-amber-300 hover:bg-amber-50/60'
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
