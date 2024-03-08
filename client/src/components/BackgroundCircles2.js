import { StyleSheet, View } from 'react-native';
import COLORS from '../utils/constants';

const DarkBackgroundCircles = () => {
    return (
        <View style={styles.container}>
            <View style={[styles.circleDark1, {backgroundColor: COLORS.SPOTIFY_GREEN, shadowColor: COLORS.SPOTIFY_GREEN}]} />
            <View style={[styles.circleDark2, {backgroundColor: COLORS.SPOTIFY_GREEN, shadowColor: COLORS.SPOTIFY_GREEN}]} />
            <View style={[styles.circleDark3, {backgroundColor: COLORS.SPOTIFY_GREEN, shadowColor: COLORS.SPOTIFY_GREEN}]} />
            <View style={[styles.circleDark4, {backgroundColor: 'rgba(10, 10, 10, 1)', shadowColor: 'rgba(10, 10, 10, 1)'}]} />
            <View style={[styles.circleDark5, {backgroundColor: 'rgba(10, 10, 10, 1)', shadowColor: 'rgba(10, 10, 10, 1)'}]} />
            <View style={[styles.circleDark6, {backgroundColor: COLORS.SPOTIFY_PURPLE, shadowColor: COLORS.SPOTIFY_PURPLE}]} />
            <View style={[styles.circleDark7, {backgroundColor: COLORS.SPOTIFY_PURPLE, shadowColor: COLORS.SPOTIFY_PURPLE}]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    circleDark1: {
        ...circleStyle(200),
        top: 510,
        right: 150,
        opacity: 0.2,
    },
    circleDark2: {
        ...circleStyle(400),
        bottom: -200,
        right: -100,
        opacity: 0.3
    },
    circleDark3: {
        ...circleStyle(100),
        bottom: 280,
        right: 90,
        opacity: 0.1,
    },
    circleDark4: {
        ...circleStyle(200),
        top: 140,
        left: 30,
    },
    circleDark5: {
        ...circleStyle(150),
        top: 150,
        right: 40,
    },
    circleDark6: {
        ...circleStyle(50),
        top: 120,
        right: 150,
        opacity: 0.2
    },
    circleDark7: {
        ...circleStyle(250),
        top: -60,
        right: -60,
    },
});

function circleStyle(size) {
    return {
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: size / 2,
        opacity: 0.4,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 6,
        elevation: 5,
    };
}

export default DarkBackgroundCircles;