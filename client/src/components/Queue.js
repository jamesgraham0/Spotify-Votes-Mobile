import { Text, View, StyleSheet, ScrollView, Animated } from 'react-native';
import React, { useState, useEffect } from "react";
import QueueTrack from './QueueTrack';
import { socket } from '../utils/socket';
import Constants from '../utils/constants';

const Queue = ({ queue, roomId, user }) => {
    const [q, setQ] = useState(queue);
    const [countdownForNextTrack, setCountdownForNextTrack] = useState(5);
    const [countdownStarted, setCountdownStarted] = useState(false);

    useEffect(() => {
        function fetchQueue() {
          console.log("fetching queue");
          fetch(`http://${Constants.EXPO_IP}:${Constants.BACKEND_PORT}/queue/${roomId}`)
            .then((res) => res.json())
            .then((data) => setQ(data))
            .catch((err) => console.error(err));
        }
        fetchQueue();
      }, []);

    useEffect(() => {
        socket.on("addedTrackToQueue", (q) => {
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
        socket.on('startCountdownForNextTrack', () => {
            setCountdownStarted(true);
        })
    }, [socket])

    useEffect(() => {
        if (countdownStarted) {
          startCountdownForNextTrack();
        }
    }, [countdownStarted]);
    
    function startCountdownForNextTrack() {
        let countdown = countdownForNextTrack;
        const intervalId = setInterval(() => {
            if (countdown > 0) {
                countdown--;
                setCountdownForNextTrack(countdown);
            } else {
                setCountdownStarted(false);
                clearInterval(intervalId);
                setCountdownForNextTrack(5);
            }
        }, 1000);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.queueText}>Queue</Text>
            {countdownStarted &&
                <Text style={styles.countdownForNextTrack}>{countdownForNextTrack}</Text>
            }
            <ScrollView
                style={styles.scrollView}
                bounces='true'
                contentInset={{top: 10, left: 0, bottom: 10, right: 0}}
            >
                {q?.length > 0 && q
                .map((track, index) => {
                    return (
                        <View key={index}>
                            <QueueTrack track={track} roomId={roomId} user={user}/>
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
        countdownForNextTrack: {
            position: 'absolute',
            left: '48%',
            marginVertical: 20,
            color: '#B33',
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