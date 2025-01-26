import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {Custom_Header} from '../Utils/Headers'
import { Colors } from '../Utils/Constants/Colors'
import { responsiveFontSize, responsiveHeight, responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { Font_poppins } from '../Utils/Constants/fonts'
import { Images } from '../Utils/Constants/Images'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CommonActions } from '@react-navigation/native'
import { More_lang } from '../Utils/Constants/Language_content'
import { Lang } from '../Redux/Actions/Actions'
import { useSelector } from 'react-redux'
import FastImage from 'react-native-fast-image'


const button_top = ({ img, name, onPress }) => (
  <View style={styles.button_top_container}>
    <TouchableOpacity
      onPress={onPress}
    >
      <View style={styles.ImgWarper}>
        <FastImage
          style={styles.button_top_image}
          source={img}
        />
      </View>

      <Text style={styles.button_top_text}>
        {name}
      </Text>
    </TouchableOpacity>
  </View>
)

const button_bottom = ({ img, name, onPress }) => (
  <View style={styles.button_Bottom_container}>
    <TouchableOpacity
      onPress={onPress}>
      <View style={styles.ImgWarper_bottom}>
        <FastImage
          style={styles.button_top_image}
          source={img}
        />
      </View>

      <Text style={styles.button_Bottom_text}>
        {name}
      </Text>
    </TouchableOpacity>
  </View>
)

const Menu = ({ navigation }) => {

  const lang = useSelector((state) => state.Language_Reducer)


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

  return (
    <SafeAreaView>

      {/* header */}
      <View>
        <Custom_Header name={More_lang.More[lang]} nav={navigation} />
      </View>

      {/* profile view */}
      <View style={styles.name_view_container}>
        <Text style={styles.name_text}>
          Hitesh
        </Text>
        <Text onPress={() => navigation.navigate('profile',{payLoad:'setting'})} style={styles.view_profile_text}>
          {More_lang.ViewProfile[lang]}
        </Text>
      </View>


      {/* top Buttons */}
      <View style={styles.button_alingment}>
        {button_top({ name: More_lang.Trips[lang], img: Images.Trips_icon, onPress: () => navigation.navigate('trips',{payLoad:'test'}) })}
        {button_top({ name: More_lang.Favourite[lang], img: Images.Favourite_icon, onPress: () => navigation.navigate('favourite',{payLoad:'test'}) })}
      </View>

      {/* container */}
      <View style={styles.container}>

        {/* buttons */}
        <View>
          {/* top */}
          <View style={styles.button_alingment}>
            {button_bottom({ img: Images.Setting_icon, name: More_lang.Settings[lang], onPress: () => navigation.navigate('settings') })}
            {button_bottom({ img: Images.Transports_icon, name: More_lang.PublicTransports[lang], onPress: () => navigation.navigate('transport') })}
          </View>
          {/* bottom */}
          <View style={[styles.button_alingment, { marginTop: 20 }]}>
            {button_bottom({ img: Images.Star_icon, name: More_lang.RateTheApp[lang] })}
            {button_bottom({ img: Images.Contact_icon, name: More_lang.Contacts[lang], onPress: () => navigation.navigate('contacts') })}
          </View>
        </View>

        {/* logout and about */}
        <View style={styles.logout_about_container}>

          {/* about */}
          <View >
            <TouchableOpacity
              onPress={() => navigation.navigate('about')}
              style={styles.about_container}
            >
              <FastImage
                style={styles.about_image}
                source={Images.About_icon}
              />
              <Text style={styles.about_text}>
               {More_lang.AboutTheApp[lang]}
              </Text>
            </TouchableOpacity>
          </View>


          {/* Logout */}
          <View >
            <TouchableOpacity
              onPress={() => logout()}
              style={[styles.about_container, { paddingHorizontal: 15 }]}
            >
              <FastImage
                style={styles.logout_image}
                source={Images.Logout_icon}
              />
              <Text style={styles.about_text}>
                {More_lang.Logout[lang]}
              </Text>
            </TouchableOpacity>
          </View>


        </View>

      </View>
    </SafeAreaView>
  )
}

export default Menu

const styles = StyleSheet.create({


  name_text: {
    color: Colors.Text_base_color,
    fontSize: responsiveFontSize(2.5),
    fontFamily: Font_poppins.SemiBold_font,
    // backgroundColor:'yellow',
    marginBottom: 0
  },
  view_profile_text: {
    color: Colors.Text_blue_color,
    fontSize: responsiveFontSize(1.5),
    fontFamily: Font_poppins.Regular_font,

  },
  name_view_container: {
    // backgroundColor:'red',
    marginHorizontal: 10,
    marginTop: responsiveScreenFontSize(3)
  },


  button_top_container: {
    backgroundColor: Colors.top_button_color,
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 10,
    width: responsiveScreenWidth(45)
  },
  ImgWarper: {
    backgroundColor: Colors.Primary_color,
    alignSelf: 'center',
    marginBottom: 20,
    padding: 8,
    borderRadius: 30
  },
  button_top_image: {
    height: 20,
    width: 20,
    objectFit: 'scale-down',
  },
  button_top_text: {
    alignSelf: 'center',
    color: Colors.Text_base_color,
    fontFamily: Font_poppins.Medium_font,
    fontSize: responsiveFontSize(1.5)
  },


  button_Bottom_container: {
    backgroundColor: Colors.bottom_button_color,
    paddingVertical: 13,
    paddingHorizontal: 15,
    borderRadius: 10,
    width: responsiveScreenWidth(45)
  },
  ImgWarper_bottom: {
    marginBottom: 15,
    borderRadius: 30
  },
  button_Bottom_image: {
    height: 20,
    width: 20,
    objectFit: 'scale-down',
  },
  button_Bottom_text: {
    // alignSelf: 'center',
    color: Colors.Text_base_color,
    fontFamily: Font_poppins.SemiBold_font,
    fontSize: responsiveFontSize(1.5)
  },

  container: {
    backgroundColor: Colors.Primary_color,
    marginTop: responsiveScreenHeight(3),
    height: responsiveScreenHeight(60)
  },

  button_alingment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: responsiveScreenHeight(4)
  },

  logout_about_container: {
    marginTop: responsiveScreenHeight(5),
    marginHorizontal: 10

  },

  about_container: {
    backgroundColor: Colors.bottom_button_color,
    flexDirection: 'row',
    padding: 10,
    marginTop: 10,
    borderRadius: 10
  },
  about_image: {
    height: 30,
    width: 30
  },
  logout_image: {
    height: 25,
    width: 25
  },
  about_text: {
    marginHorizontal: 15,
    alignSelf: 'center',
    fontSize: responsiveFontSize(1.8),
    fontFamily: Font_poppins.Medium_font,

  },
})