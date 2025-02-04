import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Custom_Header, Page_name } from '../../Utils/Headers'
import { useSelector } from 'react-redux'
import { Sub_Category_layout } from '../../Utils/SubCategory'
import { Colors } from '../../Utils/Constants/Colors'
import { Images } from '../../Utils/Constants/Images'
import { responsiveFontSize, responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions'
import { Font_poppins } from '../../Utils/Constants/fonts'
import { month_data } from '../Home'
import Custom_button from '../../Utils/Buttons'

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

    const [SubCategory_id_Selected, setSubCategory_id_Selected] = useState('')
    const [Category_id_selected, setCategory_idselected] = useState('')
    const [selectedItems, setSelectedItems] = useState([]);

    const flatListRef = useRef(null);


    const lang = useSelector((state) => state.Language_Reducer)
    const token = useSelector((state) => state.Token_Reducer)

    const handleToggleItem = (item) => {
        setSelectedItems(prevItems => {
            if (prevItems.includes(item)) {
                // Remove item if already selected
                return prevItems.filter(i => i !== item);
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
                <Page_name name={'Itenary'} />
            </View>

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
                        data={data}
                        renderItem={({ item, index }) => (
                            <View style={styles.content}>
                                <Image
                                    style={styles.Image}
                                    source={Images.Background}
                                />
                                <View style={styles.text_container}>

                                    {/* upper */}
                                    <Text
                                        numberOfLines={1}
                                        style={styles.Upper_text}>
                                        upper
                                    </Text>

                                    {/* middle */}
                                    <Text
                                        numberOfLines={1}
                                        style={styles.middle_text}>
                                        {date()}
                                    </Text>

                                    {/* lower */}
                                    <Text
                                        numberOfLines={2}
                                        style={styles.lower_text}>
                                        lower assasasa sa dasd asd asd s d sad sad sad sa d sd s ds ad sa dsa ds ad s ds d sad sa das
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
                    />
                </View>
            </View>
            {/* done button */}
            <View style={styles.done_container}>
                <Custom_button text={'Done'} onPress={()=>navigation.goBack()}/>

            </View>


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