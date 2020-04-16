import React, { useReducer } from 'react'
import { View, KeyboardAvoidingView } from 'react-native'
import { NavigationStackProp } from 'react-navigation-stack'

import userApi from '@api/user'
import { LimitView, Text, CenterContainer, SafeAreaView } from '@components/common/styled'
import InputForm from '@components/common/InputForm'
import Button from '@components/common/Button'
import { textSizes, spaces } from '@styles/sizes'
import HeaderButton from '@components/common/HeaderButton'
import { ScrollView } from 'react-native-gesture-handler'

const registerInput = [{ name: 'displayName' }, { name: 'email' }, { name: 'password' }]

const initInput = {
  displayName: '',
  email: '',
  password: '',
}

interface Props {
  navigation: NavigationStackProp
}

const Register = ({ navigation }: Props) => {
  const [input, setInput] = useReducer((state, newState) => ({ ...state, ...newState }), initInput)
  const [error, setError] = useReducer((state, newState) => ({ ...state, ...newState }), initInput)

  const handleInput = (inputName, value) => {
    setInput({ [inputName]: value })
  }

  const register = async () => {
    setError(initInput)
    try {
      const response = await userApi.validteRegister(input)
      if (response === 'Pass') {
        navigation.navigate('ProfilePicker', { registerDetail: input })
      }
    } catch (error) {
      setError(error.response.data)
    }
  }

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={{ alignItems: 'flex-start' }}>
          <HeaderButton onPress={() => navigation.navigate('User')} title="close" />
        </View>
        <CenterContainer style={{ top: -20, zIndex: -1 }}>
          <KeyboardAvoidingView>
            <LimitView>
              <Text size={textSizes.large1} margin={spaces.large3} bold>
                Register
              </Text>
              {registerInput.map(({ name }) => (
                <LimitView key={name + 'view'}>
                  <Text color="red" key={name + 'error'}>
                    {error[name]}
                  </Text>
                  <InputForm
                    key={name}
                    name={name}
                    value={input[name]}
                    onChangeText={handleInput}
                  />
                </LimitView>
              ))}
              <Button margin={`${spaces.large3} 0`} onPress={register}>
                register
              </Button>
            </LimitView>
          </KeyboardAvoidingView>
        </CenterContainer>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Register
