import React, { useState } from 'react'
import { NavigationStackProp } from 'react-navigation-stack'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { compose } from 'recompose'
import { inject, observer } from 'mobx-react';

import firebase from '@configs/firebase';
import { CenterSAV, LimitView, Text, CenterView, CircleView, CircleImage } from '@components/common/styled'
import Button from '@components/common/Button'
import SkipButton from '@components/common/SkipButton'
import { textSizes, spaces } from '@styles/sizes'
import { SpinnerStore } from '@stores/SpinnerStore'

interface Props {
  navigation: NavigationStackProp
  spinnerStore: SpinnerStore
}

const ProfilePicker = ({ navigation, spinnerStore }: Props) => {
  const [asset, setAsset] = useState({ id: '', uri: '' })

  const register = async () => {
    spinnerStore.show()
    const registerDetail = navigation.getParam('registerDetail')
    firebase.auth().createUserWithEmailAndPassword(registerDetail.email, registerDetail.password).then(() => {
      registerDetail.uid = firebase.auth().currentUser.uid
    })
    registerDetail.displayImage = await uploadImage(asset.uri, asset.id)

    await fetch('http://192.168.1.33:3000/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerDetail),
    })

    spinnerStore.hide()
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
        <CenterView>
          <Text size={textSizes.large1} bold>Show the world, who you really are</Text>
          <TouchableWithoutFeedback onPress={openImagePicker}>
            <CircleView m={`${spaces.large5} 0`}>
              {
                asset.uri ? <CircleImage source={{ uri: asset.uri }} /> : <Text>tap to select image</Text>
              }
            </CircleView>
          </TouchableWithoutFeedback>
        </CenterView>
        <Button margin={`${spaces.large4} 0`} onPress={register}>
          DONE
        </Button>
        <SkipButton onPress={register} />
      </LimitView>
    </CenterSAV>
  )
}

export default compose(
  inject(({ rootStore }) => ({
    spinnerStore: rootStore.spinnerStore
  })),
  observer
)(ProfilePicker)
