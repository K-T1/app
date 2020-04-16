import React, { Component } from 'react'
import { GLSL, Node, Shaders } from 'gl-react'

const shaders = Shaders.create({
  Normal: {
    frag: GLSL`
      precision highp float;
      varying vec2 uv;
      uniform sampler2D inputImageTexture;
      void main () {
        vec3 texel = texture2D(inputImageTexture, uv).rgb;
        gl_FragColor = vec4(texel, 1.0);
      }
    `,
  },
})

export default class Normal extends Component {
  props: {
    children?: any
  }
  render() {
    const { children: inputImageTexture } = this.props
    return (
      <Node
        shader={shaders.Normal}
        uniforms={{
          inputImageTexture,
        }}
      />
    )
  }
}
