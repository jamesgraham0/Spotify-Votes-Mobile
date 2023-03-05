import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { socket } from '../utils/socket';

const QueueTrack = ({ track, roomId }) => {
    const { artist, smallImage, title, uri, votes} = track;
    const [isPressed, setIsPressed] = useState(false);

    useEffect(() => {
        let timerId;

        if (isPressed) {
        timerId = setTimeout(() => {
            setIsPressed(false);
        }, 200);
        }

        return () => clearTimeout(timerId);
    }, [isPressed]);

    const textColor = isPressed ? '#00ff00' : '#ffffff';

    function handleColor() {
        setIsPressed(true);
    }

    const vote = () => {
        socket.emit('vote', {track:track, id: roomId});
    }

    return (
        <View>
            <TouchableOpacity 
                key={track.uri}
                onPress={() => {
                    vote();
                    handleColor();
                }}>
                <View style={styles.container}>
                    <Image 
                        style={styles.img}
                        source={{uri: smallImage}}
                        />
                    <View style={styles.titleArtistContainer}>
                        <Text numberOfLines={3} style={styles.title}>{title}</Text>
                        <Text numberOfLines={1} style={styles.artist}>{artist}</Text>
                    </View>
                    <View style={styles.voteContainer}>
                        <Text style={[styles.voteNumber, { color: textColor }]}>{votes}</Text>
                        <Text style={[styles.votes, { color: textColor }]}> votes</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#080808',
        marginVertical: 10,
        marginHorizontal: 20,
        padding: 5,
        borderRadius: 5,
        height: 80,
        overflow: 'hidden',
    },
    titleArtistContainer: {
        width: '60%',
        height: 70,
        backgroundColor: '#111',
        borderRadius: 5,
        margin: 5,
        padding: 5,
    },
    title: {
        color: '#fff',
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontSize: 14,
    },
    artist: {
        fontSize: 12,
        color: '#fff',
        color: '#1DB954',
    },
    img: {
        backgroundColor: 'black',
        width: 70,
        height: 70,
        borderRadius: 5,
    },
    voteContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },  
    voteNumber: {
        fontSize: 14,
    },
    votes: {
        fontSize: 10,
    },
});

export default QueueTrack;