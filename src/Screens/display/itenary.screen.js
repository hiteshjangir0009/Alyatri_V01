import { BackHandler, Dimensions, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Custom_Header, Page_name } from '../../Utils/Headers'
import { addListener } from '@reduxjs/toolkit'
import FastImage from 'react-native-fast-image'
import { Images } from '../../Utils/Constants/Images'
import { Colors } from '../../Utils/Constants/Colors'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { Font_poppins } from '../../Utils/Constants/fonts'

const Itenary_display = ({ navigation }) => {


    // hardware back handler
    useEffect(() => {
        const backAction = () => {
            navigation.goBack()
            return true
        }
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        )
        return () => backHandler.remove()
    }, [])


    return (
        <SafeAreaView style={{ flex: 1 }}>

            {/* header */}
            <View>
                <Custom_Header nav={navigation} CustomNav={true} />

            </View>
            {/* container */}
            <ScrollView>

                <View style={styles.container}>
                    {/* trip name */}
                    <View style={styles.heading_container}>
                        <Text style={styles.heading_text}>
                            Dubai
                        </Text>
                    </View>


                    {/* trip dates */}
                    <View style={styles.dates_container}>
                        <Text style={styles.dates_text}>
                            Start date --{'>'} 23-01-2025
                        </Text>
                        <Text style={styles.dates_text}>
                            End date --{'>'} 23-01-2025
                        </Text>
                    </View>


                    {/* trip details */}
                    <View style={styles.detail_container}>

                        <Text style={{
                            color: Colors.Text_blue_color,
                            fontSize: responsiveFontSize(2.5),
                            fontFamily: Font_poppins.SemiBold_font
                        }}>
                            Your selected trips
                        </Text>
                        <FlatList
                        scrollEnabled={false}
                        showsVerticalScrollIndicator={false}
                            data={[1, 1, 1, 1]}
                            renderItem={({ item }) => (
                                <View style={styles.flatList_details}>
                                    <FastImage
                                        style={styles.detail_image}
                                        source={Images.Background}
                                    />
                                    <View style={styles.details_text_container}>
                                        <Text style={styles.detail_text_up}>up</Text>
                                        <Text style={styles.detail_text_down}>down</Text>
                                    </View>
                                </View>
                            )}
                        />
                    </View>

                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10
    },

    heading_container: {
        marginVertical: 10
    },
    heading_text: {
        color: Colors.Text_pink_color,
        fontSize: responsiveFontSize(4),
        fontFamily: Font_poppins.SemiBold_font
    },

    dates_container: {},
    dates_text: {
        color: Colors.Text_base_color,
        fontSize: responsiveFontSize(2),
        fontFamily: Font_poppins.Medium_font
    },

    detail_container: {
        flex: 1,
        marginTop: 20
    },
    shadow_container: {
        marginVertical: 10,  // Adds space around the item
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 4 }, // Horizontal & Vertical shadow
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8, // For Android
        backgroundColor: 'transparent', // Needed to make shadow visible
        borderRadius: 40, // Match the child container for smooth shadow edges
    },
    flatList_details: {
        overflow: 'hidden',
        borderTopRightRadius: 40,
        borderBottomLeftRadius: 40,
        backgroundColor: Colors.Background_color,
        marginVertical: 10,
    },
    detail_image: {
        height: Dimensions.get('window').height / 3,
        width: Dimensions.get('screen')
    },
    details_text_container: {
        marginHorizontal: 20,
        marginVertical: 15
    },
    detail_text_up: {
        color: Colors.Text_base_color,
        fontSize: responsiveFontSize(1.8),
        fontFamily: Font_poppins.Medium_font
    },
    detail_text_down: {
        color: Colors.Text_grey_color,
        fontSize: responsiveFontSize(1.5),
        fontFamily: Font_poppins.Medium_font
    },
})

export default Itenary_display