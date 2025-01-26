import { BackHandler, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Custom_Header, Page_name } from '../../Utils/Headers'
import { Colors } from '../../Utils/Constants/Colors'
import { Images } from '../../Utils/Constants/Images'
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { Font_poppins } from '../../Utils/Constants/fonts'
import { HeaderNav_lang } from '../../Utils/Constants/Language_content'
import { useSelector } from 'react-redux'
import { useRoute } from '@react-navigation/native'

const Search = ({ navigation }) => {
    const [text, settext] = useState('')

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

    return (
        <SafeAreaView>

            {/* header */}
            <View>
                <Custom_Header nav={navigation} activity={'search'} CustomNav={payLoad == 'setting' ? true : false} />
                <Page_name name={HeaderNav_lang.Search[lang]} />
            </View>


            {/* search box */}
            <View style={styles.search_box_container}>
                <TextInput
                    numberOfLines={1}
                    style={styles.search_box_inputtext}
                    placeholder={HeaderNav_lang.Search[lang]}
                    placeholderTextColor={Colors.Text_grey_color}
                    cursorColor={Colors.Text_base_color}
                    value={text}
                    onChangeText={(val) => settext(val)}

                />
                <TouchableOpacity
                    style={styles.search_box_button}>

                    <Image
                        style={styles.search_box_button_img}
                        source={Images.Search_icon} />
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}

export default Search

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
    search_box_container: {
        flexDirection: 'row',
        backgroundColor: Colors.Primary_color,
        borderRadius: 20,
        marginHorizontal: 10,
        elevation: 5,
        marginVertical: 30
    },
    search_box_inputtext: {
        textAlignVertical: 'center',
        color: Colors.Text_base_color,
        fontSize: responsiveFontSize(2),
        fontFamily: Font_poppins.Regular_font,
        alignSelf: 'center',
        // backgroundColor:'green',
        width: responsiveScreenWidth(10),
        flexGrow: 1,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        paddingHorizontal: 10

    },
    search_box_button: {
        backgroundColor: Colors.search_Background,
        paddingHorizontal: 15,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20

    },
    search_box_button_img: {
        height: 25,
        width: 25,
        objectFit: 'scale-down',
        alignSelf: 'center',
        flexGrow: 2,
        tintColor: '#fff'

    },

})