/**
 * JoinRoom is a screen where a user can select a room to join from a list of rooms.
 * When the user clicks on a room, it navigates to the EnterRoomPassword screen.
 */

import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import RoomToJoin from '../components/RoomToJoin';
import { useSelector } from 'react-redux';
import { socket } from '../utils/socket';
import * as Haptics from 'expo-haptics';

const JoinRoom = ({ navigation, route }) => {
    const { user } = route.params;
    const [rooms, setRooms] = useState([]);
    // const state = useSelector(state => state.reducer);
    
    // Grabs the rooms from the socket when screen first mounts
    useEffect(() => {
        function fetchRooms() {
            console.log("fetching rooms");
			fetch("http://192.168.1.67:3000/rooms")
            .then((res) => res.json())
            .then((data) => setRooms(data))
            .catch((err) => console.error(err));
		}
		fetchRooms();
	}, []);
    
    // Updates list of rooms everytime the socket is updated
    // For when someone makes a new room while another user is on the joinRoom screen
    useEffect(() => {
        console.log('socket updated');
        socket.on('createRoom', (rooms) => {
            console.log('creating room');
            setRooms(rooms);
        });
        socket.on('deleteRoom', (rooms) => {
            console.log('deleting room');
            setRooms(rooms);
        });
    }, [socket]);
    
    const handleReturnToJoinOrCreateRoom = () => {
        navigation.navigate('JoinOrCreateRoom', { user: user });
    }
    
    const handleEnterRoomPassword = (room) => {
        navigation.navigate('EnterRoomPassword', { room: room, user: user });
    }
    
    return (
        <View style={styles.outerContainer}>
            <View style={styles.container}>
                <Text style={styles.joinRoomText}>Join Room</Text>
            </View>
            <TouchableOpacity 
                onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    handleReturnToJoinOrCreateRoom();
                }} 
                style={styles.returnButton}
                >
                <Ionicons name="chevron-back-circle-outline" size={32} color="grey" />
            </TouchableOpacity>


            <ScrollView
                style={styles.scrollView}
                bounces='true'
                contentInset={{top: 0, left: 0, bottom: 20, right: 0}}
            >

            {/* Rooms */}
                <View>
                {
                    rooms.map((room) => {
                    return (
                        <TouchableOpacity key={room.id}  onPress={() => {
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                            handleEnterRoomPassword(room)
                        }}>
                            <RoomToJoin room={room} />
                        </TouchableOpacity>
                    )
                    })
                }
                </View>
                
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: '#191414',
    },
    container: {
      flex: 1,
      backgroundColor: '#191414',
      alignItems: 'center',
    },
    joinRoomText: {
        top: 100,
        color: '#fff',
        fontSize: 24,
    },
    returnButton: {
        position: 'absolute',
        top: 100,
        width: 50,
        height: 50,
        left: 30,
    },
    scrollView: {
        position: 'absolute',
        top: 200,
        width: '90%',
        height: '65%',
        margin: 20,
        padding: 20,
        borderRadius: 30,
        backgroundColor: '#101010',
        borderStartColor: '#B026FF',
        borderStartWidth: 1,
        borderEndColor: '#B026FF',
        borderEndWidth: 1,
    },
  })
  

export default JoinRoom;