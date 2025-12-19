import React from 'react';
import { NavLink } from 'react-router-dom';

function LeftAsidePublication() {
  return (
    <aside className="w-full py-4 ">
      {/* Header */}
      <div className="mb-4 px-2">
        <h2 className="text-xl font-bold text-gray-800 mb-1">Categories</h2>
        <div className="w-12 h-0.5 bg-blue-600 rounded-full"></div>
      </div>

      {/* Navigation List */}
      <nav>
        <ul className="space-y-1.5">
          {/* Journal */}
          <li>
            <NavLink
              to="/research/publications/journal"
              className={({ isActive }) =>
                `w-full text-left px-3 py-2.5 rounded-lg transition-all duration-300 group block
                ${isActive
                  ? 'bg-gradient-to-r from-blue-200 to-blue-50 shadow-md'
                  : 'bg-gradient-to-r from-blue-50 to-transparent hover:from-blue-200 hover:shadow-md'
                }`
              }
            >
              <div className="flex items-center gap-2.5">
                <span className="text-xl group-hover:scale-110 transition-transform">
                  📄
                </span>
                <span className="font-medium text-sm text-gray-700 group-hover:text-blue-600 transition-colors">
                  Journal
                </span>
              </div>
            </NavLink>
          </li>

          {/* Conferences */}
          <li>
            <NavLink
              to="/research/publications/conferences"
              className={({ isActive }) =>
                `w-full text-left px-3 py-2.5 rounded-lg transition-all duration-300 group block
                ${isActive
                  ? 'bg-gradient-to-r from-purple-200 to-purple-50 shadow-md'
                  : 'bg-gradient-to-r from-purple-50 to-transparent hover:from-purple-200 hover:shadow-md'
                }`
              }
            >
              <div className="flex items-center gap-2.5">
                <span className="text-xl group-hover:scale-110 transition-transform">
                  🎤
                </span>
                <span className="font-medium text-sm text-gray-700 group-hover:text-purple-600 transition-colors">
                  Conferences
                </span>
              </div>
            </NavLink>
          </li>

          {/* Seminar */}
          <li>
            <NavLink
              to="/research/publications/seminar"
              className={({ isActive }) =>
                `w-full text-left px-3 py-2.5 rounded-lg transition-all duration-300 group block
                ${isActive
                  ? 'bg-gradient-to-r from-green-200 to-green-50 shadow-md'
                  : 'bg-gradient-to-r from-green-50 to-transparent hover:from-green-100 hover:shadow-md'
                }`
              }
            >
              <div className="flex items-center gap-2.5">
                <span className="text-xl group-hover:scale-110 transition-transform">
                  💡
                </span>
                <span className="font-medium text-sm text-gray-700 group-hover:text-green-600 transition-colors">
                  Seminar
                </span>
              </div>
            </NavLink>
          </li>

          {/* Book/Book Chapter */}
          <li>
            <NavLink
              to="/research/publications/books"
              className={({ isActive }) =>
                `w-full text-left px-3 py-2.5 rounded-lg transition-all duration-300 group block
                ${isActive
                  ? 'bg-gradient-to-r from-orange-200 to-orange-50 shadow-md'
                  : 'bg-gradient-to-r from-orange-50 to-transparent hover:from-orange-100 hover:shadow-md'
                }`
              }
            >
              <div className="flex items-center gap-2.5">
                <span className="text-xl group-hover:scale-110 transition-transform">
                  📚
                </span>
                <span className="font-medium text-sm text-gray-700 group-hover:text-orange-600 transition-colors">
                  Book/Book Chapter
                </span>
              </div>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
export default LeftAsidePublication;