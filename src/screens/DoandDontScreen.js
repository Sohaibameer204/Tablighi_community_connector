import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const DoAndDontScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Do & Don't Guide</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Going out in Jamaat: The 12 Usool</Text>
        <Text style={styles.paragraph}>
          1. **Be regular in the 5 Salat** with Jamaat in the masjid.{'\n'}
          2. **Make ta'aleem of Fadhail** and discuss virtues with others.{'\n'}
          3. **Remember Allah frequently (Zikr)** and avoid idle talk.{'\n'}
          4. **Increase the remembrance of Allah** and recite Quran.{'\n'}
          5. **Observe punctuality** and follow the given schedule.{'\n'}
          6. **Offer Nawaafil** (voluntary prayers) regularly.{'\n'}
          7. **Consult with the Amir** before making personal decisions.{'\n'}
          8. **Speak less and remain humble** during interactions.{'\n'}
          9. **Fulfill the rights of people** in all aspects.{'\n'}
          10. **Observe cleanliness** in personal and public areas.{'\n'}
          11. **Help others and cooperate** in all activities.{'\n'}
          12. **Make du'a for others** and ask for Allah’s blessings.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Adab of Ghasht</Text>
        <Text style={styles.bullet}>• Observe humility and respect when visiting homes.</Text>
        <Text style={styles.bullet}>• Approach each home with a heart full of goodwill and sincerity.</Text>
        <Text style={styles.bullet}>• Engage with people kindly, inviting them to the masjid without pressuring.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>5 Amal of Masjid</Text>
        <Text style={styles.bullet}>• Conduct Ta'aleem (educational sessions) after prayers.</Text>
        <Text style={styles.bullet}>• Practice Zikr (remembrance of Allah) and du’a in groups.</Text>
        <Text style={styles.bullet}>• Perform Ikraam (hospitality) for all Jamaat members.</Text>
        <Text style={styles.bullet}>• Conduct Mashwara (consultation) on daily activities.</Text>
        <Text style={styles.bullet}>• Organize collective Da’wah efforts after scheduled activities.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Items to Bring in Jamaat</Text>
        <Text style={styles.bullet}>• Personal hygiene items: toothbrush, toothpaste, soap, towel, etc.</Text>
        <Text style={styles.bullet}>• Sleeping essentials: bedding or a sleeping bag.</Text>
        <Text style={styles.bullet}>• Prayer mat and Quran for personal ibadah.</Text>
        <Text style={styles.bullet}>• Essential medications if needed.</Text>
        <Text style={styles.bullet}>• Comfortable clothing suitable for the weather.</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>The 6 Points</Text>
        <Text style={styles.bullet}>1. **Faith in Allah**: Constant belief in the oneness of Allah.</Text>
        <Text style={styles.bullet}>2. **Salat**: Perform five daily prayers regularly.</Text>
        <Text style={styles.bullet}>3. **Ilm and Zikr**: Seek knowledge and remembrance of Allah.</Text>
        <Text style={styles.bullet}>4. **Ikraam-e-Muslim**: Respect and honor all Muslims.</Text>
        <Text style={styles.bullet}>5. **Ikhlas**: Sincerity and pure intentions in actions.</Text>
        <Text style={styles.bullet}>6. **Da’wah**: Invite others towards the path of Allah.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9F9F9',
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
    marginBottom: 10,
  },
  bullet: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
    marginLeft: 15,
    marginBottom: 5,
  },
});

export default DoAndDontScreen;
