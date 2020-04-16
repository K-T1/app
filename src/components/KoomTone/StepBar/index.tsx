import React from 'react'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { MaterialIcons } from '@expo/vector-icons'

import { PRIMARY_COLOR, SECONDARY_COLOR } from '@styles/colors'
import { Text } from '@components/common/styled'
import { textSizes } from '@styles/sizes'

import { StepView, StepTextView } from './styled'

interface Props {
  step: string
}

const textSteps = {
  sourceStep: {
    title: '1- Select Input Image',
    description: 'This image will be processed to match\nthe style you preferred.',
    fill: 25,
  },
  referenceStep: {
    title: '2- Select Styling Image',
    description: 'Select the image you prefered to be\na styling for the input image.',
    fill: 50,
  },
  sourceWithReferenceStep: {
    title: '2- Select Input Image',
    description: 'This image will be processed to match\nthe style you preferred.',
    fill: 50,
  },
  editStep: {
    title: '3- Edit the Image',
    description: 'Adjust the image to make it perfect.',
    fill: 75,
  },
  shareStep: {
    title: '4- Share to your favorite app',
    description: 'Share this image to your favorite social application.',
    fill: 100,
  },
}

const StepBar = ({ step }: Props) => {
  const { title, description, fill } = textSteps[step]
  return (
    <StepView>
      <AnimatedCircularProgress
        size={75}
        width={6}
        backgroundWidth={3}
        fill={fill}
        rotation={0}
        tintColor={PRIMARY_COLOR}
        backgroundColor={SECONDARY_COLOR}
      >
        {currentFill => currentFill === 100 && <MaterialIcons name="check" size={32} />}
      </AnimatedCircularProgress>
      <StepTextView>
        <Text bold>{title}</Text>
        <Text size={textSizes.small2} color={SECONDARY_COLOR} bold>
          {description}
        </Text>
      </StepTextView>
    </StepView>
  )
}

export default StepBar
