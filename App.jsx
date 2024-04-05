import React from 'react';
import {View} from 'react-native';
import SplashScreen from './pages/SplashScreen';
import Signup from './pages/Signup';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Footer from './pages/Footer';
import Register from './pages/Register';
import Validation from './pages/Validation';

export default function App() {
  const Stack = createNativeStackNavigator(); // corrected Stack navigator creation
  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
        {/* Stack navigator for managing navigation */}
        <Stack.Navigator
          initialRouteName={'splashscreen'} // Corrected route name
          screenOptions={{headerShown: false}} // Hide header
        >
          {/* Define screen components */}

          <Stack.Screen name="validation" component={Validation} />
          {/* <Stack.Screen name="splashscreen" component={SplashScreen} />
          <Stack.Screen name="signup" component={Signup} />*/}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
