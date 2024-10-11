import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext'; // Use the useUser hook

function Homepage() {
  const { currentUser } = useUser(); // Destructure currentUser from useUser hook

  const testCompany = {
    logoUrl: "logos/logo1.png"
  };

  return (
    <div>
      <h1>Welcome to Jobly{currentUser ? `, ${currentUser.username}` : "!"}</h1>
      <p>Your one-stop shop for job hunting and company listings.</p>

      <div className="TestCompanyCard">
        <img className = "App-logo" src={testCompany.logoUrl} alt="Company Logo" />
      </div>

      {!currentUser && (
        <p>
          Please <Link to="/login">Log in</Link> or <Link to="/signup">Sign up</Link> to get started.
        </p>
      )}
    </div>
  );
}

export default Homepage;
