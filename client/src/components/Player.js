import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import service from "../utils/service";
import { handlePlayNextTrack } from "../reducers/reducer";
import { Ionicons } from '@expo/vector-icons'; 

const Player = ({ room }) => {
    // const [isPlaying, setIsPlaying] = useState(false);
    // const { name, password, id, hostId, deviceId, users } = room;
    // const roomState = useSelector(state => state.reducer.rooms.find(room => room.id === id));
    // const currentlyPlaying = useSelector(state => state.reducer.rooms.find(room => room.id === id).currentlyPlaying);
    // const queue = useSelector(state => state.reducer.rooms.find(room => room.id === id).queue);
    // const dispatch = useDispatch();
    // let intervalCounter = 0;

    // useEffect(() => {
    //     const play = async () => {
    //         console.log("Playing", currentlyPlaying.title);
    //         await service.startPlaying(currentlyPlaying, deviceId, true);
    //         setIsPlaying(true);
    //             handleAutoPlay();
    //     }
    //     if (Object.keys(currentlyPlaying).length !== 0) {
    //         play();
    //     }
    // }, [currentlyPlaying]);

    // useEffect(() => {
    //     console.log("Queue has been changed --- ", queue.map(track => track.title));
    // }, [queue]);

    // const handlePlayPause = async () => {
    //     if (isPlaying) {
    //         await service.pausePlaying();
    //         setIsPlaying(false);
    //         clearInterval(intervalCounter);
    //     } else {
    //         if (roomState.currentlyPlaying.uri) {
    //             setIsPlaying(true);
    //             await service.startPlaying(roomState.currentlyPlaying, deviceId, false);
    //         }
    //     }
    // }

    // // TODO: can't access state variables inside of setInterval(), find another way to
    // //       play the next track in the queue
    // const handleAutoPlay = () => {
    //     intervalCounter = setInterval(() => {
    //         service.getPlaybackState().then((data) => {
    //             if (data && data.is_playing && data.item && data.item.duration_ms) {
    //                 setIsPlaying(true);
    //                 try {
    //                     console.log(data.progress_ms, data.item.duration_ms, queue.map(track => track.title));
    //                     console.log("other queue", roomState.queue);
    //                     if (data.item && data.item.duration_ms && data.progress_ms + 2000 > data.item.duration_ms) {
    //                         console.log("track finished");
    //                         console.log("Queue", queue);
    //                         if (queue.length > 0) {
    //                             console.log("about to play next track");
    //                             dispatch(handlePlayNextTrack({nextTrack:queue[0], id:id}));
    //                         }
    //                     }
    //                 } catch (error) {
    //                     console.log("Error: ", error);
    //                 }
    //             }
    //         });
    //     }, 2000);
    // }

    // const handleTrackFinish = () => {
    //     if (queue.length > 0) {
    //         const nextTrack = queue[0];

    //     }
    //         dispatch(popQueue(id));
    //         if (nextTrack) {
    //             service.startPlaying(nextTrack, deviceId, true);
    //             dispatch(setCurrentlyPlaying({ nextTrack: nextTrack, id: id }));
    //         } else {
    //             clearInterval(intervalCounter);
    //             setIsPlaying(false);
    //         }
    // }
    
    // useEffect(() => {
    //     intervalCounter = setInterval(handleTrackFinish, 2000);
    //     return () => clearInterval(intervalCounter);
    // }, [queue, id]);
    
    // if (roomState.currentlyPlaying.uri)
    return (
        <Text>Player</Text>
        // <View style={styles.container}>
        //     <View style={styles.player}>
        //         <Image style={styles.image} source={{uri: roomState.currentlyPlaying.largeImage}}/>
        //     </View>
        //         {roomState.currentlyPlaying.title && roomState.currentlyPlaying.artist &&
        //             <View style={styles.bottomContainer}>
        //                 <View style={styles.trackInfoContainer}>
        //                     <Text style={styles.title}>{roomState.currentlyPlaying.title}</Text>
        //                     <Text style={styles.artist}>{roomState.currentlyPlaying.artist}</Text> 
        //                 </View>
        //                 <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
        //                     {isPlaying ? // TODO if the id === hostId, then show the play/pause button 
        //                         <Ionicons name="pause-outline" size={48} color="white"/>
        //                     :   <Ionicons name="play-outline" size={48} color="white"/> 
        //                     }
        //                 </TouchableOpacity>
        //             </View>    
        //         }   
        // </View>
    );
}


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         width: '100%',
//         height: '100%',
//     },
//     player: {
//         position: 'absolute',
//         top: 50,
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//         width: 265,
//         height: 265,
//         borderRadius: 10,
//         shadowColor: 'rgba(29, 185, 84, 0.5)',
//         shadowOffset: {width: 0, height: 0},
//         shadowOpacity: 1,
//         shadowRadius: 40,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     image: {
//         width: 250,
//         height: 250,
//         borderRadius: 10,
//     },
//     bottomContainer: {
//         position: 'absolute',
//         top: 350,
//         width: '80%',
//         height: 220,
//     },
//     trackInfoContainer: {
//         position: 'absolute',
//         width: '100%',
//         height: '80%',
//         alignItems: 'start',
//     },
//     playButton: {
//         position: 'absolute',
//         bottom: 0,
//         alignSelf: 'center',
//     },
//     title: {
//         color: '#BBB',
//         fontSize: 30,
//         marginHorizontal: 20,
//         marginTop: 20,
//         fontStyle: 'italic',
//         fontWeight: 'bold',
//     },
//     artist: {
//         position: 'relative',
//         marginHorizontal: 20,
//         color: '#1DB954',
//         fontSize: 18,
//     },
// })

export default Player;