import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import tw from 'tailwind-react-native-classnames'
import NavOptions from '../components/NavOptions'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import {setDestination, setOrigin} from "../slices/navSlice"
import { Curr } from '../components/CurrentLocation';
import CurrentPos from '../components/CurrentPos';
import NavFavourites from '../components/NavFavourites';
import * as Location from 'expo-location';


const HomeScreen = () => {

  const dispatch = useDispatch();

  //Curr();

  return (
    <SafeAreaView style={tw`bg-yellow-50 h-full`}>
      <View style={tw`p-5`}>
        <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
          }}
          source={{
            uri: "https://ih1.redbubble.net/image.2755039582.9812/st,small,507x507-pad,600x600,f8f8f8.jpg" 
          }}
        />


        <GooglePlacesAutocomplete
          placeholder='Where From?'
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              fontSize: 18,
            },
          }}
          
          onPress={(data,details=null) => {
                dispatch(setOrigin({
                location: details.geometry.location,
                description: data.description, 
              }))
            
            console.log(data.description);
            dispatch(setDestination(null))
          }}

          

          fetchDetails={true}
          enablePoweredByContainer={false}
          minLength={2}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: 'en',
          }}

          nearbyPlacesAPI='GooglePlacesSearch'
          debounce={400}
        />
       



        <NavOptions/>
        <NavFavourites/>
        
      </View>
      

    </SafeAreaView>
    
    
  )
}

export default HomeScreen

const styles = StyleSheet.create({})