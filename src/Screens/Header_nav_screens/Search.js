import { BackHandler, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
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
import { API_url, getApi } from '../../Utils/Constants/API_config'
import FastImage from 'react-native-fast-image'
import { Loader } from '../../Utils/Loader'



const Search = ({ navigation }) => {
    const [text, settext] = useState('')
    const [Data, setData] = useState([])
    const [Loading, setLoading] = useState(false)

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


    const Fetch_data = async () => {
        const url = `${API_url.Search}?query=${text}`

        try {
            const response = await getApi(url, Token)
            console.log('Search_response ==>>', response.data.length)
            console.log('Search_response ==>>', response.data[response.data.length])

            setData(response.data)
            setTimeout(() => {
                setLoading(false)

            }, 600)

        } catch (error) {
            console.log('Search_error ==>>', error)

        }
    }



    return (
        <SafeAreaView style={{ flex: 1 }}>

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
                    returnKeyType="Search" // Show "Search" on keyboard
                    onSubmitEditing={() => {
                        setLoading(true)
                        Fetch_data()
                    }}
                    value={text}
                    onChangeText={(val) => settext(val)}

                />
                <TouchableOpacity
                    onPress={() => {
                        setLoading(true)
                        Fetch_data()
                    }}
                    style={styles.search_box_button}>

                    <Image
                        style={styles.search_box_button_img}
                        source={Images.Search_icon} />
                </TouchableOpacity>

            </View>

            {
                Loading ? (
                    <View style={{
                        flex: 1,
                        backgroundColor: Colors.Primary_color,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>

                        <Loader />
                    </View>
                ) : (

                    //  {/* container */}
                    <View style={styles.main}>

                        <FlatList
                            data={Data}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <View style={styles.container}>
                                    <FastImage
                                        style={styles.container_image}
                                        // source={Images.Background}
                                        source={
                                            item.photos && item.photos.length > 0 && item.photos[0].images?.original?.url
                                                ? { uri: item.photos[0].images.medium.url }
                                                : Images.Background // Use a default image when no valid image is available
                                        }

                                    />

                                    <View style={styles.text_container}>
                                        <Text style={styles.container_text_up}>{item?.details?.name || 'null'}</Text>
                                        <Text style={styles.container_text_mid}>
                                            {item.details?.ancestors?.[0]?.name || ''}
                                        </Text>

                                        <Text
                                            numberOfLines={2}
                                            style={styles.container_text_down}>
                                            {item?.details?.description || ''}
                                        </Text>
                                    </View>

                                </View>
                            )}
                        />

                    </View>
                )
            }

        </SafeAreaView>
    )
}

export default Search

const styles = StyleSheet.create({

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

    main: {
        flex: 1,
        backgroundColor: Colors.Primary_color,
        // backgroundColor: 'green',
        paddingHorizontal: 10,
        paddingTop: 10
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: Colors.Background_color,
        marginVertical: 5,
        overflow: 'hidden',
        borderTopLeftRadius: 30,
        borderBottomRightRadius: 30,
    },

    container_image: {
        flex: .3,
        height: 110,
        // width: 90,
        position: 'relative',
        // objectFit:'scale-down'
        alignSelf: 'center',

    },
    text_container: {
        flex: .7,
        marginHorizontal: 10,
        alignSelf: 'center'
        // justifyContent:'space-between'
        // backgroundColor: 'yellow',

    },
    container_text_up: {
        color: Colors.Text_pink_color,
        fontFamily: Font_poppins.SemiBold_font,
        fontSize: responsiveFontSize(2)
    },
    container_text_mid: {
        color: Colors.Text_base_color,
        fontFamily: Font_poppins.Medium_font,
        fontSize: responsiveFontSize(1.5)
    },
    container_text_down: {
        color: Colors.Text_base_color,
        fontFamily: Font_poppins.Regular_font,
        fontSize: responsiveFontSize(1.3)
    },


})