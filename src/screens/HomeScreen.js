import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Ionicons name="menu" size={32} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Home</Text>
      </View>
      <Image
        source={require('../../assets/img.png')} // Replace with your header image URL
        style={styles.headerImage}
      />
      <View style={styles.navOptions}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('RegistrationScreen')}>
          <FontAwesome5 name="user-edit" size={24} color="#8B4513" />
          <Text style={styles.navText}>Registration</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Events')}>
          <MaterialIcons name="event" size={24} color="#8B4513" />
          <Text style={styles.navText}>Events</Text>
        </TouchableOpacity>
       <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('DoAndDont')}>
  <MaterialIcons name="warning" size={24} color="#8B4513" />
  <Text style={styles.navText}>Do & Don't</Text>
</TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Comments')}>
          <MaterialIcons name="comment" size={24} color="#8B4513" />
          <Text style={styles.navText}>Comments</Text>
        </TouchableOpacity>
      </View>

      <ImageBackground
        source={require('../../assets/tab.png')} // Replace with your local background image URL
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.ayatContainer}>
              <Text style={styles.ayat}>
                كُنْتُمْ خَيْرَ أُمَّةٍ أُخْرِجَتْ لِلنَّاسِ تَأْمُرُونَ بِالْمَعْرُوفِ وَ تَنْهَوْنَ عَنِ الْمُنْكَرِ وَ تَؤْمِنُونَ بِاللَّهِ وَ لَوْ أَمَنَ أَهْلُ الْكِتَابِ لَكَانَ خَيْرًا لَّهُمْ مِنْهُمُ الْمُؤْمِنُونَ وَ أَكْثَرُهُمُ الْفَسِقُونَ (110)
                تم بہترین امت ہو جو لوگوں کے لیے نکالی گئی ہے۔ تم اچھائی کا حکم دیتے ہو، برائی سے روکتے ہو، اور اللہ پر ایمان رکھتے ہو۔ اگر اہلِ کتاب بھی ایمان لے آتے تو یہ ان کے لیے بہتر ہوتا۔ ان میں کچھ ایمان والے ہیں، لیکن زیادہ تر فاسق ہیں
              </Text>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: '#A0522D', // Light brown background color for the header
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerImage: {
    width: '100%',
    height: 215,
    borderRadius: 10,
    marginBottom: 15,
  },
  navOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  navItem: {
    alignItems: 'center',
    backgroundColor: '#F5DEB3', // Light brown background color for nav items
    padding: 10,
    borderRadius: 10,
  },
  navText: {
    marginTop: 5,
    fontSize: 14,
    color: '#8B4513', // Darker brown color for text to match the icons
    fontWeight: 'bold',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent overlay
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  ayatContainer: {
    margin: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
  },
  ayat: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
