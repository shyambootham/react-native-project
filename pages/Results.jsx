import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import Resultcomp from '../components/Resultcomp';
import Search from 'react-native-vector-icons/AntDesign';
import Back from 'react-native-vector-icons/Ionicons';
export default function Results() {
  const route = useRoute();
  const {itemId = ''} = route.params || '';
  const [result, setResult] = useState([]);
  const [numColumns, setNumColumns] = useState(3);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokendata = await AsyncStorage.multiGet(['access_token']);
        const token = tokendata[0][1];
        console.log('Token:', token);

        const response = await Axios.post(
          'http://3.109.172.100/api/core/search',
          {search: itemId},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        );

        console.log('Response Data:', response.data.data);
        const items = response.data.data.items;
        setResult(items);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData(); // Call fetchData immediately inside useEffect

    // Use an empty dependency array [] to ensure this effect runs only once on mount
  }, [itemId]); // Trigger effect when itemId changes

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.nameContainer}>
          <Back size={20} name="arrow-back" />
          <Text style={styles.text}>{itemId}</Text>
        </View>
        <View>
          <Search name="search1" size={20} />
        </View>
      </View>
      <FlatList
        key={numColumns.toString()}
        data={result}
        renderItem={({item}) => <Resultcomp item={item} />}
        numColumns={numColumns}
        contentContainerStyle={{paddingHorizontal: 8, paddingTop: 8}}
        columnWrapperStyle={{justifyContent: 'space-between', marginBottom: 8}}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  nameContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontFamily: 'Poppins',
    color: 'black',
  },
  subContainer: {
    flexDirection: 'row',

    width: '90%',

    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
