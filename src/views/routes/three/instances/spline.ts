import {
  Mesh,
  OrthographicCamera,
  WebGLRenderer,
  Group,
  Object3D,
  Cache,
  Clock,
  MathUtils,
  PCFShadowMap,
  Color,
  Scene,
} from 'three';
import { createOrthographicCamera } from '../basic/camera';
import { createTextureCube } from '../basic/cube';
import { createLights } from '../basic/light';
import { createScene } from '../basic/scene';
import { createAntialiasRender } from '../basic/renderer';
import { resize } from '../basic/resize';
import { useStore } from '@/stores';
import { watch, nextTick } from 'vue';
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { createCameraControl } from '../plugin';
import SplineLoader from '@splinetool/loader';

const clock = new Clock();
const store = useStore();

class Spline {
  camera: OrthographicCamera;
  scene: Scene;
  renderer: WebGLRenderer;
  cube?: Object3D;
  animationFrame?: number;
  control?: OrbitControls;

  constructor(container: HTMLElement) {
    this.camera = createOrthographicCamera(container);
    this.scene = createScene();
    this.scene.background = new Color('rgb(255,200,160)');
    this.renderer = createAntialiasRender(
      container.clientWidth,
      container.clientHeight
    );
    container.append(this.renderer.domElement);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = PCFShadowMap;
    this.renderer.setClearAlpha(1);

    this.addControl();
    this.loadSpline();

    watch(
      () => store.menu,
      () => {
        nextTick(() => {
          resize(this, container);
        });
      }
    );
  }

  addControl() {
    this.control = createCameraControl(this.camera, this.renderer.domElement);
    this.control.enableDamping = true;
    this.control.dampingFactor = 0.125;
  }

  loadSpline() {
    const loader = new SplineLoader();
    // const url = `${import.meta.env.BASE_URL}data/models/scene.splinecode`;
    const url = `https://prod.spline.design/bCHj2cYTqGBa3R7S/scene.splinecode`;

    loader.load(
      url,
      (splineScene) => {
        this.scene.add(splineScene);
        // console.clear();
      },
      (progress: ProgressEvent) => {
        if (progress.lengthComputable) {
          console.log(progress);
          const { total, loaded } = progress;
          const percent = (loaded / total) * 100;
          console.log('进度%d%', percent);

          if (total > loaded) {
            console.log('加载中');
          } else {
            console.log('加载完毕');
          }
        }
      },
      (error) => {
        console.log('An error happened');
      }
    );
  }

  animate() {
    const delta = clock.getDelta();
    const rate = MathUtils.degToRad(30) * delta;
    if (this.cube) {
      this.cube.rotation.x += rate;
      this.cube.rotation.y += rate;
      this.cube.rotation.z += rate;
    }
  }

  //真正的动画函数在这里
  render(container: HTMLElement) {
    this.control?.update();
    this.animate();
    resize(this, container);

    if (container.getBoundingClientRect().width > 0) {
      this.animationFrame = requestAnimationFrame(
        this.render.bind(this, container)
      );
    } else return;
  }

  stop() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    } else return;
  }

  beforeDestroy() {
    this.scene.traverse((item: any) => {
      disposeChild(item);
    });
    Cache.clear();
    this.scene.clear();
    this.renderer.dispose();
    this.renderer.forceContextLoss();
  }
}

const disposeChild = (mesh: unknown) => {
  if (mesh instanceof Mesh) {
    if (mesh.geometry?.dispose) {
      mesh.geometry.dispose();
    }
    if (mesh.material?.dispose) {
      mesh.material.dispose();
    }
    if (mesh.material?.texture?.dispose) {
      mesh.material.texture.dispose();
    }
  }
  if (mesh instanceof Group) {
    mesh.clear();
  }
  if (mesh instanceof Object3D) {
    mesh.clear();
  }
};

export { Spline };
