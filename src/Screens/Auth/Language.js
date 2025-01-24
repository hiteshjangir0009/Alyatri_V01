import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '../../Utils/Constants/Colors'
import { responsiveFontSize, responsiveScreenHeight } from 'react-native-responsive-dimensions'
import { Font_poppins } from '../../Utils/Constants/fonts'
import Custom_button from '../../Utils/Buttons'
import { useDispatch } from 'react-redux'
import { Lang } from '../../Redux/Actions/Actions'
import { CommonActions } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'



const langData = [
    { id: 1, key: 'en', lang: 'English' },
    { id: 1, key: 'hi', lang: 'हिंदी' },
]

const Language = ({ navigation }) => {
    const dispatch = useDispatch()

    const lang_select = (item) => {
        // dispatch(Lang(item.lang))
        AsyncStorage.setItem('lang', item.key)

        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'splash' }],
            }),
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>

            {/* hearder */}
            <View style={styles.header}>
                <Text style={styles.header_text}>Select your language</Text>
            </View>


            {/* container */}
            <View style={styles.container}>
                <FlatList

                    data={langData}
                    renderItem={({ item }) => (
                        <View style={styles.button}>
                            <Custom_button
                                onPress={() => lang_select(item)}
                                text={item.lang} button_style={{ elevation: 5 }} />
                        </View>
                    )}
                />

            </View>

        </SafeAreaView>
    )
}

export default Language

const styles = StyleSheet.create({
    safeArea: {
        flex: 1, // Make the SafeAreaView fill the entire screen
        justifyContent: 'center'
    },
    header: {
        marginVertical: 10,
        alignItems: 'center',
    },
    header_text: {
        color: Colors.Text_base_color,
        fontSize: responsiveFontSize(3),
        fontFamily: Font_poppins.SemiBold_font
    },


    container: {
        //  alignContent:'center'
        // elevation:5
        marginVertical: responsiveScreenHeight(15)
    },


    button: {
        marginVertical: 10,
        marginHorizontal: 20,
        elevation: 5
    },
    button_text: {},
})