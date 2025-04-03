import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  View,
  Button,
  Alert,
  Switch,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, query, where, orderBy, limit, getDocs, addDoc } from "firebase/firestore";
import { db } from "./firebase";

const RegistrationScreen = () => {
  const [name, setName] = useState("");
  const [cnic, setCnic] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [duration, setDuration] = useState("");
  const [isAmeer, setIsAmeer] = useState(false);
  const [noOfMembers, setNoOfMembers] = useState(0);
  const [memberCnicList, setMemberCnicList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [mosques, setMosques] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMosque, setSelectedMosque] = useState("");

  const PAGE_SIZE = 20; // Fetch 20 mosques per page

  const fetchMosques = async () => {
    if (loading) return;
    setLoading(true);
  
    try {
      let mosqueQuery;
      if (searchQuery.trim() === "") {
        // Default query without search
        mosqueQuery = query(collection(db, "mosques"), orderBy("Mosque_Name"), limit(PAGE_SIZE));
      } else {
        // Search query for both Mosque_Name and Masajid Location
        const nameQuery = query(
          collection(db, "mosques"),
          where("Mosque_Name", ">=", searchQuery),
          where("Mosque_Name", "<=", searchQuery + "\uf8ff")
        );
        const locationQuery = query(
          collection(db, "mosques"),
          where("Masajid Location", ">=", searchQuery),
          where("Masajid Location", "<=", searchQuery + "\uf8ff")
        );
  
        const [nameSnapshot, locationSnapshot] = await Promise.all([
          getDocs(nameQuery),
          getDocs(locationQuery),
        ]);
  
        // Combine results and remove duplicates
        const combinedResults = [
          ...nameSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
          ...locationSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
        ];
  
        const uniqueResults = Array.from(
          new Map(combinedResults.map((item) => [item.id, item])).values()
        );
  
        setMosques(
          uniqueResults.filter(
            (mosque) =>
              mosque.Mosque_Name &&
              /^[a-zA-Z0-9\s]+$/.test(mosque.Mosque_Name.trim()) // Ensure valid names
          )
        );
        setLoading(false);
        return;
      }
  
      const querySnapshot = await getDocs(mosqueQuery);
      const mosqueList = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter(
          (mosque) =>
            mosque.Mosque_Name &&
            typeof mosque.Mosque_Name === "string" &&
            /^[a-zA-Z0-9\s]+$/.test(mosque.Mosque_Name.trim()) // Ensure valid names
        );
  
  
      setMosques(mosqueList);
    } catch (error) {
      console.error("Error fetching mosques:", error);
    }
  
    setLoading(false);
  };
  
  

  const handleSearchChange = (text) => {
    setSearchQuery(text);
  };

  useEffect(() => {
    fetchMosques();
  }, [searchQuery]);

  const validateInputs = () => {
    if (!/^\d{13}$/.test(cnic)) {
      Alert.alert("Error", "CNIC must be exactly 13 digits.");
      return false;
    }

    if (isAmeer) {
      for (const memberCnic of memberCnicList) {
        if (!/^\d{13}$/.test(memberCnic)) {
          Alert.alert("Error", "Each member's CNIC must be exactly 13 digits.");
          return false;
        }
      }
    }

    if (!["3 days", "1 month", "4 months"].includes(duration)) {
      Alert.alert("Error", "Duration must be 3 days, 1 month, or 4 months.");
      return false;
    }
    if (!/^\d{11}$/.test(phoneNo)) {
      Alert.alert("Error", "phone no must be exactly 11 digits.");
      return false;
    }

    if (!name || !phoneNo || !selectedMosque) {
      Alert.alert("Error", "Please fill out all required fields.");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateInputs()) return;

    const registrationData = {
      name,
      cnic,
      phoneNo,
      duration,
      isAmeer,
      noOfMembers: isAmeer ? noOfMembers : null,
      memberCnicList: isAmeer ? memberCnicList : null,
      selectedMosque,
      verified: false,
      timestamp: new Date(),
    };

    try {
      await addDoc(collection(db, "registrations"), registrationData);

      // Save Ameer CNIC in local storage
      if (isAmeer) {
        await AsyncStorage.setItem("userCnic", cnic);
      }

      Alert.alert("Success", "Records submitted. Check your status.");
      clearForm();
    } catch (error) {
      console.error("Firestore error:", error);
      Alert.alert("Error", "Failed to save registration data.");
    }
  };

  const clearForm = () => {
    setName("");
    setCnic("");
    setPhoneNo("");
    setDuration("");
    setIsAmeer(false);
    setNoOfMembers(0);
    setMemberCnicList([]);
    setSelectedMosque("");
    setSearchQuery("");
  };

  const renderMemberInputs = () => {
    const inputs = [];
    for (let i = 0; i < noOfMembers; i++) {
      inputs.push(
        <TextInput
          key={i}
          style={styles.input}
          placeholder={`CNIC of Member ${i + 1}`}
          value={memberCnicList[i] || ""}
          onChangeText={(text) => {
            const updatedList = [...memberCnicList];
            updatedList[i] = text;
            setMemberCnicList(updatedList);
          }}
          keyboardType="numeric"
          maxLength={13}
        />
      );
    }
    return inputs;
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Registration Form</Text>
          <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
          <TextInput
            style={styles.input}
            placeholder="CNIC"
            value={cnic}
            onChangeText={setCnic}
            keyboardType="numeric"
            maxLength={13}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phoneNo}
            onChangeText={setPhoneNo}
            keyboardType="phone-pad"
            maxLength={11}
          />
          <TextInput
            style={styles.input}
            placeholder="Duration (e.g., 3 days)"
            value={duration}
            onChangeText={setDuration}
          />
          <Text style={{ color: 'red', fontWeight: 'bold', marginBottom: 10 }}>
  Please visit the mosques marked in red color, as they are in urgent need of attention.
</Text>
          <TextInput
            style={styles.input}
            placeholder="Search Mosque"
            value={searchQuery}
            onChangeText={handleSearchChange}
          />
          <FlatList
            data={mosques}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.mosqueItem,
                  { backgroundColor: item.label === 0 ? "red" : "green" },
                ]}
                onPress={() => setSelectedMosque(item)}
              >
                <Text style={styles.mosqueText}>{item.Mosque_Name || "Unknown Mosque"}, {item["Masajid Location"]|| "Unknown Location"}</Text>
              </TouchableOpacity>
            )}
          />
          <Text style={styles.selectedMosqueText}>
            Selected Mosque: {selectedMosque ? selectedMosque.Mosque_Name : "None"}
          </Text>
          <View style={styles.switchContainer}>
            <Text>Are you Ameer?</Text>
            <Switch value={isAmeer} onValueChange={setIsAmeer} />
          </View>
          {isAmeer && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Number of Members"
                value={noOfMembers.toString()}
                onChangeText={(text) => setNoOfMembers(Number(text))}
                keyboardType="numeric"
              />
              {renderMemberInputs()}
            </>
          )}
          <Button title="Submit" onPress={handleSubmit} color="#4CAF50" />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", textAlign: "center", marginBottom: 20, color: "#4CAF50" },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  mosqueItem: {
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  mosqueText: { fontSize: 16, fontWeight: "bold", color: "#fff" },
  selectedMosqueText: { fontSize: 16, marginVertical: 10, fontWeight: "bold" },
});

export default RegistrationScreen;
