import {Alert} from 'react-native';
import strings from './constant';

//Show Popup Alert
const showPopupWithOk = (title, message, okClicked) => {
  Alert.alert(title, message ? message : '', [
    {text: strings.ok.toUpperCase(), onPress: () => okClicked && okClicked()},
  ]);
};

//Show Popup with ok and cancel
const showPopupWithOkAndCancel = (title, message, okClicked, cancelClicked) => {
  Alert.alert(title, message ? message : '', [
    {
      text: strings.cancel,
      onPress: () => cancelClicked && cancelClicked(),
      style: 'cancel',
    },
    {
      text: strings.ok,
      onPress: () => okClicked && okClicked(),
    },
  ]);
};

export {showPopupWithOk, showPopupWithOkAndCancel};
