import { Blur, Canvas, Circle, ColorMatrix, Group, Paint, SweepGradient, runSpring, useValue, vec } from "@shopify/react-native-skia";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import {
  Button,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import Touchable, { useGestureHandler } from "react-native-skia-gesture";

export default function MetaBallAnimation() {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const cx = useValue(windowWidth / 2);
  const cy = useValue(windowHeight / 2);
  const gestureHandler = useGestureHandler({
    onStart: (_, context) => {
      context.x = cx.current;
      context.y = cy.current;
    },
    onActive: ({ translationX, translationY }, context) => {
      cx.current = translationX + context.x;
      cy.current = translationY + context.y;
    },
    onEnd: () =>{
      runSpring(cx, windowWidth/2)
      runSpring(cy, windowHeight/2)
    }
  });

  const layer = useMemo(()=>{
   return(
    <Paint>
      <Blur blur={30} />
      <ColorMatrix
      matrix={[
        1, 0, 0, 0, 0,

        0, 1, 0, 0, 0,

        0, 0, 1, 0, 0,

        0, 0, 0, 60,-30
      ]}
       />
    </Paint>
   )
  },[])
  return (
    <Touchable.Canvas style={{ flex: 1, backgroundColor: "#111" }}>
      <Group layer={layer}>
      <Touchable.Circle
        {...gestureHandler}
        cx={cx}
        cy={cy}
        r={80}
      />
      <Circle cx={windowWidth/2} cy={windowHeight/2} r={80} />
      <SweepGradient c={vec(0,0)} colors={['cyan','magenta','cyan']} />
      </Group>
    </Touchable.Canvas>
  );
}
