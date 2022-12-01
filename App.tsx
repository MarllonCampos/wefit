import { useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { Roboto_400Regular, Roboto_500Medium } from "@expo-google-fonts/roboto";
import { Inter_400Regular, Inter_700Bold } from "@expo-google-fonts/inter";
import Navigation from "./src/navigation";
import { RepoModalProvider } from "./src/context/RepoModalContext";
import Repositories from "./src/screens/RepositoriesScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();
export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    Roboto_400Regular,
    Roboto_500Medium,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView onLayout={onLayoutRootView} style={{ flex: 1 }}>
          <RepoModalProvider>
            <Navigation />
          </RepoModalProvider>
        </SafeAreaView>
      </GestureHandlerRootView>
    );
  }
}
