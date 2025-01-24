import { Dimensions, FlatList, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StatusBar, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Images } from '../../Utils/Constants/Images'
import { Colors } from '../../Utils/Constants/Colors'
import { Font_poppins } from '../../Utils/Constants/fonts'
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { ALERT_TYPE, AlertNotificationRoot, Dialog, Toast } from 'react-native-alert-notification'
import OtpInputs from 'react-native-otp-inputs';
import Clipboard from '@react-native-clipboard/clipboard'
import { CommonActions, useRoute } from '@react-navigation/native'
import { API_url, postApi } from '../../Utils/Constants/API_config'
import AsyncStorage from '@react-native-async-storage/async-storage'


const { height, width } = Dimensions.get('window')
const Otp = ({ navigation }) => {
  const [counryModal, setcountryModal] = useState(false)
  const [Checkbox, setCheckbox] = useState(false)
  const [otp, setotp] = useState('')

  const route = useRoute()

  const { mobile } = route.params
  console.log("mobile =>", mobile);


  const verify_otp = async (code) => {

    console.log("code =>", code);

    if (code.length == 4) {

      const raw = JSON.stringify({
        "phone": mobile,
        "otp": code
      });

      try {
        const response = await postApi(API_url.otp, raw)
        console.log("response ==>>", response);

        if (response.success == true) {
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'OTP verified',
            textBody: 'your entered OTP is correct',
            button: 'close',
          })

          AsyncStorage.setItem('token', response.token)
          AsyncStorage.setItem('mobile', mobile)

          setTimeout(() => {
            console.log("token ==>>", response.token)

            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'language' }],
              }),
            );
          }, 2000);

          
        } else {
          Toast.show({
            type: ALERT_TYPE.DANGER,
            title: 'Invalid OTP',
            textBody: 'Enter correct OTP',
            button: 'close',
          })
        }
      } catch (error) {
        console.error("error_otp_api ==>>", error);

      }

    }
  }





  return (
    <AlertNotificationRoot>

      <SafeAreaView style={styles.safeareaview}>
        <ImageBackground
          source={Images.Background}
          resizeMode='cover'
          style={styles.background}>


          {/* status bar */}
          <StatusBar
            barStyle="dark-content"
            backgroundColor={Colors.base_color}
          />


          {/* container */}
          <View style={styles.container}>
            <Text style={styles.header_text}>
              OTP
            </Text>

            {/* otp input */}
            <OtpInputs
              style={styles.otp_container}
              inputStyles={styles.otp_input}
              autofillFromClipboard
              handleChange={(code) => {
                // console.log(code)
                // setotp(code)
                // if
                if (code.length === 4) {
                  console.log('hii');
                  verify_otp(code)

                }
              }}
              cursorColor={Colors.Text_base_color}
              numberOfInputs={4}
            />


          </View>


        </ImageBackground>

      </SafeAreaView>
    </AlertNotificationRoot>

  )
}

const styles = StyleSheet.create({
  safeareaview: {
    flex: 1,

  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  container: {
    position: 'absolute',
    backgroundColor: Colors.transparent_background_color,
    left: 0,
    right: 0,
    marginHorizontal: responsiveScreenWidth(3),
    borderRadius: 10
  },

  header_text: {
    color: Colors.Text_white_color,
    textAlign: 'center',
    fontFamily: Font_poppins.SemiBold_font,
    fontSize: responsiveFontSize(4.5),
    marginVertical: responsiveScreenHeight(4)
  },


  otp_container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: responsiveScreenWidth(10),
    marginTop: responsiveScreenHeight(2),
    marginBottom: responsiveScreenHeight(9)
  },
  otp_input: {
    backgroundColor: Colors.Primary_color,
    borderRadius: 10,
    width: responsiveScreenHeight(6),
    height: responsiveScreenHeight(7),
    textAlign: 'center',
    color: Colors.Text_base_color,
    fontWeight: '700',
    fontSize: responsiveFontSize(2.5)
  },
})

export default Otp