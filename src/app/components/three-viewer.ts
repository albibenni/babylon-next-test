"use client";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export const viewer = (canvas: HTMLCanvasElement) => {
  // const engine = new Engine(canvas, true);

  // const scene = new Scene(engine);
  const scene = new THREE.Scene();
  const loader = new GLTFLoader();

  // const camera = new ArcRotateCamera("camera", 1, 1, 4, new Vector3(0, 0, 0));
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 96;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  ambientLight.castShadow = true;
  scene.add(ambientLight);

  const spotLight = new THREE.SpotLight(0xffffff, 0.5);
  spotLight.castShadow = true;
  scene.add(spotLight);
  scene.add();
  loader.load(
    "scene.gltf",
    (gltf) => {
      scene.add(gltf.scene);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
  const animate = () => {
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
  };
};
