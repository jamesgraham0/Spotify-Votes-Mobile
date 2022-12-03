import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import service from "../utils/service";
import { Ionicons } from '@expo/vector-icons'; 

const Player = ({ currentlyPlaying }) => {
    const [isPlaying, setIsPlaying] = useState(true);
 
    useEffect(() => {
        const initializePlayer = async () => {
            // check if the user is already playing something
            const playBackState = await service.getPlaybackState();
            setIsPlaying(playBackState.body.is_playing);
        }
        initializePlayer();
    }, [])

    const handlePlayPause = async () => {
        if (isPlaying) {
            await service.pausePlaying();
            setIsPlaying(false);
        } else {
            await service.startPlaying();
            setIsPlaying(true);
        }
    }

    if (currentlyPlaying.image !== '') {
        const { artistName, image, trackName, trackUri} = currentlyPlaying;
        return (
            <View style={styles.container}>
                <View style={styles.player}>
                    <Image style={styles.image} source={{uri: image}}/>
                </View>
                    {trackName && artistName &&
                        <View style={styles.bottomContainer}>
                            <View style={styles.trackInfoContainer}>
                                <Text style={styles.title}>{trackName}</Text>
                                <Text style={styles.artist}>{artistName}</Text> 
                            </View>
                            <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
                                {isPlaying ? <Ionicons name="pause-outline" size={48} color="white"/>
                                           : <Ionicons name="play-outline" size={48} color="white"/> }
                            </TouchableOpacity>
                        </View>    
                    }   
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <View style={styles.player}>
                        <View style={styles.trackInfoContainer}>

                        </View>
                </View>
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