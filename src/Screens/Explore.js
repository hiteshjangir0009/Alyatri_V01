import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {Custom_Header} from '../Utils/Headers'
import Map from '../Utils/Map'
import { Images } from '../Utils/Constants/Images'
import { responsiveFontSize, responsiveHeight, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { Colors } from '../Utils/Constants/Colors'
import { Font_poppins } from '../Utils/Constants/fonts'
import { Explore_lang } from '../Utils/Constants/Language_content'
import { useSelector } from 'react-redux'
import FastImage from 'react-native-fast-image'
import { API_url, getApi, Img_url } from '../Utils/Constants/API_config'
import { NoData_text } from '../Utils/NoData_text'

const { width, height } = Dimensions.get('window'); // Screen dimensions

const Explore = ({ navigation }) => {
  const Navigation =navigation.navigate
  const [coordinates, setCoordinates] = useState({
    latitude: 23.4241,
    longitude: 53.8478,
  });
  const [Country, setCountry] = useState('uae');
  const [Data, setData] = useState([]);
  const [Title, setTitle] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [Marker, setMarker] = useState([]);

  const flatListRef = useRef(null); // Reference to FlatList
  const token = useSelector((state) => state.Token_Reducer)
  const lang = useSelector((state) => state.Language_Reducer)

  useEffect(() => {
    PlacesData();
  }, []);


  // Scroll to the first item in the FlatList on page load
  useEffect(() => {
    if (Data.length > 0 && flatListRef.current) {
      flatListRef.current.scrollToIndex({ animated: true, index: 0 });
      const firstPlace = Data[0];
      setCoordinates({
        latitude: firstPlace.location.latitude,
        longitude: firstPlace.location.longitude,
      });
      setTitle(firstPlace.name);
    }
  }, [Data]); // Trigger this effect whenever Data is updated


  // get places for google api
  const PlacesData = async (page = 1) => {
    // const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=Thing%20to%20do%20in%20${Country}&key=AIzaSyD6AF0zSAfgW67VykFuPPT3g4C3LjErc88`;
    const url = `${API_url.Places}?limit=10&page=${page}`;

    try {
      const response = await getApi(url, token)
      console.log("response ==>>", response);

      const data = response.data.data;
      const mappedData = data.map((e) => e.location);
      console.log("map ==>>", mappedData);

      setData(data);
      setMarker(mappedData);

    } catch (error) {
      console.log("places_error ==>>", error);

    }
    // fetch(url)
    //   .then((result) => result.json())
    //   .then((response) => {
    //     const data = response.results;
    //     const mappedData = data.map((e) => e.geometry.location);
    //     setData(data);
    //     setMarker(mappedData);

    //     console.log(data);

    //   })
    //   .catch((err) => console.log(err));
  };

  // Update selected item based on swipe
  const handleSwipeEnd = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x; // Current scroll position
    const currentIndex = Math.round(contentOffsetX / width); // Calculate index based on width
    setSelectedItem(Data[currentIndex]); // Update the state with the current item
    setCoordinates({
      latitude: Data[currentIndex].location.latitude,
      longitude: Data[currentIndex].location.longitude,
    });
    setTitle(Data[currentIndex].title[lang]);
    // console.log(Data[currentIndex]);

  };

  // Handle marker press and scroll to FlatList position
  const handleMarkerPress = (index) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ animated: true, index });
    }
    const selectedPlace = Data[index];
    setCoordinates({
      latitude: selectedPlace.location.latitude,
      longitude: selectedPlace.location.longitude,
    });
    setTitle(selectedPlace.name);
  };


  return (
    <SafeAreaView
      style={styles.safeareaview}
    >


      {/* map */}
      <View>
        <Map
          title={Title}
          coordinates={coordinates}
          Markers={Marker.map((marker, index) => ({
            ...marker,
            onPress: () => handleMarkerPress(index), // Add onPress handler for each marker
          }))}
        />
      </View>

      {/* header */}
      <View style={styles.header}>
        <Custom_Header name={Explore_lang.Explore[lang]} nav={navigation} />
      </View>

      {/* container */}
      <View style={styles.container}>
        <FlatList
          ref={flatListRef} // Attach the FlatList ref
          contentContainerStyle={styles.flatListContainer}
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          data={Data}
          renderItem={({ item }) => (
            <TouchableOpacity 
            onPress={()=>Navigation('booking',{Id:item._id,Type:'place'})}
            style={styles.swip_display}>
              <FastImage
                style={styles.container_img}
                source={{
                  // uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${item.photos[0].photo_reference}&key=AIzaSyD6AF0zSAfgW67VykFuPPT3g4C3LjErc88`,
                  uri: `${Img_url}${item.image}`,
                }}
              />
              <View style={styles.text_container}>
                <Text numberOfLines={2} style={styles.container_text_top}>
                  {item.title[lang]}
                </Text>

                {/* location address */}
                <View style={styles.address_container}>
                  <FastImage
                    style={{ width: 15, height: 15, marginTop: 5 }}
                    source={Images.Location_icon}
                  />
                  <Text numberOfLines={4} style={styles.address_text}>
                    {item.location.addressData}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          onMomentumScrollEnd={handleSwipeEnd}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeareaview: {
    flex: 1,
  },
  container: {
    // zIndex: 10,
    position: 'absolute',
    bottom: 0,
  },

  flatListContainer: {
    alignItems: 'center',
  },

  header: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0
  },
  swip_display: {
    zIndex: 1,
    width: width * 0.9,
    backgroundColor: Colors.Primary_color,
    borderTopLeftRadius: 40,
    borderBottomRightRadius: 40,
    marginBottom: responsiveScreenHeight(2),
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginHorizontal: width * 0.05,
    flexDirection: 'row'
  },
  container_img: {
    zIndex: -1,
    width: responsiveScreenWidth(35),
    height: responsiveScreenHeight(15),
    borderTopLeftRadius: 40,
    borderBottomRightRadius: 40,
    // overflow: 'visible', // Allow shadows to be visible
  },
  text_container: {
    padding: 10,
    width: responsiveScreenWidth(50),
  },
  container_text_top: {
    color: Colors.Text_base_color,
    fontFamily: Font_poppins.SemiBold_font,
    fontSize: responsiveFontSize(1.5)
  },
  address_container: {
    marginTop: 5,
    flexDirection: 'row',
    width: responsiveScreenWidth(45),
  },
  address_text: {
    color: Colors.Text_grey_color,
    fontFamily: Font_poppins.Regular_font,
    fontSize: responsiveFontSize(1.5),
    marginHorizontal: 5,
  },
  container_text_down: {},
})

export default Explore