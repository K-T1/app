import React, { useState, useReducer } from 'react'
import { View, TextInput, KeyboardAvoidingView } from 'react-native';

import { CenterContainer, LimitView, Text, Button } from '../../components/common/styled'
import { textSizes, spaces } from '../../constant/size'
import { INPUT_COLOR } from '../../constant/color';
import InputForm from '../../components/common/inputForm';
import { NavigationStackProp } from 'react-navigation-stack';
import StyledButton from '../../components/common/styledButton';

const registerInput = [
  {
    name: 'displayname',
  },
  {
    name: 'email',
  },
  {
    name: 'password',
  },
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
    navigation.navigate('UserProfilePicker')
  }

  return (
    <CenterContainer>
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
          <StyledButton margin={`${spaces.large3} 0`} onPress={register}>
            register
          </StyledButton>
        </KeyboardAvoidingView>
      </LimitView>
    </CenterContainer>
  )
}

export default Register