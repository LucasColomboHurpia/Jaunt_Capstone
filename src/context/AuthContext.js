import React, { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = (props) => {
    const { authUser, setAuthUser, children } = props;

  return (
    <AuthContext.Provider value={{ 
        authUser,
        setAuthUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
