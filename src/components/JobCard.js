import React from 'react';

function JobCard({ id, title, salary, equity, hasApplied, handleApply }) {
  return (
    <div className="job-card">
      <h4>{title}</h4>
      <p>Salary: {salary ? `$${salary}` : "N/A"}</p>
      <p>Equity: {equity ? equity : "N/A"}</p>
      {hasApplied ? (
        <button disabled>Applied</button>  // Disable the button if already applied
      ) : (
        <button onClick={() => handleApply(id)}>Apply</button>  // Call the parent component's handleApply
      )}
    </div>
  );
}

export default JobCard;
