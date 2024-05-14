// AuthContext.js
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create the Auth Context
const AuthContext = createContext(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');

  // Check if the user is authenticated
  // const checkAuthStatus = async () => {
  //   const storedUserName = await AsyncStorage.getItem('userName');
  //   console.log(storedUserName);
  //   if (storedUserName) {
  //     setUserName(storedUserName);
  //     setIsAuthenticated(true);
  //   } else {
  //     setIsAuthenticated(false);
  //   }
  // };

  // useEffect(() => {
  //   checkAuthStatus();
  // }, []);

  const login = async (name: string) => {
    setUserName(name);
    setIsAuthenticated(true);
    await AsyncStorage.setItem('userName', name);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userName, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
