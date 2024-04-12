import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

export default function PopularItems({item}) {
  return (
    <View key={item.name} style={styles.container}>
      <Image
        source={item.image}
        style={styles.image}
        resizeMode="cover" // Adjust image content mode
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Image
          source={item.status}
          style={styles.starImage}
          resizeMode="contain" // Adjust image content mode
        />

        <Text style={styles.price}>${item.price}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    height: 200,
    maxWidth: '30%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '50%',
    borderRadius: 10,
  },
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,

    fontFamily: 'poppins',
    color: 'black',
  },
  starImage: {
    width: 90,
    height: 23,
    marginTop: 5,
  },
  price: {
    fontSize: 16,
    color: 'green',
    marginTop: 5,
    fontFamily: 'poppins',
  },
});
