import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Modal,
  ScrollView,
  Animated,
  Image,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Navbar from "../../components/Navbar";
import service from "../../utils/service";
import { socket } from "../../utils/socket";
import { FontAwesome5 } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";
import Constants from "../../utils/constants";

const GlobalRoom = ({ navigation, route }) => {
  const { user } = route.params;
  const [room, setRoom] = useState(route.params.room);
  const [newPersonInRoom, setNewPersonInRoom] = useState(false);
  const [userModalVisible, setUserModalVisible] = useState(false);
  const plusValue = useState(new Animated.Value(0))[0];
  const [iconColor, setIconColor] = useState("#BBB");

  useEffect(() => {
    socket.on("newUserJoinedRoom", (roomWithNewUser) => {
      setNewPersonInRoom(true);
      setRoom(roomWithNewUser);
    });
    socket.on("joinRoom", (roomToSetForNewUser) => {
      setRoom(roomToSetForNewUser);
    });
    socket.on("leaveRoom", (room) => {
      setRoom(room);
    });
  }, [socket]);

  useEffect(() => {
    setIconColor(newPersonInRoom ? "#1DB954" : "#BBB");
  }, [newPersonInRoom]);

  // useEffect(() => {
  //   socket.on("roomUpdated", (room) => {
  //     setRoom(room);
  //   });
  //   socket.on("leaveRoom", (room) => {
  //     setRoom(room);
  //   });
  // }, [socket]);

  const handleUserJoinAnimation = () => {
    Animated.spring(plusValue, {
      toValue: -15,
      duration: 200,
      friction: 3,
      useNativeDriver: false,
    }).start(() => {
      setIconColor("#BBB");
      setNewPersonInRoom(false);
      Animated.spring(plusValue, {
        toValue: 0,
        duration: 100,
        friction: 12,
        useNativeDriver: false,
      }).start();
    });
    setIconColor("#1DB954");
    setNewPersonInRoom(false);
  };

  const returnToCreateOrJoinGlobalRoom = () => {
    navigation.navigate("CreateOrJoinGlobalRoomScreen", { user: user });
    socket.emit("leaveRoom", { roomId: room.id, user: user });
  };

  const usersModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={userModalVisible}
        onRequestClose={() => {
          setUserModalVisible(!userModalVisible);
        }}
      >
        <BlurView intensity={30} tint={"dark"} style={styles.blur}>
          <View style={styles.modalView}>
            <Text style={styles.numUsers}>
              {room.users.length === 1 ? (
                <Text>{room.users.length} Person</Text>
              ) : (
                <Text>{room.users.length} People</Text>
              )}
            </Text>
            <ScrollView
              bounces={true}
              contentInset={{ top: 0, left: 0, bottom: 20, right: 0 }}
              style={styles.scrollView}
            >
              <View>
                {room.users.map((user, index) => {
                  return (
                    <View key={user.id}>
                      <View style={styles.userContainer}>
                        <Text style={styles.count}>{++index}</Text>
                        <Text numberOfLines={1} style={styles.user}>
                          <View style={styles.userNameContainer}>
                            <Text
                              numberOfLines={1}
                              style={styles.userName}
                              ellipsizeMode="tail"
                            >
                              {user.display_name.length > 20
                                ? user.display_name.substring(0, 20) + "..."
                                : user.display_name}
                            </Text>
                          </View>
                        </Text>
                        <Image
                          style={styles.img}
                          source={{
                            uri:
                              user.images.length > 0
                                ? user.images[0].url
                                : Constants.DEFAULT_PROFILE_IMAGE,
                          }}
                        />
                      </View>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setUserModalVisible(!userModalVisible);
              }}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </Modal>
    );
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            returnToCreateOrJoinGlobalRoom();
          }}
          style={styles.returnButton}
        >
          <Ionicons name="chevron-back-circle-outline" size={32} color="grey" />
        </TouchableOpacity>
        <Text numberOfLines={1} style={styles.roomName}>
          {room.name}
        </Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              setUserModalVisible(!userModalVisible);
            }}
          >
            {newPersonInRoom ? handleUserJoinAnimation() : <Text></Text>}
            <FontAwesome5
              style={styles.usersIcon}
              name="users"
              size={24}
              color={iconColor}
            />
            <Animated.View
              style={[
                {
                  width: 20,
                  height: 20,
                  marginTop: plusValue,
                },
              ]}
            >
              <View
                style={[
                  {
                    opacity: 1,
                    position: "absolute",
                    alignSelf: "center",
                    top: -24,
                    left: 9,
                  },
                ]}
              >
                <Ionicons color={iconColor} name="add-circle-outline" />
              </View>
            </Animated.View>
          </TouchableOpacity>
        </View>
        {usersModal()}
      </View>
      <Navbar user={user} room={room} />
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#040404",
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0C0C0C",
    height: 100,
    padding: 20,
    paddingTop: 55,
  },
  roomName: {
    color: "#BBB",
    fontSize: 30,
    maxWidth: "70%",
    height: 40,
    textAlign: "center",
  },
  returnButton: {
    width: 40,
    height: 40,
  },
  modalView: {
    top: 150,
    height: 500,
    margin: 20,
    backgroundColor: "rgba(20, 20, 20, 0.9)",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  userContainer: {
    height: 50,
    margin: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    alignItems: "center",
    borderColor: "rgba(30, 30, 30, 0.5)",
    borderWidth: 1,
    borderRadius: 20,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    boxShadow: "rgba(255, 255, 255, 0.5)",
  },
  user: {
    fontSize: 30,
    color: "#BBB",
  },
  count: {
    color: "#BBB",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "rgba(0, 50, 100, 1)",
  },
  buttonText: {
    color: "#BBB",
    fontWeight: "bold",
    textAlign: "center",
  },
  blur: {
    height: 2000,
    backgroundColor: "rgba(0, 50, 100, 0.1)",
  },
  scrollView: {
    width: "90%",
    margin: 15,
    borderColor: "rgba(0, 50, 100, 1)",
    borderWidth: 3,
    borderTopColor: "rgba(0, 0, 0, 0)",
    borderBottomColor: "rgba(0, 0, 0, 0)",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  numUsers: {
    color: "#BBB",
    fontSize: 30,
    fontWeight: "bold",
  },
  iconContainer: {
    position: "relative",
    width: 35,
    height: 35,
    padding: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  userNameContainer: {
    maxWidth: 150,
    overflow: "hidden",
  },
  userName: {
    color: "#BBB",
    fontSize: 20,
    textAlign: "right",
  },
  img: {
    borderRadius: 50,
    width: 20,
    height: 20,
  },
});

export default GlobalRoom;
