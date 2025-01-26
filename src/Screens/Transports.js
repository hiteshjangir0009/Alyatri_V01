import { Dimensions, FlatList, Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Custom_Header, Page_name } from '../Utils/Headers'
import { Colors } from '../Utils/Constants/Colors'
import { Font_poppins } from '../Utils/Constants/fonts'
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { Images } from '../Utils/Constants/Images'

const Transports = ({ navigation }) => {
  const sub_categories = ['Metro', 'Marine', 'Bus', 'Nol Card', 'Taxi']
  const [selected, setselected] = useState('Metro')

  return (
    <SafeAreaView
      style={{ flex: 1, }}>

      {/* header */}
      <View>
        <Custom_Header nav={navigation} />
        <Page_name name={'Public transports'} />
      </View>


      {/* container */}
      <View style={styles.container}>


        {/* header navbar */}
        <View >

          <FlatList
            showsHorizontalScrollIndicator={false}
            data={sub_categories}
            horizontal
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <View style={styles.sub_categories_container}>
                <TouchableOpacity onPress={() => setselected(item)}>
                  <Text
                    style={[
                      styles.sub_categories_text,
                      { color: selected === item ? Colors.sub_catgory_active_color : Colors.Text_grey_color },
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>

        {/* page  */}
        <View style={styles.page}>

          {/* image */}
          <View style={styles.page_image_container}>
            <Image
              style={styles.page_image}
              source={Images.Background}
            />
          </View>

          {/* about */}
          <View style={styles.about_container}>
            <Text style={styles.about_text}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </Text>
          </View>

        </View>

      </View>

      {/* view button */}
      <View style={styles.booking_button_container}>
        <TouchableOpacity

          style={styles.booking_button_button}
        >
          <Text style={styles.booking_button_text}>
            Book tickets
          </Text>
        </TouchableOpacity>
      </View>
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

  sub_categories_container: {
    marginVertical: 20,
    marginHorizontal: 10
  },
  sub_categories_text: {
    color: Colors.Text_grey_color,
    fontFamily: Font_poppins.Medium_font,
    fontSize: responsiveFontSize(1.7)
  },

  booking_button_container: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 10,
    borderWidth: 2,
    borderColor: Colors.border_color,
    padding: 5,
    borderRadius: 10,

  },
  booking_button_button: {
    backgroundColor: Colors.Background_color,
    borderRadius: 10,
    paddingVertical: 5,
    // elevation:5

  },
  booking_button_text: {
    color: Colors.Text_base_color,
    fontFamily: Font_poppins.SemiBold_font,
    fontSize: responsiveFontSize(2.5),
    textAlign: 'center'
  },

  container: {

    height: Dimensions.get('screen').height,
    backgroundColor: Colors.Primary_color,

  },

  page: {
    marginHorizontal: 10
  },
  page_image_container: {
    elevation: 10,
    borderRadius: 50
  },
  page_image: {
    height: responsiveScreenHeight(25),
    width: Dimensions.get('screen'),
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,

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

export default Transports