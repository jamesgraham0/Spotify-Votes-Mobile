import { StyleSheet, View } from 'react-native';

const DarkBackgroundCircles = () => {
    return (
        <View style={styles.container}>
            <View style={[styles.circleDark1, {backgroundColor: 'rgba(10, 10, 10, 1)'}]} />
            <View style={[styles.circleDark2, {backgroundColor: 'rgba(10, 10, 10, 1)'}]} />
            <View style={[styles.circleDark3, {backgroundColor: 'rgba(10, 10, 10, 1)'}]} />
            <View style={[styles.circleDark4, {backgroundColor: 'rgba(10, 10, 10, 1)'}]} />
            <View style={[styles.circleDark5, {backgroundColor: 'rgba(10, 10, 10, 1)'}]} />
            <View style={[styles.circleDark6, {backgroundColor: 'rgba(10, 10, 10, 1)'}]} />
            <View style={[styles.circleDark7, {backgroundColor: 'rgba(10, 10, 10, 1)'}]} />
            <View style={[styles.circleDark8, {backgroundColor: 'rgba(10, 10, 10, 1)'}]} />
            <View style={[styles.circleDark9, {backgroundColor: 'rgba(10, 10, 10, 1)'}]} />
            <View style={[styles.circleDark10, {backgroundColor: 'rgba(10, 10, 10, 1)'}]} />
            <View style={[styles.circleDark11, {backgroundColor: 'rgba(10, 10, 10, 1)'}]} />
            <View style={[styles.circleDark12, {backgroundColor: 'rgba(10, 10, 10, 1)'}]} />
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
        ...circleStyle(250),
        top: -60,
        right: -60,
    },
    circleDark2: {
        ...circleStyle(50),
        top: 150,
        right: 100,
    },
    circleDark3: {
        ...circleStyle(90),
        top: 110,
        right: 130,
    },
    circleDark4: {
        ...circleStyle(150),
        bottom: -20,
        left: -20,
    },
    circleDark5: {
        ...circleStyle(100),
        bottom: 100,
        left: -40,
    },
    circleDark6: {
        ...circleStyle(150),
        top: -20,
        left: -10,
    },
    circleDark7: {
        ...circleStyle(80),
        top: 100,
        left: -10,
    },
    circleDark8: {
        ...circleStyle(30),
        top: 30,
        left: 120,
    },
    circleDark9: {
        ...circleStyle(150),
        bottom: -20,
        right: -20,
    },
    circleDark10: {
        ...circleStyle(100),
        bottom: 100,
        right: -40,
    },
    circleDark11: {
        ...circleStyle(400),
        top: 230,
        right: -250,
    },
    circleDark12: {
        ...circleStyle(400),
        top: 125,
        left: -300,
    },
});

function circleStyle(size) {
    return {
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: size / 2,
        opacity: 0.4,
    };
}

export default DarkBackgroundCircles;