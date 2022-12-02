import React, { useState, useContext, useCallback, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  TextInput,
  ScrollView,
  Button,
  FlatList,
} from "react-native";
import FlatListRepositories from "../components/FlatListRepositories";
import { RepoModalContext } from "../context/RepoModalContext";
import { RootTabScreenProps } from "../types";
export default function Favorites({ navigation }: RootTabScreenProps<"Favorites">) {
  const { favorites } = useContext(RepoModalContext);
  return (
    <View style={styles.container}>
      {favorites.length === 0 && (
        <View>
          <Text>No repositories found</Text>
        </View>
      )}
      <FlatListRepositories data={favorites} onPress={(id) => navigation.navigate("RepoInfo", { repoId: id })} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
