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
import RepoCard from "../components/RepoCard";
import { RepoModalContext } from "../context/RepoModalContext";
import { RootTabScreenProps } from "../types";
export default function Favorites({ navigation }: RootTabScreenProps<"Favorites">) {
  const { favorites } = useContext(RepoModalContext);
  console.log({ favorites });
  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={({ item: repoCardProps }) => (
          <RepoCard {...repoCardProps} onPress={() => navigation.navigate("RepoInfo", { repoId: repoCardProps.id })} />
        )}
        keyExtractor={(item) => item.id}
        style={{ width: "100%" }}
      />
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
