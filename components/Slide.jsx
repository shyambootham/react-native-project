import React from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import Arrow from 'react-native-vector-icons/AntDesign';

export default function Slide({item}) {
  const {width} = useWindowDimensions();

  return (
    <View style={[styles.container, {width}]}>
      <View style={styles.textContainer}>
        <Text>Todays Deal</Text>

        <Text style={styles.title}>50% off</Text>
        <View style={styles.ButtonContainer}>
          <View style={styles.overlay}></View>
          <Text style={styles.buttonText}>Buy it now</Text>
          <Arrow name="arrowright" color="white" size={20} />
        </View>
      </View>
      <Image
        source={item.image}
        style={styles.image}
        resizeMode="contain" // Adjust image content mode
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // To maintain aspect ratio
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 200,
    borderRadius: 30,

    backgroundColor: '#D5E3FC', // Fixed height
  },

  image: {
    width: '50%',
    aspectRatio: 1, // Maintain aspect ratio
    transform: [{rotate: '-20deg'}], // Rotate image to the left
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 3,

    width: '30%',
    overflow: 'hidden',
    height: 150,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  ButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    borderBottomRightRadius: 22,
    // Ensure contents outside the bounds are hidden
    position: 'relative',

    backgroundColor: 'black',
    height: 43,
    padding: 4,
  },
  overlay: {
    position: 'absolute',
    bottom: 2,
    right: 0,
    width: 18,
    height: 31,
    backgroundColor: 'black',
    transform: [{rotate: '45deg'}],
  },
});
