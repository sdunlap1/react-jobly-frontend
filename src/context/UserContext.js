import React, { createContext, useContext } from 'react';

// Create a context
const UserContext = createContext();

// Hook to access the user context
function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

// Context provider to wrap the app
function UserProvider({ children, value }) {
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, useUser };
