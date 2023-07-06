import { View, Text, SafeAreaView, useWindowDimensions, ScrollView, FlatList, Animated } from 'react-native'
import React, { useRef } from 'react'
import { Video, ResizeMode } from 'expo-av';
import { Feather } from '@expo/vector-icons';
import { ReelComp } from './Component';

const ReelScreen = () => {
  const flatListRef = useRef(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const data =['../../assets/reel.mp4','../../assets/reel2.mp4','../../assets/reel3.mp4']
  const { width, height:SCREEN_HEIGHT } = useWindowDimensions();
  const getItemLayout = (_, index) => ({
    length: SCREEN_HEIGHT,
    offset: SCREEN_HEIGHT * index,
    index,
  });

  const handleScroll = Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true });

  const getReelOffset = (index) => {
    return Animated.subtract(index * SCREEN_HEIGHT, scrollY);
  };
  const getReelOpacity = (index) => {
    const offset = getReelOffset(index);
    return offset.interpolate({
      inputRange: [-SCREEN_HEIGHT, 0, SCREEN_HEIGHT],
      outputRange: [0, 1, 0],
      extrapolate: 'clamp',
    });
  };

  return (
    <SafeAreaView style={{backgroundColor:'black',flex:1,position:'relative'}}>
        <Animated.FlatList
         data={data}
         renderItem={(item,i)=><ReelComp getReelOpacity={(index)=>getReelOpacity(index)} index={item.index} item={item} key={i} />}
         pagingEnabled
        scrollEventThrottle={16}
        onScroll={handleScroll}
        getItemLayout={getItemLayout}
        />
    </SafeAreaView>
  )
}

export default ReelScreen