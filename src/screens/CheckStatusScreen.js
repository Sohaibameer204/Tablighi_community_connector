import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Alert, StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebase";

const CheckStatusScreen = () => {
  const [cnic, setCnic] = useState("");
  const [isAutofilled, setIsAutofilled] = useState(false); // Track if autofill is triggered

  // Fetch CNIC from AsyncStorage when the screen loads
  useEffect(() => {
    const fetchCnic = async () => {
      try {
        const storedCnic = await AsyncStorage.getItem("userCnic");
        if (storedCnic) {
          setCnic(storedCnic); // Set CNIC if found in AsyncStorage
        }
      } catch (error) {
        console.error("Failed to fetch CNIC from AsyncStorage:", error);
      }
    };

    fetchCnic();
  }, []); // Fetch CNIC on initial load

  // Autofill CNIC when the input box is clicked
  const handleInputFocus = async () => {
    if (!isAutofilled) {
      try {
        const storedCnic = await AsyncStorage.getItem("userCnic");
        if (storedCnic) {
          setCnic(storedCnic); // Autofill on focus
          setIsAutofilled(true); // Prevent duplicate autofills
        }
      } catch (error) {
        console.error("Failed to fetch CNIC from AsyncStorage on focus:", error);
      }
    }
  };

  // Check verification status
  const checkVerificationStatus = async () => {
    if (!cnic) {
      Alert.alert("Error", "Please enter a CNIC number.");
      return;
    }

    try {
      const q = query(
        collection(db, "registrations"),
        where("cnic", "==", cnic),
        where("verified", "==", true)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        Alert.alert("Status", "You are successfully verified!");
      } else {
        Alert.alert("Status", "Verification pending.");
      }
    } catch (error) {
      console.error("Error checking verification status:", error);
      Alert.alert("Error", "Unable to check status. Please try again.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter CNIC"
          value={cnic}
          onChangeText={setCnic}
          keyboardType="numeric"
          onFocus={handleInputFocus} // Autofill on focus
        />
        <Button title="Check Status" onPress={checkVerificationStatus} color="#4CAF50" />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
});

export default CheckStatusScreen;
