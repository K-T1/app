import { Dimensions } from "react-native";
import uuid from 'react-native-uuid';

import firebase from '@configs/firebase'

export const { width: FULL_WIDTH, height: FULL_HEIGHT } = Dimensions.get('window')

export const fetchBlobFromUri = async (uri) => {
  const response = await fetch(uri)
  return response.blob()
}

export const uploadImageToFirebase = async (uri) => {
  const blob = await fetchBlobFromUri(uri)
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

export const createFormData = (data) => {
  const formData = new FormData()

  Object.keys(data).map(key => formData.append(key, data[key]))

  return formData
}