import React, { Component } from 'react'
import { GLSL, Node, Shaders } from 'gl-react'
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource'
import { resourceUrls } from './resourceUrls'

const shaders = Shaders.create({
  Inkwell: {
    frag: GLSL`
      precision highp float;
      varying vec2 uv;
      uniform float intensity;
      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2;
      void main () {
        vec4 original = texture2D(inputImageTexture, uv).rgba;
        vec3 texel = texture2D(inputImageTexture, uv).rgb;
        texel = vec3(dot(vec3(0.3, 0.6, 0.1), texel));
        texel = vec3(texture2D(inputImageTexture2, vec2(texel.r, .83333)).r);
        gl_FragColor = mix(original, vec4(texel, 1.0),intensity);
      }
    `,
  },
})

export default class Inkwell extends Component {
  props: {
    children?: any
    intensity: number
  }
  render() {
    const { children: inputImageTexture, intensity = 1.0 } = this.props
    return (
      <Node
        shader={shaders.Inkwell}
        uniforms={{
          intensity,
          inputImageTexture,
          inputImageTexture2: { uri: resourceUrls.FinkwellMap },
        }}
      />
    )
  }
}
