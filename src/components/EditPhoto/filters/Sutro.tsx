import React, { Component } from 'react'
import { GLSL, Node, Shaders } from 'gl-react'
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource'
import { resourceUrls } from './resourceUrls'

const shaders = Shaders.create({
  Sutro: {
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
        vec4 original = texture2D(inputImageTexture, uv).rgba;
        vec3 texel = texture2D(inputImageTexture, uv).rgb;
        vec2 tc = (2.0 * uv) - 1.0;
        float d = dot(tc, tc);
        texel.r = texture2D(inputImageTexture2, vec2(d, (1.0-texel.r))).r;
        texel.g = texture2D(inputImageTexture2, vec2(d, (1.0-texel.g))).g;
        texel.b  = texture2D(inputImageTexture2, vec2(d, (1.0-texel.b))).b;
        vec3 rgbPrime = vec3(0.1019, 0.0, 0.0);
        float m = dot(vec3(.3, .59, .11), texel.rgb) - 0.03058;
        texel = mix(texel, rgbPrime + m, 0.32);
        vec3 metal = texture2D(inputImageTexture3, uv).rgb;
        texel.r = texture2D(inputImageTexture4, vec2(metal.r, (1.0-texel.r))).r;
        texel.g = texture2D(inputImageTexture4, vec2(metal.g, (1.0-texel.g))).g;
        texel.b = texture2D(inputImageTexture4, vec2(metal.b, (1.0-texel.b))).b;
        texel = texel * texture2D(inputImageTexture5, uv).rgb;
        texel.r = texture2D(inputImageTexture6, vec2(texel.r, .83333)).r;
        texel.g = texture2D(inputImageTexture6, vec2(texel.g, .5)).g;
        texel.b = texture2D(inputImageTexture6, vec2(texel.b, .16666)).b;
        gl_FragColor = mix(original, vec4(texel, 1.0), intensity);
      }
    `,
  },
})

export default class Sutro extends Component {
  props: {
    children?: any
    intensity: number
  }
  render() {
    const { children: inputImageTexture, intensity = 1.0 } = this.props
    return (
      <Node
        shader={shaders.Sutro}
        uniforms={{
          intensity,
          inputImageTexture,
          inputImageTexture2: { uri: resourceUrls.FvignetteMap },
          inputImageTexture3: { uri: resourceUrls.FsutroMetal },
          inputImageTexture4: { uri: resourceUrls.FsoftLight },
          inputImageTexture5: { uri: resourceUrls.FsutroEdgeBurn },
          inputImageTexture6: { uri: resourceUrls.FsutroCurves },
        }}
      />
    )
  }
}
