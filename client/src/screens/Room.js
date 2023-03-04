import { StyleSheet, Text, View, TouchableOpacity, Alert, Modal, ScrollView, Animated } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Navbar from '../components/Navbar';
import { useDispatch } from 'react-redux';
import { deleteRoom } from '../reducers/reducer';
import service from '../utils/service';
import { socket } from '../utils/socket';
import { FontAwesome5 } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

const Room = ({ navigation, route }) => {
    const { user } = route.params;
    const [room, setRoom] = useState(route.params.room)
    const [newPersonInRoom, setNewPersonInRoom] = useState(false);
    const [userModalVisible, setUserModalVisible] = useState(false);
    const dispatch = useDispatch();
    const plusValue = useState(new Animated.Value(0))[0];
    const [iconColor, setIconColor] = useState('white');


    useEffect(() => {
        socket.on('joinRoom', (room) => {
            setNewPersonInRoom(true);
            console.log('setting room');
            setRoom(room);
        });
    }, [socket]);

    function handleUserJoinAnimation() {
        Animated.spring(plusValue, {
            toValue: -15,
            duration: 200,
            friction: 3,
            useNativeDriver: false,
        }).start(() => {
            setIconColor('white');
            setNewPersonInRoom(false);
            Animated.spring(plusValue, {
                toValue: 0,
                duration: 100,
                friction: 12,
                useNativeDriver: false,
            }).start();
        });
        setIconColor('green');
        setNewPersonInRoom(false);
    }
    

    useEffect(() => {
        setIconColor(newPersonInRoom ? 'green' : 'white');
    }, [newPersonInRoom]);

    const handleReturnToJoinOrCreateRoom = () => {
        // check if it's the host leaving, if so, delete the room
        // the host can be identified by their user id
        if (room.hostId === user.id) {
            Alert.alert(
                "Wait!",
                `You are the host of ${room.name}, if you leave, the room will be deleted`,
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "Delete Room", onPress: () => {
                        navigation.navigate('JoinOrCreateRoom', { user: user });
                        const pause = async () => {
                            await service.resetPlaybackToEmptyState();
                        }
                        pause();
                        // dispatch(deleteRoom(room));
                        
                        socket.emit("deleteRoom", room);
                    }}
                ]
            );
        } else {
            navigation.navigate('JoinOrCreateRoom', { user: user });
        }
    }

    if (room) {
        return (
            <View style={styles.outerContainer}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity 
                    onPress={() => {
                        handleReturnToJoinOrCreateRoom();
                    }} 
                    style={styles.returnButton}
                    >
                        <Ionicons name="chevron-back-circle-outline" size={32} color="grey" />
                    </TouchableOpacity>
                        <Text numberOfLines={1} style={styles.roomName}>{room.name}</Text>

                    {/* This is the icon to view people in room */}
                    <View style={styles.iconContainer}>
                        <TouchableOpacity
                            onPress={() => {
                                setUserModalVisible(!userModalVisible);
                            }}
                            >
                            { newPersonInRoom ?
                                handleUserJoinAnimation()
                                :
                                <Text></Text>
                            }
                            <FontAwesome5 style={styles.usersIcon} name="users" size={24} color={iconColor} />
                        
                        <Animated.View
                            style={[{
                                width: 20,
                                height: 20,
                                marginTop: plusValue,
                            }]}
                        >
                            <View style={[{
                                    opacity: 1,
                                    position: 'absolute',
                                    alignSelf: 'center',
                                    top: -24,
                                    left: 9,
                            }]}>
                                <Ionicons color={iconColor} name="add-circle-outline"></Ionicons>
                            </View>
                        </Animated.View>
                        </TouchableOpacity>
                    </View>

                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={userModalVisible}
                            onRequestClose={() => {
                                setUserModalVisible(!userModalVisible);
                            }}>
                            <BlurView intensity={30} tint={'dark'} style={styles.blur}>
                                <View style={styles.modalView}>
                                    <Text style={styles.numUsers}>
                                        {room.users.length === 1
                                            ? <Text>{room.users.length} Person</Text>
                                            : <Text>{room.users.length} People</Text>
                                        }                                    
                                        </Text>
                                    <ScrollView
                                        bounces='true'
                                        contentInset={{top: 0, left: 0, bottom: 20, right: 0}}
                                        style={styles.scrollView}
                                        >
                                        <View>
                                        {
                                            room.users.map((user) => {
                                                let count = 0;
                                                return (
                                                    <View key={user.id}>
                                                    <View style={styles.userContainer}>
                                                        <Text style={styles.count}>{++count}</Text>
                                                        {
                                                            count === 1 
                                                                ? <Text style={[{color: '#1DB954'}]}>Host</Text>
                                                                : <Text></Text>    
                                                        }
                                                        <Text numberOfLines={1} style={styles.user}>
                                                            <Text>{user.display_name}</Text>
                                                        </Text>
                                                    </View>
                                                    <View style={styles.userContainer}>
                                                        <Text style={styles.count}>2</Text>
                                                        <Text style={styles.user}>Shaun</Text>  
                                                    </View>
                                                </View>
                                            )
                                        })
                                    }
                                    </View>
                                    </ScrollView>
                                    <TouchableOpacity
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setUserModalVisible(!userModalVisible)}>
                                        <Text style={styles.buttonText}>Hide Users</Text>
                                    </TouchableOpacity>
                                </View>
                            </BlurView>
                        </Modal>
                </View>
                <Navbar user={user} room={room}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: '#040404',
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#0C0C0C',
        height: 100,
        padding: 20,
        paddingTop: 55,
    },
    roomName: {
        color: '#BBB',
        fontSize: 30,
        maxWidth: '70%',
        height: 40,
        textAlign: 'center',
    },
    returnButton: {
        width: 40,
        height: 40,
    },
    modalView: {
        top: 150,
        height: 500,
        margin: 20,
        backgroundColor: 'rgba(20, 20, 20, 0.9)',
        borderRadius: 20,
        padding: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    userContainer: {
        height: 50,
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: 'rgba(30, 30, 30, 0.5)',
        borderWidth: 1,
        borderRadius: 20,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        boxShadow: 'rgba(255, 255, 255, 0.5)',
    },
    user: {
        fontSize: 30,
        color: 'white',
        marginRight: 50,
    },
    count: {
        color: 'white',
        marginLeft: 30,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: 'rgba(0, 50, 100, 1)',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    blur: {
        height: 2000,
        backgroundColor: 'rgba(0, 50, 100, 0.1)',
    },
    scrollView: {
        width: '90%',
        margin: 15,
        borderColor: 'rgba(0, 50, 100, 1)',
        borderWidth: 3,
        borderTopColor: 'rgba(0, 0, 0, 0)',
        borderBottomColor: 'rgba(0, 0, 0, 0)',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    numUsers: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
    },
    iconContainer: {
        position: 'relative',
        width: 35,
        height: 35,
        padding: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
  })
  

export default Room;