import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

const QueueTrack = ({ track }) => {
    const { artist, albumUrl, title, uri} = track;

    return (
        <View style={styles.container}>
            <Image 
                style={styles.img}
                source={{uri: albumUrl}}
            />
            <View style={styles.titleArtistContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.artist}>{artist}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#080808',
        marginVertical: 10,
        marginHorizontal: 20,
        padding: 5,
        borderRadius: 5,
        height: 80,
    },
    titleArtistContainer: {
        marginHorizontal: 30,
        marginVertical: 10,
        width: 180,
        alignSelf: 'center',
    },
    title: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
    },
    artist: {
        fontSize: 16,
        color: '#fff',
    },
    img: {
        backgroundColor: 'black',
        width: 70,
        height: 70,
        borderRadius: 5,
    },
});

export default QueueTrack;