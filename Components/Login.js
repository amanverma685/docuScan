// screens/LoginScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const LoginScreen = ({ navigation }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Fetch API base URL from .env file
      const baseUrl = "http://3979-2a09-bac1-36c0-58-00-277-17.ngrok-free.app";

      const response = await axios.post(`${baseUrl}/auth/login`, {
        email:username,
        password:password,
      });
      console.log(response.data);
      console.log(response);
      // Handle the response
      if (response.status===200) {
        // Successful login
        await AsyncStorage.setItem('token', response.data.jwtToken);
        // Navigate to the next screen or perform other actions
        navigation.navigate('Home');
      } else {
        // Failed login
        console.error('Login failed');
        // Handle error, show error message, etc.
      }
    } catch (error) {
      console.error('Error during login:', error);
      // Handle error, show error message, etc.
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/login.jpg')} style={styles.image} />
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Sign In" onPress={handleLogin} />
      <Text style={styles.signUpText} onPress={() => navigation.navigate('SignUp')}>
        Don't have an account? Sign Up
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: 250,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  signUpText: {
    marginTop: 20,
    color: 'blue',
  },
});

export default LoginScreen;
