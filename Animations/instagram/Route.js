import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InstaHome from "./InstaHome";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Foundation } from "@expo/vector-icons";
import ReelScreen from "./ReelScreen";
import { Image } from "react-native";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Route = () => {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "home") {
            return <Foundation name="home" size={size} color={color} />;
          } else if (route.name === "Reel") {
            return  <Image source={{uri:'https://img.icons8.com/ios_filled/600w/FFFFFF/instagram-reel.png'}} style={{width:22,height:22}} />
          }
        },
        tabBarStyle: {
            height: 60,
            paddingTop: 0,
            backgroundColor:  'black' ,
            position: 'absolute',
            borderTopWidth: 0,
        },
        tabBarActiveTintColor:'white',
        tabBarInactiveTintColor:'gray',
        tabBarShowLabel:false,
        headerShown:false,
      })}>
      <Tab.Screen
        name="home"
        component={InstaHome}
      />
      <Tab.Screen
        name="Reel"
        component={ReelScreen}
      />
    </Tab.Navigator>
  );
};

export default Route;
