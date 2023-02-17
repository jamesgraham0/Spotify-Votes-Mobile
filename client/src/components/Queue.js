import { Text, View, StyleSheet, ScrollView } from 'react-native';
import React, { useState, useEffect } from "react";
import QueueTrack from './QueueTrack';
import { socket } from '../utils/socket';

const Queue = ({ queue, roomId }) => {
    const [q, setQ] = useState(queue);

    useEffect(() => {
        socket.on("addedTrack", (q) => {
            setQ(q)
        });
        socket.on('playingNextTrack', (obj) => {
            // socket.emit('addTrack', {id:roomId, track:obj.track});
            setQ(obj.queue);
        });
    }, [socket])

    return (
        <View style={styles.container}>
            <Text style={styles.queueText}>Queue</Text>
            <ScrollView
                style={styles.scrollView}
                bounces='true'
                contentInset={{top: 10, left: 0, bottom: 10, right: 0}}
            >
                {q && q.length > 0 && q
                .map((track, index) => {
                    return (
                        <View key={index}>
                            <QueueTrack track={track}/>
                        </View>
                    )
                })}
            </ScrollView>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "black",
            width: '100%',
            height: '100%',
            alignItems: "center",
            opacity: 0.9,
        },
        queueText: {
            position: 'absolute',
            left: 20,
            marginVertical: 20,
            color: '#BBB',
            fontSize: 30,
        },
        scrollView: {
            position: 'absolute',
            top: 80,
            width: '90%',
            height: '80%',
            borderRadius: 30,
            borderStartColor: '#BBB',
            borderStartWidth: 1,
            borderEndColor: '#BBB',
            borderEndWidth: 1,
        }
    });

export default Queue;