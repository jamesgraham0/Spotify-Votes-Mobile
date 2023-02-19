import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Keyboard } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import uuid from 'react-native-uuid';
import { createRoom } from '../reducers/reducer';
import { useDispatch } from 'react-redux';
import service from '../utils/service';
import { socket } from '../utils/socket';

const CreateRoom = ({ navigation, route }) => {
    const { user } = route.params;
    const [roomName, setRoomName] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleReturnToJoinOrCreateRoom = () => {
        navigation.navigate('JoinOrCreateRoom', { user: user });
    }
    
    const handleCreateRoom = async () => {
        Keyboard.dismiss();
        if (validNameAndPassword()) {
            await service.resetPlaybackToEmptyState();
            const room = {
                name: roomName, 
                password: password,
                hostId: user.id,
                id: uuid.v4(),
                deviceId: await service.getDeviceId(),
                users: [user],
                currentlyPlaying: {},
                queue: [],
            }
            if (room.deviceId !== '' && room.deviceId !== undefined) {
                socket.emit('createRoom', room);
                navigation.navigate(
                    'Room', 
                    {room: room,
                    user: user}
                );
                // dispatch(createRoom(room));
            } else {
                alert('Please open Spotify on your device and try again.');
            }
        }
    }

    const validNameAndPassword = () => {
        return roomName !== '' && password !== '';
    }


    return (
        <View style={styles.outerContainer}>
            <View style={styles.container}>
                <Text style={styles.createRoomText}>Create Room</Text>
            </View>
            <Text style={styles.instructionText}>Give your room a name and password. Others will use this password to join your room!</Text>
            <TouchableOpacity 
            onPress={() => {
                handleReturnToJoinOrCreateRoom();
            }} 
            style={styles.returnButton}
            >
                <Ionicons name="chevron-back-circle-outline" size={32} color="grey" />
            </TouchableOpacity>



            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.inputWrapper}
            >
                <TextInput 
                    style={styles.textInput} 
                    placeholder={'Project X 2.0...'} 
                    value={roomName} 
                    onChangeText={word => setRoomName(word)}
                    placeholderTextColor="#888" 
                />
                <TouchableOpacity onPress={() => validatePassword()}>
                </TouchableOpacity>
            
                <TextInput 
                    style={styles.textInput} 
                    placeholder={'Password123...'} 
                    value={password} 
                    onChangeText={word => setPassword(word)} 
                    placeholderTextColor="#888"
                />
                <TouchableOpacity onPress={() => handleCreateRoom()}>
                    <View style={styles.addWrapper}>
                        <Text style={styles.addText}>+</Text>
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: '#191414',
        alignItems: 'center',
    },
    container: {
      flex: 1,
      backgroundColor: '#191414',
      alignItems: 'center',
    },
    createRoomText: {
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
    instructionText: {
        position: 'absolute',
        top: 150,
        left: 30,
        color: '#BBB',
        fontSize: 20,
        width: '70%',
        height: 90,
        margin: 10,
        textAlign: 'left',
    },
    inputWrapper: {
        backgroundColor: '#101010',
        position: 'absolute',
        top: 250,
        width: '90%',
        height: '30%',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 30,
        margin: 20,
        shadowColor: '#1DB954',
        shadowOpacity: 0.3,
        shadowOffset: { width: -2, height: -2 },
    },
    textInput: {
        margin: 30,
        padding: 10,
        width: 250,
        fontSize: 24,
        color: '#fff',
        backgroundColor: '#101010',
        borderStartColor: '#B026FF',
        borderStartWidth: 1,
        borderBottomColor: '#B026FF',
        borderBottomWidth: 2,
        borderBottomEndRadius: 100,
    },
    addWrapper: {
        margin: 70,
        width: 60,
        height: 60,
        borderRadius: 60,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#1DB954',
        shadowOpacity: 1,
        shadowColor: '#1DB954',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 5,
    },
    addText: {
        color: '#fff',
        fontSize: 24,
    }
  })
  

export default CreateRoom;