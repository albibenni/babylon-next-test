"use client";
import {
  Engine,
  Scene,
  Vector3,
  SceneLoader,
  ArcRotateCamera,
  FreeCamera,
  Material,
  Texture,
  StandardMaterial,
  DirectionalLight,
  HemisphericLight,
  NodeMaterial,
  Color3,
} from "@babylonjs/core";
import "@babylonjs/loaders/glTF/2.0";
import "@babylonjs/core/Helpers/sceneHelpers";
import { AmbientLight } from "three";

export const viewer = (canvas: HTMLCanvasElement) => {
  const engine = new Engine(canvas, true);

  const scene = new Scene(engine);
  const camera = new ArcRotateCamera("camera", 1, 1, 4, new Vector3(0, 0, 0));
  const directionalLight = new DirectionalLight(
    "DirectionalLight",
    new Vector3(0, -1, 0),
    scene
  );

  const ambientLight = new HemisphericLight(
    "ambientLight",
    new Vector3(0, -1, 0),
    scene
  );
  camera.attachControl(canvas, true);

  scene.createDefaultEnvironment({
    environmentTexture: "./forest.env",
    skyboxTexture: "./forest.env",
  });

  engine.runRenderLoop(function () {
    scene.render();
  });
  window.addEventListener("resize", () => {
    engine.resize();
  });

  SceneLoader.ImportMeshAsync(
    "",
    "./moto/",
    "scene.gltf",
    scene,
    (meshes) => {}
  ).then((r) => {
    const result = r.meshes[0];
    // result.position.y = 2;
    camera.setTarget(r.meshes[0]!);
    const materials: Material[] = scene.materials;
    console.log(r);

    materials.map((material) => {
      // material.freeze();
      if (material.name === "Sella") {
        const myMaterial = new StandardMaterial("sella blu", scene);
        myMaterial.diffuseTexture = new Texture(
          "./moto/all-textures/SELLA/_pelle blu/_pelle blu_LP_Sella_Normal.png",
          scene
        );
        // myMaterial.specularPower = 1;
        r.meshes[12].material = myMaterial;
        // material = new NodeMaterial(
        //   "./moto/all-textures/SELLA/_pelle blu/_pelle blu_LP_Sella_BaseColor.png",
        //   scene
        // );
      }
    });

    // const textureBlueSaddleBaseColor = textureLoader.load(
    //   "./moto/all-textures/SELLA/_pelle blu/_pelle blu_LP_Sella_BaseColor.png"
    //   // "./moto/textures/Marmitta_normal.png"
    // );
    // const textureBlueSaddleMetallicRoughness = textureLoader.load(
    //   "./moto/all-textures/SELLA/_pelle blu/_pelle blu_Sella_Roughness.png"
    // );
    // const textureBlueSaddleNormal = textureLoader.load(
    //   "./moto/all-textures/SELLA/_pelle blu/_pelle blu_LP_Sella_Normal.png"
    // );
    scene.onBeforeRenderObservable.add(() => {
      r.meshes[0]!.rotate(new Vector3(0, 1, 0), 0.001);
    });
  });
};
