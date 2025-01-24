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
import Map from '../../Utils/Map'
import MapView, { Marker } from 'react-native-maps'
import Custom_button from '../../Utils/Buttons'
import Modal from 'react-native-modal'

const Blog = ({ navigation }) => {
    const [Data, setData] = useState([])
    const [ModalState, setModalState] = useState(false)

    const routes = useRoute()
    const { Id } = routes.params

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
        const url = `${API_url.Events}/${_id}`
        console.log("id ==>>", _id);

        try {
            const response = await getApi(url, token)
            console.log("response ==>>", response.data);

            setData([response.data])

        } catch (error) {
            console.log("Booking_error ==>>", error);

        }
    }
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
                            </View>

                        ))
                    }
                </ScrollView>

                {/* view button */}
                <View style={styles.booking_button_container}>
                    <Custom_button text={"Share"} onPress={() => setModalState(true)} />
                </View>


            </SafeAreaView>
            
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
    },
    display_image: {
        height: responsiveScreenHeight(40),
        width: Dimensions.get('screen'),
        borderTopLeftRadius: 60,
        borderBottomRightRadius: 60
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

})

export default Blog