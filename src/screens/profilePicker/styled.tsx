import styled, { css } from 'styled-components'
import { CenterView } from '@components/common/styled'

const imageSize = 150

const circle = css`
  width: ${imageSize};
  height: ${imageSize};
  border-radius: ${imageSize / 2};
`

export const UserProfileView = styled(CenterView)`
  ${circle}
  border: 1px solid black;
`

export const UserProfileImage = styled.Image`
  ${circle}
`