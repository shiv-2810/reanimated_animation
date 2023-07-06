import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  interpolate,
  log,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  useValue,
  withRepeat,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import InstaHome from "./Animations/instagram/InstaHome";
import Route from "./Animations/instagram/Route";
import { NavigationContainer } from "@react-navigation/native";
import {
  Canvas,
  Group,
  Rect,
  RoundedRect,
  SweepGradient,
  rotate,
  useTouchHandler,
  vec,
} from "@shopify/react-native-skia";
import { RectangleBox } from "./Animations/components/Index";
import { CANVAS_HEIGHT, CANVAS_WIDTH, HORIZONTAL_SQUARES, PADDING, SQUARE_CONTAINER_SIZE, SQUARE_SIZE, SQUARE_VERTICAL } from "./constants";
import axios from "axios";
import { Image, Svg } from "react-native-svg";
import BorderLoaderButton from "./Animations/BorderLoaderButton";
import { useState } from "react";
import ButtonWithLoader from "./Animations/BorderLoaderButton";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PostScreen from "./Animations/instagram/PostScreen";
import SInglePostScreen from "./Animations/instagram/SInglePostScreen";

const Stack = createNativeStackNavigator()


export default function App() {
  const {height:HEIGHT,width:WIDTH} = useWindowDimensions()


  return (
    <GestureHandlerRootView style={{flex:1}}>
     <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown:false
      }}>
    <Stack.Screen
      name="Posts" 
      component={PostScreen}
       options={{headerShown:true}}/>
     <Stack.Screen
     name="SinglePost"
     component={SInglePostScreen}
     />  
      </Stack.Navigator>
     </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  ball: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: "blue",
    alignSelf: "center",
  },
});
