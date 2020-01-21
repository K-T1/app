import React, { useState, useReducer } from 'react'
import { View, TextInput, KeyboardAvoidingView } from 'react-native';

import { CenterContainer, LimitView, Text, Button } from '../../components/common/styled'
import { textSizes, spaces } from '../../components/common/constant/size'
import { INPUT_COLOR } from '../../components/common/constant/color';
import InputForm from '../../components/common/inputForm';

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

const Register = () => {
  const [input, setInput] = useReducer((state, newState) => ({ ...state, ...newState }), initInput)

  const handleInput = (inputName, value) => {
    setInput({ [inputName]: value })
  }

  const register = () => {
    console.log(input);
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
          <Button margin={`${spaces.large3} 0`} onPress={register}>
            <Text color="white" bold>register</Text>
          </Button>
        </KeyboardAvoidingView>
      </LimitView>
    </CenterContainer>
  )
}

export default Register