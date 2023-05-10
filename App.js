import { memo, useEffect, useRef, useState } from "react";
import {
  Button,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  log,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { faker } from "@faker-js/faker";

export const USERS = [];

export function createRandomUser() {
  return {
    userId: faker.datatype.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
    jobtitle: faker.name.jobTitle(),
  };
}

Array.from({ length: 50 }).forEach(() => {
  USERS.push(createRandomUser());
});

const ITEM_SIZE = 70 + 20 * 3;

export default function App() {
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image
        blurRadius={80}
        style={[StyleSheet.absoluteFill, styles.background_image]}
        resizeMode="repeat"
        source={{
          uri: "https://images.unsplash.com/photo-1683497727598-2b9334818703?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
        }}
      />
      <Animated.FlatList
        data={USERS}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        contentContainerStyle={{
          padding: 20,
          paddingTop: StatusBar.currentHeight || 42,
        }}
        renderItem={({ item, index }) => {
          const inputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 2),
          ];
          const opacityInputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 1),
          ];

          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });

          const opacity = scrollY.interpolate({
            inputRange: opacityInputRange,
            outputRange: [1, 1, 1, 0],
          });

          return (
            <Animated.View
              style={[styles.infoBox, { transform: [{ scale }],opacity }]}
            >
              <Image style={styles.avatar} source={{ uri: item.avatar }} />
              <View style={styles.textContainer}>
                <Text style={{ fontSize: 16, fontWeight: "700" }}>
                  {item.username}
                </Text>

                <Text style={{ opacity: 0.7, fontSize: 13 }}>
                  {item.jobtitle}
                </Text>
                <Text style={{ fontSize: 10, color: "#0099cc" }}>
                  {item.email}
                </Text>
              </View>
            </Animated.View>
          );
        }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const UserInfoComp = memo(({ item }) => {
  return (
    <View style={styles.infoBox}>
      <Image style={styles.avatar} source={{ uri: item.avatar }} />
      <View style={styles.textContainer}>
        <Text style={{ fontSize: 16, fontWeight: "700" }}>{item.username}</Text>

        <Text style={{ opacity: 0.7, fontSize: 13 }}>{item.jobtitle}</Text>
        <Text style={{ fontSize: 10, color: "#0099cc" }}>{item.email}</Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  background_image: {
    width: "100%",
    height: 1000,
  },
  textColor: {
    color: "white",
  },
  infoBox: {
    padding: 20,
    backgroundColor: "white",
    marginBottom: 20,
    borderRadius: 12,
    alignSelf: "center",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  textContainer: {
    flex: 1,
    marginLeft: 5,
  },
});
