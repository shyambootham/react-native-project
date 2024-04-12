import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
  StatusBar,
  ScrollView,
  StyleSheet,
  FlatList,
  Animated,
} from 'react-native';
import Location from 'react-native-vector-icons/Octicons';
import Down from 'react-native-vector-icons/Entypo';
import Bell from 'react-native-vector-icons/FontAwesome';

import {SafeAreaView} from 'react-native-safe-area-context';
import Love from 'react-native-vector-icons/Entypo';
import Search from 'react-native-vector-icons/AntDesign';
import Voice from 'react-native-vector-icons/MaterialIcons';
import Line from 'react-native-vector-icons/FontAwesome6';

import Slide from '../components/Slide';
import Dot from '../components/Dot';
import Row from '../components/Row';
import Items from '../components/Items';
import Footer from './Footer';
export default function ({navigation}) {
  const flowerList = [
    {
      id: '01',
      image: require('./pics/flower01.jpg'),
      status: require('./pics/star.jpg'),
      name: 'Bouquet “Pinkt”',
      price: '3.99',
      description:
        'Discover the vibrant allure of our dahlia blossoms. Elevate your surroundings with the vibrant hues of dahlias.',
    },
    {
      id: '02',
      image: require('./pics/flower02.jpg'),
      status: require('./pics/star.jpg'),
      name: 'Bouquet "White" ',
      price: '7.98',
      description:
        'Immerse yourself in the enchanting aroma of our jasmine blooms. Delicate and fragrant, these flowers add a touch of elegance to any occasion.',
    },
    {
      id: '03',
      image: require('./pics/flower03.jpg'),
      status: require('./pics/star.jpg'),
      name: 'Rose Bouquet',
      price: '4.00',
      description:
        'Indulge in the timeless beauty of our rose collection. Each petal tells a story of romance and sophistication. ',
    },
    {
      id: '04',
      image: require('./pics/flower04.jpg'),
      status: require('./pics/star.jpg'),
      name: 'Sun Flower',
      price: '3.80',
      description:
        'Bask in the warmth of our sunflower blooms. Radiant and cheerful, these flowers bring the spirit of sunshine to any space.',
    },
    {
      id: '05',
      image: require('./pics/flower05.png'),
      status: require('./pics/star.jpg'),
      name: 'Sun Flower',
      price: '3.80',
      description:
        'Bask in the warmth of our sunflower blooms. Radiant and cheerful, these flowers bring the spirit of sunshine to any space.',
    },
  ];
  const scrollList = [
    {
      id: '01',

      image: require('./pics/flower05.png'),
      name: 'Bouquet “Pinkt”',
      price: '3.99',
      description:
        'Discover the vibrant allure of our dahlia blossoms. Elevate your surroundings with the vibrant hues of dahlias.',
    },
    {
      id: '02',
      image: require('./pics/flower05.png'),
      name: 'Bouquet "White" ',
      price: '7.98',
      description:
        'Immerse yourself in the enchanting aroma of our jasmine blooms. Delicate and fragrant, these flowers add a touch of elegance to any occasion.',
    },
    {
      id: '03',
      image: require('./pics/flower05.png'),
      name: 'Rose Bouquet',
      price: '4.00',
      description:
        'Indulge in the timeless beauty of our rose collection. Each petal tells a story of romance and sophistication. ',
    },
    {
      id: '04',
      image: require('./pics/flower05.png'),
      name: 'Sun Flower',
      price: '3.80',
      description:
        'Bask in the warmth of our sunflower blooms. Radiant and cheerful, these flowers bring the spirit of sunshine to any space.',
    },
    {
      id: '05',
      image: require('./pics/flower05.png'),
      name: 'Sun Flower',
      price: '3.80',
      description:
        'Bask in the warmth of our sunflower blooms. Radiant and cheerful, these flowers bring the spirit of sunshine to any space.',
    },
  ];
  const scrollx = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const viewableItemsChanged = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;
  const slideRef = useRef(null);
  const [ForwardDirection, setForwardDirection] = useState(null);
  const flatListData = [
    {
      id: '01',
      title: 'All',
    },
    {
      id: '02',
      title: 'Marriage',
    },
    {
      id: '03',
      title: 'flower',
    },
    {
      id: '04',
      title: 'Indoor',
    },
  ];
  useEffect(() => {
    const timer = setInterval(() => {
      // Determine next index
      let nextIndex;
      if (ForwardDirection) {
        nextIndex = currentIndex + 1;
        if (nextIndex >= flowerList.length) {
          nextIndex = flowerList.length - 2;
          setForwardDirection(false);
        }
      } else {
        nextIndex = currentIndex - 1;
        if (nextIndex < 0) {
          nextIndex = 1;
          setForwardDirection(true);
        }
      }

      setCurrentIndex(nextIndex);

      // Scroll to the next index
      if (slideRef.current) {
        slideRef.current.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
      }
    }, 2000);

    return () => clearInterval(timer);
  }, [currentIndex, flowerList.length, ForwardDirection]);

  return (
    <View style={{flex: 1}}>
      <StatusBar />
      <SafeAreaView>
        <ScrollView style={styles.scrollView}>
          <View style={styles.mainContainer}>
            <View style={styles.topContainer}>
              <View style={styles.introContainer}>
                <View style={styles.location}>
                  <Location color="blue" name="location" size={20} />
                  <View style={styles.down}>
                    <Text style={styles.Text}>O'fallon,63368</Text>
                    <Down name="chevron-down" color="blue" size={20} />
                  </View>
                </View>
                <View style={styles.location}>
                  <Bell name="bell" color="blue" size={20} />
                  <Love name="heart" color="blue" size={20} />
                </View>
              </View>
              <View style={styles.searchContainer}>
                <View style={styles.search}>
                  <View style={styles.search1}>
                    <Search name="search1" size={20} color="blue" />
                    <TextInput
                      style={styles.input}
                      placeholder="Type here..."
                      placeholderTextColor="gray"
                      onPressIn={() => {
                        navigation.navigate('search');
                      }}
                    />
                  </View>
                  <Voice name="keyboard-voice" size={30} />
                </View>
                <View style={styles.line}>
                  <Line name="grip-lines" size={20} />
                </View>
              </View>
              <View style={styles.offer}>
                <Text style={styles.text}>Special Offer</Text>
              </View>
            </View>

            <FlatList
              data={scrollList}
              renderItem={({item}) => <Slide item={item} />}
              horizontal
              showsHorizontalScrollIndicator
              pagingEnabled
              bounces={false}
              keyExtractor={item => item.id}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {x: scrollx}}}],
                {
                  useNativeDriver: false,
                },
              )}
              scrollEventThrottle={32}
              viewabilityConfig={viewConfig}
              ref={slideRef}
              onViewableItemsChanged={viewableItemsChanged}
            />
            <View style={styles.dotContainer}>
              <Dot data={flowerList} scrollx={scrollx} />
            </View>
            <View style={styles.middileContainer}>
              <View style={styles.ContainerText}>
                <Text style={styles.content}>Reccomended For You</Text>

                <FlatList
                  data={flatListData}
                  renderItem={({item}) => <Row item={item} />}
                  horizontal
                  showsHorizontalScrollIndicator
                  pagingEnabled
                  keyExtractor={item => item.id}
                />
              </View>
              <FlatList
                data={flowerList}
                renderItem={({item}) => <Items item={item} />}
                numColumns={2}
                contentContainerStyle={{gap: 8, padding: 8}}
                columnWrapperStyle={{gap: 10}}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
  topContainer: {
    paddingHorizontal: 15,
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 10,
  },

  mainContainer: {
    flex: 1,

    gap: 6,
  },
  Text: {
    fontFamily: 'poppins',
    color: 'black',
  },
  scrollViewContent: {
    flexGrow: 1, // This ensures that the content expands to fill the container
    paddingVertical: 20, // Add padding as needed
  },
  introContainer: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'center',
  },
  location: {
    flexDirection: 'row',
    gap: 4,

    alignItems: 'center',
  },
  down: {
    flexDirection: 'row',
  },
  searchContainer: {
    marginTop: 10,

    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
  },
  search: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'grey',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
  },
  search1: {
    flexDirection: 'row',

    alignItems: 'center',
    width: '70%',
  },
  input: {
    borderColor: 'gray',
    borderRadius: 5,
    flex: 1,
    height: 35,
    fontFamily: 'poppins',
    color: 'black',
  },
  line: {
    justifyContent: 'center',
    alignItems: 'center',

    width: '20%',
  },
  offer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  text: {
    fontSize: 40,
    fontFamily: 'Poppins',
    color: 'black',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  ContainerText: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 10,
  },
  content: {
    fontSize: 30,
    fontFamily: 'poppins',
    color: 'black',
  },
  middileContainer: {
    padding: 15,
  },
  flatList1: {
    padding: 15,
  },
});
