import styled, { css } from 'styled-components'
import { SafeAreaView } from 'react-native-safe-area-context'

import { PRIMARY_COLOR } from '@styles/colors'
import { spaces, textSizes } from '@styles/sizes'

const center = css`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const Text = styled.Text`
  ${({ size, color, bold, underline, margin }) => css`
    font-family: 'public-sans'
    ${size ? size : textSizes.small1};
    color: ${color ? color : 'black'};
    font-weight: ${bold ? 'bold' : 'normal'};
    text-decoration: ${underline ? 'underline' : 'none'};
    margin-bottom: ${margin ? margin : 0};
  `}
`

export const Button = styled.TouchableOpacity`
  color: white;
  font-weight: bold;
  background-color: ${PRIMARY_COLOR};
  align-items: center;
  padding: ${spaces.large2} 0;
  margin: ${props => props.margin ? props.margin : 0};
`

export const CenterSAV = styled(SafeAreaView)`
  ${center}
`

export const CenterContainer = styled.View`
  ${center}
`

export const CenterView = styled.View`
  justify-content: center;
  align-items: center;
`

export const LimitView = styled.View`
  width: 300px;
`
