import React from 'react';
import { StyleSheet, View } from "react-native";
import Player from "./Player";
import Constants from '../utils/constants';

const Playing = ({ user, room }) => {

    return (
    <View style={[styles.container, {backgroundColor: Constants.SPOTIFY_BLACK}]}>
        <View style={styles.player}>
            <Player user={user} room={room}/>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    player: {
        backgroundColor: '#080808',
        width: '100%',
        height: '100%',
    }
});

export default Playing;
