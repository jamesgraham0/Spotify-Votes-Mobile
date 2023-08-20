import { StyleSheet, Text, View, TouchableOpacity, Button, Linking } from 'react-native';
// import LoginButton from './LoginButton';
import React, { useState, useEffect } from "react";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import service from '../utils/service';
import {CLIENT_ID, CLIENT_SECRET} from 'react-native-dotenv';
import * as Haptics from 'expo-haptics';
import { socket } from '../utils/socket';

const Landing = ({ navigation }) => {

  const discovery = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
  };

  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      scopes: [
        "user-read-currently-playing",
        "user-read-recently-played",
        "user-read-playback-state",
        "user-top-read",
        "user-modify-playback-state",
        "streaming",
        "user-read-email",
        "user-read-private",
      ],
      usePKCE: true,
      redirectUri: "exp://127.0.0.1:19000/",
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      service.getUserCredentials(response)
      .then((user) => {
        navigation.navigate('JoinOrCreateRoom', { user: user });
      })
      .catch((error) => {
        console.log(error);
      })
    }
  }, [response]);

  return (
    <View style={styles.container}>
        <Text style={styles.title}> Spotify Votes </Text>
        {/* <LoginButton> */}
          <TouchableOpacity 
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy); 
              promptAsync();
            }} 
            style={styles.roundButton} 
          />
        {/* </LoginButton> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191414',
    alignItems: 'center',
  },
  title: {
    top: 350,
    fontSize: 40,
    color: '#1DB954',
  },
  roundButton: {
    width: 70,
    height: 70,
    borderWidth: 2,
    borderColor: '#1DB954',
    borderRadius: 50,
    top: 625,
    shadowOpacity: 2,
    shadowColor: '#1DB954',
    shadowOffset: { width: 0, height: 0 },
    backgroundColor: '#191414',
  },
})

export default Landing;