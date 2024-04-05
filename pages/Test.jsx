import React from 'react';
import {StyleSheet, View, useWindowDimensions} from 'react-native';

export default function Test() {
  const {width} = useWindowDimensions();
  const flowerList = [
    {
      id: '01',
      image: require('./pics/flower01.jpg'),
      name: 'Bouquet “Pinkt”',
      price: '3.99',
      description:
        'Discover the vibrant allure of our dahlia blossoms. Elevate your surroundings with the vibrant hues of dahlias.',
    },
    {
      id: '02',
      image: require('./pics/flower02.jpg'),
      name: 'Bouquet "White" ',
      price: '7.98',
      description:
        'Immerse yourself in the enchanting aroma of our jasmine blooms. Delicate and fragrant, these flowers add a touch of elegance to any occasion.',
    },
    {
      id: '03',
      image: require('./pics/flower03.jpg'),
      name: 'Rose Bouquet',
      price: '4.00',
      description:
        'Indulge in the timeless beauty of our rose collection. Each petal tells a story of romance and sophistication. ',
    },
    {
      id: '04',
      image: require('./pics/flower04.jpg'),
      name: 'Sun Flower',
      price: '3.80',
      description:
        'Bask in the warmth of our sunflower blooms. Radiant and cheerful, these flowers bring the spirit of sunshine to any space.',
    },
    {
      id: '05',
      image: require('./pics/flower05.jpg'),
      name: 'Sun Flower',
      price: '3.80',
      description:
        'Bask in the warmth of our sunflower blooms. Radiant and cheerful, these flowers bring the spirit of sunshine to any space.',
    },
  ];

  return (
    <View style={[StyleSheet.container, {width}]}>
      <Image
        source={flowerList[0].image}
        style={[styles.image, {width, resizeMode: 'contain '}]}
      />
      <View style={{flex: 0.3}}>
        <Text style={styles.title}>{flowerList[0].name}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
}
styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 0.7,
    justifyContent: 'center',
  },
  title: {
    fontWeight: '800',
    fontSize: 28,
    color: '#493d8a',
    textAlign: 'center',
  },
  description: {
    fontWeight: '300',
    color: '#62656b',
    textAlign: 'center',
    paddingHorizontal: 64,
  },
});
