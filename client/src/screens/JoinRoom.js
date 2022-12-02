/**
 * JoinRoom is a screen where a user can select a room to join from a list of rooms.
 * When the user clicks on a room, it navigates to the EnterRoomPassword screen.
 */

import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import RoomToJoin from '../components/RoomToJoin';


const JoinRoom = ({ navigation, route }) => {
    const { user } = route.params;
    const [rooms, setRooms] = useState([
        {name: 'Pink Pasadena RAGER 🏡', users: [{"name": "James"}, {"name": "Shaun"}], password: '1234', id: 1}, 
        {name: 'Super duper awesome party room', users: [{"name": "James"}, {"name": "Shaun"}], password: '1234', id: 2}, 
        {name: 'Project X fo real', users: [{"name": "James"}, {"name": "Shaun"}], password: '1234', id: 3},
        {name: 'lonely room', users: [{"name": "James"}, {"name": "Shaun"}], password: '1234', id: 4}, 
        {name: 'Party Rock Anthem only', users: [{"name": "James"}, {"name": "Shaun"}], password: '1234', id: 5}, 
        {name: '🔥', users: [{"name": "James"}, {"name": "Shaun"}], password: '1234', id: 6},
        {name: 'Top Secret', users: [{"name": "James"}, {"name": "Shaun"}], password: '1234', id: 7}, 
        {name: 'Do NOT join this', users: [{"name": "James"}, {"name": "Shaun"}], password: '1234', id: 8}, 
        {name: '$$$', users: [{"name": "James"}, {"name": "Shaun"}], password: '1234', id: 9},
        {name: 'house party', users: [{"name": "James"}, {"name": "Shaun"}], password: '1234', id: 10}, 
        {name: 'Shauns Seattle shake', users: [{"name": "James"}, {"name": "Shaun"}], password: '1234', id: 11}, 
        {name: 'da best queue', users: [{"name": "James"}, {"name": "Shaun"}], password: '1234', id: 12},
    ]);

    useEffect(() => {
        // TODO fetch rooms from state
        // setRooms(rooms);
    }, []);

    const handleReturnToJoinOrCreateRoom = () => {
        navigation.navigate('JoinOrCreateRoom', { user: user });
    }
    
    const handleEnterRoomPassword = (room) => {
        navigation.navigate('EnterRoomPassword', {user: user, room: room});
    }

    return (
        <View style={styles.outerContainer}>
            <View style={styles.container}>
                <Text style={styles.joinRoomText}>Join Room</Text>
            </View>
            <TouchableOpacity 
                onPress={() => {
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
                        <TouchableOpacity key={room.id}  onPress={() => handleEnterRoomPassword(room)}>
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