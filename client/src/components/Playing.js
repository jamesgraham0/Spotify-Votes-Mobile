import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from "react-native";
import service from '../utils/service';
import Player from "./Player";

const Playing = () => {
    const [currentlyPlaying, setCurrentlyPlaying] = useState();

    useEffect(() => {
        const getTrackStartPlaying = () => {
            service.getCurrentlyPlaying().then((track) => {
                setCurrentlyPlaying(track);
                console.log(track);
                service.startPlaying().then(() => {
                    console.log('Started playing from Playing.js');
                })
            })
        }
        getTrackStartPlaying();
    }, []);

    return (
    <View style={styles.container}>
        <View style={styles.player}>
            {currentlyPlaying && <Player currentlyPlaying={currentlyPlaying}/>}
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
