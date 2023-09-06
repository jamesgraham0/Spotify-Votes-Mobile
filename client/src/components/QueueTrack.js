import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { socket } from '../utils/socket';
import * as Haptics from 'expo-haptics';
import UsersVoted from './UsersVoted';

const QueueTrack = ({ track, roomId, user }) => {
    const { artist, smallImage, title, votes, addedBy } = track;

    const vote = () => {
        socket.emit('vote', { track: track, roomId: roomId, user: user });
    };

    return (
        <View style={styles.cardContainer}>
            <TouchableOpacity 
                key={track.uri}
                onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                    vote();
                }}>
                <View style={styles.container}>
                    <View style={styles.upperContainer}>
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
                    <View style={styles.userAddedContainer}>
                        <Text style={styles.userAdded}>Added by: {addedBy.display_name}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    userAdded: {
        color: 'white',
        textAlign: 'left',
        left: 5,
        fontSize: 12,
    },
    cardContainer: {
        padding: 2,
        marginVertical: 8,
    },
    upperContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'wrap',
        padding: 5,
        marginBottom: 2,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#050505',
    },
    userAddedContainer: {
        width: '100%',
    },
    container: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'wrap',
        height: 100,
        padding: 5,
        marginHorizontal: 15,
        borderRadius: 5,
        elevation: 5,
        shadowColor: 'rgba(29, 185, 84, 0.5)',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.7,
        shadowRadius: 5,
        backgroundColor: 'black',
    },
    titleArtistContainer: {
        width: '60%',
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
        width: 60,
        height: 60,
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