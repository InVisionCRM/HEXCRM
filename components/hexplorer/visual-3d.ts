import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Analyser } from './analyser';

import * as THREE from 'three';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import { fs as backdropFS, vs as backdropVS } from './backdrop-shader';
import { vs as sphereVS } from './sphere-shader';

/**
 * 3D live audio visual.
 */
@customElement('gdm-live-audio-visuals-3d')
export class GdmLiveAudioVisuals3D extends LitElement {
  private inputAnalyser!: Analyser;
  private outputAnalyser!: Analyser;
  private camera!: THREE.PerspectiveCamera;
  private backdrop!: THREE.Mesh;
  private composer!: EffectComposer;
  private sphere!: THREE.Mesh;
  private prevTime = 0;
  private rotation = new THREE.Vector3(0, 0, 0);

  private _outputNode!: AudioNode;

  @property({ attribute: false })
  set outputNode(node: AudioNode) {
    this._outputNode = node;
    this.outputAnalyser = new Analyser(this._outputNode);
  }
  get outputNode() {
    return this._outputNode;
  }

  private _inputNode!: AudioNode;

  @property({ attribute: false })
  set inputNode(node: AudioNode) {
    this._inputNode = node;
    this.inputAnalyser = new Analyser(this._inputNode);
  }
  get inputNode() {
    return this._inputNode;
  }

  private canvas!: HTMLCanvasElement;

  static styles = css`
    canvas {
      width: 100% !important;
      height: 100% !important;
      position: absolute;
      inset: 0;
      image-rendering: pixelated;
      z-index: 3;
    }
  `;

  protected firstUpdated() {
    console.log('🎯 3D Visual component firstUpdated called');
    this.canvas = this.shadowRoot!.querySelector('canvas') as HTMLCanvasElement;
    console.log('Canvas element:', this.canvas);
    console.log('Canvas dimensions:', this.canvas?.getBoundingClientRect());
    
    if (!this.canvas) {
      console.error('❌ Canvas element not found in shadow DOM');
      return;
    }
    
    try {
      this.init();
    } catch (error) {
      console.error('❌ Failed to initialize 3D visual:', error);
    }
  }

  private init() {
    console.log('🎯 Initializing 3D scene...');
    
    try {
      const scene = new THREE.Scene();
      scene.background = null;
      console.log('✅ THREE.js scene created');

      const backdrop = new THREE.Mesh(
        new THREE.IcosahedronGeometry(10, 5),
        new THREE.RawShaderMaterial({
          uniforms: {
            resolution: { value: new THREE.Vector2(1, 1) },
            rand: { value: 0 },
          },
          vertexShader: backdropVS,
          fragmentShader: backdropFS,
          glslVersion: THREE.GLSL3,
        }),
      );
      (backdrop.material as THREE.RawShaderMaterial).side = THREE.BackSide;
      scene.add(backdrop);
      this.backdrop = backdrop;
      console.log('✅ Backdrop created');

      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000,
      );
      camera.position.set(2, -2, 5);
      this.camera = camera;
      console.log('✅ Camera created');

      const renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: false,
      });
      
      if (!renderer.getContext()) {
        console.error('❌ Failed to get WebGL context');
        return;
      }
      
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio / 1);
      console.log('✅ WebGL renderer created');

      const geometry = new THREE.IcosahedronGeometry(1, 10);
      console.log('✅ Sphere geometry created');

      // PMREM generator for environment map
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      pmremGenerator.compileEquirectangularShader();

      const sphereMaterial = new THREE.MeshStandardMaterial({
        color: 0xFF3D3D, // HEX red instead of dark blue
        metalness: 0.8,
        roughness: 0.2,
        emissive: 0xFF0F6F, // HEX pink emissive
        emissiveIntensity: 0.3,
      });

      sphereMaterial.onBeforeCompile = (shader: any) => {
        // @ts-ignore
        shader.uniforms.time = { value: 0 };
        // @ts-ignore
        shader.uniforms.inputData = { value: new THREE.Vector4() };
        // @ts-ignore
        shader.uniforms.outputData = { value: new THREE.Vector4() };
        // @ts-ignore
        sphereMaterial.userData.shader = shader;

        shader.vertexShader = sphereVS;
      };

      const sphere = new THREE.Mesh(geometry, sphereMaterial);
      sphere.visible = true; // Make visible by default
      scene.add(sphere);
      this.sphere = sphere;
      console.log('✅ Sphere created and made visible');

      // Load hdr/exr for environment map lazily (optional) - with fallback
      new EXRLoader().load(
        'piz_compressed.exr', 
        (texture: THREE.Texture) => {
          console.log('✅ EXR environment map loaded');
          texture.mapping = THREE.EquirectangularReflectionMapping;
          const exrCubeRenderTarget = pmremGenerator.fromEquirectangular(texture);
          sphereMaterial.envMap = exrCubeRenderTarget.texture;
          sphereMaterial.needsUpdate = true;
        },
        undefined,
        (error: any) => {
          console.warn('⚠️ EXR environment map failed to load, using default material:', error);
          // Sphere remains visible with default material
        }
      );

      const renderPass = new RenderPass(scene, camera);

      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        5,
        0.5,
        0,
      );

      const fxaaPass = new ShaderPass(FXAAShader);

      const composer = new EffectComposer(renderer);
      composer.addPass(renderPass);
      // composer.addPass(fxaaPass);
      composer.addPass(bloomPass);
      this.composer = composer;
      console.log('✅ Post-processing composer created');

      const onWindowResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        const dPR = renderer.getPixelRatio();
        const w = window.innerWidth;
        const h = window.innerHeight;
        (backdrop.material as THREE.RawShaderMaterial).uniforms.resolution.value.set(
          w * dPR,
          h * dPR,
        );
        renderer.setSize(w, h);
        composer.setSize(w, h);
        fxaaPass.material.uniforms['resolution'].value.set(1 / (w * dPR), 1 / (h * dPR));
      };

      window.addEventListener('resize', onWindowResize);
      onWindowResize();

      console.log('✅ 3D initialization complete, starting animation loop');
      this.animation();
      
    } catch (error) {
      console.error('❌ Critical error in 3D initialization:', error);
    }
  }

  private animation() {
    requestAnimationFrame(() => this.animation());

    try {
      this.inputAnalyser?.update();
      this.outputAnalyser?.update();

      const t = performance.now();
      const dt = (t - this.prevTime) / (1000 / 60);
      this.prevTime = t;

      const backdropMaterial = this.backdrop.material as THREE.RawShaderMaterial;
      const sphereMaterial = this.sphere.material as THREE.MeshStandardMaterial & {
        userData: { shader?: any };
      };

      backdropMaterial.uniforms.rand.value = Math.random() * 10000;

      if (sphereMaterial.userData.shader) {
        this.sphere.scale.setScalar(1 + (0.2 * this.outputAnalyser.data[1]) / 255);

        const f = 0.001;
        this.rotation.x += (dt * f * 0.5 * this.outputAnalyser.data[1]) / 255;
        this.rotation.z += (dt * f * 0.5 * this.inputAnalyser.data[1]) / 255;
        this.rotation.y += (dt * f * 0.25 * this.inputAnalyser.data[2]) / 255;
        this.rotation.y += (dt * f * 0.25 * this.outputAnalyser.data[2]) / 255;

        const euler = new THREE.Euler(this.rotation.x, this.rotation.y, this.rotation.z);
        const quaternion = new THREE.Quaternion().setFromEuler(euler);
        const vector = new THREE.Vector3(0, 0, 5);
        vector.applyQuaternion(quaternion);
        this.camera.position.copy(vector);
        this.camera.lookAt(this.sphere.position);

        sphereMaterial.userData.shader.uniforms.time.value +=
          (dt * 0.1 * this.outputAnalyser.data[0]) / 255;
        sphereMaterial.userData.shader.uniforms.inputData.value.set(
          (1 * this.inputAnalyser.data[0]) / 255,
          (0.1 * this.inputAnalyser.data[1]) / 255,
          (10 * this.inputAnalyser.data[2]) / 255,
          0,
        );
        sphereMaterial.userData.shader.uniforms.outputData.value.set(
          (2 * this.outputAnalyser.data[0]) / 255,
          (0.1 * this.outputAnalyser.data[1]) / 255,
          (10 * this.outputAnalyser.data[2]) / 255,
          0,
        );
      }

      this.composer.render();
    } catch (error) {
      // Silent animation errors to avoid log spam
    }
  }

  protected render() {
    return html`<canvas></canvas>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gdm-live-audio-visuals-3d': GdmLiveAudioVisuals3D;
  }
}