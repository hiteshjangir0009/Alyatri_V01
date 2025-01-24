import { BackHandler, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Colors } from "./Constants/Colors"
import { responsiveFontSize, responsiveScreenHeight } from "react-native-responsive-dimensions"
import { Font_poppins } from "./Constants/fonts"
import { SafeAreaView } from "react-native-safe-area-context"
import React, { useEffect } from "react"
import { Images } from "./Constants/Images"


export const navdata = [
    {
        id: 1,
        image: Images.Search_icon,
        nav: 'search'
    },
    {
        id: 2,
        image: Images.Trips_icon,
        nav: 'trips'
    },
    {
        id: 3,
        image: Images.Favourite_icon,
        nav: 'favourite'
    },
    {
        id: 4,
        image: Images.User_icon,
        nav: 'profile'
    },
]


export const Custom_Header = ({ name, nav, activity, Logo, CustomNav }) => {
    // back button handler
    // useEffect(() => {
    //     const backAction = () => {
    //         // setstate(true)
    //         nav.goBack()
    //         return true;
    //     };

    //     const backHandler = BackHandler.addEventListener(
    //         'hardwareBackPress',
    //         backAction,
    //     );

    //     return () => backHandler.remove();
    // }, [nav])


    return (
        <SafeAreaView>

            {/* statusbar */}
            <View>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor={Colors.base_color}
                />
            </View>

            {/* header */}
            <View style={[styles.header, { paddingHorizontal: Logo ? 15 : 10 }]}>

                {/* back button */}
                <View style={styles.back_container}>


                    {name ? (
                        Logo ? (
                            <Text style={styles.Logo_text}>
                                {name}
                            </Text>
                        ) : (
                            <Text style={styles.header_text}>
                                {name}
                            </Text>
                        )

                    ) : (<TouchableOpacity
                        onPress={() => CustomNav ? nav.goBack():nav.popToTop()}
                    >
                        <Image
                            style={styles.back_image}
                            source={Images.Back_icon}
                        />
                    </TouchableOpacity>)}

                </View>

                {/* nav bar */}
                <View style={styles.nav_container}>
                    {
                        navdata.map((item) => (
                            <View key={item.id} style={styles.nav_sub_container}>
                                <TouchableOpacity
                                    onPress={() => nav.navigate(item.nav,{payLoad:item.nav})}
                                >
                                    <Image
                                        style={[styles.nav_image, { tintColor: activity === item.nav ? Colors.nav_bar_active : Colors.nav_bar_inactive }]}

                                        source={item.image}
                                    />
                                </TouchableOpacity>
                            </View>
                        ))
                    }
                </View>
            </View>


        </SafeAreaView>
    )
}

export const Page_name = ({name}) => {
    return (
        <View style={styles.page_name_container}>
            <Text style={styles.page_name_text}>
                {name}
            </Text>
        </View>
    )
}


const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // paddingHorizontal: 10,
        paddingVertical: 20,
        backgroundColor: '#f0f0f0',
        borderBottomRightRadius: 40
    },
    back_container: {
        alignSelf: 'center',
        // backgroundColor:'red'
    },
    logo_text: {
        fontSize: 25,
        fontWeight: '600'
    },
    nav_container: {
        flexDirection: 'row',
        // marginHorizontal:
        // backgroundColor:'yellow'
    },
    nav_sub_container: {
        marginLeft: 18,
        alignSelf: 'center'
    },
    back_image: {
        height: 30,
        width: 30
    },
    nav_image: {
        height: 18,
        width: 18,
        objectFit: 'scale-down'
    },
    header_text: {
        color: Colors.Text_base_color,
        fontSize: responsiveFontSize(3.5),
        fontFamily: Font_poppins.SemiBold_font,
        // backgroundColor:'green',
        verticalAlign: 'middle'
    },
    Logo_text: {
        color: Colors.Text_base_color,
        fontSize: responsiveFontSize(3),
        fontFamily: Font_poppins.Medium_font,
        // backgroundColor:'green',
        verticalAlign: 'middle'
    },
    page_name_container: {
        // zIndex: -1,
        // flexGrow: 2,
        marginTop: responsiveScreenHeight(1),
        marginHorizontal: 10
    },
    page_name_text: {
        color: Colors.Text_base_color,
        fontSize: responsiveFontSize(3.5),
        fontFamily: Font_poppins.SemiBold_font
    },

})

