import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import * as Haptics from 'expo-haptics';

const JoinOrCreateRoom = ({ navigation, route }) => {
    const { user } = route.params;
    const name = user.display_name;
    const isPremiumAccount = user.product !== "free";

    const handleCreateRoom = () => {
        navigation.navigate('CreateRoom', { user: user });
    }

    const handleJoinRoom = () => {
        navigation.navigate('JoinRoom', { user: user });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}> Spotify Votes </Text>
            <Text style={styles.HiMessage}> Hi, {name}! </Text>
            <TouchableOpacity 
                disabled={!isPremiumAccount}
                onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy); 
                    handleCreateRoom();
                }} 
                style={!isPremiumAccount ? styles.createRoomButtonDisabled : styles.createRoomButton}>
                    {isPremiumAccount ? 
                        <Text style={styles.createRoomText}>Create Room</Text> 
                        :
                        <Text style={styles.createRoomTextDisabled}>Need premium account to create room</Text>
                    }
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy); 
                handleJoinRoom();
            }} 
            style={styles.joinRoomButton}>
                <Text style={styles.joinRoomText}>Join Room</Text>
            </TouchableOpacity>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#191414',
      alignItems: 'center',
    },
    title: {
      top: 100,
      fontSize: 40,
      color: '#1DB954',
    },
    HiMessage: {
        top: 200,
        color: '#fff',
        fontSize: 30,
    },
    createRoomButtonDisabled: {
        top: 400,
        borderWidth: 2,
        borderColor: '#444',
        width: 300,
        height: 80,
        borderRadius: 50,
        shadowOpacity: 1,
        shadowColor: '#444',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    createRoomButton: {
        top: 400,
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
    },
    joinRoomButton: {
        marginTop: 25,
        top: 400,
        borderWidth: 2,
        borderColor: '#1DB954',
        width: 300,
        height: 80,
        borderRadius: 50,
        shadowOpacity: 1,
        shadowColor: '#1DB954',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 5,
        color: '#1DB954',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    createRoomTextDisabled: {
        position: 'absolute',
        color: '#444',
        textAlign: 'center',
        fontSize: 20,
    },
    createRoomText: {
        position: 'absolute',
        color: '#fff',
        fontSize: 24,
    },
    joinRoomText: {
        position: 'absolute',
        color: '#fff',
        fontSize: 24,
    }
  })
  

export default JoinOrCreateRoom;