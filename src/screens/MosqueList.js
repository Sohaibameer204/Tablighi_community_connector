import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Button,
} from "react-native";

const MosqueList = ({ navigation }) => {
  const [mosques, setMosques] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showList, setShowList] = useState(false); // State to toggle list display

  useEffect(() => {
    const fetchMosques = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/Sohaibameer204/FYP/main/cleaned_location.json"
        );
        const data = await response.json();
        setMosques(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching mosques:", error);
        alert("Failed to fetch mosque data. Please check your JSON file or URL.");
        setLoading(false);
      }
    };

    fetchMosques();
  }, []);

  const handleShowLocation = async (mosque) => {
    try {
      const location = mosque["Masajid Location"];
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          location
        )}&format=json`
      );

      const data = await response.json();

      if (data.length > 0) {
        const coordinates = {
          latitude: parseFloat(data[0].lat),
          longitude: parseFloat(data[0].lon),
        };

        navigation.navigate("MapScreen", {
          mosque,
          coordinates,
        });
      } else {
        Alert.alert("Location Not Found", "Unable to find the mosque location.");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      Alert.alert(
        "Error",
        "Something went wrong while fetching mosque location."
      );
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Button to toggle mosque list */}
      <Button
        title="Select Mosque"
        onPress={() => setShowList(!showList)} // Toggle the list display
      />

      {/* Show mosque list if showList is true */}
      {showList && (
        <FlatList
          data={mosques}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => handleShowLocation(item)}
            >
              <Text style={styles.text}>{item["Masajid Names with locations"]}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  text: {
    fontSize: 18,
  },
});

export default MosqueList;
