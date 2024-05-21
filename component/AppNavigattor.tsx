// Import necessary dependencies
import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import CameraScreen from '../screens/CameraScreen';
import DiagnosisScreen from '../screens/DiagnosisScreen';
import Name from '../screens/Name';
import { AuthContext } from '../context/AuthContext';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Database from '../screens/Database';

// Import your screens

// Create stack navigator
const Stack = createStackNavigator();
function AppNavigation() {
  const [loading, setLoading] = useState(true);
  const auth = useContext(AuthContext);
  const checkAuthStatus = async () => {
    const storedUserName = await AsyncStorage.getItem('userName');

    if (storedUserName) {
      auth.login(storedUserName);
    }
    setLoading(false);
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <>
      {!loading ? (
        <>
          {auth.isAuthenticated ? (
            <NavigationContainer>
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Camera" component={CameraScreen} />
                <Stack.Screen name="Diagnosis" component={DiagnosisScreen} />
                <Stack.Screen name="Database" component={Database} />
              </Stack.Navigator>
            </NavigationContainer>
          ) : (
            <NavigationContainer>
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Name" component={Name} />
              </Stack.Navigator>
            </NavigationContainer>
          )}
        </>
      ) : (
        <ActivityIndicator />
      )}
    </>
  );
}

export default AppNavigation;
