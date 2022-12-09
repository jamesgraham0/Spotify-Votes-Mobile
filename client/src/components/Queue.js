import { Text, View, StyleSheet, ScrollView } from 'react-native';
import React, { useEffect, useState } from "react";
import QueueTrack from './QueueTrack';
import service from '../utils/service';


const Queue = ({ queue }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.queueText}>Queue</Text>
            <ScrollView
                style={styles.scrollView}
                bounces='true'
                contentInset={{top: 10, left: 0, bottom: 10, right: 0}}
            >
                {queue && queue.length > 0 && queue
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