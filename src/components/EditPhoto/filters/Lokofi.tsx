import React, { Component } from 'react'
import { GLSL, Node, Shaders } from 'gl-react'
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource'
import { resourceUrls } from './resourceUrls'

const shaders = Shaders.create({
  Lokofi: {
    frag: GLSL`
      precision highp float;
      varying vec2 uv;
      uniform float intensity;
      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2;
      uniform sampler2D inputImageTexture3;
      void main () {
        vec3 texel = texture2D(inputImageTexture, uv).rgb;
        vec4 original = texture2D(inputImageTexture, uv).rgba;
        vec2 red = vec2(texel.r, 0.83333);
        vec2 green = vec2(texel.g, 0.5);
        vec2 blue = vec2(texel.b, 0.16666);
        texel.rgb = vec3(
              texture2D(inputImageTexture2, red).r,
              texture2D(inputImageTexture2, green).g,
              texture2D(inputImageTexture2, blue).b);
        vec2 tc = (2.0 * uv) - 1.0;
        float d = dot(tc, tc);
        texel.r = texture2D(inputImageTexture3, vec2(d, (1.0-texel.r))).r;
        texel.g = texture2D(inputImageTexture3, vec2(d, (1.0-texel.g))).g;
        texel.b  = texture2D(inputImageTexture3, vec2(d, (1.0-texel.b))).b;
        gl_FragColor = mix(original, vec4(texel,1.0), intensity);
      }
    `,
  },
})

export default class Lokofi extends Component {
  props: {
    children?: any
    intensity: number
  }
  render() {
    const { children: inputImageTexture, intensity = 1.0 } = this.props
    return (
      <Node
        shader={shaders.Lokofi}
        uniforms={{
          intensity,
          inputImageTexture,
          inputImageTexture2: { uri: resourceUrls.FlomoMap },
          inputImageTexture3: { uri: resourceUrls.FvignetteMap },
        }}
      />
    )
  }
}
