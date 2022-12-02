import React from "react";
import { View, FlatList } from "react-native";
import { RepositoryObject } from "../context/RepoModalContext";
import RepoCard from "./RepoCard";

type FlatListRepositoriesProps = {
  onPress: (id: string) => void;
  data: RepositoryObject[];
  removeFavorites?: boolean;
};
const FlatListRepositories = ({ onPress, data, removeFavorites }: FlatListRepositoriesProps) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item: repoCardProps }) => (
        <RepoCard {...repoCardProps} onPress={() => onPress(repoCardProps.id)} removeFavorites={removeFavorites} />
      )}
      keyExtractor={(item) => item.id}
      style={{ width: "100%" }}
    />
  );
};

export default FlatListRepositories;
