import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Keyboard } from 'react-native';
import React, { useState, useEffect } from 'react';
import { socket } from '../../utils/socket';
import DarkBackgroundCircles from '../../components/BackgroundCircles2';
import Header from '../../components/Header';
import Constants from '../../utils/constants';
import { ScrollView } from 'react-native';

const JoinGlobalRoomScreen = ({ navigation, route }) => {
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
            <Header headerText="Select Room to Join" onBackPress={() => navigation.navigate('CreateOrJoinGlobalRoomScreen', { user: user })}/>
            
            <ScrollView>
                {rooms.length > 0 ? (
                    rooms.map((room, index) => (
                        <View key={index}>
                            <Text>{room.name}</Text>
                            <Text>{room.subtitle}</Text>
                            <Text>{room.users}</Text>
                            <Text>{room.track}</Text>
                            <Text>{room.art}</Text>
                        </View>
                    ))
                ) : (
                    <Text>No rooms at the moment. Try creating one!</Text>
                )}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: '#191414',
        justifyContent: 'center',
        alignItems: 'center',
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


export default JoinGlobalRoomScreen;