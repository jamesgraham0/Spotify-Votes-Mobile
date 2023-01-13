import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import service from "../utils/service";
import { popQueue, setCurrentlyPlaying } from "../reducers/reducer";
import { Ionicons } from '@expo/vector-icons'; 

const Player = ({ currentlyPlaying, queue, room }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const { name, password, id, hostId, deviceId, users } = room;
    const [currentTrack, setCurrentTrack] = useState({});
    let intervalCounter;

    useEffect(() => {
        setCurrentTrack(currentlyPlaying);
    }, [currentlyPlaying]);

    
    const handlePlayPause = async () => {
        if (isPlaying) {
            await service.pausePlaying();
            setIsPlaying(false);
            clearInterval(intervalCounter);
        } else {
            await service.startPlaying(currentTrack, queue, deviceId);
            if (currentTrack.uri) {
                // start the interval
                intervalCounter = setInterval(() => {
                    service.getPlaybackState().then(async (data) => {
                        if (data && data.is_playing) {
                            setIsPlaying(true);
                            try {
                                if (data.item && data.item.duration_ms) {
                                    console.log(data.progress_ms, data.item.duration_ms);
                                }
                                if (data.item.duration_ms && data.progress_ms + 5000 >= data.item.duration_ms) {
                                    console.log("Play next track in queue");
                                    if (queue.length > 0) {
                                        let nextTrack = queue[0];
                                        // dispatch(popQueue(id));
                                        // dispatch(setCurrentlyPlaying(room, nextTrack));
                                        setCurrentTrack(nextTrack);
                                        await service.startPlaying(nextTrack, queue, deviceId, true);
                                    }
                                }
                            } catch (error) {
                                console.log("catching up to track...");
                            }
                        } else {
                            setIsPlaying(false);
                        }
                    });
                }, 1000);            
            }
        }
    }

    if (currentTrack.uri !== "") {
        return (
            <View style={styles.container}>
                <View style={styles.player}>
                    <Image style={styles.image} source={{uri: currentTrack.largeImage}}/>
                </View>
                    {currentTrack.title && currentTrack.artist &&
                        <View style={styles.bottomContainer}>
                            <View style={styles.trackInfoContainer}>
                                <Text style={styles.title}>{currentTrack.title}</Text>
                                <Text style={styles.artist}>{currentTrack.artist}</Text> 
                            </View>
                            <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
                                {isPlaying ? // TODO if the id === hostId, then show the play/pause button 
                                    <Ionicons name="pause-outline" size={48} color="white"/>
                                :   <Ionicons name="play-outline" size={48} color="white"/> 
                                }
                            </TouchableOpacity>
                        </View>    
                    }   
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    player: {
        position: 'absolute',
        top: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: 265,
        height: 265,
        borderRadius: 10,
        shadowColor: 'rgba(29, 185, 84, 0.5)',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 1,
        shadowRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 250,
        height: 250,
        borderRadius: 10,
    },
    bottomContainer: {
        position: 'absolute',
        top: 350,
        width: '80%',
        height: 220,
    },
    trackInfoContainer: {
        position: 'absolute',
        width: '100%',
        height: '80%',
        alignItems: 'start',
    },
    playButton: {
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
    },
    title: {
        color: '#BBB',
        fontSize: 30,
        marginHorizontal: 20,
        marginTop: 20,
        fontStyle: 'italic',
        fontWeight: 'bold',
    },
    artist: {
        position: 'relative',
        marginHorizontal: 20,
        color: '#1DB954',
        fontSize: 18,
    },
})

export default Player;