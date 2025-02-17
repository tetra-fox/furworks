<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import * as THREE from "three";
  import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
  import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
  import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
  import {
    AfterimagePass,
    BrightnessContrastShader,
    FXAAShader,
    OutputPass,
    ShaderPass,
    UnrealBloomPass
  } from "three/examples/jsm/Addons.js";
  import { NoisePass } from "$lib/NoisePass";
  import { ScanlinesPass } from "$lib/ScanlinesPass";

  let canvas: HTMLCanvasElement | null = null;
  let camera: THREE.PerspectiveCamera | null = null;
  let renderer: THREE.WebGLRenderer | null = null;
  let composer: EffectComposer | null = null;

  const scene = new THREE.Scene();
  const logoGroup = new THREE.Group();
  const mousePos = new THREE.Vector2();
  const cameraAngle = new THREE.Vector2();
  const cameraAngleTarget = new THREE.Vector2();
  const clock = new THREE.Clock();
  const easeFactor = 0.1;
  const radius = 25; // camera distance from center

  let ready = false;

  const initScene = () => {
    if (!canvas) {
      console.error("failed to init scene: no canvas");
      return;
    }

    scene.background = new THREE.Color(0x171717);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({ canvas });

    renderer.setSize(window.innerWidth, window.innerHeight);

    // postprocessing
    composer = new EffectComposer(renderer);

    const bc = new ShaderPass(BrightnessContrastShader);
    bc.uniforms.contrast.value = 0.04;
    bc.uniforms.brightness.value = 0.005;

    const fxaa = new ShaderPass(FXAAShader);
    fxaa.uniforms.resolution.value.set(1 / window.innerWidth, 1 / window.innerHeight);

    composer.passes = [
      new RenderPass(scene, camera),
      new AfterimagePass(0.65),
      bc,
      new NoisePass(0.17),
      new ScanlinesPass(0.5, 1500),
      new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.3, 0.9, 0.5),
      fxaa,
      new OutputPass()
    ];
  };

  const loadSVG = async () => {
    const svg = await new SVGLoader().loadAsync("/img/fwks.svg");
    const svgGroup = new THREE.Group();

    svg.paths.forEach((path) => {
      const material = new THREE.MeshBasicMaterial({ color: path.color, side: THREE.DoubleSide });

      SVGLoader.createShapes(path).forEach((shape) => {
        svgGroup.add(
          new THREE.Mesh(
            new THREE.ExtrudeGeometry(shape, { depth: 150, bevelEnabled: false }),
            material
          )
        );
      });
    });

    svgGroup.scale.set(0.01, -0.01, 0.01);
    svgGroup.position.sub(new THREE.Box3().setFromObject(svgGroup).getCenter(new THREE.Vector3()));

    logoGroup.add(svgGroup);
    scene.add(logoGroup);
  };

  const animate = () => {
    requestAnimationFrame(animate);

    cameraAngle.x += (cameraAngleTarget.x - cameraAngle.x) * easeFactor;
    cameraAngle.y += (cameraAngleTarget.y - cameraAngle.y) * easeFactor;

    camera?.position.set(
      radius * Math.sin(cameraAngle.x) * Math.cos(cameraAngle.y),
      radius * Math.sin(cameraAngle.y),
      radius * Math.cos(cameraAngle.x) * Math.cos(cameraAngle.y)
    );

    camera?.lookAt(scene.position); // always look at world origin

    logoGroup.rotation.y += 0.01;
    logoGroup.position.set(0, Math.sin(clock.getElapsedTime() * 2) / 2, 0);

    composer?.render();
  };

  onMount(async () => {
    initScene();
    await loadSVG();
    animate();
    ready = true;
  });

  onDestroy(() => {
    renderer?.dispose();
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.geometry.dispose();
        object.material?.dispose();
      }
    });
  });

  // event handlers
  const onResize = () => {
    if (!camera || !renderer) return;
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  };

  const onMouseMove = (e: MouseEvent) => {
    mousePos.set(
      (e.clientX / window.innerWidth) * 2 - 1,
      -(e.clientY / window.innerHeight) * 2 + 1
    );

    cameraAngleTarget.set(
      mousePos.x * Math.PI,
      (mousePos.y * Math.PI) / 4 // constrain to [-pi/4, pi/4]
    );
  };
</script>

<svelte:window onresize={onResize} onmousemove={onMouseMove} />

<svelte:head>
  <title>FURWORKS</title>
  <meta property="og:title" content="FURWORKS" />
  <meta property="og:description" content="A forward-thinking furry rave" />
  <meta property="og:url" content="https://furworks.vercel.app" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://furworks.vercel.app/img/og.png" />
</svelte:head>

<div class="h-screen w-screen p-4">
  <div
    class="relative h-full w-full overflow-hidden rounded-2xl border-[1px] border-neutral-800 p-8">
    <div class="relative z-20 flex h-full items-end justify-between mix-blend-difference">
      <div class="flex flex-col gap-4">
        <h1 class="text-4xl text-neutral-200">A forward-thinking furry rave</h1>
        <h2 class="text-2xl text-neutral-200">March 15, 2024 9pm - 2am</h2>
      </div>
      <div class="flex gap-4">
        <a href="https://bsky.app/profile/furworks.bsky.social" aria-label="Bluesky">
          <span
            class="icon-[fa6-brands--bluesky] size-6 text-neutral-200 transition-colors duration-100 hover:text-neutral-50"
          ></span
          ></a>
        <a href="https://x.com/thisisfurworks" aria-label="Twitter"
          ><span
            class="icon-[fa6-brands--twitter] size-6 text-neutral-200 transition-colors duration-100 hover:text-neutral-50"
          ></span
          ></a>
        <a href="https://t.me/+sfvbvgLQZGcwYmI5" aria-label="Telegram">
          <span
            class="icon-[fa6-brands--telegram] size-6 text-neutral-200 transition-colors duration-100 hover:text-neutral-50"
          ></span
          ></a>
      </div>
    </div>
    <canvas
      bind:this={canvas}
      class={[
        "absolute top-0 left-0 z-10 h-full w-full transition-opacity duration-200 ease-in-out",
        ready ? "opacity-100" : "opacity-0"
      ]}></canvas>
  </div>
</div>
