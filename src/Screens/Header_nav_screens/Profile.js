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

const Profile = ({ navigation }) => {
  const select_text = ['My Trips', 'Guides']
  const [selected, setselected] = useState('')
  const [Data, setData] = useState([])
  const [name, setname] = useState('')
  const [last_name, setlast_name] = useState('')
  const [email, setemail] = useState('')
  const [mobile, setmobile] = useState('')

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

  useEffect(() => {
    fetch_data()
  }, [navigation])

  const Mobile = useSelector(state => state.Mobile_Reducer)
  const Token = useSelector(state => state.Token_Reducer)
  const lang = useSelector((state) => state.Language_Reducer)

  console.log("Mobile ==>>", Mobile);

  const fetch_data = async (item = 'My Trips') => {

    setmobile(Mobile[0])
    setselected(item)

    console.log("data ==>>", selected);

    if (item == 'My Trips') {
      setData([1, 1, 1, 1])
    } else {
      setData([1, 1])
    }

  }

  console.log("mobile ==>>", mobile);



  return (
    <SafeAreaView>

      {/* header */}
      <View style={{}}>
        <Custom_Header nav={navigation} activity={'profile'} CustomNav={payLoad == 'setting' ? true : false} />
        <Page_name name={HeaderNav_lang.Profile[lang]} />
      </View>

      <KeyboardAvoidingView
        // style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 70 : 50}
      >
        <ScrollView automaticallyAdjustKeyboardInsets={true} keyboardShouldPersistTaps="handled">

          {/* container */}
          <View style={styles.container}>

            {/* name */}
            <View style={styles.data_container}>
              <Text style={styles.text}>{HeaderNav_lang.Name[lang]}</Text>
              <TextInput
                style={styles.input_text}
                placeholder={HeaderNav_lang.Name[lang]}
                placeholderTextColor={Colors.Text_grey_color}
                value={name}
                onChangeText={(text) => setname(text)}
              />
            </View>


            {/* last */}
            <View style={styles.data_container}>
              <Text style={styles.text}>{HeaderNav_lang.LastName[lang]}</Text>
              <TextInput
                style={styles.input_text}
                placeholder={HeaderNav_lang.LastName[lang]}
                placeholderTextColor={Colors.Text_grey_color}
                value={last_name}
                onChangeText={(text) => setlast_name(text)}
              />
            </View>


            {/* email */}
            <View style={styles.data_container}>
              <Text style={styles.text}>{HeaderNav_lang.Email[lang]}</Text>
              <TextInput
                style={styles.input_text}
                placeholder='xyz@abc.com'
                placeholderTextColor={Colors.Text_grey_color}
                value={email}
                onChangeText={(text) => setemail(text)}
              />
            </View>


            {/* mobile */}
            <View style={styles.data_container}>
              <Text style={styles.text}>{HeaderNav_lang.Mobile[lang]}</Text>
              <TextInput
                style={styles.input_text}
                placeholder='121xxxxxxx'
                placeholderTextColor={Colors.Text_grey_color}
                value={mobile}
                onChangeText={(text) => setmobile(text)}
              />
            </View>


            <View style={{ marginTop: 40 }}>
              <Custom_button text={HeaderNav_lang.SaveChanges[lang]} onPress={() => console.log('saved changes')} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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