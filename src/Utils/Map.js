import React, { useEffect, useRef } from 'react';
import { Dimensions, Image, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Images } from './Constants/Images';
import { Colors } from './Constants/Colors';

const { width, height } = Dimensions.get('window');

const Map = ({ coordinates, title, Markers = [] }) => {
    const mapRef = useRef(null);
    const markerOffset = -0.003;

    useEffect(() => {
        if (mapRef.current) {
            const { latitude, longitude } = coordinates;

            mapRef.current.animateToRegion(
                {
                    latitude: latitude + markerOffset,
                    longitude: longitude,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                },
                1000
            );
        }
    }, [coordinates]);

    return (
        <View>
            <MapView
                style={{
                    height: height,
                    width: width,
                }}
                ref={mapRef}
                loadingEnabled={true}
                loadingIndicatorColor={'#00000050'}
                showsCompass={true}
                mapType="standard"
                initialRegion={{
                    latitude: coordinates.latitude + markerOffset,
                    longitude: coordinates.longitude,
                    latitudeDelta: 1.05,
                    longitudeDelta: 1.05,
                }}
            >
                {/* Render all markers */}
                {Markers.map((marker, index) => {
                    const isSelected =
                        marker.latitude == coordinates.latitude &&
                        marker.longitude == coordinates.longitude;

                    return (
                        <Marker
                            key={index}
                            coordinate={{
                                latitude: marker.latitude,
                                longitude: marker.longitude,
                            }}
                            // title={}
                            onPress={marker.onPress} // Use the passed onPress handler
                        >
                            <Image
                                style={{ width: isSelected ? 35 : 25, height: isSelected ? 35 : 25, tintColor: isSelected ? Colors.Text_pink_color : '#000' }}
                                source={isSelected ? Images.Location_active : Images.Location_inactive}
                            />
                        </Marker>
                    );
                })}

            </MapView>
        </View>
    );
};

export default Map;
