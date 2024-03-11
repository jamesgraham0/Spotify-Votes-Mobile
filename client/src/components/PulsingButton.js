import { StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import React, { useEffect, useState } from 'react';

const PulsingButton = ({ onPress }) => {
    const [pulseValue] = useState(new Animated.Value(1));

    useEffect(() => {
        const pulseIn = Animated.timing(pulseValue, {
            toValue: 1.2,
            duration: 1200,
            useNativeDriver: true,
            easing: Easing.linear,
        });

        const pulseOut = Animated.timing(pulseValue, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
            easing: Easing.linear,
        });

        const pulseSequence = Animated.sequence([pulseIn, pulseOut]);

        Animated.loop(pulseSequence).start();
    }, []);

    return (
        <TouchableOpacity onPress={onPress} style={styles.roundButton}>
            <Animated.View
                style={[
                    styles.pulseView,
                    {
                        transform: [{ scale: pulseValue }],
                    },
                ]}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    roundButton: {
        width: 70,
        height: 70,
        top: '65%',
        alignItems: 'center',
        justifyContent: 'center',
      },
      pulseView: {
        width: 70,
        height: 70,
        borderWidth: 2,
        borderRadius: 50,
        shadowOpacity: 2,
        shadowColor: '#1DB954',
        shadowOffset: { width: 0, height: 0 },
        borderColor: '#1DB954',
        backgroundColor: 'transparent',
      },
});


export default PulsingButton;