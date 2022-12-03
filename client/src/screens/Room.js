import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Navbar from '../components/Navbar';
import service from '../utils/service';

const Room = ({ navigation, route }) => {
    const { user, room } = route.params;
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);
    const [currentlyPlaying, setCurrentlyPlaying] = useState();
    const [isPlaying, setIsPlaying] = useState(false);
    const [isHost, setIsHost] = useState('');
    const [queue, setQueue] = useState([]);
    const [deviceId, setDeviceId] = useState('');

    useEffect(() => {
        setUsers(room.users);
        async function getCurrentlyPlayingAndQueue() {
            // might need to pass device id to get the correct queue for the room
            let playingAndQueue = await service.getQueue();
            setQueue(...queue, playingAndQueue);
        }
        getCurrentlyPlayingAndQueue();
    }, []);

    const handleReturnToJoinOrCreateRoom = () => {
        navigation.navigate('JoinOrCreateRoom', { user: user });
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
            <Navbar/>
        </View>
        
    )
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: '#040404',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#040404',
        height: 150,
        padding: 20,
    },
    roomName: {
        color: '#BBB',
        fontSize: 24,
        maxWidth: '70%',
        textAlign: 'center',
        top: 20,
        marginLeft: 10,
    },
    returnButton: {
        position: 'absolute',
        top: 70,
        width: 50,
        height: 50,
        left: 30,
    },
  })
  

export default Room;