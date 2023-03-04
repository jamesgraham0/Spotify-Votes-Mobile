import { Text, View, StyleSheet, ScrollView } from 'react-native';
import React, { useState, useEffect } from "react";
import QueueTrack from './QueueTrack';
import { socket } from '../utils/socket';

const Queue = ({ queue, roomId }) => {
    const [q, setQ] = useState(queue);
    
    // Grabs the queue from the socket when screen first mounts
    useEffect(() => {
        function fetchQueue() {
          console.log("fetching queue");
          fetch(`http://192.168.1.67:3000/queue/${roomId}`)
            .then((res) => res.json())
            .then((data) => setQ(data))
            .catch((err) => console.error(err));
        }
        fetchQueue();
      }, []);

    useEffect(() => {
        socket.on("addedTrackToQueue", (q) => {
            console.log('animate queue icon')
            setQ(q)
        });
        socket.on('playingNextTrack', (obj) => {
            setQ(obj.queue);
        });
        socket.on('vote', (q) => {
            setQ(q);
        })
        socket.on('joinRoom', (room) => {
            setQ(room.queue);
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
                            <QueueTrack track={track} roomId={roomId}/>
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