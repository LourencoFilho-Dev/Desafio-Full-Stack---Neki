// src/screens/Register.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import axios from 'axios';

const Register = ({ navigation }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('https://yourapi.com/register', { login, password });
      if (response.data.success) {
        alert('Registration successful');
        navigation.navigate('Login');
      } else {
        alert('Registration failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Register</Text>
      <TextInput
        value={login}
        onChangeText={setLogin}
        placeholder="Login"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={!showPassword}
      />
      <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
        <Text>{showPassword ? 'Hide' : 'Show'} Password</Text>
      </TouchableOpacity>
      <TextInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm Password"
        secureTextEntry={!showConfirmPassword}
      />
      <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
        <Text>{showConfirmPassword ? 'Hide' : 'Show'} Confirm Password</Text>
      </TouchableOpacity>
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

export default Register;
