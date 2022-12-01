import { FontAwesome } from "@expo/vector-icons";

import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { getFavoriteRepos, saveFavoriteRepo } from "../../utils/asyncStorage";
import Colors from "../constants/Colors";
import FontFamily from "../constants/FontFamily";
import { RepositoryObject } from "../context/RepoModalContext";

interface RepoCardProps extends RepositoryObject {}
export default function RepoCard({
  description,
  language,
  repoName,
  starCount,
  user,
  html_url,
  ...props
}: RepoCardProps) {
  const checkEmptyDescription = description ? description : "Doesn't have a description";
  const checkEmptyLanguage = language ? language : "Non Specified";

  const checkFavorite = async () => {
    const favoriteRepos = await getFavoriteRepos();

    return favoriteRepos.some(({ html_url: favoriteHtmlUrl }) => html_url === favoriteHtmlUrl);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.repoName}>
        {user}/<Text style={styles.title}>{repoName}</Text>
      </Text>
      <View style={styles.separator} />
      <Text style={styles.description}>{checkEmptyDescription}</Text>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.favorite}>
          <FontAwesome name="star" color={Colors.favorite} size={20} />
          <Text style={styles.favoriteText}>Favoritar</Text>
        </TouchableOpacity>

        <FontAwesome name="star" color={Colors.favorite} size={20} />
        <Text style={styles.starCount}>{starCount}</Text>

        <View style={styles.languageColor} />
        <Text style={styles.language}>{checkEmptyLanguage}</Text>
      </View>
    </View>
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
