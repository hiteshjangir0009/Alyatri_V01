import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Home_lang } from "./Constants/Language_content"
import { NoData_text } from "./NoData_text"
import FastImage from "react-native-fast-image"
import { useSelector } from "react-redux"
import { responsiveFontSize, responsiveScreenFontSize, responsiveScreenHeight, responsiveScreenWidth } from "react-native-responsive-dimensions"
import { Images } from "./Constants/Images"
import { Img_url } from "./Constants/API_config"
import { Font_poppins } from "./Constants/fonts"
import { month_data } from "../Screens/Home"
import { Colors } from "./Constants/Colors"

export const Home_sliders = ({ title, Data = [], nav, Type }) => {

    const lang = useSelector((state) => state.Language_Reducer)


    // date function is used to display the date in the slider
    const date = (item) => {
        const year = item.date.slice(0, 4)
        const month = item.date.slice(5, 7)
        const date = item.date.slice(8, 11)

        const month_name = month_data.find((e) => e.id === month)

        return `${date} ${month_name.month} ${year}`
    }


    // text_format function is used to display the text in the slider
    const text_format = (item) => {
        return (
            <>
                {
                    Type == 'WhatsOn' ? (
                        <>
                            <View style={styles.whats_text_view}>
                                <FastImage
                                    style={{
                                        height: 20,
                                        width: 20,
                                        alignSelf: 'center'
                                    }}
                                    source={Images.Location_icon}
                                />
                                <Text numberOfLines={1} style={[styles.content_display_text_up, { marginHorizontal: 10, fontSize: responsiveFontSize(1.9) }]}>
                                    {item?.details?.name}
                                </Text>
                            </View>

                            <View style={styles.whats_text_view}>
                                <FastImage
                                    style={{
                                        height: 18,
                                        width: 18,
                                        alignSelf: 'center'
                                    }}
                                    source={Images.Calender_icon}
                                />
                                <Text numberOfLines={1} style={[styles.experience_display_text_middle, { marginHorizontal: 10, fontSize: responsiveFontSize(1.5) }]}>
                                    {/* {date(item)} */}
                                    date
                                </Text>
                            </View>
                        </>
                    ) : (
                        <>
                            <Text numberOfLines={2} style={[styles.content_display_text_up,{width:responsiveScreenWidth(57)}]}>
                                {item.title[lang]}
                            </Text>
                            {Type == 'Experience' ? (
                                <Text style={styles.experience_display_text_middle}>
                                    DSDSDSDSDSD
                                </Text>
                            ) : (null)}
                        </>
                    )
                }

                <Text
                    numberOfLines={2}
                    style={styles.content_display_text_down}>
                    {item.details?.description}
                </Text>
            </>
        )
    }

    return (
        <View style={styles.content_container}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                <Text style={styles.content_heading_text}>
                    {title}
                </Text>
                <TouchableOpacity
                    onPress={() => { nav.navigate('viewall', { page: title }) }}
                    style={{ alignSelf: 'center' }}
                >
                    <Text
                        style={styles.content_viewall_text}>
                        {Home_lang.ViewAll[lang]}
                    </Text>
                </TouchableOpacity>
            </View>

            {
                Data.length == 0 ?
                    ( <NoData_text /> )
                    :
                    (
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            data={Data}
                            keyExtractor={(item, index) => `${item._id}-${index}`}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => { nav.navigate('blog', { Id: item._id }) }}
                                    style={styles.content_display}>
                                    <FastImage
                                        style={styles.content_display_image}
                                        // source={{ uri: `${Img_url}${item.image}` }} />
                                        source={{ uri: item?.photos?.images?.medium?.url}||Images.Background} />


                                    <View>
                                        {text_format(item)}
                                    </View>



                                </TouchableOpacity>
                            )}

                        />
                    )
            }
        </View>
    )
}

const styles = StyleSheet.create({

    content_container: {
        marginHorizontal: 10,
        marginVertical: responsiveScreenHeight(3),


    },
    content_heading_text: {
        color: Colors.Text_base_color,
        fontFamily: Font_poppins.SemiBold_font,
        fontSize: responsiveFontSize(2.5),
    },
    content_viewall_text: {
        color: Colors.Text_base_color,
        fontFamily: Font_poppins.SemiBold_font,
        fontSize: responsiveFontSize(1.5),
    },
    content_display: {
        marginRight: 30,
    },
    content_display_image: {
        height: 150,
        width: 240,
        borderTopLeftRadius: 30,
        borderBottomRightRadius: 30
    },
    content_display_text_up: {
        fontSize: responsiveFontSize(1.5),
        fontFamily: Font_poppins.Regular_font,
        color: Colors.Text_pink_color,
        width: responsiveScreenWidth(50),
        // backgroundColor:'red'
        // alignSelf: 'center',
        // alignSelf: 'center',

    },
    content_display_text_down: {
        fontSize: responsiveFontSize(1.3),
        width: responsiveScreenWidth(55),
        fontFamily: Font_poppins.Regular_font,

    },


    experience_display_text_middle: {
        color: Colors.Text_base_color,
        fontFamily: Font_poppins.SemiBold_font,
        fontSize: responsiveFontSize(1.8),
        // alignSelf: 'center',
        verticalAlign: 'middle',
        width: responsiveScreenWidth(40)

    },


    whats_text_view: {
        flexDirection: 'row',
        // backgroundColor:'yellow'
        marginTop: 5
    },

})