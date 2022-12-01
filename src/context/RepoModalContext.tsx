import { createContext, useState, useEffect, ReactNode } from "react";
import { saveFavoriteRepo } from "../../utils/asyncStorage";
// import { getUser, logoutUser } from "../utils/asyncStorage";

export type RepositoryObject = {
  repoName: string;
  user: string;
  avatar_url: string;
  html_url: string;
  description: string;
  language: string;
  starCount: string | number;
};

interface RepoModalContextData {
  setIsModalVisible: (any: any) => void;
  modalIsVisible: boolean;
  repositories: RepositoryObject[];
  getUserRepositories: (user: string) => Promise<void>;
}

interface UserProviderProps {
  children?: ReactNode;
}

export const RepoModalContext = createContext({} as RepoModalContextData);

export function RepoModalProvider({ children }: UserProviderProps) {
  const defaultUser = { username: "", balance: 0 };
  const [modalIsVisible, setIsModalVisible] = useState(false);
  const [repositories, setRepositories] = useState<RepositoryObject[]>([]);

  const getUserRepositories = async (user: string) => {
    console.log({ repositories });
    const res = await fetch(`https://api.github.com/users/${user}/repos?per_page=15`);
    if (!res.ok || res.status >= 400) {
      const body = await res.json();
      throw body.message;
    }
    const body = await res.json();
    const formatRepositories = body.map((obj: any) => ({
      starCount: obj.stargazers_count,
      avatar_url: obj.owner.avatar_url,
      user: obj.owner.login,
      repoName: obj.name,
      ...obj,
    }));
    console.log(formatRepositories);
    setRepositories(formatRepositories);
  };

  const saveOnFavorite = async (repository: RepositoryObject) => {
    await saveFavoriteRepo(repository);
  };

  return (
    <RepoModalContext.Provider
      value={{
        modalIsVisible,
        setIsModalVisible,
        repositories,
        getUserRepositories,
      }}
    >
      {children}
    </RepoModalContext.Provider>
  );
}
