import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Welcome');
    }, 5000); // Navigate to the Welcome screen after 3 seconds
  }, [navigation]);

  return (
    <ImageBackground
      source={require('../../assets/dae1.png')} // Replace with your background image URL
      style={styles.background}
        blurRadius={5}
    >
      <View style={styles.container}>
        <Image
          source={require('../../assets/qwe.png')} // Replace with your logo image URL
          style={styles.logo}
        />
        <Text style={styles.title}>Tableeghi Community</Text>
        <Text style={styles.subtitle}>Connector</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200, // Adjust width
    height: 200, // Adjust height to make it a perfect circle
    borderRadius: 100, // Make the image circular
    borderWidth: 2, // Add border around the image
    borderColor: '#fff', // White border for contrast
    resizeMode: 'cover', // Ensure the image covers the circle without distortion
  },
  title: {
    marginTop: 20,
    fontSize: 28, // Larger font size for the title
    fontWeight: 'bold',
    color: '#fff', // White color for text to contrast with the background
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 24, // Slightly smaller font size for the subtitle
    fontWeight: '300',
    fontWeight: 'bold',
    color: '#fff', // White color for text to contrast with the background
    textAlign: 'center',
  },
});
