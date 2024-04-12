import React from 'react';
import {View} from 'react-native';
import SplashScreen from './pages/Signin';
import Signup from './pages/Signup';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Search from './pages/Search';
import Results from './pages/Results';
import Home from './pages/Home';
import Signin from './pages/Signin';

export default function App() {
  const Stack = createNativeStackNavigator(); // corrected Stack navigator creation
  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
        {/* Stack navigator for managing navigation */}
        <Stack.Navigator
          initialRouteName={'Home'} // Corrected route name
          screenOptions={{headerShown: false}} // Hide header
        >
          {/* Define screen components */}

          <Stack.Screen name="home" component={Home} />
          <Stack.Screen name="search" component={Search} />

          {<Stack.Screen name="signin" component={Signin} />}
          {<Stack.Screen name="signup" component={Signup} />}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
