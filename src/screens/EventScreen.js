import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';

const EventScreen = () => {
  const [events, setEvents] = useState([
    {
      id: '1',
      date: '2024-11-20',
      details: 'Tableeghi Ijtima at Local Masjid',
      place: 'Masjid Al-Falah, Downtown',
    },
    {
      id: '2',
      date: '2024-12-05',
      details: 'Special Tafseer Program for Brothers',
      place: 'Masjid An-Nur, Green Street',
    },
    {
      id: '3',
      date: '2024-12-15',
      details: 'Community Gathering for Dawah',
      place: 'Masjid Al-Huda, Westside',
    },
    {
      id: '4',
      date: '2025-01-10',
      details: 'Annual Charity Fundraiser',
      place: 'Masjid Ameen, Uptown',
    },
    {
      id: '5',
      date: '2025-02-25',
      details: 'Youth Leadership Program',
      place: 'Masjid As-Salam, East End',
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newEvent, setNewEvent] = useState({
    date: '',
    details: '',
    place: '',
  });

  const authorizedUsers = [
    { email: 'sohaibameer204@gmail.com', password: 'sohaib#312' },
    { email: 'abdulfatah12@gmail.com', password: 'fatah#312' },
  ];

  const handleAddEvent = () => {
    const user = authorizedUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      Alert.alert('Access Denied', 'Invalid email or password.');
      return;
    }

    // Allow user to add event
    setEvents((prevEvents) => [
      ...prevEvents,
      { id: (prevEvents.length + 1).toString(), ...newEvent },
    ]);
    setNewEvent({ date: '', details: '', place: '' });
    setEmail('');
    setPassword('');
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Upcoming Events</Text>
        <TouchableOpacity
          onPress={() => setIsModalVisible(true)}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>+ Add Event</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.eventContainer}>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.details}>{item.details}</Text>
            <Text style={styles.place}>{item.place}</Text>
          </View>
        )}
      />

      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Authenticate</Text>
            <TextInput
              placeholder="Email"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              placeholder="Password"
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Text style={styles.modalTitle}>Add Event Details</Text>
            <TextInput
              placeholder="Date (YYYY-MM-DD)"
              style={styles.input}
              value={newEvent.date}
              onChangeText={(text) =>
                setNewEvent((prev) => ({ ...prev, date: text }))
              }
            />
            <TextInput
              placeholder="Details"
              style={styles.input}
              value={newEvent.details}
              onChangeText={(text) =>
                setNewEvent((prev) => ({ ...prev, details: text }))
              }
            />
            <TextInput
              placeholder="Place"
              style={styles.input}
              value={newEvent.place}
              onChangeText={(text) =>
                setNewEvent((prev) => ({ ...prev, place: text }))
              }
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={handleAddEvent}
                style={styles.submitButton}
              >
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                style={styles.cancelButton}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  eventContainer: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  details: {
    fontSize: 16,
    marginVertical: 5,
    color: '#555',
  },
  place: {
    fontSize: 14,
    color: '#777',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  submitButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default EventScreen;
