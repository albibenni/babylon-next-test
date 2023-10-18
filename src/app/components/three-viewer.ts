"use client";
import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import SceneInit from "../three/SceneInit";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

export const viewer = (canvas: SceneInit) => {
  const loader = new GLTFLoader();
  const rgbeloader = new RGBELoader();

  // LOAD GLTF
  let loadedModel: GLTF;
  loader.load(
    "./bike/scene.gltf",
    (gltf) => {
      loadedModel = gltf;
      gltf.scene.position.y = 3;
      gltf.scene.scale.set(15, 15, 15);
      gltf.scene.castShadow = true;
      gltf.scene.receiveShadow = false;
      canvas.scene!.add(gltf.scene);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );

  const planeGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
  const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;
  plane.rotation.x = -Math.PI / 2;
  canvas.scene!.add(plane);

  // rgbeloader.load(
  //   "./model/texture/venice_sunset_1k.hdr",
  //   (texture: THREE.Texture | THREE.CubeTexture | null) => {
  //     texture!.mapping = THREE.EquirectangularReflectionMapping;

  //     canvas.scene!.background = texture;
  //     canvas.scene!.environment = texture;
  //   }
  // );
  const animate = () => {
    if (loadedModel) {
      loadedModel.scene.rotation.y += 0.002;
    }
    requestAnimationFrame(animate);
  };
  animate();
};
