import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JobCard from '../components/JobCard';
import JoblyApi from '../api';
import { useUser } from "../context/UserContext";  // Import UserContext to get currentUser

function CompanyDetail() {
  const { handle } = useParams();  // Get the company handle from the URL
  const { currentUser } = useUser();  // Get the logged-in user from UserContext
  const [company, setCompany] = useState(null);  // State for company details
  const [appliedJobs, setAppliedJobs] = useState(new Set());  // Applied jobs state as a Set for quick lookup
  const [isLoading, setIsLoading] = useState(true);  // Loading state

  useEffect(() => {
    async function getCompanyAndApplications() {
      if (currentUser) {
        try {
          const companyResult = await JoblyApi.getCompany(handle);
          const userResult = await JoblyApi.getCurrentUser(currentUser.username);  // Fetch applied jobs for the logged-in user

          setCompany(companyResult);
          setAppliedJobs(new Set(userResult.applications));  // Store applied job IDs in a Set for quick lookup
          setIsLoading(false);
        } catch (err) {
        }
      }
    }
    getCompanyAndApplications();
  }, [handle, currentUser]);  // Rerun this effect when the company handle or currentUser changes

  async function handleApply(jobId) {
    try {
      await JoblyApi.applyToJob(jobId);

      // Refetch the applied jobs from the backend to update the state
      const userResult = await JoblyApi.getCurrentUser(currentUser.username);

      // Update the applied jobs state with the latest data
      setAppliedJobs(new Set(userResult.applications));
    } catch (err) {
    }
  }

  if (isLoading) return <p>Loading...</p>;

  if (!company) return <p>Company not found.</p>;

  return (
    <div className="company-detail">
      <h1>{company.name}</h1>
      <p>{company.description}</p>
      <h3>Jobs at {company.name}</h3>
      <div className="job-list">
        {company.jobs.map(job => (
          <JobCard
            key={job.id}
            id={job.id}
            title={job.title}
            salary={job.salary}
            equity={job.equity}
            hasApplied={appliedJobs.has(job.id)}  // Pass down the applied status
            handleApply={handleApply}  // Pass down the handleApply function
          />
        ))}
      </div>
    </div>
  );
}

export default CompanyDetail;
