import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'tailwind-react-native-classnames'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { Icon, Image } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectTravelTimeInformation } from '../slices/navSlice'

const data = [
  {
    id:"Cab-Eco",
    title: "Economy",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: "Cab-XL",
    title: "Cab XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: "Cab-LUX",
    title: "Luxury",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
  },
]

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected,setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View >
        <Text style={tw`text-center py-1 text-xl bg-gray-200`}>Select a Ride : {travelTimeInformation?.distance.text}</Text>
        {/* <TouchableOpacity onPress={() => navigation.navigate("NavigateCard")} 
          style={tw`absolute top-3 flex-row items-center `}>
          <Icon name="chevron-left" type="fontawsome" style={tw`mr-4 rounded-full bg-gray-300 p-3`}/>
        </TouchableOpacity> */}
        
      </View>
      
      <FlatList 
        style={tw`h-3/5`}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({item: {id,title,multiplier,image}, item}) => (
          <TouchableOpacity onPress={() => setSelected(item)}
          style={tw`flex-row items-center justify-between px-10  
          ${ id === selected?.id && "bg-green-200"}
          `}
            
          >
            <Image
              style={{
                width: 80,
                height: 80,
                resizeMode: "contain",
              }}
              source={{uri : image}}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}>{title}</Text>
              <Text>Ride Time: {travelTimeInformation?.duration.text}</Text>
            </View>
            <Text style={tw`text-xl`}>Rs 99</Text>
          </TouchableOpacity>
        )}

      />

      <View>
        <TouchableOpacity disabled={!selected} style={tw`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`}>
            <Text style={tw`text-center text-white text-xl`}>
              Choose {selected?.title}
            </Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}

export default RideOptionsCard

const styles = StyleSheet.create({})