import React, { useReducer, useState, useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "react-navigation-hooks";
import { compose } from 'recompose'
import { observer, inject } from "mobx-react";

import Tones from "@components/EditPhoto/tones";
import Field from '@components/EditPhoto/Field'
import * as Filters from '@components/EditPhoto/filters'
import { Text, ScrollView } from "@components/common/styled";
import { KoomToneStore } from "@stores/KoomToneStore";

import { StyledSurface, StyledButton } from "./styled";
import StepBar from '@components/KoomTone/StepBar'
import HeaderButton from "@components/common/HeaderButton";
import Button from "@components/common/Button";

const percentagePrint = v => (v * 100).toFixed(0) + "%";
// const radiantPrint = r => ((180 * r) / Math.PI).toFixed(0) + "°";

const fields = [
  { id: "contrast", name: "Contrast", min: 0, max: 4, step: 0.1, prettyPrint: percentagePrint },
  { id: "brightness", name: "Brightness", min: 0, max: 4, step: 0.1, prettyPrint: percentagePrint },
  { id: "saturation", name: "Saturation", min: 0, max: 10, step: 0.1, prettyPrint: percentagePrint },
  { id: "sepia", name: "Sepia", min: 0, max: 1, step: 0.05, prettyPrint: percentagePrint },
  { id: "temp", name: "WhiteBalance", min: 2000, max: 12000, step: 100, prettyPrint: percentagePrint }
  // { id: "blur", name: "Blur", min: 0, max: 6, step: 0.1, prettyPrint: blur => blur.toFixed(1) },
  // { id: "hue", name: "HueRotate", min: 0, max: 2 * Math.PI, step: 0.1, prettyPrint: radiantPrint },
  // { id: "negative", name: "Negative", min: 0, max: 1, step: 0.05, prettyPrint: percentagePrint },
  // { id: "flyeye", name: "FlyEye", min: 0, max: 1, step: 0.05, prettyPrint: percentagePrint },
];

const filters = [
  'Normal',
  'F1977',
  'Amaro',
  'Brannan',
  'Earlybird',
  'Hefe',
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

const styles = StyleSheet.create({
  fields: {
    flexDirection: "column",
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#EEE"
  }
});

interface Props {
  koomToneStore: KoomToneStore
}

const EditStep = ({ koomToneStore }: Props) => {
  const [tones, setTones] = useReducer((state, newState) => ({ ...state, ...newState }), initialTonesState)
  const [Filter, setFilter] = useState(() => Filters.Normal)
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
    setFilter(() => Filters[filter])
  }

  const nextStep = async () => {
    const snapshotPhoto = await surface.current.glView.capture({ type: "png", format: "file" })

    koomToneStore.setEdited(snapshotPhoto)
    navigation.navigate('ShareStep')
  }

  return (
    <ScrollView>
      <StepBar step={2} />
      {
        <StyledSurface
          ref={surface}
          originalRatio={koomToneStore.processed.height / koomToneStore.processed.width}
        >
          <Filter>
            <Tones {...tones}>
              {{ uri: koomToneStore.processed.uri }}
            </Tones>
          </Filter>
        </StyledSurface>
      }
      <View style={styles.fields}>
        {fields.map(({ id, ...props }) => (
          <Field
            {...props}
            key={id}
            id={id}
            value={tones[id]}
            onChange={onEffectChange}
            onReset={onEffectReset}
          />
        ))}
      </View>
      <ScrollView horizontal>
        {
          filters.map(filter => (
            <StyledButton key={filter} onPress={() => onFilterChange(filter)}>
              <Text color="white" bold>{filter}</Text>
            </StyledButton>
          ))
        }
      </ScrollView>
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
