import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import React, { useState, useEffect } from "react";
import { socket } from "../../utils/socket";
import DarkBackgroundCircles from "../../components/BackgroundCircles2";
import Header from "../../components/Header";
import Constants from "../../utils/constants";
import RoomButton from "../../components/RoomButton";
import * as Haptics from 'expo-haptics';

const CreateGlobalRoomScreen = ({ navigation, route }) => {
  const { user } = route.params;
  const [roomName, setRoomName] = useState("");
  const [subTitle, setSubTitle] = useState("");

  const handleReturnToGlobalRoom = () => {
    navigation.navigate('CreateOrJoinGlobalRoomScreen', { user: user });
}

  const handleRoomNameChange = (text) => {
    setRoomName(text);
  };

  const handleSubTitleChange = (text) => {
    setSubTitle(text);
  };

  const handleCreateGlobalRoom = () => {
    console.log("Room Name:", roomName);
    console.log("Sub Title:", subTitle);
  };

  return (
    <View style={styles.outerContainer}>
      <DarkBackgroundCircles />
      <Header headerText="Create Room" onBackPress={handleReturnToGlobalRoom} />
      <Text style={styles.instructionText}>
        Enter the room name and subtitle:
      </Text>
      <KeyboardAvoidingView
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inputWrapper}
      >
        <TextInput
          style={Constants.TEXT_INPUT_STYLES}
          placeholder={"Classic Rock..."}
          value={roomName}
          onChangeText={handleRoomNameChange}
          maxLength={20}
          placeholderTextColor="#888"
        />
        <TextInput
          style={[Constants.TEXT_INPUT_STYLES, styles.subtitleTextInput]}
          placeholder={"Enter a subtitle..."}
          value={subTitle}
          onChangeText={handleSubTitleChange}
          maxLength={50}
          placeholderTextColor="#888"
          multiline={true}
        />
        <RoomButton
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            handleCreateGlobalRoom();
          }}
          buttonText="Create Room"
          buttonStyle={styles.createGlobalRoomScreenButton}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    height: 300,
    backgroundColor: "#191414",
  },
  createGlobalRoomScreenButton: {
    borderWidth: 2,
    borderColor: "#B026FF",
    width: 300,
    height: 80,
    borderRadius: 50,
    shadowOpacity: 1,
    shadowColor: "#B026FF",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#191414",
  },
  returnButton: {
    width: 50,
    height: 50,
    marginTop: 36,
  },
  instructionText: {
    ...Constants.INSTRUCTION_TEXT_STYLES,
  },
  inputWrapper: {
    backgroundColor: "#101010",
    width: "90%",
    height: "40%",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 30,
    margin: 20,
    shadowColor: "#1DB954",
    shadowOpacity: 0.3,
    shadowOffset: { width: -2, height: -2 },
  },
});

export default CreateGlobalRoomScreen;
