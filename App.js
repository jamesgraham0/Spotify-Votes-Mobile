import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Landing from './client/src/screens/Landing';
import JoinOrCreateRoom from './client/src/screens/JoinOrCreateRoom.js';
import CreateRoom from './client/src/screens/CreateRoom.js';
import JoinRoom from './client/src/screens/JoinRoom.js';
import EnterRoomPassword from './client/src/screens/EnterRoomPassword';
import Room from './client/src/screens/Room';
import { Provider } from 'react-redux';
import store from './client/src/redux/store';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Landing" 
            component={Landing}
            options={{ headerShown: false, title: 'Landing'}}  
          />
          <Stack.Screen 
            name="JoinOrCreateRoom" 
            component={JoinOrCreateRoom} 
            options={{ headerShown: false, title: 'JoinOrCreateRoom'}}  
          />
          <Stack.Screen 
            name="JoinRoom" 
            component={JoinRoom} 
            options={{ headerShown: false, title: 'JoinRoom'}}  
          />
          <Stack.Screen 
            name="CreateRoom" 
            component={CreateRoom} 
            options={{ headerShown: false, title: 'CreateRoom'}}  
          />
          <Stack.Screen 
            name="EnterRoomPassword" 
            component={EnterRoomPassword} 
            options={{ headerShown: false, title: 'EnterRoomPassword'}}  
          />
          <Stack.Screen 
            name="Room" 
            component={Room} 
            options={{ headerShown: false, title: 'Room'}}  
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}