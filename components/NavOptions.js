import {Text, View } from 'react-native'
import React from 'react'
import { FlatList, TouchableOpacity, Image } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectOrigin } from '../slices/navSlice';
import { Curr } from './CurrentLocation'



const data = [
    {
        id: "1",
        title: "Get a Ride",
    image: "https://cdn2.iconfinder.com/data/icons/transportation-by-road-1/100/hail-a-taxi-1-transportation-taxi-land-hail-cab-luggage-baggage-trip-journey-street-customer-male-512.png",
        screen: "MapScreen"
    },
    {
        id: "2",
        title: "Driver Partner",
      image: "https://cdn-icons-png.flaticon.com/512/2898/2898588.png",
      screen: "DriverScreen"
    }
]


const NavOptions = () => {
  
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);
  //Curr();

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor = {(item) => item.id}
        horizontal
        renderItem={({ item }) => (
            <TouchableOpacity 
            onPress={() => {
              navigation.navigate(item.screen);
            }}
            style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}
            disabled={!origin}
            >
                <View 
                style={tw `${!origin && 'opacity-20'}`}
                >
                    <Image
                        style={{ width: 120, height:120, resizeMode: "contain"}}
                        source={{ uri: item.image}}
                    />
                    <Text style={tw `mt-2 text-lg font-semibold`}>{ item.title }</Text>
                    <Icon
                        style={tw`p-2 bg-black rounded-full w-10 mt-4`}
                        name="arrowright"
                        color="white"
                        type="antdesign"
                    />
                </View>
            </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default NavOptions
