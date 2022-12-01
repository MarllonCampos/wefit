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
} from "react-native";
import RepoCard from "../components/RepoCard";
import { RootTabScreenProps } from "../types";
import Colors from "../constants/Colors";
import { RepoModalContext } from "../context/RepoModalContext";
import Modal from "react-native-modal";
import FontFamily from "../constants/FontFamily";

export default function Repositories({ navigation }: RootTabScreenProps<"Repositories">) {
  const { modalIsVisible, setIsModalVisible, repositories, getUserRepositories } = useContext(RepoModalContext);
  console.log({ repositories });
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const handleUserRepoSearch = useCallback(async () => {
    console.log(" handleUserRepoSearch");
    console.log(userName);
    if (!userName) return alert("User must have a name");
    setIsLoading(true);
    try {
      await getUserRepositories(userName);
      setIsModalVisible(false);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  }, [userName]);

  return (
    <View style={styles.container}>
      {repositories.length === 0 && (
        <View>
          <Text>No repositories found</Text>
        </View>
      )}
      {repositories && (
        <ScrollView style={{ width: "100%" }}>
          {repositories.map(({ description, html_url, language, repoName, avatar_url, user, starCount }) => (
            <RepoCard
              user={user}
              repoName={repoName}
              description={description}
              language={language}
              starCount={starCount}
              key={html_url}
              avatar_url={avatar_url}
              html_url={html_url}
            />
          ))}
        </ScrollView>
      )}

      {isLoading && <ActivityIndicator size={92} />}
      <Modal
        isVisible={modalIsVisible}
        onSwipeComplete={() => setIsModalVisible(false)}
        swipeDirection={["down"]}
        onBackdropPress={() => setIsModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
            <View style={styles.dragger} />
          </View>
          <View style={styles.content}>
            <Text style={styles.modalTitle}>Alterar nome do usuário selecionado</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputPlaceholder}>Nome do usuário</Text>
              <TextInput placeholder="Ex: appswefit" style={styles.input} onChangeText={setUserName} />
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.cancelButton, styles.defaultButton]}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={[styles.cancelText, styles.defaultButtonText]}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.saveButton, styles.defaultButton]}
                onPress={() => handleUserRepoSearch()}
              >
                <Text style={[styles.saveText, styles.defaultButtonText]}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  modal: {
    justifyContent: "flex-end",
    alignItems: "center",
    margin: 0,
    width: "100%",
  },
  modalContent: {
    height: 200,
    width: "98%",
    backgroundColor: "#FFFFFF",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  dragger: {
    width: 35,
    height: 6,
    borderRadius: 9,
    backgroundColor: "#E0E0E0",
    alignSelf: "center",
  },
  titleContainer: {
    height: "16%",

    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  modalTitle: {
    fontFamily: FontFamily.RobotoRegular,
    fontSize: 16,
    marginBottom: 10,
  },
  content: {
    paddingHorizontal: 16,
  },
  inputContainer: {
    backgroundColor: "rgba(0,0,0,0.06)",
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderBottomColor: "rgba(0,0,0,0.42)",
    borderBottomWidth: 1,
  },
  inputPlaceholder: {
    fontFamily: FontFamily.RobotoRegular,
    fontSize: 12,
  },
  input: {
    fontFamily: FontFamily.RobotoRegular,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    padding: 10,
  },
  defaultButton: {
    borderRadius: 4,
    paddingVertical: 8,
    flex: 1,
  },
  defaultButtonText: {
    textAlign: "center",
    fontFamily: FontFamily.RobotoMedium,
    fontSize: 16,
    textTransform: "uppercase",
  },
  saveButton: {
    backgroundColor: Colors.active,
    zIndex: 1,
  },
  saveText: {
    color: "#FFFFFF",
  },
  cancelButton: {
    zIndex: 1,
  },
  cancelText: {
    color: Colors.active,
  },
});
