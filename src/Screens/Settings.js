import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { responsiveFontSize, responsiveScreenHeight } from 'react-native-responsive-dimensions'
import { Colors } from '../Utils/Constants/Colors'
import { Font_poppins } from '../Utils/Constants/fonts'
import {Custom_Header, Page_name} from '../Utils/Headers'
import { Images } from '../Utils/Constants/Images'
import { HeaderNav_lang, Settings_lang } from '../Utils/Constants/Language_content'
import { useSelector } from 'react-redux'

const Settings = ({ navigation }) => {
  const select_text = ['My Trips', 'Guides']
  const [selected, setselected] = useState('')

  const lang = useSelector((state) => state.Language_Reducer)

  const Data = [
    { id: 1, name: Settings_lang.Profile[lang], onpress: 'profile', datails:  Settings_lang.Profile_details[lang],payLoad:'setting' },
    { id: 2, name: Settings_lang.Language[lang], onpress: 'language', datails: Settings_lang.Language_details[lang],payLoad:'setting' },
    { id: 3, name: Settings_lang.Terms[lang], onpress: 'terms', datails: Settings_lang.Terms_details[lang],payLoad:'setting' },
  ]

  useEffect(() => {
    fetch_data()
  }, [])

  const fetch_data = async (item = 'My Trips') => {


  }



  return (
    <SafeAreaView>

      {/* header */}
      <View style={{ flexGrow: 1 }}>
        <Custom_Header nav={navigation} activity={'favourite'} />
          <Page_name name={Settings_lang.Setting[lang]} />
      </View>



      {/* container */}
      <View style={styles.container}>

        <FlatList

          data={Data}
          renderItem={({ item }) => (
            <View style={styles.trip_box}>
              <TouchableOpacity
                onPress={() => navigation.navigate(item.onpress,{payLoad:item.payLoad})}
              >

                <Text numberOfLines={2} style={styles.trip_text_up}>
                  {item.name}
                </Text>


                <Text style={styles.trip_text_down}>
                  {item.datails}
                </Text>

              </TouchableOpacity>


            </View>
          )}
          ListFooterComponent={<View style={{ height: responsiveScreenHeight(25) }} />}

        />
      </View>

    </SafeAreaView>
  )
}

export default Settings

const styles = StyleSheet.create({
  page_name_container: {
    // zIndex: -1,
    flexGrow: 2,
    marginTop: responsiveScreenHeight(1),
    marginHorizontal: 10
  },
  page_name_text: {
    color: Colors.Text_base_color,
    fontSize: responsiveFontSize(3.5),
    fontFamily: Font_poppins.SemiBold_font
  },

  container: {
    flexGrow: 3,
    zIndex: 1,
    // flex:1,
    height: Dimensions.get('screen').height,
    backgroundColor: Colors.Primary_color,

  },

  trip_box: {
    backgroundColor: Colors.Background_color,
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 10,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5
  },
  trip_text_up: {
    color: Colors.Text_base_color,
    fontSize: responsiveFontSize(2),
    fontFamily: Font_poppins.SemiBold_font
  },
  trip_text_down: {
    color: Colors.Text_base_color,
    fontSize: responsiveFontSize(1.5),
    fontFamily: Font_poppins.Medium_font,
    // marginHorizontal: 10
  },



})