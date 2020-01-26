import React, { useState } from 'react'
import { NavigationStackProp } from 'react-navigation-stack'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

import { CenterSAV, LimitView, Text, CenterView } from '@components/common/styled'
import Button from '@components/common/button'
import SkipButton from '@components/common/skipButton'
import { textSizes, spaces } from '@styles/sizes'

import { UserProfileView, UserProfileImage } from './styled'

interface Props {
  navigation: NavigationStackProp
}

const ProfilePicker = ({ navigation }: Props) => {
  const [imageUri, setImageUri] = useState('')

  const register = () => {
    // Add firebase auth and save user to db

    // { displayname, email, password }
    const registerDetail = navigation.getParam('registerDetail')
    navigation.navigate('Feed')
  }

  const openImagePicker = () => {
    navigation.navigate('ImagePicker', { setImageUri })
  }

  return (
    <CenterSAV>
      <LimitView>
        <Text size={textSizes.large1} bold>Show the world, who you really are</Text>
        <CenterView>
          <TouchableWithoutFeedback onPress={openImagePicker}>
            <UserProfileView>
              {
                imageUri ? <UserProfileImage source={{ uri: imageUri }} /> : <Text>tap to select image</Text>
              }
            </UserProfileView>
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
