import React from 'react'
import { ResizeImage } from '../styled'
import LOGO_ACTIVE from '@assets/logo.png'
import LOGO_INACTIVE from '@assets/logo-gray.png'

interface Props {
  active?: boolean
  width?: number
}

const Logo = ({ active = true, width = 30 }: Props) => {
  return (
    <ResizeImage
      source={active ? LOGO_ACTIVE : LOGO_INACTIVE}
      originalRatio={945 / 1685}
      newWidth={width}
    />
  )
}

export default Logo
