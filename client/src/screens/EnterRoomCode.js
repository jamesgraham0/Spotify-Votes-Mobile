import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Keyboard } from 'react-native';
import React, { useState, useEffect } from 'react';
import { socket } from '../utils/socket';
import Ionicons from '@expo/vector-icons/Ionicons';

const EnterRoomCode = ({ navigation, route }) => {
    const [code, setCode] = useState(['', '', '', '', '']);
    const { user } = route.params;
    const inputRefs = [];

    useEffect(() => {
        if (code[code.length - 1] !== '') {
            const nextIndex = code.findIndex((digit) => digit === '');
            if (nextIndex !== -1) {
                inputRefs[nextIndex].focus();
            } else {
                validateCodeAndJoinRoom();
                inputRefs[0].focus();
            }
        }
    }, [code]);

    const validateCodeAndJoinRoom = async () => {
        Keyboard.dismiss();
        const enteredCode = code.join('');
        socket.emit('checkRoomCode', enteredCode, ({ room, isCorrectCode }) => {
            if (isCorrectCode) {
                socket.emit('joinRoom', room);
                navigation.navigate('Room', { user: user, room: room });
            } else {
                inputRefs[0].focus();
                alert(`There is no room with code ${enteredCode}`);
                setCode(['', '', '', '', '']);
            }
        });
    }

    const handleReturnToJoinOrCreateRoom = () => {
        navigation.navigate('JoinOrCreateRoom', { user: user });
    }


    const onChanged = (text, index) => {
        const newCode = [...code];
        if (text.length > 0) {
            newCode[index] = text.charAt(text.length - 1);
            setCode(newCode);
            if (index < code.length - 1) {
                inputRefs[index + 1].focus();
            }
        }
        else {
            newCode[index] = '';
            setCode(newCode);
            if (index > 0) {
                inputRefs[index - 1].focus();
            }
        }
    };

    const handleBackspaceOnEmptyBox = (index) => {
        const newCode = [...code];
        if (index > 0) {
            newCode[index - 1] = '';
            setCode(newCode);
            inputRefs[index - 1].focus();
        }
    };

    const renderCodeInputs = () => {
        return (
            <View style={styles.codeInputContainer}>
                {code.map((digit, index) => (
                    <View key={index} style={styles.codeBox}>
                        <TextInput
                            style={styles.codeInput}
                            autoFocus={index === 0}
                            ref={(ref) => inputRefs[index] = ref}
                            keyboardType='numeric'
                            onChangeText={text => onChanged(text, index)}
                            onKeyPress={({ nativeEvent }) => {
                                if (nativeEvent.key === 'Backspace') {
                                  handleBackspaceOnEmptyBox(index);
                                };
                              }}
                            value={digit}
                            maxLength={1}
                        />
                    </View>
                ))}
            </View>
        );
    };

    const header = () => {
        return <View style={styles.container}>
                    <TouchableOpacity
                        onPress={handleReturnToJoinOrCreateRoom}
                        style={styles.returnButton}
                    >
                        <Ionicons name="chevron-back-circle-outline" size={32} color="grey" />
                    </TouchableOpacity>
                    <Text style={styles.enterRoomCode}>Enter Room Code</Text>
                </View>
    };

    return (
        <View style={styles.outerContainer}>
            {header()}
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.writeTaskWrapper}
            >
                {renderCodeInputs()}
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: '#191414',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#070707',
        height: '13%',
        padding: 20,
    },
    enterRoomCode: {
        color: '#fff',
        fontSize: 24,
        maxWidth: '70%',
        textAlign: 'center',
        marginHorizontal: 34,
        marginTop: 20,
    },
    returnButton: {
        width: 50,
        height: 50,
        marginTop: 36,
    },
    writeTaskWrapper: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 200,
    },
    codeInputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 50,
    },
    codeBox: {
        width: 60,
        height: 60,
        marginHorizontal: 5,
        backgroundColor: 'black',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'grey',
    },
    codeInput: {
        flex: 1,
        color: 'white',
        fontSize: 24,
        textAlign: 'center',
    },
})


export default EnterRoomCode;