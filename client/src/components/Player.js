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
    const [progress, setProgress] = useState(0);
    let timerId = null;
    let autoPlayTimer = 0;
    let savedTimerValue = 0;
    const TIME_CHECKING_IF_TRACK_FINISHED = 1000;

    useEffect(() => {
        socket.on("addedFirstTrack", (track) => {
            console.log('animate playing icon');
            setCurrentlyPlaying(track);
        });
        socket.on('playingNextTrack', (obj) => {
            console.log("playing next track:", obj.track);
            setCurrentlyPlaying(obj.track);
        });
        socket.on('joinRoom', (room) => {
            setCurrentlyPlaying(room.currentlyPlaying);
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
            autoPlayTimer -= TIME_CHECKING_IF_TRACK_FINISHED;
            // setProgress(100 - Math.floor(100 * autoPlayTimer/currentlyPlaying.duration));
            if (autoPlayTimer <= 5000) {
                socket.emit('startCountdownForNextTrack', room);
            }
            if (autoPlayTimer <= 0) {
                clearInterval(timerId);
                socket.emit('playNextTrack', room);
            }
        }, 1000);
    }

    // const pauseTimer = () => {
    //     clearInterval(timerId);
    // }

    // const resumeTimer = () => {
    //     startTimer();
    // }
    ////////////////////////////////////////

    const handlePlayPause = async () => {
        if (isPlaying) {
            await service.pausePlaying();
            setIsPlaying(false);
            // pauseTimer();
        } else {
            if (currentlyPlaying?.uri) {
                setIsPlaying(true);
                await service.startPlaying(currentlyPlaying, deviceId, false);
                // resumeTimer();
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
                        {/* <View style={styles.progress}>
                            <View style={[styles.progressFill, { width: `${progress}%` }]} />
                        </View> */}
                        <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
                            {user.id === hostId ? isPlaying ?
                                <Ionicons name="pause-outline" size={48} color="white"/>
                                :   <Ionicons name="play-outline" size={48} color="white"/> 
                                : <Text>Hello</Text>
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
        top: 300,
        width: '80%',
        height: 250,
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
        marginTop: 50,
        fontStyle: 'italic',
        fontWeight: 'bold',
    },
    artist: {
        position: 'relative',
        marginHorizontal: 20,
        color: '#1DB954',
        fontSize: 18,
    },
    progress: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        alignSelf: 'center',
        borderRadius: 10,
        width: '80%',
        height: 5,
        shadowColor: 'rgba(176, 38, 255, 0.5)',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 5,
    },
    progressFill: {
        height: '100%',
        borderRadius: 10,
        backgroundColor: 'rgba(176, 38, 255, 0.5)',
    },
})

export default Player;