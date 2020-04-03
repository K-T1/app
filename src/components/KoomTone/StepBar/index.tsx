import React from 'react'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { PRIMARY_COLOR, SECONDARY_COLOR } from '@styles/colors'
import { StepView, StepTextView } from './styled'
import { Text } from '@components/common/styled'
import { textSizes } from '@styles/sizes'

interface Props {
  step: number
}

const textSteps = [
  {
    title: '1- Select Input Image',
    description: 'This image will be processed to match\nthe style you preferred.',
  },
  {
    title: '2- Select Styling Image',
    description: 'Select the image you prefered to be\na styling for the input image.',
  },
  {
    title: '3- Edit the Image',
    description: 'Adjust the image to make it perfect.',
  },
  {
    title: '4- Share to your favorite app',
    description: 'Share this image to your favorite social application.',
  },
]

const StepBar = ({ step }: Props) => {
  return (
    <StepView>
      <AnimatedCircularProgress
        size={75}
        width={6}
        backgroundWidth={3}
        fill={(step + 1) * 25}
        rotation={0}
        tintColor={PRIMARY_COLOR}
        backgroundColor={SECONDARY_COLOR}
      />
      <StepTextView>
        <Text bold>{textSteps[step].title}</Text>
        <Text size={textSizes.small2} color={SECONDARY_COLOR} bold>
          {textSteps[step].description}
        </Text>
      </StepTextView>
    </StepView>
  )
}

export default StepBar