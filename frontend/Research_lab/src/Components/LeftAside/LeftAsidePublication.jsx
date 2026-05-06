import React from 'react';
import { NavLink } from 'react-router-dom';
import { FileText, Mic, BookOpen, ChevronRight } from 'lucide-react';

function LeftAsidePublication() {
  const publicationCategories = [
    {
      id: 'journal',
      path: '/research/publications/journal',
      label: 'Journal Publications',
      icon: FileText,
      description: 'Peer-reviewed research papers',
      color: 'teal'
    },
    {
      id: 'conferences',
      path: '/research/publications/conferences',
      label: 'Conference Papers',
      icon: Mic,
      description: 'International conference presentations',
      color: 'cyan'
    },
    {
      id: 'books',
      path: '/research/publications/books',
      label: 'Books & Chapters',
      icon: BookOpen,
      description: 'Books and book chapters',
      color: 'emerald'
    }
  ];

  return (
    <aside className="w-full py-6 px-4">
      {/* Academic Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg shadow-md">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Publications
          </h2>
        </div>
        <div className="w-16 h-0.5 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full mt-3"></div>
      </div>

      {/* Navigation Cards */}
      <nav className="space-y-3">
        {publicationCategories.map((category) => {
          const IconComponent = category.icon;

          return (
            <NavLink
              key={category.id}
              to={category.path}
              className={({ isActive }) =>
                `group relative overflow-hidden rounded-xl border transition-all duration-500 block
                ${isActive
                  ? 'bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-300 shadow-lg shadow-teal-100/50 scale-105'
                  : 'bg-white border-slate-200 hover:border-teal-300 hover:shadow-lg hover:shadow-teal-100/30 hover:scale-102'
                }`
              }
            >
              {({ isActive }) => (
                <div className="p-4 relative">
                  {/* Background Gradient Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-opacity duration-300
                    ${category.color === 'teal' ? 'from-teal-500 to-cyan-500' :
                      category.color === 'cyan' ? 'from-cyan-500 to-blue-500' :
                      'from-emerald-500 to-teal-500'}`}></div>

                  <div className="flex items-start gap-3 relative z-10">
                    {/* Icon */}
                    <div className={`p-2.5 rounded-lg transition-all duration-300 flex-shrink-0
                      ${isActive
                        ? 'bg-gradient-to-r from-teal-500 to-cyan-500 shadow-md'
                        : 'bg-slate-50 group-hover:bg-gradient-to-r group-hover:from-teal-500 group-hover:to-cyan-500 group-hover:shadow-md'
                      }`}>
                      <IconComponent className={`w-5 h-5 transition-colors duration-300
                        ${isActive
                          ? 'text-white'
                          : 'text-slate-600 group-hover:text-white'
                        }`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-semibold text-sm leading-tight mb-1 transition-colors duration-300
                        ${isActive
                          ? 'text-teal-700'
                          : 'text-slate-700 group-hover:text-teal-700'
                        }`}>
                        {category.label}
                      </h3>
                      <p className={`text-xs leading-relaxed transition-colors duration-300
                        ${isActive
                          ? 'text-teal-600'
                          : 'text-slate-500 group-hover:text-teal-600'
                        }`}>
                        {category.description}
                      </p>
                    </div>

                    {/* Chevron */}
                    <ChevronRight className={`w-4 h-4 transition-all duration-300 flex-shrink-0
                      ${isActive
                        ? 'text-teal-600 translate-x-0 opacity-100'
                        : 'text-slate-400 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-teal-600'
                      }`} />
                  </div>

                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-500 to-cyan-500 rounded-r-full"></div>
                  )}
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer Stats */}
      <div className="mt-8 pt-4 border-t border-slate-200">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-full border border-teal-200">
            <div className="w-2 h-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-teal-700">
              Research Publications
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default LeftAsidePublication;