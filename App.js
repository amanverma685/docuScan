// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './Components/Login';
import SignUpScreen from './Components/SignUp';
import UploadButtonComponent from './Components/UploadButtonComponent';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={UploadButtonComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
