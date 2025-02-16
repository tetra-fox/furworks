// Modified from three.js FilmShader and FilmPass
// https://github.com/mrdoob/three.js/blob/12e4fd8bdd409d2b1b3771edc7f9d693d8b0c78a/examples/jsm/shaders/FilmShader.js
// https://github.com/mrdoob/three.js/blob/12e4fd8bdd409d2b1b3771edc7f9d693d8b0c78a/examples/jsm/postprocessing/FilmPass.js

import { ShaderMaterial, Texture, UniformsUtils, type WebGLRenderer, type WebGLRenderTarget } from "three";
import { Pass, FullScreenQuad } from "three/examples/jsm/postprocessing/Pass.js";

const NoiseShader = {
  name: "NoiseShader",

  uniforms: {
    tDiffuse: { value: Texture.DEFAULT_IMAGE },
    time: { value: 0.0 },
    intensity: { value: 0.5 }
  },

  vertexShader: `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
  `,

  fragmentShader: `
    #include <common>

    uniform float intensity;
    uniform float time;

    uniform sampler2D tDiffuse;

    varying vec2 vUv;

    void main() {
      vec4 base = texture2D( tDiffuse, vUv );

      float noise = rand( fract( vUv + time ) );

      vec3 color = base.rgb + noise * (intensity * 0.1);

      gl_FragColor = vec4( color, base.a );
    }
  `
};

class NoisePass extends Pass {
  uniforms;
  material;
  fsQuad;

  constructor(intensity = 0.5) {
    super();

    this.uniforms = UniformsUtils.clone(NoiseShader.uniforms);

    this.material = new ShaderMaterial({
      name: NoiseShader.name,
      uniforms: this.uniforms,
      vertexShader: NoiseShader.vertexShader,
      fragmentShader: NoiseShader.fragmentShader
    });

    this.uniforms.intensity.value = intensity;

    this.fsQuad = new FullScreenQuad(this.material);
  }

  render(
    renderer: WebGLRenderer,
    writeBuffer: WebGLRenderTarget,
    readBuffer: WebGLRenderTarget,
    deltaTime: number
  ) {
    this.uniforms.tDiffuse.value = readBuffer.texture;
    this.uniforms.time.value += deltaTime;

    if (this.renderToScreen) {
      renderer.setRenderTarget(null);
      this.fsQuad.render(renderer);
    } else {
      renderer.setRenderTarget(writeBuffer);
      if (this.clear) renderer.clear();
      this.fsQuad.render(renderer);
    }
  }

  dispose() {
    this.material.dispose();
    this.fsQuad.dispose();
  }
}

export { NoisePass };
