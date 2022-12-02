import styled from 'styled-components/native'
import Colors from '../../constants/Colors';
import FontFamily from "../../constants/FontFamily";
import Modal from "react-native-modal";


export const Container = styled(Modal)`
  justify-content: flex-end;
  align-items: center;
  margin: 0;
  width: 100%;
`
export const ModalContent = styled.View`
  height: 200px;
  width: 100%;
  background-color: #FFFFFF;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`;

export const Dragger = styled.View`
  width: 35px;
  height: 6px;
  border-radius: 9px;
  background-color: #E0E0E0;
  align-self: center;
`
export const TitleContainer = styled.View`
  height: 16%; 
  padding: 16px; 
  flex-direction: row; 
  align-items: center; 
  justify-content: center; 
`
export const ModalTitle = styled.Text`
  font-family: ${FontFamily.RobotoRegular};
  font-size: 16px;
  margin-bottom: 10px;
`
export const Content = styled.View`
  padding:0px 16px;
`
export const InputContainer = styled.View`
  background-color: rgba(0,0,0,0.06);
  padding: 12px 9px;
  border-bottom-color: rgba(0,0,0,0.42);
  border-bottom-width: 1px;
`
export const InputPlaceholder = styled.Text`
  font-family: ${FontFamily.RobotoRegular};
  font-size: 12px;
`
export const Input = styled.TextInput`
  font-family: ${FontFamily.RobotoRegular};
  font-size: 16px;
`
export const ModalButtons = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 0px 10px;
  padding: 10px;
`
export const DefaultButton = styled.TouchableOpacity`
  border-radius: 4px;
  padding: 8px 0px;
  flex: 1;
`
export const DefaultButtonText = styled.Text`
  text-align: center;
  font-family: ${FontFamily.RobotoMedium};
  font-size: 16px;
  text-transform: uppercase;
`
export const SaveButton = styled(DefaultButton)`
  background-color:${Colors.active};

`
export const SaveText = styled(DefaultButtonText)`
  color: #FFFFFF;

`
export const CancelButton = styled(DefaultButton)``
export const CancelText = styled(DefaultButtonText)`
  color: ${Colors.active};

`