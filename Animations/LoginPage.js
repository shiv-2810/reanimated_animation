import {View, Text, SafeAreaView, StyleSheet, TextInput, Pressable, TouchableOpacity, ScrollView} from 'react-native';
import React, { useState } from 'react';
import {ClipPath, Ellipse, Image, Svg} from 'react-native-svg';
import globalStyles from '../../../globalStyles';
import styles from './styles';
import Animated, { useSharedValue, useAnimatedStyle, interpolate, withTiming, withDelay } from 'react-native-reanimated'
import AntDesign from 'react-native-vector-icons/AntDesign';

const Login = () => {
  const imagePosition = useSharedValue(1);
  const placeHolderPosition = useSharedValue(1)
  const [email, setEmail] = useState("")

  const imageAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(
      imagePosition.value,
      [0, 1],
      [-globalStyles.HEIGHT / 2, 0],
    );
    return {
      transform: [{translateY: withTiming(interpolation, {duration: 1000})}],
      opacity:withTiming(imagePosition.value == 0 ? 0.7 :1, {duration: 2000})
    };
  });

  const buttonsAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [250, 0]);
    return {
      opacity: withTiming(imagePosition.value, {duration: 500}),
      transform: [{translateY: withTiming(interpolation, {duration: 1000})}],
    };
  });

  const closeButtonContainerStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [180, 360]);
    return{
        opacity: withTiming(imagePosition.value==0?1:0, {duration:800}),
        transform:[{rotate: withTiming(interpolation + "deg", {duration:800})}]
    }
  })

  const formAnimatedStyle = useAnimatedStyle(() => {
    return{
        opacity: imagePosition.value == 0 ? withDelay(400,withTiming(1,{duration:800})) : withTiming(0,{duration:300})
    }
  })

  const placeHolderStyle = useAnimatedStyle(() => {
    const interpolationY = interpolate(placeHolderPosition.value,[0,1],[-40,0])
    const interpolationX = interpolate(placeHolderPosition.value,[0,1],[-10,0])
    return{
        transform:[{translateY:withTiming(interpolationY,{duration:800})},{translateX:withTiming(interpolationX,{duration:800})}],
        opacity: withTiming((email.length > 0 && (placeHolderPosition.value == 1))?0:1) 
    }
  })
  const placeHolerTextStyle = useAnimatedStyle(()=>{

    return{
      color: placeHolderPosition.value == 0 ? 'white' : 'gray'
    }
  })

  const loginHandler = () => {
    imagePosition.value = 0;
  };
  const registerHandler = () => {
    imagePosition.value = 0;
  };

  
  return (
    <ScrollView contentContainerStyle={{justifyContent:'flex-end', flex:1}} className="flex-1">
      <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyle]}>
        <Svg height={globalStyles.HEIGHT + 100} width={globalStyles.WIDTH}>
          <ClipPath id="clipPathId">
            <Ellipse
              cx={globalStyles.WIDTH / 2}
              rx={globalStyles.HEIGHT}
              ry={globalStyles.HEIGHT + 100}
            />
          </ClipPath>
          <Image
            href={require('../../assests/images/login.jpg')}
            width={globalStyles.WIDTH + 100}
            height={globalStyles.HEIGHT + 100}
            preserveAspectRatio="xMidyMid slice"
            clipPath="url(#clipPathId)"
          />
        </Svg>
        <TouchableOpacity activeOpacity={0.9} onPress={()=>imagePosition.value = 1}>
        <Animated.View style={[styles.closeButtonContainer,closeButtonContainerStyle]}>
          <Text>X</Text>
        </Animated.View>
        </TouchableOpacity>
      </Animated.View>
      <View style={styles.bottomContainer}>
        <Animated.View style={buttonsAnimatedStyle}>
        <Pressable style={styles.button} onPress={loginHandler}>
          <Text style={styles.buttonText}>Log in</Text>
        </Pressable>
        </Animated.View>
        <Animated.View style={buttonsAnimatedStyle}>
        <Pressable onPress={registerHandler} style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </Pressable>
        </Animated.View>

        <Animated.View style={[styles.formInputContainer, formAnimatedStyle]}>
          <View style={{...styles.textInput,justifyContent:'center'}}>  
          <Animated.View style={[{...StyleSheet.absoluteFill,justifyContent:'center',paddingLeft:10},placeHolderStyle]}>
            <Animated.Text style={placeHolerTextStyle}>Email</Animated.Text>
          </Animated.View>
          <TextInput
            placeholderTextColor="black"
            onFocus={()=>placeHolderPosition.value = 0}
            onBlur={()=>placeHolderPosition.value = 1}
            onChangeText={(value)=>setEmail(value)}
          />
          </View>
          <View style={{...styles.textInput,alignItems:'center',flexDirection:'row'}}>  
          {/* <Animated.View style={[{...StyleSheet.absoluteFill,justifyContent:'center',paddingLeft:10},placeHolderStyle]}>
            <Animated.Text style={placeHolerTextStyle}>Email</Animated.Text>
          </Animated.View> */}
          <TextInput
            placeholder="Password"
            placeholderTextColor="black"
            secureTextEntry={true}
            style={{flex:1}}
          />
          <AntDesign name='exclamationcircle' size={30}/>
          </View>
          <View style={[styles.button]}>
            <Text style={styles.buttonText}>Log in</Text>
          </View>
        </Animated.View>
      </View>
    </ScrollView>
  );
};

export default Login;
