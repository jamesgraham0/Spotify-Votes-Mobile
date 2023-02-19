import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import Playing from './Playing';
import Search from './Search';
import Queue from './Queue';

const Tab = createBottomTabNavigator();

const Navbar = ({ user, room }) => {
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
        children={() => <Search room={room}/>}
        options={{
          headerShown: false,
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={size} />
            ),
          }}
          />
      <Tab.Screen
        name="Playing"
        children={() => <Playing user={user} room={room} />}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="music-note-plus" color={color} size={size} />
            ),
          }}
          />
      <Tab.Screen
        name="Queue"
        children={() => <Queue queue={room.queue} roomId={room.id} />}
        options={{
          headerShown: false,
          tabBarLabel: 'Queue',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="queue" color={color} size={size} />
            ),
          }}
          />
    </Tab.Navigator>
  );
}
}

export default Navbar;