import { 
    StyleSheet, 
    Text, 
    View, 
    TouchableOpacity, 
    TextInput, 
    KeyboardAvoidingView, 
    Keyboard, 
    Linking,
    Alert
} from 'react-native';
import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import uuid from 'react-native-uuid';
import Constants from '../utils/constants';
import service from '../utils/service';
import { socket } from '../utils/socket';
import * as Haptics from 'expo-haptics';

const CreateRoom = ({ navigation, route }) => {
    const { user } = route.params;
    const [roomName, setRoomName] = useState('');
    
    const handleReturnToJoinOrCreateRoom = () => {
        navigation.navigate('JoinOrCreateRoom', { user: user });
    }
    
    const createNewRoom = async () => {
        return {
            name: roomName, 
            hostId: user.id,
            code: '00000',
            id: uuid.v4(),
            deviceId: await service.getDeviceId(),
            users: [user],
            currentlyPlaying: {},
            queue: [],
        }
    }
    
    const handleRedirectToSpotify = async () => {
        try {
            await Linking.openURL(Constants.SPOTIFY_URL);
            
            // stall to get devices when the user comes back
            const delayMilliseconds = 2000;
            await new Promise(resolve => setTimeout(resolve, delayMilliseconds));
            await service.getMyDevicesAndTransferPlayback();
        } catch (error) {
            console.log("Error trying to handle redirect to Spotify", error);
        }
    };

    // DeviceId must not be an empty string or undefined
    // If the user redirects back to Spotify Votes after
    // being redirected to Spotify, the API call to get
    // the deviceId will be cut short, causing errors in
    // the room.
    const validateDeviceId = (deviceId) => {
        return (
            deviceId !== '' 
            && 
            deviceId !== undefined 
            && 
            deviceId.length === Constants.DEVICE_ID_LENGTH
        )
    };

    const handleNavigateToNewRoom = async (room) => {
        socket.emit('createRoom', room);
        navigation.navigate('Room', {room: room, user: user});
        await service.resetPlaybackToEmptyState();
    };

    const validateRoomName = () => {
        const trimmedRoomName = roomName.trim();
        return trimmedRoomName.length <= 20;
    };

    const handleCreateRoom = async () => {
        Keyboard.dismiss();
        if (validateRoomName()) {
            const room = await createNewRoom();
            let isActiveDeviceAndTransferred = await service.getMyDevicesAndTransferPlayback();
            if (validateDeviceId(room.deviceId) && isActiveDeviceAndTransferred) {
                await handleNavigateToNewRoom(room);
            } else {
                const supported = await Linking.canOpenURL(Constants.SPOTIFY_URL);
                if (supported) {
                    Alert.alert(
                        'Wait',
                        "Redirecting you to Spotify. Try creating a room after it opens.",
                        [
                            {
                                text: "Open Spotify",
                                onPress: async () => {
                                    await handleRedirectToSpotify();
                                }
                            }
                        ]
                    );
                } else {
                    alert(`Open ${Constants.SPOTIFY_URL} in your browser before creating a room`);
                }
            }
        } else {
            alert(`Room name must be at most 20 characters but is currently ${roomName.length}`);
        }
    };

    const header = () => {
        return <View style={styles.container}>
                    <TouchableOpacity
                        onPress={handleReturnToJoinOrCreateRoom}
                        style={styles.returnButton}
                    >
                        <Ionicons name="chevron-back-circle-outline" size={32} color="grey" />
                    </TouchableOpacity>
                    <Text style={styles.createRoomText}>Create Room</Text>
                </View>
    };
            
    return (
        <View style={styles.outerContainer}>
            {header()}
            <Text style={styles.instructionText}>Give your new room a name!</Text>
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
                <TouchableOpacity onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                    handleCreateRoom()
                }}>
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
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#070707',
        height: '13%',
        padding: 20,
    },
    createRoomText: {
        color: '#fff',
        fontSize: 24,
        maxWidth: '70%',
        textAlign: 'center',
        marginHorizontal: 56,
        marginTop: 20,
    },
    returnButton: {
        width: 50,
        height: 50,
        marginTop: 36,
    },
    instructionText: {
        color: '#BBB',
        fontSize: 20,
        marginHorizontal: 60,
        marginTop: 100,
        marginBottom: 10,
    },
    inputWrapper: {
        backgroundColor: '#101010',
        width: '90%',
        height: '25%',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 30,
        margin: 20,
        shadowColor: '#1DB954',
        shadowOpacity: 0.3,
        shadowOffset: { width: -2, height: -2 },
    },
    textInput: {
        marginTop: 50,
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
        marginVertical: 20,
        width: 60,
        height: 60,
        borderRadius: 60,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#1DB954',
        shadowOpacity: 0.5,
        shadowColor: '#1DB954',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 5,
        backgroundColor: '#191414',
    },
    addText: {
        color: '#fff',
        fontSize: 24,
    }
  })
  

export default CreateRoom;