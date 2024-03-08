import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, { useState, useEffect } from 'react';
import Constants from '../utils/constants';
import Ionicons from '@expo/vector-icons/Ionicons';

export default Header = ({ headerText, onBackPress }) => {
    return (
        <View style={Constants.HEADER_STYLES}>
            <TouchableOpacity onPress={onBackPress} style={styles.returnButton}>
                <Ionicons name="chevron-back-circle-outline" size={32} color="grey" />
            </TouchableOpacity>
            <Text style={styles.headerText}>{headerText}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    headerText: {
        position: 'absolute',
        top: '50%',
        color: '#fff',
        fontSize: 24,
        maxWidth: '70%',
    },
    returnButton: {
        position: 'absolute',
        top: '50%',
        left: 20,
        width: 50,
        height: 50,
    },
});