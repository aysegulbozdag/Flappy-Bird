import React from 'react';
import {View} from 'react-native';

function Bird({birdBottom, birdLeft}) {
  const birdWidth = 50;
  const birdHeight = 60;
  return (
    <View
      style={{
        position: 'absolute',
        backgroundColor: 'blue',
        width: birdWidth,
        height: birdHeight,
        bottom: birdBottom - birdWidth / 2,
        left: birdLeft - birdWidth / 2,
      }}></View>
  );
}

export default Bird;
