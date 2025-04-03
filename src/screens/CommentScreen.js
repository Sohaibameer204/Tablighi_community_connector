import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, getDocs, query, where, doc, updateDoc, limit, orderBy } from "firebase/firestore";
import { db } from "./firebase"; 
import Sentiment from "sentiment"; 

const CommentScreen = () => {
  const [cnic, setCnic] = useState(""); // CNIC input state
  const [isVerified, setIsVerified] = useState(false); // Verification status
  const [loading, setLoading] = useState(false); // Loading state
  const [searchQuery, setSearchQuery] = useState(""); // Mosque search query
  const [mosques, setMosques] = useState([]); // Mosque list state
  const [selectedMosque, setSelectedMosque] = useState(null); // Selected mosque state
  const [comment, setComment] = useState(""); // Comment input state
  const [sentimentLabel, setSentimentLabel] = useState(null); // Sentiment label (positive/negative)

  // Custom negative keywords
  const negativeKeywords = [
    "not",
    "not aware",
    "should be",
    "illiterate",
    "need",
    "require",
  ];
  useEffect(() => {
  const fetchCnicFromStorage = async () => {
    try {
      const storedCnic = await AsyncStorage.getItem("userCnic");
      if (storedCnic) {
        setCnic(storedCnic);
      }
    } catch (error) {
      console.error("Error fetching CNIC from AsyncStorage:", error);
    }
  };

  fetchCnicFromStorage();
}, []);

  // Handle CNIC input change
  const handleCnicChange = (text) => {
    setCnic(text);
  };

  // Verify CNIC
  const checkVerification = async () => {
    if (cnic.length !== 13) {
      Alert.alert("Error", "Please enter a valid CNIC.");
      return;
    }

    setLoading(true); // Start loading

    try {
      const querySnapshot = await getDocs(
        query(
          collection(db, "registrations"),
          where("cnic", "==", cnic),
          where("verified", "==", true)
        )
      );

      if (!querySnapshot.empty) {
        setIsVerified(true);
        Alert.alert("Verification Successful", "You are verified.");
      } else {
        setIsVerified(false);
        Alert.alert("Verification Failed", "CNIC not verified.");
      }
    } catch (error) {
      console.error("Error checking verification:", error);
      setIsVerified(false);
      Alert.alert("Error", "An error occurred while verifying your CNIC.");
    } finally {
      setLoading(false); // Stop loading
    }
  };
  

  // Fetch mosques based on search query
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

  // Analyze the sentiment of the comment
  const analyzeSentiment = (text) => {
    const sentiment = new Sentiment();
    const sentimentResult = sentiment.analyze(text);

    // Check for custom negative keywords
    const containsNegative = negativeKeywords.some((keyword) =>
      text.toLowerCase().includes(keyword.toLowerCase())
    );

    // If negative keywords found, return negative sentiment
    if (containsNegative) {
      return 0; // Negative sentiment
    }

    // Otherwise, use the sentiment score
    return sentimentResult.score < 0 ? 0 : 1; // 0 for negative, 1 for positive
  };

  // Submit comment and update mosque label in Firestore
  const handleCommentSubmit = async () => {
    if (!isVerified) {
      Alert.alert("Access Denied", "Only verified users can submit comments.");
      return;
    }

    if (!selectedMosque) {
      Alert.alert("Error", "Please select a mosque to comment.");
      return;
    }

    try {
      const sentimentResult = analyzeSentiment(comment);

      // Update mosque document with the sentiment label
      const mosqueDoc = doc(db, "mosques", selectedMosque.id);
      await updateDoc(mosqueDoc, { label: sentimentResult });

      Alert.alert("Success", "Your comment has been submitted!");
      setComment(""); // Clear comment input
      setSelectedMosque(null); // Deselect mosque
    } catch (error) {
      console.error("Error submitting comment:", error);
      Alert.alert("Error", "Failed to submit your comment.");
    }
  };

  useEffect(() => {
    fetchMosques();
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify CNIC and Access to write comment</Text>

      {/* CNIC Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your CNIC"
        value={cnic}
        onChangeText={handleCnicChange}
        keyboardType="numeric"
        maxLength={13}
      />

      {/* Check CNIC Button */}
      <Button title="Check Verification" onPress={checkVerification} />

      {/* Loading Indicator */}
      {loading && <ActivityIndicator size="large" color="#4CAF50" style={styles.loading} />}

      {/* Only show mosque search and comments if verified */}
      {isVerified && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Search Mosque"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />

          <FlatList
            data={mosques}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const mosqueLabelColor =
                item.label === 0 ? "#FFDDC1" : item.label === 1 ? "#D4EDDA" : "#F8F9FA";
              const mosqueLabelTextColor =
                item.label === 0 ? "#F44336" : item.label === 1 ? "#4CAF50" : "#6C757D";

              return (
                <TouchableOpacity
                  style={[styles.mosqueItem, { backgroundColor: mosqueLabelColor }]}
                  onPress={() => setSelectedMosque(item)} // Handle mosque selection
                >
                  <Text style={[styles.mosqueText, { color: mosqueLabelTextColor }]}>
                  {item.Mosque_Name || "Unknown Mosque"}, {item["Masajid Location"]|| "Unknown Location"}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />

          {/* Comment Section */}
          {selectedMosque && (
            <View style={styles.commentSection}>
              <Text style={styles.selectedMosqueText}>
                Selected Mosque: {selectedMosque.Mosque_Name}
              </Text>

              <TextInput
                style={styles.commentInput}
                placeholder="Write a comment"
                value={comment}
                onChangeText={(text) => setComment(text)}
              />

              <Button title="Submit Comment" onPress={handleCommentSubmit} />
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f4f4f4",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  mosqueItem: {
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  mosqueText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  loading: {
    marginTop: 10,
    alignSelf: "center",
  },
  selectedMosqueText: {
    fontSize: 16,
    marginVertical: 10,
    fontWeight: "bold",
    color: "#333",
  },
  commentSection: {
    marginTop: 20,
  },
  commentInput: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
});

export default CommentScreen;
