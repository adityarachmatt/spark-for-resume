import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EventDiscoverPage from "./src/pages/EventDiscoverPage";
import JoinedEventsPage from "./src/pages/JoinedEventsPage";
import EventDescriptionPage from "./src/pages/EventDescriptionPage";
import MessagesPage from "./src/pages/MessagesPage";
import MessagingPage from "./src/pages/MessagingPage";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// for MessagesPage -> adding header buttons
import { TouchableOpacity } from "react-native";
import { colors, componentMargin } from "./src/shared_styles/master_styles";
import CreateChatIcon from "./src/shared_components/icons/CreateChatIcon";
// for MessagesPage -> adding header buttons

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function JoinedEventsStack() {
  return (
    <Stack.Navigator initialRouteName="JoinedEventsMain">
      <Stack.Screen
        name="JoinedEventsMain"
        component={JoinedEventsPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EventDescription"
        component={EventDescriptionPage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function EventDiscoverStack() {
  return (
    <Stack.Navigator initialRouteName="JoinedEventsMain">
      <Stack.Screen
        name="EventDiscoverMain"
        component={EventDiscoverPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EventDescription"
        component={EventDescriptionPage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    "Inter-Bold": require("./assets/fonts/inter/Inter-Bold.otf"),
    "Inter-Regular": require("./assets/fonts/inter/Inter-Regular.otf"),
  });

  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Discover" component={EventDiscoverStack} />
          <Tab.Screen name="JoinedEvents" component={JoinedEventsStack} />
          <Tab.Screen
            name="Messages"
            component={MessagesPage}
            options={{
              headerLeft: () => (
                <TouchableOpacity style={{ marginLeft: componentMargin }}>
                  <Text
                    style={{
                      fontFamily: "Inter-Regular",
                      color: colors.appleBlue,
                      fontSize: 16,
                    }}
                  >
                    Edit
                  </Text>
                </TouchableOpacity>
              ),
              headerRight: () => (
                <TouchableOpacity style={{ marginRight: componentMargin }}>
                  <CreateChatIcon />
                </TouchableOpacity>
              ),
            }}
          />
          <Tab.Screen name="Messaging" component={MessagingPage} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
