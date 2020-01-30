import styled, { css } from 'styled-components'
import { SafeAreaView } from 'react-native-safe-area-context'

import { PRIMARY_COLOR, SECONDARY_COLOR } from '@styles/colors'
import { spaces, textSizes } from '@styles/sizes'
import { FULL_WIDTH } from '@utils'

const circle = css`
  width: ${150};
  height: ${150};
  border-radius: ${150 / 2};
`

const center = css`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const Text = styled.Text`
  ${({ size = textSizes.small1, color = 'black', bold, underline, margin = 0 }) => css`
    font-family: 'public-sans';
    ${size};
    color: ${color};
    font-weight: ${bold ? 'bold' : 'normal'};
    text-decoration: ${underline ? 'underline' : 'none'};
    margin-bottom: ${margin};
  `}
`

export const StyledButton = styled.TouchableOpacity`
  color: white;
  font-weight: bold;
  background-color: ${PRIMARY_COLOR};
  align-items: center;
  padding: ${spaces.large2} 0;
  margin: ${({ margin = 0 }) => margin};
`

export const ResizeImage = styled.Image`
  ${({ originalRatio = 1, newWidth = FULL_WIDTH, maxHeight = '100%' }) => css`
    width: ${newWidth};
    height: ${originalRatio * newWidth};
    max-height: ${maxHeight};
  `}
`

export const CenterSAV = styled(SafeAreaView)`
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
  margin: ${spaces.large4};
  border: 1px solid black;
`

export const CircleImage = styled.Image`
  ${circle}
`
