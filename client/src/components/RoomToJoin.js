/**
 * Component for the JoinRoom screen which displays a list of rooms that the user can join.
 * No maximum number of users in a room is enforced.
 */
 import React from 'react';
 import { View, Text, StyleSheet } from 'react-native';
 
 const RoomToJoin = ({ room }) => {
      const { name, users } = room;

   return (
     <View style={styles.container}>
        <Text style={styles.numberOfUsers}>{users.length} people</Text>
        <Text numberOfLines={1} style={styles.name}>{name}</Text>
     </View>
   )
 }
 
 const styles = StyleSheet.create({
   container: {
     backgroundColor: '#BBB',
     borderRadius: 10,
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'start',
     marginBottom: 20,
     padding: 10,
   },
   numberOfUsers: {
     width: 80,
     height: 24,
     fontSize: 14,
     color: '#555',
     margin: 5,
   },
   name: {
    fontSize: 18,
    width: 180,
    marginRight: 5,
   },
 });
 
 export default RoomToJoin;