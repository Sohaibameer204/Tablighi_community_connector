import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Icon library

import SplashScreen from './src/screens/SplashScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import SignUpScreen from './src/screens/SignupScreen';
import LoginScreen from './src/screens/LoginScreen';
import PasswordResetScreen from './src/screens/PasswordResetScreen';
import HomeScreen from './src/screens/HomeScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import CommentsScreen from './src/screens/CommentScreen';
import EventScreen from './src/screens/EventScreen';
import DoAndDontScreen from './src/screens/DoandDontScreen';
import MosquesWithFacilitiesScreen from './src/screens/Mosques with facilities';
import MosqueList from './src/screens/MosqueList';
import MapScreen from './src/screens/MapScreen';
import CheckStatusScreen from './src/screens/CheckStatusScreen';
import VerificationScreen from './src/screens/VerificationScreen';
import AllTableeghiRecords from './src/screens/AllTableeghiRecords';
import LogoutScreen from './src/screens/LogoutScreen';


// Navigator instances
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Main stack for the initial flow
function MainStack() {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ title: '' }} />
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: '' }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: '' }} />
      <Stack.Screen name="PasswordReset" component={PasswordResetScreen} options={{ title: 'Reset Password' }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} options={{ title: 'Registration' }} />
      <Stack.Screen name="Comments" component={CommentsScreen} options={{ title: 'Comments' }} />
      <Stack.Screen name="Events" component={EventScreen} options={{ title: 'Upcoming Events' }} />
      <Stack.Screen name="DoAndDont" component={DoAndDontScreen} options={{ title: "Do's & Don'ts" }} />
    </Stack.Navigator>
  );
}

// Main App component
function App() {
  
  return (
    
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          {/* Home Screen */}
          <Drawer.Screen
            name="Home"
            component={MainStack}
            options={{
              headerShown: false,
              drawerIcon: ({ color, size }) => <Icon name="home" color={color} size={size} />,
            }}
          />

          {/* Other Screens */}
          <Drawer.Screen
            name="MosquesWithFacilities"
            component={MosquesWithFacilitiesScreen}
            options={{
              title: 'Mosques with Facilities',
              drawerIcon: ({ color, size }) => <Icon name="apartment" color={color} size={size} />,
            }}
          />
          <Drawer.Screen
            name="Verification"
            component={VerificationScreen}
            options={{
              title: 'Verification',
              drawerIcon: ({ color, size }) => <Icon name="verified" color={color} size={size} />,
            }}
          />
          <Drawer.Screen
            name="CheckStatus"
            component={CheckStatusScreen}
            options={{
              title: 'Check Status',
              drawerIcon: ({ color, size }) => <Icon name="check-circle" color={color} size={size} />,
            }}
          />
          <Drawer.Screen
            name="AllTableeghiRecords"
            component={AllTableeghiRecords}
            options={{
              title: 'All Tableeghi Records',
              drawerIcon: ({ color, size }) => <Icon name="library-books" color={color} size={size} />,
            }}
          />
          <Drawer.Screen
            name="MosqueList"
            component={MosqueList}
            options={{
              title: 'Mosque Location',
              drawerIcon: ({ color, size }) => <Icon name="list" color={color} size={size} />,
            }}
          />
          <Drawer.Screen
            name="MapScreen"
            component={MapScreen}
            options={{
              title: 'Map',
              drawerIcon: ({ color, size }) => <Icon name="map" color={color} size={size} />,
            }}
          />
          <Drawer.Screen
            name="Logout"
            component={LogoutScreen}
            options={{
              title: 'Logout',
              drawerIcon: ({ color, size }) => <Icon name="exit-to-app" color={color} size={size} />,
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    
  );
}

export default App;
