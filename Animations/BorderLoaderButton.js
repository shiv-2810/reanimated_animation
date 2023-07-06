import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, Animated, Easing, StyleSheet, Text } from 'react-native';

const ButtonWithLoader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const buttonAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    Animated.loop(
      Animated.timing(buttonAnimation, {
        toValue: 1,
        duration: 3000, // Adjust the duration as per your preference
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  const animatedButtonStyle = {
    transform: [
      {
        rotate: buttonAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        }),
      },
    ],
  };

  const animatedButtonStyle2 = {
    transform: [
      {
        rotate: buttonAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: ['360deg', '0deg'],
        }),
      },
    ],
  };

  const animatedButtonStyle3 = {
    transform: [
      {
        rotate: buttonAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: ['180deg', '360deg'],
        }),
      },
    ],
  };

  const animatedButtonStyle4 = {
    transform: [
      {
        rotate: buttonAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: ['360deg', '180deg'],
        }),
      },
    ],
  };

  const handlePress = () => {
    setIsLoading(true);

    // Simulating an asynchronous task
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <View style={{position:'relative',alignItems:'center',justifyContent:'center',width:200,height:50,backgroundColor:'#65647C',overflow:'hidden',borderRadius:8}}>
    <TouchableOpacity
      style={[ animatedButtonStyle,{position:'absolute'}]}
      onPress={handlePress}
      disabled={isLoading}
    >
       <LinearGradient
        // Button Linear Gradient
        colors={[
          "#00FFFF",
          "#17C8FF",
          "#329BFF",
          "#4C64FF",
          "#6536FF",
          "#8000FF",
        ]}
        start={{ x: 0.0, y: 1.0 }}
        end={{ x: 1.0, y: 1.0 }}
        style={[styles.button]}>
      </LinearGradient>
      
    </TouchableOpacity>
    <View style={{width:190,height:40,backgroundColor:'black',zIndex:100,borderRadius:8,alignItems:'center',justifyContent:'center'}}>
      <Text style={{color:'white',fontSize:18,fontWeight:800}}>Submit</Text>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 220,
    height: 30,
    // borderWidth: 2,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'red'
  },
  buttonContent: {
    // Style your button content
  },
  loader: {
    position: 'absolute',
    borderWidth: 2,
    borderRadius: 5,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});

export default ButtonWithLoader;
