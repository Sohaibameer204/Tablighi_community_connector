import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TextInput,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // For storing credentials
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "./firebase";

const VerificationScreen = () => {
  const [unverifiedUsers, setUnverifiedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState([]);

  // Handle login for authorized access
  const handleLogin = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      
      if (result.user.email === "sohaibameer204@gmail.com") {
        setAuthorized(true);

        // Store email and password in AsyncStorage
        await AsyncStorage.setItem("email", email);
        await AsyncStorage.setItem("password", password);

        Alert.alert("Success", "You are now logged in.");
      } else {
        Alert.alert("Error", "Unauthorized access. This account is not allowed.");
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "Invalid credentials. Please try again.");
    }
  };

  // Fetch stored credentials on component mount
  useEffect(() => {
    const fetchStoredCredentials = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem("email");
        const storedPassword = await AsyncStorage.getItem("password");

        if (storedEmail && storedPassword) {
          setEmail(storedEmail);
          setPassword(storedPassword);

          // Automatically log in the user if credentials match
          if (storedEmail === "sohaibameer204@gmail.com") {
            setAuthorized(true);
          }
        }
      } catch (error) {
        console.error("Error fetching stored credentials:", error);
      }
    };

    fetchStoredCredentials();
  }, []);

  // Fetch unverified users
  const fetchUnverifiedUsers = async () => {
    setLoading(true);
    try {
      // Query users where "verified" is not true
      const q = query(
        collection(db, "registrations"),
        where("verified", "!=", true)
      );
  
      const querySnapshot = await getDocs(q);
      const users = querySnapshot.docs
        .filter((doc) => !doc.data().verified || doc.data().verified === false) // Exclude users with verified: true
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
  
      setUnverifiedUsers(users);
    } catch (error) {
      console.error("Error fetching unverified users:", error);
      Alert.alert("Error", "Failed to fetch unverified users.");
    }
    setLoading(false);
  };
  

  // Verify user
  const handleVerify = async (userId) => {
    try {
      const userDoc = doc(db, "registrations", userId);
      await updateDoc(userDoc, { verified: true });

      setUnverifiedUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== userId)
      );

      Alert.alert("Success", "User verified successfully.");
    } catch (error) {
      console.error("Error verifying user:", error);
      Alert.alert("Error", "Failed to verify user.");
    }
  };

  useEffect(() => {
    if (authorized) {
      fetchUnverifiedUsers();
    }
  }, [authorized]);

  const renderUserItem = ({ item }) => (
    <View style={styles.userCard}>
      <Text style={styles.userText}>Name: {item.name}</Text>
      <Text style={styles.userText}>CNIC: {item.cnic}</Text>
      <Text style={styles.userText}>Phone: {item.phoneNo}</Text>
      <Text style={styles.userText}>Duration: {item.duration}</Text>
      <Text style={styles.userText}>
        Mosque: {item.selectedMosque?.Mosque_Name || "N/A"}
      </Text>
      <TouchableOpacity
        style={styles.verifyButton}
        onPress={() => handleVerify(item.id)}
      >
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );

  if (!authorized) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Admin Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Login" onPress={handleLogin} color="#4CAF50" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Unverified Users</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" />
      ) : (
        <FlatList
          data={unverifiedUsers}
          keyExtractor={(item) => item.id}
          renderItem={renderUserItem}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No unverified users found.</Text>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "#4CAF50" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
  },
  userCard: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },
  userText: { fontSize: 16, marginBottom: 5 },
  verifyButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  emptyText: { textAlign: "center", color: "#888", fontSize: 16, marginTop: 20 },
});

export default VerificationScreen;
