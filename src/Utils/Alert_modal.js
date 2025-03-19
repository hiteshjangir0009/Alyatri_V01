import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import { Colors } from './Constants/Colors'
import { responsiveFontSize, responsiveScreenHeight } from 'react-native-responsive-dimensions'
import { Font_poppins } from './Constants/fonts'
import Custom_button from './Buttons'

export const Alert_modal = ({ Visible, onClose,Message }) => {
    return (
        <View>
            <Modal
                isVisible={Visible}
                onBackdropPress={() => !Visible}
                onBackButtonPress={() => !Visible}
                animationIn='slideInUp'
                swipeDirection="down"
                style={{
                    justifyContent: 'center',
                    margin: 0,
                    height: '100%',
                }}
                onSwipeComplete={onClose}
            >
                <View style={styles.container}>
                    <Text style={styles.text}>{Message}</Text>
                    <View style={styles.Button}>
                        <Custom_button text="Close" onPress={onClose} />

                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: responsiveScreenHeight(20),
        backgroundColor: Colors.Primary_color,
        marginHorizontal: 20,
        borderTopLeftRadius: 40,
        borderBottomRightRadius: 40,

    },
    text: {
        flex: 0.6,
        color: Colors.Text_base_color,
        fontSize: responsiveFontSize(2),
        fontFamily: Font_poppins.SemiBold_font,
        // backgroundColor: 'red',
        textAlign: 'center',
        alignSelf:'center',
        verticalAlign:'middle',
        marginVertical:10,
        marginHorizontal:30
    },
    Button: {
        flex: 0.4,
        bottom: 0,
        marginHorizontal: 30,
    },
})