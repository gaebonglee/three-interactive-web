import * as Three from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { gsap } from "gsap";
import { GUI } from "lil-gui";
import Card from "./card";
window.addEventListener("load", function () {
  init();
});

function init() {
  const gui = new GUI();

  const COLORS = ["#D9117F", "#03C75A", "#8BCED7", "#FECD46"];

  const renderer = new Three.WebGLRenderer({
    antialias: true,
    alpha: true,
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

  camera.position.z = 25;

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.autoRotate = true;
  controls.autoRotateSpeed = 5;
  controls.rotateSpeed = 1.2;
  controls.enableDamping = true;
  controls.enableZoom = false;
  controls.minPolarAngle = Math.PI / 2 - Math.PI / 3;
  controls.maxPolarAngle = Math.PI / 2 + Math.PI / 3;

  const card = new Card({
    width: 10,
    height: 15.8,
    radius: 0.5,
    color: COLORS[0],
  });

  card.mesh.rotation.z = Math.PI * 0.05;

  scene.add(card.mesh);

  gsap.to(card.mesh.rotation, {
    y: -Math.PI * 4,
    duration: 2.5,
    ease: "back.out(2.5)",
  });

  const cardFolder = gui.addFolder("Card");
  cardFolder
    .add(card.mesh.material, "roughness")
    .min(0)
    .max(1)
    .step(0.01)
    .name("material.roughness");

  cardFolder
    .add(card.mesh.material, "metalness")
    .min(0)
    .max(1)
    .step(0.01)
    .name("material.metalness");

  //-----ambientLight------//
  const ambientLight = new Three.AmbientLight(0xffffff, 1);
  ambientLight.position.set(-5, -5, -5);
  scene.add(ambientLight);

  const directionLight1 = new Three.DirectionalLight(0xffffff, 0.6);
  const directionLight2 = directionLight1.clone();

  directionLight1.position.set(1, 1, 3);
  directionLight2.position.set(-1, -1, -3);

  scene.add(directionLight1, directionLight2);

  render();

  function render() {
    controls.update();
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

  const container = document.querySelector(".container");

  COLORS.forEach((color) => {
    const button = document.createElement("button");

    button.style.backgroundColor = color;
    button.addEventListener("click", () => {
      card.mesh.material.color = new Three.Color(color);
      gsap.to(card.mesh.rotation, {
        y: card.mesh.rotation.y - Math.PI / 2,
        duration: 2.5,
        ease: "back.out(2.5)",
      });
    });

    container.appendChild(button);
  });
}
