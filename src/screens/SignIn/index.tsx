import React, { useReducer, useState } from 'react'
import { KeyboardAvoidingView, ScrollView, View } from 'react-native'
import { NavigationStackProp } from 'react-navigation-stack'

import firebase from '@configs/firebase'
import { LimitView, Text, SafeAreaView, CenterContainer } from '@components/common/styled'
import InputForm from '@components/common/InputForm'
import Button from '@components/common/Button'
import { textSizes, spaces } from '@styles/sizes'
import HeaderButton from '@components/common/HeaderButton'

const signInInput = [{ name: 'email' }, { name: 'password' }]

const initInput = {
  email: '',
  password: '',
}

interface Props {
  navigation: NavigationStackProp
}

const SignIn = ({ navigation }: Props) => {
  const [input, setInput] = useReducer((state, newState) => ({ ...state, ...newState }), initInput)
  const [error, setError] = useState('')

  const handleInput = (inputName, value) => {
    setInput({ [inputName]: value })
  }

  const signIn = () => {
    setError('')
    firebase
      .auth()
      .signInWithEmailAndPassword(input.email, input.password)
      .then(() => {
        navigation.navigate('HomeTabNavigator', { signInDetail: input })
      })
      .catch(err => {
        setError('Email or password is invalid')
      })
  }

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={{ alignItems: 'flex-start' }}>
          <HeaderButton onPress={() => navigation.navigate('User')} title="close" />
        </View>
        <CenterContainer style={{ top: 0 }}>
          <KeyboardAvoidingView>
            <LimitView>
              <Text size={textSizes.large1} margin={spaces.large3} bold>
                Sign In
              </Text>
              <Text color="red" margin={spaces.large1} align="center" bold>
                {error}
              </Text>
              {signInInput.map(({ name }) => (
                <InputForm key={name} name={name} value={input[name]} onChangeText={handleInput} />
              ))}
              <Button margin={`${spaces.large3} 0`} onPress={signIn}>
                sign in
              </Button>
              <Button margin={`${spaces.small3} 0`} onPress={() => navigation.navigate('Register')}>
                register
              </Button>
            </LimitView>
          </KeyboardAvoidingView>
        </CenterContainer>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn
