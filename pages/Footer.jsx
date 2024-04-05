import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'; // Importing View, Text, and TouchableOpacity from react-native
import Icons from 'react-native-vector-icons/AntDesign';
import Icons2 from 'react-native-vector-icons/MaterialIcons';
import Icons3 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons4 from 'react-native-vector-icons/Feather';

export default function Footer() {
  const [selectedItem, setSelectedItem] = useState(null);

  const handlePress = itemName => {
    setSelectedItem(itemName);
  };

  return (
    <View style={styles.mainContainer}>
      <TouchableItem
        itemName="Home"
        iconName="home"
        iconFamily={Icons}
        onPress={handlePress}
        selectedItem={selectedItem}
      />
      <TouchableItem
        itemName="Categories"
        iconName="category"
        iconFamily={Icons2}
        onPress={handlePress}
        selectedItem={selectedItem}
      />
      <TouchableItem
        itemName="Message"
        iconName="message-text-outline"
        iconFamily={Icons3}
        onPress={handlePress}
        selectedItem={selectedItem}
      />
      <TouchableItem
        itemName="Cart"
        iconName="shoppingcart"
        iconFamily={Icons}
        onPress={handlePress}
        selectedItem={selectedItem}
      />
      <TouchableItem
        itemName="Profile"
        iconName="user"
        iconFamily={Icons4}
        onPress={handlePress}
        selectedItem={selectedItem}
      />
    </View>
  );
}

const TouchableItem = ({
  itemName,
  iconName,
  iconFamily,
  onPress,
  selectedItem,
}) => {
  const IconComponent = iconFamily;
  const isSelected = selectedItem === itemName;
  return (
    <TouchableOpacity
      onPress={() => onPress(itemName)}
      style={styles.iconContainer}>
      <IconComponent
        name={iconName}
        size={30}
        color={isSelected ? '#900' : '#000'}
      />
      <Text
        style={{fontFamily: 'Poppins', color: isSelected ? '#900' : '#000'}}>
        {itemName}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row', // Setting flexDirection to row to align items horizontally
    justifyContent: 'space-between', // Aligning items with equal space between them
    padding: 10, // Adding some padding to the main container
  },
  iconContainer: {
    alignItems: 'center', // Aligning items centered horizontally
  },
});
