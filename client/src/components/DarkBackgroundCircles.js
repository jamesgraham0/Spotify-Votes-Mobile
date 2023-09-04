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
        position: 'absolute',
        width: 250,
        height: 250,
        borderRadius: 125,
        opacity: 0.4,
        top: -60,
        right: -60,
    },
    circleDark2: {
        position: 'absolute',
        width: 50,
        height: 50,
        borderRadius: 25,
        opacity: 0.4,
        top: 150,
        right: 100,
    },
    circleDark3: {
        position: 'absolute',
        width: 90,
        height: 90,
        borderRadius: 45,
        opacity: 0.4,
        top: 110,
        right: 130,
    },
    circleDark4: {
        position: 'absolute',
        width: 150,
        height: 150,
        borderRadius: 75,
        opacity: 0.4,
        bottom: -20,
        left: -20,
    },
    circleDark5: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50,
        opacity: 0.4,
        bottom: 100,
        left: -40,
    },
    circleDark6: {
        position: 'absolute',
        backgroundColor: 'purple',
        width: 150,
        height: 150,
        borderRadius: 75,
        opacity: 0.4,
        top: -20,
        left: -10,
      },
      circleDark7: {
        position: 'absolute',
        backgroundColor: 'purple',
        width: 80,
        height: 80,
        borderRadius: 40,
        opacity: 0.4,
        top: 100,
        left: -10,
      },
      circleDark8: {
        position: 'absolute',
        backgroundColor: 'purple',
        width: 30,
        height: 30,
        borderRadius: 15,
        opacity: 0.4,
        top: 30,
        left: 120,
      },
      circleDark9: {
        position: 'absolute',
        width: 150,
        height: 150,
        borderRadius: 75,
        opacity: 0.4,
        bottom: -20,
        right: -20,
      },
      circleDark10: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50,
        opacity: 0.4,
        bottom: 100,
        right: -40,
      },
    circleDark11: {
        position: 'absolute',
        width: 400,
        height: 400,
        borderRadius: 200,
        opacity: 0.4,
        top: 230,
        right: -250,
    },
    circleDark12: {
        position: 'absolute',
        width: 400,
        height: 400,
        borderRadius: 200,
        opacity: 0.4,
        top: 125,
        left: -300,
    },
});

export default DarkBackgroundCircles;