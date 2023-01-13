import React, { useRef, useEffect } from 'react';
import { Animated, View } from 'react-native';
import { MotiView } from '@motify/components';

const LoadingIndicator = ({ size }) => {
  return (
    <MotiView
      from={{
        width: size,
        height: size,
      }}
      animate={{
        opacity: [0, 1],
        scale: [0, 1],
        borderRadius: (size + 10) / 2,
        borderWidth: 2,
      }}
      transition={{
        type: 'timing',
        duration: 2000,
        repeat: Infinity,
        repeatReverse: false,
      }}
      style={{
        position: 'absolute',
        top: 625,
        borderColor: '#1DB954',
      }}/>
  )
}



/**
 * @param {props} props 
 * @returns Entire login button component
 */
const LoginButton = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }
    ).start();
  }, [fadeAnim])

  return (
    <View>
      <Animated.View
        style={{
          ...props.style,
          opacity: fadeAnim,
          transform: [
            {translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0]
              })},
            {scale: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.8, 1]
            })},
          ],
          }}
      >
        {props.children}
      </Animated.View>
      <LoadingIndicator size={70} />
    </View>
  );
}

export default LoginButton;