import { View, Text, Image, ScrollView, SafeAreaView, FlatList } from "react-native";
import React from "react";
import { faker } from "@faker-js/faker";
import { InstaHeader, PostComp, TopHeader } from "./Component";

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
    post: faker.image.food(),
  };
}

Array.from({ length: 50 }).forEach(() => {
  USERS.push(createRandomUser());
});

const InstaHome = () => {
  return (
    <SafeAreaView>
    <TopHeader />
    <InstaHeader user={USERS} />
    <View style={{height:1,backgroundColor:'gray',marginTop:3,opacity:0.3}}></View>
    <FlatList
      data={USERS}
      showsVerticalScrollIndicator={false}
      renderItem={(item, i) => <PostComp user={item} index={i} key={i} />}
    />
    </SafeAreaView>
  );
};

export default InstaHome;
