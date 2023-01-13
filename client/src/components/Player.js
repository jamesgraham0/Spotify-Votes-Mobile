import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import service from "../utils/service";
import { popQueue, setCurrentlyPlaying } from "../reducers/reducer";
import { Ionicons } from '@expo/vector-icons'; 

const Player = ({ room }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    // const [currentTrack, setCurrentTrack] = useState({});
    // const [queue, setQueue] = useState([]);
    const { name, password, id, hostId, deviceId, users } = room;
    const roomState = useSelector(state => state.reducer.rooms.find(room => room.id === id));
    const dispatch = useDispatch();
    let intervalCounter;

    useEffect(() => {
        console.log("ROOM state!", roomState);
    }, [roomState]);


    const handlePlayPause = async () => {
        if (isPlaying) {
            await service.pausePlaying();
            setIsPlaying(false);
            clearInterval(intervalCounter);
        } else {
            if (roomState.currentlyPlaying.uri) {
                setIsPlaying(true);
                await service.startPlaying(roomState.currentlyPlaying, deviceId, false);
                handleAutoPlay();
            }
        }
    }
    
    const handleAutoPlay = () => {
            intervalCounter = setInterval(() => {
                service.getPlaybackState().then( async (data) => {
                    if (data && data.is_playing) {
                        setIsPlaying(true);
                        try {
                            console.log(data.progress_ms, data.item.duration_ms);
                            if (data.item && data.item.duration_ms && data.progress_ms + 2000 > data.item.duration_ms) {
                                if (roomState.queue.length > 0) {
                                    await service.startPlaying(roomState.queue[0], deviceId, true);
                                    dispatch(setCurrentlyPlaying({ nextTrack: roomState.queue[0], id:id }));    
                                    dispatch(popQueue(id));
                                } 
                            }
                        } catch (error) {
                            console.log("Error: ", error);
                        }
                    } else {
                        setIsPlaying(false);
                        clearInterval(intervalCounter);
                    }
                });
            }, 3000);
        }
    
        if (roomState.currentlyPlaying.uri)
        return (
            <View style={styles.container}>
                <View style={styles.player}>
                    <Image style={styles.image} source={{uri: roomState.currentlyPlaying.largeImage}}/>
                </View>
                    {roomState.currentlyPlaying.title && roomState.currentlyPlaying.artist &&
                        <View style={styles.bottomContainer}>
                            <View style={styles.trackInfoContainer}>
                                <Text style={styles.title}>{roomState.currentlyPlaying.title}</Text>
                                <Text style={styles.artist}>{roomState.currentlyPlaying.artist}</Text> 
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