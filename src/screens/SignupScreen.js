import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase'; // Import Firebase config and auth

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.navigate('Login'); // Navigate to Login on successful sign-up
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 32, marginBottom: 32, fontWeight: 'bold' },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#bdc3c7',
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 20,
    paddingLeft: 20,
    backgroundColor: '#fff',
  },
  signUpButton: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 25,
    marginTop: 10,
  },
  signUpButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  errorMessage: { color: 'red', marginBottom: 16, fontSize: 16, fontWeight: 'bold' },
});

export default SignUpScreen;
