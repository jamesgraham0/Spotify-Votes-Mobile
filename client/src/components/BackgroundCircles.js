import { StyleSheet, View } from 'react-native';
import Constants from '../utils/constants';

const BackgroundCircles = () => {
    return (
        <View style={styles.container}>
            <View style={[styles.circleGreen1, {backgroundColor: Constants.SPOTIFY_GREEN}]} />
            <View style={[styles.circleGreen2, {backgroundColor: Constants.SPOTIFY_GREEN}]} />
            <View style={[styles.circleGreen3, {backgroundColor: Constants.SPOTIFY_GREEN}]} />
            <View style={[styles.circleGreen4, {backgroundColor: Constants.SPOTIFY_GREEN}]} />
            <View style={[styles.circleGreen5, {backgroundColor: Constants.SPOTIFY_GREEN}]} />

            <View style={[styles.circlePurple1, {backgroundColor: Constants.SPOTIFY_PURPLE}]} />
            <View style={[styles.circlePurple2, {backgroundColor: Constants.SPOTIFY_PURPLE}]} />
            <View style={[styles.circlePurple3, {backgroundColor: Constants.SPOTIFY_PURPLE}]} />
            <View style={[styles.circlePurple4, {backgroundColor: Constants.SPOTIFY_PURPLE}]} />
            <View style={[styles.circlePurple5, {backgroundColor: Constants.SPOTIFY_PURPLE}]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    circleGreen1: {
        position: 'absolute',
        width: 250,
        height: 250,
        borderRadius: 125,
        opacity: 0.4,
        top: -60,
        right: -60,
      },
      circleGreen2: {
        position: 'absolute',
        width: 50,
        height: 50,
        borderRadius: 25,
        opacity: 0.4,
        top: 150,
        right: 100,
      },
      circleGreen3: {
        position: 'absolute',
        width: 90,
        height: 90,
        borderRadius: 45,
        opacity: 0.4,
        top: 110,
        right: 130,
      },
      circleGreen4: {
        position: 'absolute',
        width: 150,
        height: 150,
        borderRadius: 75,
        opacity: 0.4,
        bottom: -20,
        left: -20,
      },
      circleGreen5: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50,
        opacity: 0.4,
        bottom: 100,
        left: -40,
      },
      circlePurple1: {
        position: 'absolute',
        backgroundColor: 'purple',
        width: 150,
        height: 150,
        borderRadius: 75,
        opacity: 0.4,
        top: -20,
        left: -10,
      },
      circlePurple2: {
        position: 'absolute',
        backgroundColor: 'purple',
        width: 80,
        height: 80,
        borderRadius: 40,
        opacity: 0.4,
        top: 100,
        left: -10,
      },
      circlePurple3: {
        position: 'absolute',
        backgroundColor: 'purple',
        width: 30,
        height: 30,
        borderRadius: 15,
        opacity: 0.4,
        top: 30,
        left: 120,
      },
      circlePurple4: {
        position: 'absolute',
        width: 150,
        height: 150,
        borderRadius: 75,
        opacity: 0.4,
        bottom: -20,
        right: -20,
      },
      circlePurple5: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50,
        opacity: 0.4,
        bottom: 100,
        right: -40,
      },
});

export default BackgroundCircles;