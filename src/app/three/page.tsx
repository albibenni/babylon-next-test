"use client";
import { useEffect, useRef } from "react";
import { viewer } from "../components/three-viewer";
import SceneInit from "./SceneInit";

export default function Home() {
  const reactCanvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // const { current: canvas } = reactCanvas;
    const canvas = new SceneInit("three-canvas");
    canvas.initialize();
    canvas.animate();
    viewer(canvas);
  }, []);
  return (
    <main className="flex w-full flex-col items-center justify-between p-24">
      <canvas className="w-full h-full" id="three-canvas" ref={reactCanvas} />
    </main>
  );
}
