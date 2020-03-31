import React, { useReducer, useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
} from "react-native";
import { useNavigation } from "react-navigation-hooks";

import Tones from "@components/EditPhoto/tones";
import Field from '@components/EditPhoto/Field'
import * as Filters from '@components/EditPhoto/filters'
import { Text } from "@components/common/styled";

import { StyledSurface, StyledButton } from "./styled";

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
  root: {
    flex: 1,
    backgroundColor: "#EEE"
  },
  surface: {
    width: 512,
    height: 340,
    alignSelf: "center"
  },
  fields: {
    flexDirection: "column",
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#EEE"
  }
});

const EditPhoto = () => {
  const [asset, setAsset] = useState({ uri: '' })
  const [tones, setTones] = useReducer((state, newState) => ({ ...state, ...newState }), initialTonesState)
  const [Filter, setFilter] = useState(() => Filters.Normal)
  const navigation = useNavigation()

  useEffect(() => {
    setAsset(navigation.getParam('asset'))
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

  return (
    <ScrollView bounces={false} style={styles.root}>
      {
        asset.uri != '' &&
        <StyledSurface>
          <Filter>
            <Tones {...tones}>
              {{ uri: asset.uri }}
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

export default EditPhoto
