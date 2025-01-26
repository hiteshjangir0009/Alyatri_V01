import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '../../Utils/Constants/Colors'
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'
import { Font_poppins } from '../../Utils/Constants/fonts'
import { Images } from '../../Utils/Constants/Images'
import { useRoute } from '@react-navigation/native'
import { Custom_Header, Page_name } from '../../Utils/Headers'


const ViewAll = ({ navigation }) => {
    const sub_categories = ['Inspire', 'Food & Drinks', 'Sight & Attractions', 'Experience', 'Art & Cultture', 'Shopping']
    const [Sub_categoriesSelected, setSub_categoriesSelected] = useState('Inspire')

    const route = useRoute()
    const { page } = route.params

    console.log(page);

    // display text decider
    const text = () => {
        if (page == 'Trending now') {
            return (
                <View>
                    <Text style={styles.content_display_text_up}>
                        DSDSDSDSDSD
                    </Text>

                    <Text
                        numberOfLines={2}
                        style={styles.content_display_text_down}>
                        loremdf sfd frfrc dsdsdsdsdsd sdsdsdsdsdsdsdrtrtr tr tr trt rt r tr trsssdsdsd
                    </Text>
                </View>
            )
        }
        if (page == 'Experience') {
            return (
                <View>
                    <Text style={styles.content_display_text_up}>
                        DSDSDSDSDSD
                    </Text>

                    <Text style={styles.experience_display_text_middle}>
                        DSDSDSDSDSD
                    </Text>

                    <Text
                        numberOfLines={2}
                        style={styles.content_display_text_down}>
                        loremdf sfd frfrc dsdsdsdsdsd sdsdsdsdsdsdsdrtrtr tr tr trt rt r tr trsssdsdsd
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
                            Burj Khalifa
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
                        loremdf sfd frfrc dsdsdsdsdsd sdsdsdsdsdsdsdrtrtr tr tr trt rt r tr trsssdsdsd
                    </Text>
                </View>
            )
        }





    }

    return (
        <SafeAreaView>
            <ScrollView>

                {/* header */}
                <View>
                    <Custom_Header onPress={() => navigation.goBack()} nav={navigation}/>
                  <Page_name name={page} />
                </View>



                {/* container */}
                <View style={styles.container}>


                    {/* sub categories navbar */}
                    <View >
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            // scrollEnabled={false}
                            data={sub_categories}
                            horizontal
                            renderItem={({ item }) => (
                                <View
                                    style={styles.sub_categories_container}
                                >
                                    <TouchableOpacity
                                        onPress={() => {
                                            setSub_categoriesSelected(item)
                                        }}
                                    >
                                        <Text style={[
                                            styles.sub_categories_text,
                                            {
                                                color: Sub_categoriesSelected == item ? Colors.sub_catgory_active_color : Colors.Text_grey_color
                                            }
                                        ]}>
                                            {item}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )}

                        />
                    </View>


                    {/* content */}
                    <View style={styles.content_container}>
                        <FlatList
                            scrollEnabled={false}
                            data={[1, 1, 1, 1, 1]}
                            renderItem={({ item }) => (
                                <View style={styles.content_display}>
                                    <Image
                                        style={styles.content_display_image}
                                        source={Images.Background} />

                                    {text()}

                                </View>
                            )}
                            ListFooterComponent={<View style={{ height: responsiveScreenHeight(5) }} />}
                        />
                    </View>




                </View>

            </ScrollView>

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