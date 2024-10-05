import React, { useState, useEffect } from 'react';
import JoblyApi from '../api';
import CompanyCard from "../components/CompanyCard"; 
import "../App.css";

function CompanyList() {
  // State for holding the companies
  const [companies, setCompanies] = useState([]);
  // State for holding the search term from the input field
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch companies from the API (filtered by search term, if provided)
  useEffect(() => {
    async function getCompanies() {
      try {
        const result = await JoblyApi.getCompanies(searchTerm);
        setCompanies(result);  // Store the fetched companies
      } catch (err) {
        console.error("Failed to fetch companies:", err);
      }
    }

    getCompanies();  // Call the function to fetch companies
  }, [searchTerm]);  // Run effect whenever searchTerm changes

  // Handler for the search input change
  function handleSearchChange(evt) {
    setSearchTerm(evt.target.value);  // Update the searchTerm state
  }

  return (
    <div>
      <h1>Companies</h1>

      {/* Search input for filtering companies */}
      <div className="search-box">
        <input 
          type="text" 
          placeholder="Search companies..." 
          value={searchTerm}  // Controlled component with searchTerm as its value
          onChange={handleSearchChange}  // Update searchTerm on user input
        />
      </div>

      <div>
        {/* Render a CompanyCard for each company in the list */}
        {companies.length ? (
          companies.map(company => (
            <CompanyCard
              key={company.handle}
              handle={company.handle}
              name={company.name}
              description={company.description}
              logoUrl={company.logoUrl}
            />
          ))
        ) : (
          <p>No companies found</p>  /* Fallback when no companies are found */
        )}
      </div>
    </div>
  );
}

export default CompanyList;
