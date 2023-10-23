"use client";
import {
  ArcRotateCamera,
  Engine,
  Scene,
  SceneLoader,
  Vector3,
} from "@babylonjs/core";
import "@babylonjs/core/Helpers/sceneHelpers";
import "@babylonjs/loaders/glTF/2.0";

export const viewer = (canvas: HTMLCanvasElement) => {
  const engine = new Engine(canvas, true);
  engine.scenes.forEach((scene) => {
    engine.unRegisterView(canvas);
    scene.dispose();
  });
  const scene = new Scene(engine);
  const camera = new ArcRotateCamera("camera", 1, 1, 4, new Vector3(0, 0, 0));
  // const directionalLight = new DirectionalLight(
  //   "DirectionalLight",
  //   new Vector3(0, -1, 0),
  //   scene
  // );

  // const ambientLight = new HemisphericLight(
  //   "ambientLight",
  //   new Vector3(0, -1, 0),
  //   scene
  // );
  camera.attachControl(canvas, true);

  // scene.createDefaultEnvironment({
  //   environmentTexture: "./forest.env",
  //   skyboxTexture: "./forest.env",
  // });

  // window.addEventListener("resize", () => {
  //   engine.resize();
  // });
  const loadScene = SceneLoader.Append(
    "./moto/model/",
    "scene.gltf",
    scene,
    (meshes) => {
      scene.createDefaultCameraOrLight(true);
      if (!scene.activeCamera) return;
      // scene.activeCamera.attachControl(canvas, true);
      scene.render();
    }
  );
  // SceneLoader.ImportMesh(
  //   "moto",
  //   "./moto/",
  //   "scene.gltf",
  //   scene,
  //   (meshes) => {}
  // ).then((r) => {
  // const result = r.meshes[0];
  // result.position.y = 1;
  // camera.setTarget(r.meshes[0]!);
  // const materials: Material[] = scene.materials;
  // // console.log(r);
  // // console.log(scene);

  // materials.map((material) => {
  //   // material.freeze();
  //   if (material.name === "Sella") {
  //     const myMaterial = new StandardMaterial("sella blu", scene);
  //     myMaterial.diffuseTexture = new Texture(
  //       "./moto/all-textures/SELLA/_pelle blu/_pelle blu_LP_Sella_Normal.png",
  //       scene
  //     );
  //     // myMaterial.specularPower = 1;
  //     console.log(r.meshes.map((mesh) => mesh));
  //     console.log(r.meshes[12].material);
  //     // r.meshes[12].material = myMaterial;
  //     // material = new NodeMaterial(
  //     //   "./moto/all-textures/SELLA/_pelle blu/_pelle blu_LP_Sella_BaseColor.png",
  //     //   scene
  //     // );
  //   }
  // });

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
  // scene.onBeforeRenderObservable.add(() => {
  //   r.meshes[0]!.rotate(new Vector3(0, 1, 0), 0.001);
  // });
  // });

  engine.runRenderLoop(() => {
    scene.render();
  });
};
