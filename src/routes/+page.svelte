<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import * as THREE from "three";
  import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
  import { EffectComposer, type Pass } from "three/examples/jsm/postprocessing/EffectComposer.js";
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
  const passes: Record<string, Pass | ShaderPass | null> = {};
  const easeFactor = 0.1;
  const radius = 25; // camera distance from center

  let ready = false;

  const initScene = () => {
    if (!canvas) {
      console.error("failed to init scene: no canvas");
      return;
    }

    scene.background = new THREE.Color(0x171717);

    camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({ canvas });

    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

    // postprocessing
    composer = new EffectComposer(renderer);

    const bc = new ShaderPass(BrightnessContrastShader);
    bc.uniforms.contrast.value = 0.04;
    bc.uniforms.brightness.value = 0.005;

    const fxaa = new ShaderPass(FXAAShader);
    fxaa.uniforms.resolution.value.set(1 / canvas.clientWidth, 1 / canvas.clientHeight);

    composer.passes = [
      new RenderPass(scene, camera),
      (passes.afterimage = new AfterimagePass(0.65)),
      (passes.bc = bc),
      (passes.noise = new NoisePass(0.17)),
      (passes.scanlines = new ScanlinesPass(0.5, 1500)),
      (passes.bloom = new UnrealBloomPass(
        new THREE.Vector2(canvas.clientWidth, canvas.clientHeight),
        0.3,
        0.9,
        0.5
      )),
      (passes.fxaa = fxaa),
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

  const animate = (time: number) => {
    cameraAngle.x += (cameraAngleTarget.x - cameraAngle.x) * easeFactor;
    cameraAngle.y += (cameraAngleTarget.y - cameraAngle.y) * easeFactor;

    camera?.position.set(
      radius * Math.sin(cameraAngle.x) * Math.cos(cameraAngle.y),
      radius * Math.sin(cameraAngle.y),
      radius * Math.cos(cameraAngle.x) * Math.cos(cameraAngle.y)
    );

    camera?.lookAt(scene.position); // always look at world origin

    logoGroup.rotation.set(0, time / 1500, 0);
    logoGroup.position.set(0, Math.sin(time / 750) / 2, 0);

    composer?.render();
  };

  onMount(async () => {
    initScene();
    await loadSVG();
    renderer?.setAnimationLoop(animate);
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
    if (!canvas) return;
    renderer?.setSize(canvas.clientWidth, canvas.clientHeight, false);
    composer?.setSize(canvas.clientWidth, canvas.clientHeight);
    if (passes.fxaa instanceof ShaderPass)
      passes.fxaa?.uniforms?.resolution.value.set(1 / canvas.clientWidth, 1 / canvas.clientHeight);
    if (!camera) return;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!canvas) return;
    mousePos.set(
      (e.clientX / canvas.clientWidth) * 2 - 1,
      -(e.clientY / canvas.clientHeight) * 2 + 1
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
  <meta property="og:site_name" content="FURWORKS" />
  <meta property="og:description" content="A forward-thinking furry rave" />
  <meta property="og:url" content="https://furworks.vercel.app" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://furworks.vercel.app/img/og.png" />
  <meta property="description" content="A forward-thinking furry rave" />
</svelte:head>

<div class="h-dvh w-dvw p-4">
  <div
    class="relative box-border h-full w-full overflow-hidden rounded-2xl outline outline-neutral-800 p-8">
    <div class="relative z-20 flex h-full items-end justify-between mix-blend-difference">
      <div class="flex flex-col gap-4">
        <h1 class="text-4xl text-neutral-200">A forward-thinking furry rave</h1>
        <h2 class="text-2xl text-neutral-200">March 15, 2025 9pm - 2am</h2>
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
          <a href="https://instagram.com/thisisfurworks" aria-label="Twitter"
          ><span
            class="icon-[fa6-brands--instagram] size-6 text-neutral-200 transition-colors duration-100 hover:text-neutral-50"
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