// Filter students by level (bsc, msc, phd)
export const filterByLevel = (data, level) => {
  if (!level) return data;
  return data.filter(item => 
    item.studentLevel?.toLowerCase() === level.toLowerCase()
  );
};