import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Homesub from './Homesub';
import Search from './Search';
import Results from './Results'; // Assuming Results is the component for the "Category" tab

const Tab = createBottomTabNavigator();

export default function Home({navigation}) {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'search') {
            iconName = focused ? 'search' : 'search-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'results') {
            iconName = 'category';
            return <MaterialIcons name={iconName} size={size} color={color} />;
          }

          return null;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="Home"
        component={Homesub}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="search"
        component={Search}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="results"
        component={Results}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}
