"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import SceneInit from "../three/SceneInit";
// @ts-ignore
import { GUI } from "dat.gui";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { error } from "console";

export default function Home() {
  const reactCanvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // const { current: canvas } = reactCanvas;
    const loader = new GLTFLoader();

    const canvas = new SceneInit("three-canvas");
    canvas.initialize();
    canvas.animate();
    // viewer(canvas);
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
    let loadedModel: GLTF;
    // loader.load(
    //   "./bike/scene.gltf",
    //   (glb) => {
    //     loadedModel = glb;
    //     glb.scene.position.x = 0;
    //     glb.scene.position.y = -1.4;
    //     glb.scene.scale.set(2, 2, 2);
    //     // canvas.scene!.add(gltf.scene);
    //     mainGroup.add(glb.scene);
    //     glb.scene.traverse((node) => {
    //       if (node instanceof THREE.Mesh) {
    //         node.castShadow = true;
    //         node.receiveShadow = true;
    //         node.material.map = value;
    //         //? Trying materials and textures
    //         // const nodeGltfSettingsFolder = gui.addFolder("node gltf settings");
    //         // nodeGltfSettingsFolder
    //         //   .add(node.material, "wireframe")
    //         //   .onChange((value: THREE.Texture) => {
    //         //     node.material.map = value;
    //         //   });
    //       }
    //     });
    //   },
    //   undefined,
    //   function (error) {
    //     console.error(error);
    //   }
    // );

    //! LOAD GLTF
    // const loadGltf = async () => await loader.loadAsync("./bike/scene.gltf");

    // loadGltf()
    //   .then((gltf) => {
    //     gltf.scene.position.x = 0;
    //     gltf.scene.position.y = -1.4;
    //     gltf.scene.scale.set(2, 2, 2);
    //     mainGroup.add(gltf.scene);
    //     gltf.scene.traverse((node) => {
    //       if (node instanceof THREE.Mesh) {
    //         node.castShadow = true;
    //         node.receiveShadow = true;
    //         // node.material.map = ;
    //         // const nodeGltfSettingsFolder = gui.addFolder("node gltf settings");
    //         // nodeGltfSettingsFolder
    //         //   .add(node.material, "wireframe")
    //         //   .onChange((value: THREE.Texture) => {
    //         //     node.material.map = value;
    //         //   });
    //       }
    //     });
    //   })
    //   .catch(console.error);
    const textureLoader = new THREE.TextureLoader();
    const textureRandomMoto = textureLoader.load(
      "./moto/textures/Manubrio_normal.png"
    );
    const textureRandomBike = textureLoader.load(
      "./bike/textures/Saddle_normal.png"
    );
    const tempMaterial = new THREE.MeshStandardMaterial({
      map: textureRandomBike,
      normalMap: textureRandomBike,
    });
    //! LOAD GLTF
    const loadGltf2 = async () => await loader.loadAsync("./moto/scene.gltf");

    loadGltf2()
      .then((gltf) => {
        gltf.scene.position.x = 0;
        gltf.scene.position.y = +1;
        gltf.scene.scale.set(2, 2, 2);
        mainGroup.add(gltf.scene);
        gltf.scene.traverse((node) => {
          if (node instanceof THREE.Mesh) {
            node.castShadow = true;
            node.receiveShadow = true;
            node.material = tempMaterial;
            // node.material.map = ;
            // const nodeGltfSettingsFolder = gui.addFolder("node gltf settings");
            // nodeGltfSettingsFolder
            //   .add(node.material, "wireframe")
            //   .onChange((value: THREE.Texture) => {
            //     node.material.map = value;
            //   });
          }
        });
      })
      .catch(console.error);
    //? Trying materials and textures

    // .then((glb) => {
    //   (glb: GLTF) => {
    //     loadedModel = glb;
    //     glb.scene.position.x = 0;
    //     glb.scene.position.y = -1.4;
    //     glb.scene.scale.set(2, 2, 2);
    //     // canvas.scene!.add(gltf.scene);
    //     mainGroup.add(glb.scene);
    //     glb.scene.traverse((node) => {
    //       if (node instanceof THREE.Mesh) {
    //         node.castShadow = true;
    //         node.receiveShadow = true;
    //         node.material.map = ;
    // const nodeGltfSettingsFolder = gui.addFolder("node gltf settings");
    // nodeGltfSettingsFolder
    //   .add(node.material, "wireframe")
    //   .onChange((value: THREE.Texture) => {
    //     node.material.map = value;
    //   });

    // // set up blue box mesh
    // const bg3 = new THREE.BoxGeometry(1, 1, 1);
    // const bm3 = new THREE.MeshPhongMaterial({ color: 0x0000ff });
    // const boxMesh3 = new THREE.Mesh(bg3, bm3);
    // boxMesh3.castShadow = true;
    // boxMesh3.position.x = 2;
    // mainGroup.add(boxMesh3);

    // // set up red box mesh
    // const bg1 = new THREE.BoxGeometry(1, 1, 1);
    // const bm1 = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    // const boxMesh1 = new THREE.Mesh(bg1, bm1);
    // boxMesh1.castShadow = true;
    // boxMesh1.position.x = -2;
    // mainGroup.add(boxMesh1);

    // // set up green box mesh
    // const bg2 = new THREE.BoxGeometry(1, 1, 1);
    // const bm2 = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
    // const boxMesh2 = new THREE.Mesh(bg2, bm2);
    // boxMesh2.castShadow = true;
    // boxMesh2.position.x = 0;
    // mainGroup.add(boxMesh2);

    // Ambient Light
    // const ambientLight = canvas.ambientLight;
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
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
    // const directionalLight = canvas.directionalLight;
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight!.position.set(0, 2, 2);
    const dlHelper = new THREE.DirectionalLightHelper(directionalLight!, 3);
    directionalLight!.castShadow = true;
    mainGroup.add(directionalLight!, dlHelper);

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
    const sl = new THREE.SpotLight(0xffffff, 1, 8, Math.PI / 8, 0);
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

    // // hdr light gen
    // const pmremGenerator = new THREE.PMREMGenerator(canvas.renderer!);
    // const hdriLoader = new RGBELoader();
    // hdriLoader.load("./model/texture/venice_sunset_1k.hdr", (texture) => {
    //   const envMap = pmremGenerator.fromEquirectangular(texture).texture;
    //   texture.dispose();
    //   canvas.scene!.environment = envMap;
    //   canvas.scene!.background = envMap;
    // });
    // const animate = () => {
    //   if (gltf) {
    //     gltf.scene.rotation.y += 0.002;
    //   }
    //   requestAnimationFrame(animate);
    // };
    // animate();

    // Destroy the GUI on reload to prevent multiple stale UI from being displayed on screen.
    return () => {
      gui.destroy();
    };
  }, []);
  return (
    <main className="flex w-full flex-col items-center justify-between p-24">
      <canvas className="w-full h-full" id="three-canvas" ref={reactCanvas} />
    </main>
  );
}
