import React, { useState, useEffect } from 'react'
import { Animated } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { MaterialIcons } from '@expo/vector-icons'

import { PRIMARY_COLOR, SECONDARY_COLOR } from '@styles/colors'
import { Text } from '@components/common/styled'
import { textSizes } from '@styles/sizes'

import { StepView, StepTextView } from './styled'
import { FULL_WIDTH } from '@utils'
import { useSafeArea } from 'react-native-safe-area-context'

interface Props {
  step: string
  withAnimated?: boolean
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

const StepBar = ({ step, withAnimated = false }: Props) => {
  const [viewOpacity, setViewOpacity] = useState(new Animated.Value(1))
  const [viewHeight, setViewHeight] = useState(new Animated.Value(100))
  const [showStepBar, setShowStepBar] = useState(true)

  useEffect(() => {
    if (withAnimated) {
      Animated.timing(viewOpacity, {
        toValue: 0,
        duration: 500,
        delay: 3000,
      }).start(() => {
        Animated.timing(viewHeight, {
          toValue: 0,
          duration: 500,
        }).start(() => {
          setShowStepBar(false)
        })
      })
    }
  }, [])

  const { title, description, fill } = textSteps[step]
  return (
    showStepBar && (
      <Animated.View
        style={
          withAnimated && {
            position: 'absolute',
            zIndex: 1,
            opacity: viewOpacity,
            height: viewHeight,
            backgroundColor: 'white',
            width: FULL_WIDTH,
          }
        }
      >
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
      </Animated.View>
    )
  )
}

export default StepBar
