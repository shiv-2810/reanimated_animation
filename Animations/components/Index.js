import { View, Text } from "react-native";
import React from "react";
import { RoundedRect, interpolate, useComputedValue } from "@shopify/react-native-skia";
import { MAX_DISTANCE } from "../../App";

export const RectangleBox = (props) => {
  const { x, y , point, width, height} = props;
  const distance = useComputedValue(() => {
    if (point?.current == null) return 0;
    return Math.sqrt((point?.current.x - x) ** 2 + (point?.current.y - y) ** 2);
  }, [point]);

  const scale = useComputedValue(()=>{
    return interpolate(distance.current,[0,MAX_DISTANCE],[1,0])
  },[distance])

  const scaledWidth = useComputedValue(()=>{
    return scale.current * width
  },[scale])

  const scaledHeigth = useComputedValue(()=>{
    return scale.current * height
  },[scale])
  return <RoundedRect {...props} r={4} width={scaledWidth} height={scaledHeigth} />;
};
