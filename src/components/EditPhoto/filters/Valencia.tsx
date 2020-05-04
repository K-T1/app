import React, { Component } from 'react'
import { GLSL, Node, Shaders } from 'gl-react'
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource'

const shaders = Shaders.create({
  Valencia: {
    frag: GLSL`
      precision highp float;
      varying vec2 uv;
      uniform float intensity;
      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2;
      uniform sampler2D inputImageTexture3;
      mat3 saturateMatrix = mat3(1.1402, -0.0598, -0.061, -0.1174, 1.0826, -0.1186, -0.0228, -0.0228, 1.1772);
      vec3 lumaCoeffs = vec3(.3, .59, .11);
      void main () {
        vec3 texel = texture2D(inputImageTexture, uv).rgb;
        vec4 original = texture2D(inputImageTexture, uv).rgba;
        texel = vec3(
                    texture2D(inputImageTexture2, vec2(texel.r, .8333333)).r,
                    texture2D(inputImageTexture2, vec2(texel.g, .5)).g,
                    texture2D(inputImageTexture2, vec2(texel.b, .1666666)).b
                    );
        texel = saturateMatrix * texel;
        float luma = dot(lumaCoeffs, texel);
        texel = vec3(
                    texture2D(inputImageTexture3, vec2(luma, (1.0-texel.r))).r,
                    texture2D(inputImageTexture3, vec2(luma, (1.0-texel.g))).g,
                    texture2D(inputImageTexture3, vec2(luma, (1.0-texel.b))).b);
        gl_FragColor = mix(original,vec4(texel, 1.0),intensity);
      }
    `,
  },
})

export default class Valencia extends Component {
  props: {
    children?: any,
    intensity: number
  }
  render() {
    const { children: inputImageTexture, intensity = 1.0 } = this.props
    return (
      <Node
        shader={shaders.Valencia}
        uniforms={{
          intensity,
          inputImageTexture,
          inputImageTexture2: resolveAssetSource(require('@assets/resources/valenciaMap.png')),
          inputImageTexture3: resolveAssetSource(
            require('@assets/resources/valenciaGradientMap.png'),
          ),
        }}
      />
    )
  }
}
