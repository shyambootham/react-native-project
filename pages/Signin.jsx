import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import flower from './pics/flower.png';
import fb from './pics/fb.png';
import google from './pics/google.png';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Signin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const navigation = useNavigation();

  console.log(formData);
  const handleChange = (value, fieldName) => {
    setFormData({...formData, [fieldName]: value});
  };

  const goToSignIn = () => {
    navigation.navigate('signup');
  };

  const validateEmail = email => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = password => {
    // Regular expressions for password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!validateEmail(formData.email)) {
        Alert.alert('Invalid Email', 'Please enter a valid email address.');
        return;
      }

      if (!validatePassword(formData.password)) {
        Alert.alert(
          'Invalid Password',
          'Password should be minimum 6 characters with at least one uppercase letter, one digit, and one special symbol.',
        );
        return;
      }

      const response = await axios.post(
        'http://3.109.172.100/api/authentication/login/',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      // Handle successful response
      const data = response.data;
      console.log(data);

      if (data.success === false) {
        // Handle error response
        setError(data.message);
        setLoading(false);
        return;
      }

      // Further processing if needed

      // Navigate to the next screen upon successful sign-in
      await AsyncStorage.multiSet([['access_token', data.data.tokens.access]]);

      const token = await AsyncStorage.multiGet(['access_token']);
      console.log(token[0][1]);
      navigation.navigate('search');
      setLoading(false);
      setError(null);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={flower} style={styles.image} />
      </View>
      <View style={styles.pickerTop}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }>
            <Picker.Item label="Change Language" />
            <Picker.Item label="Option 1" value="option1" />
            <Picker.Item label="Option 2" value="option2" />
            <Picker.Item label="Option 3" value="option3" />
          </Picker>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={value => handleChange(value, 'email')}
          value={formData.email}
          style={styles.input}
          placeholder="Enter email "
          placeholderTextColor="gray"
        />
        <TextInput
          onChangeText={value => handleChange(value, 'password')}
          value={formData.password}
          style={styles.input}
          placeholder="Enter password"
          placeholderTextColor="gray"
          secureTextEntry
        />
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
      </View>

      <View style={styles.orContainer}>
        <Text style={styles.orText}>OR</Text>
      </View>

      <View style={styles.twoImageContainer}>
        <View style={styles.imagesContainer}>
          <Image style={styles.secondaryImage} source={fb} />
        </View>
        <View style={styles.imagesContainer}>
          <Image style={styles.secondaryImage} source={google} />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text
            style={[
              styles.buttonText,
              {fontFamily: 'Poppins', color: 'white'},
            ]}>
            Continue
          </Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text
            style={[
              styles.signupText,
              {fontFamily: 'Poppins', color: 'black'},
            ]}>
            Don't have an account?
          </Text>
          <Text
            style={[
              styles.signupText,
              styles.signupLink,
              {fontFamily: 'Poppins', color: 'black'},
            ]}
            onPress={goToSignIn}>
            Signup
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  imageContainer: {
    marginBottom: 20,
    width: 200, // Set the width of the container
    height: 200, // Set the height of the container
    borderRadius: 100, // Ensure borderRadius is half of the width/height to create a circle
    overflow: 'hidden',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  inputContainer: {
    marginBottom: 20,
    width: '80%',
    gap: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    width: '100%',
    fontFamily: 'Poppins',
    fontColor: 'black',
  },
  orContainer: {
    marginBottom: 20,
  },
  orText: {
    fontSize: 18,
    fontFamily: 'Poppins',
    color: 'black',
  },
  twoImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  imagesContainer: {
    width: 50, // Set desired width
    height: 50, // Set desired height
    marginHorizontal: 10, // Adjust spacing between images
  },
  secondaryImage: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  buttonContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A7DD6',
    width: '100%',
    paddingVertical: 10,

    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    fontFamily: 'Poppins',
    color: 'black',
  },
  signupContainer: {
    flexDirection: 'row',
  },
  signupText: {
    color: 'black',
    fontFamily: 'Poppins',
  },
  signupLink: {
    marginLeft: 5,
    textDecorationLine: 'underline',
  },
  pickerContainer: {
    height: 50,
    width: 220,
    // Set width to accommodate the longest label
  },
  pickerTop: {
    marginBottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    // Aligns items to the end of the container
  },
  errorContainer: {
    backgroundColor: '#FFCCCC', // or any other color you prefer for error background
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  errorText: {
    fontFamily: 'Poppins',
    color: 'red',
    // or any other color you prefer for error text
  },
});
