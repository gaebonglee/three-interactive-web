import * as Three from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

window.addEventListener("load", function () {
  init();
});

function init() {
  const optoins = {
    color: 0x00ffff,
  };
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
  const controls = new OrbitControls(camera, renderer.domElement);

  controls.autoRotate = true; //카메라의 자동 회전
  // controls.autoRotateSpeed = 30; //회전 속도 조정
  controls.enableDamping = true; //댐핑 효과를 활성화하는 설정
  controls.dampingFactor = 0.01;

  const cubeGeometry = new Three.IcosahedronGeometry(1);
  const cubeMaterial = new Three.MeshLambertMaterial({
    color: "#fcdcdc",

  });
  const cube = new Three.Mesh(cubeGeometry, cubeMaterial);

  const skeletonGeometry = new Three.IcosahedronGeometry(2);
  const skeletonMaterial = new Three.MeshBasicMaterial({
    wireframe: true,
    transparent: true,
    opacity: 0.2,
    color: 0xaaaaaa,
  });

  const skeleton = new Three.Mesh(skeletonGeometry, skeletonMaterial);

  scene.add(cube, skeleton);

  camera.position.z = 5;

  // 조명 수정
  const directionalLight = new Three.DirectionalLight("white", 1);

  scene.add(directionalLight);

  const clock = new Three.Clock();

  render();

  function render() {
    const elapsedTime = clock.getElapsedTime();

    // cube.rotation.x = elapsedTime;
    // cube.rotation.y = elapsedTime;

    // skeleton.rotation.x = elapsedTime * 2;
    // skeleton.rotation.y = elapsedTime * 2;

    renderer.render(scene, camera);

    controls.update();

    requestAnimationFrame(render);
  }

  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
    controls.update();
  }

  window.addEventListener("resize", handleResize);

  const gui = new GUI();

  gui.add(cube.position, "y", -3, 3);
  gui.add(cube, "visible");
  gui.addColor(optoins, "color").onChange((value) => {
    cube.material.color.set(value);
  });
}
