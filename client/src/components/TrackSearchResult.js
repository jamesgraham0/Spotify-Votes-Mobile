import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { BlurView } from 'expo-blur';

const TrackSearchResult = ({ track, inQueue }) => {

    return (
        <View>
            {inQueue ? 
            <View style={styles.container}>
                <Image 
                    style={styles.img}
                    source={{uri: track.smallImage}}
                />
                <View style={styles.titleArtistContainer}>
                    <Text style={styles.title}>{track.title}</Text>
                    <Text style={styles.artist}>{track.artist}</Text>
                </View>
                <BlurView intensity={30} tint={'dark'} style={styles.containerBlur}>
                    <Text style={{color: 'white', fontSize: 30}}>Added to queue</Text>
                </BlurView>
            </View> :
            <View style={styles.container}>
                <Image 
                    style={styles.img}
                    source={{uri: track.smallImage}}
                />
                <View style={styles.titleArtistContainer}>
                    <Text style={styles.title}>{track.title}</Text>
                    <Text style={styles.artist}>{track.artist}</Text>
                </View>
            </View>
            }       
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
    containerBlur: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        borderRadius: 5,
        backgroundColor: 'rgba(0, 50, 100, 0.2)',
        overflow: 'hidden',
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
    }
});

export default TrackSearchResult;