import React, { useState } from 'react'
import { NavigationStackProp } from 'react-navigation-stack'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import FileSystem from 'expo-file-system';

import firebase from '../../configs/firebase';
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

  const register = async () => {
    // Add firebase auth and save user to db
    // { displayname, email, password }
    const registerDetail = navigation.getParam('registerDetail')
    // Auth firebase
    firebase.auth().createUserWithEmailAndPassword(registerDetail.email, registerDetail.password).catch(function(error) {
      console.log(error);
    });
    // Save display image to firebase storage
    registerDetail.displayImage = await uploadImage(imageUri);  
    // POST to database
    fetch('http://10.2.20.37:3000/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerDetail),
    })

    // navigation.navigate('Feed')
  }

  const uploadImage = async(imageUri) => {
    let response = await fetch(imageUri);
    let blob = await response.blob();
    var ref = firebase.storage().ref().child('image')
    try {
      return ref.put(blob).then((snapshot) => {  
        return snapshot.ref.getDownloadURL().then(url => url)
      })
    } catch (error) {
      return null
    }
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
