import React from 'react'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { SquareImage } from './styled'

const SquareImageButton = ({ photo, withSpace = false, onPress }) => (
  <TouchableWithoutFeedback onPress={() => onPress(photo)}>
    <SquareImage source={{ uri: photo.url || photo.uri }} withSpace={withSpace} />
  </TouchableWithoutFeedback>
)

export default SquareImageButton
