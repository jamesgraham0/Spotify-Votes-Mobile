import React from 'react';
import { StyleSheet, View } from 'react-native';
import Constants from '../utils/constants';

const BackgroundCircles = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.circleGreen1, {backgroundColor: Constants.SPOTIFY_GREEN, shadowColor: Constants.SPOTIFY_GREEN}]} />
      <View style={[styles.circleGreen2, {backgroundColor: Constants.SPOTIFY_GREEN, shadowColor: Constants.SPOTIFY_GREEN}]} />
      <View style={[styles.circleGreen3, {backgroundColor: Constants.SPOTIFY_GREEN, shadowColor: Constants.SPOTIFY_GREEN}]} />
      <View style={[styles.circleGreen4, {backgroundColor: Constants.SPOTIFY_GREEN, shadowColor: Constants.SPOTIFY_GREEN}]} />
      <View style={[styles.circleGreen5, {backgroundColor: Constants.SPOTIFY_GREEN, shadowColor: Constants.SPOTIFY_GREEN}]} />

      <View style={[styles.circlePurple1, {backgroundColor: Constants.SPOTIFY_PURPLE, shadowColor: Constants.SPOTIFY_PURPLE}]} />
      <View style={[styles.circlePurple2, {backgroundColor: Constants.SPOTIFY_PURPLE, shadowColor: Constants.SPOTIFY_PURPLE}]} />
      <View style={[styles.circlePurple3, {backgroundColor: Constants.SPOTIFY_PURPLE, shadowColor: Constants.SPOTIFY_PURPLE}]} />
      <View style={[styles.circlePurple4, {backgroundColor: Constants.SPOTIFY_PURPLE, shadowColor: Constants.SPOTIFY_PURPLE}]} />
      <View style={[styles.circlePurple5, {backgroundColor: Constants.SPOTIFY_PURPLE, shadowColor: Constants.SPOTIFY_PURPLE}]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  circleGreen1: {
    ...circleStyle(250),
    top: -60,
    right: -60,
  },
  circleGreen2: {
    ...circleStyle(50),
    top: 150,
    right: 100,
  },
  circleGreen3: {
    ...circleStyle(90),
    top: 110,
    right: 130,
  },
  circleGreen4: {
    ...circleStyle(150),
    bottom: -20,
    left: -20,
  },
  circleGreen5: {
    ...circleStyle(100),
    bottom: 100,
    left: -40,
  },
  circlePurple1: {
    ...circleStyle(150),
    top: -20,
    left: -10,
  },
  circlePurple2: {
    ...circleStyle(80),
    top: 100,
    left: -10,
  },
  circlePurple3: {
    ...circleStyle(30),
    top: 30,
    left: 120,
  },
  circlePurple4: {
    ...circleStyle(150),
    bottom: -20,
    right: -20,
  },
  circlePurple5: {
    ...circleStyle(100),
    bottom: 100,
    right: -40,
  },
});

function circleStyle(size) {
  return {
    position: 'absolute',
    width: size,
    height: size,
    borderRadius: size / 2,
    opacity: 0.4,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 5,
};
}

export default BackgroundCircles;