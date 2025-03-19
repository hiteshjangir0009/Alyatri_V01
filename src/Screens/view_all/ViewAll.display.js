import { ActivityIndicator, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '../../Utils/Constants/Colors'
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { Font_poppins } from '../../Utils/Constants/fonts'
import { Images } from '../../Utils/Constants/Images'
import { useRoute } from '@react-navigation/native'
import { Custom_Header, Page_name } from '../../Utils/Headers'
import { API_url, getApi } from '../../Utils/Constants/API_config'
import { useSelector } from 'react-redux'


const ViewAll = ({ navigation }) => {
    const sub_categories = ['Inspire', 'Food & Drinks', 'Sight & Attractions', 'Experience', 'Art & Cultture', 'Shopping']
    const [Sub_categoriesSelected, setSub_categoriesSelected] = useState('Inspire')
    const [Data, setData] = useState([])
    const [ScrollLoading, setScrollLoading] = useState(false)
    const [Page, setPage] = useState(1)
    const [NodataFound, setNodataFound] = useState(false)

    const route = useRoute()
    const { page } = route.params

    console.log(page);

    useEffect(() => {
        API_data()
    }, [])


    const token = useSelector((state) => state.Token_Reducer)
    const lang = useSelector((state) => state.Language_Reducer)

    const API_data = async () => {

        if (Data.length > 0) setScrollLoading(true)

        let url = ''

        if (page == 'Trending now') url = API_url.Trending
        if (page == 'Experience') url = API_url.Experience
        if (page == `What${"'"}s on`) url = API_url.Whatson

        try {
            const response = await getApi(`${url}?page=${Page}&limit=5`, token)
            console.log("response ==>>", response.data);

            const data = response.data

            if (Data.length > 0) {

               
                if (data.length == 0) {
                    console.log("no data found");
                    setNodataFound(true)
                }
                setData([...Data, ...response.data])
                setScrollLoading(false)
            } else {
                setData(response.data)
            }

        } catch (error) {
            console.log("viewAll_error ==>>", error);
        }
    }


    // display text decider
    const text = (item) => {
        if (page == 'Trending now') {
            return (
                <View>
                    <Text style={styles.content_display_text_up}>
                        {item.details.name}
                    </Text>

                    <Text
                        numberOfLines={2}
                        style={styles.content_display_text_down}>
                        {item.details.description}
                    </Text>
                </View>
            )
        }
        if (page == 'Experience') {
            return (
                <View>
                    <Text style={styles.content_display_text_up}>
                        {item.details.name}
                    </Text>

                    <Text style={styles.experience_display_text_middle}>
                        {item.details.ancestors[0].name}
                    </Text>

                    <Text
                        numberOfLines={2}
                        style={styles.content_display_text_down}>
                        {item.details.description}
                    </Text>
                </View>
            )
        }
        if (page == `What's on`) {
            return (
                <View>
                    <View style={styles.whats_text_view}>
                        <Image
                            style={{
                                height: 20,
                                width: 20,
                                alignSelf: 'center'
                            }}
                            source={Images.Location_icon}
                        />
                        <Text style={[styles.content_display_text_up, { marginHorizontal: 10, fontSize: responsiveFontSize(1.9) }]}>
                            {item.details.name}
                        </Text>
                    </View>

                    <View style={styles.whats_text_view}>
                        <Image
                            style={{
                                height: 18,
                                width: 18,
                                alignSelf: 'center'
                            }}
                            source={Images.Calender_icon}
                        />
                        <Text style={[styles.experience_display_text_middle, { marginHorizontal: 10, fontSize: responsiveFontSize(1.5) }]}>
                            30 Dec 2024
                        </Text>
                    </View>

                    <Text
                        numberOfLines={2}
                        style={[styles.content_display_text_down, { marginTop: 10 }]}>
                        {item.details.description}

                    </Text>
                </View>
            )
        }





    }

    return (
        <SafeAreaView>


            {/* header */}
            <View>
                <Custom_Header onPress={() => navigation.goBack()} nav={navigation} />
                <Page_name name={page} />
            </View>



            {/* container */}
            <View style={styles.container}>


                {/* content */}
                <View style={styles.content_container}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        onEndReached={() => {
                            if (NodataFound == false) {
                                setPage(Page + 1)
                                API_data()
                            }

                        }}
                        onEndReachedThreshold={0.5}
                        // scrollEnabled={false}
                        data={Data}
                        renderItem={({ item }) => (
                            <View style={styles.content_display}>
                                <Image
                                    style={styles.content_display_image}
                                    // source={Images.Background} 
                                    source={{ uri: item.photos[0].images.original.url }}
                                />

                                {text(item)}

                            </View>
                        )}
                        ListFooterComponent={<View style={{ height: responsiveScreenHeight(35) }} />}
                    />
                    {ScrollLoading && <ActivityIndicator size="large" color="blue" />}

                </View>




            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    page_name_container: {
        // zIndex: -1,
        marginTop: responsiveScreenHeight(1),
        marginHorizontal: 10
    },
    page_name_text: {
        color: Colors.Text_base_color,
        fontSize: responsiveFontSize(3.5),
        fontFamily: Font_poppins.SemiBold_font
    },

    container: {
        // zIndex:-1,
        marginTop: 10,
        backgroundColor: Colors.Primary_color
    },
    sub_categories_container: {
        marginVertical: 20,
        marginHorizontal: 10
    },
    sub_categories_text: {
        color: Colors.Text_grey_color,
        fontFamily: Font_poppins.Medium_font,
        fontSize: responsiveFontSize(1.7)
    },


    content_container: {
        marginTop: 20,
        marginHorizontal: 10,
        // marginVertical: responsiveScreenHeight(3)

    },
    content_display: {
        marginBottom: responsiveScreenHeight(3)

    },
    content_display_image: {
        height: responsiveScreenHeight(25),
        width: "100%",
        borderTopLeftRadius: 30,
        borderBottomRightRadius: 30
    },
    content_display_text_up: {
        fontSize: responsiveFontSize(1.5),
        fontFamily: Font_poppins.Regular_font,
        color: Colors.Text_pink_color,
        // alignSelf: 'center',
        // alignSelf: 'center',

    },
    content_display_text_down: {
        fontSize: responsiveFontSize(1.3),
        width: responsiveScreenWidth(),
        fontFamily: Font_poppins.Regular_font,

    },

    experience_display_text_middle: {
        color: Colors.Text_base_color,
        fontFamily: Font_poppins.SemiBold_font,
        fontSize: responsiveFontSize(1.8),
        // alignSelf: 'center',
        verticalAlign: 'middle'

    },

    whats_text_view: {
        flexDirection: 'row',
        // backgroundColor:'yellow'
        marginTop: 5
    },
})

export default ViewAll