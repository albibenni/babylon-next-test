"use client";
import {
  AbstractMesh,
  ArcRotateCamera,
  Color3,
  ColorGradingTexture,
  Engine,
  Material,
  PBRMaterial,
  Scene,
  SceneLoader,
  StandardMaterial,
  Texture,
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
  // const sceneLoader = SceneLoader.ImportMesh(
  //   "",
  //   "./moto/model/",
  //   "scene.gltf",
  //   scene,
  //   () => {
  //     scene.createDefaultCameraOrLight();
  //     if (!scene.activeCamera) return;

  //     console.log(scene.meshes);

  //     //   Click action in image
  //     //   text_button.onPointerUpObservable.add(() => {
  //     //     BABYLON.SceneLoader.ImportMesh("", "https://dl.dropbox.com/s/pc4g5eyf98w7qcb/", "fit shirt .glb", scene, function (newMeshes) {
  //     //         var mesh = newMeshes[1];

  //     //         mesh.parent = hero
  //     //         newMeshes[0].dispose()
  //     //         shirt_mesh.dispose()

  //     //     });
  //     // });
  //   }
  // );

  // const sellaMesh: AbstractMesh[] | undefined = scene.meshes.filter(
  //   (mesh) => mesh.material?.id === "Sella_Sella_0"
  // );

  SceneLoader.ImportMeshAsync(
    "",
    "./moto/model/",
    "scene.gltf",
    scene,
    (meshes) => {
      scene.createDefaultCameraOrLight();
      if (!scene.activeCamera) return;
    }
  ).then((r) => {
    const result = r.meshes[0];
    result.position.y = 1;
    camera.setTarget(r.meshes[0]!);
    const materials: Material[] = scene.materials;
    // console.log(r);
    // console.log(scene);
    const sellaMesh = scene.getMeshByName("Sella_Sella_0");
    console.log(scene);
    if (!sellaMesh || !sellaMesh.material) console.log("Material undefined");
    updateMeshMaterial(
      ["./moto/swap-t/SELLA/_pelle blu/_pelle blu_LP_Sella_Normal.png"],
      scene,
      sellaMesh!.material as PBRMaterial
    );

    console.log(sellaMesh!.material);

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
    // r.meshes[12].material = myMaterial;
    // material = new NodeMaterial(
    //   "./moto/all-textures/SELLA/_pelle blu/_pelle blu_LP_Sella_BaseColor.png",
    //   scene
    // );
    //   }
    // });
    return scene;
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
  // scene.onBeforeRenderObservable.add(() => {
  //   r.meshes[0]!.rotate(new Vector3(0, 1, 0), 0.001);
  // });
  // });

  engine.runRenderLoop(() => {
    scene.render();
  });
};

const updateMeshMaterial = (
  paths: string[],
  scene: Scene,
  pbr: PBRMaterial
) => {
  let mat = new PBRMaterial("test-Sella", scene);
  // mat.bumpTexture = new Texture(paths[0], scene);
  mat.bumpTexture = new Texture(paths[0], scene);
  mat.albedoTexture = null;
  mat.albedoColor = Color3.FromHexString("#FF1100");
  console.log(pbr);
  scene.meshes.forEach((m) => {
    if (m.material === pbr) {
      m.material = mat;
    }
  });

  // if (!existingMat) return;
  // existingMat = new BABYLON.StandardMaterial
};
