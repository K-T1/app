import React, { useReducer, useState, useEffect, useRef } from 'react'
import { View } from 'react-native'
import { useNavigation } from 'react-navigation-hooks'
import { compose } from 'recompose'
import { observer, inject } from 'mobx-react'
import GLImage from 'gl-react-image'

import Tones from '@components/EditPhoto/tones'
import SliderView from '@components/EditPhoto/SliderView'
import * as Presets from '@components/EditPhoto/filters'
import { Text, SafeAreaView } from '@components/common/styled'
import StepBar from '@components/KoomTone/StepBar'
import { KoomToneStore } from '@stores/KoomToneStore'

import { StyledSurface, StyledButton, ToolView, EditorStepView, Dot } from './styled'
import { SpinnerStore } from '@stores/SpinnerStore'
import { TouchableWithoutFeedback, ScrollView } from 'react-native-gesture-handler'
import { FULL_WIDTH } from '@utils'

const presets = [
  'Normal',
  'F1977',
  'Amaro',
  'Brannan',
  'Earlybird',
  'Hudson',
  'Inkwell',
  'Lokofi',
  'LordKelvin',
  'Nashville',
  'Rise',
  'Sierra',
  'Sutro',
  'Toaster',
  'Valencia',
  'Walden',
  'XproII',
]

const tools = [
  { id: 'contrast', name: 'Contrast', min: 0.5, max: 2, step: 0.01 },
  { id: 'brightness', name: 'Brightness', min: 0.5, max: 2, step: 0.01 },
  { id: 'saturation', name: 'Saturation', min: 0, max: 2.5, step: 0.01 },
  { id: 'sepia', name: 'Sepia', min: 0, max: 1, step: 0.001 },
  { id: 'temp', name: 'White Balance', min: 2000, max: 14000, step: 100 },
]

const initialTonesState = {
  blur: 0,
  saturation: 1,
  contrast: 1,
  brightness: 1,
  negative: 0,
  hue: 0,
  sepia: 0,
  flyeye: 0,
  temp: 8000,
}

interface Props {
  koomToneStore: KoomToneStore
  spinnerStore: SpinnerStore
}

const EditStep = ({ koomToneStore, spinnerStore }: Props) => {
  const surface = useRef()
  const navigation = useNavigation()
  const [tones, setTones] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    initialTonesState,
  )
  const [PresetComponent, setPresetComponent] = useState(() => Presets.Normal)
  const [preset, setPreset] = useState(presets[0])
  const [tool, setTool] = useState('PRESET')
  const [editorTool, setEditorTool] = useState(tools[0])

  useEffect(() => {
    navigation.setParams({ nextStep })
  }, [])

  const onEffectChange = (value, id) => {
    setTones({ ...tones, [id]: value })
  }

  const onEffectReset = id => {
    setTones({ ...tones, [id]: initialTonesState[id] })
  }

  const onFilterChange = (newPreset: string) => {
    setPreset(newPreset)
    setPresetComponent(() => Presets[newPreset])
  }

  const nextStep = async () => {
    spinnerStore.show()
    const snapshotPhoto = await surface.current.glView.capture({
      type: 'png',
      format: 'file',
    })

    koomToneStore.setEdited(snapshotPhoto)
    navigation.navigate('ShareStep')
    spinnerStore.hide()
  }

  const presetListEl = (
    <View>
      <ScrollView bounces={false} horizontal showsHorizontalScrollIndicator={false}>
        {presets.map(presetData => (
          <StyledButton
            key={presetData}
            onPress={() => onFilterChange(presetData)}
            active={presetData === preset}
          >
            <Text bold>{presetData}</Text>
          </StyledButton>
        ))}
      </ScrollView>
    </View>
  )

  const editToolListEl = (
    <ScrollView bounces={false} horizontal showsHorizontalScrollIndicator={false}>
      {tools.map(toolData => (
        <StyledButton
          key={toolData.id}
          onPress={() => setEditorTool(toolData)}
          active={toolData === editorTool}
        >
          <Text bold>{toolData.name.toUpperCase()}</Text>
        </StyledButton>
      ))}
    </ScrollView>
  )

  const items = [
    { name: 'BACK', onPress: () => navigation.goBack(null) },
    { name: 'PRESET', onPress: () => setTool('PRESET') },
    { name: 'EDITOR', onPress: () => setTool('EDITOR') },
    { name: 'SHARE', onPress: nextStep },
  ]

  return (
    <SafeAreaView>
      <ScrollView>
        <StepBar step={'editStep'} withAnimated />
        <StyledSurface
          ref={surface}
          originalRatio={koomToneStore.processed.height / koomToneStore.processed.width}
        >
          <PresetComponent>
            <Tones {...tones}>
              <GLImage source={{ uri: koomToneStore.processed.uri }} resizeMode="contain" />
            </Tones>
          </PresetComponent>
        </StyledSurface>
        <EditorStepView>
          {items.map(item => (
            <TouchableWithoutFeedback
              style={{ alignItems: 'center' }}
              onPress={item.onPress}
              key={item.name}
            >
              {tool === item.name && <Dot />}
              <Text style={{ marginTop: 5 }} bold>
                {item.name}
              </Text>
            </TouchableWithoutFeedback>
          ))}
        </EditorStepView>
        <ToolView>
          {tool === 'PRESET' ? (
            presetListEl
          ) : (
            <View>
              <SliderView
                {...editorTool}
                value={tones[editorTool.id]}
                onChange={onEffectChange}
                onReset={onEffectReset}
              />
              {editToolListEl}
            </View>
          )}
        </ToolView>
      </ScrollView>
    </SafeAreaView>
  )
}

EditStep.navigationOptions = ({ navigation }) => ({
  headerShown: false,
})

export default compose(
  inject(({ rootStore }) => ({
    koomToneStore: rootStore.koomToneStore,
    spinnerStore: rootStore.spinnerStore,
  })),
  observer,
)(EditStep)
