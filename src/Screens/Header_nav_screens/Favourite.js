import { BackHandler, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useReducer, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { responsiveFontSize, responsiveScreenHeight } from 'react-native-responsive-dimensions'
import { Colors } from '../../Utils/Constants/Colors'
import { Font_poppins } from '../../Utils/Constants/fonts'
import { Custom_Header, Page_name } from '../../Utils/Headers'
import { Images } from '../../Utils/Constants/Images'
import { useSelector } from 'react-redux'
import { HeaderNav_lang } from '../../Utils/Constants/Language_content'
import { useRoute } from '@react-navigation/native'
import { API_url, postApi } from '../../Utils/Constants/API_config'

const Favourite = ({ navigation }) => {
    const select_text = ['My Trips', 'Guides']
    const [selected, setselected] = useState('')
    const [Data, setData] = useState([])

    const route = useRoute()
    const { payLoad } = route.params
    const lang = useSelector((state) => state.Language_Reducer)
    const Token = useSelector(state => state.Token_Reducer)


    useEffect(() => {
        const backAction = () => {
            // setstate(true)
            navigation.popToTop()
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
    }, [])

    const fetch_data = async () => {

        const raw = JSON.stringify({
            "itemId": "67a998b9d6ed48ea34582bc9",
            "type": "evnet"
          });

        try {
            const response = await postApi(API_url.Favourite, raw, Token);
        } catch (error) {
            console.log('error in fetch data', error)

        }
    }



    return (
        <SafeAreaView>

            {/* header */}
            <View style={{ flexGrow: 1 }}>
                <Custom_Header nav={navigation} activity={'favourite'} CustomNav={payLoad == 'setting' ? true : false} />
                <Page_name name={HeaderNav_lang.Favourite[lang]} />
            </View>

            {/* container */}
            <View style={styles.container}>

                <FlatList

                    data={[1]}
                    renderItem={({ item }) => (
                        <View style={styles.trip_box}>
                            <Text numberOfLines={2} style={styles.trip_text_up}>
                                Burj khalifa
                            </Text>
                            <View style={styles.date_container}>
                                <Image
                                    style={{ width: 16, height: 16 }}
                                    source={Images.Calender_icon} />
                                <Text style={styles.trip_text_down}>
                                    30-12-2021
                                </Text>
                            </View>


                        </View>
                    )}
                    ListFooterComponent={<View style={{ height: responsiveScreenHeight(25) }} />}

                />
            </View>

        </SafeAreaView>
    )
}

export default Favourite

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
        flexGrow: 3,
        zIndex: 1,
        // flex:1,
        height: Dimensions.get('screen').height,
        backgroundColor: Colors.Primary_color,

    },

    trip_box: {
        backgroundColor: Colors.Background_color,
        marginHorizontal: 10,
        marginVertical: 10,
        padding: 10,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    trip_text_up: {
        color: Colors.Text_base_color,
        fontSize: responsiveFontSize(2),
        fontFamily: Font_poppins.SemiBold_font
    },
    trip_text_down: {
        color: Colors.Text_base_color,
        fontSize: responsiveFontSize(1.5),
        fontFamily: Font_poppins.Medium_font,
        marginHorizontal: 10
    },
    date_container: {
        flexDirection: 'row',
        // alignItems:'center'
        // backgroundColor: 'red'
    },

    DBselector: {
        flexDirection: 'row',
        marginVertical: 10,
        padding: 10,
        borderRadius: 20
    },
    DBselector_text: {
        color: Colors.Text_white_color,
        fontSize: responsiveFontSize(1.5),
        fontFamily: Font_poppins.SemiBold_font,
        marginRight: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10
    },
    // DBselector:{},

})