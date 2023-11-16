// screens/SignUpScreen.js

import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const SignUpScreen = ({ navigation }) => {
  const handleSignUp = () => {
    // Implement sign-up logic if needed
    alert('Sign Up pressed!');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
      />
      <TextInput
        style={styles.input}
        placeholder="Choose a password"
        secureTextEntry={true}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
      <Text style={styles.signInText} onPress={() => navigation.navigate('Login')}>
        Already have an account? Sign In
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
  signInText: {
    marginTop: 20,
    color: 'blue',
  },
});

export default SignUpScreen;
