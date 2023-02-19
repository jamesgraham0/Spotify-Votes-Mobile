import { StyleSheet, Text, View, TouchableOpacity, Alert, Modal, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Navbar from '../components/Navbar';
import { useDispatch } from 'react-redux';
import { deleteRoom } from '../reducers/reducer';
import service from '../utils/service';
import { socket } from '../utils/socket';
import { FontAwesome5 } from '@expo/vector-icons';

const Room = ({ navigation, route }) => {
    const { user } = route.params;
    const [room, setRoom] = useState(route.params.room)
    const [userModalVisible, setUserModalVisible] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        socket.on('findRoom', (room) => {
            console.log("finding room");
            setRoom(room);
        });
    }, [socket]);

    const handleReturnToJoinOrCreateRoom = () => {
        // check if it's the host leaving, if so, delete the room
        // the host can be identified by their user id
        if (room.hostId === user.id) {
            Alert.alert(
                "Wait!",
                `You are the host of ${room.name}, if you leave, the room will be deleted`,
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "Delete Room", onPress: () => {
                        navigation.navigate('JoinOrCreateRoom', { user: user });
                        const pause = async () => {
                            await service.resetPlaybackToEmptyState();
                        }
                        pause();
                        // dispatch(deleteRoom(room));
                        socket.emit("deleteRoom", room);
                    }}
                ]
            );
        } else {
            navigation.navigate('JoinOrCreateRoom', { user: user });
        }
    }

    if (room) {
        return (
            <View style={styles.outerContainer}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity 
                    onPress={() => {
                        handleReturnToJoinOrCreateRoom();
                    }} 
                    style={styles.returnButton}
                    >
                        <Ionicons name="chevron-back-circle-outline" size={32} color="grey" />
                    </TouchableOpacity>
                    <Text numberOfLines={1} style={styles.roomName}>{room.name}</Text>
                    <TouchableOpacity
                        onPress={() => {
                            setUserModalVisible(!userModalVisible);
                        }}
                    >
                        <FontAwesome5 name="users" size={24} color="grey" />
                    </TouchableOpacity>
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={userModalVisible}
                            onRequestClose={() => {
                            setUserModalVisible(!userModalVisible);
                            }}>
                            <View style={styles.modalView}>
                            <ScrollView
                                bounces='true'
                                contentInset={{top: 0, left: 0, bottom: 20, right: 0}}
                            >
                                <View>
                                {
                                    room.users.map((user) => {
                                    return (
                                        <View key={user.id}>
                                            let count = 0;
                                            <View style={styles.userContainer}>
                                                <Text>{count++}</Text>
                                                <Text numberOfLines={1} style={styles.user}>{user.display_name}</Text>
                                            </View>
                                        </View>
                                    )
                                    })
                                }
                                </View>
                            </ScrollView>
                                <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setUserModalVisible(!userModalVisible)}>
                                    <Text style={styles.textStyle}>Hide Users</Text>
                                </TouchableOpacity>
                            </View>
                        </Modal>
                </View>
                <Navbar user={user} room={room}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: '#040404',
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#0C0C0C',
        height: 100,
        padding: 20,
        paddingTop: 55,
    },
    roomName: {
        color: '#BBB',
        fontSize: 30,
        maxWidth: '70%',
        height: 40,
        textAlign: 'center',
    },
    returnButton: {
        width: 40,
        height: 40,
    },
    modalView: {
        top: 200,
        height: 400,
        margin: 20,
        backgroundColor: 'rgba(30, 30, 30, 0.3)',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    userContainer: {
        width: 250,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'rgb(30, 30, 30)',
        borderWidth: 1,
        borderRadius: 20,
    },
    user: {
        fontSize: 30,
        color: 'white',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: 'rgba(176, 38, 255, 0.3)',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
  })
  

export default Room;