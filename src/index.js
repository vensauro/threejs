import "./styles.css";
import {
  Color,
  Scene,
  PerspectiveCamera,
  BoxGeometry,
  MeshNormalMaterial,
  Mesh,
  WebGLRenderer,
  AmbientLight,
  DirectionalLight,
  PointLight,
} from "three";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function makeCamera() {
  const camera = new PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    1,
    5000
  );

  camera.rotation.x = -0.46364760900080604;
  camera.rotation.y = 0.3697582906181354;
  camera.rotation.z = 0.17876607872870992;

  camera.position.x = 130;
  camera.position.y = 150;
  camera.position.z = 300;

  return camera;
}

function makeLights() {
  const hlight = new AmbientLight(0x404040, 100);

  const directionalLight = new DirectionalLight(0xffffff, 100);
  directionalLight.position.set(0, 1, 0);
  directionalLight.castShadow = true;

  const light = new PointLight(0xc4c4c4, 10);
  light.position.set(0, 300, 500);

  const light2 = new PointLight(0xc4c4c4, 10);
  light2.position.set(500, 100, 0);

  const light3 = new PointLight(0xc4c4c4, 10);
  light3.position.set(0, 100, -500);

  const light4 = new PointLight(0xc4c4c4, 10);
  light4.position.set(-500, 300, 500);

  return {
    // hlight,
    // directionalLight,
    light,
    light2,
    light3,
    light4,
  };
}

function init() {
  const camera = makeCamera();

  const scene = new Scene();
  scene.background = new Color(0xffffff);

  Object.values(makeLights()).forEach((light) => scene.add(light));

  const renderer = new WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("app").appendChild(renderer.domElement);

  return {
    camera,
    scene,
    renderer,
  };
}

function animate({ renderer, scene, camera }, animation) {
  renderer.render(scene, camera);

  animation && animation({ renderer, scene, camera });

  requestAnimationFrame(() => animate({ renderer, scene, camera }, animation));
}

const { camera, renderer, scene } = init();

const loader = new GLTFLoader();

loader.loadAsync("viking_room/scene.gltf").then((gltf) => {
  const modelObj = gltf.scene.children[0];
  modelObj.scale.set(2, 2, 2);
  scene.add(gltf.scene);
  return gltf.scene;
});

// const mesh = new Mesh(new BoxGeometry(0.3, 0.3, 0.3), new MeshNormalMaterial());
// scene.add(mesh);

animate({ camera, renderer, scene }, () => {
  // mesh.rotation.x += 0.01;
  // mesh.rotation.y += 0.02;
});

// document.addEventListener("mousemove", (e) => {
//   camera.position.x = (e.x - window.innerWidth / 2) * 0.005;
//   camera.lookAt(scene.position);
// });

window.camera = camera;
window.scene = scene;
