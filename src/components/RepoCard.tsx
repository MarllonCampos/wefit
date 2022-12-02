import { FontAwesome } from "@expo/vector-icons";

import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import Colors from "../constants/Colors";
import FontFamily from "../constants/FontFamily";
import { RepoModalContext, RepositoryObject } from "../context/RepoModalContext";
import { useContext } from "react";
interface RepoCardProps extends RepositoryObject {
  onPress?: () => void;
}
export default function RepoCard({
  description,
  language,
  stargazers_count,
  owner: { avatar_url, login },
  html_url,
  name,
  id,
  onPress,
}: RepoCardProps) {
  const checkEmptyDescription = description ? description : "Doesn't have a description";
  const checkEmptyLanguage = language ? language : "Non Specified";
  const { toggleFavorite } = useContext(RepoModalContext);
  console.log(id);
  function favoriteRepository() {
    const repository = { description, language, stargazers_count, owner: { avatar_url, login }, html_url, name, id };
    toggleFavorite(repository);
  }
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.repoName}>
          {login}/<Text style={styles.title}>{name}</Text>
        </Text>

        <Image source={{ uri: avatar_url }} style={{ width: 29, height: 29, borderRadius: 29, marginLeft: "auto" }} />
      </View>
      <View style={styles.separator} />
      <Text style={styles.description}>{checkEmptyDescription}</Text>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.favorite} onPress={favoriteRepository}>
          <FontAwesome name="star" color={Colors.favorite} size={20} />
          <Text style={styles.favoriteText}>Favoritar</Text>
        </TouchableOpacity>

        <FontAwesome name="star" color={Colors.favorite} size={20} />
        <Text style={styles.starCount}>{stargazers_count}</Text>

        <View style={styles.languageColor} />
        <Text style={styles.language}>{checkEmptyLanguage}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    width: "100%",
    borderRadius: 4,
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  repoName: {
    fontFamily: FontFamily.InterRegular,
  },
  title: {
    fontSize: 14,
    fontFamily: FontFamily.InterBold,
  },
  separator: {
    height: 1,
    width: "100%",
    marginVertical: 16,
    backgroundColor: "#DADADA",
    alignSelf: "center",
  },

  description: {
    color: "#9A9A9A",
    fontFamily: FontFamily.InterRegular,
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 16,
  },
  favorite: {
    paddingHorizontal: 8,
    paddingVertical: 10,
    marginRight: "auto",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FAF3DC",
    borderRadius: 4,
  },
  favoriteText: {
    color: Colors.favorite,
    marginLeft: 10,
    fontFamily: FontFamily.InterBold,
    fontSize: 12,
  },
  starCount: {
    marginLeft: 6,
  },
  languageColor: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: "#F22828",
    marginLeft: "auto",
  },
  language: {
    marginLeft: 6,
    fontSize: 10,
  },
  shadowDrop: {
    shadowColor: "#000000",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 7,
  },
});
