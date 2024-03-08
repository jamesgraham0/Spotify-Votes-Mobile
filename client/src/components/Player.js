import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import service from "../utils/service";
import { Ionicons } from '@expo/vector-icons';
import { socket } from "../utils/socket";
import Constants from "../utils/constants";

const Player = ({ user, room }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentlyPlaying, setCurrentlyPlaying] = useState({});
    const { hostId, deviceId, queue } = room;
    const TIME_CHECKING_IF_TRACK_FINISHED = 1000;
    let timerId = null;
    let autoPlayTimer = 0;

    useEffect(() => {
        socket.on("addedFirstTrack", async (track) => {
            setCurrentlyPlaying(track);
            if (user.id === hostId) {
                await service.startPlaying(track, deviceId, true);
            }
        });
        socket.on('playingNextTrack', (obj) => {
            if (user.id === hostId) {
                setCurrentlyPlaying(obj.nextTrack);
            }
        });
        socket.on('joinRoom', (room) => {
            setCurrentlyPlaying(room.currentlyPlaying);
        })
    }, [socket]);

    useEffect(() => {
        const play = async () => {
            autoPlayTimer = currentlyPlaying.duration;
            let canPlay = await service.startPlaying(currentlyPlaying, deviceId, true);
            setIsPlaying(canPlay);
            startTimer();
        }
        if (user.id === hostId && currentlyPlaying && Object.keys(currentlyPlaying).length !== 0) {
            play();
        }
    }, [currentlyPlaying]);

    ////////////// TIMER ///////////////////
    const startTimer = () => {
        timerId = setInterval(() => {
            autoPlayTimer -= TIME_CHECKING_IF_TRACK_FINISHED;
            if (queue.length > 0 && autoPlayTimer <= 5000) {
                socket.emit('startCountdownForNextTrack', room);
            }
            if (autoPlayTimer <= 0) {
                clearInterval(timerId);
                socket.emit('playNextTrack', room);
            }
        }, 1000);
    }

    ////////////////////////////////////////

    const handlePlayPause = () => {
        if (isPlaying) {
            handlePause();
        } else {
            handlePlay();
        }
    }

    const handlePause = async () => {
        await service.pausePlaying();
        setIsPlaying(false);
    }

    const handlePlay = async () => {
        if (currentlyPlaying?.uri && deviceId && deviceId !== '') {
            setIsPlaying(true);
            await service.startPlaying(currentlyPlaying, deviceId);
        } else {
            alert("There was an issue finding an active spotify device, reload the app and try again.");
        }
    }

    if (currentlyPlaying?.uri) {
        return (
            <View style={styles.container}>
                <View style={[styles.player, { backgroundColor: Constants.SPOTIFY_BLACK }]}>
                    <Image style={styles.image} source={{ uri: currentlyPlaying.largeImage }} />
                </View>
                {currentlyPlaying.title && currentlyPlaying.artist &&
                    <View style={styles.bottomContainer}>
                        <View style={styles.trackInfoContainer}>
                            <Text style={styles.title}>{currentlyPlaying.title}</Text>
                            <Text style={styles.artist}>{currentlyPlaying.artist}</Text>
                        </View>
                        <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
                            {user.id === hostId ? isPlaying ?
                                <Ionicons name="pause-outline" size={48} color="white" />
                                : <Ionicons name="play-outline" size={48} color="white" />
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
        width: 265,
        height: 265,
        borderRadius: 10,
        shadowColor: 'rgba(29, 185, 84, 0.5)',
        shadowOffset: { width: 0, height: 0 },
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
})

export default Player;