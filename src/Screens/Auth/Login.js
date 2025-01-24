import { Dimensions, FlatList, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Images } from '../../Utils/Constants/Images'
import { Colors } from '../../Utils/Constants/Colors'
import { Font_poppins } from '../../Utils/Constants/fonts'
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'
import Modal from "react-native-modal";
import { Country_code } from '../../Constants/country_code/Country_code'
import Custom_button from '../../Utils/Buttons'
import { ALERT_TYPE, AlertNotificationRoot, Dialog, Toast } from 'react-native-alert-notification'
import { API_url, postApi } from '../../Utils/Constants/API_config'
import FastImage from 'react-native-fast-image'

const { height, width } = Dimensions.get('window')
const Login = ({ navigation }) => {
  const [counryModal, setcountryModal] = useState(false)
  const [Checkbox, setCheckbox] = useState(false)
  const [Counrydata, setCountrydata] = useState({ code: '+91', flag: '🇮🇳' })
  const [mobile, setmobile] = useState('')


  const send_otp = async () => {
    if (mobile.length == 10) {
      if (Checkbox) {
        const raw = JSON.stringify({
          "phone": mobile,
        });

        try {
          const response = await postApi(API_url.Login, raw)
          console.log("response ==>>", response);
          if (response.success == true) {
            navigation.navigate('otp', { mobile: mobile })
          }
        } catch (error) {
          console.error("login error ==>>",error);
        }


      } else {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: 'Invalid',
          textBody: 'You must agree to the terms and conditions',
          button: 'close',

        })
      }
    }
    else {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Invalid mobile number',
        textBody: 'Enter correct Mobile number',
        button: 'close',

      })
    }
  }

  return (
    <AlertNotificationRoot>
      <SafeAreaView style={styles.safeareaview}>
        <ImageBackground source={Images.Background} resizeMode="cover" style={styles.background}>
          {/* KeyboardAvoidingView for input handling */}
          <KeyboardAvoidingView
            style={styles.keyboardAvoidingContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
          >
            <ScrollView
              contentContainerStyle={styles.scrollViewContent}
              keyboardShouldPersistTaps="handled"
            >
              {/* StatusBar */}
              <StatusBar barStyle="dark-content" backgroundColor={Colors.base_color} />

              {/* Main Content */}
              <View style={styles.container}>
                <Text style={styles.header_text}>Login</Text>

                {/* Mobile Input */}
                <View style={styles.mobile_no_container}>
                  <Text style={styles.text}>Mobile no.</Text>
                  <View style={styles.mobile_no_input_container}>
                    <Text
                      onPress={() => setcountryModal(true)}
                      style={styles.country_text}
                    >
                      {Counrydata.flag}
                    </Text>
                    <TextInput
                      style={styles.input_text}
                      placeholder="9012XXXXXX"
                      placeholderTextColor={Colors.Text_grey_color}
                      keyboardType="phone-pad"
                      maxLength={10}
                      cursorColor={Colors.base_color}
                      value={mobile}
                      onChangeText={(val) => setmobile(val)}
                    />
                  </View>
                </View>

                {/* Checkbox */}
                <View style={styles.checkbox_container}>
                  <TouchableOpacity
                    onPress={() => setCheckbox(!Checkbox)}
                    style={styles.Checkbox_button}
                  >
                    <View style={!Checkbox ? styles.checkbox_Inactive : styles.checkbox_Active} />
                  </TouchableOpacity>
                  <Text style={styles.checkbox_text}>Agree to the</Text>
                  <Text style={[styles.checkbox_text, { color: Colors.Text_blue_color }]}>
                    {' '}terms and conditions
                  </Text>
                </View>

                {/* Button */}
                <View>
                  <Custom_button
                    onPress={send_otp}
                    text="Send OTP"
                    button_style={styles.custom_button_style}
                  />
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>

          {/* Country Modal */}
          <Modal
            isVisible={counryModal}
            onBackButtonPress={() => setcountryModal(false)}
            onBackdropPress={() => setcountryModal(false)}
          >
            <View style={styles.modal_container}>
              <Text style={styles.modal_text_header}>Choose your country</Text>
              <FlatList
                data={Country_code}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setCountrydata({ code: item.dial_code, flag: item.flag });
                      setcountryModal(false);
                    }}
                  >
                    <View style={styles.modal_text_container}>
                      <Text style={styles.modal_text}>{item.flag}</Text>
                      <Text style={[styles.modal_text, { marginLeft: 15 }]}>
                        {item.name}({item.dial_code})
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          </Modal>
        </ImageBackground>
      </SafeAreaView>
    </AlertNotificationRoot>
  );

}

const styles = StyleSheet.create({
  safeareaview: {
    flex: 1
  },
  background: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  keyboardAvoidingContainer: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },

  container: {
    backgroundColor: Colors.transparent_background_color,
    marginHorizontal: 10,
    marginVertical: responsiveScreenHeight(20),
    flex: 1,
    borderRadius: 10
  },
  header_text: {
    color: Colors.Text_white_color,
    fontFamily: Font_poppins.SemiBold_font,
    fontSize: responsiveFontSize(4),
    textAlign: 'center',
    marginVertical: responsiveScreenHeight(6)
  },
  text: {
    color: Colors.Text_white_color,
    fontSize: responsiveFontSize(2),
    fontFamily: Font_poppins.Medium_font,
    marginVertical: 2
  },


  mobile_no_container: {
    marginHorizontal: responsiveScreenWidth(3),
  },
  mobile_no_input_container: {
    flexDirection: 'row',
    backgroundColor: Colors.Primary_color,
    borderRadius: 10
  },
  input_text: {
    color: Colors.Text_base_color,
    fontSize: responsiveFontSize(2),
    // backgroundColor: Colors.Primary_color,
    fontFamily: Font_poppins.Medium_font,
    flexGrow: 2,
    verticalAlign: 'middle',
  },
  country_text: {
    fontSize: responsiveFontSize(2.4),
    backgroundColor: Colors.Primary_color,
    fontFamily: Font_poppins.Medium_font,
    margin: 10,
    verticalAlign: 'middle',
    textAlign: 'center',
    paddingHorizontal: 10,
    borderRadius: 5,
    elevation: 9
  },

  modal_container: {
    height: responsiveScreenHeight(50),
    backgroundColor: Colors.Primary_color,
    borderRadius: 10,
    padding: 10
  },
  modal_text_header: {
    fontSize: responsiveFontSize(2.5),
    color: Colors.Text_base_color,
    fontFamily: Font_poppins.SemiBold_font
  },
  modal_text: {
    fontSize: responsiveFontSize(2),
    color: Colors.Text_base_color,
    fontFamily: Font_poppins.Regular_font,
    padding: 3
  },
  modal_text_container: {
    flexDirection: 'row',
    marginVertical: 5,


    // backgroundColor:Colors
  },


  checkbox_container: {
    flexDirection: 'row',
    marginHorizontal: 13,
    marginVertical: 30
  },
  checkbox_text: {
    color: Colors.Text_white_color,
    fontFamily: Font_poppins.SemiBold_font,
    fontSize: responsiveFontSize(2),
  },
  Checkbox_button: {
    padding: 2,
    backgroundColor: Colors.Primary_color,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignSelf: 'center',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkbox_Inactive: {
    backgroundColor: Colors.Primary_color,
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  checkbox_Active: {
    backgroundColor: Colors.base_color,
    width: 12,
    height: 12,
    borderRadius: 6,
  },


  custom_button_style: {
    marginHorizontal: 10,
    marginVertical: responsiveScreenHeight(5),
    // elevation:2
  }
})

export default Login