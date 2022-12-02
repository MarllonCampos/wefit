/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext } from "react";
import { ColorSchemeName, Pressable, TouchableOpacity } from "react-native";

import Colors from "../constants/Colors";
import RepoInfo from "../screens/RepoInfo";
import NotFoundScreen from "../screens/NotFoundScreen";
import Repositories from "../screens/RepositoriesScreen";
import Favorites from "../screens/FavoritesScreen";
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from "../types";
import { RepoModalContext } from "../context/RepoModalContext";
import FontFamily from "../constants/FontFamily";

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: "Oops!" }} />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          name="RepoInfo"
          component={RepoInfo}
          options={{
            title: "Detalhes",
            headerTintColor: "#FFFFFF",
            headerStyle: {
              backgroundColor: "#000000",
            },

            headerTitleStyle: {
              fontFamily: FontFamily.RobotoMedium,
              fontSize: 20,
            },
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const { modalIsVisible, setIsModalVisible } = useContext(RepoModalContext);
  return (
    <BottomTab.Navigator
      initialRouteName="Repositories"
      screenOptions={{
        tabBarActiveTintColor: Colors.active,
        tabBarInactiveTintColor: Colors.inactive,
        headerTitle: "WeFit",
      }}
      safeAreaInsets={{ bottom: 6 }}
    >
      <BottomTab.Screen
        name="Repositories"
        component={Repositories}
        listeners={{}}
        options={({ navigation }: RootTabScreenProps<"Repositories">) => ({
          title: "Repositórios",
          headerTintColor: Colors.dark87,
          tabBarIcon: ({ color }) => <TabBarIcon name="github" color={color} />,
          headerRight: () => (
            <TouchableOpacity onPress={() => setIsModalVisible(!modalIsVisible)}>
              <FontAwesome name="gear" size={24} color={Colors.dark87} style={{ marginRight: 32 }} />
            </TouchableOpacity>
          ),
        })}
      />
      <BottomTab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          title: "Favoritos",
          tabBarIcon: ({ color }) => <TabBarIcon name="star" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>["name"]; color: string }) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
