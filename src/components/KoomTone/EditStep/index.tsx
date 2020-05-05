import React, { useReducer, useState, useEffect, useRef } from 'react'
import { View } from 'react-native'
import { useNavigation } from 'react-navigation-hooks'
import { compose } from 'recompose'
import { observer, inject } from 'mobx-react'
import GLImage from 'gl-react-image'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

import Tones from '@components/EditPhoto/tones'
import SliderView from '@components/EditPhoto/SliderView'
import * as Presets from '@components/EditPhoto/filters'
import { Text, SafeAreaView } from '@components/common/styled'
import StepBar from '@components/KoomTone/StepBar'
import { KoomToneStore } from '@stores/KoomToneStore'
import { SpinnerStore } from '@stores/SpinnerStore'
import { FULL_WIDTH } from '@utils'

import { StyledSurface, ToolView, SelectToolView, Dot, SurfaceView } from './styled'
import ToolButtonList from './ToolButtonList'

const presets = [
  { name: 'Normal', intensity: 1.0 },
  { name: 'F1977', intensity: 1.0 },
  { name: 'Amaro', intensity: 1.0 },
  { name: 'Brannan', intensity: 1.0 },
  { name: 'Earlybird', intensity: 1.0 },
  { name: 'Hudson', intensity: 1.0 },
  { name: 'Inkwell', intensity: 1.0 },
  { name: 'Lokofi', intensity: 1.0 },
  { name: 'LordKelvin', intensity: 1.0 },
  { name: 'Nashville', intensity: 1.0 },
  { name: 'Rise', intensity: 1.0 },
  { name: 'Sierra', intensity: 1.0 },
  { name: 'Sutro', intensity: 1.0 },
  { name: 'Toaster', intensity: 1.0 },
  { name: 'Valencia', intensity: 1.0 },
  { name: 'Walden', intensity: 1.0 },
  { name: 'XproII', intensity: 1.0 },
]

const tools = [
  { id: 'contrast', name: 'CONTRAST', min: 0.5, max: 2, step: 0.01 },
  { id: 'brightness', name: 'BRIGHTNESS', min: 0.5, max: 2, step: 0.01 },
  { id: 'saturation', name: 'SATURATION', min: 0, max: 2.5, step: 0.01 },
  { id: 'sepia', name: 'SEPIA', min: 0, max: 1, step: 0.001 },
  { id: 'temp', name: 'WHITE BALANCE', min: 2000, max: 10000, step: 100 },
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
  temp: 6000,
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
  const [isWBClicked, setIsWBClicked] = useState(false)
  const photoRatio = koomToneStore.processed.height / koomToneStore.processed.width
  const viewRatio = ((4 / 3) * FULL_WIDTH) / FULL_WIDTH

  useEffect(() => {
    navigation.setParams({ nextStep })
  }, [])

  const onEffectChange = (value, id) => {
    if (editorTool.id === 'temp') setIsWBClicked(true)

    setTones({ ...tones, [id]: value })
  }

  const onEffectReset = id => {
    setTones({ ...tones, [id]: initialTonesState[id] })
  }

  const onPresetChange = newPreset => {
    setPreset({ ...newPreset, intensity: 1.0 })
    setPresetComponent(() => Presets[newPreset.name])
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

  const presetToolEl = (
    <>
      <SliderView
        min={0.0}
        max={1.0}
        step={0.0005}
        disabled={preset.name === 'Normal'}
        value={preset.intensity}
        onChange={value => setPreset({ ...preset, intensity: value })}
        onReset={onEffectReset}
      />
      <ToolButtonList buttons={presets} onPress={onPresetChange} currentButton={preset} />
    </>
  )

  const editorToolEl = (
    <View>
      <SliderView
        {...editorTool}
        value={tones[editorTool.id]}
        onChange={onEffectChange}
        onReset={onEffectReset}
      />
      <ToolButtonList buttons={tools} onPress={setEditorTool} currentButton={editorTool} />
    </View>
  )

  const items = [
    { name: 'BACK', onPress: () => navigation.goBack(null) },
    { name: 'PRESET', onPress: () => setTool('PRESET') },
    { name: 'EDITOR', onPress: () => setTool('EDITOR') },
    { name: 'SHARE', onPress: nextStep },
  ]

  return (
    <SafeAreaView>
      <View style={{ flex: 1 }}>
        <StepBar step={'editStep'} withAnimated />
        <SurfaceView>
          <StyledSurface
            ref={surface}
            originalRatio={photoRatio}
            originalRatio2={koomToneStore.processed.width / koomToneStore.processed.height}
            isFitHeight={viewRatio < photoRatio}
          >
            <PresetComponent intensity={preset.intensity}>
              <Tones {...tones} isWBClicked={isWBClicked}>
                <GLImage source={{ uri: koomToneStore.processed.uri }} />
              </Tones>
            </PresetComponent>
          </StyledSurface>
        </SurfaceView>
        <SelectToolView>
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
        </SelectToolView>
      </View>
      <ToolView>{tool === 'PRESET' ? presetToolEl : editorToolEl}</ToolView>
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
