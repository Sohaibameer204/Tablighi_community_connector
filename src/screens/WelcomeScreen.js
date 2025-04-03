import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Welcome to</Text>
        <Text style={styles.title}>Tableeghi Community Connector</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.loginButton]} 
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.dividerContainer}>
          <Text style={styles.dividerText}>Didn't register? Click here</Text>
        </View>
        <TouchableOpacity 
          style={[styles.button, styles.signupButton]} 
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>© 2024 Tableeghi Community Connector</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Light grey background for a clean look
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A0522D', // Light brown background for the header
    width: '100%',
    paddingVertical: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 28, // Large font size for the title
    fontWeight: 'bold',
    color: '#fff', // White color for text
    textAlign: 'center',
  },
  buttonContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
  },
  button: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginBottom: 20,
    width: '100%',
  },
  loginButton: {
    backgroundColor: '#8B4513', // Brown color for login button
  },
  signupButton: {
    backgroundColor: '#808000', // Olive color for signup button
  },
  buttonText: {
    fontSize: 18,
    color: '#fff', // White text for better contrast
    fontWeight: 'bold',
  },
  dividerContainer: {
    marginVertical: 20,
  },
  dividerText: {
    fontSize: 16,
    color: '#333', // Dark color for text
    textAlign: 'center',
  },
  footerContainer: {
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: '#A0522D', // Light brown background for the footer
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#fff', // White color for text
  },
});
