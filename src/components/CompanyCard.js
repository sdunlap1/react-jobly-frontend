import React from 'react';
import { useNavigate } from 'react-router-dom';

function CompanyCard({ handle, name, description, logoUrl }) {
  const navigate = useNavigate(); // Hook to navigate programmatically
  const logoSrc = logoUrl || '/logos/logo1.png'; // Default logo if no logo exists

  // Function to handle button click and navigate to company details page
  const handleViewDetails = () => {
    navigate(`/companies/${handle}`);
  };

  return (
    <div className="company-card">
      {logoUrl && <img src={logoSrc} alt={`${name} logo`} className="company-logo" />}
      {/* Only renders the <img> tag if logoUrl exists */}
      <h3>{name}</h3>
      <p>{description}</p>
      <button onClick={handleViewDetails}>View Details</button> {/* Replaces the Link with a button */}
    </div>
  );
}

export default CompanyCard;
