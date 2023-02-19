import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import service from "../utils/service";
import { handlePlayNextTrack } from "../reducers/reducer";
import { Ionicons } from '@expo/vector-icons'; 
import { socket } from "../utils/socket";

const Player = ({ user, room }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentlyPlaying, setCurrentlyPlaying] = useState({});
    const { name, password, id, hostId, deviceId, users } = room;
    let timerId = null;
    let autoPlayTimer = 0;
    const TIME_CHECKING_IF_TRACK_FINISHED = 1000;

    useEffect(() => {
        socket.on("addedFirstTrack", (track) => {
            console.log('addedFirstTrack')
            setCurrentlyPlaying(track);
        });
        socket.on('playingNextTrack', (obj) => {
            console.log("playing next track:", obj.track);
            setCurrentlyPlaying(obj.track);
        });
    }, [socket]);

    useEffect(() => {
        if (user.id === hostId) {
            autoPlayTimer = currentlyPlaying.duration;
            const play = async () => {
                await service.startPlaying(currentlyPlaying, deviceId, true);
                setIsPlaying(true);
                startTimer();
            }
            if (currentlyPlaying && Object.keys(currentlyPlaying).length !== 0) {
                play();
            }
        }
    }, [currentlyPlaying]);


    ////////////// TIMER ///////////////////
    const startTimer = () => {
        timerId = setInterval(() => {
            autoPlayTimer-= TIME_CHECKING_IF_TRACK_FINISHED;
            console.log(`Percent of track done: ${100 - Math.floor(100 * autoPlayTimer/currentlyPlaying.duration)}%`);

            if (autoPlayTimer <= 0) {
                clearInterval(timerId);
                socket.emit('playNextTrack', room);
            }
        }, 1000);
    }

    const pauseTimer = () => {
        clearInterval(timerId);
    }

    const resumeTimer = () => {
        startTimer();
    }
    ////////////////////////////////////////


    const handlePlayPause = async () => {
        if (user.id === hostId) {
            console.log("this is the host:", user.name);
            if (isPlaying) {
                await service.pausePlaying();
                setIsPlaying(false);
                pauseTimer();
            } else {
                if (currentlyPlaying?.uri) {
                    setIsPlaying(true);
                    await service.startPlaying(currentlyPlaying, deviceId, false);
                    resumeTimer();
                }
            }
        }
    }
    
    if (currentlyPlaying?.uri) {
        return (
            <View style={styles.container}>
            <View style={styles.player}>
                <Image style={styles.image} source={{uri: currentlyPlaying.largeImage}}/>
            </View>
                {currentlyPlaying.title && currentlyPlaying.artist &&
                    <View style={styles.bottomContainer}>
                        <View style={styles.trackInfoContainer}>
                            <Text style={styles.title}>{currentlyPlaying.title}</Text>
                            <Text style={styles.artist}>{currentlyPlaying.artist}</Text> 
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
        );
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