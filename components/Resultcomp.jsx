import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

export default function Resultcomp({item}) {
  console.log(item);

  return (
    <View key={item.items} style={styles.container}>
      <Image
        source={{uri: `http://3.109.172.100${item.image}`}}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{item.items}</Text>

        <Text style={styles.category}>{item.category_name}</Text>

        {/* Render options and their prices */}
        {item.option.map((opt, index) => (
          <View key={index} style={styles.optionContainer}>
            <Text style={styles.optionName}>{opt.name}</Text>
            <Text style={styles.optionPrice}>${opt.price}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    height: 250,
    maxWidth: '30%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 10,
    margin: 8,
  },
  image: {
    width: '100%',
    height: '50%',
    borderRadius: 10,
  },
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    padding: 8,
  },
  title: {
    fontSize: 13,
    fontFamily: 'poppins',
    fontWeight: 'bold',
    color: 'black',
    marginTop: 17,
  },
  description: {
    fontSize: 14,
    fontFamily: 'poppins',
    color: 'gray',
  },
  category: {
    fontSize: 16,
    fontFamily: 'poppins',
    color: 'blue',
    marginBottom: 5,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  optionName: {
    fontSize: 16,
    fontFamily: 'poppins',
    color: 'black',
  },
  optionPrice: {
    fontSize: 16,
    fontFamily: 'poppins',
    color: 'green',
  },
});
