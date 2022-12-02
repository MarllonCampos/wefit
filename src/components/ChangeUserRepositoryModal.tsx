import React, { useContext, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  TextInput,
  ScrollView,
  Button,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
} from "react-native";
import Modal from "react-native-modal";
import Colors from "../constants/Colors";
import FontFamily from "../constants/FontFamily";

type ChangeUserRepositoryModalProps = {
  isVisible: boolean;
  onClose: () => void;
  handleSubmit: (userName: string) => void;
};
export default function ChangeUserRepositoryModal({
  isVisible,
  onClose,
  handleSubmit,
}: ChangeUserRepositoryModalProps) {
  const [userName, setUsername] = useState("");

  return (
    <Modal
      isVisible={isVisible}
      onSwipeComplete={onClose}
      swipeDirection={["down"]}
      onBackdropPress={onClose}
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
            <TextInput
              placeholder="Ex: appswefit"
              style={styles.input}
              onChangeText={setUsername}
              onSubmitEditing={() => handleSubmit(userName)}
            />
          </View>

          <View style={styles.modalButtons}>
            <TouchableOpacity style={[styles.cancelButton, styles.defaultButton]} onPress={onClose}>
              <Text style={[styles.cancelText, styles.defaultButtonText]}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.saveButton, styles.defaultButton]} onPress={() => handleSubmit(userName)}>
              <Text style={[styles.saveText, styles.defaultButtonText]}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    alignItems: "center",
    margin: 0,
    width: "100%",
  },
  modalContent: {
    height: 200,
    width: "100%",
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
