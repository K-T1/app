import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
} from "react-native";
import { Surface } from "gl-react-expo";

import Effects from "@components/EditPhoto/gl-react-effects";
import Field from '@components/EditPhoto/Field'

const percentagePrint = v => (v * 100).toFixed(0) + "%";
const radiantPrint = r => ((180 * r) / Math.PI).toFixed(0) + "°";

// prettier-ignore
const fields = [
  { id: "blur", name: "Blur", min: 0, max: 6, step: 0.1, prettyPrint: blur => blur.toFixed(1) },
  { id: "contrast", name: "Contrast", min: 0, max: 4, step: 0.1, prettyPrint: percentagePrint },
  { id: "brightness", name: "Brightness", min: 0, max: 4, step: 0.1, prettyPrint: percentagePrint },
  { id: "saturation", name: "Saturation", min: 0, max: 10, step: 0.1, prettyPrint: percentagePrint },
  { id: "hue", name: "HueRotate", min: 0, max: 2 * Math.PI, step: 0.1, prettyPrint: radiantPrint },
  { id: "negative", name: "Negative", min: 0, max: 1, step: 0.05, prettyPrint: percentagePrint },
  { id: "sepia", name: "Sepia", min: 0, max: 1, step: 0.05, prettyPrint: percentagePrint },
  { id: "flyeye", name: "FlyEye", min: 0, max: 1, step: 0.05, prettyPrint: percentagePrint },
  { id: "temp", name: "WhiteBalance", min: 2000, max: 12000, step: 100, prettyPrint: percentagePrint }
];

const initialEffectsState = {
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
    paddingBottom: 40,
    backgroundColor: "#EEE"
  }
});

export default class EditPhoto extends Component<any, any> {
  state = {
    position: "front",
    effects: initialEffectsState,
    permission: null,
    uri: 'http://i.imgur.com/wxqlQkh.jpg'
  };

  onEffectChange = (value: any, id: any) => {
    this.setState(({ effects }) => ({
      effects: { ...effects, [id]: value }
    }));
  };

  onEffectReset = (id: any) => {
    this.setState(({ effects }) => ({
      effects: { ...effects, [id]: initialEffectsState[id] }
    }));
  };

  render() {
    const { effects } = this.state;
    return (
      <ScrollView bounces={false} style={styles.root}>
        <Surface style={styles.surface}>
          <Effects {...effects}>
            {{ uri: this.state.uri }}
          </Effects>
        </Surface>
        <View style={styles.fields}>
          {fields.map(({ id, ...props }) => (
            <Field
              {...props}
              key={id}
              id={id}
              value={effects[id]}
              onChange={this.onEffectChange}
              onReset={this.onEffectReset}
            />
          ))}
        </View>
      </ScrollView>
    );
  }
}
