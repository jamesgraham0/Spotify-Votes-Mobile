import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Landing from "./client/src/screens/LandingScreen.js";
import CreateOrJoinLocalRoomScreen from "./client/src/screens/Local/CreateOrJoinLocalRoomScreen.js";
import CreateLocalRoomScreen from "./client/src/screens/Local/CreateLocalRoomScreen.js";
import JoinLocalRoomScreen from "./client/src/screens/Local/JoinLocalRoomScreen.js";
import LocalRoom from "./client/src/screens/Local/LocalRoom";
import LocalOrGlobal from "./client/src/screens/LocalOrGlobalScreen.js";
import JoinGlobalRoomScreen from "./client/src/screens/Global/JoinGlobalRoomScreen";
import CreateOrJoinGlobalRoomScreen from "./client/src/screens/Global/CreateOrJoinGlobalRoomScreen";
import CreateGlobalRoomScreen from "./client/src/screens/Global/CreateGlobalRoomScreen.js";
import GlobalRoom from "./client/src/screens/Global/GlobalRoom.js";

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
          name="GlobalRoom"
          component={GlobalRoom}
          options={{ headerShown: false, title: "GlobalRoom" }}
        />
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
          name="CreateLocalRoomScreen"
          component={CreateLocalRoomScreen}
          options={{ headerShown: false, title: "CreateLocalRoomScreen" }}
        />
        <Stack.Screen
          name="JoinLocalRoomScreen"
          component={JoinLocalRoomScreen}
          options={{ headerShown: false, title: "JoinLocalRoomScreen" }}
        />
        <Stack.Screen
          name="LocalRoom"
          component={LocalRoom}
          options={{ headerShown: false, title: "LocalRoom" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
