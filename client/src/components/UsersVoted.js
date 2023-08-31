import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import Constants from '../utils/constants';

const UsersVoted = ({ track }) => {
    const { usersVoted } = track;
    const [userModalVisible, setUserModalVisible] = useState(false);
    const USERS_VOTED_TO_SHOW_ELLIPSES = 3;

    const renderUsers = () => {
        return usersVoted.map((user, index) => {
            const uniqueKey = `${user.id}_${index}`;
            return (
                <View key={uniqueKey}>
                    <View style={styles.userContainer}>
                        <Text style={styles.count}>{++index}</Text>
                        <Text numberOfLines={1} style={styles.user}>
                            <View style={styles.userNameContainer}>
                                <Text numberOfLines={1} style={styles.userName} ellipsizeMode="tail">
                                    {user.display_name.length > 20 ? user.display_name.substring(0, 20) + '...' : user.display_name}
                                </Text>
                            </View>
                        </Text>
                        <Image
                            style={styles.modalImage}
                            source={{ uri: user.images.length > 0 ? user.images[0].url : Constants.DEFAULT_PROFILE_IMAGE }}
                        />
                    </View>
                </View>
            );
        });
    };

    const modalWithListOfUsers = () => {
        return <Modal
                animationType="fade"
                transparent={true}
                visible={userModalVisible}
                onRequestClose={() => {
                    setUserModalVisible(!userModalVisible);
                }}>
                    <BlurView intensity={30} tint={'dark'} style={styles.blur}>
                        <View style={styles.modalView}>
                            <Text style={styles.numUsers}>
                                <Text>{usersVoted.length} People</Text>
                            </Text>
                            <ScrollView
                                bounces='true'
                                contentInset={{top: 0, left: 0, bottom: 20, right: 0}}
                                style={styles.scrollView}
                                >
                                <View>{renderUsers()}</View>
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
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                key={track.uri}
                onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setUserModalVisible(!userModalVisible);
                }}
                style={styles.imageContainer}
            >
                {usersVoted.slice(0, 3).map((user, index) => (
                    <Image
                        key={`${user.id}_${index}`}
                        style={[
                            styles.img,
                            { zIndex: index === 0 ? USERS_VOTED_TO_SHOW_ELLIPSES + 1 : USERS_VOTED_TO_SHOW_ELLIPSES - index },
                        ]}
                        source={{ uri: user.images.length > 0 ? user.images[0].url : Constants.DEFAULT_PROFILE_IMAGE }}
                    />
                ))}
                {usersVoted.length >= USERS_VOTED_TO_SHOW_ELLIPSES && (
                    <Text style={styles.ellipses}>...</Text>
                )}
            </TouchableOpacity>
            {modalWithListOfUsers()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%'
    },
    img: {
        width: 15,
        height: 15,
        borderRadius: 50,
        marginHorizontal: -3,
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
        marginHorizontal: 20,
        borderColor: 'rgba(30, 30, 30, 0.5)',
        borderWidth: 1,
        borderRadius: 20,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        boxShadow: 'rgba(255, 255, 255, 0.5)',
    },
    userName: {
        fontSize: 21,
        color: '#BBB',
    },
    count: {
        color: '#BBB',
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
    userNameContainer: {
        maxWidth: 150,
        overflow: 'hidden',
    },
    numUsers: {
        color: '#BBB',
        fontSize: 30,
        fontWeight: 'bold',
    },
    ellipses: {
        color: 'white',
        fontSize: 8,
        marginLeft: 3,
        marginTop: 5,
    },
    imageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    modalImage: {
        borderRadius: 50,
        width: 20,
        height: 20,
    },
});

export default UsersVoted;