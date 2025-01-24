import { forwardRef, useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { Font_poppins } from "./Constants/fonts";
import { responsiveFontSize, responsiveScreenWidth } from "react-native-responsive-dimensions";
import { Colors } from "./Constants/Colors";

const { width } = Dimensions.get('window');

export const Sub_Category_layout = forwardRef(({ Data, Selected, onPress }, ref) => {
  const [subCategoryScrollIndex, setSubCategoryScrollIndex] = useState(0);
  const lang = useSelector((state) => state.Language_Reducer);
  
  // Find the index of the selected item
  useEffect(() => {
    if (Selected && Data.length > 0) {
      const selectedIndex = Data.findIndex(item => item._id === Selected);
      if (selectedIndex !== -1) {
        // Scroll to the selected item with a slight delay to ensure component is mounted
        setTimeout(() => {
          ref?.current?.scrollToIndex({
            index: selectedIndex,
            animated: false,
            viewPosition: 0.5 // Center the item
          });
          setSubCategoryScrollIndex(selectedIndex);
        }, 100);
      }
    }
  }, [Selected, Data]);

  // Calculate item layout for better scroll performance
  const getItemLayout = (data, index) => ({
    length: responsiveScreenWidth(30), // Adjust based on your item width
    offset: responsiveScreenWidth(30) * index,
    index,
  });

  // Handle scroll failures
  const handleScrollToIndexFailed = (info) => {
    const wait = new Promise(resolve => setTimeout(resolve, 500));
    wait.then(() => {
      if (ref?.current) {
        ref.current.scrollToIndex({
          index: info.index,
          animated: false,
          viewPosition: 0.5
        });
      }
    });
  };

  return (
    <FlatList
      ref={ref}
      data={Data}
      horizontal
      showsHorizontalScrollIndicator={false}
      initialScrollIndex={subCategoryScrollIndex}
      getItemLayout={getItemLayout}
      onScrollToIndexFailed={handleScrollToIndexFailed}
      renderItem={({ item, index }) => (
        <View style={styles.sub_categories_container}>
          <TouchableOpacity
            onPress={() => onPress(item)}
          >
            <Text
              style={[
                styles.sub_categories_text,
                {
                  color: Selected === item._id 
                    ? Colors.sub_catgory_active_color 
                    : Colors.Text_grey_color,
                },
              ]}
            >
              {item.name[lang]}
            </Text>
          </TouchableOpacity>
        </View>
      )}
      keyExtractor={(item) => item._id}
    />
  );
});

const styles = StyleSheet.create({
  sub_categories_container: {
    marginVertical: 20,
    marginHorizontal: 10,
    // width: responsiveScreenWidth(30), // Fixed width for better scroll calculation
  },
  sub_categories_text: {
    color: Colors.Text_grey_color,
    fontFamily: Font_poppins.Medium_font,
    fontSize: responsiveFontSize(1.7),
    textAlign: 'center',
  },
});