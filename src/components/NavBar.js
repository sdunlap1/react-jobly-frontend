import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar({ currentUser, logout }) {
  return (
    <nav className={currentUser ? "navbar logged-in" : "navbar logged-out"}>
      <Link to="/">Home</Link>
      {currentUser ? (
        <>
          <Link to="/companies">Companies</Link>
          <Link to="/jobs">Jobs</Link>
          <Link to="/profile">Profile</Link>
          <button onClick={logout}>Log Out</button>
          <span>Welcome, {currentUser.username}</span>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </>
      )}
    </nav>
  );
}

export default NavBar;
