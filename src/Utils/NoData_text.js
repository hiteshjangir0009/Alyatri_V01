import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { Font_poppins } from './Constants/fonts'
import { Colors } from './Constants/Colors'

export const NoData_text = () => {
    return (
        <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>No data available</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    // Add these to your existing styles object
    noDataContainer: {
        height: 150, // Match the height of your content items
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    noDataText: {
        fontFamily: Font_poppins.Regular_font,
        fontSize: responsiveFontSize(1.8),
        color: Colors.Text_grey_color,
    },
})