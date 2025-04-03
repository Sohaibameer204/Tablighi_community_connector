import React from "react";
import { View, StyleSheet, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = ({ route }) => {
  const { mosque, coordinates } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        {`Mosque: ${mosque["Masajid Names with locations"]}`}
      </Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={coordinates}
          title={mosque["Masajid Names with locations"]}
          description={mosque["Masajid Location"]}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 10,
    fontWeight: "bold",
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;
