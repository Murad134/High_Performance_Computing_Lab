/**
 * Utility functions for filtering and managing project data
 */

/**
 * Student level constants for type safety and consistency
 */
export const STUDENT_LEVELS = {
  BSC: 'BSC',
  MSC: 'MSC',
  PHD: 'PhD'
};

/**
 * Filters projects by student level
 * @param {Array} dataset - Array of project objects
 * @param {string} level - Student level to filter by (BSC, MSC, or PHD)
 * @returns {Array} Filtered array of projects matching the specified level
 */
export const filterByLevel = (dataset, level) => {
  if (!Array.isArray(dataset)) {
    console.warn('filterByLevel: dataset is not an array');
    return [];
  }

  if (!level) {
    console.warn('filterByLevel: level parameter is required');
    return [];
  }

  return dataset.filter(project => {
    // Normalize comparison to handle case variations
    const projectLevel = project.studentLevel?.toUpperCase();
    const targetLevel = level.toUpperCase();
    
    return projectLevel === targetLevel;
  });
};

/**
 * Groups projects by student level
 * @param {Array} dataset - Array of project objects
 * @returns {Object} Object with keys for each level containing filtered projects
 */
export const groupByLevel = (dataset) => {
  if (!Array.isArray(dataset)) {
    console.warn('groupByLevel: dataset is not an array');
    return { BSC: [], MSC: [], PHD: [] };
  }

  return {
    BSC: filterByLevel(dataset, STUDENT_LEVELS.BSC),
    MSC: filterByLevel(dataset, STUDENT_LEVELS.MSC),
    PHD: filterByLevel(dataset, STUDENT_LEVELS.PHD)
  };
};

/**
 * Sorts projects by date (newest first)
 * @param {Array} projects - Array of project objects
 * @returns {Array} Sorted array of projects
 */
export const sortByDate = (projects) => {
  return [...projects].sort((a, b) => {
    const dateA = new Date(a.startDate || 0);
    const dateB = new Date(b.startDate || 0);
    return dateB - dateA;
  });
};

/**
 * Gets statistics for a specific level
 * @param {Array} projects - Array of project objects
 * @returns {Object} Statistics object
 */
export const getProjectStats = (projects) => {
  const ongoing = projects.filter(p => !p.endDate || new Date(p.endDate) > new Date());
  const completed = projects.filter(p => p.endDate && new Date(p.endDate) <= new Date());
  
  return {
    total: projects.length,
    ongoing: ongoing.length,
    completed: completed.length
  };
};
