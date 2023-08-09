import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import service from '../utils/service';
import TrackSearchResult from './TrackSearchResult';
import { pushQueue } from '../reducers/reducer';
import { useDispatch } from 'react-redux';
import { socket } from '../utils/socket';
import * as Haptics from 'expo-haptics';

const Search = ({ room }) => {
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const dispatch = useDispatch();
    const [q, setQ] = useState(room.queue);
    
    // Grabs the queue from the socket when screen first mounts
    useEffect(() => {
        function fetchQueue() {
          fetch(`http://10.0.0.22:4000/queue/${room.id}`)
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
        socket.on('joinRoom', (room) => {
            setQ(room.queue);
        });
    }, [socket])

    useEffect(() => {
        if (!search) return setSearchResults([])
        let cancel = false
        service.searchTrack(search).then(res => {
          if (cancel || !res.body) return
          setSearchResults(
            res.body.tracks.items.map(track => {
              let largeAlbumImage = track.album.images[1];
              const smallestAlbumImage = track.album.images.reduce(
                (smallest, image) => {
                  if (image.height < smallest.height) return image
                  return smallest
                },
                track.album.images[0]
              )
              return {
                artist: track.artists[0].name,
                title: track.name,
                uri: track.uri,
                smallImage: smallestAlbumImage.url,
                largeImage: largeAlbumImage.url,
                duration: track.duration_ms,
                votes: 0,
              }
            })
          )
        })
        return () => (cancel = true)
      }, [search]);

      const addTrack = (track) => {
        // dispatch(pushQueue({track: track, id: room.id}));
        if (!q.some(t => t.uri === track.uri)) {
          socket.emit("addTrack", {id:room.id, track:track});
        }
    }


    return (
        <View style={styles.container}>
            <TextInput
                style={styles.search}
                value={search}
                placeholder="Search..."
                placeholderTextColor="#555"
                returnKeyType="search"
                onChangeText={input => {
                  setSearch(input.replace(/^\s+/, ''));
              }}
            />
            <ScrollView
                style={styles.scrollView}
                bounces='true'
                contentInset={{top: 10, left: 0, bottom: 10, right: 0}}
                keyboardShouldPersistTaps='handled'
            >
                {searchResults.map(track => (
                    <TouchableOpacity 
                        key={track.uri}
                        onPress={() => {
                          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                          addTrack(track)
                        }}>
                        <TrackSearchResult
                            track={track}
                            inQueue={q.some(t => t.uri === track.uri)}
                        />
                    </TouchableOpacity>
                ))}
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
    search: {
        position: 'absolute',
        top: 3,
        left: 20,
        marginVertical: 20,
        color: '#BBB',
        fontSize: 30,
        height: 33,
        width: '90%',
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

export default Search;