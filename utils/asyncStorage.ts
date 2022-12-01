import AsyncStorage from '@react-native-async-storage/async-storage'
import { RepositoryObject } from '../src/context/RepoModalContext';


async function saveFavoriteRepo(repository: RepositoryObject) {
  const repos = await getFavoriteRepos();
  const stringifyObject = JSON.stringify(repository)

  await AsyncStorage.setItem('@wefit:repositories', JSON.stringify({ ...repos, stringifyObject }))

}
async function getFavoriteRepos(): Promise<RepositoryObject[]> {
  console.log('GetUser')
  const value = JSON.parse(await AsyncStorage.getItem('@wefit:repositories') || "[]")
  return value ? value : null
}


export { saveFavoriteRepo, getFavoriteRepos }