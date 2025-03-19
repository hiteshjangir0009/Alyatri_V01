import { BackHandler, Dimensions, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth } from 'react-native-responsive-dimensions'
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
import { Alert_modal } from '../../Utils/Alert_modal'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry'
import { API_url, getApi } from '../../Utils/Constants/API_config'
import { month_data } from '../Home'
import { Loader } from '../../Utils/Loader'
import FastImage from 'react-native-fast-image'


const Trips = ({ navigation }) => {
    const Navigation = navigation.navigate
    const select_text = [HeaderNav_lang.Trips.MyTrips[lang], HeaderNav_lang.Trips.Guides[lang]]
    const [TripName, setTripName] = useState('')
    const [selected, setselected] = useState('')
    const [Start_date, setStart_date] = useState('')
    const [End_date, setEnd_date] = useState('')
    const [Data, setData] = useState([])
    const [Modal_state, setModal_state] = useState(false)
    const [Calender_modal, setCalender_modal] = useState(false)
    const [Visible, setVisible] = useState(false)
    const [Loading, setLoading] = useState(true)

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
        fetch_data(HeaderNav_lang.Trips.MyTrips[lang])
        setdate()
    }, [])

    const setdate = () => {
        const today = new Date().toISOString().split('T')[0];
        const twoDaysLater = addDaysToDate(today, 2);
        setStart_date(today);
        setEnd_date(twoDaysLater);
        // console.log("today ==>>", today);
        // console.log("today +2 ==>>", twoDaysLater);

    }

    // Function to add days and format as ISO date
    const addDaysToDate = (dateString, daysToAdd) => {
        if (!dateString) return '';

        const date = new Date(dateString);
        date.setDate(date.getDate() + daysToAdd);
        return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD
    };

    const lang = useSelector((state) => state.Language_Reducer)
    const Token = useSelector((state) => state.Token_Reducer)


    const fetch_data = async (item) => {
        setselected(item)
        // console.log("selected ==>>", item);

        if (item == HeaderNav_lang.Trips.MyTrips[lang]) {
            try {
                const response = await getApi(API_url.Get_itinerary, Token)
                console.log("response ==>>", response);
                setData(response.data)
                setTimeout(() => {
                    setLoading(false)

                }, 600)

            } catch (error) {
                console.log("trip_itenary_error ==>>", error)
            }
        } else {
            setData([])
            setLoading(false)
        }

    }


    // date formater
    const date = (item) => {
        // console.log(item)

        const S_item = item.startDate
        const E_item = item.endDate

        const S_year = S_item.slice(0, 4)
        const E_year = E_item.slice(0, 4)
        const S_month = S_item.slice(5, 7)
        const E_month = E_item.slice(5, 7)
        const S_date = S_item.slice(8, 10)
        const E_date = E_item.slice(8, 10)

        const S_month_name = month_data.find((e) => e.id === S_month)
        const E_month_name = month_data.find((e) => e.id === E_month)

        return `${S_date} ${S_month_name.month} ${S_year}  to  ${E_date} ${E_month_name.month} ${E_year}`
    }


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
            <SafeAreaView style={{ flex: 1 }}>

                {/* header */}
                <View >
                    <Custom_Header nav={navigation} activity={'trips'} CustomNav={payLoad == 'setting' ? true : false} />
                    <Page_name name={HeaderNav_lang.Trips.page_name[lang]} />
                </View>


                {/* data selector */}
                <View style={styles.DBselector}>
                    <TouchableOpacity
                        // key={index}
                        onPress={() => {
                            setLoading(true)
                            fetch_data(HeaderNav_lang.Trips.MyTrips[lang])

                        }}
                        style={[styles.DBselector_text, { backgroundColor: selected == HeaderNav_lang.Trips.MyTrips[lang] ? Colors.button_background_color : Colors.Primary_color }]}>
                        <Text style={{ color: selected == HeaderNav_lang.Trips.MyTrips[lang] ? Colors.Text_white_color : Colors.Text_base_color }}>
                            {HeaderNav_lang.Trips.MyTrips[lang]}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        // key={index}
                        onPress={() => {
                            setLoading(true)
                            fetch_data(HeaderNav_lang.Trips.Guides[lang])

                        }}
                        style={[styles.DBselector_text, { backgroundColor: selected == HeaderNav_lang.Trips.Guides[lang] ? Colors.button_background_color : Colors.Primary_color }]}>
                        <Text style={{ color: selected == HeaderNav_lang.Trips.Guides[lang] ? Colors.Text_white_color : Colors.Text_base_color }}>
                            {HeaderNav_lang.Trips.Guides[lang]}
                        </Text>
                    </TouchableOpacity>
                </View>

                {
                    Loading ? (
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: Colors.Primary_color
                            }}>
                            <Loader />
                        </View>
                    ) : (
                        // {/* container */}
                        <View style={styles.container}>
                            {
                                selected == HeaderNav_lang.Trips.MyTrips[lang] ? (
                                    <FlatList

                                        data={Data}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity
                                                onPress={() => { Navigation('itenary_display') }}
                                                style={styles.trip_box}>
                                                <Text numberOfLines={2} style={styles.trip_text_up}>
                                                    {item.tripName}
                                                </Text>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Image
                                                        style={{ width: 17, height: 17 }}
                                                        source={Images.Calender_icon} />
                                                    <Text style={styles.trip_text_down}>
                                                        {date(item)}
                                                    </Text>
                                                </View>


                                            </TouchableOpacity>
                                        )}
                                        ListFooterComponent={<View style={{ height: responsiveScreenHeight(10) }} />}

                                    />
                                ) : (
                                    <FlatList
                                        data={[1, 1, 1, 1]}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity
                                                onPress={() => { Navigation('itenary_display') }}
                                                style={[styles.trip_box, { flexDirection:'row' }]}>

                                                <FastImage
                                                    style={{
                                                        height: 80,
                                                        width: 80,
                                                        borderRadius:50,
                                                        overflow:'hidden',
                                                        alignSelf:'center'
                                                    }}
                                                    source={Images.Background} />

                                                <View style={{marginHorizontal:10}}>

                                                    <Text numberOfLines={1} style={styles.trip_text_up}>
                                                        name
                                                    </Text>
                                                    <View style={{}}>

                                                        <Text 
                                                        numberOfLines={1}
                                                        style={[styles.trip_text_down, { marginHorizontal: 0 }]}>
                                                            India
                                                        </Text>
                                                        <Text
                                                        numberOfLines={2}
                                                        style={[styles.trip_text_down, { marginHorizontal: 0 ,width:responsiveScreenWidth(60)}]}>
                                                            experience -- - -- --  -- - --- - - - - --- -- - -- - -- - -- - -- - - -- 
                                                        </Text>
                                                    </View>
                                                </View>



                                            </TouchableOpacity>
                                        )}
                                    />
                                )
                            }



                            {/* // create Itenary */}
                            <View style={styles.I_create_container}>
                                <Custom_button text={HeaderNav_lang.Trips.CreateYourItinerary[lang]} onPress={() => setModal_state(true)} />
                            </View>
                        </View>
                    )
                }





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
                    <View style={styles.modal_container}>
                        {/*Header*/}
                        <View>
                            <Text style={styles.Modal_header_text}>
                                {HeaderNav_lang.Trips.Modal.Header[lang]}
                            </Text>
                        </View>

                        {/* form data */}
                        <View style={styles.form_container}>
                            {/* name */}
                            <View>
                                <Text style={styles.form_header_text}>
                                    {HeaderNav_lang.Trips.Modal.Trip_name.heading[lang]}
                                </Text>
                                <TextInput
                                    placeholder={HeaderNav_lang.Trips.Modal.Trip_name.placeholder[lang]}
                                    placeholderTextColor={Colors.Text_grey_color}
                                    style={styles.form_input}
                                    value={TripName}
                                    keyboardAppearance='dark'
                                    keyboardType='default'

                                    onChangeText={(val) => {

                                        setTripName(val)
                                    }}
                                />
                            </View>


                            {/* select date */}
                            <View style={styles.date_container}>

                                <Text style={styles.form_header_text}>
                                    {HeaderNav_lang.Trips.Modal.Trip_date.heading[lang]}
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
                                            {HeaderNav_lang.Trips.Modal.Trip_date.From[lang]}
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
                                            {HeaderNav_lang.Trips.Modal.Trip_date.To[lang]}
                                        </Text>
                                        <Text style={styles.date_text}>
                                            {End_date.split('-').reverse().join('-')}
                                        </Text>
                                    </View>
                                </View>


                            </View>

                            {/* choose trip */}
                            <View style={styles.button_container}>
                                <Custom_button text={HeaderNav_lang.Trips.Modal.Button[lang]} onPress={() => {
                                    setTimeout(() => {
                                        if (TripName !== '') {

                                            Navigation('itenary',
                                                {
                                                    start_date: Start_date, end_date: End_date, trip_name: TripName
                                                }
                                            )
                                            setTripName('')
                                            setModal_state(false)

                                        } else {
                                            // setModal_state(false)
                                            setVisible(true)
                                        }

                                    }, 350)

                                }} />
                            </View>
                        </View>
                    </View>
                </Modal>
                <Alert_modal Message={'All fields are required'} onClose={() => setVisible(false)} Visible={Visible} />

            </View>
        </>
    )
}

export default Trips

const styles = StyleSheet.create({


    container: {
        flex: 1,
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
    // guide_text_down: {
    //     color: Colors.Text_base_color,
    //     fontSize: responsiveFontSize(1.5),
    //     fontFamily: Font_poppins.Medium_font,
    //     marginHorizontal: 10
    // },
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
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        margin: 10
    },
    I_create_text: {

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