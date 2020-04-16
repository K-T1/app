import styled, { css } from 'styled-components'
import { StyleSheet } from 'react-native'
import { ScrollView as RNScrollView } from 'react-native-gesture-handler'
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context'

import { SECONDARY_COLOR } from '@styles/colors'
import { textSizes } from '@styles/sizes'
import { FULL_WIDTH } from '@utils'

const center = css`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const circle = css`
  width: ${({ size = 150 }) => size};
  height: ${({ size = 150 }) => size};
  border-radius: ${({ size = 150 }) => size / 2};
`

const flex1 = css`
  flex: 1;
  background-color: white;
`

export const Text = styled.Text`
  ${({
    size = textSizes.small1,
    color = 'black',
    bold,
    underline,
    margin = 0,
    align = 'left',
  }) => css`
    font-family: 'public-sans';
    ${size};
    color: ${color};
    font-weight: ${bold ? 'bold' : 'normal'};
    text-decoration: ${underline ? 'underline' : 'none'};
    margin-bottom: ${margin};
    text-align: ${align};
  `}
`

export const ResizeImage = styled.Image`
  ${({ originalRatio = 1, newWidth = FULL_WIDTH, maxHeight = '100%' }) => css`
    width: ${newWidth};
    height: ${originalRatio * newWidth};
    max-height: ${maxHeight};
  `}
`

export const CenterSAV = styled(RNSafeAreaView)`
  ${center}
  background-color: white;
`

export const CenterContainer = styled.View`
  ${center}
  background-color: white;
`

export const CenterView = styled.View`
  justify-content: center;
  align-items: center;
  background-color: white;
`

export const LimitView = styled.View`
  width: 300px;
  background-color: white;
`

export const HR = styled.View`
  border: 0.5px solid ${SECONDARY_COLOR};
  width: ${({ size = '100%' }) => size};
  margin: ${({ m = 0 }) => m};
`

export const CircleView = styled(CenterView)`
  ${circle}
  border: 1px solid black;
  margin: ${({ m = 0 }) => m};
`

export const CircleImage = styled.Image`
  ${circle}
`

export const ScrollView = styled(RNScrollView)`
  ${flex1}
`

export const View = styled.View`
  ${flex1}
`

export const SafeAreaView = styled(RNSafeAreaView)`
  ${flex1}
`

export const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
})
