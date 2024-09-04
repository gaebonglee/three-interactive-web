import * as Three from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

window.addEventListener("load", function () {
  init();
});

async function init() {
  const gui = new GUI();
  const renderer = new Three.WebGLRenderer({
    antialias: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const scene = new Three.Scene();

  const camera = new Three.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    500
  );

  camera.position.z = 5;
  //-------------Controls----------------//
  new OrbitControls(camera, renderer.domElement);

  //------------------font--------------------------//
  const fontLoader = new FontLoader();
  const font = await fontLoader.loadAsync(
    "./assets/fonts/JNE Yuna TTF_Regular.json"
  );

  //-------Text-------//
  const textGeometry = new TextGeometry("안녕 링구들!", {
    font,
    size: 0.5,
    height: 0.1,
    bevelEnabled: true,
    bevelSegments: 5,
    bevelSize: 0.02,
    bevelThickness: 0.02,
  });
  const textMaterial = new Three.MeshPhongMaterial({ color: 0xffcdcd6 });

  const text = new Three.Mesh(textGeometry, textMaterial);

  textGeometry.center();

  //-------------Texture--------------//
  const textureLoader = new Three.TextureLoader();

  const textTexture = textureLoader.load("./assets/texture/paperTexture.jpg");

  scene.add(text);

  //-----ambientLight------//
  const ambientLight = new Three.AmbientLight(0xffffff, 1);

  scene.add(ambientLight);

  //------PointLight-------//
  const pointLight = new Three.PointLight(0xffffff, 1.5);

  pointLight.position.set(1, 1, 1);
  scene.add(pointLight);

  gui.add(pointLight.position, "x").min(-3).max(3).step(0.1);

  render();

  function render() {
    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  window.addEventListener("resize", handleResize);
}
