import AsyncStorage from '@react-native-async-storage/async-storage'
import { RepositoryObject } from '../src/context/RepoModalContext';


async function saveFavoriteRepo(repositories: RepositoryObject[]) {
  await AsyncStorage.setItem('@wefit:repositories', JSON.stringify(repositories))

}
async function getFavoriteRepos(): Promise<RepositoryObject[] | undefined> {
  try {
    const jsonValue = await AsyncStorage.getItem('@wefit:repositories')

    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error(e)
  }

}


export { saveFavoriteRepo, getFavoriteRepos }