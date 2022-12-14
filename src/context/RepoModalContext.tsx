import React, { useState, useContext, useCallback, useRef, createContext, ReactNode, useEffect } from "react";

import { getFavoriteRepos, saveFavoriteRepo } from "../../utils/asyncStorage";
import ChangeUserRepositoryModal from "../components/ChangeUserRepositoryModal";

export type RepositoryObject = {
  id: string;
  name: string;
  owner: { login: string; avatar_url: string };
  description: string;
  language: string;
  stargazers_count: number;
  html_url: string;
  favorite?: boolean;
};

interface RepoModalContextData {
  setIsModalVisible: (any: any) => void;
  modalIsVisible: boolean;
  repositories: RepositoryObject[];
  favorites: RepositoryObject[];
  setUserRepository: (user: string) => void;
  toggleFavorite: (repository: RepositoryObject) => void;
  findRepoById: (repoId: string) => RepositoryObject | undefined;
  isRepoFavorite: (repoId: string) => boolean;
}

interface UserProviderProps {
  children?: ReactNode;
}

export const RepoModalContext = createContext({} as RepoModalContextData);

export function RepoModalProvider({ children }: UserProviderProps) {
  const defaultUser = { username: "", balance: 0 };
  const [modalIsVisible, setIsModalVisible] = useState(false);

  const [favorites, setFavorites] = useState([] as RepositoryObject[]);

  const [userRepository, setUserRepository] = useState("appswefit");
  const [repositories, setRepositories] = useState<RepositoryObject[]>([]);

  useEffect(() => {
    getUserRepositories();
    setIsModalVisible(false);
  }, [userRepository]);

  useEffect(() => {
    (async function () {
      const favoriteRepos = await getFavoriteRepos();
      if (!favoriteRepos) return;
      setFavorites(favoriteRepos);
    })();
  }, []);

  useEffect(() => {
    (async function () {
      await saveFavoriteRepo(favorites);
    })();
  }, [favorites]);

  const toggleFavorite = (repository: RepositoryObject) => {
    setFavorites((prevState) =>
      favorites.some((favoriteRepos) => favoriteRepos.id === repository.id)
        ? prevState.filter((repos) => repos.id !== repository.id)
        : [...prevState, repository]
    );
  };

  const findRepoById = (repoId: string) =>
    repositories.find((favoriteRepo) => favoriteRepo.id === repoId) ||
    favorites.find((favoriteRepo) => favoriteRepo.id === repoId);

  const isRepoFavorite = (repoId: string): boolean => favorites.some((favoriteRepo) => favoriteRepo.id === repoId);

  const getUserRepositories = async () => {
    const res = await fetch(`https://api.github.com/users/${userRepository}/repos`);
    if (!res.ok || res.status >= 400) {
      const body = await res.json();
      throw body.message;
    }
    const body = await res.json();

    setRepositories(body);
  };

  return (
    <RepoModalContext.Provider
      value={{
        modalIsVisible,
        setIsModalVisible,
        repositories,
        favorites,
        setUserRepository,
        toggleFavorite,
        findRepoById,
        isRepoFavorite,
      }}
    >
      {children}
      <ChangeUserRepositoryModal
        isVisible={modalIsVisible}
        onClose={() => setIsModalVisible(false)}
        handleSubmit={setUserRepository}
      />
    </RepoModalContext.Provider>
  );
}
