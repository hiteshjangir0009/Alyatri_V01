import { BackHandler, Dimensions, ScrollView, Share, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {Custom_Header} from '../../Utils/Headers'
import { Colors } from '../../Utils/Constants/Colors'
import { Font_poppins } from '../../Utils/Constants/fonts'
import { responsiveFontSize, responsiveScreenHeight } from 'react-native-responsive-dimensions'
import { useRoute } from '@react-navigation/native'
import { API_url, getApi, Img_url } from '../../Utils/Constants/API_config'
import { useSelector } from 'react-redux'
import FastImage from 'react-native-fast-image'
import MapView, { Marker } from 'react-native-maps'
import Custom_button from '../../Utils/Buttons'
import Modal from 'react-native-modal'
import { Loader } from '../../Utils/Loader'

const Booking = ({ navigation }) => {
    const [Data, setData] = useState([])
    const [ModalState, setModalState] = useState(false)
    const [Itsfree, setItsfree] = useState(false)
    const [Loading, setLoading] = useState(true)

    const routes = useRoute()
    const { Id, Type } = routes.params

    const token = useSelector((state) => state.Token_Reducer)
    const lang = useSelector((state) => state.Language_Reducer)

    // back button handler
    useEffect(() => {
        const backAction = () => {
            // setstate(true)
            navigation.goBack()
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, [])

    useEffect(() => {
        API_Data()
    }, [])

    const API_Data = async () => {
        const _id = Id


        let api_url = ''
        if (Type == 'Event') {
            api_url = 'Events'
        }
        if (Type == 'offer') {
            api_url = 'banners'
        }
        if (Type == 'place') {
            api_url = 'Places'
        }

        const url = `${API_url[api_url]}/${_id}`
        console.log("id ==>>", Type);
        console.log("apiurl ==>>", api_url);

        try {
            const response = await getApi(url, token)
            console.log("response ==>>", response.data);


            const data = [response.data]
            const status = data.map((e) => e.isPaid)
            console.log("its free ==>>", status);

            if (!status) {
                setItsfree(true)
            }


            setData([response.data])
            setLoading(false)

        } catch (error) {
            console.log("Booking_error ==>>", error);

        }
    }

    // modal content
    const ModalContent = React.memo(({ onClose }) => (
        <View style={styles.modal_container}>
            {/*Header*/}
            <View>
                <Text style={styles.Modal_header_text}>
                    Ticket booking
                </Text>
            </View>
            <View>

            </View>
        </View>
    ));
    // const maped_data = Data.map((e)=>(e))


    return (
        <>
            <SafeAreaView
                style={{ flex: 1, backgroundColor: Colors.Primary_color }}>

                {/* header */}
                <View>
                    <Custom_Header nav={navigation} />
                </View>

                {Loading ?
                    (
                        <View style={{
                            flex: 1,
                            backgroundColor: Colors.Primary_color,
                            justifyContent: 'center',
                            alignItems: 'center',
                            // alignSelf:'center'
                        }}>
                            <Loader />
                        </View>
                    )
                    :
                    (
                        <>
                            {/* container */}
                            <ScrollView>

                                {
                                    Data.map((item) => (
                                        <View key={item._id} style={styles.container}>

                                            {/* display image */}
                                            <View style={styles.display_image_container}>
                                                <FastImage
                                                    style={styles.display_image}
                                                    source={{ uri: `${Img_url}${item.image}` }}
                                                />
                                            </View>

                                            {/* title and description text */}
                                            <View style={styles.text_container}>
                                                <Text style={styles.title_text}>
                                                    {item.title[lang]}
                                                </Text>
                                                <Text style={styles.description_text}>
                                                    {item.description[lang]}
                                                </Text>
                                            </View>

                                            {/* map */}
                                            <View>
                                                <View 
                                                style={{
                                                    flexDirection:'row',
                                                    justifyContent:'space-between',
                                                    marginVertical:10
                                                }}>
                                                    <Text style={styles.map_header_text}>
                                                        Location
                                                    </Text>
                                                    <View style={styles.share_button_container}>
                                                        <Text 
                                                        style={styles.share_button_button}
                                                        onPress={() => Share.share({ message: `AlYatri\n${item.title[lang]}\n${item.description[lang]}\nhttps://www.google.com/maps?q=${item.location.latitudes},${item.location.longitudes}` })}>
                                                            Share
                                                        </Text>

                                                    </View>
                                                </View>



                                                <View style={styles.map_container}>
                                                    <MapView
                                                        provider='google'
                                                        style={{
                                                            height: responsiveScreenHeight(25),
                                                            width: Dimensions.get('screen'),
                                                        }}
                                                        // ref={mapRef}
                                                        loadingEnabled={true}
                                                        loadingIndicatorColor={'#00000050'}
                                                        showsCompass={true}
                                                        mapType="standard"
                                                        initialRegion={{
                                                            latitude: item.location.latitude,
                                                            longitude: item.location.longitude,
                                                            latitudeDelta: 0.03,
                                                            longitudeDelta: 0.03,
                                                        }}
                                                    >
                                                        <Marker
                                                            coordinate={{
                                                                latitude: item.location.latitude,
                                                                longitude: item.location.longitude,
                                                            }}
                                                        ></Marker>
                                                    </MapView>

                                                </View>


                                            </View>

                                            {/* address */}
                                            <View style={styles.address_container}>

                                                <Text style={styles.address_Header_text}>
                                                    Address
                                                </Text>
                                                <Text style={styles.address_text}>
                                                    {item.location.addressData}
                                                </Text>
                                            </View>
                                        </View>

                                    ))
                                }
                            </ScrollView>

                            {/* view button */}
                            <View style={styles.booking_button_container}>
                                <Custom_button
                                    text={Itsfree ? 'Its free to explore' : "Book your tickets"}
                                    onPress={() => Itsfree ? null : setModalState(true)} />
                            </View>
                        </>

                    )
                }

            </SafeAreaView>

            {/* modal */}
            <View>
                <Modal
                    isVisible={ModalState}
                    swipeDirection="down"
                    style={{
                        justifyContent: 'flex-end',
                        margin: 0,
                    }}
                    onSwipeComplete={() => setModalState(false)}
                    onBackButtonPress={() => setModalState(false)}
                    onBackdropPress={() => setModalState(false)}
                >
                    <ModalContent onClose={() => setModalState(false)} />
                </Modal>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    booking_button_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        margin: 10,
        elevation: 5
    },
    booking_button_button: {
        backgroundColor: Colors.tab_background_color,
        borderRadius: 10,
        paddingVertical: 5,

    },
    booking_button_text: {
        color: Colors.Text_base_color,
        fontFamily: Font_poppins.SemiBold_font,
        fontSize: responsiveFontSize(2.5),
        textAlign: 'center'
    },

    container: {
        marginHorizontal: 10,
        marginTop: 10
    },

    display_image_container: {
        borderTopLeftRadius: 60,
        borderBottomRightRadius: 60,
        overflow: 'hidden', // Ensures the shadow respects the border radius
    },
    display_image: {
        height: responsiveScreenHeight(40),
        width: Dimensions.get('screen'),
        
    },

    text_container: {
        marginVertical: 10
    },
    title_text: {
        color: Colors.Text_pink_color,
        fontSize: responsiveFontSize(3),
        fontFamily: Font_poppins.SemiBold_font

    },
    description_text: {
        color: Colors.Text_base_color,
        fontSize: responsiveFontSize(1.5),
        fontFamily: Font_poppins.Medium_font

    },

    map_container: {
        height: responsiveScreenHeight(25),
        width: Dimensions.get('screen'),
        backgroundColor: '#fff',
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,
        overflow: 'hidden',
        elevation: 10,
        shadowColor: '#000'
    },
    map_header_text: {
        color: Colors.Text_base_color,
        fontSize: responsiveFontSize(2.5),
        fontFamily: Font_poppins.SemiBold_font,
        alignSelf:'center'
    },
    share_button_container: {
        alignSelf:'center'
    },
    share_button_button: {
        color:Colors.Text_blue_color,
        fontSize:responsiveFontSize(2),
        fontFamily:Font_poppins.Medium_font,
       
    },
    address_container: {
        marginBottom: responsiveScreenHeight(10),
        marginTop: 20
    },
    address_Header_text: {
        color: Colors.Text_base_color,
        fontSize: responsiveFontSize(2.5),
        fontFamily: Font_poppins.SemiBold_font

    },
    address_text: {
        color: Colors.Text_base_color,
        fontSize: responsiveFontSize(1.5),
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
})

export default Booking