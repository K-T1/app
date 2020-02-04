import React, { useState } from 'react'
import { NavigationStackProp } from 'react-navigation-stack'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import FileSystem from 'expo-file-system';

import firebase from '../../configs/firebase';
import { CenterSAV, LimitView, Text, CenterView, CircleView, CircleImage } from '@components/common/styled'
import Button from '@components/common/Button'
import SkipButton from '@components/common/SkipButton'
import { textSizes, spaces } from '@styles/sizes'

interface Props {
  navigation: NavigationStackProp
}

const ProfilePicker = ({ navigation }: Props) => {
  const [asset, setAsset] = useState(null)

  const register = async () => {
    // Add firebase auth and save user to db
    // { displayname, email, password }
    const registerDetail = navigation.getParam('registerDetail')
    // Auth firebase
    firebase.auth().createUserWithEmailAndPassword(registerDetail.email, registerDetail.password).then(() => {
      registerDetail.uid = firebase.auth().currentUser.uid
    })
    // Save display image to firebase storage    
    registerDetail.displayImage = await uploadImage(asset.uri, asset.id)

    // POST to database
    await fetch('http://localhost:3000/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerDetail),
    })
    //TODO: It's quite long process need to add spinner before navigate
    navigation.navigate('Feed')
  }

  const uploadImage = async (imageUri, imageId) => {
    const response = await fetch(imageUri);
    const blob = await response.blob();
    const id = imageId.replace(/\//g, '-')
    const ref = firebase.storage().ref().child(`UserProfile/${id}`)
    try {
      return ref.put(blob).then((snapshot) => {
        return snapshot.ref.getDownloadURL().then(url => url)
      })
    } catch (error) {
      return null
    }
  }

  const openImagePicker = () => {
    navigation.navigate('ImagePicker', { setAsset })
  }

  return (
    <CenterSAV>
      <LimitView>
        <Text size={textSizes.large1} bold>Show the world, who you really are</Text>
        <CenterView>
          <TouchableWithoutFeedback onPress={openImagePicker}>
            <CircleView m={`${spaces.large4} 0`}>
              {
                asset ? <CircleImage source={{ uri: asset.uri }} /> : <Text>tap to select image</Text>
              }
            </CircleView>
          </TouchableWithoutFeedback>
        </CenterView>
        <Button margin={`${spaces.large5} 0`} onPress={register}>
          DONE
        </Button>
        <SkipButton onPress={register} />
      </LimitView>
    </CenterSAV>
  )
}

export default ProfilePicker
