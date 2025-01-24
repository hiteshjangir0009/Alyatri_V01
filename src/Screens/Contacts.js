import { Dimensions, FlatList, Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import {Custom_Header} from '../Utils/Headers'
import { Colors } from '../Utils/Constants/Colors'
import { Font_poppins } from '../Utils/Constants/fonts'
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { Images } from '../Utils/Constants/Images'
import Custom_button from '../Utils/Buttons'

const Contacts = ({ navigation }) => {
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

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={styles.keyboardAvoidView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* page name */}
          <View style={styles.page_name_container}>
            <Text style={styles.page_name_text}>
              Contacts
            </Text>
          </View>


          {/* container */}
          <View style={styles.container}>


            {/* header navbar */}
            <View >

              <FlatList
                scrollEnabled={false}
                // showsHorizontalScrollIndicator={false}
                data={contact_Data}
                horizontal
                keyExtractor={(item) => item.id}
                contentContainerStyle={{
                  flex: 1,
                  justifyContent: 'space-between'
                }}
                renderItem={({ item }) => (

                  <TouchableOpacity
                  // onPress={() => setselected(item)}
                  >
                    <View style={styles.sub_categories_container}>
                      <View style={{
                        backgroundColor: Colors.Primary_color,
                        alignSelf: 'center',
                        padding: 8,
                        borderRadius: 20,
                        marginBottom: 10
                      }}>
                        <Image
                          style={{
                            height: 20,
                            width: 20,
                            alignSelf: 'center'
                          }}
                          source={item.img} />
                      </View>

                      <Text
                        style={[
                          styles.sub_categories_text,
                          // { color: selected === item ? Colors.sub_catgory_active_color : Colors.Text_grey_color },
                        ]}
                      >
                        {item.name}
                      </Text>
                    </View>

                  </TouchableOpacity>
                )}
              />

              <FlatList
                scrollEnabled={false}
                // showsHorizontalScrollIndicator={false}
                data={social_Data}
                horizontal
                keyExtractor={(item) => item.id}
                contentContainerStyle={{
                  flex: 1,
                  justifyContent: 'space-around'
                }}
                renderItem={({ item }) => (

                  <TouchableOpacity
                    // onPress={() => setselected(item)}
                    style={styles.social_container}
                  >

                    <Image
                      style={styles.social_image}
                      source={item.img}
                    />

                  </TouchableOpacity>
                )}
              />
            </View>

            {/* page  */}
            <View style={styles.page}>

              {/* about */}
              <View style={styles.about_container}>
                <Text style={styles.about_text}>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
                </Text>
              </View>


              {/* contacts */}
              <View>
                <TextInput
                  style={styles.input_text}
                  placeholder='Name'
                  placeholderTextColor={Colors.Text_grey_color}
                />
                <TextInput
                  style={styles.input_text}
                  placeholder='Phone'
                  placeholderTextColor={Colors.Text_grey_color}
                />
                <TextInput
                  style={styles.input_text}
                  placeholder='Email'
                  placeholderTextColor={Colors.Text_grey_color}
                />
                <TextInput
                  multiline={true}
                  style={styles.input_text}
                  placeholder='Message'
                  placeholderTextColor={Colors.Text_grey_color}
                />
              </View>

              {/* button */}
              <View
                style={{ marginVertical: 20 }}>
                <Custom_button
                  text={'Send us'}
                />
              </View>

            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

  keyboardAvoidView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },

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

  sub_categories_container: {
    marginVertical: 20,
    marginHorizontal: 10,
    backgroundColor: Colors.Background_color,
    paddingVertical: 15,
    width: responsiveScreenWidth(28),
    borderRadius: 10,
  },
  sub_categories_text: {
    color: Colors.Text_grey_color,
    fontFamily: Font_poppins.Medium_font,
    fontSize: responsiveFontSize(1.3),
    textAlign: 'center',
    textAlignVertical: 'center'
  },

  social_container: {
    marginVertical: 20,
    marginHorizontal: 10,
    backgroundColor: Colors.Background_color,
    // padding: 15,
    borderRadius: 10,
  },
  social_image: {
    height: 45,
    width: 45,
    objectFit: 'scale-down'
  },

  container: {

    // height: Dimensions.get('screen'),
    backgroundColor: Colors.Primary_color,
    // paddingBottom: 100
  },

  page: {
    marginHorizontal: 10
  },

  about_container: {
    marginVertical: 30
  },
  about_text: {
    color: Colors.Text_base_color,
    fontFamily: Font_poppins.Regular_font,
    fontSize: responsiveFontSize(1.8),
  },

  input_text: {
    backgroundColor: Colors.Background_color,
    elevation: 5,
    color: Colors.Text_base_color,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius: 5,
    height: 50,  // Add fixed height for regular inputs
    minHeight: 50
  }
})

export default Contacts