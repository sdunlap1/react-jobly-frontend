import React, { useState, useEffect } from 'react';
import JoblyApi from '../api';
import JobCard from '../components/JobCard'; // Reusable JobCard component
import { useUser } from '../context/UserContext';  // Use useUser hook to access user
import "../App.css"

function JobList() {
  const { currentUser } = useUser();  // Fetch current user from the useUser hook
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState(new Set()); // Set to store applied job IDs
  const [isLoading, setIsLoading] = useState(true);  // Add a loading state

  useEffect(() => {
    async function getJobsAndApplications() {
      // Fetch all jobs
      const jobs = await JoblyApi.getJobs();
      setJobs(jobs);

      // Fetch applied jobs for the current user, if logged in
      if (currentUser) {
        const user = await JoblyApi.getCurrentUser(currentUser.username);
        setAppliedJobs(new Set(user.applications));  // Store applied job IDs in a Set
      }

      setIsLoading(false);  // Set loading to false after data is fetched
    }

    getJobsAndApplications();
  }, [currentUser]);  // Re-run effect when currentUser changes

  // handleApply function that will be passed to JobCard
  const handleApply = async (jobId) => {
    await JoblyApi.applyToJob(jobId);

    // Refetch the applied jobs for the current user
    const userResult = await JoblyApi.getCurrentUser(currentUser.username);
    setAppliedJobs(new Set(userResult.applications));  // Update applied jobs
  };

  if (isLoading) return <p>Loading jobs...</p>;  // Render loading message

  return (
    <div>
      <h1>Jobs</h1>
      {/* If there are no jobs, display a message */}
      {jobs.length ? (
        jobs.map(job => (
          <JobCard  // Use the JobCard component to display each job
            key={job.id}
            id={job.id}
            title={job.title}
            salary={job.salary}
            equity={job.equity}
            hasApplied={appliedJobs.has(job.id)}  // Pass the applied status
            handleApply={handleApply}  // Pass the handleApply function
          />
        ))
      ) : (
        <p>No jobs found.</p>
      )}
    </div>
  );
}

export default JobList;
