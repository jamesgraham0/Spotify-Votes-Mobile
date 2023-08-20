import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';

const UsersVoted = ({ track }) => {
    const { usersVoted } = track;
    const [userModalVisible, setUserModalVisible] = useState(false);
    let usersVotedValues = Object.values(usersVoted);

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                key={track.uri}
                onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setUserModalVisible(!userModalVisible);
            }}>
                    {usersVotedValues.map((userVoted) => {
                        return (
                            <Image 
                                key={track.uri}
                                style={styles.img}
                                source={{uri: userVoted.image}}
                            />
                        )
                    })}
                {
                    usersVotedValues.length > 3 &&
                    <Text style={styles.ellipses}>
                        ...
                    </Text>
                }
            </TouchableOpacity>
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
                                <Text>{usersVotedValues.length} People</Text>
                            </Text>
                            <ScrollView
                                bounces='true'
                                contentInset={{top: 0, left: 0, bottom: 20, right: 0}}
                                style={styles.scrollView}
                                >
                                <View>
                                {
                                    usersVotedValues.map((userVoted) => {
                                        let count = 0;
                                        return (
                                            <View key={track.uri}>
                                            <View style={styles.userContainer}>
                                                <Text style={styles.count}>{++count}</Text>
                                                {
                                                    count === 1 
                                                        ? <Text style={[{color: '#1DB954'}]}>Host</Text>
                                                        : <Text></Text>    
                                                }
                                                <Text numberOfLines={1} style={styles.user}>
                                                    <Text>{userVoted.name}</Text>
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
                            onPress={() => {
                                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                                setUserModalVisible(!userModalVisible)
                            }}>
                                <Text style={styles.buttonText}>Hide Users</Text>
                            </TouchableOpacity>
                        </View>
                    </BlurView>
                </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5,
        height: 30,
        width: 32,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: 10,
        height: 10,
        borderRadius: 50,
        margin: 2,
    },
    voteContainer: {
        flex: 1,
        flexDirection: 'column',
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
        backgroundColor: '#191414',
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
        color: '#BBB',
        marginRight: 50,
    },
    count: {
        color: '#BBB',
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
        color: '#BBB',
        fontWeight: 'bold',
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
        color: '#BBB',
        fontSize: 30,
        fontWeight: 'bold',
    },
});

export default UsersVoted;