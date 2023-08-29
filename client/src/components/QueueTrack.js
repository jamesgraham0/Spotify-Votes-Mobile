import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { socket } from '../utils/socket';
import * as Haptics from 'expo-haptics';
import UsersVoted from './UsersVoted';

const QueueTrack = ({ track, roomId, user }) => {
    const { artist, smallImage, title, votes} = track;

    const vote = () => {
        socket.emit('vote', {track: track, id: roomId, user: user});
    }

    return (
        <View>
            <TouchableOpacity 
                key={track.uri}
                onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                    vote();
                }}>
                <View style={[styles.container, {backgroundColor: `rgba(0, ${Math.min(votes * 5, 200)}, 50, ${Math.min(votes / 10, 0.3)}))`}]}>
                    <Image 
                        style={styles.img}
                        source={{uri: smallImage}}
                    />
                    <View style={styles.titleArtistContainer}>
                        <Text numberOfLines={3} style={styles.title}>{title}</Text>
                        <Text numberOfLines={1} style={styles.artist}>{artist}</Text>
                    </View>
                    <View style={styles.votesContainer}>
                        <View style={styles.voteContainerVotes}>
                            <Text style={styles.voteNumber}>{votes}</Text>
                            <Text style={styles.votes}> votes</Text>
                        </View>
                        <View style={styles.voteContainerUsers}>
                            <UsersVoted track={track}/>
                        </View>
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
        shadowColor: 'rgba(29, 185, 84, 0.5)',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.7,
        shadowRadius: 60,
        backgroundColor: '#191414',
    },
    titleArtistContainer: {
        width: '60%',
        height: 70,
        backgroundColor: '#050505',
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
    votesContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    voteContainerVotes: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        borderBottomWidth: 1,
    },
    voteContainerUsers: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
    },
    voteNumber: {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
    },
    votes: {
        fontSize: 10,
        color: 'white'
    },
});

export default QueueTrack;