import React, { Component } from 'react'
import { GLSL, Node, Shaders } from 'gl-react'
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource'

const shaders = Shaders.create({
  XproII: {
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
        vec2 tc = (2.0 * uv) - 1.0;
        float d = dot(tc, tc);
        texel.r = texture2D(inputImageTexture3, vec2(d, (1.0-texel.r))).r;
        texel.g = texture2D(inputImageTexture3, vec2(d, (1.0-texel.g))).g;
        texel.b = texture2D(inputImageTexture3, vec2(d, (1.0-texel.b))).b;
        texel.r = texture2D(inputImageTexture2, vec2(texel.r, .83333)).r;
        texel.g = texture2D(inputImageTexture2, vec2(texel.g, .5)).g;
        texel.b = texture2D(inputImageTexture2, vec2(texel.b, .16666)).b;
        gl_FragColor = mix(original, vec4(texel, 1.0), intensity);
      }
    `,
  },
})

export default class XproII extends Component {
  props: {
    children?: any,
    intensity: number
  }
  render() {
    const { children: inputImageTexture , intensity = 1.0} = this.props
    return (
      <Node
        shader={shaders.XproII}
        uniforms={{
          intensity,
          inputImageTexture,
          inputImageTexture2: resolveAssetSource(require('@assets/resources/xproMap.png')),
          inputImageTexture3: resolveAssetSource(require('@assets/resources/vignetteMap.png')),
        }}
      />
    )
  }
}
