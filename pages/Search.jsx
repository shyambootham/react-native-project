import React, {useState} from 'react';
import Back from 'react-native-vector-icons/Ionicons';
import {
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PopularItems from '../components/PopularItems';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';

export default function Search({navigation}) {
  const [numColumns, setNumColumns] = useState(3);
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState('');

  const handleChange = async value => {
    setSearch(value);
    const tokendata = await AsyncStorage.multiGet(['access_token']);
    const token = tokendata[0][1];

    try {
      const response = await Axios.post(
        'http://3.109.172.100/api/core/search',
        {search: value},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const items = response.data.data.items;

      console.log(items);
      // Extract items array from the API response
      setResults(items);
      // Log response data for debugging

      // Assuming `items` is the key containing search results
    } catch (error) {
      console.log('Error:', 'error'); // Log specific error response
    }
  };

  const popularData = [
    {
      id: '01',

      image: require('./pics/flower05.png'),
      name: 'Bouquet “Pinkt”',
      price: '3.99',
      status: require('./pics/star.jpg'),
      description:
        'Discover the vibrant allure of our dahlia blossoms. Elevate your surroundings with the vibrant hues of dahlias.',
    },
    {
      id: '01',

      image: require('./pics/flower05.png'),
      status: require('./pics/star.jpg'),
      name: 'Bouquet “Pinkt”',
      price: '3.99',
      description:
        'Discover the vibrant allure of our dahlia blossoms. Elevate your surroundings with the vibrant hues of dahlias.',
    },
    {
      id: '01',

      image: require('./pics/flower05.png'),
      status: require('./pics/star.jpg'),
      name: 'Bouquet “Pinkt”',
      price: '3.99',
      description:
        'Discover the vibrant allure of our dahlia blossoms. Elevate your surroundings with the vibrant hues of dahlias.',
    },
    {
      id: '01',

      image: require('./pics/flower05.png'),
      status: require('./pics/star.jpg'),
      name: 'Bouquet “Pinkt”',
      price: '3.99',
      description:
        'Discover the vibrant allure of our dahlia blossoms. Elevate your surroundings with the vibrant hues of dahlias.',
    },
  ];

  return (
    <View style={{flex: 1, paddingLeft: 5}}>
      <StatusBar />
      <SafeAreaView>
        <ScrollView style={styles.scrollView}>
          <View style={styles.heading}>
            <Back color="black" name="arrow-back" size={20} />
            <Text style={styles.headingStyle}>Back</Text>
          </View>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.input}
              placeholder="search"
              onChangeText={value => handleChange(value)}
            />
          </View>
          {results.length > 0 && ( // Check if results array is not empty
            <View style={styles.suggestion}>
              {results.map((item, index) => (
                <View key={item.items} style={styles.result}>
                  <Image
                    source={{uri: `http://3.109.172.100${item.image}`}}
                    style={styles.image}
                  />
                  <Text
                    onPress={() =>
                      navigation.navigate('results', {itemId: item.items})
                    }
                    key={item.items}>
                    {item.items}
                  </Text>
                </View>
              ))}
            </View>
          )}
          <View style={styles.popularContainer}>
            <Text style={styles.popularText}>Popular Items</Text>
          </View>
          <FlatList
            key={numColumns} // Use numColumns as the key to force a re-render when it changes
            data={popularData}
            renderItem={({item}) => <PopularItems item={item} />}
            numColumns={numColumns}
            contentContainerStyle={{paddingHorizontal: 8, paddingTop: 8}}
            columnWrapperStyle={{
              justifyContent: 'space-between',
              marginBottom: 8,
            }}
            keyExtractor={(item, index) => index.toString()} // Specify a unique keyExtractor
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10,
    alignItems: 'center',
  },
  headingStyle: {
    fontSize: 20,
    color: 'black',
  },
  searchContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    width: '70%',
    borderRadius: 10,
    height: 40,
    marginBottom: 10,
    marginTop: 20,
    marginLeft: 10,
    borderWidth: 1,
  },
  result: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  image: {
    width: 20,
    height: 20,
  },
  suggestion: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 10,
    marginLeft: 10,
  },
  popularContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingHorizontal: 8,
  },
  popularText: {
    fontSize: 20,
    color: 'black',
  },
});
