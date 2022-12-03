import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Keyboard } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';


const EnterRoomPassword = ({ navigation, route }) => {
    const [password, setPassword] = useState();
    const { user, room } = route.params;
    const { name, id } = room;
    

    const validatePassword = () => {
        Keyboard.dismiss();
        // TODO: Check if password is correct
        if (password === '1') {
            navigation.navigate('Room', {user: user, room: room});
        } else {
            alert('Incorrect password');
        }
      }

    const handleReturnToJoinRoom = () => {
        navigation.navigate('JoinRoom', { user: user });
    }

    return (
        <View style={styles.outerContainer}>
            <View style={styles.container}>
                <Text style={styles.enterRoomPassword}>Enter password for {name}</Text>
                <TouchableOpacity 
                onPress={() => {
                    handleReturnToJoinRoom();
                }} 
                style={styles.returnButton}
                >
                    <Ionicons name="chevron-back-circle-outline" size={32} color="grey" />
                </TouchableOpacity>
            </View>


            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.writeTaskWrapper}
            >
                <TextInput style={styles.passwordInput} placeholder={'password...'} value={password} onChangeText={word => setPassword(word)} />
                <TouchableOpacity onPress={() => validatePassword()}>
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
        justifyContent: 'center',
        backgroundColor: '#070707',
        height: 150,
        padding: 20,
    },
    enterRoomPassword: {
        color: '#fff',
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
    writeTaskWrapper: {
        position: 'absolute',
        bottom: 60,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    passwordInput: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        borderRadius: 60,
        borderColor: '#C0C0C0',
        borderWidth: 1,
        width: 250,
    },
    addWrapper: {
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
  

export default EnterRoomPassword;