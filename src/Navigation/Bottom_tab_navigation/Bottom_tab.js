import React from 'react';
import {
    Dimensions,
    Image,
    StyleSheet, Text, TouchableWithoutFeedback, View,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Images } from '../../Utils/Constants/Images';
import { Colors } from '../../Utils/Constants/Colors';
import Menu from '../../Screens/Menu';
import Offer from '../../Screens/Offer';
import Explore from '../../Screens/Explore';
import Event from '../../Screens/Event';
import Home from '../../Screens/Home';
import { responsiveFontSize, responsiveHeight, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { Font_poppins } from '../../Utils/Constants/fonts';


const tab = createBottomTabNavigator()

const Bottom_tab_navigation = () => {



    return (

        <tab.Navigator
            initialRouteName='home'
            backBehavior='none'
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: Colors.tab_background_color,
                    height: responsiveHeight(8),

                },
            }}
        >
            <tab.Screen

                options={{
                    tabBarButton: (props) => (
                        <TouchableWithoutFeedback {...props}>
                            <View style={props.style}>{props.children}</View>
                        </TouchableWithoutFeedback>
                    ),
                    tabBarIcon: ({ focused }) => (

                        <View style={styles.image_view}>

                            <Image
                                style={
                                    [
                                        styles.image_style,
                                        {
                                            tintColor: focused ? Colors.Tab_button_Active_color : Colors.Tab_button_Inactive_color
                                        }
                                    ]
                                }
                                source={Images.Home_icon}
                            />
                            <Text
                                style={[styles.text,
                                {
                                    color: focused ? Colors.Tab_button_Active_color : Colors.Tab_button_Inactive_color
                                }
                                ]}
                            >
                                Home
                            </Text>
                        </View>



                    )
                }}

                name='home' component={Home} />
            <tab.Screen
                options={{
                    tabBarButton: (props) => (
                        <TouchableWithoutFeedback {...props}>
                            <View style={props.style}>{props.children}</View>
                        </TouchableWithoutFeedback>
                    ),
                    tabBarIcon: ({ focused }) => (

                        <View style={styles.image_view}>

                            <Image
                                style={
                                    [
                                        styles.image_style,
                                        {
                                            tintColor: focused ? Colors.Tab_button_Active_color : Colors.Tab_button_Inactive_color,

                                        }
                                    ]
                                }
                                source={Images.Events_icon} />
                            <Text
                                style={[styles.text,
                                {
                                    color: focused ? Colors.Tab_button_Active_color : Colors.Tab_button_Inactive_color
                                }
                                ]}
                            >
                                Events
                            </Text>
                        </View>


                    )
                }}
                name='event' component={Event} />
            <tab.Screen
                options={{
                    tabBarButton: (props) => (
                        <TouchableWithoutFeedback {...props}>
                            <View style={props.style}>{props.children}</View>
                        </TouchableWithoutFeedback>
                    ),
                    tabBarIcon: ({ focused }) => (

                        <View style={styles.image_view}>

                            <Image
                                style={
                                    [
                                        styles.image_style,
                                        {
                                            tintColor: focused ? Colors.Tab_button_Active_color : Colors.Tab_button_Inactive_color,

                                        }
                                    ]
                                }
                                source={Images.Explore_icon} />
                            <Text
                                style={[styles.text,
                                {
                                    color: focused ? Colors.Tab_button_Active_color : Colors.Tab_button_Inactive_color
                                }
                                ]}
                            >
                                Explore
                            </Text>
                        </View>


                    )
                }}
                name='explore' component={Explore} />
            <tab.Screen
                options={{
                    tabBarButton: (props) => (
                        <TouchableWithoutFeedback {...props}>
                            <View style={props.style}>{props.children}</View>
                        </TouchableWithoutFeedback>
                    ),
                    tabBarIcon: ({ focused }) => (

                        <View style={styles.image_view}>

                            <Image
                                style={
                                    [
                                        styles.image_style,
                                        {
                                            tintColor: focused ? Colors.Tab_button_Active_color : Colors.Tab_button_Inactive_color,

                                        }
                                    ]
                                }
                                source={Images.Offers_icon} />
                            <Text
                                style={[styles.text,
                                {
                                    color: focused ? Colors.Tab_button_Active_color : Colors.Tab_button_Inactive_color
                                }
                                ]}
                            >
                                Offers
                            </Text>
                        </View>


                    )
                }}
                name='offer' component={Offer} />
            <tab.Screen
                options={{
                    tabBarButton: (props) => (
                        <TouchableWithoutFeedback {...props}>
                            <View style={props.style}>{props.children}</View>
                        </TouchableWithoutFeedback>
                    ),
                    tabBarIcon: ({ focused }) => (

                        <View style={styles.image_view}>

                            <Image
                                style={
                                    [
                                        styles.image_style,
                                        {
                                            tintColor: focused ? Colors.Tab_button_Active_color : Colors.Tab_button_Inactive_color

                                        }
                                    ]
                                }
                                source={Images.Menu_icon} />
                            <Text
                                style={[styles.text,
                                {
                                    color: focused ? Colors.Tab_button_Active_color : Colors.Tab_button_Inactive_color
                                }
                                ]}
                            >
                                Menu
                            </Text>
                        </View>


                    )
                }}
                name='menu' component={Menu} />
            {/* <tab.Screen name='menu' component={Menu_screen}/> */}
        </tab.Navigator>
    )
}

const styles = StyleSheet.create({
    image_style: {
        width: 22,
        height: 22,
        alignSelf: 'center',
        // backgroundColor: 'red'
    },
    image_view: {
        // height: ,
        marginTop:20,
        alignSelf: 'center',
        width: responsiveScreenWidth(16),
        // backgroundColor: 'yellow'
    },
    text: {

        marginTop:5,
        textAlign: 'center',
        fontSize: responsiveFontSize(1.2),
        fontFamily: Font_poppins.SemiBold_font,
    }
});


export default Bottom_tab_navigation;