import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { faker } from "@faker-js/faker";
import { useNavigation } from "@react-navigation/native";
import Animated from "react-native-reanimated";

export const USERS = [];

export function createRandomUser(index) {
  return {
    post: faker.image.image(),
    id:index
  };
}

Array.from({ length: 50 }).forEach((item,index) => {
  USERS.push(createRandomUser(index));
});

const PostScreen = () => {
  return (
    <FlatList
      numColumns={3}
      data={USERS}
      renderItem={(item, index) => <PostComp item={item} key={index} />}
    />
  );
};

export default PostScreen;

export const PostComp = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate("SinglePost", item)}>
      <Animated.View
      >
        <Animated.Image
          style={{ width: 150, height: 150 }}
          source={{ uri: item.item.post }}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};
