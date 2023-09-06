import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import * as Haptics from 'expo-haptics';
import Constants from '../utils/constants';
import BackgroundCircles from '../components/BackgroundCircles';

const JoinOrCreateRoom = ({ navigation, route }) => {
    const { user } = route.params;
    const name = user.display_name;
    const isPremiumAccount = user.product !== "free";

    const handleCreateRoom = () => {
        navigation.navigate('CreateRoom', { user: user });
    }

    const handleJoinRoom = () => {
        navigation.navigate('EnterRoomCode', { user: user });
    }
    
    return (
        <View style={styles.container}>
            <BackgroundCircles/>
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
                        <Text style={styles.createRoomTextDisabled}>Spotify premium required</Text>
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
      top: 230,
      fontSize: 40,
      color: '#1DB954',
    },
    HiMessage: {
        top: 280,
        color: '#fff',
        fontSize: 30,
    },
    createRoomButtonDisabled: {
        top: 350,
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
        backgroundColor: '#191414',
    },
    createRoomButton: {
        top: 350,
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
    joinRoomButton: {
        marginTop: 25,
        top: 350,
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
        backgroundColor: '#191414',
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
    },
    circleGreen1: {
        position: 'absolute',
        width: 250,
        height: 250,
        borderRadius: 125,
        opacity: 0.4,
        top: -60,
        right: -60,
    },
      circleGreen2: {
        position: 'absolute',
        width: 50,
        height: 50,
        borderRadius: 25,
        opacity: 0.4,
        top: 150,
        right: 100,
    },
      circleGreen3: {
        position: 'absolute',
        width: 90,
        height: 90,
        borderRadius: 45,
        opacity: 0.4,
        top: 110,
        right: 130,
    },
      circleGreen4: {
        position: 'absolute',
        width: 150,
        height: 150,
        borderRadius: 75,
        opacity: 0.4,
        bottom: -20,
        left: -20,
    },
      circleGreen5: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50,
        opacity: 0.4,
        bottom: 100,
        left: -40,
    },
      circlePurple1: {
        position: 'absolute',
        backgroundColor: 'purple',
        width: 150,
        height: 150,
        borderRadius: 75,
        opacity: 0.4,
        top: -20,
        left: -10,
    },
      circlePurple2: {
        position: 'absolute',
        backgroundColor: 'purple',
        width: 80,
        height: 80,
        borderRadius: 40,
        opacity: 0.4,
        top: 100,
        left: -10,
    },
      circlePurple3: {
        position: 'absolute',
        backgroundColor: 'purple',
        width: 30,
        height: 30,
        borderRadius: 15,
        opacity: 0.4,
        top: 30,
        left: 120,
    },
      circlePurple4: {
        position: 'absolute',
        width: 150,
        height: 150,
        borderRadius: 75,
        opacity: 0.4,
        bottom: -20,
        right: -20,
    },
      circlePurple5: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50,
        opacity: 0.4,
        bottom: 100,
        right: -40,
    },
});
  

export default JoinOrCreateRoom;