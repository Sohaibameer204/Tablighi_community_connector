import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./firebase"; // Adjust the path according to your structure

const PasswordResetScreen = () => {
  const [email, setEmail] = useState("");

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email.");
      return;
    }

    try {
      // Send a password reset email
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        "Reset Email Sent",
        "A password reset email has been sent to your email address. Please check your inbox and follow the instructions."
      );
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />
      <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
        <Text style={styles.resetButtonText}>Send Reset Email</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  title: {
    fontSize: 32,
    marginBottom: 32,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: "#bdc3c7",
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 20,
    paddingLeft: 20,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  resetButton: {
    backgroundColor: "#3498db",
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 25,
    marginTop: 10,
  },
  resetButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default PasswordResetScreen;
