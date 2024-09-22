import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Keyboard } from 'react-native';
import React, { useState, useEffect } from 'react';
import { socket } from '../../utils/socket';
import DarkBackgroundCircles from '../../components/BackgroundCircles2';
import Header from '../../components/Header';
import Constants from '../../utils/constants';
import { ScrollView } from 'react-native';
import RoomToJoin from '../../components/GlobalRoomToJoin';

const JoinGlobalRoomScreen = ({ navigation, route }) => {
    const { user } = route.params;

    // TODO: Fetch rooms data from server --> Redis
    const rooms = [
        {
            id: Math.random().toString(36).substring(7),
            name: '12345678901234567890',
            subtitle: 'Subtitle 1 - This is a long subtitle that describes the room in detail',
            users: ["james", "shaun", "josh", "jason", "jimmy"],
            track: 'Where I Belong',
            art: 'Art 1',
        },
        {
            id: Math.random().toString(36).substring(7),
            name: 'Room 2',
            subtitle: 'Subtitle 2',
            users: ["james", "shaun"],
            track: 'Track 2',
            art: 'Art 2',
        },
    ];

    return (
        <View style={styles.container}>
        <DarkBackgroundCircles />
        <Header headerText="Select Room to Join" onBackPress={() => navigation.navigate('CreateOrJoinGlobalRoomScreen', { user: user })}/>
        <ScrollView
            style={styles.scrollView}
            bounces='true'
            contentInset={{top: 10, left: 0, bottom: 10, right: 0}}
        >
            {rooms.length > 0 ? (
                    rooms.map((room, index) => (
                        <View key={index}>
                            <RoomToJoin room={room} user={user} />
                        </View>
                    ))
                ) : (
                    <Text style={Constants.INSTRUCTION_TEXT_STYLES}>No global rooms at the moment. Try creating a new one!</Text>
                )}
        </ScrollView>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: "center",
        backgroundColor: "#191414",
    },
    scrollView: {
        position: 'absolute',
        top: 140,
        width: '90%',
        height: '75%',
        borderRadius: 30,
        borderStartColor: '#BBB',
        borderStartWidth: 1,
        borderEndColor: '#BBB',
        borderEndWidth: 1,
    }
})


export default JoinGlobalRoomScreen;