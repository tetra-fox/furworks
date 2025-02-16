import {
  ShaderMaterial,
  Texture,
  UniformsUtils,
  type WebGLRenderer,
  type WebGLRenderTarget
} from "three";
import { Pass, FullScreenQuad } from "three/examples/jsm/postprocessing/Pass.js";

const ScanlinesShader = {
  name: "ScanlinesShader",

  uniforms: {
    tDiffuse: { value: Texture.DEFAULT_IMAGE },
    time: { value: 0.0 },
    intensity: { value: 0.5 },
    frequency: { value: 300.0 }
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

    uniform float time;
    uniform float intensity;
    uniform float frequency;

    uniform sampler2D tDiffuse;

    varying vec2 vUv;

    void main() {
      vec4 base = texture2D( tDiffuse, vUv );

      float scanline = sin( vUv.y * frequency + time * 5.0 ) * 0.5 + 0.5;
      vec3 color = base.rgb * (1.0 - intensity * scanline);

      gl_FragColor = vec4( color, base.a );
    }
  `
};

class ScanlinesPass extends Pass {
  uniforms;
  material;
  fsQuad;

  constructor(intensity = 0.5, frequency = 300.0) {
    super();

    this.uniforms = UniformsUtils.clone(ScanlinesShader.uniforms);

    this.material = new ShaderMaterial({
      name: ScanlinesShader.name,
      uniforms: this.uniforms,
      vertexShader: ScanlinesShader.vertexShader,
      fragmentShader: ScanlinesShader.fragmentShader
    });

    this.uniforms.intensity.value = intensity;
    this.uniforms.frequency.value = frequency;
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

export { ScanlinesPass };
