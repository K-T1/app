import React, { useReducer } from 'react'
import { KeyboardAvoidingView } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';

import { CenterSAV, LimitView, Text } from '@components/common/styled'
import InputForm from '@components/common/inputForm';
import Button from '@components/common/button';
import { textSizes, spaces } from '@styles/sizes'

const registerInput = [
  { name: 'displayname', },
  { name: 'email' },
  { name: 'password' },
]

const initInput = {
  displayname: '',
  email: '',
  password: ''
}

interface Props {
  navigation: NavigationStackProp
}

const Register = ({ navigation }: Props) => {
  const [input, setInput] = useReducer((state, newState) => ({ ...state, ...newState }), initInput)

  const handleInput = (inputName, value) => {
    setInput({ [inputName]: value })
  }

  const register = () => {
    console.log(input);
    // TODO: Validate register input
    navigation.navigate('ProfilePicker', { registerDetail: input })
  }

  return (
    <CenterSAV>
      <LimitView>
        <KeyboardAvoidingView>
          <Text size={textSizes.large1} margin={spaces.large3} bold>Register</Text>
          {
            registerInput.map(({ name }) => (
              <InputForm
                key={name}
                name={name}
                value={input[name]}
                onChangeText={handleInput}
              />
            ))
          }
          <Button margin={`${spaces.large3} 0`} onPress={register}>
            register
          </Button>
        </KeyboardAvoidingView>
      </LimitView>
    </CenterSAV>
  )
}

export default Register