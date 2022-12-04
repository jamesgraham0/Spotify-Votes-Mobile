import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from "react-native";
import service from '../utils/service';
import Player from "./Player";

const Playing = ({ currentlyPlaying }) => {
    // const [currentlyPlaying, setCurrentlyPlaying] = useState();

    // useEffect(() => {
    //     const getTrack = async () => {
    //         let track = await service.getCurrentlyPlaying();
    //         setCurrentlyPlaying(track);
    //     }
    //     getTrack();
    // }, []);

    return (
    <View style={styles.container}>
        <View style={styles.player}>
            <Player currentlyPlaying={currentlyPlaying}/>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#191414",
        alignItems: "center",
    },
    player: {
        backgroundColor: '#080808',
        width: '100%',
        height: '100%',
    }
});

export default Playing;
