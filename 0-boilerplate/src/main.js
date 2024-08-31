import * as Three from "three";

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
