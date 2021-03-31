import React from 'react';
import {View} from 'react-native';

const Obstacles = ({randomBottom, color, obstacleLeft, obstacleWidth, obstacleHeight, gap}) => {
  return (
    <>
      <View
        style={{
          position: 'absolute',
          backgroundColor: color,
          width: obstacleWidth,
          height: obstacleHeight,
          bottom: randomBottom + obstacleHeight + gap,
          left: obstacleLeft,
          
        }}></View>
      <View
        style={{
          position: 'absolute',
          backgroundColor: color,
          width: obstacleWidth,
          height: obstacleHeight,
          bottom: randomBottom,
          left:obstacleLeft,
          
        }}></View>
    </>
  );
};

export default Obstacles
