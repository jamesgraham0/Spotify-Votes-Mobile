/**
 * JoinRoom is a screen where a user can select a room to join from a list of rooms.
 * When the user clicks on a room, it navigates to the EnterRoomPassword screen.
*/

import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import RoomToJoin from '../components/RoomToJoin';
import { socket } from '../utils/socket';
import * as Haptics from 'expo-haptics';
import Constants from '../utils/constants';

const JoinRoom = ({ navigation, route }) => {
    const { user } = route.params;
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        function fetchRooms() {
			fetch(`http://${Constants.EXPO_IP}:${Constants.PORT}/rooms`)
            .then((res) => res.json())
            .then((data) => setRooms(data))
            .catch((err) => console.error(err));
		}
		fetchRooms();
	}, []);
    
    useEffect(() => {
        socket.on('createRoom', (rooms) => {
            setRooms(rooms);
        });
        socket.on('deleteRoom', (rooms) => {
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