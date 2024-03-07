import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Landing from './client/src/screens/Landing';
import JoinOrCreateRoom from './client/src/screens/JoinOrCreateRoom.js';
import CreateRoom from './client/src/screens/CreateRoom.js';
import EnterRoomCode from './client/src/screens/EnterRoomCode';
import Room from './client/src/screens/Room';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
    return (
        <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Landing" 
            component={Landing}
            options={{ headerShown: false, title: 'Landing' }}  
            />
          <Stack.Screen 
            name="JoinOrCreateRoom" 
            component={JoinOrCreateRoom} 
            options={{ headerShown: false, title: 'JoinOrCreateRoom', gestureEnabled: false}}  
            />
          <Stack.Screen 
            name="CreateRoom" 
            component={CreateRoom} 
            options={{ headerShown: false, title: 'CreateRoom'}}  
            />
          <Stack.Screen 
            name="EnterRoomCode" 
            component={EnterRoomCode} 
            options={{ headerShown: false, title: 'EnterRoomCode'}}  
            />
          <Stack.Screen 
            name="Room" 
            component={Room} 
            options={{ headerShown: false, title: 'Room'}}  
            />
        </Stack.Navigator>
      </NavigationContainer>
    );
}

export default AppNavigation;