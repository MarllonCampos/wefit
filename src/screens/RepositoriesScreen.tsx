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
  FlatList,
  Button,
} from "react-native";
import RepoCard from "../components/RepoCard";
import { RootTabScreenProps } from "../types";
import Colors from "../constants/Colors";
import { RepoModalContext, RepositoryObject } from "../context/RepoModalContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Repositories({ navigation }: RootTabScreenProps<"Repositories">) {
  const { setIsModalVisible, repositories, favorites } = useContext(RepoModalContext);
  const [isLoading, setIsLoading] = useState(false);

  const clearFavs = async () => {
    await AsyncStorage.removeItem("@wefit:repositories");
  };

  return (
    <View style={styles.container}>
      {repositories.length === 0 && (
        <View>
          <Text>No repositories found</Text>
        </View>
      )}

      <FlatList
        data={repositories}
        renderItem={({ item: repoCardProps }) => <RepoCard {...repoCardProps} />}
        keyExtractor={(item) => item.id}
        style={{ width: "100%" }}
      />

      {isLoading && <ActivityIndicator size={92} />}
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
