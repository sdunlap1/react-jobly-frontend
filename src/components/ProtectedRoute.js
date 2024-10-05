import React from 'react';
import { useUser } from '../context/UserContext';

function ProtectedRoute({ children }) {
  const { currentUser } = useUser();

  // Debug: Check the currentUser value
  console.log("ProtectedRoute - currentUser:", currentUser);

  // If there is no logged-in user, display a message
  if (!currentUser) {
    console.log("ProtectedRoute - User not logged in, displaying message");
    return (
      <div>
        <h2>You must be logged in to view this content.</h2>
        <p>
          Please <a href="/login">log in</a> or <a href="/signup">sign up</a> to access the page.
        </p>
      </div>
    );
  }

  // If the user is logged in, show the protected content
  return children;
}

export default ProtectedRoute;
