import {
  Engine,
  Scene,
  Vector3,
  SceneLoader,
  ArcRotateCamera,
} from "@babylonjs/core";
import "@babylonjs/loaders/glTF/2.0";
import "@babylonjs/core/Helpers/sceneHelpers";

export default function Home() {
  const canvas = document.getElementById("renderCanvas");
  if (!canvas) throw new Error("Canvas not found");
  const engine = new Engine(canvas as HTMLCanvasElement, true);

  const scene = new Scene(engine);
  const camera = new ArcRotateCamera("camera", 1, 1, 4, new Vector3(0, 0, 0));
  camera.attachControl(canvas, true);

  scene.createDefaultEnvironment({
    environmentTexture: "./public/forest",
    skyboxTexture: "./public/forest",
  });

  engine.runRenderLoop(function () {
    scene.render();
  });
  window.addEventListener("resize", () => {
    engine.resize();
  });

  SceneLoader.ImportMeshAsync("", "./public", "pc.gltf", scene, (meshes) => {
    console.log("Mesh ", meshes);
  }).then((helmet) => {
    helmet.meshes[0]!.position.y = 2;
    camera.setTarget(helmet.meshes[0]!);

    scene.onBeforeRenderObservable.add(() => {
      helmet.meshes[0]!.rotate(new Vector3(0, 1, 0), 0.001);
    });
  });
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <canvas />
    </main>
  );
}
