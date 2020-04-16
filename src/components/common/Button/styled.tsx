import styled from 'styled-components'
import { PRIMARY_COLOR } from '@styles/colors'
import { spaces } from '@styles/sizes'

export const StyledButton = styled.TouchableOpacity`
  color: white;
  font-weight: bold;
  background-color: ${PRIMARY_COLOR};
  align-items: center;
  padding: ${spaces.large2} 0;
  margin: ${({ margin = 0 }) => margin};
`
