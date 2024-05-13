// Import necessary dependencies
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import CameraScreen from '../screens/CameraScreen';
import DiagnosisScreen from '../screens/DiagnosisScreen';

// Import your screens

// Create stack navigator
const Stack = createStackNavigator();
function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Diagnosis" component={DiagnosisScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
