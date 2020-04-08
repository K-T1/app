import { Dimensions } from "react-native";
import uuid from 'react-native-uuid';

import firebase from '@configs/firebase'

export const { width: FULL_WIDTH, height: FULL_HEIGHT } = Dimensions.get('window')

export const uploadImageToFirebase = async (uri) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  const id = uuid.v1()
  const ref = firebase.storage().ref().child(`UploadPhoto/${id}`)

  try {
    return ref.put(blob).then((snapshot) => {
      return snapshot.ref.getDownloadURL().then(url => url)
    })
  } catch (error) {
    return error
  }
}