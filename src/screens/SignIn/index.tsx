import React, { useReducer, useEffect } from 'react'
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';

import firebase from '@configs/firebase';
import { CenterSAV, LimitView, Text } from '@components/common/styled'
import InputForm from '@components/common/InputForm';
import Button from '@components/common/Button';
import { textSizes, spaces } from '@styles/sizes'

const signInInput = [
  { name: 'email' },
  { name: 'password' },
]

const initInput = {
  email: '',
  password: ''
}

interface Props {
  navigation: NavigationStackProp
}

const SignIn = ({ navigation }: Props) => {
  const [input, setInput] = useReducer((state, newState) => ({ ...state, ...newState }), initInput)
  const [error, setError] = useReducer((state, newState) => ({ ...state, ...newState }), initInput)

  const handleInput = (inputName, value) => {
    setInput({ [inputName]: value })
  }

  const signIn = () => {
    setError(initInput)
    firebase.auth().signInWithEmailAndPassword(input.email, input.password).then(() => {
      navigation.navigate('HomeTabNavigator', { signInDetail: input })
    }).catch((error) => {
      console.log(error.code);
      if (error.code === 'auth/wrong-password') {
        setError({ ['password']: '* Wrong password'})
      } else {
        setError({ ['email']: '* User not found'})
      }
    })
  }

  const register = () => {
    navigation.navigate('Register')
  }

  return (
    <ScrollView contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
      <CenterSAV>
        <LimitView>
          <KeyboardAvoidingView>
            <Text size={textSizes.large1} margin={spaces.large3} bold>Sign In</Text>
            {
              signInInput.map(({ name }) => (
                <LimitView key={name+"view"}>
                  <Text color={'red'} key={name+"error"}>
                    {error[name]}
                  </Text>
                  <InputForm
                    key={name}
                    name={name}
                    value={input[name]}
                    onChangeText={handleInput}
                  />
                </LimitView>
              ))
            }
            <Button margin={`${spaces.large3} 0`} onPress={signIn}>
              sign in
            </Button>
            <Button margin={`${spaces.small3} 0`} onPress={register}>register</Button>
          </KeyboardAvoidingView>
        </LimitView>
      </CenterSAV>
    </ScrollView>
  )
}

export default SignIn
