import React from "react";

function FilterBar() {
  return (
    <div className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="w-full bg-white border-t border-gray-200">
        <div className="w-full">
          <div className="flex w-full divide-x divide-gray-300 border-x border-gray-300 text-sm md:text-base font-semibold text-gray-700 rounded-lg overflow-hidden">
            <button className="flex-1 py-3 text-center bg-white hover:bg-green-100 focus:bg-green-200 transition-colors duration-200">
              Current Project
            </button>
            <button className="flex-1 py-3 text-center bg-white hover:bg-yellow-100 focus:bg-yellow-200 transition-colors duration-200">
              Completed Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FilterBar;