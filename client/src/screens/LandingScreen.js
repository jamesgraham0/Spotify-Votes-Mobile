import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import BackgroundCircles from "../components/BackgroundCircles";
import PulsingButton from "../components/PulsingButton";
import * as Haptics from "expo-haptics";
import { useDispatch, useSelector } from "react-redux";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import {
  setAccessToken,
} from "../redux/services/spotify/spotifySlice";
import { getUserInfo } from "../redux/services/spotify/spotifyAPI";
import Constants from "../utils/constants";
import { CLIENT_ID, CLIENT_SECRET } from "react-native-dotenv";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userData, isLoading, error, accessToken } = useSelector(
    (state) => state.spotify
  );

  const discovery = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: `${Constants.SERVER_URL}:${Constants.SERVER_PORT}/login`, // Call your server endpoint
  };

  const [, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: CLIENT_ID, // Removed client ID
      clientSecret: CLIENT_SECRET, // Removed client secret
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
    if (response && response.type === "success") {
      const token = response.authentication.accessToken;
      dispatch(setAccessToken(token))
    }
  }, [response]);

  useEffect(() => {
    if (accessToken) {
      dispatch(getUserInfo(accessToken))
        .then((user) => {
          if (userData && accessToken) {
            navigation.navigate("LocalOrGlobalScreen");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [accessToken]);

  return (
    <View style={styles.container}>
      <BackgroundCircles />

      <View
        style={[styles.circleBlack1, { backgroundColor: "rgb(10, 10, 10)" }]}
      />
      <View
        style={[styles.circleBlack2, { backgroundColor: "rgb(10, 10, 10)" }]}
      />
      <View
        style={[styles.circleBlack3, { backgroundColor: "rgb(10, 40, 10)" }]}
      />
      <View
        style={[styles.circleBlack4, { backgroundColor: "rgb(10, 100, 10)" }]}
      />
      <View style={styles.login}>
        <Text style={styles.title}>Spotify Votes</Text>
        <PulsingButton
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            promptAsync();
          }}
        />
      </View>
      <Text style={styles.madeBy}>Made by James</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#191414",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    color: "white",
  },
  circleBlack1: {
    position: "absolute",
    width: 250,
    height: 250,
    borderRadius: 125,
    opacity: 0.3,
    top: "28%",
    left: 70,
  },
  circleBlack2: {
    position: "absolute",
    width: 20,
    height: 20,
    borderRadius: 10,
    opacity: 0.6,
    top: 500,
    left: 185,
  },
  circleBlack3: {
    position: "absolute",
    width: 20,
    height: 20,
    borderRadius: 10,
    opacity: 0.6,
    top: 530,
    left: 185,
  },
  circleBlack4: {
    position: "absolute",
    width: 20,
    height: 20,
    borderRadius: 10,
    opacity: 0.6,
    top: 560,
    left: 185,
  },
  madeBy: {
    color: "white",
    position: "absolute",
    top: 70,
    right: 30,
  },
  login: {
    top: "40%",
    height: 350,
    alignItems: "center", // Center items horizontally
    justifyContent: "space-between", // Add space between items vertically
  },
});

export default LoginScreen;
