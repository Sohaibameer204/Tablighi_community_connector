import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  ActivityIndicator, 
  Alert 
} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase"; // Adjust the path to your firebase.js file

const AllTableeghiRecords = () => {
  const [verifiedUsers, setVerifiedUsers] = useState([]);
  const [mosqueData, setMosqueData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch verified users from Firestore
  useEffect(() => {
    const fetchVerifiedUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "registrations"));
        const users = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id, // Use Firestore doc ID
            name: data.name || "N/A",
            cnic: data.cnic || "N/A",
            phoneNo: data.phoneNo || "N/A",
            groupName: data.groupName || "N/A",
            duration: data.duration || "N/A",
            selectedMosque: data.selectedMosque || { "Mosque_Name": "N/A", "Masajid Location": "N/A" },
            verified: data.verified || false,
          };
        });
        const filteredUsers = users.filter((user) => user.verified); // Only include verified users
        setVerifiedUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching verified users:", error);
        Alert.alert("Error", "Unable to fetch verified users.");
      }
    };

    fetchVerifiedUsers();
  }, []);

  // Fetch mosque data from GitHub
  useEffect(() => {
    const fetchMosqueData = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/Sohaibameer204/jenkins/main/masajid_data (1).json"
        );
        const data = await response.json();
        setMosqueData(data);
      } catch (error) {
        console.error("Error fetching mosque data:", error);
        setError("Failed to fetch mosque data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMosqueData();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>All Tableeghi Records</Text>

      {/* Display verified users */}
      <Text style={styles.subHeader}>Verified Users</Text>
      <FlatList
        data={verifiedUsers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.userCard}>
            <Text style={styles.userText}>Name: {item.name}</Text>
            <Text style={styles.userText}>CNIC: {item.cnic}</Text>
            <Text style={styles.userText}>Phone No: {item.phoneNo}</Text>
            <Text style={styles.userText}>Duration: {item.duration}</Text>
            <Text style={styles.userText}>
              Mosque Name: {item.selectedMosque.Mosque_Name}
            </Text>
            <Text style={styles.userText}>
              Mosque Location: {item.selectedMosque["Masajid Location"]}
            </Text>
          </View>
        )}
      />

      {/* Display mosque data from GitHub */}
      <Text style={styles.subHeader}>Mosque Data</Text>
      <FlatList
        data={mosqueData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>
              <Text style={styles.label}>Masajid Ameer:</Text> {item["Masajid Ameer"] || "N/A"}
            </Text>
            <Text style={styles.itemText}>
              <Text style={styles.label}>Masajid Name with Location:</Text> {item["Masajid Names with locations"] || "N/A"}
            </Text>
            <Text style={styles.itemText}>
              <Text style={styles.label}>Chilla Groups:</Text> {item["chilla groups"] || "N/A"}
            </Text>
            <Text style={styles.itemText}>
              <Text style={styles.label}>Seroza Groups:</Text> {item["seroza groups"] || "N/A"}
            </Text>
            <Text style={styles.itemText}>
              <Text style={styles.label}>4 Month Groups:</Text> {item["4 month groups"] || "N/A"}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f7f8fa",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4CAF50",
    textAlign: "center",
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 10,
  },
  userCard: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#e3f2fd",
    borderRadius: 10,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  userText: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  itemContainer: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#e0f7fa",
    borderRadius: 10,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 6,
    color: "#333",
  },
  label: {
    fontWeight: "bold",
    color: "#000",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#6c757d",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
});

export default AllTableeghiRecords;
