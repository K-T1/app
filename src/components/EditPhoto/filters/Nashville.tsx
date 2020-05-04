import React, { Component } from 'react'
import { GLSL, Node, Shaders } from 'gl-react'
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource'

const shaders = Shaders.create({
  Nashville: {
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
                    texture2D(inputImageTexture2, vec2(texel.r, .83333)).r,
                    texture2D(inputImageTexture2, vec2(texel.g, .5)).g,
                    texture2D(inputImageTexture2, vec2(texel.b, .16666)).b);
        gl_FragColor = mix(original, vec4(texel, 1.0), intensity);
      }
    `,
  },
})

export default class Nashville extends Component {
  props: {
    children?: any,
    intensity: number
  }
  render() {
    const { children: inputImageTexture, intensity = 1.0 } = this.props
    return (
      <Node
        shader={shaders.Nashville}
        uniforms={{
          intensity,
          inputImageTexture,
          inputImageTexture2: resolveAssetSource(require('@assets/resources/nashvilleMap.png')),
        }}
      />
    )
  }
}
