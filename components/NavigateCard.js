import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'tailwind-react-native-classnames';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_APIKEY} from "@env";
import { useDispatch } from 'react-redux';
import { setDestination } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import NavFavourites from './NavFavourites';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';

const NavigateCard = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    
  return (
      <SafeAreaView style={tw`bg-white flex-1`}>
          {/* <Text style={tw`text-center text-xl`}>Looper</Text> */}
          <View style={tw`border-t border-gray-200 flex-shrink`}>
              <View>
            <GooglePlacesAutocomplete
                placeholder="Where To..?"
                styles={toInputBoxStyles}
                fetchDetails={true}
                enablePoweredByContainer={false}
                minLength={3}
                onPress={(data,details=null) => {
                    dispatch(setDestination({
                        location: details.geometry.location,
                        description: data.description,
                    }));

                    navigation.navigate("RideOptionsCard")
                }}
                query={{
                    key: GOOGLE_MAPS_APIKEY,
                    language: "en",
                }}
                nearbyPlacesAPI='GooglePlacesSearch'
                debounce={400}
            />
              </View>
              <NavFavourites />
          </View>

          <View style={tw`flex-row bg-white justify-evenly mt-auto py-2 border-t border-gray-100`}>
              <TouchableOpacity style={tw`flex flex-row bg-black w-32 px-4 py-3 rounded-full`}>
                  <Icon name="car" type="font-awesome" color="white" size={16}/>
                  <Text style={tw`text-white text-center px-2`}>Ride Now</Text>
              </TouchableOpacity>
          </View>
      </SafeAreaView>
  )
}

export default NavigateCard

const toInputBoxStyles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingTop: 20,
        flex: 0,
    },
    textInput: {
        backgroundColor: "#DDDDDF",
        borderRadius: 0,
        fontSize: 18,
        borderRadius: 18,
    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0,
        
    }
})