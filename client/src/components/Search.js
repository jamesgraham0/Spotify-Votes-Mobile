import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import service from '../utils/service';
import TrackSearchResult from './TrackSearchResult';
import { pushQueue } from '../reducers/reducer';
import { useDispatch } from 'react-redux';


const Search = ({ room }) => {
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const dispatch = useDispatch();

    useEffect(() => {
        if (!search) return setSearchResults([])
    
        let cancel = false
        service.searchTrack(search).then(res => {
          if (cancel) return
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
                largeImage: largeAlbumImage.url
              }
            })
          )
        })
        return () => (cancel = true)
      }, [search]);

      const addTrack = (track) => {
        dispatch(pushQueue({track: track, roomId: room.id}));
    }


    return (
        <View style={styles.container}>
            <TextInput
                style={styles.search}
                value={search}
                placeholder="Search..."
                placeholderTextColor="#555"
                returnKeyType="search"
                onChangeText={input => setSearch(input)}
            />
            <ScrollView
                style={styles.scrollView}
                bounces='true'
                contentInset={{top: 10, left: 0, bottom: 10, right: 0}}
            >
                {searchResults.map(track => (
                    <TouchableOpacity 
                        key={track.uri}
                        onPress={() => addTrack(track)}>
                        <TrackSearchResult
                            track={track}
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
        height: 30,
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