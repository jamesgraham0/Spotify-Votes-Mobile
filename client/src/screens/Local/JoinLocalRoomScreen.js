import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Keyboard } from 'react-native';
import React, { useState, useEffect } from 'react';
import { socket } from '../../utils/socket';
import DarkBackgroundCircles from '../../components/BackgroundCircles2';
import Header from '../../components/Header';
import Constants from '../../utils/constants';

const JoinLocalRoomScreen = ({ navigation, route }) => {
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
                socket.emit('joinRoom', { user: user, room: room });
                navigation.navigate('Room', { user: user, room: room });
            } else {
                inputRefs[0].focus();
                alert(`There is no room with code ${enteredCode}`);
                setCode(['', '', '', '', '']);
            }
        });
    };

    const handleReturnToLocalRoom = () => {
        navigation.navigate('CreateOrJoinLocalRoomScreen', { user: user });
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
                                }
                            }}
                            value={digit}
                            maxLength={1}
                        />
                    </View>
                ))}
            </View>
        );
    };

    return (
        <View style={styles.outerContainer}>
            <DarkBackgroundCircles />
            <Header headerText="Enter Room Code" onBackPress={handleReturnToLocalRoom}/>
            <Text style={styles.instructionText}>Enter the code for the room you want to join</Text>
            <KeyboardAvoidingView
                // behavior={Platform.OS === "ios" ? "padding" : "height"}
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
    instructionText: {
        ...Constants.INSTRUCTION_TEXT_STYLES,
    },
    writeTaskWrapper: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 100,
    },
    codeInputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 200,
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


export default JoinLocalRoomScreen;