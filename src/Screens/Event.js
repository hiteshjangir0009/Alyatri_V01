import { Dimensions, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { useRoute } from '@react-navigation/native'
import {Custom_Header} from '../Utils/Headers'
import { Colors } from '../Utils/Constants/Colors'
import { Images } from '../Utils/Constants/Images'
import { Font_poppins } from '../Utils/Constants/fonts'
import { Event_lang, Home_lang } from '../Utils/Constants/Language_content'
import { useSelector } from 'react-redux'
import FastImage from 'react-native-fast-image'
import { API_url, getApi, Img_url } from '../Utils/Constants/API_config'
import { month_data } from './Home'
import { Loader } from '../Utils/Loader'
import { Sub_Category_layout } from '../Utils/SubCategory'


const Event = ({ navigation }) => {
  const Navigation = navigation.navigate

  const [sub_categories, setSub_categories] = useState([])
  const [sub_categories_id_selected, setSub_categories_id_selected] = useState('')
  const [Loading, setLoading] = useState(true)
  const [Data, setData] = useState([])
  const [subCategoryScrollIndex, setSubCategoryScrollIndex] = useState(0);

  const subCategoryListRef = useRef(null);

  const lang = useSelector((state) => state.Language_Reducer)
  const token = useSelector((state) => state.Token_Reducer)

  useEffect(() => {
    Sub_category_API()
  }, [])


  // sub category
  const Sub_category_API = async () => {


    const SubCategory_url = `${API_url.SubCategory}?limit=10&page=1&type=event`

    try {
      const SubCategory = await getApi(SubCategory_url, token)

      const SubCategories = SubCategory.data.data
      const first_SubCategories = SubCategory.data.data[0]._id

      console.log("API SubCategory ==>>", SubCategories);
      console.log("API first SubCategory ==>>", first_SubCategories);
      console.log("API first SubCategory ==>>", SubCategory.data.data[0]);

      setSub_categories(SubCategories)
      setSub_categories_id_selected(SubCategories[0]._id)

      API_data(first_SubCategories)

    } catch (error) {
      console.log("event_error ==>>", error);

    }
  }

  // api data
  const API_data = async (SubCategoriesitem) => {
    setLoading(true)
    const page = 1
    const SubCategory_id = SubCategoriesitem || sub_categories_id_selected;

    console.log('subcat API==>>', SubCategory_id);

    const url = `${API_url.Events}?limit=10&page=${page}&categoryId=${SubCategory_id}`

    try {
      const response = await getApi(url, token)

      const data = response.data.data
      console.log("API response ==>>", response.data.data);

      setData(data)

      setTimeout(() => {
        setLoading(false)
      }, 600)

    } catch (error) {
      console.log("event_error ==>>", error);

    }
  }


  // date
  const date = (item) => {
    const year = item.date.slice(0, 4)
    const month = item.date.slice(5, 7)
    const date = item.date.slice(8, 11)

    const month_name = month_data.find((e) => e.id === month)

    return `${date} ${month_name.month}  ${year}`
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.Primary_color }}>

      {/* header */}
      <View>
        <Custom_Header name={Event_lang.Events[lang]} nav={navigation} />
      </View>


      {Loading ?
        (
          <View style={{
            flex: 1,
            backgroundColor: Colors.Primary_color,
            justifyContent: 'center',
            alignItems: 'center',
            // alignSelf:'center'
          }}>
            <Loader />
          </View>
        )
        :
        (
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* // container  */}
            <View style={styles.container}>

              {/* sub categories navbar */}
              <View >
                <Sub_Category_layout
                ref={subCategoryListRef}
                  Data={sub_categories} // Pass the subcategories data
                  Selected={sub_categories_id_selected} // Pass the currently selected subcategory ID
                  onPress={(item) => { // Define the onPress method
                    setSub_categories_id_selected(item._id); // Update selected subcategory
                    setData([]); // Clear previous data
                    API_data(item._id); // Call API_data with the selected subcategory ID
                  }}
                />
              </View>


              {/* content */}
              <View style={styles.content_container}>
                <FlatList
                  scrollEnabled={false}
                  data={Data}
                  renderItem={({ item }) => (
                    <TouchableOpacity 
                    onPress={()=>Navigation('booking',{Id:item._id,Type:'Event'})}
                    style={styles.content_display}>
                      <FastImage
                        style={styles.content_display_image}
                        source={{ uri: `${Img_url}${item.image}` }} />

                      <View>
                        <View style={styles.whats_text_view}>
                          <FastImage
                            style={{
                              height: 20,
                              width: 20,
                              alignSelf: 'center'
                            }}
                            source={Images.Location_icon}
                          />
                          <Text style={[styles.content_display_text_up, { marginHorizontal: 10, fontSize: responsiveFontSize(1.9) }]}>
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
                          {item.description[lang]}
                        </Text>
                      </View>

                    </TouchableOpacity>
                  )}
                  ListFooterComponent={<View style={{ height: responsiveScreenHeight(5) }} />}
                />
              </View>




            </View>
          </ScrollView>
        )
      }


    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  page_name_container: {
    // zIndex: -1,
    marginTop: responsiveScreenHeight(1),
    marginHorizontal: 10
  },
  page_name_text: {
    color: Colors.Text_base_color,
    fontSize: responsiveFontSize(3.5),
    fontFamily: Font_poppins.SemiBold_font
  },

  container: {
    // zIndex:-1,
    marginTop: 10,
    backgroundColor: Colors.Primary_color
  },



  content_container: {
    marginHorizontal: 10,
    // marginVertical: responsiveScreenHeight(3)

  },
  content_display: {
    marginBottom: responsiveScreenHeight(3)

  },
  content_display_image: {
    height: responsiveScreenHeight(25),
    width: '100%',
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: Colors.Primary_color,
  },
  content_display_text_up: {
    fontSize: responsiveFontSize(1.5),
    fontFamily: Font_poppins.Regular_font,
    color: Colors.Text_pink_color,
    // alignSelf: 'center',
    // alignSelf: 'center',

  },
  content_display_text_down: {
    fontSize: responsiveFontSize(1.3),
    width: responsiveScreenWidth(),
    fontFamily: Font_poppins.Regular_font,

  },

  experience_display_text_middle: {
    color: Colors.Text_base_color,
    fontFamily: Font_poppins.SemiBold_font,
    fontSize: responsiveFontSize(1.8),
    // alignSelf: 'center',
    verticalAlign: 'middle'

  },

  whats_text_view: {
    flexDirection: 'row',
    // backgroundColor:'yellow',
    marginTop: 5
  },
})

export default Event