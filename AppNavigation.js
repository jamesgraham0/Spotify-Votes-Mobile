import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Landing from "./client/src/screens/LandingScreen.js";
import CreateOrJoinLocalRoomScreen from "./client/src/screens/Local/CreateOrJoinLocalRoomScreen.js";
import CreateRoom from "./client/src/screens/Local/CreateLocalRoomScreen.js";
import EnterRoomCode from "./client/src/screens/Local/JoinLocalRoomScreen.js";
import Room from "./client/src/screens/Room";
import LocalOrGlobal from "./client/src/screens/LocalOrGlobalScreen.js";
import JoinGlobalRoomScreen from "./client/src/screens/Global/JoinGlobalRoomScreen";
import CreateOrJoinGlobalRoomScreen from "./client/src/screens/Global/CreateOrJoinGlobalRoomScreen";
import CreateGlobalRoomScreen from "./client/src/screens/Global/CreateGlobalRoomScreen.js";

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Landing"
          component={Landing}
          options={{ headerShown: false, title: "Landing" }}
        />

        <Stack.Screen
          name="LocalOrGlobal"
          component={LocalOrGlobal}
          options={{
            headerShown: false,
            title: "LocalOrGlobal",
            gestureEnabled: false,
          }}
        />

        {/* Global Room */}
        <Stack.Screen
          name="CreateOrJoinGlobalRoomScreen"
          component={CreateOrJoinGlobalRoomScreen}
          options={{
            headerShown: false,
            title: "CreateOrJoinGlobalRoomScreen",
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="CreateGlobalRoomScreen"
          component={CreateGlobalRoomScreen}
          options={{ headerShown: false, title: "CreateGlobalRoomScreen" }}
        />
        <Stack.Screen
          name="JoinGlobalRoomScreen"
          component={JoinGlobalRoomScreen}
          options={{ headerShown: false, title: "JoinGlobalRoomScreen" }}
        />

        {/* Local Room */}
        <Stack.Screen
          name="CreateOrJoinLocalRoomScreen"
          component={CreateOrJoinLocalRoomScreen}
          options={{
            headerShown: false,
            title: "CreateOrJoinLocalRoomScreen",
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="CreateRoom"
          component={CreateRoom}
          options={{ headerShown: false, title: "CreateRoom" }}
        />
        <Stack.Screen
          name="EnterRoomCode"
          component={EnterRoomCode}
          options={{ headerShown: false, title: "EnterRoomCode" }}
        />
        <Stack.Screen
          name="Room"
          component={Room}
          options={{ headerShown: false, title: "Room" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
