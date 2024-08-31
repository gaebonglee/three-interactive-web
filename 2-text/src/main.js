import * as Three from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";

window.addEventListener("load", function () {
  init();
});

function init() {
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

  //font
  const fontLoader = new FontLoader();
  fontLoader.load(
    "./assets/fonts/JNE Yuna TTF_Regular.json",
    (font) => {
      console.log("load", font);
    },
    (event) => {
      console.log("progresss", event);
    }
  ),
    (error) => {
      onsole.log("error", error);
    };

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

  render();
}
