import { Dimensions, Image, View } from "react-native"
import FastImage from "react-native-fast-image"
import { Images } from "./Constants/Images"
import { responsiveScreenHeight, responsiveScreenWidth } from "react-native-responsive-dimensions"

const {height,width} =Dimensions.get('screen')
export const Loader = ()=>{
    return(
        <View 
        style={{
            // flex:1,
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:'#fff'
        }}>
            <FastImage
            style={{
                height:responsiveScreenHeight(30),
                width:responsiveScreenWidth(40),
                
            }}
            source={Images.Loader_animated}
            />
        </View>
    )
}