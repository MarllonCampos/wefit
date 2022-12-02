import React, { useState } from "react";

import {
  CancelButton,
  CancelText,
  Container,
  Content,
  Dragger,
  Input,
  InputContainer,
  InputPlaceholder,
  ModalButtons,
  ModalContent,
  ModalTitle,
  SaveButton,
  SaveText,
  TitleContainer,
} from "./styles";

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
    <Container isVisible={isVisible} onSwipeComplete={onClose} swipeDirection={["down"]} onBackdropPress={onClose}>
      <ModalContent>
        <TitleContainer>
          <Dragger />
        </TitleContainer>
        <Content>
          <ModalTitle>Alterar nome do usuário selecionado</ModalTitle>
          <InputContainer>
            <InputPlaceholder>Nome do usuário</InputPlaceholder>
            <Input
              placeholder="Ex: appswefit"
              onChangeText={setUsername}
              onSubmitEditing={() => handleSubmit(userName)}
            />
          </InputContainer>

          <ModalButtons>
            <CancelButton onPress={onClose}>
              <CancelText>Cancelar</CancelText>
            </CancelButton>
            <SaveButton onPress={() => handleSubmit(userName)}>
              <SaveText>Salvar</SaveText>
            </SaveButton>
          </ModalButtons>
        </Content>
      </ModalContent>
    </Container>
  );
}
