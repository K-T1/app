import React, { useState } from 'react'
import { NavigationStackProp } from 'react-navigation-stack'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { compose } from 'recompose'
import { inject, observer } from 'mobx-react'

import firebase from '@configs/firebase'
import {
  CenterSAV,
  LimitView,
  Text,
  CenterView,
  CircleView,
  CircleImage,
} from '@components/common/styled'
import Button from '@components/common/Button'
import SkipButton from '@components/common/SkipButton'
import { textSizes, spaces } from '@styles/sizes'
import { SpinnerStore } from '@stores/SpinnerStore'
import { UserStore } from '@stores/UserStore'
import { uploadImageToFirebase } from '@utils'
import { Asset } from 'expo-media-library'

interface Props {
  navigation: NavigationStackProp
  spinnerStore: SpinnerStore
  userStore: UserStore
}

const ProfilePicker = ({ navigation, spinnerStore, userStore }: Props) => {
  const [asset, setAsset] = useState<Asset>()

  const register = async () => {
    spinnerStore.show()
    const registerDetail = navigation.getParam('registerDetail')
    firebase
      .auth()
      .createUserWithEmailAndPassword(registerDetail.email, registerDetail.password)
      .then(async () => {
        registerDetail.uid = firebase.auth().currentUser.uid
        if (asset) {
          registerDetail.displayImage = await uploadImageToFirebase(asset.uri)
        }

        await userStore.register(registerDetail)

        spinnerStore.hide()
        navigation.navigate('Feed')
      })
      .catch(err => {
        console.error(err)
      })
  }

  const openImagePicker = () => {
    navigation.navigate('ImagePicker', { setAsset })
  }

  const skipToHomePage = () => {
    navigation.navigate('UserNavigator')
  }

  return (
    <CenterSAV>
      <LimitView>
        <CenterView>
          <Text size={textSizes.large1} bold>
            Show the world, who you really are
          </Text>
          <TouchableWithoutFeedback onPress={openImagePicker}>
            <CircleView m={`${spaces.large5} 0`}>
              {asset ? (
                <CircleImage source={{ uri: asset.uri }} />
              ) : (
                <Text>tap to select image</Text>
              )}
            </CircleView>
          </TouchableWithoutFeedback>
        </CenterView>
        <Button margin={`${spaces.large4} 0`} onPress={register}>
          DONE
        </Button>
        <SkipButton onPress={skipToHomePage} />
      </LimitView>
    </CenterSAV>
  )
}

export default compose(
  inject(({ rootStore }) => ({
    spinnerStore: rootStore.spinnerStore,
    userStore: rootStore.userStore,
  })),
  observer,
)(ProfilePicker)
