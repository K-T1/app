import React from 'react'
import { View, StyleSheet } from 'react-native'
import Slider from '@brlja/react-native-slider'

import { SECONDARY_COLOR } from '@styles/colors'

const styles = StyleSheet.create({
  field: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    width: 120,
    textAlign: 'right',
    fontSize: 14,
  },
  value: {
    width: 80,
  },
  range: {
    flex: 1,
    height: 20,
    margin: 15,
    marginLeft: 25,
    marginRight: 25,
  },
  track: {
    height: 2,
    borderRadius: 2,
    backgroundColor: SECONDARY_COLOR,
  },
  thumb: {
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
    backgroundColor: 'white',
    borderColor: SECONDARY_COLOR,
    borderWidth: 2,
  },
})

interface Props {
  value: number
  id?: string
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  onChange: (value: number, id: string) => void
  onReset: (id: string) => void
}

const SliderView = ({ value, id, min, max, step, disabled = false, onChange, onReset }: Props) => {
  return (
    <View style={styles.field}>
      <Slider
        style={styles.range}
        minimumTrackTintColor={SECONDARY_COLOR}
        thumbStyle={styles.thumb}
        trackStyle={styles.track}
        minimumValue={min}
        maximumValue={max}
        step={step || 0.01}
        value={value}
        disabled={disabled}
        onValueChange={newValue => onChange(newValue, id)}
      />
    </View>
  )
}

export default SliderView
