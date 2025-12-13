import React from 'react'

function LeftAsideThesis() {
  return (
    <div className="w-full bg-white border-t border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex divide-x divide-gray-300 border-x border-gray-300 text-sm md:text-base font-semibold text-gray-700 rounded-lg overflow-hidden">
          <button className="flex-1 py-2 md:py-3 text-center bg-white hover:bg-green-100 focus:bg-green-200 transition-colors duration-200">
            Journal
          </button>
          <button className="flex-1 py-2 md:py-3 text-center bg-white hover:bg-yellow-100 focus:bg-yellow-200 transition-colors duration-200">
            Conferences
          </button>
          <button className="flex-1 py-2 md:py-3 text-center bg-white hover:bg-purple-100 focus:bg-purple-200 transition-colors duration-200">
            Seminar
          </button>
          <button className="flex-1 py-2 md:py-3 text-center bg-white hover:bg-pink-100 focus:bg-pink-200 transition-colors duration-200">
            Book/Book Chapter
          </button>
        </div>
      </div>
    </div>
  )
}

export default LeftAsideThesis
