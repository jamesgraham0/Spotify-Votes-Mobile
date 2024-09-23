import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as Haptics from "expo-haptics";
import Constants from "../utils/constants";
import { socket } from "../utils/socket";

const GlobalRoomToJoin = ({ room, user }) => {
  const { name, subtitle, users, track, id } = room;

  const JoinGlobalRoom = (room, user) => {
    console.log("Joining room:", room);
    socket.emit('joinRoom', { id, user });
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity
        key={track.uri}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          JoinGlobalRoom(room, user);
        }}
      >
        <View style={styles.container}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
            <Text style={styles.users}>{users.length}/40 People</Text>
            <View style={styles.trackContainer}>
              <Text style={[styles.trackName, {color: Constants.SPOTIFY_GREEN}]}>{track}</Text>
            </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    padding: 10,
  },
  container: {
    flexDirection: "column",
    minHeight: 100,
    height: "auto",
    padding: 10,
    paddingLeft: 20,
    borderRadius: 10,
    shadowColor: "rgba(29, 185, 84, 0.5)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 5,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "rgba(230, 230, 230, 1)",
    fontStyle: 'italic',
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(230, 230, 230, 1)",
  },
  users: {
    fontSize: 14,
    color: "rgba(230, 230, 230, 1)",
    marginTop: 10,
  },
  trackName: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default GlobalRoomToJoin;
