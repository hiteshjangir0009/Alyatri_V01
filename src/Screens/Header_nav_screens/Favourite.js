import { BackHandler, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useReducer, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { responsiveFontSize, responsiveScreenHeight } from 'react-native-responsive-dimensions'
import { Colors } from '../../Utils/Constants/Colors'
import { Font_poppins } from '../../Utils/Constants/fonts'
import { Custom_Header } from '../../Utils/Headers'
import { Images } from '../../Utils/Constants/Images'
import { useSelector } from 'react-redux'
import { HeaderNav_lang } from '../../Utils/Constants/Language_content'
import { useRoute } from '@react-navigation/native'

const Favourite = ({ navigation }) => {
    const select_text = ['My Trips', 'Guides']
    const [selected, setselected] = useState('')
    const [Data, setData] = useState([])

    const route = useRoute()
    const { payLoad } = route.params
    const lang = useSelector((state) => state.Language_Reducer)

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

    }



    return (
        <SafeAreaView>

            {/* header */}
            <View style={{ flexGrow: 1 }}>
                <Custom_Header nav={navigation} activity={'favourite'} CustomNav={payLoad == 'setting' ? true : false} />
            </View>

            {/* page name */}
            <View style={styles.page_name_container}>
                <Text style={styles.page_name_text}>
                    {HeaderNav_lang.Favourite[lang]}
                </Text>
            </View>


            {/* container */}
            <View style={styles.container}>

                <FlatList

                    data={Data}
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