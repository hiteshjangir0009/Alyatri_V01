import { Dimensions, FlatList, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {Custom_Header} from '../Utils/Headers'
import { Colors } from '../Utils/Constants/Colors'
import { Font_poppins } from '../Utils/Constants/fonts'
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { Images } from '../Utils/Constants/Images'
import Custom_button from '../Utils/Buttons'

const About = ({ navigation }) => {
  const contact_Data = [
    { id: 1, name: 'Call', onpress: 'profile', datails: 'Change your details', img: Images.Call },
    { id: 2, name: 'Email', onpress: 'language', datails: 'Change prefered language', img: Images.Mail },
    { id: 3, name: 'Whatsapp', onpress: 'terms', datails: 'Read all terms and conditions', img: Images.Whatsapp },
  ]
  const social_Data = [
    { id: 1, name: 'Instagram', onpress: 'profile', img: Images.Instagram },
    { id: 2, name: 'Facebook', onpress: 'language', img: Images.Facebook },
    { id: 3, name: 'X', onpress: 'terms', img: Images.Twiter },
    { id: 4, name: 'Youtube', onpress: 'terms', img: Images.Youtube },
  ]

  return (

    <SafeAreaView
      style={{ flex: 1, }}>


      {/* header */}
      <View>
        <Custom_Header nav={navigation} />
      </View>

      {/* page name */}
      <View style={styles.page_name_container}>
        <Text style={styles.page_name_text}>
          About the App
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* container */}
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={Images.Background}
          />

          <Text style={styles.about_text}>
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

            The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
          </Text>
        </View>
      </ScrollView>

    </SafeAreaView>
  )
}

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
    height: Dimensions.get('screen'),
    backgroundColor: Colors.Primary_color,
    paddingHorizontal: 10,
    paddingBottom: 50
  },

  page: {
    marginHorizontal: 10
  },

  image: {
    height: responsiveScreenHeight(25),
    width: Dimensions.get('screen'),
    borderTopLeftRadius: 50,
    borderBottomRightRadius: 50,
    marginVertical: 20
  },

  about_container: {
    marginVertical: 30
  },
  about_text: {
    color: Colors.Text_base_color,
    fontFamily: Font_poppins.Regular_font,
    fontSize: responsiveFontSize(1.8),

  },


})

export default About