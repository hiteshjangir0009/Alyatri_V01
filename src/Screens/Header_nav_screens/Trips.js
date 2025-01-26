import { BackHandler, Dimensions, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { responsiveFontSize, responsiveScreenHeight } from 'react-native-responsive-dimensions'
import { Colors } from '../../Utils/Constants/Colors'
import { Font_poppins } from '../../Utils/Constants/fonts'
import { Custom_Header, Page_name } from '../../Utils/Headers'
import { Images } from '../../Utils/Constants/Images'
import { HeaderNav_lang } from '../../Utils/Constants/Language_content'
import { useSelector } from 'react-redux'
import Custom_button from '../../Utils/Buttons'
import Modal from 'react-native-modal'
import Calendar from 'react-native-calendar-range-picker';
import { useRoute } from '@react-navigation/native'


const Trips = ({ navigation }) => {
    const Navigation = navigation.navigate
    const select_text = [HeaderNav_lang.MyTrips[lang], HeaderNav_lang.Guides[lang]]
    const [TripName, setTripName] = useState('')
    const [selected, setselected] = useState('')
    const [Start_date, setStart_date] = useState('')
    const [End_date, setEnd_date] = useState('')
    const [Data, setData] = useState([])
    const [Modal_state, setModal_state] = useState(false)
    const [Calender_modal, setCalender_modal] = useState(false)

    const route = useRoute()
    const { payLoad } = route.params

    // backbutton handle
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
        setdate()
    }, [])

    const setdate = () => {
        const today = new Date().toISOString().split('T')[0];
        const twoDaysLater = addDaysToDate(today, 2);
        setStart_date(today);
        setEnd_date(twoDaysLater);
        console.log("today ==>>", today);
        console.log("today +2 ==>>", twoDaysLater);

    }

    // Function to add days and format as ISO date
    const addDaysToDate = (dateString, daysToAdd) => {
        if (!dateString) return '';

        const date = new Date(dateString);
        date.setDate(date.getDate() + daysToAdd);
        return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD
    };

    const lang = useSelector((state) => state.Language_Reducer)


    const fetch_data = async (item = HeaderNav_lang.MyTrips[lang]) => {
        // setselected(item)xs

        console.log("data ==>>", selected);

        if (item == HeaderNav_lang.MyTrips[lang]) {
            setData([])
        } else {
            setData([])
        }

    }

    // modal content
    const ModalContent = React.memo(({ onClose }) => (
        <View style={styles.modal_container}>
            {/*Header*/}
            <View>
                <Text style={styles.Modal_header_text}>
                    Make your travel itinerary
                </Text>
            </View>

            {/* form data */}
            <View style={styles.form_container}>
                {/* name */}
                <View>
                    <Text style={styles.form_header_text}>
                        Name your trip
                    </Text>
                    <TextInput
                        placeholder='e.g. Dubai trip'
                        placeholderTextColor={Colors.Text_grey_color}
                        style={styles.form_input}
                        value={TripName}
                        onChangeText={(val) => setTripName(val)}
                    />
                </View>


                {/* select date */}
                <View style={styles.date_container}>

                    <Text style={styles.form_header_text}>
                        Select Date
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: "space-around",
                            marginVertical: 10
                        }}>
                        {/* start */}
                        <View>
                            <Text style={{
                                alignSelf: 'flex-start',
                                color: Colors.Text_base_color,
                                fontFamily: Font_poppins.Medium_font,
                                fontSize: responsiveFontSize(1.5),
                                marginHorizontal: 10

                            }}>
                                From
                            </Text>
                            <Text
                                onPress={() => setCalender_modal(true)}
                                style={styles.date_text}>
                                {Start_date.split('-').reverse().join('-')}
                            </Text>
                        </View>


                        {/* end */}
                        <View>
                            <Text style={{
                                alignSelf: 'flex-start',
                                color: Colors.Text_base_color,
                                fontFamily: Font_poppins.Medium_font,
                                fontSize: responsiveFontSize(1.5),
                                marginHorizontal: 10
                            }}>
                                To
                            </Text>
                            <Text style={styles.date_text}>
                                {End_date.split('-').reverse().join('-')}
                            </Text>
                        </View>
                    </View>


                </View>

                {/* choose trip */}
                <View style={styles.button_container}>
                    <Custom_button text={'Select places & events'} onPress={() => {
                        setModal_state(false)
                        setTimeout(() => {
                            Navigation('itenary')
                        }, 350)

                    }} />
                </View>
            </View>
        </View>
    ));

    if (Calender_modal == true) {
        return (
            <View>
                <Calendar
                    initialNumToRender={2}
                    futureYearRange={1}
                    disabledBeforeToday={false}
                    isMonthFirst={true}
                    onChange={({ startDate, endDate }) => {
                        setStart_date(startDate)
                        setEnd_date(endDate)
                        if (startDate && endDate) {
                            setCalender_modal(false);
                        }
                        console.log({ startDate, endDate })
                    }}
                />
            </View>
        )
    }


    return (
        <>
            <SafeAreaView>

                {/* header */}
                <View style={{ flexGrow: 1 }}>
                    <Custom_Header nav={navigation} activity={'trips'} CustomNav={payLoad == 'setting' ? true : false} />
                    <Page_name name={HeaderNav_lang.Trips[lang]} />
                </View>


                {/* data selector */}
                <View style={styles.DBselector}>
                    <TouchableOpacity
                        // key={index}
                        onPress={() => {
                            // setselected(item)
                            fetch_data()

                        }}
                        style={[styles.DBselector_text, { backgroundColor: selected == HeaderNav_lang.MyTrips[lang] ? Colors.button_background_color : Colors.Primary_color }]}>
                        <Text style={{ color: selected == HeaderNav_lang.MyTrips[lang] ? Colors.Text_white_color : Colors.Text_base_color }}>
                            {HeaderNav_lang.MyTrips[lang]}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        // key={index}
                        onPress={() => {
                            // setselected(item)
                            fetch_data()

                        }}
                        style={[styles.DBselector_text, { backgroundColor: selected == HeaderNav_lang.Guides[lang] ? Colors.button_background_color : Colors.Primary_color }]}>
                        <Text style={{ color: selected == HeaderNav_lang.Guides[lang] ? Colors.Text_white_color : Colors.Text_base_color }}>
                            {HeaderNav_lang.Guides[lang]}
                        </Text>
                    </TouchableOpacity>
                </View>


                {/* container */}
                <View style={styles.container}>

                    {
                        Data.length == 0 ? (
                            // create Itenary
                            <View style={styles.I_create_container}>
                                <Text style={styles.I_create_text}>
                                    Create your trip itinerary
                                </Text>
                                <Custom_button text={"Create"} onPress={() => setModal_state(true)} />
                            </View>
                        ) : (
                            <FlatList

                                data={Data}
                                renderItem={({ item }) => (
                                    <View style={styles.trip_box}>
                                        <Text numberOfLines={2} style={styles.trip_text_up}>
                                            Trip
                                        </Text>
                                        <View style={styles.date_container}>
                                            <Image
                                                style={{ width: 17, height: 17 }}
                                                source={Images.Calender_icon} />
                                            <Text style={styles.trip_text_down}>
                                                30-12-2021
                                            </Text>
                                        </View>


                                    </View>
                                )}
                                ListFooterComponent={<View style={{ height: responsiveScreenHeight(25) }} />}

                            />
                        )
                    }

                </View>


            </SafeAreaView>

            {/* modal */}
            <View>
                <Modal
                    isVisible={Modal_state}
                    swipeDirection="down"
                    style={{
                        justifyContent: 'flex-end',
                        margin: 0,
                    }}
                    onSwipeComplete={() => setModal_state(false)}
                    onBackButtonPress={() => setModal_state(false)}
                    onBackdropPress={() => setModal_state(false)}
                >
                    <ModalContent onClose={() => setModal_state(false)} />
                </Modal>
            </View>
        </>
    )
}

export default Trips

const styles = StyleSheet.create({
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

    container: {
        // flex:1,
        flexGrow: 3,
        zIndex: 1,
        height: Dimensions.get('screen').height,
        backgroundColor: Colors.Primary_color,
        justifyContent: 'center',  // Add this to center vertically
        alignItems: 'center',

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
        fontFamily: Font_poppins.Regular_font,
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

    I_create_container: {
        justifyContent: 'center',   // Ensure internal content is centered
        // alignItems: 'center',        // Ensure internal content is centered

    },
    I_create_text: {
        // backgroundColor:'yellow',
        color: Colors.Text_grey_color,
        fontSize: responsiveFontSize(2),
        marginBottom: 20,
        fontFamily: Font_poppins.Medium_font
    },

    modal_container: {
        height: Dimensions.get('window').height / 2, // Adjust modal height
        backgroundColor: Colors.Primary_color,
        borderTopLeftRadius: 20, // Optional: Rounded top corners
        borderTopRightRadius: 20, // Optional: Rounded top corners
        padding: 20, // Optional: Padding inside the modal
    },
    Modal_header_text: {
        color: Colors.Text_base_color,
        fontSize: responsiveFontSize(2),
        fontFamily: Font_poppins.SemiBold_font
    },

    form_container: {
        marginVertical: 20
    },

    form_header_text: {
        color: Colors.Text_base_color,
        fontSize: responsiveFontSize(1.7),
        fontFamily: Font_poppins.Medium_font
    },
    form_input: {
        color: Colors.Text_base_color,
        fontSize: responsiveFontSize(1.5),
        fontFamily: Font_poppins.Regular_font,
        backgroundColor: Colors.Background_color,
        borderTopRightRadius: 15,
        borderBottomLeftRadius: 15,
        elevation: 7,
        paddingHorizontal: 10
    },

    date_container: {
        marginTop: 20
    },
    date_text: {
        color: Colors.Text_base_color,
        fontSize: responsiveFontSize(1.5),
        fontFamily: Font_poppins.Medium_font,
        backgroundColor: Colors.Background_color,
        paddingHorizontal: 40,
        paddingVertical: 10,
        elevation: 7,
        borderRadius: 10
    },
    button_container: {
        marginVertical: responsiveScreenHeight(8),
        bottom: 0,
        shadowColor: '#000',
        borderRadius: 10,
        // elevation: 5

    },
})