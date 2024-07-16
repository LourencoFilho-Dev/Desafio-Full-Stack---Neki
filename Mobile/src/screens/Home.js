// src/screens/Home.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Modal, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Home = ({ navigation }) => {
  const [skills, setSkills] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [level, setLevel] = useState('');

  useEffect(() => {
    const loadSkills = async () => {
      const storedSkills = JSON.parse(await AsyncStorage.getItem('skills')) || [];
      setSkills(storedSkills);
    };
    loadSkills();
  }, []);

  const handleAddSkill = async () => {
    const newSkills = [...skills, { skill: newSkill, level }];
    setSkills(newSkills);
    await AsyncStorage.setItem('skills', JSON.stringify(newSkills));
    setModalVisible(false);
  };

  const handleDeleteSkill = async (index) => {
    const newSkills = skills.filter((_, i) => i !== index);
    setSkills(newSkills);
    await AsyncStorage.setItem('skills', JSON.stringify(newSkills));
  };

  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.navigate('Login');
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Home</Text>
      <FlatList
        data={skills}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View>
            <Text>Skill: {item.skill}</Text>
            <Text>Level: {item.level}</Text>
            <Button title="Delete" onPress={() => handleDeleteSkill(index)} />
          </View>
        )}
      />
      <Button title="Add Skill" onPress={() => setModalVisible(true)} />
      <Button title="Logout" onPress={handleLogout} />
      <Modal visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View>
          <Text>Add Skill</Text>
          <TextInput
            value={newSkill}
            onChangeText={setNewSkill}
            placeholder="Skill"
          />
          <TextInput
            value={level}
            onChangeText={setLevel}
            placeholder="Level"
          />
          <Button title="Save" onPress={handleAddSkill} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

export default Home;
