import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Custom_Header, Page_name } from '../../Utils/Headers'
import { useSelector } from 'react-redux'
import { Sub_Category_layout } from '../../Utils/SubCategory'
import { Colors } from '../../Utils/Constants/Colors'
import { Images } from '../../Utils/Constants/Images'
import { responsiveFontSize, responsiveScreenHeight, responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions'
import { Font_poppins } from '../../Utils/Constants/fonts'
import { month_data } from '../Home'
import Custom_button from '../../Utils/Buttons'
import { itinerary_lang } from '../../Utils/Constants/Language_content'
import { useRoute } from '@react-navigation/native'
import { API_url, getApi, postApi } from '../../Utils/Constants/API_config'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry'
import { Loader } from '../../Utils/Loader'
import FastImage from 'react-native-fast-image'

const data = [
    {
        _id: 1,
        name: {
            en: "Places",
            hi: "मनोरंजन"
        },

        index: 1
    },
    {
        _id: 2,
        name: {
            en: "Events",
            hi: "मनोरंजन"
        },

        index: 2
    },
]

const Itenary = ({ navigation }) => {
    const Navigation = navigation.navigate

    const [SubCategory_id_Selected, setSubCategory_id_Selected] = useState(1)
    const [Category_id_selected, setCategory_idselected] = useState('')
    const [selectedItems, setSelectedItems] = useState([]);
    const [Data, setData] = useState([]);
    const [Loading, setLoading] = useState(true)
    const [NodataFound, setNodataFound] = useState(false)
    const [Page, setPage] = useState(1)



    const flatListRef = useRef(null);
    const route = useRoute()

    const { start_date, end_date, trip_name } = route.params
    const lang = useSelector((state) => state.Language_Reducer)
    const Token = useSelector((state) => state.Token_Reducer)

    console.log("trip ==>>",trip_name);
    
    useEffect(() => {
        API_fetch()
    }, [])

    const API_create_itenary = async () => {

        console.log("selected ==>>", selectedItems);

        const raw = JSON.stringify({
            "itemId": selectedItems,
            "startDate": `${start_date}`,
            "endDate": `${end_date}`,
            "tripName": trip_name,
            "type": "events"
        });


        try {
            const response = await postApi(API_url.Create_itinerary, raw, Token)
            console.log("API_reaponse ==>>", response);
            if (response.success == true) {
                navigation.goBack()
            }

        } catch (error) {
            console.log("itenary_error ==>>", error);

        }
    }

    const API_fetch = async () => {

        const url = `${API_url.Attractions}?page=${Page}&limit=10`

        try {
            const response = await getApi(url, Token)

            const fetch_data = response.data

            // if (fetch_data.length !== 0) {
            // console.log("len_fetchData ==>>", fetch_data.length);

            // if (Data.length > 0) {
            //     setData([...Data, ...fetch_data])


            // } else {
            setData(fetch_data)

            // }
            // } else {
            //     console.log("no data")
            //     setNodataFound(true)
            // }
            setLoading(false)


        } catch (error) {
            console.log("itenary_attraction_error ==>>", error);

        }
    }



    const handleToggleItem = (item) => {
        setSelectedItems(prevItems => {
            if (prevItems.includes(item)) {
                // Remove item if already selected
                return (prevItems.filter(i => i !== item))
            } else {
                // Add item if not selected
                return [...prevItems, item];
            }
        });
    };

    // date
    const date = (item = '2025-01-09 12:00 to 2025-01-15 12:00') => {


        const year = item.slice(0, 4)
        const month = item.slice(5, 7)
        const date = item.slice(8, 11)

        const month_name = month_data.find((e) => e.id === month)

        return `${date}${month_name.month}  ${year}`
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>

            {/* header */}
            <View>
                <Custom_Header nav={navigation} CustomNav={true} />
                <Page_name name={itinerary_lang.Heading[lang]} />
            </View>

            {Loading ? (
                <View style={{
                    backgroundColor: Colors.Primary_color,
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Loader />
                </View>
            ) : (<>
                {/* container */}
                <View style={styles.container}>

                    {/* sub category */}
                    <View>
                        <Sub_Category_layout
                            ref={flatListRef}
                            Data={data} // Pass the subcategories data
                            Selected={SubCategory_id_Selected} // Pass the currently selected subcategory ID
                            onPress={(item) => { // Define the onPress method
                                setSubCategory_id_Selected(item._id); // Update selected subcategory
                                // Home_filter_API({
                                //     Categoryitem: Category_id_selected,
                                //     SubCategoriesitem: item._id
                                // }); // Call API_data with the selected subcategory ID
                            }}
                        />
                    </View>

                    {/* content */}
                    <View style={{ marginHorizontal: 10 }}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            // onEndReached={(e) => {
                            //     console.log("test", e)
                            //     console.log("no_data ==>>", NodataFound)
                            //     if (!NodataFound) {
                            //         setPage(prevPage => prevPage + 1)
                            //         API_fetch()
                            //     }

                            // }}
                            // onEndReachedThreshold={1}
                            data={Data}
                            renderItem={({ item, index }) => (
                                <View style={styles.content}>
                                    <FastImage
                                        style={styles.Image}
                                        // source={Images.Background}
                                        source={
                                            item.photos && item.photos.length > 0 && item.photos[0].images?.original?.url
                                                ? { uri: item.photos[0].images.medium.url }
                                                : Images.Background // Use a default image when no valid image is available
                                        }
                                    />
                                    <View style={styles.text_container}>

                                        {/* upper */}
                                        <Text
                                            numberOfLines={1}
                                            style={styles.Upper_text}>
                                            {item?.details?.name || ''}
                                        </Text>

                                        {/* middle
                                        <Text
                                            numberOfLines={1}
                                            style={styles.middle_text}>
                                            {date()}
                                        </Text> */}

                                        {/* lower */}
                                        <Text
                                            numberOfLines={2}
                                            style={styles.lower_text}>
                                            {item?.details?.description || ''}
                                        </Text>

                                    </View>

                                    {/* selector */}
                                    <View style={{
                                        alignSelf: 'center'
                                    }}>
                                        <TouchableOpacity
                                            style={styles.checkboxContainer}
                                            onPress={() => handleToggleItem(item._id)} // Assuming your data has unique _id
                                        >
                                            <View style={[
                                                styles.checkbox,
                                                selectedItems.includes(item._id) && styles.checked
                                            ]}>
                                                {selectedItems.includes(item._id) && <View style={styles.checkmark} />}
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            )}
                            ListFooterComponent={<View style={{ height: responsiveScreenHeight(15) }} />}

                        />
                    </View>
                </View>
                {/* // done button */}
                <View style={styles.done_container}>
                    <Custom_button text={'Done'} onPress={() => API_create_itenary()} />

                </View>
            </>
            )}



        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.Primary_color
    },

    content: {
        backgroundColor: Colors.Background_color,
        marginBottom: 10,
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 30,
        flexDirection: 'row',
        overflow: 'hidden',
        justifyContent: 'space-between',

        elevation: 3,  // For Android
    },
    Image: {
        height: 90,
        width: 90,
    },
    text_container: {
        // backgroundColor: 'yellow',
        width: responsiveWidth(55)
    },
    Upper_text: {
        color: Colors.Text_pink_color,
        fontSize: responsiveFontSize(2),
        fontFamily: Font_poppins.SemiBold_font
    },
    middle_text: {
        color: Colors.Text_base_color,
        fontSize: responsiveFontSize(1.5),
        fontFamily: Font_poppins.Medium_font
    },
    lower_text: {
        color: Colors.Text_base_color,
        fontSize: responsiveFontSize(1.5),
        fontFamily: Font_poppins.Regular_font
    },

    checkboxContainer: {
        // backgroundColor: 'green',
        margin: 20
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: Colors.base_color,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checked: {
        backgroundColor: Colors.Background_color,
        borderColor: Colors.base_color,
    },
    checkmark: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: Colors.Text_blue_color,
    },

    done_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        margin: 10,
        elevation: 5,  // For Android
        shadowColor: '#000',  // For iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    done_button: {},
})

export default Itenary