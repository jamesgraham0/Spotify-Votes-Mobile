import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Keyboard } from 'react-native';
import React, { useState, useEffect } from 'react';
import { socket } from '../../utils/socket';
import DarkBackgroundCircles from '../../components/BackgroundCircles2';
import Header from '../../components/Header';
import Constants from '../../utils/constants';
import { ScrollView } from 'react-native';

const CreateGlobalRoomScreen = ({ navigation, route }) => {
    const { user } = route.params;

    const rooms = [
        {
            name: 'Room 1',
            subtitle: 'Subtitle 1',
            users: '3/40',
            track: 'Track 1',
            art: 'Art 1',
        },
        {
            name: 'Room 2',
            subtitle: 'Subtitle 2',
            users: '5/40',
            track: 'Track 2',
            art: 'Art 2',
        },
    ];

    return (
        <View style={styles.outerContainer}>
            <DarkBackgroundCircles />
            <Header headerText="Create a new room" onBackPress={() => navigation.navigate('CreateOrJoinGlobalRoomScreen', { user: user })}/>
        </View>
    )
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: '#191414',
    },
    writeTaskWrapper: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 100,
    },
    codeInputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 200,
    },
    codeBox: {
        width: 60,
        height: 60,
        marginHorizontal: 5,
        backgroundColor: 'black',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'grey',
    },
    codeInput: {
        flex: 1,
        color: 'white',
        fontSize: 24,
        textAlign: 'center',
    },
})


export default CreateGlobalRoomScreen;