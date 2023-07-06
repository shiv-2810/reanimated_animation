import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  useWindowDimensions,
  Animated,
} from "react-native";
import React, { memo, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { TapGestureHandler } from "react-native-gesture-handler";
import { ResizeMode, Video } from "expo-av";
import { Foundation } from "@expo/vector-icons";
import { Canvas, Path } from "@shopify/react-native-skia";

export const TopHeader = memo(({}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 5,
        marginBottom: 10,
      }}
    >
      <Image
        style={{ width: 150, height: 50 }}
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png",
        }}
      />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <FontAwesome
          name="heart-o"
          size={28}
          color="black"
          style={{ marginHorizontal: 20 }}
        />
        <Feather name="message-circle" size={30} color="black" />
      </View>
    </View>
  );
});

export const InstaHeader = ({ user }) => {
  return (
    <FlatList
      data={user}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={(item, i) => <StoryComp item={item} index={i} key={i} />}
    />
  );
};

export const StoryComp = memo(({ item, index }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <LinearGradient
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
        style={styles.gradientBox}
      >
        <View
          style={{ backgroundColor: "white", padding: 4, borderRadius: 50 }}
        >
          <Image
            style={{ width: 70, height: 70, borderRadius: 50 }}
            source={{ uri: item.item.avatar }}
          />
        </View>
      </LinearGradient>
      <Text>...</Text>
      {item.index == 0 && (
        <TouchableOpacity activeOpacity={0.9} style={styles.outerCircle}>
          <View style={styles.innerCircle}>
            <View style={styles.horLine}></View>
            <View style={styles.verLine}></View>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
});

export const PostComp = memo(({ user }) => {
  const [liked, setLiked] = useState(false);
  const tabRef = useRef();

  const onImageLike = () => {
    console.log("Double tabbed");
  };
  return (
    <View style={{ flex: 1, marginBottom: 20 }}>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <Image
          style={{ width: 40, height: 40, borderRadius: 50, marginRight: 10 }}
          source={{ uri: user.item.avatar }}
        />
        <Text style={{ fontSize: 17, fontWeight: "500" }}>
          {user.item.username}
        </Text>
      </View>
      <TapGestureHandler
        waitFor={tabRef}
        onActivated={() => console.log("Tabbed")}
      >
        <TapGestureHandler
          maxDelayMs={1000}
          ref={tabRef}
          numberOfTaps={2}
          onActivated={onImageLike}
        >
          <ImageBackground
            resizeMode="cover"
            style={{
              height: 400,
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
            source={{ uri: user.item.post }}
          >
            {/* <Image
              style={{ width: 200 }}
              source={require("../../assets/like.gif")}
            /> */}
          </ImageBackground>
        </TapGestureHandler>
      </TapGestureHandler>

      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <FontAwesome
          name="heart-o"
          size={28}
          color="black"
          style={{ marginRight: 20 }}
        />
        <Feather
          name="message-circle"
          size={30}
          color="black"
          style={{ marginRight: 20 }}
        />
        <Feather name="send" size={30} color="black" />
      </View>
      <Text style={{ fontSize: 16, fontWeight: "600", paddingLeft: 10 }}>
        2,056 likes
      </Text>
    </View>
  );
});

export const ReelComp = memo(({item, getReelOpacity, index}) => {
  const video = React.useRef(null);
  const opacity =getReelOpacity(index)
  console.log('OPacity is',opacity);
  const [status, setStatus] = React.useState({});
  const { width, height } = useWindowDimensions();
  
  return (
    <Animated.View style={[{ width: "100%" },opacity]}>
      <View
        style={{
          position: "absolute",
          margin: 20,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text
          style={{ fontSize: 20, color: "#fff", fontWeight: "800", flex: 1 }}
        >
          Reels
        </Text>
        <Feather name="camera" size={22} color="white" />
      </View>
      <View style={{ position: "absolute", zIndex: 100, top: 500, right: 8 }}>
        <FontAwesome
          name="heart-o"
          size={28}
          color="white"
          style={{ marginTop: 15 }}
        />
        <Text style={styles.reelText}>1.6M</Text>
        <Feather
          name="message-circle"
          size={30}
          color="white"
          style={{ marginTop: 20, transform: [{ rotate: "270deg" }] }}
        />
        <Text style={styles.reelText}>6,015</Text>
        <Feather
          name="send"
          size={30}
          color="white"
          style={{ marginTop: 20 }}
        />
        <Text style={styles.reelText}>345k</Text>
        <View style={{ alignSelf: "center", marginTop: 20 }}>
          <View
            style={{
              width: 3,
              height: 3,
              borderRadius: 2,
              backgroundColor: "white",
              marginBottom: 3,
            }}
          ></View>
          <View
            style={{
              width: 3,
              height: 3,
              borderRadius: 2,
              backgroundColor: "white",
              marginBottom: 3,
            }}
          ></View>
          <View
            style={{
              width: 3,
              height: 3,
              borderRadius: 2,
              backgroundColor: "white",
              marginBottom: 3,
            }}
          ></View>
        </View>
      </View>
      <View
        style={{ position: "absolute", zIndex: 100, top: 625, marginLeft: 15 }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("../../assets/image.jpg")}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              resizeMode: "cover",
            }}
          />
          <Text style={styles.reelUserName}>lanaturemood</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.followBtn, { marginLeft: 8 }]}
          >
            <Text style={[styles.reelUserName, { marginLeft: 0 }]}>Follow</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.captionTxt}>I find peace in the rain 🌧️ ...</Text>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              flexDirection: "row",
              position: "relative",
              marginTop: 10,
            }}
          >
            <Image
              source={{
                uri: "https://plus.unsplash.com/premium_photo-1684952848654-1171ca8988ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=654&q=80",
              }}
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                position: "absolute",
                zIndex: 10,
              }}
            />
            <Image
              source={{
                uri: "https://plus.unsplash.com/premium_photo-1677087122139-dad71b5ef223?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
              }}
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                position: "absolute",
                left: 12,
                zIndex: 9,
              }}
            />
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1684749847267-c00d91e46566?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80",
              }}
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                position: "absolute",
                left: 24,
              }}
            />
            <Text style={{ color: "#E8E2E2", left: 50 }}>
              Liked by <Text style={{ fontWeight: "600" }}>abhiram </Text>
              <Text> and </Text>
              <Text style={{ fontWeight: "600" }}>1,676,849 others</Text>
            </Text>
          </View>
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
        >
          <View style={styles.soundBox}>
            <Foundation name="music" size={24} color="white" />
            <Text style={styles.songTxt}>
              Kumar sanu, Alka Yagnik, Ek Din Aap
            </Text>
          </View>
          {/* <Canvas style={{width:100,height:100,position:'absolute',right:-175,top:18}}>
            <Path
              path="M2 29.2V3.5C2 2.39543 2.89543 1.5 4 1.5H30C31.1046 1.5 32 2.39543 32 3.5V14.1983C32 15.3604 31.0111 16.2686 29.849 16.2663C20.1899 16.2478 16.7489 21.4399 16.8721 28.999C16.8914 30.1795 15.9778 31.2 14.7971 31.2H4C2.89543 31.2 2 30.3046 2 29.2Z"
              color="white"
            />
          </Canvas>
          <Image style={{width:20,height:20, position:'absolute',right:-100,top:18}} source={{uri:'https://images.unsplash.com/photo-1684749847267-c00d91e46566?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80'}} /> */}
        </View>
      </View>
      <Video
        ref={video}
        style={{ height: height, zIndex: -1 }}
        source={require("../../assets/reel.mp4")}
        resizeMode={ResizeMode.STRETCH}
        isLooping={false}
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        shouldPlay
      />
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  storyBox: {
    marginHorizontal: 4,
  },
  firstStory: {
    borderWidth: 2,
    borderColor: "#30A2FF",
    borderRadius: 50,
  },
  gradientBox: {
    padding: 3,
    marginHorizontal: 4,
    borderRadius: 50,
    marginBottom: 8,
  },
  outerCircle: {
    backgroundColor: "white",
    width: 28,
    height: 28,
    borderRadius: 15,
    position: "absolute",
    bottom: 14,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  innerCircle: {
    backgroundColor: "#30A2FF",
    width: 24,
    height: 24,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  horLine: {
    height: 10,
    width: 2,
    backgroundColor: "white",
    zIndex: 10,
    position: "absolute",
  },
  verLine: {
    width: 10,
    height: 2,
    backgroundColor: "white",
  },
  reelText: {
    color: "#fff",
    fontWeight: "600",
    marginTop: 3,
    fontSize: 13,
    textAlign: "center",
  },
  reelUserName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  followBtn: {
    borderWidth: 1,
    borderColor: "#fff",
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  captionTxt: {
    fontWeight: "600",
    fontSize: 14,
    color: "#fff",
    marginTop: 20,
  },
  soundBox: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: "#716c6c",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 20,
    marginTop: 20,
    opacity: 0.4,
  },
  songTxt: {
    color: "#fff",
    marginLeft: 20,
  },
  musicIcon: {
    width: 30,
    height: 30,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 15, // Increasing the value creates an oval cut
    overflow: "hidden", // Hides the content that extends beyond the view's boundaries
    backgroundColor: "white",
    marginTop: 20,
    marginLeft: 80,
    alignItems: "center",
    justifyContent: "center",
  },
});
