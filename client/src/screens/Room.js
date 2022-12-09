import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Navbar from '../components/Navbar';
import { useDispatch } from 'react-redux';
import { deleteRoom } from '../reducers/reducer';

const Room = ({ navigation, route }) => {
    const { user, room } = route.params;
    const { name, password, id, hostId, deviceId, users, currentlyPlaying, queue } = room;
    const dispatch = useDispatch();

    const handleReturnToJoinOrCreateRoom = () => {
        // check if it's the host leaving, if so, delete the room
        // the host can be identified by their user id
        if (hostId === user.id) {
            Alert.alert(
                "Wait!",
                `You are the host of ${name}, if you leave, the room will be deleted`,
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "Delete Room", onPress: () => {
                        navigation.navigate('JoinOrCreateRoom', { user: user });
                        dispatch(deleteRoom(room));
                    }}
                ]
            );
        } else {
            navigation.navigate('JoinOrCreateRoom', { user: user });
        }
    }

    return (
        <View style={styles.outerContainer}>
            <View style={styles.headerContainer}>
                <Text style={styles.roomName}>{room.name}</Text>
                <TouchableOpacity 
                onPress={() => {
                    handleReturnToJoinOrCreateRoom();
                }} 
                style={styles.returnButton}
                >
                    <Ionicons name="chevron-back-circle-outline" size={32} color="grey" />
                </TouchableOpacity>
            </View>
            <Navbar room={room}/>
        </View>
        
    )
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: '#040404',
    },
    headerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0C0C0C',
        height: 120,
    },
    roomName: {
        position: 'absolute',
        top: 60,
        color: '#BBB',
        fontSize: 30,
        maxWidth: '70%',
        textAlign: 'center',
    },
    returnButton: {
        position: 'absolute',
        width: 50,
        height: 50,
        left: 30,
        top: 60,
    },
  })
  

export default Room;