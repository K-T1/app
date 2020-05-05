import React, { Component } from 'react'
import { GLSL, Node, Shaders } from 'gl-react'
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource'
import { resourceUrls } from './resourceUrls'

const shaders = Shaders.create({
  Hefe: {
    frag: GLSL`
      precision highp float;
      varying vec2 uv;
      uniform float intensity;
      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2;
      uniform sampler2D inputImageTexture3;
      uniform sampler2D inputImageTexture4;
      uniform sampler2D inputImageTexture5;
      uniform sampler2D inputImageTexture6;
      void main () {
        vec3 texel = texture2D(inputImageTexture, uv).rgb;
        vec4 original = texture2D(inputImageTexture, uv).rgba;
        vec3 edge = texture2D(inputImageTexture2, uv).rgb;
        texel = texel * edge;
        texel = vec3(
                      texture2D(inputImageTexture3, vec2(texel.r, .83333)).r,
                      texture2D(inputImageTexture3, vec2(texel.g, .5)).g,
                      texture2D(inputImageTexture3, vec2(texel.b, .16666)).b);
        vec3 luma = vec3(.30, .59, .11);
        vec3 gradSample = texture2D(inputImageTexture4, vec2(dot(luma, texel), .5)).rgb;
        vec3 final = vec3(
                            texture2D(inputImageTexture5, vec2(gradSample.r, (1.0-texel.r))).r,
                            texture2D(inputImageTexture5, vec2(gradSample.g, (1.0-texel.g))).g,
                            texture2D(inputImageTexture5, vec2(gradSample.b, (1.0-texel.b))).b
                            );
        vec3 metal = texture2D(inputImageTexture6, uv).rgb;
        vec3 metaled = vec3(
                              texture2D(inputImageTexture5, vec2(metal.r, (1.0-texel.r))).r,
                              texture2D(inputImageTexture5, vec2(metal.g, (1.0-texel.g))).g,
                              texture2D(inputImageTexture5, vec2(metal.b, (1.0-texel.b))).b
                              );
        gl_FragColor = mix(original, vec4(metaled, 1.0), intensity);
      }
    `,
  },
})

export default class Hefe extends Component {
  props: {
    children?: any
    intensity: number
  }
  render() {
    const { children: inputImageTexture, intensity = 1.0 } = this.props
    return (
      <Node
        shader={shaders.Hefe}
        uniforms={{
          intensity,
          inputImageTexture,
          inputImageTexture2: { uri: resourceUrls.FedgeBurn },
          inputImageTexture3: { uri: resourceUrls.FhefeMap },
          inputImageTexture4: { uri: resourceUrls.FhefeGradientMap },
          inputImageTexture5: { uri: resourceUrls.FhefeSoftLight },
          inputImageTexture6: { uri: resourceUrls.FhefeMetal },
        }}
      />
    )
  }
}
