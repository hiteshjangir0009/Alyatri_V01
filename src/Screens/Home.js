import { Alert, Dimensions, FlatList, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Font_poppins } from '../Utils/Constants/fonts'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '../Utils/Constants/Colors'
import { Images } from '../Utils/Constants/Images'
import { responsiveFontSize, responsiveHeight, responsiveScreenHeight, responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions'
import { useSelector } from 'react-redux'
import { API_url, getApi, Img_url, Live_url, postApi } from '../Utils/Constants/API_config'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CommonActions } from '@react-navigation/native'
import { Home_lang } from '../Utils/Constants/Language_content'
import FastImage from 'react-native-fast-image'
import { Loader } from '../Utils/Loader'
import { ALERT_TYPE, AlertNotificationRoot, Toast } from 'react-native-alert-notification'
import { Sub_Category_layout } from '../Utils/SubCategory'
import { NoData_text } from '../Utils/NoData_text'
import {Custom_Header} from '../Utils/Headers'


export const month_data = [
  { id: '01', month: 'Jan' },
  { id: '02', month: 'Feb' },
  { id: '03', month: 'Mar' },
  { id: '04', month: 'April' },
  { id: '05', month: 'May' },
  { id: '06', month: 'June' },
  { id: '07', month: 'July' },
  { id: '08', month: 'Aug' },
  { id: '09', month: 'Sep' },
  { id: '10', month: 'Oct' },
  { id: '11', month: 'Nov' },
  { id: '12', month: 'Dec' },
];

const { width, height } = Dimensions.get('window'); // Screen dimensions


const Home = ({ navigation }) => {
  const Navigation = navigation.navigate
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const [Loading, setLoading] = useState(true)
  const [categorydata, setcategorydata] = useState([])
  const [Sub_category_data, setSub_category_data] = useState([])

  const [Category_id_selected, setCategory_idselected] = useState('')
  const [SubCategory_id_Selected, setSubCategory_id_Selected] = useState('')

  const [Trending, setTrending] = useState([])
  const [WhatsOn, setWhatsOn] = useState([])
  const [Experience, setExperience] = useState([])

  const [Banner, setBanner] = useState([])

  const token = useSelector((state) => state.Token_Reducer)
  const lang = useSelector((state) => state.Language_Reducer)
  const [subCategoryScrollIndex, setSubCategoryScrollIndex] = useState(0);
  const subCategoryListRef = useRef(null);
  // console.log("token ==>>", token);
  // console.log("language ==>>", lang);


  useEffect(() => {
    API_data()
  }, [])


  // offer banner slider timer
  useEffect(() => {
    // Set up the timer for auto-slide
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1 >= Banner.length ? 0 : prevIndex + 1;
        flatListRef.current?.scrollToIndex({ animated: true, index: nextIndex });
        return nextIndex;
      });
    }, 9000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Clear the interval on component unmount
  }, [Banner]);

  // api requests
  const API_data = async (page = 1) => {

    // category data
    try {
      const response = await getApi(API_url.Home, token)

      if (response.success !== true) {
        return logout()
      }

      console.log("response ==>>", response.data.businessCategories);


      const category = response.data.businessCategories
      const sub_category = response.data.categories
      const Offer_Banner = response.data.offers

      const Category_name = category.map((e) => e._id)
      const Sub_Category_name = sub_category.map((e) => e._id)

      console.log("cat ==>>", Category_name);
      console.log("Subcat ==>>", Sub_Category_name);
      console.log("Banner ==>>", Offer_Banner);

      setCategory_idselected(Category_name[0])
      setSubCategory_id_Selected(Sub_Category_name[0])

      setcategorydata(category)
      setSub_category_data(sub_category)

      setBanner(Offer_Banner)

      const firstCategory_name = Category_name[0]
      const firstSubCategory_name = Sub_Category_name[0]
      Home_filter_API({
        Categoryitem: firstCategory_name,
        SubCategoriesitem: firstSubCategory_name
      });

      // setLoading(false);

    } catch (error) {
      console.log(`error_home ==>>`, error.message);
      if (error.message == "Network request failed") {
        // setLoading(false)
        return (
          Toast.show({
            type: ALERT_TYPE.DANGER,
            title: 'No Internet',
            textBody: 'Not connected to internet, connect your device to the network ',
            autoClose: 4000


          })
        )
      }
      // logout(1)

    }

    console.log("test ==>", Banner.length);

  }

  // api filter requests
  const Home_filter_API = async ({ Categoryitem, SubCategoriesitem }) => {
    setLoading(true)

    const Category_id = Categoryitem || Category_id_selected
    const SubCategory_id = SubCategoriesitem || SubCategory_id_Selected

    console.log("category ==>>", Category_id);
    console.log("subcategory ==>>", SubCategory_id);


    try {
      const response = await getApi(`${API_url.Home_Filter}?businesscategoryId=${Category_id}&categoryId=${SubCategory_id}`, token)
      console.log("Filter respone ==>>", response.data);

      const trending = response.data.trendingNow
      const experience = response.data.experiences
      const whats = response.data.whatsOn

      setTrending(trending)
      setExperience(experience)
      setWhatsOn(whats)

      setTimeout(() => {
        setLoading(false)

      }, 600)

    } catch (error) {
      console.log(`error_home_filter ==>>`, error.message);
      // logout(1)

    }


  }


  // logout
  const logout = () => {
    console.log('logout');
    AsyncStorage.removeItem('token')
    AsyncStorage.removeItem('mobile')
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'splash' }],
      }),
    );
  }

  // date
  const date = (item) => {
    const year = item.date.slice(0, 4)
    const month = item.date.slice(5, 7)
    const date = item.date.slice(8, 11)

    const month_name = month_data.find((e) => e.id === month)

    return `${date} ${month_name.month} ${year}`
  }



  return (
    <AlertNotificationRoot>
      <SafeAreaView style={{ flex: 1 }}>

        {/* statusbar */}
        <View>
          <StatusBar
            barStyle="dark-content"
            backgroundColor={Colors.base_color}
          />
        </View>


        {/* header */}
        <View style={styles.header}>
          <Custom_Header name={'ALYATRI'} nav={navigation} Logo={true} />
        </View>

        {
          Loading == true ? (
            <View style={{
              flex: 1,
              backgroundColor: Colors.Primary_color,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Loader />
            </View>
          ) : (

            <ScrollView>

              {/* categories */}
              <View style={styles.category}>
                {categorydata.map((item) => (
                  <View key={item.id}>
                    <TouchableOpacity
                      onPress={() => {
                        setCategory_idselected(item._id)
                        Home_filter_API({
                          Categoryitem: item._id,
                          SubCategoriesitem: SubCategory_id_Selected
                        });
                        console.log("Id ==>>", item._id);

                      }}
                      style={[
                        styles.category_container,
                        {
                          borderWidth: 3,
                          borderColor: Category_id_selected === item._id ? Colors.Top_category_active_color : Colors.Primary_color,
                        },
                      ]}
                    >
                      <FastImage
                        style={[
                          styles.category_image,
                          {
                            height: responsiveScreenHeight(6.5),
                            width: responsiveScreenWidth(15),
                          },
                        ]}
                        source={{ uri: `${Img_url}${item.image}` }}
                      />
                    </TouchableOpacity>
                    <Text
                      style={[
                        styles.category_text,
                        {
                          color: Category_id_selected === item._id ? Colors.Top_category_active_color : Colors.Text_base_color,
                        },
                      ]}
                    >
                      {item.name[lang]}
                    </Text>
                  </View>
                ))}


              </View>


              {/* container */}
              <View style={styles.container}>

                {/* header subCategory */}
                <View >
                  <Sub_Category_layout
                    ref={subCategoryListRef}
                    Data={Sub_category_data} // Pass the subcategories data
                    Selected={SubCategory_id_Selected} // Pass the currently selected subcategory ID
                    onPress={(item) => { // Define the onPress method
                      setSubCategory_id_Selected(item._id); // Update selected subcategory
                      Home_filter_API({
                        Categoryitem: Category_id_selected,
                        SubCategoriesitem: item._id
                      }); // Call API_data with the selected subcategory ID
                    }}
                  />
                </View>


                {/* display Banner Offer */}
                <FlatList
                  ref={flatListRef}
                  data={Banner}
                  contentContainerStyle={styles.flatListContainer}
                  horizontal={true}
                  pagingEnabled={true}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => item._id}
                  renderItem={({ item }) => (
                    <View style={styles.display_image_container}>
                      <TouchableWithoutFeedback onPress={() => console.log("Banner clicked")}>
                        <FastImage
                          style={styles.display_image}
                          source={{ uri: `${Img_url}${item.image}` }}
                        />
                      </TouchableWithoutFeedback>
                    </View>
                  )}
                  onScrollToIndexFailed={(info) => {
                    const wait = new Promise((resolve) => setTimeout(resolve, 500));
                    wait.then(() => {
                      flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
                    });
                  }}
                />



                {/* content */}
                <View>

                  {/* trending now */}
                  <View style={styles.content_container}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        // backgroundColor:'green'
                      }}>
                      <Text style={styles.content_heading_text}>
                        {Home_lang.TrendingNow[lang]}
                      </Text>
                      <TouchableOpacity
                        onPress={() => { Navigation('viewall', { page: 'Trending now' }) }}
                        style={{ alignSelf: 'center' }}
                      >
                        <Text
                          style={styles.content_viewall_text}>
                          {Home_lang.ViewAll[lang]}
                        </Text>
                      </TouchableOpacity>
                    </View>

                    {
                      Trending.length == 0 ?
                        (
                          <NoData_text />
                        )
                        :
                        (
                          <FlatList
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            data={Trending}
                            keyExtractor={(item, index) => `${item._id}-${index}`}
                            renderItem={({ item, index }) => (
                              <TouchableOpacity
                                key={index}
                                onPress={() => { Navigation('blog',{Id:item._id}) }}
                                style={styles.content_display}>
                                <FastImage
                                  style={styles.content_display_image}
                                  source={{ uri: `${Img_url}${item.image}` }} />

                                <View style={{

                                }}>
                                  <Text style={styles.content_display_text_up}>
                                    {item.title[lang]}
                                  </Text>

                                  <Text
                                    numberOfLines={2}
                                    style={styles.content_display_text_down}>
                                    loremdf sfd frfrc dsdsdsdsdsd sdsdsdsdsdsdsdrtrtr tr tr trt rt r tr trsssdsdsd
                                  </Text>
                                </View>

                              </TouchableOpacity>
                            )}

                          />
                        )
                    }
                  </View>


                  {/* experience now */}
                  <View style={styles.content_container}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                      }}>
                      <Text style={styles.content_heading_text}>
                        {Home_lang.Experience[lang]}
                      </Text>
                      <TouchableOpacity
                        onPress={() => { Navigation('viewall', { page: 'Experience' }) }}
                        style={{ alignSelf: 'center' }}
                      >
                        <Text
                          style={styles.content_viewall_text}>
                          {Home_lang.ViewAll[lang]}
                        </Text>
                      </TouchableOpacity>
                    </View>

                    {
                      Experience.length == 0 ?
                        (
                          <View>
                            <NoData_text />

                          </View>
                        )
                        :
                        (
                          <FlatList
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            data={Experience}
                            keyExtractor={(item, index) => `${item._id}-${index}`}
                            renderItem={({ item, index }) => (
                              <TouchableOpacity
                                key={index}
                                onPress={() => Navigation('booking')}
                                style={styles.content_display}>
                                <FastImage
                                  style={styles.content_display_image}
                                  source={{ uri: `${Img_url}${item.image}` }} />

                                <View style={{

                                }}>
                                  <Text style={styles.content_display_text_up}>
                                    {item.title[lang]}
                                  </Text>

                                  <Text style={styles.experience_display_text_middle}>
                                    DSDSDSDSDSD
                                  </Text>

                                  <Text
                                    numberOfLines={2}
                                    style={styles.content_display_text_down}>
                                    {item.location.address}
                                  </Text>
                                </View>

                              </TouchableOpacity>
                            )}

                          />
                        )
                    }

                  </View>


                  {/* whats on */}
                  <View style={styles.content_container}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                      }}>
                      <Text style={styles.content_heading_text}>
                        {Home_lang.WhatsOn[lang]}
                      </Text>
                      <TouchableOpacity
                        style={{ alignSelf: 'center' }}
                      >
                        <Text
                          onPress={() => { Navigation('viewall', { page: `What's on` }) }}

                          style={styles.content_viewall_text}>
                          {Home_lang.ViewAll[lang]}
                        </Text>
                      </TouchableOpacity>
                    </View>

                    {
                      WhatsOn.length == 0 ?
                        (
                          <NoData_text />
                        )
                        :
                        (
                          <FlatList
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            data={WhatsOn}
                            keyExtractor={(item, index) => `${item._id}-${index}`}
                            renderItem={({ item, index }) => (
                              <TouchableOpacity
                                key={index}
                                onPress={() => { Navigation('booking') }}
                                style={styles.content_display}>
                                <FastImage
                                  style={styles.content_display_image}
                                  source={{ uri: `${Img_url}${item.image}` }} />

                                <View style={{

                                }}>

                                  <View style={styles.whats_text_view}>
                                    <FastImage
                                      style={{
                                        height: 20,
                                        width: 20,
                                        alignSelf: 'center'
                                      }}
                                      source={Images.Location_icon}
                                    />
                                    <Text numberOfLines={1} style={[styles.content_display_text_up, { marginHorizontal: 10, fontSize: responsiveFontSize(1.9) }]}>
                                      {item.title[lang]}
                                    </Text>
                                  </View>

                                  <View style={styles.whats_text_view}>
                                    <FastImage
                                      style={{
                                        height: 18,
                                        width: 18,
                                        alignSelf: 'center'
                                      }}
                                      source={Images.Calender_icon}
                                    />
                                    <Text style={[styles.experience_display_text_middle, { marginHorizontal: 10, fontSize: responsiveFontSize(1.5) }]}>
                                      {date(item)}
                                    </Text>
                                  </View>

                                  <Text
                                    numberOfLines={2}
                                    style={[styles.content_display_text_down, { marginTop: 10 }]}>
                                    {item.location.address}
                                  </Text>
                                </View>

                              </TouchableOpacity>
                            )}

                          />
                        )
                    }

                  </View>



                </View>

              </View>

            </ScrollView>
          )
        }




      </SafeAreaView>
    </AlertNotificationRoot>
  )
}

export const styles = StyleSheet.create({
  safeAreaView: {},


  header: {
    position: 'absolute',
    zIndex: 1,

    left: 0,
    right: 0,
  },


  category: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: responsiveScreenHeight(10)

  },
  category_container: {
    borderRadius: 40,
    backgroundColor: Colors.Primary_color,
    elevation: 5,
    shadowColor: '#000',

  },
  category_image: {
    height: 75,
    width: 75,
    borderRadius: 40,
  },
  category_text: {
    textAlign: 'center',
    fontFamily: Font_poppins.Regular_font,
    fontSize: responsiveFontSize(1.7),
    marginTop: 10,

  },


  container: {
    // flexGrow: 3,
    backgroundColor: Colors.Primary_color,
    marginTop: 15
  },


  flatListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  display_image_container: {
    // zIndex:1,
    // position:'absolute',
    width: Dimensions.get('window').width, // Match screen width
    justifyContent: 'center',
    alignItems: 'center', // Center horizontally and vertically
  },

  display_image: {
    height: responsiveHeight(40),
    width: responsiveWidth(95), // Adjust width as needed
    borderRadius: 40,
  },


  content_container: {
    marginHorizontal: 10,
    marginVertical: responsiveScreenHeight(3),


  },
  content_heading_text: {
    color: Colors.Text_base_color,
    fontFamily: Font_poppins.SemiBold_font,
    fontSize: responsiveFontSize(2.5),
  },
  content_viewall_text: {
    color: Colors.Text_base_color,
    fontFamily: Font_poppins.SemiBold_font,
    fontSize: responsiveFontSize(1.5),
  },
  content_display: {
    marginRight: 30,
  },
  content_display_image: {
    height: 150,
    width: 240,
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 30
  },
  content_display_text_up: {
    fontSize: responsiveFontSize(1.5),
    fontFamily: Font_poppins.Regular_font,
    color: Colors.Text_pink_color,
    width: responsiveScreenWidth(40)
    // alignSelf: 'center',
    // alignSelf: 'center',

  },
  content_display_text_down: {
    fontSize: responsiveFontSize(1.3),
    width: responsiveScreenWidth(55),
    fontFamily: Font_poppins.Regular_font,

  },


  experience_display_text_middle: {
    color: Colors.Text_base_color,
    fontFamily: Font_poppins.SemiBold_font,
    fontSize: responsiveFontSize(1.8),
    // alignSelf: 'center',
    verticalAlign: 'middle',
    width: responsiveScreenWidth(40)

  },


  whats_text_view: {
    flexDirection: 'row',
    // backgroundColor:'yellow'
    marginTop: 5
  },
})


export default Home
