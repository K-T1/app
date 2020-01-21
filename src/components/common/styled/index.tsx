import styled, { css } from 'styled-components'
import { PRIMARY_COLOR } from '../constant/color'
import { spaces, textSizes } from '../constant/size'
import { SafeAreaView } from 'react-native-safe-area-context'

export const Button = styled.TouchableOpacity`
  color: white;
  font-weight: bold;
  background-color: ${PRIMARY_COLOR};
  align-items: center;
  padding: ${spaces.large2} 0;
  margin-bottom: ${props => props.margin ? props.margin : 0};
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

export const CenterContainer = styled(SafeAreaView)`
  flex: 1;
  justify-content: center;
  align-items: center;
`