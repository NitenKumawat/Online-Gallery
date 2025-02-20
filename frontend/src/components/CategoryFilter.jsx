import React from 'react';

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="selectData">
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Nature">Nature</option>
        <option value="Animals">Animals</option>
        <option value="Architecture">Architecture</option>
        <option value="History">History</option>
      </select>
    </div>
  );
};

export default CategoryFilter;
