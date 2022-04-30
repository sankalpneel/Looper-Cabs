import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect, useRef} from 'react';
import MapView, { Marker } from 'react-native-maps';
import tw from 'tailwind-react-native-classnames';
import { useDispatch, useSelector } from 'react-redux';
import { selectDestination, selectOrigin, settravelTimeInformation } from '../slices/navSlice';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { Curr } from './CurrentLocation';





const Map = () => {
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const mapRef = useRef(null);
    const dispatch = useDispatch();
    //console.log(Curr());



    useEffect(() => {
      if(!origin || !destination)
        return;

        // if(!destination )
        //     {
        //         mapRef.current.fitToSuppliedMarkers(['origin'], {
        //         edgePadding: { top: 50, right: 50, left: 50, bottom: 50 },
        //         });
        //         return;
        //     }

        mapRef.current.fitToSuppliedMarkers(['destination','origin'],{
            edgePadding: { top:50, right:50, left:50, bottom:50},
        });
     
    }, [origin, destination]);


    useEffect(() => {

        if(!origin || !destination)
        {
            return;
        }
        const getTravelTime = async() =>{
            const URI = `https://maps.googleapis.com/maps/api/distancematrix/json?
                        units=imperial
                        &origins=${origin.description}
                        &destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`

                        //console.log(URI);
            fetch(URI).then((res) => res.json())
                        .then(data => {
                            dispatch(settravelTimeInformation(data.rows[0].elements[0]));  
                        })

        }
        getTravelTime();
    }, [origin,destination, GOOGLE_MAPS_APIKEY])
    
    return (

        <MapView
            ref={mapRef}
            style={tw`flex-1`}
            mapType='mutedStandard'
            initialRegion={{
                latitude: origin.location.lat,
                longitude: origin.location.lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
        >

            {origin && destination &&(
                <MapViewDirections 
                    origin={{
                        latitude:origin.location.lat,
                        longitude: origin.location.lng,
                    }}
                    destination={{
                        latitude: destination.location.lat,
                        longitude: destination.location.lng,
                    }}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={3}
                    strokeColor="black"
                />
            )}
            {origin?.location && (
                <Marker
                    coordinate={{
                        latitude: origin.location.lat,
                        longitude: origin.location.lng,
                    }}
                    title="Origin"
                    description={origin.description}
                    identifier='origin'
                />
            )}

            {destination?.location && (
                <Marker
                    coordinate={{
                        latitude: destination.location.lat,
                        longitude: destination.location.lng,
                    }}
                    title="Destination"
                    description={destination.description}
                    identifier='destination'
                />
            )}
        </MapView>

    )
}

export default Map

const styles = StyleSheet.create({})