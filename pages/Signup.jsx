import React, {useState} from 'react';
import Icons from 'react-native-vector-icons/FontAwesome';
import Phoneicon from 'react-native-vector-icons/Feather';
import Mailicon from 'react-native-vector-icons/Entypo';
import Lockicon from 'react-native-vector-icons/Fontisto';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function Signup() {
  const navigation = useNavigation();
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    phone_number: '',
    role: 'user',
    password: '',
    confirm_password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (value, fieldName) => {
    setError(null);
    setFormData({...formData, [fieldName]: value});
  };

  const navigateToLogin = () => {
    navigation.navigate('splashscreen'); // Assuming the screen is named 'Login'
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError('Invalid email format');
        return;
      }

      // Validate password format: minimum 6 characters with at least one uppercase letter, one digit, and one special symbol
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
      if (!passwordRegex.test(formData.password)) {
        setError(
          'Password should be minimum 6 characters with at least one uppercase letter, one digit, and one special symbol.',
        );
        return;
      }

      // Validate username format: no numbers allowed
      const usernameRegex = /^[a-zA-Z\s]*$/;
      if (!usernameRegex.test(formData.username)) {
        setError('Username should not contain any numbers.');
        return;
      }

      // Confirm password match
      if (formData.password !== formData.confirm_password) {
        setError('Passwords do not match');
        return;
      }

      // If all validations pass, proceed with registration
      const bodyFormData = new FormData();
      bodyFormData.append('first_name', formData.first_name);
      bodyFormData.append('last_name', formData.last_name);
      bodyFormData.append('email', formData.email);
      bodyFormData.append('username', formData.username);
      bodyFormData.append('role', formData.role);
      bodyFormData.append('phone_number', formData.phone_number);
      bodyFormData.append('password', formData.password);

      const response = await axios.post(
        'http://3.109.172.100/api/authentication/register',
        bodyFormData,
        {
          headers: {'Content-Type': 'multipart/form-data'},
        },
      );

      console.log(response.data); // Assuming server sends back some data upon successful registration
      setSuccess('user registered succesfully');
      setTimeout(() => {
        navigation.navigate('splashscreen');
      }, 3000);

      setLoading(false);
      setError(null);
    } catch (error) {
      console.error('Error registering user:', error);
      setError('use different email,user,password');
      setLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.scrollView}>
        <View style={styles.mainContainer}>
          <View style={styles.signUpTextContainer}>
            <Text style={styles.header}>Sign Up!</Text>
            <Text>Create account by filling the form below</Text>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.inputRow}>
              <View style={styles.inputWrapperName}>
                <Icons style={styles.icon} name="user-circle" size={16} />
                <TextInput
                  onChangeText={value => handleChange(value, 'first_name')}
                  style={styles.input}
                  placeholder="First Name"
                  placeholderTextColor="gray"
                />
              </View>
              <View style={styles.inputWrapperName}>
                <TextInput
                  onChangeText={value => handleChange(value, 'last_name')}
                  style={styles.input}
                  placeholder="Last Name"
                  placeholderTextColor="gray"
                />
              </View>
            </View>
            <View style={styles.inputWrapper}>
              <Phoneicon style={styles.icon} name="phone" size={16} />
              <TextInput
                onChangeText={value => handleChange(value, 'phone_number')}
                style={styles.input}
                placeholder="Phone Number"
                placeholderTextColor="gray"
              />
            </View>
            <View style={styles.inputWrapper}>
              <Mailicon style={styles.icon} name="mail" size={16} />
              <TextInput
                onChangeText={value => handleChange(value, 'email')}
                style={styles.input}
                placeholder="E-mail"
                placeholderTextColor="gray"
              />
            </View>

            <View style={styles.inputWrapper}>
              <Lockicon style={styles.icon} name="locked" size={16} />
              <TextInput
                onChangeText={value => handleChange(value, 'password')}
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                placeholderTextColor="gray"
              />
            </View>

            <View style={styles.inputWrapper}>
              <Lockicon style={styles.icon} name="locked" size={16} />
              <TextInput
                onChangeText={value => handleChange(value, 'confirm_password')}
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry={true}
                placeholderTextColor="gray"
              />
            </View>
            <View style={styles.inputWrapper}>
              <Icons style={styles.icon} name="user-circle" size={16} />
              <TextInput
                onChangeText={value => handleChange(value, 'username')}
                style={styles.input}
                placeholder="username"
                placeholderTextColor="gray"
              />
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
            {success && <Text style={styles.successText}>{success}</Text>}
          </View>
          <View style={styles.checkBoxContainer}>
            <CheckBox value={isChecked} onValueChange={setIsChecked} />
            <Text style={styles.checkBoxText}>
              By checking the box you agree to our{' '}
              <Text style={styles.link}>Terms</Text> and{' '}
              <Text style={styles.link}>Conditions</Text>
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
            <Text style={styles.loginText}>
              Already have an account?{' '}
              <Text style={styles.link} onPress={navigateToLogin}>
                Login
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 50,

    paddingHorizontal: 20,
  },
  signUpTextContainer: {
    marginBottom: 20,

    width: '100%',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Poppins',
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginBottom: 20,
    gap: 20,
  },
  inputRow: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputWrapperName: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '49%',
    borderColor: '#0A7DD6',
    borderWidth: 1,
    borderRadius: 5,
  },
  inputWrapper: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#0A7DD6',
    borderWidth: 1,
    borderRadius: 5,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
    fontFamily: 'Poppins',
    color: 'black',
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkBoxText: {
    flex: 1,
    fontFamily: 'Poppins',
    color: 'black',
  },
  icon: {
    color: 'blue',
    paddingLeft: 3,
    height: 15,
  },
  link: {
    color: '#0A7DD6',
    textDecorationLine: 'underline',
    fontFamily: 'Poppins',
    color: 'black',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    width: '100%',
    backgroundColor: '#0A7DD6',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'center',
    textAlign: 'center', // Center align the text
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Poppins',
    color: 'white',
  },
  loginText: {
    fontSize: 14,
    fontFamily: 'Poppins',
    color: 'black',
  },
  errorText: {
    color: 'red',
    fontFamily: 'Poppins',
  },
  scrollViewContent: {
    flexGrow: 1, // This ensures that the content expands to fill the container
    paddingVertical: 20, // Add padding as needed
  },
  successText: {
    color: 'green',
    fontFamily: 'Poppins',
  },
});
