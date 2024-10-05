import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import JoblyApi from "./api";
import Homepage from "./pages/Homepage";
import CompanyList from "./pages/CompanyList";
import CompanyDetail from "./pages/CompanyDetail";
import JobList from "./pages/JobList";
import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignupForm";
import ProfileForm from "./pages/ProfileForm";
import NavBar from "./components/NavBar";
import useLocalStorage from "./hooks/useLocalStorage"; // Custom hook for local storage
import ProtectedRoute from "./components/ProtectedRoute";
import { UserProvider } from "./context/UserContext";
import NotFound from './pages/NotFound';

const TOKEN_STORAGE_ID = "jobly-token"; // ID to save token in localStorage

function App() {
  // Store token in localStorage and sync with state
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [currentUser, setCurrentUser] = useState(null); // Holds the current logged-in user

  useEffect(() => {
    // Fetch the current user whenever the token changes
    async function getCurrentUser() {
      if (token) {
        try {
          const { username } = jwtDecode(token); // Decode the token to get the username
          JoblyApi.token = token; // Set the token for API requests
          const user = await JoblyApi.getCurrentUser(username);
          setCurrentUser(user); // Store the current user
        } catch (err) {
          setCurrentUser(null); // Clear current user on error
        }
      } else {
        setCurrentUser(null); // Clear current user if no token
      }
    }
    getCurrentUser();
  }, [token]);

  /** Login function */
  async function login(data) {
    try {
      const token = await JoblyApi.login(data); // Assuming the backend returns a token
      setToken(token); // Save token to localStorage and state
      return { success: true };
    } catch (errors) {
      return { success: false, errors };
    }
  }

  async function signup(data) {
    try {
      const token = await JoblyApi.signup(data); // Call JoblyApi.signup to register the new user
      setToken(token); // Save the returned token to localStorage and state
      return { success: true };
    } catch (errors) {
      return { success: false, errors };
    }
  }
  /** Update profile when user updates info on profile page **/
  // App.js

  async function updateProfile(newData) {
    try {
      const updatedUser = await JoblyApi.updateProfile(
        currentUser.username,
        newData
      );
      setCurrentUser(updatedUser); // Update the current user in state
      return { success: true };
    } catch (errors) {
      console.error("Profile update failed", errors);
      return { success: false, errors };
    }
  }

  /** Logout function */
  function logout() {
    setCurrentUser(null); // Clear current user state
    setToken(null); // Clear token from localStorage and state
  }

  // A reverse ProtectedRoute to prevent logged-in users from accessing login or signup
  function PublicRoute({ children, currentUser }) {
    if (currentUser) {
      return <Navigate to="/profile" />;
    }
    return children;
  }

  return (
    <div className="App">
      <UserProvider value={{ currentUser }}>
        <BrowserRouter>
          <NavBar logout={logout} currentUser={currentUser} />
          <Routes>
            <Route path="/" element={<Homepage currentUser={currentUser} />} />
            <Route
              path="/companies"
              element={
                <ProtectedRoute>
                  <CompanyList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/companies/:handle"
              element={
                <ProtectedRoute>
                  <CompanyDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/jobs"
              element={
                <ProtectedRoute>
                  <JobList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute currentUser={currentUser}>
                  <LoginForm login={login} />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute currentUser={currentUser}>
                  <SignupForm signup={signup} />
                </PublicRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfileForm
                    currentUser={currentUser}
                    updateProfile={updateProfile}
                  />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
