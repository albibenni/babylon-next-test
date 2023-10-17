"use client";
import { useEffect, useRef } from "react";
import { viewer } from "../components/three-viewer";

export default function Home() {
  const reactCanvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const { current: canvas } = reactCanvas;
    if (!canvas) return;
    viewer(canvas);
  }, []);
  return (
    <main className="flex w-full flex-col items-center justify-between p-24">
      <canvas className="w-full h-full" id="three-canvas" ref={reactCanvas} />
    </main>
  );
}
