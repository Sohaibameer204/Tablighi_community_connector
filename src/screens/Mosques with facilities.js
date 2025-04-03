import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const MosquesWithFacilitiesScreen = () => {
  const [data, setData] = useState([]);
  const [rooms, setRooms] = useState("");
  const [kitchen, setKitchen] = useState("");
  const [washrooms, setWashrooms] = useState("");
  const [filteredMosques, setFilteredMosques] = useState([]);

  // Fetch data from GitHub JSON
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/Sohaibameer204/FYP/main/RecordsTableegh.json"
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Function to filter mosques based on input
  const filterMosques = () => {
    const filtered = data.filter((item) => {
      const isRoomMatch = rooms
        ? item["Masajid Location Rooms"] >= parseInt(rooms)
        : true;
      const isKitchenMatch = kitchen
        ? item["Masajid Facilities        Kitchen"] >= parseInt(kitchen)
        : true;
      const isWashroomMatch = washrooms
        ? item["Masajid Facilities Washrooms"] >= parseInt(washrooms)
        : true;

      return isRoomMatch && isKitchenMatch && isWashroomMatch;
    });

    setFilteredMosques(filtered);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Find Mosques with Facilities</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Minimum Rooms"
        keyboardType="numeric"
        value={rooms}
        onChangeText={setRooms}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Minimum Kitchens"
        keyboardType="numeric"
        value={kitchen}
        onChangeText={setKitchen}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Minimum Washrooms"
        keyboardType="numeric"
        value={washrooms}
        onChangeText={setWashrooms}
      />
      <TouchableOpacity style={styles.filterButton} onPress={filterMosques}>
        <Text style={styles.buttonText}>Filter</Text>
      </TouchableOpacity>

      <Text style={styles.resultHeading}>Matching Mosques:</Text>
      {filteredMosques.length > 0 ? (
        <FlatList
          data={filteredMosques}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.mosqueItem}>
              <Text style={styles.mosqueDetails}>
                <Text style={styles.label}>Ameer:</Text> {item["Masajid Ameer  Unnamed: 0_level_1"]}
              </Text>
              <Text style={styles.mosqueDetails}>
                <Text style={styles.label}>Name:</Text> {item["Masajid Names with locations Unnamed: 1_level_1"]}
              </Text>
              <Text style={styles.mosqueDetails}>
                <Text style={styles.label}>Location:</Text> {item["Masajid Location Unnamed: 2_level_1"]}
              </Text>
              <Text style={styles.mosqueDetails}>
                <Text style={styles.label}>Rooms:</Text> {item["Masajid Location Rooms"]}, 
                <Text style={styles.label}> Kitchen:</Text> {item["Masajid Facilities        Kitchen"]}, 
                <Text style={styles.label}> Washrooms:</Text> {item["Masajid Facilities Washrooms"]}
              </Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noResults}>No mosques match the criteria.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f7f8fa",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 45,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 12,
    backgroundColor: "#fff",
    elevation: 2,
  },
  filterButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  resultHeading: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  mosqueItem: {
    backgroundColor: "#e3f2fd",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 1,
  },
  mosqueDetails: {
    fontSize: 16,
    marginBottom: 5,
    color: "#555",
  },
  label: {
    fontWeight: "bold",
    color: "#000",
  },
  noResults: {
    fontSize: 16,
    marginTop: 15,
    textAlign: "center",
    color: "#999",
  },
});

export default MosquesWithFacilitiesScreen;