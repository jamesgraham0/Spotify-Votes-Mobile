import {
    StyleSheet,
    Text,
    View,
    TextInput,
    KeyboardAvoidingView,
    Keyboard,
    Linking,
    Alert
} from 'react-native';
import React, { useState } from 'react';
import uuid from 'react-native-uuid';
import Constants from '../../utils/constants';
import service from '../../utils/service';
import { socket } from '../../utils/socket';
import * as Haptics from 'expo-haptics';
import DarkBackgroundCircles from '../../components/BackgroundCircles2';
import Header from '../../components/Header';
import RoomButton from '../../components/RoomButton';

const CreateLocalRoomScreen = ({ navigation, route }) => {
    const { user } = route.params;
    const [roomName, setRoomName] = useState('');

    const handleReturnToLocalRoom = () => {
        navigation.navigate('CreateOrJoinLocalRoomScreen', { user: user });
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
            if (await Linking.canOpenURL(Constants.SPOTIFY_URL)) {
                await Linking.openURL(Constants.SPOTIFY_URL);
            }

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
    const validDeviceId = (deviceId) => {
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
        navigation.navigate('LocalRoom', { room: room, user: user });
        await service.resetPlaybackToEmptyState();
    };

    const validRoomName = () => {
        const trimmedRoomName = roomName.trim();
        return trimmedRoomName.length <= 20;
    };

    const handleCreateLocalRoom = async () => {
        Keyboard.dismiss();
        if (validRoomName()) {
            const room = await createNewRoom();
            let isActiveDeviceAndTransferred = await service.getMyDevicesAndTransferPlayback();
            if (validDeviceId(room.deviceId) && isActiveDeviceAndTransferred) {
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

    return (
        <View style={styles.outerContainer}>
            <DarkBackgroundCircles />
            <Header headerText="Create Room" onBackPress={handleReturnToLocalRoom}/>
            <Text style={styles.instructionText}>Give your new room a name!</Text>
            <KeyboardAvoidingView
                // behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.inputWrapper}
            >
                <TextInput
                    style={Constants.TEXT_INPUT_STYLES}
                    placeholder={'Chill party...'}
                    value={roomName}
                    onChangeText={word => setRoomName(word)}
                    maxLength={20}
                    placeholderTextColor="#888"
                /> 
                <RoomButton
                    onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                        handleCreateLocalRoom();
                    }}
                    buttonText="Create Room"
                    buttonStyle={styles.createLocalRoomScreenButton}
                />
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        height: 300,
        backgroundColor: '#191414',
    },
    createLocalRoomScreenButton: {
        borderWidth: 2,
        borderColor: '#B026FF',
        width: 300,
        height: 80,
        borderRadius: 50,
        shadowOpacity: 1,
        shadowColor: '#B026FF',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#191414',
    },
    returnButton: {
        width: 50,
        height: 50,
        marginTop: 36,
    },
    instructionText: {
        ...Constants.INSTRUCTION_TEXT_STYLES
    },
    inputWrapper: {
        backgroundColor: '#101010',
        width: '90%',
        height: '30%',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 30,
        margin: 20,
        shadowColor: '#1DB954',
        shadowOpacity: 0.3,
        shadowOffset: { width: -2, height: -2 },
    }
})


export default CreateLocalRoomScreen;