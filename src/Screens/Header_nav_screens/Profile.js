import { BackHandler, Dimensions, FlatList, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { responsiveFontSize, responsiveScreenHeight } from 'react-native-responsive-dimensions'
import { Colors } from '../../Utils/Constants/Colors'
import { Font_poppins } from '../../Utils/Constants/fonts'
import { Custom_Header, Page_name } from '../../Utils/Headers'
import { Images } from '../../Utils/Constants/Images'
import Custom_button from '../../Utils/Buttons'
import { useSelector } from 'react-redux'
import { HeaderNav_lang, Home_lang } from '../../Utils/Constants/Language_content'
import { useRoute } from '@react-navigation/native'
import { API_url, postApi } from '../../Utils/Constants/API_config'
import { ALERT_TYPE, AlertNotificationRoot, Dialog, Toast } from 'react-native-alert-notification'
import { Alert_modal } from '../../Utils/Alert_modal'


const Profile = ({ navigation }) => {
  const [Data, setData] = useState([])
  const [Name, setName] = useState('')
  const [Last_name, setLast_name] = useState('')
  const [City, setCity] = useState('')
  const [Email, setEmail] = useState('')
  const [mobile, setmobile] = useState('')
  const [Visible, setVisible] = useState(false)

  const route = useRoute()
  const { payLoad } = route.params

  useEffect(() => {
    const backAction = () => {
      // setstate(true)
      if (payLoad === 'setting') {
        navigation.goBack()

      } else {
        navigation.popToTop()

      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [])

  const Mobile = useSelector(state => state.Mobile_Reducer)
  const Token = useSelector(state => state.Token_Reducer)
  const lang = useSelector((state) => state.Language_Reducer)

  const fetch_data = async () => {


    const raw = JSON.stringify({
      name: `${Name} ${Last_name}`,
      email: Email,
      city: City,
    });

    try {
      if (Name == '' || Last_name == '' || City == '' || Email == '') {
        setVisible(true)
        return
      }
      const response = await postApi(API_url.Profile_update, raw, Token)
      if (response.success == true) {
        setName('')
        setLast_name('')
        setCity('')
        setEmail('')
      }


      console.log("response ==>>", response);

    } catch (error) {
      console.log("profile_update_error ==>>", error);

    }





  }



  return (

    <SafeAreaView>

      {/* header */}
      <View style={{}}>
        <Custom_Header nav={navigation} activity={'profile'} CustomNav={payLoad == 'setting' ? true : false} />
        <Page_name name={HeaderNav_lang.Profile.heading[lang]} />
      </View>

      <KeyboardAvoidingView
        // style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 70 : 50}
      >
        <ScrollView automaticallyAdjustKeyboardInsets={true} keyboardShouldPersistTaps="handled">

          {/* container */}
          <AlertNotificationRoot>

            <View style={styles.container}>

              {/* name */}
              <View style={styles.data_container}>
                <Text style={styles.text}>{HeaderNav_lang.Profile.Name[lang]}</Text>
                <TextInput
                  style={styles.input_text}
                  placeholder={HeaderNav_lang.Profile.Name[lang]}
                  placeholderTextColor={Colors.Text_grey_color}
                  value={Name}
                  onChangeText={(text) => setName(text)}
                />
              </View>


              {/* last */}
              <View style={styles.data_container}>
                <Text style={styles.text}>{HeaderNav_lang.Profile.LastName[lang]}</Text>
                <TextInput
                  style={styles.input_text}
                  placeholder={HeaderNav_lang.Profile.LastName[lang]}
                  placeholderTextColor={Colors.Text_grey_color}
                  value={Last_name}
                  onChangeText={(text) => setLast_name(text)}
                />
              </View>


              {/* email */}
              <View style={styles.data_container}>
                <Text style={styles.text}>{HeaderNav_lang.Profile.Email[lang]}</Text>
                <TextInput
                  style={styles.input_text}
                  placeholder='xyz@abc.com'
                  placeholderTextColor={Colors.Text_grey_color}
                  value={Email}
                  onChangeText={(text) => setEmail(text)}
                />
              </View>


              {/* City */}
              <View style={styles.data_container}>
                <Text style={styles.text}>{HeaderNav_lang.Profile.City[lang]}</Text>
                <TextInput
                  style={styles.input_text}
                  placeholder='e.g. Dubai'
                  placeholderTextColor={Colors.Text_grey_color}
                  value={City}
                  onChangeText={(text) => setCity(text)}
                />
              </View>


              <View style={{ marginTop: 40 }}>
                <Custom_button text={HeaderNav_lang.Profile.SaveChanges[lang]}
                  onPress={() => {
                    fetch_data()
                  }}
                />
              </View>
            </View>
          </AlertNotificationRoot>

        </ScrollView>
      </KeyboardAvoidingView>

      {/* alert */}
      <Alert_modal Message={"All fields are Required"} Visible={Visible} onClose={() => setVisible(false)} />

    </SafeAreaView>

  )
}

export default Profile

const styles = StyleSheet.create({
  page_name_container: {
    // zIndex: -1,
    // flexGrow: 2,
    marginTop: responsiveScreenHeight(1),
    marginHorizontal: 10
  },
  page_name_text: {
    color: Colors.Text_base_color,
    fontSize: responsiveFontSize(3.5),
    fontFamily: Font_poppins.SemiBold_font
  },

  container: {
    // flexGrow: 3,
    // zIndex: 1,
    flex: 1,
    height: Dimensions.get('screen'),
    backgroundColor: Colors.Primary_color,
    paddingHorizontal: 10,
    paddingVertical: 15
  },
  data_container: {
    marginVertical: 10
  },

  text: {
    color: Colors.Text_base_color,
    fontSize: responsiveFontSize(2),
    fontFamily: Font_poppins.SemiBold_font
  },
  input_text: {
    color: Colors.Text_base_color,
    fontSize: responsiveFontSize(1.8),
    fontFamily: Font_poppins.Medium_font,
    backgroundColor: Colors.inputText_color,
    paddingHorizontal: 10,
    borderRadius: 5,

  },

})