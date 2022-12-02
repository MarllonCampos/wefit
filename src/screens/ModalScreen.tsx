import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { RepoModalContext } from "../context/RepoModalContext";
import { RootStackParamList } from "../types";
import FontFamily from "../constants/FontFamily";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import * as Linking from "expo-linking";

type ParamProps = {
  repoId: string;
};
export default function ModalScreen() {
  const route = useRoute();
  const { repoId } = route.params as ParamProps;
  const { findFavoriteById } = useContext(RepoModalContext);
  const selectedRepo = findFavoriteById(repoId);
  const checkEmptyDescription =
    selectedRepo && selectedRepo.description ? selectedRepo.description : "Doesn't have a description";
  const checkEmptyLanguage = selectedRepo && selectedRepo.language ? selectedRepo.language : "Non Specified";

  function goToRepository() {
    if (selectedRepo) {
      Linking.openURL(selectedRepo?.html_url);
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.repoContent}>
        <Text style={styles.repoName}>
          {selectedRepo?.owner.login}/<Text style={styles.title}>{selectedRepo?.name}</Text>
        </Text>

        <Text style={styles.description}>{checkEmptyDescription}</Text>
        <View style={styles.languageSection}>
          <View style={styles.languageColor} />
          <Text style={styles.language}>{checkEmptyLanguage}</Text>
        </View>
        <StatusBar style="dark" />
      </View>

      <View style={styles.hyperLinks}>
        <TouchableOpacity style={styles.repositoryContainer} onPress={goToRepository}>
          <Text style={styles.seeRepository}>VER REPOSITÓRIO</Text>
          <MaterialIcons name="link" size={24} color={Colors.active} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.favoriteContainer}>
          <Text style={styles.favoriteText}>Favoritar</Text>
          <MaterialIcons name="star" size={24} color={Colors.dark87} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6F5",
    justifyContent: "space-between",
  },
  repoContent: {
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  repoName: {
    fontFamily: FontFamily.InterRegular,
    fontSize: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: FontFamily.InterBold,
  },
  description: {
    color: "#9A9A9A",
    marginTop: 16,
    fontFamily: FontFamily.InterRegular,
  },
  languageSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  languageColor: {
    width: 12,
    height: 12,
    borderRadius: 12,
    backgroundColor: "#F22828",
  },
  language: {
    marginLeft: 6,
    fontSize: 14,
    fontFamily: FontFamily.InterRegular,
  },

  hyperLinks: {
    backgroundColor: "#FFFFFF",
    padding: 16,
  },

  repositoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },

  seeRepository: {
    color: Colors.active,
    fontFamily: FontFamily.RobotoMedium,
    fontSize: 15,
    marginRight: 8,
  },

  favoriteContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.favorite,
    padding: 8,
    borderRadius: 4,
    marginTop: 10,
  },

  favoriteText: {
    color: Colors.dark87,
    fontFamily: FontFamily.RobotoMedium,
    fontSize: 15,
    marginRight: 8,
  },
});
