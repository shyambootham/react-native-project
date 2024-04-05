import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export default function Row({item}) {
  const [isSelected, setIsSelected] = useState(false);

  const handlePress = () => {
    setIsSelected(!isSelected);
  };

  const buttonStyle = {
    backgroundColor: 'white',
    marginRight: 20,
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    backgroundColor: isSelected ? '#1a8dff' : 'white',
    // Change border color based on selection
  };

  const textStyle = {
    color: isSelected ? 'white' : 'black', // Change text color based on selection
    fontSize: 20,
  };

  return (
    <TouchableOpacity
      id={item.id}
      style={[styles.ButtonContainer, buttonStyle]}
      onPress={handlePress}>
      <Text style={[styles.ButtonText, textStyle]}>{item.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  ButtonContainer: {
    backgroundColor: 'white',
    marginRight: 20,
    borderRadius: 10,
    padding: 10,
  },
  ButtonText: {
    fontSize: 20,
  },
});
