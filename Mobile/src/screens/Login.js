// src/screens/Login.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, CheckBox, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Login = ({ navigation }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const loadCredentials = async () => {
      const storedLogin = await AsyncStorage.getItem('login');
      const storedPassword = await AsyncStorage.getItem('password');
      if (storedLogin && storedPassword) {
        setLogin(storedLogin);
        setPassword(storedPassword);
        setRememberMe(true);
      }
    };
    loadCredentials();
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://yourapi.com/login', { login, password });
      if (response.data.success) {
        if (rememberMe) {
          await AsyncStorage.setItem('login', login);
          await AsyncStorage.setItem('password', password);
        } else {
          await AsyncStorage.removeItem('login');
          await AsyncStorage.removeItem('password');
        }
        navigation.navigate('Home');
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Login</Text>
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
      <CheckBox
        value={rememberMe}
        onValueChange={setRememberMe}
        title="Remember Me"
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Register" onPress={() => navigation.navigate('Register')} />
    </View>
  );
};

export default Login;
