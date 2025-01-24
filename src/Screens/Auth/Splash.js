import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { CommonActions } from '@react-navigation/native'
import { Colors } from '../../Utils/Constants/Colors'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { Font_poppins } from '../../Utils/Constants/fonts'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
import { Addtoken, Lang, Mobile } from '../../Redux/Actions/Actions'

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      checkLogin();
    }, 2500)
  }, [])

  const dispatch = useDispatch()


  const checkLogin = async () => {

    const token = await AsyncStorage.getItem('token')
    const mobile = await AsyncStorage.getItem('mobile')
    const lang = await AsyncStorage.getItem('lang')

    console.log("token_splash ==>>", token);

    if (token !== null) {

      dispatch(Addtoken(token))
      dispatch(Mobile(mobile))
      dispatch(Lang(lang))
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'tab' }],
        }),
      );
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'login' }],
        }),
      );
    }


  }

  return (
    <SafeAreaView style={styles.container}>

      <View>
        <Text style={styles.text}>Yatri</Text>
      </View>
    </SafeAreaView>


  )
}

export default Splash

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignSelf: 'center'
  },
  text: {
    textAlign: 'center',
    color: Colors.Text_base_color,
    fontSize: responsiveFontSize(5),
    fontFamily: Font_poppins.SemiBold_font
  }
})