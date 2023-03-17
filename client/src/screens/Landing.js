import { StyleSheet, Text, View, TouchableOpacity, Button, Linking } from 'react-native';
// import LoginButton from './LoginButton';
import React, { useState, useEffect } from "react";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import service from '../utils/service';
import {CLIENT_ID, CLIENT_SECRET} from 'react-native-dotenv';

const Landing = ({ navigation }) => {
  const [token, setToken] = useState('');

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
      setToken(response.params.access_token);
      service.getUserCredentials(response)
      .then((user) => {
        if (user) {
          navigation.navigate('JoinOrCreateRoom', { user: user });
        } else {
          alert("Error, try logging in again");
        }
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
              promptAsync();
            }} 
            style={styles.roundButton} />
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
  },
})

export default Landing;