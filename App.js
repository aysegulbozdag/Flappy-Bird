import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import Bird from './src/components/Bird';
import Obstacles from './src/components/Obstacles';

const App = () => {
  const screenWidth = Dimensions.get('screen').width;
  const screenHeight = Dimensions.get('screen').height;
  const birdLeft = screenWidth / 2;
  const [birdBottom, setBirdBottom] = useState(screenHeight / 2);
  const [obstacleLeft, setObstacleLeft] = useState(screenWidth);
  const [obstacleLeftTwo, setObstacleLeftTwo] = useState(
    screenWidth + screenWidth / 2 + 30,
  );
  const [obstacleNegHeight, setObstacleNegHeight] = useState(0);
  const [obstacleNegHeightTwo, setObstacleNegHeightTwo] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const obstacleWidth = 60;
  const obstacleHeight = 300;
  const gap = 200;
  const gravity = 3;
  let gameTimerId;
  let obstacleLeftTimerId;
  let obstacleLeftTimerIdTwo;
  //start bird falling

  useEffect(() => {
    if (birdBottom > 0) {
      gameTimerId = setInterval(() => {
        setBirdBottom((birdBottom) => birdBottom - gravity);
      }, 30);
    }

    return () => {
      clearInterval(gameTimerId);
    };
  }, [birdBottom]);

  //start first obstacles
  useEffect(() => {
    if (obstacleLeft > -obstacleWidth) {
      obstacleLeftTimerId = setInterval(() => {
        setObstacleLeft(obstacleLeft - 5);
      }, 30);
      return () => {
        clearInterval(obstacleLeftTimerId);
      };
    } else {
      setObstacleLeft(screenWidth);
      setObstacleNegHeight(-Math.random() * 100);
      setScore((score) => score + 1);
    }
  }, [obstacleLeft]);

  //start second obstacles
  useEffect(() => {
    if (obstacleLeftTwo > -obstacleWidth) {
      obstacleLeftTimerIdTwo = setInterval(() => {
        setObstacleLeftTwo(obstacleLeftTwo - 5);
      }, 30);
      return () => {
        clearInterval(obstacleLeftTimerIdTwo);
      };
    } else {
      setObstacleLeftTwo(screenWidth);
      setObstacleNegHeight(-Math.random() * 100);
      setScore((score) => score + 1);
    }
  }, [obstacleLeftTwo]);

  //check for collistions
  useEffect(() => {
    if (
      ((birdBottom < obstacleNegHeight + obstacleHeight + 30 ||
        birdBottom > obstacleNegHeight + obstacleHeight + gap - 30) &&
        obstacleLeft > screenWidth / 2 - 30 &&
        obstacleLeft < screenWidth / 2 + 30) ||
      ((birdBottom < obstacleNegHeightTwo + obstacleHeight + 30 ||
        birdBottom > obstacleNegHeightTwo + obstacleHeight + gap - 30) &&
        obstacleLeftTwo > screenWidth / 2 - 30 &&
        obstacleLeftTwo < screenWidth / 2 + 30)
    ) {
      console.log('game over');
      gameOver();
    }
  });

  const gameOver = () => {
    clearInterval(gameTimerId);
    clearInterval(obstacleLeftTimerId);
    clearInterval(obstacleLeftTimerIdTwo);
    setIsGameOver(true);
  };

  const jump = () => {
    if (!isGameOver && birdBottom < screenHeight) {
      setBirdBottom((birdBottom) => birdBottom + 50);
      console.log('jumped');
    }
  };
  return (
    <TouchableWithoutFeedback onPress={jump}>
      <View style={styles.container}>
        {isGameOver && <Text>{score}</Text>}
        <Bird birdBottom={birdBottom} birdLeft={birdLeft} />
        <Obstacles
          obstacleLeft={obstacleLeft}
          obstacleHeight={obstacleHeight}
          obstacleWidth={obstacleWidth}
          gap={gap}
          color={'green'}
          randomBottom={obstacleNegHeight}
        />
        <Obstacles
          obstacleLeft={obstacleLeftTwo}
          obstacleHeight={obstacleHeight}
          obstacleWidth={obstacleWidth}
          gap={gap}
          color={'yellow'}
          randomBottom={obstacleNegHeightTwo}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
});

export default App;
