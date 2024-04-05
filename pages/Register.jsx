import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import Axios from 'axios';
import {useNavigation} from '@react-navigation/native';

export default function RegisterComponent() {
  const navigation = useNavigation();

  const registerUser = async () => {
    const bodyFormData = new FormData();
    bodyFormData.append('first_name', 'Nbrsame');
    bodyFormData.append('last_name', 'Laxdxst');
    bodyFormData.append('email', 'jbjdj@gmail.com');
    bodyFormData.append('username', 'siery');
    bodyFormData.append('role', 'user');
    bodyFormData.append('phone_number', '+910655658904');
    bodyFormData.append('password', 'Sthyaam@1723');
    console.log(bodyFormData);

    try {
      const response = await Axios.post(
        'http://3.109.172.100/api/authentication/register',
        bodyFormData,
        {
          headers: {'Content-Type': 'multipart/form-data'},
        },
      );

      console.log(response.data); // Assuming server sends back some data upon successful registration
    } catch (error) {
      console.error('Error registering user:', error.message);
    }
  };

  const navigateToLogin = () => {
    navigation.navigate('validation'); // Assuming 'Login' is the name of your login screen
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={registerUser} style={styles.registerButton}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToLogin} style={styles.loginButton}>
        <Text style={styles.buttonText}>Go to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
