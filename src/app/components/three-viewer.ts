"use client";
import * as THREE from "three";
import SceneInit from "../three/SceneInit";
// @ts-ignore
import { GUI } from "dat.gui";

export const viewer = (canvas: SceneInit) => {
  // const loader = new GLTFLoader();
  // const rgbeloader = new RGBELoader();

  // initialize gui
  const gui = new GUI();

  // main group
  const mainGroup = new THREE.Group();
  mainGroup.position.y = 0.5;
  canvas.scene!.add(mainGroup);

  // set up ground
  const groundGeometry = new THREE.BoxGeometry(8, 0.5, 8);
  const groundMaterial = new THREE.MeshPhongMaterial({ color: 0xfafafa });
  const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
  groundMesh.receiveShadow = true;
  groundMesh.position.y = -2;
  mainGroup.add(groundMesh);

  // // LOAD GLTF
  // let loadedModel: GLTF;
  // loader.load(
  //   "./bike/scene.gltf",
  //   (gltf) => {
  //     loadedModel = gltf;
  //     gltf.scene.position.x = 0;
  //     gltf.scene.scale.set(2, 2, 2);

  //     mainGroup.add(gltf.scene);
  //     gltf.scene.castShadow = true;
  //     // canvas.scene!.add(gltf.scene);
  //   },
  //   undefined,
  //   function (error) {
  //     console.error(error);
  //   }
  // );

  // set up blue box mesh
  const bg3 = new THREE.BoxGeometry(1, 1, 1);
  const bm3 = new THREE.MeshPhongMaterial({ color: 0x0000ff });
  const boxMesh3 = new THREE.Mesh(bg3, bm3);
  boxMesh3.castShadow = true;
  boxMesh3.position.x = 2;
  mainGroup.add(boxMesh3);

  // set up red box mesh
  const bg1 = new THREE.BoxGeometry(1, 1, 1);
  const bm1 = new THREE.MeshPhongMaterial({ color: 0xff0000 });
  const boxMesh1 = new THREE.Mesh(bg1, bm1);
  boxMesh1.castShadow = true;
  boxMesh1.position.x = -2;
  mainGroup.add(boxMesh1);

  // set up green box mesh
  const bg2 = new THREE.BoxGeometry(1, 1, 1);
  const bm2 = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
  const boxMesh2 = new THREE.Mesh(bg2, bm2);
  boxMesh2.castShadow = true;
  boxMesh2.position.x = 0;
  mainGroup.add(boxMesh2);

  // Ambient Light
  const ambientLight = canvas.ambientLight;
  mainGroup.add(ambientLight!);

  // set up ambient light gui
  const alFolder = gui.addFolder("ambient light");
  const alSettings = { color: ambientLight!.color.getHex() };
  alFolder.add(ambientLight!, "visible");
  alFolder.add(ambientLight!, "intensity", 0, 1, 0.1);
  alFolder
    .addColor(alSettings, "color")
    .onChange((value: THREE.ColorRepresentation) =>
      ambientLight!.color.set(value)
    );
  alFolder.open();

  // Directional Light and helper
  const directionalLight = canvas.directionalLight;
  directionalLight!.castShadow = true;
  mainGroup.add(directionalLight!);

  const dlHelper = new THREE.DirectionalLightHelper(directionalLight!, 3);
  // mainGroup.add(dlHelper);
  // set up directional light gui
  const dlSettings = {
    visible: true,
    color: directionalLight!.color.getHex(),
  };
  const dlFolder = gui.addFolder("directional light");
  dlFolder.add(dlSettings, "visible").onChange((value: boolean) => {
    directionalLight!.visible = value;
    dlHelper.visible = value;
  });
  dlFolder.add(directionalLight!, "intensity", 0, 1, 0.25);
  dlFolder.add(directionalLight!.position, "y", 1, 4, 0.5);
  dlFolder.add(directionalLight!, "castShadow");
  dlFolder
    .addColor(dlSettings, "color")
    .onChange((value: THREE.ColorRepresentation) =>
      directionalLight!.color.set(value)
    );
  dlFolder.open();

  // set up spot light + helper
  const sl = new THREE.SpotLight(0x00ff00, 1, 8, Math.PI / 8, 0);
  sl.position.set(0, 2, 2);
  const slHelper = new THREE.SpotLightHelper(sl);
  mainGroup.add(sl, slHelper);

  // set up spot light gui
  const slSettings = {
    visible: true,
  };
  const slFolder = gui.addFolder("spot light");
  slFolder.add(slSettings, "visible").onChange((value: boolean) => {
    sl.visible = value;
    slHelper.visible = value;
  });
  slFolder.add(sl, "intensity", 0, 4, 0.5);
  slFolder.add(sl, "angle", Math.PI / 16, Math.PI / 2, Math.PI / 16);
  slFolder.add(sl, "castShadow");
  slFolder.open();

  const pl = new THREE.PointLight(0xffffff, 1, 8, 2);
  pl.position.set(2, 2, 2);
  const plHelper = new THREE.PointLightHelper(pl, 0.5);
  mainGroup.add(pl, plHelper);

  // set up point light gui
  const plSettings = {
    visible: true,
    color: pl.color.getHex(),
  };
  const plFolder = gui.addFolder("point light");
  plFolder.add(plSettings, "visible").onChange((value: boolean) => {
    pl.visible = value;
    plHelper.visible = value;
  });
  plFolder.add(pl, "intensity", 0, 2, 0.25);
  plFolder.add(pl.position, "x", -2, 4, 0.5);
  plFolder.add(pl.position, "y", -2, 4, 0.5);
  plFolder.add(pl.position, "z", -2, 4, 0.5);
  plFolder.add(pl, "castShadow");
  plFolder
    .addColor(plSettings, "color")
    .onChange((value: THREE.ColorRepresentation) => pl.color.set(value));
  plFolder.open();

  // const animate = () => {
  //   if (loadedModel) {
  //     loadedModel.scene.rotation.y += 0.002;
  //   }
  //   requestAnimationFrame(animate);
  // };
  // animate();

  // Destroy the GUI on reload to prevent multiple stale UI from being displayed on screen.
  return () => {
    gui.destroy();
  };

  // rgbeloader.load(
  //   "./model/texture/venice_sunset_1k.hdr",
  //   (texture: THREE.Texture | THREE.CubeTexture | null) => {
  //     texture!.mapping = THREE.EquirectangularReflectionMapping;

  //     canvas.scene!.background = texture;
  //     canvas.scene!.environment = texture;
  //   }
  // );
};
