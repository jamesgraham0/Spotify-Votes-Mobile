import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import * as Haptics from 'expo-haptics';

export default RoomButton = ({ onPress, disabled, buttonText, buttonStyle, textStyle }) => {
    return (
        <TouchableOpacity
            onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                onPress();
            }}
            style={[stylesButton.button, buttonStyle]}
            disabled={disabled}
        >
            <Text style={[stylesButton.buttonText, textStyle]}>{buttonText}</Text>
        </TouchableOpacity>
    );
};

const stylesButton = StyleSheet.create({
    button: {
        borderWidth: 2,
        width: 300,
        height: 80,
        borderRadius: 50,
        shadowOpacity: 1,
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#191414',
    },
    buttonText: {
        position: 'absolute',
        color: '#fff',
        fontSize: 24,
    },
});