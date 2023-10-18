"use client";
import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import SceneInit from "../three/SceneInit";

export const viewer = (canvas: SceneInit) => {
  const loader = new GLTFLoader();

  // LOAD GLTF
  let loadedModel: GLTF;
  loader.load(
    "./bike/scene.gltf",
    (gltf) => {
      loadedModel = gltf;
      gltf.scene.rotation.y = Math.PI / 8;
      gltf.scene.position.y = 3;
      gltf.scene.scale.set(10, 10, 10);
      canvas.scene!.add(gltf.scene);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
  const animate = () => {
    if (loadedModel) {
      loadedModel.scene.rotation.y += 0.002;
    }
    requestAnimationFrame(animate);
  };
  animate();
};
