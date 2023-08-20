import { Animated, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import { socket } from '../utils/socket';
import Playing from './Playing';
import Search from './Search';
import Queue from './Queue';

const Tab = createBottomTabNavigator();

const Navbar = ({ user, room }) => {
  const [trackAddedToQueue, setTrackAddedToQueue] = useState(false);
  const [queueIconColor, setQueueIconColor] = useState('#BBB');
  const moveUp = useState(new Animated.Value(0))[0];

  const [trackAddedToPlaying, setTrackAddedToPlaying] = useState(false);
  const [playIconColor, setPlayIconColor] = useState('#BBB');
  const moveUpPlaying = useState(new Animated.Value(0))[0];


  useEffect(() => {
    socket.on("addedTrackToQueue", (q) => {
      setTrackAddedToQueue(true);
      queueIconNotification();
    }); 
    socket.on("addedFirstTrack", (t) => {
      setTrackAddedToPlaying(true);
      playIconNotification();
    })
  }, [socket]);

  function queueIconNotification() {
    setQueueIconColor('#1DB954');
    Animated.spring(moveUp, {
      toValue: -5,
      duration: 100,
      tension: 50,
      useNativeDriver: false,
    }).start(() => {
      setTrackAddedToQueue(false);
      Animated.spring(moveUp, {
        toValue: 0,
        duration: 100,
        tension: 50,
        useNativeDriver: false,
      }).start(() => {
        setQueueIconColor('#BBB');
      });
    });
  }

  useEffect(() => {
      setQueueIconColor(trackAddedToQueue ? '#1DB954' : '#BBB');
  }, [trackAddedToQueue]);


  function playIconNotification() {
    setPlayIconColor('#1DB954');
    Animated.spring(moveUpPlaying, {
      toValue: -5,
      duration: 100,
      tension: 50,
      useNativeDriver: false,
    }).start(() => {
      setTrackAddedToPlaying(false);
      Animated.spring(moveUpPlaying, {
        toValue: 0,
        duration: 100,
        tension: 50,
        useNativeDriver: false,
      }).start(() => {
        setPlayIconColor('#BBB');
      });
    });
  }

  useEffect(() => {
      setPlayIconColor(trackAddedToPlaying ? '#1DB954' : '#BBB');
  }, [trackAddedToPlaying]);

  if (room) {
    return (
      <Tab.Navigator
      initialRouteName="Playing"
      screenOptions={{
        tabBarActiveTintColor: '#1DB954',
        tabBarStyle: {
          backgroundColor: 'black',
          borderTopColor: 'black',
          borderStartColor: '#B026FF',
          borderStartWidth: 1,
          borderEndColor: '#B026FF',
          borderEndWidth: 1,
          borderBottomStartRadius: 80,
          borderBottomEndRadius: 80,
        }
      }}
      >
      <Tab.Screen
        name="Search"
        children={() => <Search room={room} user={user}/>}
        options={{
          headerShown: false,
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={'#BBB'} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Playing"
        children={() => <Playing user={user} room={room} />}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Animated.View
              style={[{
                  marginTop: moveUpPlaying,
              }]}
          >
              <MaterialCommunityIcons name="music-note-plus" color={playIconColor} size={size} />
            </Animated.View>
          ),
        }}
      />
      <Tab.Screen
        name="Queue"
        children={() => <Queue queue={room.queue} roomId={room.id} user={user} />}
        options={{
          headerShown: false,
          tabBarLabel: 'Queue',
          tabBarIcon: ({ color, size }) => (
            <Animated.View
              style={[{
                  marginTop: moveUp,
              }]}
          >
              <MaterialIcons size={size} name="queue" color={queueIconColor}></MaterialIcons>
            </Animated.View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
}

export default Navbar;