import { View, Text, SafeAreaView, Image, Alert, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const SInglePostScreen = ({route}) => {
   const { params } = route
   console.log('Params',params);
   const navigation = useNavigation()
  return (
    <SafeAreaView >
       <TouchableOpacity 
       style={{
        width:40,
        height:10,
        borderRadius:25,
        backgroundColor:'cyan'}} onPress={()=>navigation.goBack()}></TouchableOpacity> 
      <Image
       style={{width:'100%',height:300}} 
       source={{uri:params.item.post}}/>
    </SafeAreaView>
  )
}

export default SInglePostScreen