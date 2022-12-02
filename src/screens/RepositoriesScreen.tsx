import React, { useState, useContext, useCallback, useRef } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { RootTabScreenProps } from "../types";
import Colors from "../constants/Colors";
import { RepoModalContext, RepositoryObject } from "../context/RepoModalContext";
import FlatListRepositories from "../components/FlatListRepositories";

export default function Repositories({ navigation }: RootTabScreenProps<"Repositories">) {
  const { setIsModalVisible, repositories, favorites } = useContext(RepoModalContext);

  return (
    <View style={styles.container}>
      {repositories.length === 0 && (
        <View>
          <Text>No repositories found</Text>
        </View>
      )}

      <FlatListRepositories
        data={repositories}
        onPress={(id) => navigation.navigate("RepoInfo", { repoId: id })}
        removeFavorites
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F6F6F5",
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

  button: {
    padding: 24,
    marginBottom: 12,
    backgroundColor: Colors.favorite,
  },
});
