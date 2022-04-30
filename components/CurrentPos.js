import { Text, View, StyleSheet } from 'react-native'
import React from 'react'
import { FlatList, TouchableOpacity, Image } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectOrigin } from '../slices/navSlice';
import { Curr } from './CurrentLocation'

const CurrentPos = () => {
    return (


        <View
            style={
                {
                    //backgroundColor: "black",
                    position: "absolute",
                    bottom: 40,
                    right: 30
                }
            }>
            <Icon
                name='location'
                type='evilicon'
                color='black'
                size= {40}
                style={tw`p-2 bg-green-200 rounded-full  content-center`}
                onPress={() => {
                    Curr();
                }}
                    
            />
        </View>
    )
}

export default CurrentPos

const styles = StyleSheet.create({

})