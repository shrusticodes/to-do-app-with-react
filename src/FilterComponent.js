import React from 'react';

export default function FilterComponent({ filteredValue, onSearchChange }) {
  const handleFilterChange = (filterValue) => {
    filteredValue(filterValue);
  };

  const allTasks = () => handleFilterChange('all');
  const activeTasks = () => handleFilterChange('active');
  const completedTasks = () => handleFilterChange('completed');

  return (
    <>
      <div className="filter-div">
      <h3>Filters</h3>
        <button className="btn-style filter" onClick={allTasks}>All Tasks</button>
        <button className="btn-style filter" onClick={activeTasks}>Active</button>
        <button className="btn-style filter" onClick={completedTasks}>Completed</button>
      </div>
      <div className="searchDiv">
        <input type="text" placeholder="Input to search a task / tasks" className='search' onChange={onSearchChange} />
      </div>
    </>
  );
}
