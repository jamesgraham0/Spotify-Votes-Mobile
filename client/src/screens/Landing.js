import { StyleSheet, Text, View, TouchableOpacity, Animated, Easing} from 'react-native';
import React, { useEffect, useState } from 'react';
import { ResponseType, useAuthRequest } from 'expo-auth-session';
import service from '../utils/service';
import { CLIENT_ID, CLIENT_SECRET } from 'react-native-dotenv';
import * as Haptics from 'expo-haptics';
import Constants from '../utils/constants';


const Landing = ({ navigation }) => {
  const [pulseValue] = useState(new Animated.Value(1));

  const discovery = {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
  };

  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      scopes: [
        'user-read-currently-playing',
        'user-read-recently-played',
        'user-read-playback-state',
        'user-top-read',
        'user-modify-playback-state',
        'streaming',
        'user-read-email',
        'user-read-private',
      ],
      usePKCE: true,
      redirectUri: 'exp://127.0.0.1:19000/',
    },
    discovery
  );

  useEffect(() => {
    const pulseIn = Animated.timing(pulseValue, {
      toValue: 1.2, 
      duration: 1200, 
      useNativeDriver: true,
      easing: Easing.linear,
    });

    const pulseOut = Animated.timing(pulseValue, {
      toValue: 1, 
      duration: 1200, 
      useNativeDriver: true,
      easing: Easing.linear,
    });

    const pulseSequence = Animated.sequence([pulseIn, pulseOut]);

    
    Animated.loop(pulseSequence).start();
  }, []);

  useEffect(() => {
    if (response?.type === 'success') {
      service
        .getUserCredentials(response)
        .then((user) => {
          navigation.navigate('JoinOrCreateRoom', { user: user });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [response]);

  return (
    <View style={styles.container}>

      <View style={[styles.circleGreen1, {backgroundColor: Constants.SPOTIFY_GREEN}]} />
      <View style={[styles.circleGreen2, {backgroundColor: Constants.SPOTIFY_GREEN}]} />
      <View style={[styles.circleGreen3, {backgroundColor: Constants.SPOTIFY_GREEN}]} />
      <View style={[styles.circleGreen4, {backgroundColor: Constants.SPOTIFY_GREEN}]} />
      <View style={[styles.circleGreen5, {backgroundColor: Constants.SPOTIFY_GREEN}]} />

      <View style={[styles.circlePurple1, {backgroundColor: Constants.SPOTIFY_PURPLE}]} />
      <View style={[styles.circlePurple2, {backgroundColor: Constants.SPOTIFY_PURPLE}]} />
      <View style={[styles.circlePurple3, {backgroundColor: Constants.SPOTIFY_PURPLE}]} />
      <View style={[styles.circlePurple4, {backgroundColor: Constants.SPOTIFY_PURPLE}]} />
      <View style={[styles.circlePurple5, {backgroundColor: Constants.SPOTIFY_PURPLE}]} />

      <View style={[styles.circleBlack1, {backgroundColor: 'rgb(10, 10, 10)'}]} />
      <View style={[styles.circleBlack2, {backgroundColor: 'rgb(10, 10, 10)'}]} />
      <View style={[styles.circleBlack3, {backgroundColor: 'rgb(10, 40, 10)'}]} />
      <View style={[styles.circleBlack4, {backgroundColor: 'rgb(10, 100, 10)'}]} />

      <Text style={styles.title}>
        Spotify Votes
      </Text>
      <TouchableOpacity
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          promptAsync();
        }}
        style={styles.roundButton}
      >
        <Animated.View
          style={[
            styles.pulseView,
            {
              transform: [{ scale: pulseValue }],
            },
          ]}
        />
      </TouchableOpacity>
      <Text style={styles.madeBy}>
        Made by James 
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191414',
    alignItems: 'center',
  },
  title: {
    top: '40%',
    fontSize: 40,
    color: '#1DB954',
  },
  roundButton: {
    width: 70,
    height: 70,
    top: '65%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseView: {
    width: 70,
    height: 70,
    borderWidth: 2,
    borderRadius: 50,
    shadowOpacity: 2,
    shadowColor: '#1DB954',
    shadowOffset: { width: 0, height: 0 },
    borderColor: '#1DB954',
    backgroundColor: 'transparent',
  },
  circleGreen1: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    opacity: 0.4,
    top: -60,
    right: -60,
  },
  circleGreen2: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    opacity: 0.4,
    top: 150,
    right: 100,
  },
  circleGreen3: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
    opacity: 0.4,
    top: 110,
    right: 130,
  },
  circleGreen4: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    opacity: 0.4,
    bottom: -20,
    left: -20,
  },
  circleGreen5: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    opacity: 0.4,
    bottom: 100,
    left: -40,
  },
  circlePurple1: {
    position: 'absolute',
    backgroundColor: 'purple',
    width: 150,
    height: 150,
    borderRadius: 75,
    opacity: 0.4,
    top: -20,
    left: -10,
  },
  circlePurple2: {
    position: 'absolute',
    backgroundColor: 'purple',
    width: 80,
    height: 80,
    borderRadius: 40,
    opacity: 0.4,
    top: 100,
    left: -10,
  },
  circlePurple3: {
    position: 'absolute',
    backgroundColor: 'purple',
    width: 30,
    height: 30,
    borderRadius: 15,
    opacity: 0.4,
    top: 30,
    left: 120,
  },
  circlePurple4: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    opacity: 0.4,
    bottom: -20,
    right: -20,
  },
  circlePurple5: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    opacity: 0.4,
    bottom: 100,
    right: -40,
  },
  circleBlack1: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    opacity: 0.3,
    top: '28%',
    left: 70,
  },
  circleBlack2: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    opacity: 0.6,
    top: 500,
    left: 185,
  },
  circleBlack3: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    opacity: 0.6,
    top: 530,
    left: 185,
  },
  circleBlack4: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    opacity: 0.6,
    top: 560,
    left: 185,
  },
  madeBy: {
    color: 'white',
    position: 'absolute',
    top: 70,
    right: 30,
  },
});

export default Landing;
