import React, { Component } from 'react'
import { GLSL, Node, Shaders } from 'gl-react'
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource'

const shaders = Shaders.create({
  F1977: {
    frag: GLSL`
      precision highp float;
      varying vec2 uv;
      uniform float intensity;
      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2;
      void main () {
        vec3 texel = texture2D(inputImageTexture, uv).rgb;
        vec4 original = texture2D(inputImageTexture, uv).rgba;
        texel = vec3(
                    texture2D(inputImageTexture2, vec2(texel.r, .16666)).r,
                    texture2D(inputImageTexture2, vec2(texel.g, .5)).g,
                    texture2D(inputImageTexture2, vec2(texel.b, .83333)).b);
        gl_FragColor = mix(original,vec4(texel, 1.0), intensity);
      }
    `,
  },
})

export default class F1977 extends Component {
  props: {
    children?: any
  }
  render() {
    const { children: inputImageTexture } = this.props
    return (
      <Node
        shader={shaders.F1977}
        uniforms={{
          intensity,
          inputImageTexture,
          inputImageTexture2: resolveAssetSource(require('@assets/resources/1977map.png')),
        }}
      />
    )
  }
}
