import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import LoginButton from './components/LoginButton';

export default function Landing() {
  
  const buttonClickHandler = () => {
    console.log("Button clicked")
  }

  return (
    <View style={styles.container}>
        <Text style={styles.title}> Spotify Votes </Text>
        <LoginButton>
          <TouchableOpacity onPress={buttonClickHandler} style={styles.roundButton} />
        </LoginButton>
        <Text style={styles.clickToSignIn}> Click to sign in </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191414',
    alignItems: 'center',
  },
  title: {
    top: 350,
    fontSize: 40,
    color: '#1DB954',
  },
  roundButton: {
    width: 70,
    height: 70,
    borderWidth: 2,
    borderColor: '#1DB954',
    borderRadius: 50,
    top: 625,
  },
  clickToSignIn: {
    top: 665,
    color: '#000000',
    fontSize: 16,
  }
})