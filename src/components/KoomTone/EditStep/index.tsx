import React, { useReducer, useState, useEffect, useRef } from "react";
import { useNavigation } from "react-navigation-hooks";
import { compose } from 'recompose'
import { observer, inject } from "mobx-react";

import Tones from "@components/EditPhoto/tones";
import SliderView from '@components/EditPhoto/SliderView'
import * as Filters from '@components/EditPhoto/filters'
import { Text, ScrollView, View } from "@components/common/styled";
import StepBar from '@components/KoomTone/StepBar'
import HeaderButton from "@components/common/HeaderButton";
import { KoomToneStore } from "@stores/KoomToneStore";

import { StyledSurface, StyledButton, FilterButton } from "./styled";

const tools = [
  { id: "filter", name: "filter" },
  { id: "contrast", name: "Contrast", min: 0, max: 4, step: 0.1 },
  { id: "brightness", name: "Brightness", min: 0, max: 4, step: 0.1 },
  { id: "saturation", name: "Saturation", min: 0, max: 10, step: 0.1 },
  { id: "sepia", name: "Sepia", min: 0, max: 1, step: 0.05 },
  { id: "temp", name: "WhiteBalance", min: 2000, max: 12000, step: 100 }
];

const filters = [
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
];

const initialTonesState = {
  blur: 0,
  saturation: 1,
  contrast: 1,
  brightness: 1,
  negative: 0,
  hue: 0,
  sepia: 0,
  flyeye: 0,
  temp: 7000
};

interface Props {
  koomToneStore: KoomToneStore
}

const EditStep = ({ koomToneStore }: Props) => {
  const [tones, setTones] = useReducer((state, newState) => ({ ...state, ...newState }), initialTonesState)
  const [FilterComponent, setFilterComponent] = useState(() => Filters.Normal)
  const [filter, setFilter] = useState(filters[0])
  const [tool, setTool] = useState(tools[0])
  const navigation = useNavigation()
  const surface = useRef()

  useEffect(() => {
    navigation.setParams({ nextStep })
  }, [])

  const onEffectChange = (value, id) => {
    setTones({ ...tones, [id]: value })
  };

  const onEffectReset = (id) => {
    setTones({ ...tones, [id]: initialTonesState[id] })
  };

  const onFilterChange = (filter) => {
    setFilter(filter)
    setFilterComponent(() => Filters[filter])
  }

  const nextStep = async () => {
    const snapshotPhoto = await surface.current.glView.capture({ type: "png", format: "file" })

    koomToneStore.setEdited(snapshotPhoto)
    navigation.navigate('ShareStep')
  }

  return (
    <ScrollView>
      <StepBar step={'editStep'} />
      <StyledSurface
        ref={surface}
        originalRatio={koomToneStore.processed.height / koomToneStore.processed.width}
      >
        <FilterComponent>
          <Tones {...tones}>
            {{ uri: koomToneStore.processed.uri }}
          </Tones>
        </FilterComponent>
      </StyledSurface>
      <View style={{ margin: 20 }}>
        {
          tool.name === 'filter'
            ? <ScrollView bounces={false} horizontal showsHorizontalScrollIndicator={false}>
              {filters.map(filterData => (
                <FilterButton key={filterData} onPress={() => onFilterChange(filterData)} active={filterData === filter}>
                  <Text bold>{filterData}</Text>
                </FilterButton>
              ))}
            </ScrollView>
            : <SliderView
              {...tool}
              value={tones[tool.id]}
              onChange={onEffectChange}
              onReset={onEffectReset}
            />
        }
        <ScrollView bounces={false} horizontal showsHorizontalScrollIndicator={false}>
          {tools.map((toolData) => (
            <StyledButton key={toolData.id} onPress={() => setTool(toolData)} active={toolData === tool}>
              <Text bold>{toolData.name.toUpperCase()}</Text>
            </StyledButton>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  )
}

EditStep.navigationOptions = ({ navigation }) => ({
  headerRight: () => <HeaderButton onPress={navigation.getParam('nextStep')} title="next" />
})

export default compose(
  inject(({ rootStore }) => ({
    koomToneStore: rootStore.koomToneStore,
  })),
  observer
)(EditStep)
